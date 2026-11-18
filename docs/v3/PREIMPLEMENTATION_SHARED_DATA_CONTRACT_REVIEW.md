> **最新上書き（ADR-031, 2026-11-18）**：この文書内の`checkedItemIds`・親の子チェック保持・子IDの必須レビューは**以前の設計案**。現行MVPはP01〜P12の親進捗のみ保存し、初回EventRecord/JSON v1から`checkedItemIds`を除外（空配列でも残さない）。[差分仕様](STEP10_09_PARENT_ONLY_SAVE_BACKUP_UI_IMPACT_20261118.md)。再確認理由コード・設備カテゴリ等は別途レビュー。親status/CAS/JSONの保護は維持。

# 実装直前｜共通データ契約レビュー v0.2（設計のみ）

作成：2026-11-18。**本書は仕様整理・詳細案であり、採用済みADRの改訂や実装ではない。** 旧空き家案を含めない。コード・依存導入・テスト実行・CI・デプロイはしていない。

## 0. 規範順位・発見した不整合

最新の**ADR-001〜029**を最優先。[DATA_DESIGN_V1](DATA_DESIGN_V1.md)は旧記述が含まれる履歴付き概略型。[STEP8-⑩](STEP8_10_CANONICAL_INPUT_MAPPING_AND_ENUM.md)、[ADR-029](ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md)により`input.date`が正式キー、`schedule`は表示上の別名。

**発見した未確定キー**：`DATA_DESIGN_V1.md`の`optionalDescription?: string`と[ADR-024](ADR_024_UTF8_TEXT_BYTE_LIMITS.md)内の`eventDescription`は同じイベント説明に対応する可能性が高い。**本レビューは`optionalDescription`に統一する技術案を推奨**するが、ユーザーの未回答の正式決定として扱わない。正式決定前にバックアップスキーマと画面検証のすべてを一貫させる。

## 1. 初回EventInput v1フィールド表（既存サンプルを基礎）

| JSONパス | 必須区分 | 許す値 | 留意 |
|---|---|---|---|
| `input.eventType` | 必須 | `workshop/lecture/exchange/other` | 自由記述から推測しない |
| `input.audience` | 必須 | `minors/adults/both/undecided` | 施設利用主体と別 |
| `input.date` | 必須 | `{kind:date,value:YYYY-MM-DD}` / `{kind:month,value:YYYY-MM}` / `{kind:undecided}` | 実在日・月、月初日を補完しない |
| `input.venueStatus` | 必須 | `undecided/candidate/confirmed/no_physical_venue` | 物理会場なし＝オンラインとは断定しない |
| `input.region` | 必須 | `takaoka/toyama_other/outside_toyama/undecided` | 市名や施設名から推定しない |
| `input.organizerForm` | 必須 | `solo/group/undecided` | solo＝責任者決定済みではない |
| `input.attendeeCount` | 型上必須 | `Known<number>` | 回答済みは1以上の安全整数、1001以上は警告のみ |
| `input.responsible` | 型上必須 | `Known<decided/not_decided>` | 明示未定またはanswered/not_decidedだけでP04=P2 |
| `input.equipmentNeed` | 型上必須 | `Known<yes/none_identified>` | answered/yesだけでP09=P2 |
| `input.equipmentCategories` | 型上必須 | `string[]`（既存の列挙値は別途照合） | 自由推測せず入力条件で解釈 |
| `input.venueCategory` | 型上必須 | `Known<takaoka_community_center/other>` | 施設が条件外となるときADR-005を守る |
| `input.facilityUsersAge` | 型上必須 | `Known<minors_only/includes_adults>` | audienceから推定しない |
| `input.venueNameMemo` | 省略可 | `string` | 100書記素、4,096 UTF-8 bytes |
| `input.optionalDescription` | 省略可・**キー名は技術案** | `string` | 500書記素、16,384 UTF-8 bytes。ADR-024のeventDescriptionと同じ入力内容を想定 |

**Known<T>** は必ず次の排他的3形状：`{kind:"unanswered"}`, `{kind:"undecided"}`, `{kind:"answered",value:T}`。unansweredとundecidedは別。回答済みのみvalueがある。余分なvalueを持つunanswered、欠けたanswered.value、未知enum値は不正。

**基本6問と「型上必須」の違い**：初回画面で必ず回答するのは基本6問。任意項目が型上必須なのは「未回答」を`Known.unanswered`で明示するためで、新しい必須質問を増やす意味ではない。条件外になった施設固有入力のクリアはADR-005を優先。

## 2. EventRecord v1 と進捗の境界

既存論理型：
- `eventId: string` — 一意。具体UUID採用、文字列長と衝突再生成方法は実装直前の技術詳細候補。
- `schemaVersion: 1` — [ADR-029](ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md)の`eventSchemaVersion=1`と対応するレコード版。Dexie DBのversionとは別。
- `rulesVersionAtLastReview: string` — 採用するP01〜P12判定契約に対応。古い場合も進捗を無断消去しない。
- `revision: positive safe integer` — 新規と取込コピーは1。CAS成功ごとに増加。オーバーフロー時は書込拒否し勝手に循環させない案。
- `createdAt/updatedAt: offset-aware ISO8601 string` — 実在する瞬間と順序整合。復元コピーは復元時の時刻。
- `input: EventInput` — 上表。
- `progressByTask: Partial<Record<P01..P12, TaskProgress>>` — キーと`taskId`は一致、未知ID・statusを拒否、存在しない進捗は未着手として表示用に導出するが書込で勝手に追加しない。
- `importedFrom`（復元由来） — ADR-018で保存することは既決。ただし**既存の概略TS interfaceに未記載**。下記の提案を正式schemaレビュー対象とする。

