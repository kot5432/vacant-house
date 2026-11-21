> **2026-11-21｜現在の正式な進め方は [Codex開発スタート（5段階）](CODEX_START_HERE.md) です。** このページはGitHub Desktopの詳細操作を調べるための補助資料です。古いPR #47〜#60はクローズ済み、共通React土台・package-lock.json・共通UIはmain統合済みです。以下に残る「lockfileがまだない」「旧PRをレビューする」などの記述は過去の作業手順であり、**今は実施しないでください**。

# 初めてのチーム開発ガイド｜ここから始めてください

**対象：富山県プログラミングコンテスト・5人チーム（A〜E）／最終更新：2026-11-20**

このガイドは**GitHubをほとんど使ったことがない人向け**です。まずは「0 → 1 → 2 → 3」の順に進めれば大丈夫です。難しい用語はその都度説明します。

 > **大切なこと（2026-11-21更新）**：共通React雛形はEがmainへ追加しましたが、**package-lock.jsonと起動確認はまだ**です。初回はnpm installでlockfileを作って検証する必要があります。[最新の手順](START_DEVELOPMENT_20261121.md)を優先してください。
>
> 開発するのは**富山の地域活動に「参加する／企画する」ためのWebアプリ**です。リポジトリ名が `vacant-house` でも、昔の空き家アプリは作りません。
>
> **11月23日から各自のPCでコードを作る・動かすことは許可済み**。CI、デプロイ、プレビューURLの公開、外部へのアンケート配布、応募の送信はまだ行いません。

---

## 0. まず自分の担当を確認する

