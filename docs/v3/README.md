# v3 現行仕様・開発資料の入口

> **更新：2026-11-21。** 富山県プログラミングコンテストの作品は「地域活動に参加する／初めて企画する」を支援する**1つのWebアプリ**です。旧「空き家活用・マッチング」案を現在のMVPへ戻さないでください。
>
> **このページは目次です。** 過去の長い時系列READMEは[履歴として保存](README_HISTORY_20261121.md)しました。既存の設計ファイルは削除・移動していません。古い設計と新しい採用済みADRに矛盾があれば、最新の正式決定とIssueを優先してください。

[⬅ 初心者・開発者向けの短い入口](../README.md) ｜ [プロジェクトトップ](../../README.md)

## まず何を見る？（5人が最初に開く）

| 誰・目的 | この資料から始める | 次に見るもの |
|---|---|---|
| **全員：最初の作業** | [開発開始ガイド](../START_DEVELOPMENT_20261121.md) | [PCセットアップ](../ALL_MEMBERS_PC_SETUP.md)、[Issue #55](https://github.com/kot5432/vacant-house/issues/55) |
| **全員：共同開発** | [共通の開発・UI・統合ルール](TEAM_SHARED_DEVELOPMENT_AND_UI_RULES_20261121.md) | [Git/PR操作](GIT_WORKFLOW_AND_BRANCH_RULES.md)、[CONTRIBUTING](../../CONTRIBUTING.md) |
| **全員：いつまでに何をする？** | [A〜D個別スケジュール案](TEAM_INDIVIDUAL_DEVELOPMENT_SCHEDULE_PROPOSAL_20261121.md) | [Issueの依存関係](WORK_PACKAGE_DEPENDENCIES_AND_START_GUIDES_20261119.md) |
| **A：参加・一覧・活動詳細** | [Issue #34](https://github.com/kot5432/vacant-house/issues/34) → [#35](https://github.com/kot5432/vacant-house/issues/35) | [D00〜D02仕様・アーキテクチャ](DUAL_ENTRY_UX_SEARCH_ARCHITECTURE_REVIEW_20261121.md) |
| **B：初回入力・準備プラン** | [Issue #36](https://github.com/kot5432/vacant-house/issues/36) → [#37](https://github.com/kot5432/vacant-house/issues/37) | [U01/U02画面](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[判定・画面](STEP14_SCREEN_BEHAVIOR_AND_ERROR_MATRIX_20261119.md) |
| **C：進捗・イベント編集** | [Issue #38](https://github.com/kot5432/vacant-house/issues/38) → [#39](https://github.com/kot5432/vacant-house/issues/39) | [保存/編集/再確認の状態遷移](STEP26_SAVE_EDIT_RECHECK_STATE_TRANSITIONS_20261119.md) |
| **D：共通型・保存・JSON** | [Issue #40](https://github.com/kot5432/vacant-house/issues/40) → [#41](https://github.com/kot5432/vacant-house/issues/41) → [#42](https://github.com/kot5432/vacant-house/issues/42) | [共有型・Repository契約](STEP25_TYPESCRIPT_DOMAIN_TYPES_AND_REPOSITORY_SIGNATURES_20261119.md)、[Schema/fixtures](contracts/VALIDATION_NOTES.md) |
| **E：出典確認・需要・品質** | [Issue #43](https://github.com/kot5432/vacant-house/issues/43) → [#44](https://github.com/kot5432/vacant-house/issues/44) → [#45](https://github.com/kot5432/vacant-house/issues/45) | [掲載審査台帳](STEP28_TAKAOKA_VERIFIED_SOURCE_REVIEW_REGISTER_20261119.md)、[ユーザー調査フォーム設計](STEP2_GOOGLE_FORM_FINAL_STRUCTURE_AND_BRANCHING_20261121.md) |

**A〜D初心者向け：** [自分のIssueを開いた後の詳しい手順](../BEGINNER_OWNER_WORKFLOWS.md)。全員で別々のアプリを作るのではなく、1つのmainにPR経由で順次取り込みます。

## 仕様の優先順位（迷ったらここに戻る）

1. **正式決定（ADR）と現在の担当Issue**：新しい採用済みADRが旧設計書と衝突する場合は正式ADRを優先。変更したいときは新たに相談・記録する。
2. **現行MVP**：[ADR-030 参加D00〜D02＋企画U01〜U04](ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md) ／ [ADR-031 親P01〜P12のみ](ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)。
3. **共有データ・保存**：[ADR-029 input.date/JSON識別子](ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md) ／ [ADR-032 型・検証・Repository](ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md) ／ [JSON Schema v1](contracts/backup-v1.schema.json)。
4. **既存資料の衝突・廃止内容**：[最新正本と旧仕様の監査](FINAL_SOURCE_OF_TRUTH_AND_LEGACY_CONFLICT_AUDIT_20261119.md)。
5. **実装と人間の実際の作業の証拠**：GitHub PR、Issueコメント、実行テスト結果。古いREADMEの「未実装/未検証」は記載当時の状態です。

### 開発仕様を詳しく調べる

| テーマ | 正式仕様・現行契約の入口 |
|---|---|
| 技術と全体構成 | [技術ADR-001](ADR_001_TECH_STACK_ADOPTED.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[二入口の拡張設計](DUAL_ENTRY_UX_SEARCH_ARCHITECTURE_REVIEW_20261121.md) |
| 画面・機能 | [全7画面の主操作/例外](STEP14_SCREEN_BEHAVIOR_AND_ERROR_MATRIX_20261119.md)、[U03](STEP5_03_PREPARATION_PLAN_UI.md)、[U04](STEP5_04_EDIT_SAVE_ERROR_UI.md) |
| 機能間の接続 | [役割・データ受け渡し](STEP13_CROSS_FEATURE_INTERFACE_CONTRACT_20261119.md)、[Repository契約](STEP25_TYPESCRIPT_DOMAIN_TYPES_AND_REPOSITORY_SIGNATURES_20261119.md) |
| 保存とバックアップ | [状態遷移](STEP26_SAVE_EDIT_RECHECK_STATE_TRANSITIONS_20261119.md)、[Schema/検証ノート](contracts/VALIDATION_NOTES.md) |
| リリース・検証 | [テスト受入ゲート](STEP27_TEAM_TASK_ACCEPTANCE_AND_RELEASE_GATES_20261119.md)、[UI受入シナリオ](MVP_UI_REVIEW_SCENARIOS_AND_RELEASE_MINIMUM_20261119.md) |
| 地域情報の掲載 | [候補の一次資料/掲載前確認](STEP28_TAKAOKA_VERIFIED_SOURCE_REVIEW_REGISTER_20261119.md)（承認済み表示0件の状態を設計上の基準とし、実公開前に再点検） |
| 需要調査 | [GoogleフォームQ1〜Q13統合・分岐](STEP2_GOOGLE_FORM_FINAL_STRUCTURE_AND_BRANCHING_20261121.md)、[調査キット](USER_VALIDATION_INTERVIEW_SURVEY_PACK_20261119.md) |
| 応募 | [提出要件・確認ゲート](CONTEST_DELIVERY_REQUIREMENTS_AND_PROJECT_DECISION_GATES_20261119.md) |

## いまの開発状態（この目次を更新した時点）

- 共通のReact/Vite土台とpackage-lock.jsonはmainにあり、EのPCで環境確認・仮画面の起動が報告済み（[PR #63](https://github.com/kot5432/vacant-house/pull/63)）。
- A〜Dは**各自のPC**で [npm ciなどの確認](../ALL_MEMBERS_PC_SETUP.md)を行い、結果を[#55](https://github.com/kot5432/vacant-house/issues/55)に記録する。
- 初週は11/23開始・11/29までに小PR各1本が目標。12/20機能・12/27品質完成は**チーム確認前の提案日程**。
- CI、デプロイ、実イベント掲載承認、アンケート配布、コンテストへの応募提出は、この整理作業では行わない。

## 過去資料の扱い

- [従来の詳細・時系列README（全文保存）](README_HISTORY_20261121.md)には、これまでのSTEP・ADR・採用経緯へのリンクを残しています。
- **旧空き家案・古い子チェック・「JSONバックアップはMVP対象外」などの旧仕様を再利用しない**でください。
- 今回は**入口だけを整理**しており、個別の数百の設計ファイルの移動・削除・統合は行っていません。既存リンクの破損と決定ログの消失を避けるためです。