`TaskProgress`：`taskId`, `status: not_started|in_progress|completed|not_applicable`, `checkedItemIds: string[]`, `needsRecheck: boolean`, `recheckReasonCodes: string[]`, `updatedAt`。進捗status、再確認フラグ、ルール上のapplicability、出典有効性は**別次元**。checkedItemIdsとrecheckReasonCodesの許容ID一覧は既存カタログと照合して確定し、任意文字列の無検証受け入れを避ける。由来情報、過去の完了、既存の進捗を黙って削除しない。

### importedFrom 技術形状の推奨（未承認）

```text
importedFrom?: {
  originalEventId: string
  originalCreatedAt: ISOOffsetDateTime
  originalUpdatedAt: ISOOffsetDateTime
  importedAt: ISOOffsetDateTime
}
```

**直接復元元だけ**を表し、再帰的`importedFrom.importedFrom`は取り込まない。同じファイルの再インポート時もファイルが直接指定したeventId/日時を由来とする。ADR-018の意味と異なる履歴合成をしない。

## 3. BackupEnvelope v1（既決形式と設計境界）

```text
{
  formatId: "toyama-community-event-prep-backup",
  exportSchemaVersion: 1,
  exportedAt: ISOOffsetDateTime,
  sourceBuildId: string,
  eventCount: 0..100,
  events: EventRecord[]
}
```

- `eventSchemaVersion=1`は各イベント`schemaVersion:1`で表す**ADR-029正式決定**であり、ルートへ重複フィールドを設けない。
- 現在版だけ受け入れ、**既知旧版対応一覧は空集合**。旧空き家JSONと将来未知版は拒否。
- 書出しは**本人選択**、初期選択0件、0件で書出し不可。インポート対象の空配列は検証で0件と認識してもDB変更しない。
- ファイルの完成UTF-8 JSONは**2,097,152 bytes以内**、イベント100件以内。超えた場合は自動分割/切詰めせず、選択のやり直しを促す。
- `sourceBuildId`は版互換の代用にしない。出典カタログ・導出優先順位・表示カード・クラウドIDはJSONに含めない。
- 厳密な未来日時は本人の明示承認を求め、無効日時・重複eventId・不明taskId・上限超過・未知schemaは**ファイル全件拒否**。既存イベントに衝突するIDはプレビュー後別IDコピー、繰返し取込も毎回本人承認、コミットは一括原子性。
- **JSON Schemaだけでは完結しない検証**：実在日時（オフセット含む）、書記素数、UTF-8バイト数、イベントIDファイル内一意、キーとtaskId一致、出来上がったJSON実バイト長、revision CAS、イベント日時の順序、出典の現在有効性。これらは意味検証関数の責務。
- **重複したJSONオブジェクトキーの扱い**（例：`{"eventCount":1,"eventCount":2}`）：標準的なJSON.parseは重複を検出せず後勝ちになる。旧版やschemaが曖昧な場合は勝手に上書きしない。**拒否するなら重複キー検出の追加方式と負荷検証が必要**。これは公開前の技術判断ゲート。

## 4. 不変条件と失敗モデル

| 操作 | 変更してよい保存箇所 | 失敗/競合時 |
|---|---|---|
| U02作成 | 保存成功した新規EventRecordのみ | 入力保持、U03へ遷移しない、下書き永続化なし |
| U03進捗CAS | 対象taskIdの進捗+revision+updatedAtのみ | 完了と表示しない、他の入力は保持 |
| 再確認明示解除 | 対象taskIdのneedsRecheck/recheckReasonCodes+revision+updatedAtのみ | 解除しない、旧progress.statusを保持 |
| U04編集保存 | 本人が確定した入力＋影響taskの再確認＋revision+updatedAt | ドラフト保持、既存DB不変 |
| U01削除 | 確認した対象eventIdのみ、revision一致時 | 他イベント不変、古いタブupsert禁止 |
| U01書出し | **保存データ変更なし** | 無断省略や部分完了なし |
| U01取込 | 承認後の新規追加EventRecord集合のみ | 全件ロールバック、既存DB不変 |

## 5. 実装前のスキーマ固定チェック（まだ完了ではない）

- [x] 基本6問と`input.date`、ADR-029の識別子／版は正式採用済み。
- [x] Knownの3状態、任意人数、テキストの書記素/byte上限は既決契約と照合。
- [ ] イベント説明の保存キーの一意化（推奨`optionalDescription`）。
- [ ] `importedFrom`の厳密形状を現在のEventRecord/バックアップ型に接続。
- [ ] `equipmentCategories`と`checkedItemIds`の許容値・unknown拒否・対象外の整合を正式catalogと照合。
- [ ] UUID・rulesVersion・スキーマ変換の正式実装表と固定フィクスチャ。
- [ ] 重複JSONキー・異常に深いオブジェクト・入力文字列の異常値を安全に検証する方式。
- [ ] 未実施：型チェック・JSON import/export実動作・ブラウザ/IME/CAS試験。

**提案としての到達点**：担当A/Cが共通型と検証を二重定義せず開始できるよう、正式に固定した値とまだ厳密化すべき値を表にした。**機械可読schema・ソースコードは作成していない**。