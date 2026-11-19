# STEP7｜実リポジトリ監査に基づく開発環境の担当・手順（C案正式採用）

- 調査日：2026-11-19
- ユーザー決定：「STEP 7はC案。既存リポジトリを確認したうえで環境構築の担当と手順を具体化」
- **調査対象**：GitHub `kot5432/vacant-house` の `main` ブランチ、GitHub REST tree `/repos/kot5432/vacant-house/git/trees/main?recursive=1`。ツリーは `truncated:false`、対象SHA `d889c381247ad1f03e404c79ce55145e27c82ca5`。
- **作業状態**：リポジトリ構造の確認と開発環境の手順設計のみ。アプリのファイル追加・インストール・ビルド/テスト・CI・デプロイは**未実行**。STEP6によりA〜Dのローカル実装/テストは11/23から許可済みで、着手実績とは別。

## 1. 現状確認結果（mainのGitHubファイルツリー）

| 項目 | 確認結果 |
|---|---|
| `README.md`、`CONTRIBUTING.md`、`PROJECT_CONCEPT.md` | 存在 |
| `docs/`、`docs/v3/`とADR・契約・JSON Schema/fixture | 存在（設計資料） |
| `.github/ISSUE_TEMPLATE/feature.md`、`.github/PULL_REQUEST_TEMPLATE.md` | 存在 |
| `package.json`、npm/pnpm/yarnロックファイル | **存在しない** |
| `src/`、`app/`、`index.html`、`vite.config.*`、`tsconfig*.json` | **存在しない** |
| `.gitignore`、Nodeの版指定 `.nvmrc` 等 | **存在しない** |
| `.github/workflows/`、`wrangler.*` | **存在しない** |
| デフォルトブランチ | `main` |
| 公開範囲 | **public**。秘密情報や個人情報を投入しない |

**結論：リポジトリは設計資料中心で、アプリの実装雛形は未作成。既存ドキュメントを削除・移動せず、ルート直下にReact/Vite/TypeScriptの最小雛形を作る。** 現行の設計対象は地域活動の「参加D00〜02＋企画U01〜04」であり、名前にある旧空き家案ではない。

## 2. 技術の採用済み・未確定を区別

- 採用：**React + TypeScript + Vite、IndexedDB + Dexie、サーバーDB/Authなし**（[ADR-001](ADR_001_TECH_STACK_ADOPTED.md)と[ADR-032](ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md)）。
- **未確定：** 使用Node.jsの具体バージョン、Vitest/Playwright、CSS方式、ルーティング、Zod等の追加依存。**パッケージマネージャはSTEP8 A案によりnpmを正式採用**。Node.jsとnpmの実際の対応版はDが確認して提案し、Eと関連担当のレビュー後に固定する。存在しないバージョン番号を決め打ちしない。
- **デプロイ先に不整合：** ADR-001にはVercel採用と記載がある一方、最近の計画ではCloudflare想定という履歴あり。**STEP7ではどちらにもデプロイせず、環境構築にホスティング固有設定は入れない**。公開前に本人の最終判断を別途ADRへ記録。
- STEP6 A案：**11/23からローカル実装・実行/テストを許可**、CI・公開・デプロイ・外部送信・応募は未許可。

## 3. 環境構築の担当と最初のPR

| 役割 | 担当者 | 具体的な役割 |
|---|---|---|
| **初期環境の責任者** | **D @milkyara** | #40と接続する専用の小さな環境PRを作成。既存ファイルを上書きせずVite/React/TS最小雛形・起動手順・lockfileを整備 |
| レビュー責任者 | **E @kot5432** | PR差分・追加依存・秘密情報・既存docs維持を確認、main統合を承認 |
| 画面の接続確認 | A @Gr3311Moonn / B @unoyuyu0913-design / C @ynykrrc1219-stack | 共有初期環境の入口とファイル配置を確認し、それぞれ#34/#36/#38を**別ブランチで並行準備** |
| 型/API確認 | D＋B/C | ADR-029〜032に合わせてTypeScript型のファイル配置と所有範囲を決める |

