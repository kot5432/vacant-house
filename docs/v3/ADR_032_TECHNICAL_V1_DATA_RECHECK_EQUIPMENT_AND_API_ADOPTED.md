# ADR-032｜MVP v1の保存型・再確認コード・設備分類・API推奨仕様を採用

- 決定日：2026-11-19
- 状態：**利用者が「技術面は基本おすすめの方向で進めてください」と包括的な技術方針を了承したため、既存推奨値を初版設計として採用**。この文書に書かれた特定のリテラルは採用済みだが、人によるコードレビュー、実装、テスト、公開は未実施。
- 対象：富山地域活動「参加D00〜02＋企画U01〜04」MVPのみ。旧空き家案ではない。
- 上位決定：[ADR-029](ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md)、[ADR-030](ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md)、[ADR-031](ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)を変更しない。

## 1. v1の名前・基本形を採用

| 項目 | 今回採用する初版設計 |
|---|---|
| イベント説明 | **`input.optionalDescription?: string`**。画面説明の`eventDescription`は別フィールドとして保持せず、エクスポートに出さない |
| 取込由来 | **`importedFrom?: {originalEventId,originalCreatedAt,originalUpdatedAt,importedAt}`**。4キーは全てrequired、余分なキーと再帰的チェーンは拒否。ローカルの元イベントを上書きしない |
| ParentProgress | **`{taskId,status,needsRecheck,recheckReasonCodes,updatedAt}`**。全5キーrequired、追加キー禁止。`progressByTask`は既知のP01〜P12キーだけ、未操作なら省略可 |
| 根拠・優先度 | P01〜12のpriority、priorityReasonCodes、適用可否、次の一歩は**表示時に導出し保存しない** |
| 初期JSON | root `formatId,exportSchemaVersion,exportedAt,sourceBuildId,eventCount,events`、各EventRecordは`eventId,schemaVersion,rulesVersionAtLastReview,revision,createdAt,updatedAt,input,progressByTask`必須。version1。その他は本ADR/既存ADRで許可された任意キーのみ |
| 日付 | 既決の`input.date`。追加の`input.schedule`は不可 |
| 子チェック | **`checkedItemIds`をキーごと持たない**。空配列でも拒否 |

`importedFrom`は取得時の直接の出典のみ。初回作成EventRecordは持たず、取込でのみ付与する。取込された記録を再書出しする場合、その記録の由来は保存するが、次の取込時は**直前のインポート対象レコード自体**を由来とし、無限連鎖を作らない。

## 2. 保存用再確認理由コードの8種類を採用

```text
RECHECK_EVENT_TYPE_CHANGED
RECHECK_AUDIENCE_CHANGED
RECHECK_DATE_CHANGED
RECHECK_ORGANIZER_CHANGED
RECHECK_VENUE_CHANGED
RECHECK_EQUIPMENT_CHANGED
RECHECK_ATTENDEE_COUNT_CHANGED
RECHECK_OFFICIAL_SOURCE_CHANGED
```

- **`needsRecheck=false`のとき理由は`[]`、`needsRecheck=true`のとき1個以上の既知理由を必須**。未知コード、重複した同一コード、true＋空理由、false＋非空理由を初回v1で拒否する。本人の明示解除＋CAS成功のみfalse＋[]へ。
- 状態`not_started|in_progress|completed|not_applicable`と`needsRecheck`は別軸。`completed + true`や`not_applicable + true`は有効。自動リセットしない。
- 更新対象は[STEP11-②](STEP11_02_PARENT_RECHECK_CODE_AND_TRANSITION_CONTRACT_20261118.md)の依存親候補表を**上限**として、実際に影響しうる過去の確認がある親に限る。未操作の親12件へ一斉にフラグを付けない。
- 親だけの進捗では個々の確認内容が追跡できないので、影響の可能性がある既完了/本人対象外の親には**見落としを防ぐ再確認を付け、文言で「条件変更による確認のお願い」と説明する**。これは影響を法的に確定した表示ではない。
- `RECHECK_OFFICIAL_SOURCE_CHANGED`は**該当する情報が実際に改訂されたことと影響する親が特定できた場合のみ**付与。単なる月末期限切れは出典の表示を安全側へ戻すだけで、本人status/revisionは変更しない。
- `priorityReasonCodes`は表示用の別ドメインで、上記8コードと混ぜない。

## 3. 設備の保存分類と任意UI

