# STEP25｜TypeScript共有型・Repository契約の設計正本

2026-11-19。設計用の型の説明であり、**実際の.tsファイルではない**。ADR-032を優先し、未確定の型細部はD/B/Cが相互レビューする。

## 1. 正本と依存方向
- D：`EventInput`、`EventRecord`、`ParentTaskProgress`、`OrganizerRepository`、バックアップの保存型を定義。
- B：`derivePreparationPlan(input, officialContext)`。純粋な導出処理（保存せず、副作用なし）。出力は全12親のpriorityとreason/nextAction、applicability。
- C：U03/U04のユーザー操作と競合/エラー画面。DのRepositoryにのみ保存依頼。
- A：ActivityCatalogの表示・検索。Eが一次資料をレビューする。保存済み主催イベントと共通化しない。

## 2. 型の契約（擬似TypeScript）
```ts
type TaskId = 'P01'|'P02'|'P03'|'P04'|'P05'|'P06'
  |'P07'|'P08'|'P09'|'P10'|'P11'|'P12';
type TaskStatus = 'not_started'|'in_progress'|'completed'|'not_applicable';
type Known<T> =
  | {kind:'unanswered'}
  | {kind:'undecided'}
  | {kind:'answered'; value:T};
type EventDate =
  | {kind:'date'; value:string}
  | {kind:'month'; value:string}
  | {kind:'undecided'};
type EquipmentCategory = 'tables_chairs'|'audio_visual'|'power_internet'|'other';
type RecheckCode =
  | 'RECHECK_EVENT_TYPE_CHANGED' | 'RECHECK_AUDIENCE_CHANGED'
  | 'RECHECK_DATE_CHANGED' | 'RECHECK_ORGANIZER_CHANGED'
  | 'RECHECK_VENUE_CHANGED' | 'RECHECK_EQUIPMENT_CHANGED'
  | 'RECHECK_ATTENDEE_COUNT_CHANGED' | 'RECHECK_OFFICIAL_SOURCE_CHANGED';
type ParentTaskProgress = {
  taskId:TaskId; status:TaskStatus; needsRecheck:boolean;
  recheckReasonCodes:RecheckCode[]; updatedAt:string;
};
type RepoResult<T> =
  | {kind:'ok'; value:T}
  | {kind:'invalid_input'; field?:string; detail:string}
  | {kind:'conflict'; latestRevision?:number}
  | {kind:'not_found'}
  | {kind:'unavailable'; detail:string}
  | {kind:'unsupported_backup'; detail:string}
  | {kind:'cancelled'};
```
具体的な`EventInput`のrequired/optionalは[STEP18](STEP18_EVENT_RECORD_V1_SCHEMA_DECISION_PACKAGE_20261119.md)とADR-032へ。ここでは重複定義を作らない。

## 3. サービス関数（署名案）
| 関数 | 呼出担当 | 完了条件 |
|---|---|---|
| `listEvents():Promise<RepoResult<EventRecord[]>>` | D/U01 | 破損/旧版を黙って捨てない |
| `getEvent(id):Promise<RepoResult<EventRecord>>` | B/C/D | idが無いときnot_found |
| `createEvent(input):Promise<RepoResult<EventRecord>>` | B/U02 | 保存後のみU03 |
| `updateTaskProgress(id, taskId, status, expectedRevision)` | C/U03 | CAS、一対象親、statusとrevisionのみ必要な更新 |
| `clearRecheck(id, taskId, expectedRevision)` | C/U03 | 明示解除のみ、status不変 |
| `saveEventInput(id, input, expectedRevision)` | C/U04 | 適用変更に関係する親のみ要再確認 |
| `deleteEvent(id, expectedRevision)` | D/U01 | 本人の削除確認、CAS |
| `exportSelected(ids)` | D/U01 | 1〜100件、2MiBまで |
| `previewImport(bytes)` | D/U01 | ファイル全件検証後のみプレビュー |
| `confirmImport(previewId)` | D/U01 | 本人確認済みの同一入力にのみ適用、再検証して原子追加 |

**戻り値の例は設計用でありエラーメッセージをそのまま公開しない**。既存原則の`rulesVersionAtLastReview`と`revision`、`updatedAt`は更新契約で維持。データ保存とUIの進捗ステートを混同しない。

## 4. 意図的に含めない
- 現行MVPに子チェック項目の型を新設しない。
- 個別参加活動データを`EventRecord`に保存しない。
- 優先度や行政判断を永続フィールドとして追加しない。
- 利用者の参加履歴、申込情報、プロフィールを保存しない。

## 5. 統合前ゲート
Dが型・RepositoryのPRを起点にBとCが署名・レビュー、A/Eのデータ契約を別レビュー。今はファイル作成とAPI実行をしていないので合格を主張しない。
