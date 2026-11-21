> **2026-11-21 更新：開発開始の最新案内**：[共通React環境とA〜Dの最新手順](START_DEVELOPMENT_20261121.md)。Eが最小React+TypeScript+Viteファイルをmainへ追加しました。**依存取得ができなかったためpackage-lock.json生成・起動テストは未実施**。Dの初手は環境構築#51ではなく**共通型#40**に変更。**この更新案内と矛盾する古い説明は更新案内を優先**してください。

# docs｜まず読む資料

## 初めてGitHubでチーム開発をする人

**最初にこちらを読んでください。**

### [初心者向け：GitHub・PC準備からPR提出まで一からの操作ガイド](BEGINNER_START_HERE.md)

### [担当A〜D別：最初に作るもの・AIへの依頼例・PR完了条件](BEGINNER_OWNER_WORKFLOWS.md)

GitHubにログインするところから、GitHub Desktop、Node.js/npm、Issueへの環境報告、レビュー、コード編集、コミット、PR作成まで、**画面上でどこを押すか**を順番に説明しています。A〜DとEで読む章が分かれています。

初回作業：
1. [担当表・GitHubの用語](BEGINNER_START_HERE.md#0-まず自分の担当を確認する)
2. [開発環境の確認とIssue #55への回答](BEGINNER_START_HERE.md#1-全員githubにログインして自分の環境を報告する最初の作業)
3. [自分に依頼されたPRのレビュー方法](BEGINNER_START_HERE.md#2-全員github上でレビューをする今すぐできる作業)
4. [GitHub Desktopでリポジトリを取得](BEGINNER_START_HERE.md#3-全員自分のpcにリポジトリを取得する)
5. [共通環境の最新の状態と担当別開始手順](START_DEVELOPMENT_20261121.md)／[A〜Cの最初の開発](BEGINNER_START_HERE.md#5-abc担当自分の機能を作る1123以降)

**注意：package.jsonはありますがpackage-lock.jsonは未生成、実行テストは未実施**です。先に[初回npm installと検証の手順](START_DEVELOPMENT_20261121.md)を参照。

## 詳細仕様と開発ルール
- [現行仕様・開発設計の正本（v3）](v3/README.md)
- [Git・GitHubの詳しい運用ルール](v3/GIT_WORKFLOW_AND_BRANCH_RULES.md)
- [技術方針 ADR-001](v3/ADR_001_TECH_STACK_ADOPTED.md)
- [現在の参加/主催MVP ADR-030](v3/ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md)

設計正本と初心者用説明が矛盾するときは**採用済みのADRと最新のIssueで確認**し、担当へ相談してください。READMEの履歴的な「まだ未許可」という文言よりも、2026-11-23からローカル実装/テスト許可というSTEP6の正式決定が優先します。CI/デプロイ/外部公開は未許可です。
