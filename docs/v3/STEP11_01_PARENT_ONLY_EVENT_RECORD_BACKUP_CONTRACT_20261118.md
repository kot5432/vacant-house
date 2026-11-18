# STEP11-①｜親進捗だけの初版保存・JSON検証契約 v0.5（設計審査用）
2026-11-18。**既決はADR-001〜031。本書の未採用リテラル・required表は実装前の技術案であり、動作試験・schema検証は未実施。** 旧空き家案や参加一覧データを含めない。
参照：[ADR-029](ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md)、[ADR-031](ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)、[主催データ契約](PREIMPLEMENTATION_SHARED_DATA_CONTRACT_REVIEW.md)。

## A. JSONの階層とrequired/optionalの提案

| 階層 | 必須 | 値/検証 | 採用状況 |
|---|---|---|---|
| Backup root | formatId, exportSchemaVersion, exportedAt, sourceBuildId, eventCount, events | `formatId="toyama-community-event-prep-backup"`, `exportSchemaVersion=1`, eventsは100件以下。eventCount一致 | ADR-029等で既決 |
| EventRecord | eventId, schemaVersion, rulesVersionAtLastReview, revision, createdAt, updatedAt, input, progressByTask | schemaVersion=1、revision正整数、日時は正しいタイムゾーン付きISO8601 | 一部実装前詳細案 |
| EventRecord.optional | importedFrom | 直接元4項目のみ（原ID・作成/更新日時・取込日時） | 意味はADR-018既決、キー形状は技術案 |
| EventInput必須6 | eventType,audience,date,venueStatus,region,organizerForm | 既定enum。dateは`{kind:date,value:YYYY-MM-DD}` または `{kind:month,value:YYYY-MM}` または `{kind:undecided}` | 既決 |
| EventInput状態表現 | attendeeCount,responsible,equipmentNeed,venueCategory,facilityUsersAge | `Known<T>`のunanswered/undecided/answeredの厳密形状 | 概略型に合わせる技術案 |
| EventInputその他 | equipmentCategories | 配列。**enum正式凍結前の未知値を許可済みとみなさない** | enumレビュー待ち |
| EventInput optional | venueNameMemo,optionalDescription | 前者100書記素/4KiB、後者500書記素/16KiB。キーはoptionalDescription統一を推奨 | 上限既決、説明キーは技術案 |
| progressByTask | 空objectまたはP01〜P12の既知キーのみ | 親taskId単位。未登録はUI上未着手として導出 | ADR-031等で既決 |
| TaskProgress（登録された各親） | taskId,status,needsRecheck,recheckReasonCodes,updatedAt | status4種。taskIdとobjectキー一致。確認理由は既知enumから。日時厳密検証 | 子ID以外は既存設計、enumレビュー待ち |
| TaskProgress **禁止** | checkedItemIds | **初版JSONにキーごと存在させない**。空配列で残すのも禁止 | ADR-031正式採用 |

`Known<T>`は`{kind:"unanswered"}`, `{kind:"undecided"}`, `{kind:"answered",value:T}`以外を拒否。未回答を未定に書換えない。任意項目を型上必須にするのは入力強制でなく、未回答の正規形を確保するため。

### EventInputの保存値（既存資料との照合）
- `eventType`: `workshop|lecture|exchange|other`
- `audience`: `minors|adults|both|undecided`
- `venueStatus`: `undecided|candidate|confirmed|no_physical_venue`
- `region`: `takaoka|toyama_other|outside_toyama|undecided`
- `organizerForm`: `solo|group|undecided`
- `responsible`: `Known<decided|not_decided>`
- `equipmentNeed`: `Known<yes|none_identified>`
- `venueCategory`: `Known<takaoka_community_center|other>`
- `facilityUsersAge`: `Known<minors_only|includes_adults>`
- `attendeeCount`: `Known<positive safe integer>`。1001以上は拒否でなく表示上の注意
- `equipmentCategories`: 現在4カテゴリ候補（`tables_chairs|audio_visual|power_internet|other`）のレビュー前。**公式enumではない**
- `date.value`の実在年月日/月を検証。過去日/月は警告のみ（ADR-006）。フィールド名`schedule`を新設しない。

