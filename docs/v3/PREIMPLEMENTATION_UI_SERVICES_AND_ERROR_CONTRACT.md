# 実装直前｜4画面・サービス・保存の受け渡し契約 v0.2

作成：2026-11-18。**設計のみ／実装・実行試験・公開なし**。基本6問／P01〜P12／U01〜U04の確定した製品仕様に従う。参照：[共通型レビュー](PREIMPLEMENTATION_SHARED_DATA_CONTRACT_REVIEW.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[ADR-003](ADR_003_PRIORITY_RULES_ADOPTED.md)、[ADR-027](ADR_027_P08_P2_NO_FACILITY_AUTO_ESCALATION.md)、[ADR-028](ADR_028_LIMITED_P2_PRIORITY_BY_EXISTING_INPUTS.md)、[ADR-026](ADR_026_U03_PROGRESS_CAS_INDEPENDENT_OF_INVALID_INPUT.md)。

## 1. 責任の境界

`features/*`は入力と表示のみ。ユーザー操作の成否判定は`application/*`、保存実処理は`EventRepository`経由で`infrastructure/db`、入力・出典・P01〜12の純粋判定は`domain/*`。現在日時、アプリ内の出典カタログ、ルール版は関数の引数として渡し、判定内部で時計やIndexedDBを読むようにしない。

- **U01**：イベント一覧の読取、選択・削除確認、U02開始/U03再開、JSONの入出力開始。バックアップの形式判断は`features/events`内に書かず`application/backup`へ。
- **U02**：基本6問と条件付き任意入力を画面内で保持。保存成功したときだけU03。**初回下書きは永続保存しない**。
- **U03**：プラン、4領域、未解決代表、本人進捗、再確認、公式出典の対象範囲。判定は`domain/rules`から取得し、保存は`ProgressService`へ。
- **U04**：イベントの保存済み値と別の編集ドラフト。「変更を反映する」→検証/CAS成功時のみU03へ。キャンセルでDB変更なし。

## 2. アプリケーションサービス（予定の論理コマンド）

| 論理操作 | 入力 | 正常時の契約 | 失敗時の契約 |
|---|---|---|---|
| `createEvent` | ValidatedEventInput, clock | 新規eventId・revision=1→保存成功後にeventId返却 | 入力を破棄せず失敗理由を返し、遷移しない |
| `loadEventPlan` | eventId, rulesVersion, sourceCatalog, clock | 対応schemaのEventRecord読取・現在のpriority/source適用を導出 | 不在・未知schema・破損を区別して書込禁止 |
| `updateTaskProgress` | eventId, taskId, expectedRevision, desiredProgress | **対象タスクのみ**更新+revision+1、保存成功後新revision返却 | 競合／削除済み／容量不足／未知schemaで元DBを維持 |
| `clearTaskRecheck` | eventId, taskId, expectedRevision | 本人明示操作後だけneedsRecheck解除、以前のstatus保持 | 自動解除・成功表示は禁止 |
| `applyEventEdit` | eventId, baseRevision, draftInput | 全入力検証→施設固有値の限定クリア→影響task再確認→原子保存 | キャンセル・検証失敗・競合で保存済み入力不変 |
| `deleteEvent` | eventId, expectedRevision, confirm | 確認とCAS成功で対象のみ削除 | 古いタブによる復活を禁止 |
| `exportSelectedEvents` | selectedEventIds, snapshot, clock | 全選択集合を厳密検証・完成JSON2MiB/100件を満たすとき生成 | データ不適合・削除・超過で全件停止、選択集合を勝手に変えない |
| `previewImport` | fileBytes, currentIds, clock | 形式・全件検証、衝突、未来日時、増加件数を表示 | 不正があればDB変更なし |
| `commitImport` | previewFingerprint, explicitConsent, repository | 最新DB状態を再照合、別IDコピー、revision=1で全件追加 | 変更された衝突条件は再プレビュー、途中失敗は全件ロールバック |

**実装API署名ではない**。初回のTypeScript定義では名前・型・エラー種別を一つの共通契約にしてからAIへ指示する。U03とU04が異なるコマンドを呼ぶこと、UIが独自upsertしないことが最重要。

## 3. エラーコードの分類（技術案）

- `VALIDATION_ERROR`：必須・enum・日時・文字数・Byte上限
- `NOT_FOUND`：対象イベントが存在しない／他タブ削除
- `REVISION_CONFLICT`：保存版が古い。自動上書きしない
- `UNSUPPORTED_SCHEMA`：古いタブ・未来版・未知バックアップ版
- `STORAGE_UNAVAILABLE`／`QUOTA_EXCEEDED`：保存不能、成功と表示しない
- `BACKUP_TOO_LARGE`／`BACKUP_TOO_MANY_EVENTS`：2MiB／100件超過
- `BACKUP_INVALID`／`BACKUP_RECONFIRM_REQUIRED`：ファイル不正／復元前の条件変更
- `SOURCE_NEEDS_REVIEW`：施設固有出典の断定を停止し一般確認へ（**本人進捗エラーではない**）

UIが受け取る形の技術案：`{ok:true,data,revision?}`または`{ok:false,code,recoverable,fieldErrors?}`。メッセージはUI側の定義を参照し、「保存済み」と「画面に保持中」を混同しない。ログへ個人入力本文を不用意に出さない。

## 4. 画面遷移の決定表（最低限）

| 現在画面 | 操作 | 成功 | 失敗/キャンセル |
|---|---|---|---|
| U01 | 新規作成 | U02へ | 一覧を保持 |
| U02 | 次へ／戻る | 同じ画面内のステップ変更、入力保持 | 不正なら該当入力へフォーカス |
| U02 | プラン生成 | **初回保存成功後U03** | U02保持・保存成功を偽らない |
| U01 | 保存イベントを開く | U03へ | 不在・非対応・破損の原因表示 |
| U03 | 進捗変更 | 成功後反映済み表示 | 一時状態と保存済み状態を区別、CAS競合なら再読込を提案 |
| U03 | 編集 | U04へ | 読込不能なら編集不可 |
| U04 | キャンセル | ドラフト破棄→U03 | DB変更なし |
| U04 | 変更を反映 | **保存成功後U03** | U04ドラフトを保持、DB不変 |
| U01 | イベント削除 | 確認＋CAS成功なら一覧から除去 | 競合・取消で削除しない |
| U01 | JSON取込 | プレビュー承認後に保存イベントを一覧へ | DB無変更、エラーと再確認 |

## 5. 該当性・優先度・進捗・出典を混ぜない

- `priority`はP1/P2/P3（未該当の出力は既存契約に従いnull）。タスクIDのP01/P02とは別。
- **P05**：minors/both→P1、adults/undecided→P2。**P08**：P2基本、施設固有の出典適用だけでP1へ昇格しない。
- **P01/02/03/04/07/09**：既決の入力に限る限定P2条件、その他P3。P06/10/11/12はP3固定。
- `no_physical_venue`では建物固有子項目のみ非該当、P07〜P09の親は一般確認を残す。
- 同優先度はtaskId昇順、再確認中の完了は未解決候補。**複数P1を隠さない**。
- 出典期限切れは一般タスク・本人のstatus/revisionを消さず固有の断定だけ停止する。

## 6. コンポーネント間の明示的な受け渡し

| 発信元→受信先 | 受け渡すもの | 渡してはいけないもの |
|---|---|---|
| U02→EventService | validated draft、保存意図 | UIだけで作った仮の保存済み結果 |
| EventService→RuleEngine | 正規EventInputと現在のルール版、進捗 | Dexie接続やUI state |
| RuleEngine→U03 | taskId, applicability, priority, reasonCode, nextActionCode, recheck対象 | 新しい本人進捗や行政許可の認定 |
| U03→ProgressService | 対象taskId、変更値、expectedRevision | EventRecord丸ごとの無条件put |
| U04→InputSaveService | validated draft、baseRevision | 現行DBの黙った上書き |
| U01→BackupService | 選択ID、本人承認、プレビュー識別 | 非選択イベント、公式出典カタログ |
| SourceCatalog→U03 | sourceId, URL, 確認日, applicability, effectiveStatus | 区域・対象の推測、未検証の「利用可能」 |

## 7. 実装時の品質ゲート（未実行）

- 最初に固定した架空ケースで**基本6問→EventRecord保存→RuleEngine→U03理由＋次の一歩**が一貫するか確認。
- 別タブCAS、削除後復活、保存不能、JSONの厳密日時/未知版/容量、施設情報の月末停止をテストケースに含める。
- 320px／200%、キーボード、読み上げ、IME確定、主要PC/スマホブラウザの動作は別途実測。
- **コード実装・試験実行・CI・デプロイはゼロ**。本書だけでDoneとしない。

## 8. 未決の設計詳細

- 完全なJSON Schemaのrequired/optional、`importedFrom`形状・未知フィールド許容、同名JSONキーの拒否方式。
- UIコンポーネント命名、ルーティング、テスト/validationライブラリの選定。
- 本人に出す各エラー文の最終ユーザビリティ確認、復元で将来日時がある時の画面確認文言。
- 施設4候補の管理者確認と第二レビュー、4人の個人割当と作業可能時間。

**次の承認ゲート**：未確定の技術詳細が「新しい製品機能」にならないことを人間が最終確認してから実装開始を明示する。