# STEP19｜A〜D機能間API・エラー契約の詳細

2026-11-19。STEP13の契約を具体化した**レビュー案**。インターフェース名は実装前にB/C/Dが合意する。

## 1. 所有者が異なる型を作らない
- DがOrganizerRepository・EventRecordの公開インターフェース所有。B/Cの直Dexie操作は禁止。
- Bが純粋判定関数 `derivePreparationPlan(input,officialSourceSnapshot)` の所有者。戻りは親12件の`taskId,priority,applicability,reasonCodes,nextAction,sourceState`。優先度は保存しない。
- Aが参加ActivityCatalogの読取器/フィルタとD00/D01/D02を所有。Eが出典検証し、AはEの未承認候補を公開扱いしない。
- Cが編集・進捗コンポーネントを所有し、U03表示用のBの親カードに操作propsを渡す。

## 2. 結果型の設計（具体名は未承認）
| result kind | 意味 | UIの必要対応 |
|---|---|---|
| `ok` | 永続保存/読取成功後のみ | 成功表示・次の画面へ |
| `invalid_input` | 入力の型/範囲/整合性違反 | どの項目を直すか表示、草稿保持 |
| `conflict` | expectedRevision不一致/途中で対象更新 | 自動上書き禁止、最新を再読込し明示選択 |
| `not_found` | 指定eventIdなし | 元一覧へ、誤った新規作成をしない |
| `unavailable` | IndexedDB不可・容量制限・ブラウザー制約 | 元の画面/草稿/保存値を保持し、再試行 |
| `unsupported_backup` | 未知version/未知キー/重複キー | ファイル全件拒否、プレビューにも成功扱いしない |
| `cancelled` | 本人が保存/取込/削除を中断 | 状態維持、成功と表示しない |

## 3. 呼び出し別の契約
| 呼び出し | 成功条件 | 重要な失敗条件 |
|---|---|---|
| `createEvent(input)` | 検証成功、初期progress空、revision1を保存 | 保存失敗ならU02の未保存内容保持 |
| `updateTaskProgress(id,taskId,status,rev)` | 対象親+revision+updatedAtのみトランザクション更新 | CAS失敗で他親/入力/既存status不変 |
| `clearRecheck(id,taskId,rev)` | 本人が明示解除、true→falseと理由[]、status不変 | ソース期限切れだけでは呼ばない |
| `saveEventInput(id,input,rev)` | 旧新条件の差分・影響親のみ、全体を一括CAS保存 | 無関係親の変更/完了取消/施設出典の使い回し禁止 |
| `previewImport(bytes)` | strict全件検証に成功して安全なプレビュー提示 | ファイル解析/未知版/重複ID/上限違反は全件拒否 |
| `confirmImport(previewId)` | 本人明示確認、対象ファイル/DB再検証後原子的追加 | 時点差・DB変化・容量不可は中断し再プレビュー |

## 4. 二重操作・競合の判定（UXと保存）
- `saving`の間はその操作を再送しない（ただし長時間かかる場合の解除/エラー案内は必要）。
- 画面に見える暫定statusは、保存成功前に「保存済み」と表示しない。
- 競合になったときは最新revisionを読み込み、「現在の保存内容」「今回の変更」を識別できる形で示す。自動で最後の書き込みを勝たせない。
- `not_applicable`（本人）・`applicable=no`（判定）・`unknown`（出典）は別の状態として保持。
- D02→U02は空の新規草稿のみ。Aの公開情報を入力値に自動複写しない。

## 5. 画面状態の共通辞書
`idle,loading,saving,saved,error,conflict`はUI表現の**候補**で、ドメイン・DBへ永続保存しない。エラーは画面上に文字で表示して再試行/戻る操作を提供。U01が保存不可でも参加D01は独立表示できる。全テストケースは未実行。

## 6. 受入条件（設計・未実行）
- API-01 BからDへ正規EventInputを渡し、成功時にeventIdを受けU03へ。
- API-02 CからDへ親P08のstatusをCAS更新、別タブで競合した場合は旧値不変。
- API-03 条件編集後の再確認理由が関係親にのみ追加され、既完了は残る。
- API-04 Aのcatalog更新はDの保存データrevisionやバックアップに触れない。
- API-05 JSON不正1件でも全件reject、本人のプレビュー確定前に追加しない。
- API-06 D01の0件/公式URL不通/unknownを利用者に適切に説明する。

**承認が必要**：戻り型の具体リテラル、リポジトリメソッド名、戻り値の失敗区分はD/B/Cの相互レビュー後に最終固定する。