| 担当 | GitHubユーザー名 | 最初の作業 | 作業ページ |
|---|---|---|---|
| A | `Gr3311Moonn` | 参加する入口と「現在0件」の活動一覧 | [Issue #34](https://github.com/kot5432/vacant-house/issues/34) |
| B | `unoyuyu0913-design` | 地域イベント主催者向けの基本6問入力 | [Issue #36](https://github.com/kot5432/vacant-house/issues/36) |
| C | `ynykrrc1219-stack` | 親12タスクの進捗操作部分 | [Issue #38](https://github.com/kot5432/vacant-house/issues/38) |
| D | `milkyara` | **共通データ型を作る** → 保存・一覧・バックアップ | [Issue #40](https://github.com/kot5432/vacant-house/issues/40) → [#41](https://github.com/kot5432/vacant-house/issues/41) → [#42](https://github.com/kot5432/vacant-house/issues/42) |
| E | `kot5432` | 全体調整・一次情報の確認・A〜DのPRレビュー | [Issue #45](https://github.com/kot5432/vacant-house/issues/45) |

**Issue（イシュー）**とは「何を作るか書いた作業カード」です。自分のIssueをクリックし、本文を上から読んでください。質問があればそのページの一番下のコメント欄を使います。

### GitHubの重要な用語はこの5つ
- **Repository（リポジトリ）**：チームのファイル置き場。[ここ](https://github.com/kot5432/vacant-house)。
- **main（メイン）**：みんなで使う共通の正式な版。**直接書き換えません**。
- **Branch（ブランチ）**：自分の作業用のコピー。ここで変更します。
- **Commit（コミット）**：自分の変更をひと区切りとして記録すること。
- **Pull Request / PR（プルリクエスト）**：自分の変更を他の人に確認してもらい、mainへ入れてよいか相談するページ。
- **Review / Approve（レビュー／承認）**：他の人がPRの差分を確認し、取り込みを承認する操作。

---

## 1. 全員：GitHubにログインして自分の環境を報告する（最初の作業）

### 1-1 GitHubを開く
1. ブラウザー（Chrome、Edgeなど）で https://github.com/ を開きます。
2. 右上の **Sign in** からログイン。アカウントがなければ **Sign up** で作成します。
3. チームのリポジトリ https://github.com/kot5432/vacant-house を開きます。
4. 上側の **Issues** をクリック → 自分の担当番号（表を参照）をクリックします。
5. ページの下のコメント欄 **Leave a comment** に質問を書けます。書いたら **Comment** で投稿します。

### 1-2 PCに必要な道具を確認する
以下の3つを使います。

| 道具 | 何に使う？ | 入手先 |
|---|---|---|
| [GitHub Desktop](https://desktop.github.com/) | ブランチ・コミット・PRを**ボタン操作**で管理 | 公式サイト |
| [Node.js](https://nodejs.org/) | Reactアプリを自分のPCで動かす | 公式サイト。**v26.13.1**に合わせる |
| [VS Code](https://code.visualstudio.com/) または Cursor | コードを開いて編集する | 使いやすい方を1つ |

**Windows**：インストール後、スタートメニューから **PowerShell** または VS Code の **Terminal → New Terminal** を開きます。**macOS**：アプリ「ターミナル」を開きます。

順に以下を**1行ずつ**入力し、Enterキーを押します。

```bash
git --version
node --version
npm --version
```

- `git --version` が使えない場合：GitHub Desktopを導入後、[Git公式サイト](https://git-scm.com/downloads)からGitも導入して確認します。
- `node --version` が `v26.13.1` なら目標どおり。違う場合は**「版違い」と報告**し、D担当と確認してからそろえます。
- `npm --version` に数字が出れば、npmを使える状態です。npmはNode.jsに付属します。
- Windowsでコマンドの権限・スクリプト実行エラーが出たら、**管理者設定やPowerShellのセキュリティ設定をむやみに変更しない**でDへ相談してください。

### 1-3 結果をIssue #55に書く
1. [環境確認 Issue #55](https://github.com/kot5432/vacant-house/issues/55) を開きます。
2. 一番下のコメント欄へ、以下をコピーして埋めます。
3. **Comment** を押して投稿します。

```text
【開発環境確認】
担当：A / B / C / D
GitHubのリポジトリ：開けた / 開けない
Git：OK（バージョン） / 使えない / 未確認
Node.js：v26.13.1 / 別バージョン（表示された番号） / 未導入
npm：OK（表示された番号） / 使えない / 未確認
エディタ（VS Code・Cursorなど）：OK / 未準備
11月23日から作業：できる / 調整が必要 / わからない
11月23〜29日の作業時間目安：0〜2h / 3〜4h / 5〜8h / それ以上 / 不明
困っていること：
```

**共有しないもの**：GitHubパスワード、二段階認証コード、アクセストークン、秘密鍵、個人のPC内部のパス、プライベートなファイル。リポジトリは公開されています。

---

## 2. PRレビューの操作（レビューを依頼されたとき）

A〜Dは原則、自分のIssueをCodexで開発してPRを出し、**E @kot5432 にレビューを依頼**します。Eが作成したPRはA〜Dの別人がレビューします。**古い資料にあるPR #47〜#60はすでにクローズ済みのため、レビューする必要はありません。**

レビューを依頼された人だけ、**現在OpenのPR**で次の操作をします。

1. PRの **Conversation** で変更目的を読む。
2. **Files changed** で変更内容を見る（緑は追加、赤は削除）。
3. 質問は差分行の **＋** でコメント。
4. **Review changes** を押し、確認結果に応じて **Comment / Request changes / Approve** を選び **Submit review**。
5. 未確認のコードをApproveしない。Eがマージを担当し、作成者が勝手にマージしない。

全体の流れは [5段階ガイド](CODEX_START_HERE.md) を参照。

---

## 3. 全員：自分のPCにリポジトリを取得する

初めての人は**GitHub Desktop**がおすすめです。

1. [GitHub Desktop](https://desktop.github.com/) を起動し、自分のGitHubアカウントでサインイン。
2. メニュー **File → Clone repository...** を選択。
3. **URL** タブを開き、`https://github.com/kot5432/vacant-house.git` を入力。
4. **Local path**（保存先）を選びます。自分が分かるフォルダーでOKです。
5. **Clone** をクリック。
6. 上部の **Current repository** が `vacant-house` になっていることを確認。
7. 上部の **Current branch** が `main` なら、正式版のファイルを見ています。
8. **Fetch origin**（または **Pull origin**）が表示されたら押し、GitHub上の最新情報を取得します。

**すでにcloneした人**は、もう一度cloneせずにGitHub Desktopでそのフォルダーを開いてください。

注意：これは**ファイルを取得するだけ**。この段階で`src`がないのは異常ではありません。

---

## 4. 共通開発環境（現在の状態）

共通React/TypeScript/Vite土台、`package-lock.json`、共通UIはすでにmainへ統合済みです。各自が別々のプロジェクトを作成したり、新しくlockfileを生成する必要はありません。

初回の環境確認は [PCセットアップ](ALL_MEMBERS_PC_SETUP.md) に従います。確認が終わった人は、[Codex開発5段階](CODEX_START_HERE.md) へ進んでください。作業ブランチの変更はmainの最新版を取り込んでから行います。

---

## 5. A・B・C担当：自分の機能を作る（11/23以降）

### 5-1 最初にすること

共通環境はmainに統合済みです。**lockfile待ちや新規環境構築は不要**。A/B/C/Dとも [担当表と5段階の流れ](CODEX_START_HERE.md) を先に確認してください。

### 5-2 自分の担当ブランチを開いて実装する
1. GitHub Desktopで **Fetch origin** を押して更新を取得する。
2. **Current branch**からEが用意した**自分の担当ブランチ**を選ぶ（新規作成しない）。共通lockfileが追加された後は、その変更を失わないようmainから取り込む。

| 担当 | ブランチ名の例 |
|---|---|
| A | `feature/34-participation-entry` |
| B | `feature/36-organizer-input` |
| C | `feature/38-parent-progress` |

3. GitHub Desktopの **Repository → Open in Visual Studio Code**（または自分のエディタでフォルダーを開く）。
4. エディタの **Terminal → New Terminal** を開きます。ターミナルの場所が `vacant-house` フォルダーか確認します。
5. 次を1行ずつ実行。

```bash
node --version
npm ci
npm run dev
```

6. ターミナルに表示された**ローカルURL**（多くのVite環境では`http://localhost:5173/`ですが実際の表示を優先）をブラウザーで開く。アプリが表示されるか確認。
7. 開発サーバーを止めるときはターミナルで **Ctrl+C**。続いて`npm run build`を実行し、エラーを確認。
8. **自分の担当範囲のファイル**を変更。Aは参加、Bは入力、Cは親進捗の操作を担当。ほかの人の共通ファイルを無断で大きく編集しない。
9. GitHub Desktopに戻り、変更ファイルを一つずつ確認。左下のSummaryに変更内容 → **Commit to（自分のブランチ）**。
10. **Publish branch / Push origin** → **Create Pull Request**。
11. PRの説明に「Issue番号・変更した内容・実際に試したこと/未実施・相談事項」を記入。Reviewerに**E @kot5432**を指定。
12. 指摘があれば**同じブランチで修正→Commit→Push**。修正内容は自動で同じPRへ反映されます。
13. 別人のレビュー・必要な検証・mainへの統合が済んだら、そのIssueを完了にします。**PRを作っただけで完了ではありません**。

---

## 6. E担当：レビューとmainへの統合

1. https://github.com/kot5432/vacant-house/pulls を開く。
2. **A〜DからのPR**を開き、変更内容とIssue、ADR、テスト記録を確認する。
3. **Files changed**で最新の差分を読む。分からない箇所は担当者に質問し、必要なら修正依頼をする。
4. 問題なければ **Review changes → Approve → Submit review**。
5. mainがほかのPRで変わった場合、**そのPRが引き続き正しく統合できるか**、README・CONTRIBUTINGなど他PRと同じファイルが消えないか再確認する。
6. 必要なレビュー・チェックがそろい、保護ルールで許される状態になったPRだけ、**Merge pull request**などの適切な方法で統合する。
7. **E自身が作成したPR**はA〜Dにレビューを依頼。Eが自己承認したことにしない。
8. PRをマージしたあと、Issueの完了条件が満たされているか確認して閉じる。満たさなければ残作業をIssueに記録する。

**必ずしも今ある全部の文書PRを一括マージする必要はありません。** 優先順は[STEP14の整理](v3/STEP14_PR_REVIEW_PRIORITY_AND_CONFLICT_RESOLUTION_20261120.md)（PR #59でレビュー中）参照。

---

## 7. 困ったときは（最初にここを見る）

| 困りごと | 対応 |
|---|---|
| 「Repository not found」 | GitHubにログインできているか、URLが正しいか確認。Eへ相談 |
| `git` / `node` が見つからない | そのツールのインストールや再起動を確認。Dへ相談 |
| Node.jsが`v26.13.1`ではない | バージョンを報告。勝手に共通指定を変更せずDと相談 |
| `npm ci`が失敗する | **2026-11-21現在、package-lock.jsonがまだありません**。E管理の[#51](https://github.com/kot5432/vacant-house/issues/51)で初回`npm install`→lockfile作成・確認が必要です。完了してから`npm ci`を実行してください |
| `package.json`がない | `main`の更新が古い可能性があります。GitHub Desktopでmain→Fetch/Pullして確認。`package-lock.json`がないのはまだ未対応の共有環境残作業です |
| コードを変えたのにGitHubで見えない | GitHub Desktopで`Commit`した後、`Push origin`も押す |
| 自分が`main`にいる | 変更を始めず、**Current branch**から自分用ブランチを作る。すでに変更した場合はE/Dに相談 |
| `Merge pull request`が押せない | レビュー未承認、コメント未解決、競合などが原因の可能性。無理に設定を変えない |
| 変更が競合した | GitHub Desktopの競合表示を確認。**片方の変更を一括削除しない**でEと関係担当に相談 |
| AIコーディングの結果が分からない | そのまま提出せず、AIに変更ファイルと理由を説明させ、**自分で差分を確認**する |
| 間違ってパスワードや鍵を貼った | 内容をさらに公開せず、**すぐEへ安全な連絡手段で知らせる**。削除だけで安全になるとは限らない |

### 質問を書く場所と書き方
自分の[担当Issue](https://github.com/kot5432/vacant-house/issues)を開いてコメントします。例：

```text
【質問】
担当：B / Issue #36
やろうとしていること：6問の入力画面を作る
困っていること：npm ciでエラーが出る
確認したこと：Node.jsのバージョンは26.13.1
聞きたいこと：最初にどのファイルを確認すればいいですか？
（鍵・個人情報・PC内の個人パスは貼らない）
```

### 進捗の報告
基本は**週1回、担当Issueにコメント**します。定例会議はなく、必要な場合だけ短い相談をします。ブロッカーは週末まで待たずにIssueで共有。全体に関係する問題は[Issue #45](https://github.com/kot5432/vacant-house/issues/45)へ。

```text
【週次進捗】
担当：／Issue：
状態：未着手 / 作業中 / PR準備中 / レビュー待ち / ブロック中 / 完了
できたこと：
次にやること：
困っていること：
PRリンク（なければなし）：
テスト：未実施 / 実際のコマンドと結果：
```

---

## 8. 一番最初のチェックリスト

**全員が今すぐできること**
- [ ] GitHubにログインしてチームのリポジトリを開いた
- [ ] 自分のIssueを開いて、担当を確認した
- [ ] Git/Node.js/npmを調べて[Issue #55](https://github.com/kot5432/vacant-house/issues/55)にコメントした
- [ ] 自分に依頼されたPRを`Files changed`で読み、質問またはレビューを提出した
- [ ] GitHub Desktopでリポジトリをcloneした（未整備ならD/Eに相談）

**11月23日以降**
- [ ] Eまたは協力者が#51にlockfileと動作確認の実測結果を記録した
- [ ] 共通環境のlockfile PRが承認・main統合されたことを確認した
- [ ] A〜Cはmainから自分のブランチを作り、`npm ci`と`npm run dev`を実行できた
- [ ] 各担当が小さな変更をCommit→Push→PR提出した（11/29目標）
- [ ] 別人レビューと必要な確認を経てからmainへ統合した

**分からなくなったら**：まずこのガイドの該当章へ戻る → 担当Issueへ質問 → DまたはEに相談。勝手に`main`、lockfile、保護設定を変更しないでください。