**新規雛形PRのIssueは既存#40へ紐づく前提**。ただし`#40`の本来の型/検証作業と混ぜて巨大PRにしない。初期環境だけの**独立Issueを起票して追跡する**ことを推奨する。初期環境PRが通るまでA〜Cは契約設計や独立画面を準備できるが、同じリポジトリのルートに各自で異なるVite環境を生成しない。

## 4. 開発担当に渡す手順（11/23以降・Dが実施する想定）

1. GitHub `main`から作業ブランチを作成（`main`を直接編集しない）。現行文書や`.github`は削除しない。
2. ルート直下に**React + TypeScriptのVite最小構成**を配置。アプリ初期表示は「参加」「企画」の2入口の**枠だけ**でよく、ドメイン機能・旧空き家の画面は実装しない。画面担当と重複しないようDは見た目を作り込まない。
3. ローカルで使う**Nodeのサポート対象版と**npm**を**選び、版条件と**package-lock.json**をコミット。`node_modules`、`dist`、`.env`等を`.gitignore`に設定。既存docsを残す。
4. `package.json`に最低限のscripts（例：`dev`、`build`、必要なら`typecheck`）を用意。テストランナー導入/CIは**別検討**（CI設定は未許可）。
5. `README.md`に、クローン・依存導入・ローカル起動・終了・担当画面へのリンク・プライバシー注意・Node版を追記。旧文書の「実装前」記述は履歴と実際の状態を区別して更新する。
6. **11/23以降の許可範囲内で**Dが自身のPCにてローカル起動とビルドを確認し、コマンド・結果・環境をPRに記録。今ここで起動やテストを実行したとは書かない。
7. E @kot5432がPRをレビューし、既存ファイル削除・無断の仕様変更・デプロイ設定や秘密情報の混入がないことを確認。必要ならA〜Cが接続の観点でレビュー。承認後にmainへ統合。
8. A〜Cは統合済みの同一雛形から**最新main基準の短命ブランチ**を切って画面を追加。雛形統合前に各自の独立ブランチで準備した差分は、mainとの整合を確認して取り込む。

### 予定するファイル配置（提案・実ファイル存在の主張ではない）

```text
/.github/                     （保持）
/docs/                        （保持）
/README.md                    （追記）
/CONTRIBUTING.md              （保持・必要時更新）
/package.json                 （新規）
/package-lock.json            （新規：STEP8でnpm採用確定）
/index.html                   （新規）
/tsconfig*.json               （新規）
/vite.config.ts               （必要なら新規）
/src/main.tsx                 （新規）
/src/App.tsx                  （新規：2入口の最小枠）
/src/features/participation/  （A所有）
/src/features/organizer/      （B所有）
/src/features/progress/       （C所有）
/src/data/                    （D所有）
/src/shared/                  （D主導・B/C協議）
/.gitignore                   （新規）
```

共有`App.tsx`の大きな変更を複数人が同時に行わず、各担当は独立画面とルートの接続だけを小PRで提出する。所有するパスは実装後に再確認する。

## 5. 初期環境PRの受入条件
- [ ] docs/v3の正本、.github、既存ファイルが無断削除されていない
- [ ] React+TS+Viteの最小構成、固定可能な依存とlockfileがある
- [ ] `.gitignore`が秘密情報・生成物・依存フォルダを除外
- [ ] READMEに環境・起動手順とNode条件を記載
- [ ] **11/23以降にローカルで実際に確認したコマンド/結果を記録**（未実施なら`not_run`）
- [ ] CI/Cloudflare/Vercelデプロイ設定、認証やサーバーDB、旧空き家コードの追加がない
- [ ] Eがレビュー、追加でA〜Cの接続合意、必要な確認後にmainへマージ

