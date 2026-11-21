# v3｜採用済み仕様と実装契約

> **開発を始めるときは [Codex開発スタート](../CODEX_START_HERE.md) が入口です。** このページはCodexと担当者が、自分の実装範囲に必要な**正式仕様だけ**を引く索引です。旧空き家案・子タスクチェック・古い4人分担は現行MVPに使いません。

## 最優先：採用済みの正式決定

| 何を決めた資料？ | 正本 |
|---|---|
| 技術 | [ADR-001: React / TS / Vite / Dexie](ADR_001_TECH_STACK_ADOPTED.md) |
| ID・日付・バックアップ識別子 | [ADR-029](ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md) |
| 参加D00〜D02＋企画U01〜U04 | [ADR-030](ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md) |
| P01〜P12の親タスクのみ（子チェックなし） | [ADR-031](ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md) |
| 技術型・再確認・設備・Repository契約 | [ADR-032](ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md) |
| P01〜P12の優先度・P08基本P2等 | [ADR-003](ADR_003_PRIORITY_RULES_ADOPTED.md)・[ADR-027](ADR_027_P08_P2_NO_FACILITY_AUTO_ESCALATION.md)・[ADR-028](ADR_028_LIMITED_P2_PRIORITY_BY_EXISTING_INPUTS.md) |
| その他の正式決定 | 同階層の `ADR_002〜ADR_026`。必要な機能のものだけ開く |

**優先順位**：採用済みADRと現在の担当Issueの具体的な決定を守る。過去の提案書や設計案と矛盾する場合、勝手に新仕様を採用せず、IssueでEに相談する。

## A〜Eの機能別リンク（必要な行だけ読む）

| 担当 / Issue | 参照する詳細仕様 |
|---|---|
| A [#34](https://github.com/kot5432/vacant-house/issues/34)・[#35](https://github.com/kot5432/vacant-house/issues/35) | [参加二入口の設計](DUAL_ENTRY_UX_SEARCH_ARCHITECTURE_REVIEW_20261121.md)、[参加と主催の受入](STEP10_07_PARTICIPATE_ORGANIZE_ACCEPTANCE_MATRIX_20261118.md) |
| B [#36](https://github.com/kot5432/vacant-house/issues/36)・[#37](https://github.com/kot5432/vacant-house/issues/37) | [U02の画面構成](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[P01〜P12判定の契約](RULE_ENGINE_CONTRACT_V1.md)、[画面・エラー](STEP14_SCREEN_BEHAVIOR_AND_ERROR_MATRIX_20261119.md) |
| C [#38](https://github.com/kot5432/vacant-house/issues/38)・[#39](https://github.com/kot5432/vacant-house/issues/39) | [編集・進捗・要再確認の状態遷移](STEP26_SAVE_EDIT_RECHECK_STATE_TRANSITIONS_20261119.md)、[U03](STEP5_03_PREPARATION_PLAN_UI.md)、[U04](STEP5_04_EDIT_SAVE_ERROR_UI.md) |
| D [#40](https://github.com/kot5432/vacant-house/issues/40)・[#41](https://github.com/kot5432/vacant-house/issues/41)・[#42](https://github.com/kot5432/vacant-house/issues/42) | [型/API一覧](STEP25_TYPESCRIPT_DOMAIN_TYPES_AND_REPOSITORY_SIGNATURES_20261119.md)、[バックアップJSON schema](contracts/backup-v1.schema.json)、[検証ノート・fixtures](contracts/VALIDATION_NOTES.md) |
| E [#43](https://github.com/kot5432/vacant-house/issues/43)・[#44](https://github.com/kot5432/vacant-house/issues/44)・[#45](https://github.com/kot5432/vacant-house/issues/45) | [一次資料の掲載審査](STEP28_TAKAOKA_VERIFIED_SOURCE_REVIEW_REGISTER_20261119.md)、[需要検証](STEP22_DEMAND_DIFFERENTIATION_VALIDATION_PLAN_20261119.md)、[チーム受入](STEP27_TEAM_TASK_ACCEPTANCE_AND_RELEASE_GATES_20261119.md) |

## 全員共通
- [既存共通UIの使い方](SHARED_UI_IMPLEMENTATION_AND_OWNERSHIP_20261121.md)（PR #66はmain統合済み。専用実画面テストは未実施）
- [UI・Git共通ルール](TEAM_SHARED_DEVELOPMENT_AND_UI_RULES_20261121.md)／[GitHub操作](GIT_WORKFLOW_AND_BRANCH_RULES.md)
- [全7画面とエラー](STEP14_SCREEN_BEHAVIOR_AND_ERROR_MATRIX_20261119.md)
- [機能間のインターフェース](STEP13_CROSS_FEATURE_INTERFACE_CONTRACT_20261119.md)
- [リリース受入](STEP27_TEAM_TASK_ACCEPTANCE_AND_RELEASE_GATES_20261119.md)
- [競合する旧仕様の監査](FINAL_SOURCE_OF_TRUTH_AND_LEGACY_CONFLICT_AUDIT_20261119.md)

## 古い資料をどう扱う？
- 本ディレクトリの `PREDEV_*`、`PREIMPLEMENTATION_*`、`STEP2_SURVEY_Q*_OPTIONS*`、`FOUR_PERSON_*` や `STEP6〜STEP12` の採用前の選択肢ファイルは**設計履歴です**。通常の実装時に全件を読む必要はなく、正式決定を上書きしません。
- [以前の長いREADMEの履歴](README_HISTORY_20261121.md)を保持。過去の課題整理・提案・不採用案は歴史的背景として参照。
- 249ファイルの内訳・削除しない理由・今後の安全な削減基準は [DOCUMENT_POLICY](../DOCUMENT_POLICY.md)。
- 最新の実際の開発状態は mainのソースコード、[Issue](https://github.com/kot5432/vacant-house/issues)、[PR](https://github.com/kot5432/vacant-house/pulls)で確認する。文書が存在するだけで実装済み・試験済みではない。
