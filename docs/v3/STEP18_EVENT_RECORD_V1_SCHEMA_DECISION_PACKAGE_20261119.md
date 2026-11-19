# STEP18｜EventRecord v1・JSONバックアップ仕様の決定パッケージ

2026-11-19。**仕様候補のレビュー用。未承認の具体的リテラルを正式決定に変えない。** 既決はADR-029/030/031とSTEP11-①・STEP12-①。コード・実行テストなし。

## 1. 永続化対象の階層と最小制約

| 階層 | required（候補。ただし既決項目は既決） | optional | 禁止/検査 |
|---|---|---|---|
| BackupEnvelope | `formatId,exportSchemaVersion,exportedAt,sourceBuildId,eventCount,events` | なし | 未知rootキー、未知版、eventCountと配列長不一致 |
| EventRecord | `eventId,schemaVersion,rulesVersionAtLastReview,revision,createdAt,updatedAt,input,progressByTask` | `importedFrom`（形状の人間レビュー待ち） | `schemaVersion!==1`、未知キー、revision非正整数 |
| EventInput | `eventType,audience,date,venueStatus,region,organizerForm`＋既存の型上必須の`Known<T>`項目 | `venueNameMemo,optionalDescription` | `schedule`新設禁止、`Known`の余分なvalue禁止 |
| `progressByTask` | object自体は必須、個々の親は任意 | key `P01`〜`P12`のみ | P13、子チェック、余分なキーを拒否 |
| ParentProgress | `taskId,status,needsRecheck,recheckReasonCodes,updatedAt` | なし | object keyとtaskId不一致、`checkedItemIds`禁止 |
| `importedFrom` | ある場合のみ元ID/元作成/元更新/取込日時 | 原記録への遡及チェーンなし | 他人の元IDに既存DBを上書きしない |

値の既決：`formatId="toyama-community-event-prep-backup"`、`exportSchemaVersion=1`、`schemaVersion=1`、`input.date`、親のみ進捗、選択書出し最大100イベント/完成JSON UTF-8で2,097,152 bytes。保存されない導出値はP01〜12のpriority/適用/理由/次の一歩と参加カタログ。v1の既知旧版は空集合。

## 2. EventInput厳密型の確認表

| フィールド | 既存の値/意味 | 採用状況 |
|---|---|---|
| eventType | `workshop / lecture / exchange / other` | 既決入力契約 |
| audience | `minors / adults / both / undecided` | 既決 |
| date | `{kind:"date",value:"YYYY-MM-DD"}` / `{kind:"month",value:"YYYY-MM"}` / `{kind:"undecided"}` | 既決 |
| venueStatus | `undecided / candidate / confirmed / no_physical_venue` | 既決 |
| region | `takaoka / toyama_other / outside_toyama / undecided` | 既決 |
| organizerForm | `solo / group / undecided` | 既決 |
| attendeeCount | `Known<positive safe integer>` | 既存契約、1001以上は注意であって禁止ではない |
| responsible | `Known<decided / not_decided>` | 既存契約 |
| equipmentNeed | `Known<yes / none_identified>` | 既存契約、`answered/yes`ならP09=P2 |
| venueCategory | `Known<takaoka_community_center / other>` | 既存契約 |
| facilityUsersAge | `Known<minors_only / includes_adults>` | 既存契約 |
| equipmentCategories | 4分類`tables_chairs/audio_visual/power_internet/other`候補 | **未採用**・物理保存で必須/任意か再照合 |
| venueNameMemo | optional。100書記素・4KiB | 既存上限 |
| optionalDescription | optional。500書記素・16KiB | **名前は候補**。旧eventDescriptionと二重保存しない |

`Known<T>`は`{kind:"unanswered"}` / `{kind:"undecided"}` / `{kind:"answered",value:T}`のみ許す。値に`null`や余分なキーを追加して区別を曖昧にしない。`optionalDescription`、`importedFrom`の正規キーの固定はD＋Cでレビューが必要。

## 3. TaskProgressの整合性条件
- 状態は`not_started/in_progress/completed/not_applicable`。未保存タスクは表示上not_startedと導出、全12件を保存時に自動生成しない。
- `needsRecheck=false`かつ`recheckReasonCodes=[]`は通常の初期・明示解除の形。`needsRecheck=true`と空理由の新規生成は避ける**候補**。受入拒否するかは未承認。
- `needsRecheck=true`でも`completed`や`not_applicable`が有効。statusの無断リセット禁止。
- `recheckReasonCodes`保存用8候補：`RECHECK_EVENT_TYPE_CHANGED`, `RECHECK_AUDIENCE_CHANGED`, `RECHECK_DATE_CHANGED`, `RECHECK_ORGANIZER_CHANGED`, `RECHECK_VENUE_CHANGED`, `RECHECK_EQUIPMENT_CHANGED`, `RECHECK_ATTENDEE_COUNT_CHANGED`, `RECHECK_OFFICIAL_SOURCE_CHANGED`。**正式enum未採用**。priority理由コードと混在禁止。
- 入力変更ごとの影響親はSTEP11-②の**候補表**によって絞る。関連のない親への一律再確認をしない。施設資料の月末失効だけで本人の完了・revisionを変更しない。

## 4. export/importのバリデーション順
1. 実バイト長を上限と照合（読み取りに先立つ容量確認）。
2. JSON構文解析で**重複objectキー検出**が必要。通常の`JSON.parse`だけでは重複拒否できない。採用技術/最大ネスト深さ/トークン数は実装前レビュー待ち。
3. strict object（追加キー禁止）、formatId/version/eventCount/ユニークID/日時オフセット・実在性/書記素+バイト数/全親の値を検査。
4. 全件成功したものだけプレビュー。未来日時は既決条件で本人警告・同意が必要。問題のあるイベントを黙って捨てない。
5. 確認後に1トランザクションで原子的に別ID追加。重複IDは新しいIDへ。revision=1、createdAt/updatedAtは取込時刻、新規由来は直接元の情報だけ。
6. 取込失敗時は**DB全体を元の状態に保つ**。部分成功/サイレントマイグレーション禁止。

## 5. 採用判断を要する決定案（この文書の作成では採用しない）
- D-18A：`optionalDescription`と`importedFrom`4項目を正規形として採用するか。
- D-18B：保存用再確認8種類とtrue/理由空の禁止を正式採用するか。
- D-18C：設備4カテゴリの正規値、表示UI有無、配列が型上必須かを採用するか。
- D-18D：重複キー拒否、最大深度、全件検査、JSON Schema/サンプルfixture設計技法をD/Cが了承するか。

**受入期待ベクトル**：P05/P08、unknown key、子チェックキー、重複キー、101件、2MiB超、parent key不一致、CAS競合、未来日時、同じJSON再取込はすべて`not_run`。
