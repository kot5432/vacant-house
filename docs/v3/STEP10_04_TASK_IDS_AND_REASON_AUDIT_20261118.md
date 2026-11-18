# STEP10-④｜P01〜P12理由コード・子チェックID・設備カテゴリの照合結果（2026-11-18）

**設計レビューの監査結果。コード/試験未実施。** [ADR-030](ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md)採用の参加側とは独立。旧空き家案は対象外。既存[理由コード案](STEP8_04_REASON_CODE_AND_SCREEN_COPY_DRAFT.md)／[データ型](DATA_DESIGN_V1.md)／[入力照合](STEP8_10_CANONICAL_INPUT_MAPPING_AND_ENUM.md)を照合した。

## 1. 混同してはいけない3種類

1. **評価理由コード**：P01〜12のpriorityと根拠を説明する**導出値**。[STEP8-④](STEP8_04_REASON_CODE_AND_SCREEN_COPY_DRAFT.md)に英語識別子の具体案が実在。JSON backupへ評価結果として保存しない。
2. **再確認理由コード**：本人が完了/対象外等にしたタスクについて、U04条件変更・出典更新などを受け、`progressByTask.Pxx.recheckReasonCodes[]`に保存する値。**1と同じenumだとは既存資料で確定していない**。
3. **子チェック項目ID**：タスクのチェックリストのstable identifier。 `checkedItemIds[]`に保存する。P01〜P12の**親タスクIDを代用しない**。

### 現行資料で確認できたpriority理由コード（STEP8-④の提案値）

| 親 | 現存する理由コード案 |
|---|---|
| P01 | CONTENT_NEEDS_CLARITY / CONTENT_GENERAL |
| P02 | AUDIENCE_UNDECIDED / AUDIENCE_GENERAL |
| P03 | SCHEDULE_UNDECIDED / SCHEDULE_MONTH_ONLY / SCHEDULE_GENERAL |
| P04 | RESPONSIBLE_UNDECIDED / ROLES_GENERAL |
| P05 | AUDIENCE_INCLUDES_MINORS / AUDIENCE_ADULT_OR_UNDECIDED |
| P06 | RUN_OF_SHOW_GENERAL |
| P07 | VENUE_UNDECIDED / VENUE_CANDIDATE / VENUE_CONFIRMED / VENUE_NONPHYSICAL |
| P08 | FACILITY_CONDITIONS_CHECK / FACILITY_SOURCE_MATCHED / FACILITY_SOURCE_STALE / VENUE_NONPHYSICAL_CONFIRM |
| P09 | EQUIPMENT_SPECIFIED / EQUIPMENT_UNDECIDED |
| P10 | ANNOUNCEMENT_GENERAL |
| P11 | CONTACT_WITH_MINORS / CONTACT_GENERAL |
| P12 | FINAL_REVIEW_GENERAL |

**採用状態**：コード文字列は現存する推奨設計であって、ADR-003/027/028の判定条件を変更する正式enumではない。特に`FACILITY_SOURCE_MATCHED`が出てもP08親P2をP1へ上げない。

## 2. 再確認理由：入力依存の対応は確認できるが、永続IDは未確定

[RULE_ENGINE_CONTRACT_V1](RULE_ENGINE_CONTRACT_V1.md)に記載された依存関係：

| 変更前提（旧文書の意味名） | 関連タスクの候補 | 注意 |
|---|---|---|
| audience | P02,P05,P11 | 値が変わるだけで全件再確認にしない。以前の確認内容に実際に影響がある場合に限定 |
| schedule （正規キーはinput.date） | P03,P06,P10,P11,P12 | 「開催14日前」等の自動理由を作らない |
| venueStatus | P07,P08,P09,P11,P12 | P07〜09の建物項目と親の一般確認を区別 |
| region, venueCategory, facilityUsersAge | P07,P08,P09 | 別施設の出典を継承しない |
| organizerForm, responsible | P04,P05,P06 | 未回答=未決定としない |
| attendeeCount | P02,P05,P07,P09 | 人数から許認可/スタッフ必要数を推定しない |
| equipmentNeed/categories | P07,P09 | 未回答=不要ではない |
| eventType | P01,P06,P09,P10 | descriptionからAI推定しない |
| source catalog revision/expiry | **対象出典の適用に関係するタスクのみ** | 未確認のまま完了を消さない |

**重要**：上記は再確認の依存候補であり、どの変更でも自動的に`needsRecheck=true`という実装ルールではない。本人の既存status/checkedItemIdsは維持、再確認解除はADR-004に従い明示操作のみ。

## 3. childItemIdと設備カテゴリの調査結果

- `EventInput.equipmentCategories:string[]`、`TaskProgress.checkedItemIds:string[]`、`TaskProgress.recheckReasonCodes:string[]`という物理型は[DATA_DESIGN_V1](DATA_DESIGN_V1.md)にある。
- しかし今回照合した既存データ型・入力正規化・準備プランUI・ルールエンジンでは、**設備カテゴリの完全な正式enum、P01〜12ごとの全子ID、再確認理由の永続版付きenumは確定していない**。英語理由コードの上表を再確認理由に転用する根拠もない。
- 「未確定だから空配列以外はすべて無効」という**正式な決定もしない**。許容値の決定前にJSON v1の完全互換性・保存動作を保証できない。
- 以降の設計Issueで`[taskId,childItemId,label,applicabilityPredicate,source]`表と`[recheckCode,changedField,affectedTask,semantics,ruleVersion]`表、`[equipmentCategory,label,needPredicate]`表を作る。採用済みUI/カタログの表記を優先し、無断創作を避ける。

## 4. 実装直前に固定すべき技術レビューの順

1. **文言と識別子の違いを確定**：英語priorityReasonCodeは導出専用、recheckReasonCodeは永続専用。両者を同じJSONキーにしない。
2. P01〜12それぞれの子項目文言を現行タスクカタログに照合。子IDは一度保存すれば安定性を維持し、ラベル変更でID変更しない。
3. 「会場なし」のP07〜09は建物専用の**子項目だけ**非該当。親applicabilityはneeds_information。子IDと親を区別する。
4. 条件変更で再確認が起きるための条件を、旧新入力・本人の過去進捗・参照していた出典から判定。広すぎる依存表だけで全件フラグを立てない。
5. EventRecord/BackupEnvelopeにこれらの正式IDとunknown拒否規約を接続し、JSON Schemaと実在フィクスチャを別の設計成果物で作る（未作成）。
6. A/Cの**別人レビュー**と実装開始の明示許可が完了するまでは、設計Issue #1を閉じない。

## 5. 決定に使う否定ケース（全件not_run）
| case | 前提 | 期待 |
|---|---|---|
| ID-01 | priorityReasonCode=FACILITY_SOURCE_MATCHED | P08はP2で固定（ADR-027） |
| ID-02 | checkedItemIds内にタスクの別の子ID | 検証契約で拒否、無言の削除をしない |
| ID-03 | 再確認理由がunknown | 親statusを失わせず、修復/非対応を表示。暗黙補完しない |
| ID-04 | audience変更、無関係な完了済みP01 | P01の完了を解除しない |
| ID-05 | no_physical_venue | 建物子項目のみ非該当、親P07〜09一般確認維持 |
| ID-06 | U03進捗CAS、旧任意文字列が現行上限超過 | 進捗のみ更新、本人の入力を変えない（ADR-026） |

**結論**：今確認できるのは「理由コード案」と「再確認の依存候補」である。**子ID・設備enum・永続再確認コードが完全確定したとは扱わない**。
