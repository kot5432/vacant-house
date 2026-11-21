# 富山県プログラミングコンテスト｜地域活動「参加・企画」Webアプリ

> **最新の開発案内（2026-11-21）**：A〜Dの共通React/TypeScript/Vite土台とpackage-lock.jsonはmainへ反映済み。EのPCで仮画面の起動・型チェック・ビルドが確認されています。**各担当者の環境確認は別途必要**です。旧空き家案ではなく、富山県の地域活動への参加と初めてのイベント企画を支援する単一アプリです。

## 開発メンバーへ：ここから始める

<https://github.com/kot5432/vacant-house/blob/main/docs/CODEX_START_HERE.md>

**[🔰 Codex開発スタートガイド](docs/CODEX_START_HERE.md)** をA〜D全員の最初の入口とします。GitHubのdocsを全件読む必要はありません。開発に使う正式仕様は[短い目次](docs/v3/README.md)、古い設計履歴の扱いは[文書整理方針](docs/DOCUMENT_POLICY.md)にまとめています。

| 目的 | まず開くもの |
|---|---|
| 初めてPCの開発環境を用意 | [全員のセットアップガイド](docs/ALL_MEMBERS_PC_SETUP.md) ／ [環境報告 #55](https://github.com/kot5432/vacant-house/issues/55) |
| 自分の担当と最初のPR | **[Codex開発スタート](docs/CODEX_START_HERE.md)** / [担当別の詳細説明](docs/BEGINNER_OWNER_WORKFLOWS.md) |
| 期限・完成予定 | [A〜D個別スケジュール案](docs/v3/TEAM_INDIVIDUAL_DEVELOPMENT_SCHEDULE_PROPOSAL_20261121.md) |
| Gitでの取り込みとUI統一 | [チーム共通開発・UIルール](docs/v3/TEAM_SHARED_DEVELOPMENT_AND_UI_RULES_20261121.md) |
| 実装する機能の正式仕様 | [v3の正式仕様・技術資料目次](docs/v3/README.md) |
| PRレビューの基本規則 | [CONTRIBUTING.md](CONTRIBUTING.md) |

## アプリの構成

- **参加する（A）**：D00二入口→D01活動一覧・絞り込み→D02活動詳細・公式情報。実在活動はEと別人による根拠審査で承認したもののみ表示。承認済み活動がなくても0件画面が成立する。
- **企画する（B/C/D）**：U01保存済み一覧→U02基本6問→U03親P01〜P12の理由付き準備プランと進捗→U04編集。本人のイベントデータはIndexedDB/Dexieに保存し、JSON書出し・取込に対応する。
- **E**：富山の一次情報と掲載承認、利用者検証、各PRの品質レビュー、全体統合と応募資料。

**技術**：React + TypeScript + Vite ／ IndexedDB + Dexie ／ Vercel（公開は別途承認が必要）。[ADR-030](docs/v3/ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md)、[ADR-031](docs/v3/ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)、[ADR-032](docs/v3/ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md)を守り、旧空き家マッチング機能や親タスクの子チェックを追加しません。

## 直近の目標（チーム承認前の計画）

- **2026/11/23**：担当機能の実装開始
- **2026/11/29**：A〜D全員が最初の小PRを1本提出
- **2026/12/20**：MVPの主要機能実装・統合の目標
- **2026/12/27**：実機受入と重大な不具合修正の目標
- **2027/01/03**：応募用動画・資料の完成目標
- **2027/01/07**：応募の目標日（公式の募集期限を再確認すること）

## 文書の扱い

**普段読むのは [Codex開発スタート](docs/CODEX_START_HERE.md)、担当Issue、必要なADRだけ**です。既存docsには設計履歴が多数ありますが、採用済み仕様や根拠へのリンクを壊さないため保管しています。分類は[文書整理方針](docs/DOCUMENT_POLICY.md)、着手前の残確認は[開発前チェック](docs/DEVELOPMENT_READINESS_20261121.md)、時系列履歴は[旧README](docs/v3/README_HISTORY_20261121.md)です。

**現在の作業状態は、GitHubのPR・Issue・本人の実行結果で確認してください。** このREADMEや設計文書の更新は、機能実装・デプロイ・イベント掲載承認・応募を済ませたことを意味しません。
