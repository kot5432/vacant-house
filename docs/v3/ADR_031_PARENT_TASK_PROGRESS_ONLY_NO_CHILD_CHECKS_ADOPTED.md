# ADR-031｜MVPはP01〜P12親タスクのみ進捗管理する（B案正式採用）

- 決定日：2026-11-18
- 状態：**利用者明示承認済み**（「B案を採用します。MVPでは子チェックを作らず、P01〜P12の親タスクの進捗を管理」）。
- 対象：現行「富山で参加する＋企画する」MVP（ADR-030）。旧空き家アプリとは無関係。
- **設計のみ。実装・実行テスト・デプロイなし。**

## 決定

1. **進捗の操作単位は親タスク`P01`〜`P12`のみ**。MVPでは子チェック項目の表示・チェック操作・保存・復元を行わない。
2. 親`TaskProgress`の`status`（`not_started`/`in_progress`/`completed`/`not_applicable`）、`needsRecheck`、`recheckReasonCodes`、更新時刻の契約は維持。**利用者の「対象外」とルール上の非該当は区別**し、`completed + needsRecheck`を許す。再確認解除はADR-004どおり本人が明示した操作でのみ行い、CASで保存する。
3. **初回未公開のEventRecord v1から`checkedItemIds`を除外する方針**。親progressのJSONにもこのキーを含めない。根拠：子項目とそのstable IDがMVPには存在しないから。正式なSchema v1のrequired/optional表とfixtureへ反映する。**`checkedItemIds: []`を空で残す案は採用しない**。
4. ADR-029の`formatId="toyama-community-event-prep-backup"`、`exportSchemaVersion=1`、各`schemaVersion=1`、`input.date`を維持する。**製品未実装/未公開で、既存の実ユーザーデータ形式がないため**初回公開前のv1スキーマをこの決定に揃える。過去の設計文書に`checkedItemIds`があることを、実在の旧版バックアップと混同しない。
5. **既知の旧バックアップ版は空集合**（ADR-029）。もし後日実際に子チェックのあるデータが発見された場合は、そのデータを無断削除・黙って変換しない。既知旧形式としての検証済み移行を別途設計するまで、未対応版/余分な`checkedItemIds`入りJSONは保護的に拒否する。本人の既存イベントへ勝手に上書きしない。
6. P01〜P12の**優先順位・理由・最初の一歩の判定は不変**（ADR-003/027/028）。`no_physical_venue`時はP07〜P09の親の`needs_information`を維持。旧文書の「建物専用子だけ非該当」は今後MVPの非該当チェック表示を必要としないという意味に整理し、**親の一般確認を消す根拠にはしない**。
7. `equipmentNeed`など主催の任意入力は別物。**設備カテゴリを入力するかの判断と、P09の子チェックを削除する判断は別**。ADR-028の`equipmentNeed=answered/yes`→P09=P2（カテゴリ空でも）を維持。
8. 参加D00〜D02と読み取り専用カタログは変更なし（ADR-030）。参加側の詳細は判断材料であり、主催P01〜12の「子チェック」に転用しない。

## 表示・保存・JSONへの影響

| 範囲 | 最新決定 |
|---|---|
| U03 | 12親カードのみを進捗対象とし、詳細には「理由・次の一歩・確認先」を表示してよいが子チェックUIは無い |
| U04 | 入力変更→影響する親タスクに`needsRecheck`を導出。本人のstatusを無断リセットしない |
| U01 | 保存イベント一覧・JSON選択書出しは同じ。子チェック数の進捗率は導出しない |
| EventRecord v1 | `progressByTask`キーはP01〜12。各値は親status/needsRecheck/recheckReasonCodes/updatedAtなど正式既存契約に従う。**checkedItemIds無し** |
| JSON export/import v1 | 進捗は親のみ。新規書出しにはcheckedItemIds無し。取込時に現行v1の未知キーを黙って捨てない。既知旧版対応なし |
| 保存CAS | 対象親taskIdのみ変更、revision+1。旧入力・他タスク・由来・不変情報の保護を維持 |
| 受入試験 | 子チェックのチェック状態の試験は削除。親進捗・再確認・保存・JSON保護のケースに置換 |

## 廃止/更新対象

- [STEP10-⑥の24子ID案](STEP10_06_PROPOSED_CHILD_IDS_RECHECK_CODES_AND_EQUIPMENT_20261118.md)は**不採用**（設計履歴として残す）。同文書の「8再確認コード案・4設備カテゴリ案」は子チェック廃止とは独立した**未承認の技術候補**。
- [DATA_DESIGN_V1](DATA_DESIGN_V1.md)、[PREIMPLEMENTATION_SHARED_DATA_CONTRACT_REVIEW](PREIMPLEMENTATION_SHARED_DATA_CONTRACT_REVIEW.md)などの`checkedItemIds`記述は**ADR-031により上書き**。各詳細設計に周知する。
- [ADR-004/005/026]にある「旧子チェックを保持」の叙述は、当初の機能がMVPで存在する場合の設計履歴。今回の初版MVPでは子チェック自体を保存しないが、本人の**親status/再確認/進捗**を勝手に消してよいとの解釈は禁止。

## 不変条件
- U02初回ドラフトは画面内保持、保存成功後U03。
- U03親進捗と再確認解除は最新revision CAS。失敗時不変と保存失敗表示。
- U04は明示保存、条件変更で親の確認前提が変わったときだけ要再確認。
- 完了・本人対象外・ルール上非該当・情報期限切れは別次元。
- JSON 100件/2 MiB、選択分割、厳密全件検証、本人確認後の原子的取込。
- 行政判断・許可・安全・必要備品をアプリが確定しない。

## 残る技術レビュー
- `TaskProgress`の完全なv1 JSON required/optional/schema と`recheckReasonCodes`の保存enum・未知コード拒否条件。
- `optionalDescription`、`importedFrom`の正規キーとJSON Schemaの完全定義。
- 設備カテゴリのUI有無と`equipmentCategories`の具体enum（未承認）。
- 別担当の人間レビュー、実装/テストの明示許可。

**本ADRはB案の採用を完了として記録する。実装・テストに合格したとの意味ではない。**
