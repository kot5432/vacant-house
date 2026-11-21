> **共通UIの実装案（レビュー中）**：[PR #66](https://github.com/kot5432/vacant-house/pull/66)／[共有コンポーネントの使い方・編集責任](v3/SHARED_UI_IMPLEMENTATION_AND_OWNERSHIP_20261121.md)。PRのレビュー・テスト・main統合前はA〜Dのmainにまだ反映されません。

# docs｜開発メンバー向け資料の入口

> **最終整理：2026-11-21**。このページから始めれば、過去の長い設計履歴を順に読む必要はありません。**現在作るのは1つのReactアプリ（地域活動に参加する／自分で企画する）**です。

## 🔰 最初に読む3つ

1. **[PCセットアップ・共通環境の確認](ALL_MEMBERS_PC_SETUP.md)** — GitHub Desktopでclone、Node.js、`npm ci`、起動、[Issue #55](https://github.com/kot5432/vacant-house/issues/55)へ報告。共通lockfileは[PR #63](https://github.com/kot5432/vacant-house/pull/63)でmainに統合済み。各自のPCでの成功は個別確認が必要。
2. **[自分の担当・初心者向け開発手順](BEGINNER_OWNER_WORKFLOWS.md)** — A〜Dが初週に何を作るか、AIコーディングの依頼例、PRの出し方。
3. **[チーム共通開発・UI・main取り込みルール](v3/TEAM_SHARED_DEVELOPMENT_AND_UI_RULES_20261121.md)** — 他メンバーの変更を自分のPCへ取り込む方法、共通UI/共有型、レビュー。デザインの具体値は仮基準でチーム確認待ち。

Git/GitHub操作に不慣れなら[GitHub DesktopやPRの初心者ガイド](BEGINNER_START_HERE.md)も確認。古い手順内の「lockfile未作成」などは記述当時の状態です。現在の環境状態は[PCセットアップ](ALL_MEMBERS_PC_SETUP.md)の2026-11-21の案内を優先してください。

## 担当別の開発入口

| 担当 | 今取りかかるIssue | 次のIssue | 何を開発？ |
|---|---|---|---|
| A @Gr3311Moonn | [#34](https://github.com/kot5432/vacant-house/issues/34) | [#35](https://github.com/kot5432/vacant-house/issues/35) | D00入口、D01一覧/検索、D02詳細 |
| B @unoyuyu0913-design | [#36](https://github.com/kot5432/vacant-house/issues/36) | [#37](https://github.com/kot5432/vacant-house/issues/37) | U02基本6問、P01〜P12判定とU03カード |
| C @ynykrrc1219-stack | [#38](https://github.com/kot5432/vacant-house/issues/38) | [#39](https://github.com/kot5432/vacant-house/issues/39) | U03親進捗・再確認、U04編集 |
| D @milkyara | [#40](https://github.com/kot5432/vacant-house/issues/40) | [#41](https://github.com/kot5432/vacant-house/issues/41) → [#42](https://github.com/kot5432/vacant-house/issues/42) | 共通データ型→Dexie/一覧→JSONバックアップ |
| E @kot5432 | [#43](https://github.com/kot5432/vacant-house/issues/43) | [#44](https://github.com/kot5432/vacant-house/issues/44)、[#45](https://github.com/kot5432/vacant-house/issues/45) | 地域情報の根拠・需要調査・PRレビュー・全体受入 |

[**A〜Dの期限入り個別開発スケジュール**](v3/TEAM_INDIVIDUAL_DEVELOPMENT_SCHEDULE_PROPOSAL_20261121.md)：11/23開始、11/29小PR、12/20機能完成、12/27品質確認は**提案日程**。各人の作業可能時間で調整してください。

## 技術とUIの正本

詳しい仕様が必要になったら**[現行v3仕様・分野別索引](v3/README.md)**を開いてください。主な資料：

| 知りたいこと | 開く資料 |
|---|---|
| MVPの採用範囲 | [ADR-030](v3/ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md)、[ADR-031](v3/ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md) |
| 技術型・保存のルール | [ADR-029](v3/ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md)、[ADR-032](v3/ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md) |
| 画面共通UI・操作 | [共通開発/UI](v3/TEAM_SHARED_DEVELOPMENT_AND_UI_RULES_20261121.md)、[7画面契約](v3/STEP14_SCREEN_BEHAVIOR_AND_ERROR_MATRIX_20261119.md) |
| 機能間の接続とデータ | [インターフェース契約](v3/STEP13_CROSS_FEATURE_INTERFACE_CONTRACT_20261119.md)、[型/API](v3/STEP25_TYPESCRIPT_DOMAIN_TYPES_AND_REPOSITORY_SIGNATURES_20261119.md) |
| どこまで実装する？ | [作業パッケージ依存表](v3/WORK_PACKAGE_DEPENDENCIES_AND_START_GUIDES_20261119.md) |
| 正式仕様と古い設計の差 | [新旧仕様の衝突監査](v3/FINAL_SOURCE_OF_TRUTH_AND_LEGACY_CONFLICT_AUDIT_20261119.md) |

## Gitでの統合（重要）

**別々のアプリを作りません。** 自分の担当ブランチで作業→小PR→別人レビュー→mainへマージ→各自が最新mainを取得し自分のブランチへ反映、を繰り返します。他人のファイルを手でコピーしないでください。

[GitHub Desktopの手順](v3/GIT_WORKFLOW_AND_BRANCH_RULES.md) ／ [チームのPRルール](../CONTRIBUTING.md)

## 履歴と古い資料

- 過去の設計資料を削除・移動しないで、**現在の資料へのリンクを先に整えました**。
- [旧v3 READMEの全文履歴](v3/README_HISTORY_20261121.md)には、これまでのSTEP・ADR・検討経緯を残しています。
- 旧空き家活用案、古い役割表、子チェック採用前の仕様は**実装しない**。最新の正式ADRを優先する。
- CI、Vercel公開、アンケート配布、イベント掲載、応募はこの文書整理では実行しない。