## B. 親の状態・再確認の整合性
- 未登録のタスク：UI上の`not_started`。自動で12件のレコードを生成して保存する必要はない。
- 既存タスク`completed`や本人`not_applicable`は`needsRecheck=true`と共存できる。要再確認になっても元statusを維持。
- `needsRecheck=false`と`recheckReasonCodes=[]`は明示解除時に組となる。**真なのに空配列の扱い**は再確認理由enumの採用レビューで決めるまで機械受入を保証しない。
- 親statusは利用者が直接選択。全親がcompletedでも「法令適合・開催可能」と表示しない。
- `recheckReasonCodes`は保存用、`priorityReasonCodes`は計算用で別。後者をJSONへ保存しない。
- `progressByTask.P05.checkedItemIds`等の旧草案値は、初版v1の未知キーとして受理しない。実在の旧バックアップ対応は空集合。

## C. エクスポート・インポートの操作契約（既決を保持）
1. U01で**本人選択**。初期0選択、0件書出し不可。100件上限超・完成JSON2,097,152 UTF-8 bytes超は無断分割/切詰め/省略しない。本人が再選択して別ファイルにする。
2. ファイル読取前に実バイト長検査→JSON字句/構造→formatId・version→eventCount→全EventRecordのschema/日時/入力/進捗→重複ID→容量やCASの事前条件→プレビュー。
3. JSON Schemaだけでは判定できない項目：重複オブジェクトキー、実在日時とオフセット、書記素上限とUTF-8バイト、eventIdとrecord.taskIdの一致、他イベントIDとの衝突、CASと原子的保存。
4. **重複JSONオブジェクトキー**は通常のJSON.parseでは検出できない。厳密拒否を要求するなら重複検出できるパーサ/トークン検査を実装レビューで選ぶ。実装できていないのに「重複を検出した」と主張しない。
5. 原子取込は**プレビュー後本人が確定**。衝突するeventIdは新規別IDのコピー、`revision=1`, `createdAt=updatedAt=importedAt`を確定保存時刻にし、`importedFrom`に直接の元情報を保存。既存EventRecordと他イベントを不変にする。
6. `sourceBuildId`で互換性を判定しない。出典カタログや参加Listing、導出priorityはバックアップへ含めない。
7. フォーマットの完全な機械可読Schemaとfixturesのレビューは**未実行**。この文書は実装用コードではない。

## D. エラー時の守るべき操作（机上）
| ID | エラー | 期待 |
|---|---|---|
| V1-01 | checkedItemIdsが存在（`[]`でも） | 不正形式として全件拒否、既存DB不変 |
| V1-02 | タスクP13など未知taskId | 全件拒否 |
| V1-03 | progressByTaskのkey P05にtaskId P08 | 全件拒否 |
| V1-04 | Known.unansweredに余分なvalue | 全件拒否 |
| V1-05 | 未来日時は正しいISO、実在日 | ADR-023に従い明示警告・同意、無断補正しない |
| V1-06 | 2MiB超または101件 | ファイル全件拒否、無断切詰めなし |
| V1-07 | import中に保存失敗 | 原子的失敗、既存不変 |
| V1-08 | 施設出典が失効 | 施設固有断定を停止、本人進捗status/revision不変 |
| V1-09 | recheck解除 | 保存成功後のみfalse＋空理由配列、status維持 |

## E. レビュー時に解くべき4つの残件
1. `optionalDescription`と`importedFrom`の**完全required/optional**を採用。
2. `recheckReasonCodes`の保存enumとtrue/空配列整合を採用。
3. `equipmentCategories`のenumと、任意の設備選択UIを残すかを採用。
4. strict JSON形式の重複キー/異常深度/最大入力への検証方式を選び、機械可読Schemaとfixturesを作成して別人レビュー。

**ユーザーへの新たな大きなUX選択がなくても技術検討可能。ただし正式採用・実装/実行試験は別の段階。**