正式な4カテゴリ：`tables_chairs | audio_visual | power_internet | other`。

- `equipmentCategories`は**既存の補助回答**。MVPで表示する場合は`equipmentNeed=answered/yes`のときだけ任意の複数選択を出し、未選択でも入力完了可とする。
- 技術的正規形は、初版の`EventInput.equipmentCategories`を**必須の配列（初期値`[]`）**に統一。重複カテゴリは不可。既知4種以外は拒否。本人の選択から推測で値を埋めない。
- `equipmentNeed`が`unanswered/undecided/answered/none_identified`の場合、`equipmentCategories=[]`を正規形とする。UIで無断の選択はせず、yesから変更する際は選択を消去することを明示する。
- P09のP2条件は**`equipmentNeed=answered/yes`のみ**。カテゴリ空でもP2。カテゴリの種類でP1に引き上げたり安全性を保証しない。
- このカテゴリは**親P09の子チェックではない**。ADR-031の子チェック不採用と両立する。

## 4. JSON形式検証方針

- **入出力のUTF-8バイト上限：2,097,152、イベント数上限100**。エクスポート選択は初期0件、超過時は本人が選び直し、暗黙切り詰め禁止。
- バイト長検証→**重複オブジェクトキーを検出できる構文解析/トークン走査**→strict object/列挙値・JSON Schema相当の形状→日時/Unicode書記素・バイト・ID/親key一致・意味制約→本人プレビュー→原子的取込の順を採用。
- `JSON.parse`だけで重複objectキーを検知したと扱わない。候補ライブラリの安全性・保守性と深度/入力上限の具体値は**実装レビューの選定事項**。重複キー拒否が満たせない方式は採用しない。
- UTCを含む正しいオフセット付き日時のみ。曖昧な日付は補完しない。過去の開催日は既存ADRどおり警告/受理条件を維持。
- 取込時のID衝突は**新規IDのコピー**、元の既存記録は不変。復元レコードrevision=1、createdAt/updatedAtは取込日時。エラーなら全件取込中止、DB不変。旧形式・旧空き家形式は未対応。
- 機械可読なJSON Schemaファイル、重複キー検出方式、正常/異常fixture、ブラウザー上の実挙動は**このADRによって完成・検証済みとはしない**。

## 5. A〜D間APIの初版契約

[STEP19](STEP19_REPOSITORY_AND_SCREEN_API_FAILURE_CONTRACT_20261119.md)の名前と役割を初版の共通設計として採用：`listEvents/getEvent/createEvent/updateTaskProgress/clearRecheck/saveEventInput/deleteEvent/exportSelected/previewImport/confirmImport`。DがRepository型とDexieを単独所有、BがP01〜12の純粋判定、CがU03/U04操作、Aが参加カタログ画面を所有。Eが一次資料とレビューを管理。

**結果区分**：`ok / invalid_input / conflict / not_found / unavailable / unsupported_backup / cancelled`を共通UIが扱える判別可能な結果として採用。エラーで画面ドラフトと既存DBを無断破棄しない。PRやソースの型を変更する場合はD/C/Bの相互レビューを要する。

- `createEvent`成功時のみU02→U03。
- `updateTaskProgress`と`clearRecheck`は`expectedRevision`付きCAS。
- `saveEventInput`は影響親だけ再確認し、本人の既存statusを保持。
- `previewImport`→`confirmImport`は本人同意が必須で、確認と確定の間に状態が変われば安全に失敗させる。
- ActivityCatalogは読み取り専用で主催JSONの対象外。D02→U02は空の新規草稿。

## 6. 決定対象ではないこと
本ADRへの技術方針承認は**実装開始の許可、テスト実行、デプロイ、正式な外部掲載許可、地域の掲載運用責任者の確定、5人の実名割当、PRのレビュー権限変更**を意味しない。

## 7. 未完了の検証
1. 機械可読Schemaと正常/異常fixtureの成果物作成、別人レビュー。
2. 重複JSONキーと異常深度に対応する実装ライブラリの選定・実機検証。
3. D/C/Bの実際の型/enumレビュー、5人の担当割当。
4. 高岡の個別活動に関する一次情報の別人審査と更新担当の決定。
5. 実装・テスト・公開の別途明示指示。

**初回v1の技術仕様はここに定義した範囲で採用、ただし完成や動作合格の認定はしない。**
