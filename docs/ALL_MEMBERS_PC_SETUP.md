# A〜D全員：開発を始める前のPC準備（Windows・初心者向け）

**更新：2026-11-21／全員必須の事前確認**。A〜DもそれぞれのPCで、GitHubのコードを取得し、同じNode.js/npm環境でアプリを起動できるか確認します。Eが一度成功したからといって、A〜DのPCでも成功するとは限りません。

> **重要：EのIssue #51は完了前です。** EのWindows PCではNode v24.20.0で`npm ci`・型チェック・ビルド・Vite起動に成功しましたが、指定Node **v26.13.1**での確認と、`package-lock.json`のGitHub **mainへの反映はまだ**です。**A〜Dは`npm install`で各自ロックファイルを生成しない**でください。Eの#51が完了してから、下の手順3以降へ進みます。

## 1. まず準備するもの（全員）

- [GitHub Desktop](https://desktop.github.com/)：GitHubのファイルをPCに取得し、ブランチを切り替える
- [VS Code](https://code.visualstudio.com/)またはCursor：ファイルの編集とターミナル
- [Node.js公式ダウンロード](https://nodejs.org/en/download)：**v26.13.1 LTS**／**Windows**／**npm**。サイトの **fnm** はNode.jsの版を切り替えるツール。**fnmを選択した場合は、画面に出るfnmのインストール・シェル設定・Node v26.13.1のインストール手順も完了させる必要があります**。fnmは必須ではなく、既存のNode管理方法があればそれでもよい。端末/PowerShellを開き直してからバージョンを確認。
- Git：GitHub DesktopとGitを使える状態にする。不明ならGitHub Desktopの案内に従う

管理者権限やPowerShellの実行ポリシーをエラー回避のためにむやみに変更しない。うまくいかなければそのままIssue #55に相談。

## 2. 自分のPCにリポジトリを取得する

1. https://github.com/kot5432/vacant-house にログインする。
2. GitHub Desktop → **File → Clone repository...** → **URL**。
3. `https://github.com/kot5432/vacant-house.git` を入力し、**自分が分かる保存先**を選択 → **Clone**。
4. すでにCloneしているなら**もう一度Cloneしない**。GitHub Desktopで既存の`vacant-house`を開く。
5. GitHub Desktopで **Fetch origin**、続いて必要なら **Pull origin** で最新情報を取得。
6. GitHub Desktopの **Repository → Open in Visual Studio Code**（またはCursorでそのフォルダを開く）。
7. エディタの **Terminal → New Terminal**。PowerShellが`vacant-house`直下で開いているか確認。

**コピーして実行する確認コマンド：**

```powershell
git --version
node --version
npm --version
```

**期待するNode.js表示：`v26.13.1`**。npmはバージョン番号が出ることを確認（具体番号はEが#51で実測した結果に合わせる）。

Nodeが違う版の場合は、まずバージョン切替を行う。複数のNode.js導入方法（fnm／直接インストーラー等）をむやみに混ぜない。

## 3. Eから「Issue #51完了・lockfileがmainに入った」と連絡が来た後に実行

**まだEの#51が完了していなければこの章は実行しない。**

1. GitHub Desktopで`main`に切り替え、**Fetch origin → Pull origin**。
2. 自分の担当ブランチを選ぶ（下の表）。作成済みなので**新しいブランチを作らなくてよい**。担当ブランチが最新mainより古ければ、GitHub Desktopの **Branch → Update from main** などでmainの変更を取り込む（**自分の未コミット変更がない状態で**実行。競合したら自分で強制上書きせず相談）。
3. ターミナルで`package-lock.json`があるか確認し、次を**1行ずつ**実行。

```powershell
node --version
npm --version
npm ci
npm run doctor
npm run typecheck
npm run build
npm run dev
```

4. `npm run dev`に表示された**Local** URL（通常`http://localhost:5173/`）をブラウザーで開く。**「地域活動の参加と企画をサポート」**という仮画面が表示されれば、起動確認OK。
5. 起動中のPowerShellで **Ctrl+C** を押してViteサーバーを停止。
6. [Issue #55](https://github.com/kot5432/vacant-house/issues/55)のコメント欄へ結果を報告。**全コマンドが成功した場合のみ「成功」**と書く。

| 担当 | 初週のIssue | 既に作成済みのブランチ |
|---|---|---|
| A @Gr3311Moonn | [#34](https://github.com/kot5432/vacant-house/issues/34) | `feature/34-participation-entry` |
| B @unoyuyu0913-design | [#36](https://github.com/kot5432/vacant-house/issues/36) | `feature/36-organizer-input` |
| C @ynykrrc1219-stack | [#38](https://github.com/kot5432/vacant-house/issues/38) | `feature/38-parent-progress` |
| D @milkyara | [#40](https://github.com/kot5432/vacant-house/issues/40) | `feature/40-domain-types` |

**注意：** `npm install`は依存関係を新規に解決しlockfileを変更する可能性があります。**A〜Dが最初に行うのは共有lockfileに従う`npm ci`**です。Dも環境構築#51ではなく、型定義#40が開発担当です。

## 4. Issue #55にコピーする報告文

```text
【A〜D PC準備の確認】
担当：A / B / C / D
OS：Windows / macOS / その他
GitHub DesktopでClone：OK / まだ
自分のブランチに切替：OK / まだ
git --version：
node --version：
npm --version：
npm ci：成功 / 未実施 / 失敗
npm run doctor：成功 / 未実施 / 失敗
npm run typecheck：成功 / 未実施 / 失敗
npm run build：成功 / 未実施 / 失敗
npm run dev：成功 / 未実施 / 失敗
ブラウザーで仮画面：見えた / 見えない / 未実施
困っていること：
```

## 5. エラーが出たら

| 表示・状況 | まずすること |
|---|---|
| `node` が見つからない | Node v26.13.1の導入が完了しているか確認。PowerShellを開き直す |
| `EBADENGINE` / `doctor`でNode NG | `node --version`を見てv26.13.1に合わせる。package.jsonの指定版を勝手に変えない |
| `npm ci`でlockfileがない | **EのIssue #51が完了し、mainにlockfileが反映されたか確認**。自分でnpm installを実行せず、Eに相談 |
| `git pull`で競合・停止 | ローカルの編集を削除せず、出力をEに送る |
| `npm run dev`でLocal URLが出ない | エラーをそのままIssueに記録。ポートが違えば実際に表示されたURLを使用 |
| TypeScriptやビルドのエラー | エラーメッセージとコマンドをIssue #55または担当Issueへ投稿（秘密・個人情報は載せない） |

**やらないこと**：`git add .`で何でもコミットする／`node_modules`・`dist`や秘密情報をPushする／mainに直接Pushする／勝手にCI・デプロイ・外部公開する。

詳細なGitHub Desktop操作は[基本操作ガイド](BEGINNER_START_HERE.md)、担当の実装とAIへの指示は[担当別ガイド](BEGINNER_OWNER_WORKFLOWS.md)を見てください。
