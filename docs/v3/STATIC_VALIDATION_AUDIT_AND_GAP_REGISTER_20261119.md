# 実装直前の静的監査：仕様境界・不足の切り分け（2026-11-19）

**対象**：ADR-029/030/031/032、`STEP8_10_CANONICAL_INPUT_MAPPING_AND_ENUM.md`、`contracts/backup-v1.schema.json`、`contracts/VALIDATION_NOTES.md`、既存Issue #23〜27。実アプリのソース読込・Schemaエンジン実行・ブラウザテストは**未実施**。机上監査はPASS判定を意味しない。

## 確実に維持する条件
- 対象は富山地域活動の**参加D00〜02＋企画U01〜04**。旧空き家の物件管理と混ぜない。
- `EventInput.date`、保存JSON v1、本人の親進捗P01〜P12のみ。`checkedItemIds`キーは空配列でも禁止。
- P05未成年/両方=P1、成人/未定=P2。P08=P2固定。P09のP2条件は`equipmentNeed.answered/yes`（category空でも）。
- `no_physical_venue`時もP07〜P09の親確認を非表示/無効にしない。`needs_information`を保つ。
- `completed`と`needsRecheck=true`は両立。本人statusを暗黙に初期化しない。再確認解除は明示操作＋CAS。
- ActivityCatalogの未承認候補を公開`visible`に移さない。本人EventRecord/backupへ参加カタログを混入しない。

## Schemaと設計の静的なギャップ（実装担当へ渡す）

| ID | 観点 | 現状として確認したこと | 具体的な作業と検証の担当 |
|---|---|---|---|
| G01 | 日時実在性 | Schemaの`format:date-time`だけで実在日時/正しいoffsetの強制は保証できない | Dが厳格な実在日時検証。時差、うるう日、未来日時、夏時間などを検証 |
| G02 | `date`の実在日/月 | 正規表現は`YYYY-MM-DD`等の形だけ | Dで実在年月判定、B/Cで警告導線（過去開催は無断補正しない） |
| G03 | Unicode・バイト上限 | `venueNameMemo`/`optionalDescription`の文字列長はSchema外の意味検証 | Dが書記素100/500、UTF-8 4KiB/16KiBの両上限を検査、CがU04で同じルール |
| G04 | 重複キー | JSON Schemaは生JSON内の同一キー重複を検知できない | Dが重複キー検知パーサを選定。普通の`JSON.parse`単体では不十分 |
| G05 | クロスフィールド | `eventCount`と配列長、`progressByTask.Pxx.taskId`一致、ファイル内eventId重複はSchemaだけで完結しない | Dが全件意味検証。1件異常で全件拒否 |
| G06 | 取込前後の整合 | Schemaでは衝突時の別IDコピー、revision1、createdAt/updatedAt、原子性を保証しない | DがDexie transactionと本人プレビューを設計通りに実装/検証 |
| G07 | 深度/大量入力 | 2MiB上限は既決だが、深さ/トークン数とパーサ実方式は未固定 | Dが正常fixtureを誤拒否しない防御上限を選定しCがレビュー |
| G08 | `equipmentCategories` | 4値配列・`equipmentNeed`がyes以外なら[]はSchemaとADR-032で一致 | B/Cがyesから変更時の削除案内、P09判定を確認 |
| G09 | ID形式 | Schemaは`eventId`非空のみ。他文書で強いID条件がある場合は衝突 | Dが作成APIと既存ADRの実ID契約を照合し、必要なら採用仕様に反映 |
| G10 | 旧仕様の混在 | `DATA_DESIGN_V1.md`に子チェックとバックアップMVP対象外が履歴として残る | ADR-031/032優先。実装者は古い型のコピー禁止 |

### 具体的なfixture期待条件（すべて`not_run`）
- 既存`valid-one-event.json`と`valid-parent-recheck.json`は受入候補。
- `invalid-child-checkbox.json`、`invalid-recheck-without-reason.json`、`invalid-extra-schedule.json`はSchema段階で拒否する期待。
- `invalid-progress-task-mismatch.json`は**Schemaで内部taskId=P08を形式上許しても、追加の意味検証で拒否**する。
- `invalid-duplicate-json-key.json`は**パーサの字句段階で拒否**する。Schemaの単独検証結果をPASS/FAILの証拠にしない。
- indexedDBの実データ互換、プレビュー後競合、部分成功なしは実行試験が必要。

## 静的監査の結論
**既決ADRとの明白な矛盾を新たに採用しないように、ギャップを10件の作業に整理した。** これは実行結果を保証する静的コードレビューではない。各ギャップは担当#40〜42（保存）、#36〜39（入力/進捗）に引き継ぐ。正式ADR変更が必要な事実が判明した場合は、本人の合意なしに意味を変えない。
