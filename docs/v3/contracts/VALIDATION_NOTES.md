# Backup JSON v1 contract artifacts: 読み方と限界

**2026-11-19。設計成果物。実装・バリデーター実行・テスト・CI・デプロイは未実施。**

## ファイル一覧
- `backup-v1.schema.json`：JSON Schema Draft 2020-12の**構造定義**。EventInput/ParentTaskProgress/Envelopeの必須・任意、列挙、追加キー拒否。
- `fixtures/valid-one-event.json`：保存済みイベント1件、親進捗未操作。
- `fixtures/valid-parent-recheck.json`：P05に`completed+needsRecheck`を持つ正例。
- `fixtures/invalid-child-checkbox.json`：ADR-031で禁止の`checkedItemIds`。
- `fixtures/invalid-progress-task-mismatch.json`：親key P05と内部taskId P08の不一致。
- `fixtures/invalid-recheck-without-reason.json`：needsRecheck trueで理由が空。
- `fixtures/invalid-extra-schedule.json`：`input.date`と未知の`schedule`の重複概念。
- `fixtures/invalid-duplicate-json-key.json`：JSONオブジェクト内の重複`formatId`。**通常のJSON Schemaだけでは拒否できない**ため字句解析段階で拒否する。

## Schemaだけでは保証できない項目
| 項目 | 対応する層・理由 |
|---|---|
| 同じJSON object内の重複キー | **第1層**：キー重複検出パーサ/トークン走査。標準`JSON.parse`は最終値だけ残す |
| UTF-8バイト長2,097,152以下 | **第1層**：ファイルバイト数。文字数と混同しない |
| 有効な日時、オフセット、日付の実在性 | **第2層追加検証**：formatアノテーションだけでは不足。独立した実在日時判定を行う |
| 書記素数100/500と各UTF-8バイト上限 | **第2層追加検証**：Intl.Segmenter相当を用い、施設名100/4KiB・説明500/16KiB |
| eventCount=events.length | **第2層追加検証**。Schemaでは両者の一致を直接表現していない |
| progressByTaskのkeyと内部taskIdの一致 | **第2層追加検証**。正規表現で既知の親かは判定できるが、値との同一性は別検査 |
| イベントのeventId配列内重複 | **第2層追加検証**。配列要素の同一IDのみを比較 |
| 未来日時の確認・プレビューの同意 | **第3層**：ADR-023などに従う |
| ID衝突時の別IDコピー、CAS、原子追加 | **第3層**：IndexedDB/Dexieのトランザクション |
| JSONを不正時に全件拒否すること | **第3層**：1件でも違反があれば保存しない |

## Schemaへの実装上の注意
- `format:"date-time"`はJSON Schema Draft 2020-12では必ずしも検証の強制を意味しない。format-assertion対応または別検証を必須とする。
- 日付`YYYY-MM-DD`と月`YYYY-MM`の正規表現は**文字列の形**のみを検査し、存在しない2月30日などは追加検証で拒否。
- Schemaは`EventInput.equipmentCategories`を必須の既知4カテゴリ配列とする（ADR-032）。equipmentNeedがyes以外なら`[]`のみ。
- `progressByTask`のP01〜P12は省略可、`TaskProgress`がある場合は5キー必須。`checkedItemIds`は禁止。
- `eventId`はこのSchemaでは非空文字列のみ。**採用済みのUUID等の詳細なID形式が別途ある場合はコードに先立ち照合する**。正規化で勝手にIDを作り替えない。
- 固定fixtureの日付・`sourceBuildId`は**架空の例示**であり、ユーザーイベント/公開活動/ビルド実行の証拠ではない。
- JSONファイルを作っただけでバリデーターが通ったとは主張しない。**全fixture: `not_run`**。

## 受入前チェック
1. DとCがSchemaの`required`と既存正式ADRを照合し、BがP09設備判断とP05/P08判定を確認する。
2. JSON重複キーの検出方法、日時の実在性、Unicode書記素、深度制限、バイト上限の**実装方法**を後続の技術レビューで決める。
3. 正例・異常例を実際のバリデーターにかけて全件の期待結果を記録（**実装開始許可後に限る**）。
4. JSON取込の破損/競合/容量失敗でも既存のIndexedDBのデータが変わらないことを実行検証する（現時点では未実施）。
