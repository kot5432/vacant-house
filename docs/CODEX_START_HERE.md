# 🔰 A〜D・Codex開発のスタート地点

**まずこのページを開き、Codexにも最初に読ませてください。** 現行MVPは「参加する／企画する」の**1つのWebアプリ**です。旧空き家アプリではありません。

## まずはこの5段階だけ（A〜D共通）

**毎回の流れ：担当Issue確認 → Codexで実装・確認 → PR提出 → Eがレビュー・マージ → 次のIssueへ。** PC環境確認は済んでいる前提です。操作が不安な箇所だけ[GitHub Desktopの詳しい操作ガイド](BEGINNER_START_HERE.md)を開いてください。

### 1. 自分のIssueとブランチを開く
- 下の表の**最初のIssue**を確認し、今回作る範囲・完了条件・関連仕様を読む。
- GitHub Desktopで `main` を選び **Fetch origin → Pull origin**（最新のmainを取得）。
- **自分の作業中のfeatureブランチ**に切り替え、**Branch → Update from main** で最新mainを反映する。最初の4ブランチはEが用意済み。未コミット変更や競合があれば勝手に破棄せずEへ相談する。
- **mainで機能開発しない。** 他の人のPRがマージされた後も、作業中ブランチには最新版を取り込む。

### 2. Codexで小さく実装・動作確認する
- Codexで**このリポジトリのルートフォルダ**を開き、[AGENTS.md](../AGENTS.md)、このページ、**担当Issue本文・最新コメント**と関連ADRを参照させる。具体的なコピペ指示は下の「Codexへの最初の指示」を使う。
- **編集前に** Codexへ「変更予定ファイル・完成条件・他担当への影響」を説明させる。仕様が曖昧ならIssueで質問する。
- Codexの差分を本人も確認し、`npm run typecheck`・`npm run build`・必要な画面操作を確認。できなかった項目は `not_run` と理由を記録する。最初のPRは**小さな機能1つ**でよい。

### 3. Commit・PushしてPRを出す
- GitHub Desktopの **Changes** で追加・削除されたファイルを確認 → **Commit to 自分のブランチ** → **Push origin**。
- **Create Pull Request**（またはGitHubの **Compare & pull request**）から、**base = main / compare = 自分のfeatureブランチ**でPRを作る。
- PR本文には「担当Issue番号、作ったもの、まだ作っていないもの、変更ファイル、実際の確認結果／`not_run`、困っていること」を書く。**E @kot5432 にレビュー依頼**。PRを作成しただけでは完了ではない。
- 画面操作やボタンの詳細は[GitHub Desktop初心者ガイド](BEGINNER_START_HERE.md)、コピー用のPR本文は[担当別の詳細手順](BEGINNER_OWNER_WORKFLOWS.md)を参照。

### 4. Eがレビューしてmainへマージする
- Eが **Files changed・仕様・テスト結果・他担当への影響**を確認し、必要なら修正を依頼する。
- 修正依頼が来たら、**同じ作業ブランチで修正 → Commit → Push**。**同じPRが更新される**ので、原則PRを作り直さない。
- Eが内容と必要な確認を認めたら**Eがmainへマージ**し、担当者へ知らせる。GitHubで承認が必須設定でなくても、**Eの確認を省略しない**。

### 5. 最新mainを取り込み、次のIssueへ
- A〜Dはマージ連絡後、GitHub Desktopで **mainに切り替え → Fetch origin → Pull origin**。これで自分のPCのmainに統合済みの変更が入る。
- **まだ作業中の別ブランチがある場合のみ**、そのブランチへ切り替えて **Update from main**。**マージ済みの古いブランチを更新し続ける必要はない**。
- 次のIssueは、**最新mainを起点に新しいブランチを作って**始める（最初の4ブランチの使い回しはしない）。マージ後は担当Issueに完了した範囲と未実装部分を記録し、受入条件が満たされたことを確認してからクローズする。

**困ったとき**：まず自分のIssueへ「何をした／どうなった／何を知りたい」をコメント。Git・競合・レビュー判断はEへ相談。API/型の接続は関連担当にも共有してください。

## 1. 誰が何を見る？

