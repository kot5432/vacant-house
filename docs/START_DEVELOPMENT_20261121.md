# 開発開始ガイド（2026-11-21 更新）

**これを最初に読んでください。** このリポジトリは富山県の地域活動に「参加する／企画する」Webアプリです。**旧空き家案を開発しません。**

## いまの状態
- **2026-11-21にE @kot5432が共通React+TypeScript+Viteの最小ファイルをmainへ先行追加**。11/23開始規則の例外として、この**共通土台の作成だけ前倒し**がユーザーから明示許可されました。
- `src/App.tsx`は起動確認用の**仮画面**です。D00〜D02、U01〜U04やIndexedDBの機能実装は**まだありません**。
- **要対応：package-lock.jsonがまだありません。** この実行環境からnpmレジストリへの接続がタイムアウトしたため、依存を取得して検証できず、推測のロックファイルを作ることはしませんでした。よって**現状`npm ci`は実行できません**。Node v26.13.1が使える人が下記の初回作業を行う必要があります。
- `npm run dev`と`npm run build`の動作も**未実行（not_run）**です。動いたと断定しないでください。
- CI・Vercel等デプロイ・プレビュー公開・外部募集/アンケート送付は未許可。各人の機能実装とローカル実行は11/23から。

## 共通土台の初回確認（Eまたは協力者が行う・優先）
1. GitHub Desktopで[リポジトリ](https://github.com/kot5432/vacant-house)をclone、`main`を最新版にする。
2. **Node.js v26.13.1**を使用。ターミナルで`node --version`と`npm --version`を記録。`npm run doctor`で不足条件が一覧表示されます（不足がある場合は終了コード1になります）。
3. `package.json`のあるリポジトリ直下で`npm install`を実行。これは**初回の依存解決とpackage-lock.jsonの生成**です。失敗したら実際のエラーを#51へ報告し、lockfileを手作業で創作しない。
4. 成功したら`npm ci` → `npm run doctor` → `npm run typecheck` → `npm run build` → `npm run dev`を順番に実行。起動URLが表示されたら自分のブラウザーで開き、仮画面が表示されるか確認する。`npm run dev`は**Ctrl+Cで停止**。
5. `package-lock.json`だけを含め、必要な修正があれば小PRで提出。**node_modules/、dist/、個人情報は絶対にコミットしない**。レビューを経てmainに反映し、その後全員に`npm ci`を案内する。
6. **現時点は未検証**。テストが成功した場合のみ#51にコマンドと実際の結果を書く。

### いま分かっている実行結果（2026-11-21）
- この作業環境の`node --version` → **v22.16.0**（指定v26.13.1とは不一致）
- `npm --version` → **10.9.2**
- npmへのアクセス → `EAI_AGAIN registry.npmjs.org`（DNS名前解決失敗）
- `npm run doctor`の内部スクリプトをNode v22で実行し、Node版・lockfile・node_modulesの**不足を正しく検出**することを確認（想定した失敗）。
- **npm install・npm ci・typecheck・build・devは未実施（not_run）**。成功したとは扱わない。
- 追加した検査スクリプト：[`scripts/check-environment.mjs`](../scripts/check-environment.mjs)。このスクリプトは依存をインストールせず、実際のアプリ起動も保証しない。

### エラー別の確認
- **`EAI_AGAIN` / `ENOTFOUND`**：npmの公開パッケージレジストリに接続できていません。ネットワークやDNS/プロキシ環境を確認し、ネットワークが利用できる場所で再試行。公開のパスワードやトークンを貼らない。
- **`npm ci`でlockfile不在**：#51で初回`npm install`を完了し、`package-lock.json`がmainに反映されるまで待つ。各人が独自のlockfileを作らない。
- **`EBADENGINE`**：`node --version`が**v26.13.1**かを確認。別バージョンを無断で採用しない。
- **`npm run doctor`でNG**：不足項目をIssue #51に報告する。`doctor`だけがOKでも起動テスト合格ではない。


## 担当A〜Dの開発の入口
| 担当 | GitHub | 最初のIssue | 作るもの |
|---|---|---|---|
| A | @Gr3311Moonn | [#34](https://github.com/kot5432/vacant-house/issues/34) | 参加する入口／活動0件一覧 |
| B | @unoyuyu0913-design | [#36](https://github.com/kot5432/vacant-house/issues/36) | 6問入力フォーム |
| C | @ynykrrc1219-stack | [#38](https://github.com/kot5432/vacant-house/issues/38) | 親12タスクの進捗操作 |
| D | @milkyara | [#40](https://github.com/kot5432/vacant-house/issues/40) | EventInput/EventRecord等の共通型 → #41保存/一覧 → #42バックアップ |

**A〜D全員がコード開発担当です**。Dは**#51の初期土台作成を担当しなくなりました**。初回依存確認（lockfile）の手伝いはEが依頼する場合のみ。Dの実装初手は#40です。

### Eが配布した担当ブランチを使う
A: `feature/34-participation-entry`、B: `feature/36-organizer-input`、C: `feature/38-parent-progress`、D: `feature/40-domain-types`。**GitHub DesktopでFetch origin → Current branch → 自分のブランチを選択**し、`main`に直接変更を加えません。

ブランチは最初のIssue専用。次のIssueは新しいブランチで作業します。**A〜Dの4ブランチは2026-11-21にEがmainから作成済みです。** 初回lockfile PRが後でmainへ統合されたら、その最新版を担当ブランチに取り込んでから依存インストールを実行してください。各ブランチはEが配布したものを使い、新規作成しないでください。

### AIコーディングの安全な使い方
1. 自分のIssueを開き、仕様と今週やらないことを確認。
2. 使用するAIコーディングツールへ「#34/#36/#38/#40の範囲だけを編集、ADR-029〜032を守る。まず変更予定ファイルを列挙し、他担当ファイルを壊さない」と指示。
3. AIが提案した変更は**自分で差分・意味を理解**してからCommit。分からないときはIssueで質問。
4. 実際に動かして確認できるまでは「動作済み」と書かない。PRに`not_run`と理由を書く。
5. Pull Requestを作り、E @kot5432にレビュー依頼。**レビュー前にmainへマージしない**。

## 初週のゴール
A〜D各自が**2026-11-29までに担当Issueについて小さなPRを1本提出する**こと。これは**目標**であって、実装完了やレビュー合格と同義ではありません。

## 参考
- [完全初心者向けGitHub操作ガイド](BEGINNER_START_HERE.md)
- [A〜Dの担当別操作・AI指示文ガイド](BEGINNER_OWNER_WORKFLOWS.md)
- [環境確認報告 #55](https://github.com/kot5432/vacant-house/issues/55)
- [共通土台の残作業 #51](https://github.com/kot5432/vacant-house/issues/51)
