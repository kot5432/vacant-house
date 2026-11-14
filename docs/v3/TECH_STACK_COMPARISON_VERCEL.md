# 技術スタック比較 B案｜Vercelを含む選定レビュー（2026-11-15）

> **状態：比較調査・推奨案。正式採用前。** 利用者が「B案：ほかの構成を比較してから決める」を選択し、Vercelの利用希望を表明した。ユーザーの**Vercel利用希望を正式採用と混同しない**。
> 対象製品：初めての単発・小規模な非営利地域イベント主催者向けの準備支援Webアプリ。旧空き家所有者診断・物件登録・マッチング、旧「今の困りごと→相談文コピー」方式は含めない。
> 基礎要件：[要件定義v1草案](REQUIREMENTS_V1_DRAFT.md)、[STEP4-⑫採用範囲](STEP4_12_MVP_REQUIREMENTS_V01.md)。以前の [技術選定v1提案](TECH_SELECTION_V1_PROPOSAL.md) のCloudflare Pagesを既定の決定と見なさない。

## 1. MVPの技術要件

- 基本6問→暫定プラン、任意詳細化、4領域P01-P12ルールによる優先順位・理由。
- U03進捗は自動保存、U04条件編集は「変更を反映」で確定。ログイン不要で同一ブラウザに複数イベントを保存・再開。
- 保存競合・削除・schema移行・公式情報の対象範囲を間違えないことが重要。
- サーバー認証、サーバーDB、SSR、SEO特化記事、リアルタイム共同編集、外部AI推論はMVPの必須機能ではない。
- 3人以上のチームでAIコーディングを利用予定。人によるコードレビュー・責務境界とテストを重視。

## 2. フロントエンド4候補

| 案 | 構成 | 適合・長所 | 欠点・注意 | 判定 |
| --- | --- | --- | --- | --- |
| A | React + TypeScript + Vite | クライアントSPAに最小限。ルールエンジン/DB/UIを分離しやすく、React経験を活かせる | ルーティングや状態整理の規約をチームで決める必要 | **第一候補** |
| B | Next.js + React + TypeScript | ファイルベースルーティング、将来のサーバー/API機能を用意しやすい。Vercelと親和 | IndexedDB等はクライアント側で実行、SSRとの境界管理が必要。今回不要な概念が増える | 第二候補 |
| C | Vue + TypeScript + Vite | 同様にSPAとブラウザDBが実現可能。部品とロジックを整理できる | React経験を使いにくい場合がある。チームの習熟状況次第 | 有効な代替 |
| D | Svelte + TypeScript + Vite | シンプルなUI記述が可能、SPAに適合 | チームのレビュー経験と採用ライブラリの確認が必要 | 有効な代替 |

**AIコーディングへの適合性**はフレームワーク名で保証されない。生成コードのレビュー可能性は、型、ファイル責務、契約、テスト、PR運用の影響が大きい。比較は今回のチーム・要件向けの定性的評価で実測ではない。

## 3. 保存技術

| 候補 | 長所 | 弱点 | 判断 |
| --- | --- | --- | --- |
| IndexedDB + Dexie | 複数イベント、更新revision、トランザクション、schema版移行の管理 | browser APIとDexie自体の学習・テストが必要 | **第一候補** |
| 生のIndexedDB | 依存が少ない | イベント更新・DB移行・エラーのボイラープレートが増える | 代替 |
| localStorage | 少数データで簡単 | 同期API、複数イベント・競合・移行で大きなJSONを扱いやすくない | 保存本体には推奨しない |
| サーバーDB | 端末間同期・ユーザー認証への道 | 現MVPでは運用・プライバシーとコストが増える | MVP対象外 |

重要：Vercelは配信側であり、**IndexedDBは利用者のブラウザ側**。Vercelデプロイにイベント進捗が送信されるわけではない。サイトのオリジンが変わると異なる保存領域になるため、プレビューURLと本番URLのデータは自動共有されない。

## 4. ホスティング：Vercel vs Cloudflare Pages

| 比較 | Vercel | Cloudflare Pages |
| --- | --- | --- |
| Viteで構築した静的SPA | 対応 | 対応 |
| GitHub連携 | 対応 | 対応 |
| ブランチ/PRプレビュー | 対応 | 対応 |
| サーバーDBなしのMVP | 適合 | 適合 |
| チームの希望 | **利用したい意向がある** | 以前の候補 |
| 推奨 | **Vercel第一候補** | バックアップ候補 |

- Vite公式とVercel公式は、ViteのGit連携デプロイを説明している。
- Vercelに移しただけでNext.jsを要求されるわけではない。
- SPAでHistory APIを使った深いURL（例：`/events/abc`）を直接開くときは、静的配信のrewrite先を`index.html`にする必要がある場合がある。**存在しないassetsを巻き込まないルーティングと404動作**を設定・試験する。別案としてhash routingも比較できる。
- Vercel Hobbyは**個人かつ非商用向け**。現在のコンテスト作品の公開方法がその範囲か、第三者チームの管理権限をどうするかを公開前に確認する。
- 2026-11-15時点の価格参照ではHobby $0/月、Pro $20/月から。プラン料金と利用量・制限は公開直前に再確認する。
- GitHub連携でコミットのプレビューと本番デプロイを分ける。**現在の設計文書コミットを本番に勝手に配信しない**。実装と接続は後日別途指示の際に実施。

## 5. 追加比較：Next.jsを採る場合

Next.jsは静的出力（`output: 'export'`）も可能であり、VercelでSSRが必須ではない。ただし、静的出力で一部のサーバー系機能は利用不可。現在はサーバー/APIが不要で、画面中心の小規模SPAと、IndexedDBのクライアント環境での操作が重要。Next.jsを選ぶ理由は、将来サーバー機能を近い時期に追加する計画が具体化した場合や、チームがNext.jsを既に得意とする場合。

**推奨は React + TypeScript + Vite + IndexedDB/Dexie + Vitest + Playwright + Vercel。** 技術選定の正式承認が出るまで提案扱いとする。

## 6. 採用前に必要な確認・判定ゲート

1. **利用者の明示選択**：Vite + Reactか、Next.jsか。Vercelを第一候補としてよいか。
2. Vercel Hobbyの非商用条件と公開時の利用形態。チームのVercelアカウント／GitHub作業権限の分担。
3. 初回入力途中の下書き永続保存を含めるか。MVPの詳細な保存スキーマに影響。
4. 公開ルート・プレビューURL・IndexedDBのオリジン区別を考慮したテスト。
5. 対応ブラウザ、公式情報の更新責任、必要に応じた更新の手順。
6. P01-P12の優先順位・依存関係・再確認の単一判定表を最終レビュー。

**不要な推定は禁止**：旧空き家案のルーティング／物件DB、許可申請・会場空き判定を現行に混ぜない。利用者入力や自由記述をAI解析で自動法令判断しない。

## 7. 公式資料

- Vercel Vite: https://vercel.com/docs/frameworks/frontend/vite
- Vite static deploy: https://vite.dev/guide/static-deploy
- Vercel rewrites: https://vercel.com/docs/routing/rewrites
- Vercel plans: https://vercel.com/docs/plans/hobby
- Vercel pricing: https://vercel.com/pricing
- Vercel Fair Use: https://vercel.com/docs/limits/fair-use-guidelines
- Next.js static export limitations: https://nextjs.org/docs/app/guides/static-exports
- Next.js deployment options: https://nextjs.org/docs/app/getting-started/deploying

*公式資料に基づく対応状況と、今回の要件に基づく評価を区別する。プロジェクトの実装・デプロイ・動作試験は実施していない。*
