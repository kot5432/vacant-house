# 開発者向けドキュメントの入口

**A〜Dが開発する際は、最初に [Codex開発スタートガイド](CODEX_START_HERE.md) を開いてください。** この1ページから担当Issue・最初のブランチ・Codexへの指示・PRまで進めます。

## まず見る4つ（全員共通）

| 目的 | 開くページ |
|---|---|
| **Codexで開発を始める** | **[CODEX_START_HERE.md](CODEX_START_HERE.md)** ／ [AGENTS.md](../AGENTS.md) |
| PCの準備・自分の実行結果の報告 | [ALL_MEMBERS_PC_SETUP.md](ALL_MEMBERS_PC_SETUP.md) → [Issue #55](https://github.com/kot5432/vacant-house/issues/55) |
| 仕様を確認する | **[v3の正式仕様・担当別資料](v3/README.md)** |
| 11/23までの残確認事項 | [開発前チェックリスト](DEVELOPMENT_READINESS_20261121.md) |

GitHub DesktopやPRの操作が分からない場合だけ [BEGINNER_START_HERE.md](BEGINNER_START_HERE.md)／[担当別の詳細説明](BEGINNER_OWNER_WORKFLOWS.md) へ。

## 担当者の最初のIssue

| A：参加 | B：入力・判定 | C：進捗・編集 | D：型・保存 |
|---|---|---|---|
| [#34](https://github.com/kot5432/vacant-house/issues/34) → [#35](https://github.com/kot5432/vacant-house/issues/35) | [#36](https://github.com/kot5432/vacant-house/issues/36) → [#37](https://github.com/kot5432/vacant-house/issues/37) | [#38](https://github.com/kot5432/vacant-house/issues/38) → [#39](https://github.com/kot5432/vacant-house/issues/39) | [#40](https://github.com/kot5432/vacant-house/issues/40) → [#41](https://github.com/kot5432/vacant-house/issues/41) → [#42](https://github.com/kot5432/vacant-house/issues/42) |

Eは [#43 一次資料](https://github.com/kot5432/vacant-house/issues/43)・[#44 需要検証](https://github.com/kot5432/vacant-house/issues/44)・[#45 全体統合](https://github.com/kot5432/vacant-house/issues/45)・A〜DのPRレビューを担当します。

## 正本と過去の資料の違い

- **現行アプリ**：「地域活動に参加する／初めて企画する」。旧空き家マッチング案ではありません。
- **正式に採用した仕様**：ADR-001〜032、特に [ADR-029](v3/ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md)、[ADR-030](v3/ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md)、[ADR-031](v3/ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)、[ADR-032](v3/ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md)。
- **共通UIは実装済みの土台**：[PR #66](https://github.com/kot5432/vacant-house/pull/66)でmainに統合。[使用方法](v3/SHARED_UI_IMPLEMENTATION_AND_OWNERSHIP_20261121.md)。専用の実画面操作テストは未実施。
- **過去の検討履歴**は原則として開発時に読まなくて大丈夫です。大量のdocsの分類・保存理由は **[DOCUMENT_POLICY.md](DOCUMENT_POLICY.md)** へ。

## 共通作業の原則

**同じReactアプリを各自のブランチで編集 → 小PR → Eのレビュー → mainへ統合**。最新mainは各自のブランチに取り込みます。mainへ直接Pushしません。

- [共通UI/チーム開発ルール](v3/TEAM_SHARED_DEVELOPMENT_AND_UI_RULES_20261121.md)
- [GitとPRの詳しいルール](v3/GIT_WORKFLOW_AND_BRANCH_RULES.md)・[CONTRIBUTING](../CONTRIBUTING.md)

**予定**：11/23開発開始、11/29最初の小PR提出（各人の状況で調整）。CI・デプロイ・外部公開・無承認イベントの掲載・応募送信は別の許可・確認が必要です。

**迷ったら**：Codexにはまず [AGENTS.md](../AGENTS.md) と [CODEX_START_HERE.md](CODEX_START_HERE.md)、**自分のIssue本文と最新コメント**を読ませてください。昔のSTEPを全部読ませないこと。
