# STEP24｜JSON v1検証の3層契約・fixture仕様（設計のみ）

更新：2026-11-19。**ADR-032の採用技術方針を具体化した実装前仕様。検証エンジン・fixture実ファイル・テストは未作成/未実行**。既決ADR-029/030/031/032に反する変更禁止。

## 1. 入出力境界

対象は**主催者の保存済みEventRecordのみ**。参加ActivityCatalog、priorityReasonCodes、P01〜12の導出priority、子チェック`checkedItemIds`を含めない。

### 第1層：容量とJSON字句の安全性
1. ファイルの実バイト長を2,097,152以下に制限し、エンコードはUTF-8。バイト順序マークや不正UTF-8の扱いはデコーダ・パーサを選ぶ段階で厳格に検証する。破損データを黙って置換しない。
2. **JSONオブジェクトの同一階層でキー重複がある場合は拒否**。標準の`JSON.parse`は重複キーを検出しないので、トークン走査または重複を報告するパーサを通してから値を作る。
3. 異常に深いネスト、巨大配列、パーサの処理が停止しないケースを拒否する。**正確な深度・トークン数上限は採用するパーサと正常fixtureを照合して決める**。単純な文字列の正規表現で重複キーを検出しない。
4. JSONはroot object。コメント・末尾カンマ・NaN/Infinity・余分な文字列は拒否。

### 第2層：JSON Schema Draft 2020-12 ＋意味検証
- **Draft 2020-12を採用する設計推奨**。`type`、`required`、`additionalProperties:false`、`oneOf`、`enum`、`minItems/maxItems`、`minimum`等で形状を検証。
- 既決のEnvelope必須：`formatId,exportSchemaVersion,exportedAt,sourceBuildId,eventCount,events`。eventCountとevents.length一致、eventsは最大100件。
- EventRecord必須：`eventId,schemaVersion,rulesVersionAtLastReview,revision,createdAt,updatedAt,input,progressByTask`。optional：`importedFrom`のみ。実施例の余分なroot/record/progressキーは拒否。
- `progressByTask`はP01〜P12の任意キーのみ。各値は`{taskId,status,needsRecheck,recheckReasonCodes,updatedAt}`の5キー。**object keyと内部taskIdの一致は意味検証**。
- `needsRecheck=false`↔理由配列空、`needsRecheck=true`↔理由1個以上、理由はADR-032の8列挙のみ・重複なし。
- `Known<T>`は`unanswered/undecided`の場合valueなし、`answered`の場合valueあり。それ以外拒否。`input.date`のdate/month/undecidedは排他的。
- 設備カテゴリはADR-032の4種類、配列必須、重複不可。`equipmentNeed`が`answered/yes`以外なら正規形`[]`。
- その他意味検証：開催日の**実在性**（例：2026-02-30を拒否）、タイムゾーン付き日時の実在性、文字数上限（書記素/UTF-8両方）、ID重複、importedFromの元日時・キーの整合。
- `sourceBuildId`は互換判定に使わない。既知旧版は空集合、`checkedItemIds`、旧空き家データを拒否。

### 第3層：本人確認・原子保存
- ファイル全件の検査成功→件数・ID衝突・注意すべき日時・取り込み後の動作をプレビュー→本人の明示確認。
- 確定直前に必要条件を再確認し、**Dexieの単一トランザクションで全件追加**。ID衝突は新規IDでコピー、revision=1、createdAt/updatedAtを取込時刻にし直接由来のみ記録。
- 任意の1件が無効または保存失敗なら全件中止。既存EventRecord不変、黙った省略・上書き・部分成功禁止。

## 2. fixtureマトリクス（設計ケース。全部not_run）

| ID | 入力 | 期待 |
|---|---|---|
| JSON-001 | 有効な保存済みEventRecord 1件、親未操作 | 受理候補 |
| JSON-002 | P01〜P12までstatusを記録、childなし | 受理候補 |
| JSON-003 | P05 completed＋needsRecheck true＋既知理由1つ | 受理候補 |
| JSON-004 | rootに未知キー | 全件拒否 |
| JSON-005 | `checkedItemIds:[]` | 全件拒否 |
| JSON-006 | progress key P05、内部taskId P08 | 全件拒否 |
| JSON-007 | `needsRecheck:true,recheckReasonCodes:[]` | 全件拒否 |
| JSON-008 | 未知reason code、または同じ理由が重複 | 全件拒否 |
| JSON-009 | 同じオブジェクトに重複した`eventId`キー | 構文段階で全件拒否 |
| JSON-010 | 入力に`input.schedule`を追加 | 全件拒否 |
| JSON-011 | イベント101件または2MiB超 | 全件拒否 |
| JSON-012 | `date`が存在しない日付 | 全件拒否 |
| JSON-013 | `Known.unanswered`に`value`混入 | 全件拒否 |
| JSON-014 | 既存eventIdと衝突 | 本人確認後のみ別IDコピー |
| JSON-015 | 取込途中でDBエラー | 部分追加なし |
| JSON-016 | 参加カタログ混入 | 不正root/recordなら拒否、backup対象にならない |
| JSON-017 | `equipmentNeed`がyesでcategory空 | 受理。P09のpriority=P2は導出 |
| JSON-018 | no_physical_venue、親P07〜09未操作 | 受理。一般確認を消さない |

## 3. 実装前のレビューポイント
- D/CがDraft 2020-12を処理できるvalidatorのバージョン・メンテ状況を確認。
- JSON重複キーの検出法と安全なUTF-8デコード方式、正常データを誤拒否しない深度上限を選ぶ。
- fixtureの具体的JSONサンプルは**完全schemaと同じPRで静的レビュー後に追加**する。今回は表だけであり完成fixtureではない。
- **「試験通過」と表現しない**。実物JSONのパーサテストも行っていない。
