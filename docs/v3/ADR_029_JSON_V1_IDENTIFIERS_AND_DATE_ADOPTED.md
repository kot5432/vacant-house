# ADR-029｜初回JSONバックアップ形式の技術識別子A案を正式採用

- 決定日：2026-11-17
- 状態：**ユーザー明示承認済み（2026-11-17の回答①A）／設計決定のみ／実装・実行テスト・公開なし**
- 対象：初めて単発・小規模の地域イベントを主催する人の準備支援Webアプリv3.1。旧空き家所有者・物件診断・マッチングとは無関係。
- 参照：[STEP8-⑫初回JSON草案](STEP8_12_BACKUP_JSON_V1_SCHEMA_DRAFT.md)、[STEP8-⑩入力正規化](STEP8_10_CANONICAL_INPUT_MAPPING_AND_ENUM.md)、[ADR-015〜026のバックアップ・保存保護](ADR_015_JSON_BACKUP_EXPORT_IMPORT.md)、[STEP9〜14統合](STEP9_14_FINAL_DESIGN_HANDOFF.md)。

## 決定

| 項目 | 正式採用する値／規約 |
|---|---|
| JSONバックアップ専用識別子 `formatId` | **`toyama-community-event-prep-backup`** |
| 初回書出し形式 `exportSchemaVersion` | **整数 `1`** |
| 初回イベントレコード形式 `eventSchemaVersion` | **整数 `1`**。レコード内の`schemaVersion: 1`へ対応。DexieのDBバージョンは別管理 |
| 開催時期の保存正規キー | **`input.date`**。UI上の「開催時期（schedule）」は同じ1問の説明名。`input.schedule`を重複保存しない |
| 初回版の既知旧版対応一覧 | **空集合**。実装・試験で確認されない旧版の受理を宣言しない |
| 旧空き家案のJSON | **別製品のため受理・暗黙移行しない** |

## 初版エンベロープ契約（論理項目）

`formatId`, `exportSchemaVersion`, `exportedAt`（正しいタイムゾーン付きISO8601）, `sourceBuildId`（互換性判定に利用しない）, `eventCount`（eventsの要素数と一致）, `events`（保存済みEventRecordをもとにした配列）を定義する。各イベントのレコード版`schemaVersion: 1`が今回決めた`eventSchemaVersion=1`を表す。**ルートに重複の`eventSchemaVersion`項目を追加して二重管理しない**。正確なJSON Schemaのrequired／optional、空文字列、由来フィールドの形、進捗の検証表は別の版付き正本で固定する。単なるTypeScriptの型定義だけで取込検証を省略しない。

### 不変条件（ADR-015〜026、ADR-003/027/028を上書きしない）

- 本人選択の書出し、初期0件、1ファイル最大100件・**2,097,152 UTF-8バイト**。超過時は本人が選び直し。無断分割・除外・切詰めをしない。
- インポートは既知形式・厳密日時・イベントID・入力・進捗・Unicode書記素/UTF-8バイト上限を**全件検証**し、プレビューと本人承認を挟んで**一括原子追加**。未知形式、未知版、旧空き家形式は拒否する。
- 既存IDとの衝突は本人承認後に別IDコピー。繰返し取込は毎回承認。復元イベント`revision=1`、現在時刻の`createdAt/updatedAt`、元イベントの由来は保持。既存イベントを上書きしない。
- `sourceBuildId`は利用環境の参考情報で、互換判定は`formatId`と対応する版・スキーマから行う。
- 本人の完了・対象外・再確認・元入力は勝手に削除しない。導出priority、現在の公式情報カタログはバックアップへ同梱しない。
- 施設名メモ100書記素/4KiB、イベント説明500書記素/16KiB、過去開催日の警告許容など、最新ADRの制約を維持する。

## 今回の採用では**未完了**の部分

- 完全な機械可読JSON Schema／フィクスチャの最終レビュー、および`optionalDescription`と旧文書の`eventDescription`など**既存資料間で揺れる名前**の一意化。
- Dexieの内部DB版・将来の移行実装、初回バックアップ形式への変換の動作検証。
- 0件取込時の確認文言、全イベントの全列挙値と`importedFrom`の厳密表現、ファイル保存・ブラウザ競合の実試験。
- 版1での復元可能性、整合性、ブラウザ互換性の合格宣言。**現在は全件未実行**。

**影響**：初回公開の識別子と初期版はこのADRにより採用済み。これ以前の資料で「formatId・初期version未採用」とある箇所は時点の古い記述とする。ただし本ADRはコード作成・運用開始の許可ではない。