| 担当 | 最初のIssue・目標 | 次のIssue | 最初のブランチ |
|---|---|---|---|
| **A @Gr3311Moonn** | [#34：D00参加/企画の2入口・D01公開0件一覧](https://github.com/kot5432/vacant-house/issues/34) | [#35：活動詳細](https://github.com/kot5432/vacant-house/issues/35) | `feature/34-participation-entry` |
| **B @unoyuyu0913-design** | [#36：U02基本6問入力・保存境界](https://github.com/kot5432/vacant-house/issues/36) | [#37：P01〜P12判定](https://github.com/kot5432/vacant-house/issues/37) | `feature/36-organizer-input` |
| **C @ynykrrc1219-stack** | [#38：U03親タスク進捗・要再確認](https://github.com/kot5432/vacant-house/issues/38) | [#39：U04編集](https://github.com/kot5432/vacant-house/issues/39) | `feature/38-parent-progress` |
| **D @milkyara** | [#40：EventInput/EventRecordとRepository型](https://github.com/kot5432/vacant-house/issues/40) | [#41：保存/U01](https://github.com/kot5432/vacant-house/issues/41) → [#42：JSON](https://github.com/kot5432/vacant-house/issues/42) | `feature/40-domain-types` |

**共通UIは既に[PR #66](https://github.com/kot5432/vacant-house/pull/66)でmainに統合済み**。再作成せず、[コンポーネント使用ガイド](v3/SHARED_UI_IMPLEMENTATION_AND_OWNERSHIP_20261121.md)を参照。共通UIの専用実画面操作テストは**未実施**で、品質追跡は[#65](https://github.com/kot5432/vacant-house/issues/65)。

## 2. Codexへの最初の指示（各自が `#XX` を自分の番号に置換）
```text
このリポジトリの既存のReactアプリを担当Issue #XXに沿って開発したいです。
まず、ルートAGENTS.md、docs/CODEX_START_HERE.md、docs/v3/README.md、
担当Issue #XXの本文と最新コメントを確認してください。
ADR-029〜032と関連する現行仕様、実際のsrc/構造・共有UIを調べてください。
今回はIssueの最初の小さな機能だけを対象にします。

【編集前に必ず】
1. 理解した仕様と受入条件
2. 今回すること／しないこと
3. 変更するファイル名と理由
4. 他担当への依存・衝突・不明点
を説明してください。重要な仕様衝突がある場合は実装せず質問してください。

その後、私が内容を確認してから実装してください。
mainに直接コミット・Pushしないでください。
実際に行ったtypecheck/build/操作確認と未実施(not_run)を分けて報告し、
Issue番号付きの小PRにまとめる準備まで案内してください。
```

**注意**：CodexがGitHubのIssueを直接取得できない環境では、Issue本文・コメントを入力として共有する必要があります。アクセスできたふりをしないでください。

## 3. どのdocsが仕様の正本？
- [docs/v3/README.md](v3/README.md)＝テーマ別の最新索引。大量の旧docsを最初から全部読む必要なし。
- [ADR-030](v3/ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md)＝参加D00〜D02＋企画U01〜U04。
- [ADR-031](v3/ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)＝P01〜P12**親タスクのみ**。
- [ADR-029](v3/ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md)・[ADR-032](v3/ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md)＝保存型/JSON/判定の契約。
- [全画面・エラーの仕様](v3/STEP14_SCREEN_BEHAVIOR_AND_ERROR_MATRIX_20261119.md)・[型/API](v3/STEP25_TYPESCRIPT_DOMAIN_TYPES_AND_REPOSITORY_SIGNATURES_20261119.md)・[進捗/編集状態](v3/STEP26_SAVE_EDIT_RECHECK_STATE_TRANSITIONS_20261119.md)は**自分の担当に関係する箇所だけ**参照。
- [共通の作業とUIルール](v3/TEAM_SHARED_DEVELOPMENT_AND_UI_RULES_20261121.md)・[既存共通部品](v3/SHARED_UI_IMPLEMENTATION_AND_OWNERSHIP_20261121.md)。

**古い資料の「まだ雛形がない」「共通UI作成予定」「4人分担」「実装開始不可」などは記載当時の履歴。** 最新のmain/現在のIssueコメント/採用済みADRに照らして判断。矛盾は黙って直さずEに報告。

## 4. 毎回どう報告する？
- 作業・質問・週1回の進捗は**自分のIssueコメント欄**に書く。
- 「今やっていること / 完了したこと / 詰まったこと / 次にすること / PR URL / 実行結果」を短く。
- 初回PCチェックは[#55](https://github.com/kot5432/vacant-house/issues/55)。B/C/Dの型や共有画面で衝突する場合は[#45](https://github.com/kot5432/vacant-house/issues/45)にもリンク。
- GitHub Desktopのクリック操作は[初心者向け操作ガイド](BEGINNER_START_HERE.md)、担当別の具体例は[詳細ガイド](BEGINNER_OWNER_WORKFLOWS.md)を参照。

## 5. PR前の確認
- Issueの受入条件を満たしたか。担当外のファイル変更や無断追加依存はないか。
- `npm run typecheck`、`npm run build`、必要な画面確認を**自分のPCで可能な範囲で実施**。未実行は`not_run`と理由を書く。
- 本物のデータ保存とmock、実在・掲載承認済み活動と例示を区別する。
- **PRを提出してEにレビュー依頼**。本人以外のレビュー・必要な確認・mainマージ後にIssueを完了とする。
- **CI・Vercel公開・外部アンケート配布・応募送信は許可された別工程まで行わない**。

**困ったとき：まず自分のIssueにコメント → 必要なら@kot5432をメンション。**
