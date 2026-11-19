# 実装前の横断監査｜最新版の正本・過去文書の衝突（2026-11-19）

**状態：GitHub内の文書を静的に照合。実装・実機テスト・人レビュー・利用者検証なし。** 旧空き家活用案と現在の富山地域活動（参加＋企画）を混ぜない。

## 1. 読む順番（実装者がまず参照）
1. 正式決定：[ADR-030](ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md)（D00〜02参加/U01〜04企画）、[ADR-031](ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)（親のみ）、[ADR-032](ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md)（保存技術詳細）、[ADR-029](ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md)（JSON v1識別子）。
2. 優先度の正式決定：ADR-003/027/028。P05未成年含むP1、P08=P2固定、その他限定P2、同順位ID昇順。
3. 技術の具体設計：[STEP24](STEP24_BACKUP_VALIDATION_LAYERS_AND_FIXTURE_SPEC_20261119.md)〜[STEP27](STEP27_TEAM_TASK_ACCEPTANCE_AND_RELEASE_GATES_20261119.md)、[保存JSON Schemaと注意事項](contracts/VALIDATION_NOTES.md)。
4. 活動掲載は[STEP28](STEP28_TAKAOKA_VERIFIED_SOURCE_REVIEW_REGISTER_20261119.md)で**候補のみ**。現時点で掲載承認済み0件。
5. 旧STEP1〜17、DATA_DESIGN_V1、STEP11/12は**履歴・検討経緯**。後のADRと矛盾する箇所は引き継がない。

## 2. 実際に見つかった衝突と解釈

| 発見 | 旧文書・箇所 | 正本として扱う解決 | 影響 |
|---|---|---|---|
| 子チェック配列 `checkedItemIds` が概念ER図、`TaskProgress`型、`clearRecheck`の説明に残る | `DATA_DESIGN_V1.md` 2/4/11等 | **ADR-031：子チェックキー自体を禁止**。古い型をコピーしない | D/Cが子進捗を復活させない |
| JSON export/importがMVP対象外と記載 | `DATA_DESIGN_V1.md` §7 | **ADR-015/029/032：MVPにJSON v1書出/取込を採用済み** | Dはバックアップ必須 |
| 開催時期 `schedule` と `date`の混在 | STEP6/STEP8の説明/旧画面ラベル | **ADR-029：保存正規キー`input.date`のみ** | B/D/C |
| 技術候補の「未採用」と書かれる | `STEP23`、`STEP12`、`STEP18`、`STEP19` | **ADR-032で列挙/取込由来/設備分類/APIの値が採用済み**。昔の状態説明は時点依存 | D/B/C |
| STEP24に「実際のJSON Schema/fixtureなし」 | `STEP24`と古い`README`見出し | **後続PR #28で構造Schema/7つの静的サンプルをmainへ追加**。ただし実行検証は未実施 | 誤った「未作成」を修正 |
| STEP17に「STEP13〜17 PR未マージ」 | `STEP17` | **PR #19はmainにマージ済み**。設計上未承認の技術部分とは別 | 作業状況の誤認防止 |
| A/B/C/Dの旧技術別役割 | `STEP11/12`の担当表 | **現行はA参加/B企画プラン/C進捗編集/D保存/E地域・品質** | Issue #23〜27 |
| 出典の確認月末失効と参加募集の「今募集中」判定を混同 | 過去の施設カタログと参加候補の一部 | 主催出典期限ADR-011は**参加募集の現在性保証に流用しない** | A/E |
| READMEが過去PRのレビュー前表現を最新のように重ねる | `README.md`冒頭の時系列見出し | 本監査で上に**正本案内**を追加。履歴本文は保存 | 全担当 |
| チーム主担当Eを本人のGithub IDとして確定したような表現 | 会話内の役割呼称 | 本人の役割Eは相談上確認済み、**GitHub ID/実際のレビュアー権限は未確認** | 割当は人が実施 |

## 3. 仕様不足とリスク（確認済みと混同しない）
- JSON Schemaは存在するが、重複キー検知・実在日時・書記素・eventCount一致・親keyの一致・IndexedDB原子性を**Schemaだけで保証しない**。全fixtureは`not_run`。
- `EventInput.equipmentCategories`は必須配列（初期[]）、4種のみ。P09のP2判定はequipmentNeed=answered/yesのみ。
- 施設個別の法令/許可/安全要件をアプリが自動確定しない。出典不明なら一般確認へ。
- 地域掲載候補の「公式ページで掲載内容を確認」と「今も受付中/掲載承認済み」は別。
- 現在アプリ本体の実コードをこの監査では確認しておらず、**実コードとの差分ゼロの保証ではない**。

## 4. 受入前チェック（担当）
- D/C/B：正規型とSchema、`TaskProgress`に子チェックが存在しないこと、保存APIが一意であること。
- A/E：参加カタログの`visible`に未承認活動を含めないこと、出典不明の説明。
- E：古い文書の引用が必要なときは「当時の草案」と明示すること、PRと実行証拠を区別。
- 全員：レビュー完了/実装済み/テストPASSを勝手に記入しない。

**結論：** 新しいADRを増やさず、**ADR-029〜032および既決優先度ADRを基準にする**。過去文書は削除しないが最新正本とは扱わない。
