> **【最新・2026-11-21】共通環境の準備完了：** [PR #63](https://github.com/kot5432/vacant-house/pull/63)で`package-lock.json`をmainにマージ済み。EのWindows/Node v26.13.1で`npm ci`・`doctor`・`typecheck`・`build`・`dev`起動とブラウザー仮画面表示を確認。**A〜Dは[セットアップガイド](ALL_MEMBERS_PC_SETUP.md)に沿って各自のPCで`npm ci`以降を実行可能**。別途`npm install`でlockfileを作り直す必要はありません。個人PCの成功は本人が確認してIssue #55に報告してください。旧い未検証・未反映の記述はこの案内を優先。

# Issue #51を終わらせるための最後の操作（Windows初心者向け）

**2026-11-21。共通Reactソースはmainに反映済みです。** ユーザーのPC（Node v24.20.0）では`npm ci`、`npm run typecheck`、`npm run build`（2回）、`npm run dev`（Vite起動）まで成功しています。**ブラウザー画面の表示確認・Node v26.13.1での再確認・lockfileのGitHub反映は未完**です。

## あなたがすること（上から順番に）

### ① 起動中なら画面を確認
ブラウザーで `http://localhost:5173/` を開き、「地域活動の参加と企画をサポート」という仮画面が見えるか確認。見えた場合は**仮画面が見えた**とIssue #51に報告。Viteを終了するときは起動したPowerShellで`Ctrl+C`。

### ② Node.js v26.13.1を使えるようにする
公式サイト https://nodejs.org/en/download から必要なWindows用の方法でNode.js v26.13.1を導入、あるいは使用中のNodeバージョン管理ツールで切替。**ほかの開発でNodeを使用している場合は既存の環境を確認してから**進める。PowerShellを新しく開き、以下を実行。

```powershell
# GitHubでクローンしたvacant-houseフォルダのPowerShellを開いて実行
node --version
npm --version
```

**`v26.13.1`が出た場合だけ次へ。** それ以外はバージョン表示をIssue #51に報告し、`package.json`の`engines`を勝手に変更しない。

### ③ 最新mainを取得・ローカルで検証
**Vite起動中なら先にCtrl+Cで停止**。PowerShellで次を上から実行する。

```powershell
git status
git pull --ff-only origin main
npm ci
npm run doctor
npm run typecheck
npm run build
npm run dev
```

`npm run dev`のURLをブラウザーで開き仮画面が見えるか確認し、終了はCtrl+C。

- `git pull`がエラーになったら、**変更を削除せず**表示を共有する。
- `npm ci`の実行にはPCにある`package-lock.json`を使う。**まだGitHub mainにはない**ため、このPC以外では最初に生成する必要がある。
- エラーが出たら、そこで止めて出力を確認する。
- `npm run doctor`がすべてOKでも、別途`typecheck`・`build`・ブラウザー確認を行う。

### ④ package-lock.jsonだけをブランチにコミットし、PRを作る
**依存・画面が確認できた場合に行う。** `main`へ直接コミットせず、Issue #51専用の短命ブランチを使用する。

```powershell
git switch -c chore/51-commit-lockfile
git add package-lock.json
git diff --cached --name-only
git diff --cached --stat
git commit -m "chore: add npm lockfile for shared development environment"
git push -u origin chore/51-commit-lockfile
```

**`git diff --cached --name-only`の結果が`package-lock.json`だけであることを必ず確認**。ほかのファイルが含まれたらコミットする前に止めてEへ相談。パスワードや秘密をコミットしない。

その後、GitHubのリポジトリに表示される **Compare & pull request** からPR作成。PR本文に`Closes #51`を入れるのは**最終確認前には避け**、`Related to #51`で関連付ける。差分を確認し、E本人作成なら**BまたはCによる別人レビュー**を依頼する。レビューと必要な確認後にmainへマージし、Issue #51をClose。

### ⑤ Issue #51に結果を報告

```text
【Issue #51 最終確認】
Node.js：
npm：
npm ci：成功 / 失敗
npm run doctor：成功 / 失敗
npm run typecheck：成功 / 失敗
npm run build：成功 / 失敗
npm run dev：起動成功 / 失敗
ブラウザーで仮画面：見えた / 見えない / 未確認
package-lock.jsonのPR：
困っていること：
```

### してはいけないこと
`git add .`で知らないファイルまでコミットしない／`node_modules`と`dist`、`*.tsbuildinfo`を追加しない／`package-lock.json`を推測で手書きしない／保護設定を変更しない／CI・デプロイ・外部公開をしない。

**このページは操作手順であり、Node v26での検証・PR提出・マージを実行済みと示すものではありません。**