## 6. 未確認
- メンバー各自のNode/npm/Git環境や使用OS、11/23開始に参加できるか、週5〜8時間の実際の確保
- Node/npmの具体的な対応版と追加テストライブラリ
- GitHub mainのbranch protection（この接続では確認権限なし）
- PR #47〜#50の別人承認とmain統合
- デプロイ先はホスティング議論時に正式照合。**このSTEPで公開・デプロイはしない**。

## 7. 次の質問（STEP8）
**初期雛形をDが担当することを実作業の正式方針として確認し、担当IssueとEレビューを確定する。** STEP7 C案によって「既存物の確認後に提案」まで実施した。D以外へ責任を移すならIssueの担当と依存順を変更する。


## STEP8正式決定（2026-11-19）：パッケージ管理はnpm

利用者が**A案＝npm**を採用。D @milkyaraの初期環境Issue #51と、以後の全員のローカル作業に適用する。

- **唯一のパッケージマネージャ：npm**。依存関係の正本はルート`package.json`と`package-lock.json`。pnpm/yarn/bunのロックファイルを追加しない。
- **初期環境の担当：D**。11/23以降に雛形PRで`npm install`により依存を確定、`package-lock.json`を含めてコミットする。Node.jsの具体版・npmの対応版は正式に調べてからREADMEに記録し、未確認の版を決め打ちしない。
- **他の4人：共通環境のPRがmainへ統合された後、最新mainを取得して原則`npm ci`で依存を復元**。`npm install`は依存追加・更新でlockfile変更が必要なときのみ使用し、変更理由をPRに記載する。
- ローカル手順案：`git clone` → `npm ci` → `npm run dev`。ビルド確認は`npm run build`。**これは将来の手順であり、実行済みの記録ではない**。
- バージョン不一致・起動失敗があれば、エラーを保持しDに共有。lockfileを各自が勝手に削除・再生成しない。
- CI環境の構築や自動公開はSTEP6で未許可、npm採用によって許可されない。


## STEP9正式決定：Node.jsをLTSのv26.13.1に固定（2026-11-19）

- ユーザーは**A案：対応するLTS版を1つ選んで全員固定する**を採用した。
- **選定：Node.js `v26.13.1`（Lithium、Active LTSの26.x系列）**。Node.jsの公式LTS日程では26.xが2026-10-28にLTSへ、v26.13.1は2026-11-11のセキュリティリリース。公式出典：
  - https://github.com/nodejs/Release/blob/main/README.md
  - https://nodejs.org/ja/blog/release/v26.13.1
  - https://nodejs.org/en/blog/vulnerability/november-2026-security-releases/
- Vite公式ガイドのNode.js最低要件は20.19+ / 22.12+であり、26.xはこれより新しいLTS系列。公式出典：https://vite.dev/guide/ および https://vite.dev/blog/announcing-vite8 。**個別依存のNode 26互換・実機の起動/ビルドは未検証**。環境PRで実際のVite/React/TS組合せを確認して証拠を残す。
- **Dの初期雛形PR（Issue #51）で作るファイル**：`.node-version`の内容は`26.13.1`の1行。READMEにもバージョンと確認方法`node --version`を記載する。必要なら`package.json`の`engines.node`にも整合する指定を加える（利用PCとnpmの実挙動を確認）。
- npmの具体バージョンはNode.js 26.13.1に同梱されるものをDが調べ、`npm --version`で実測し記録。npmの別バージョンを今ここで捏造しない。
- **全員が同じNode.js 26.13.1・npm・package-lock.jsonで作業**する。Node.js版管理ツール自体（fnm/nvm等）は各自のOSと環境に合わせてよいが、版指定は共通とする。
- **11月23日以降の作業**：Dが`node --version`、`npm --version`、`npm ci`、`npm run dev`、`npm run build`の実行結果をPRに記録。現在は未実行。問題があればEと確認して、版を無断変更せず正式な改訂とする。
- **デプロイ、CI、外部公開、Node.js実行環境のクラウド設定はSTEP6では未許可**。
