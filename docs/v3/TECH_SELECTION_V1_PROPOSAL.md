> **2026-11-15追記：この資料は正式採用前の比較履歴です。** [ADR-001](ADR_001_TECH_STACK_ADOPTED.md)でReact + TypeScript + Vite、IndexedDB + Dexie、**Vercel**を正式採用しました。このファイルのCloudflare Pages第一候補・正式採用前という記述を最新決定として扱わないでください。

# 技術選定書 v1｜候補比較と推奨構成（2026-11-15）

> **状態：正式採用前の技術提案。コード実装・ビルド・デプロイ・性能テストなし。**
> 対象：単発・小規模の非営利地域イベント主催者向け準備支援Webアプリ。旧空き家活用プロダクトの技術構成を引き継がない。
> 要件：[要件定義v1草案](REQUIREMENTS_V1_DRAFT.md)／[STEP4-⑫採用範囲](STEP4_12_MVP_REQUIREMENTS_V01.md)。

## 1. 前提

- 4画面、基本6問→暫定プラン→任意詳細化、ルールベースの4領域P01-P12。
- U03進捗更新は自動保存、U04イベント条件編集は「変更を反映」で確定。
- 同一ブラウザに複数イベントを保存し、後日再開。ログイン、サーバーDB、共同編集、ファイル出力／読み込みはMVP外。
- 独立した純粋なルールエンジンが重要。オンライン上の外部AI推論は不要。
- 画面試作・利用者テスト・チームの開発環境を検証した上で最終採用。Node.jsやnpm依存パッケージの実際の版はその時点で固定する。

## 2. 技術の候補比較

| 領域 | 候補A（推奨） | 候補B | 判断理由 |
|---|---|---|---|
| 言語 | **TypeScript** | JavaScript | 入力の判別可能Union、タスク状態・バージョンの誤混同を型で防ぐ |
| UI | **React** | Vue | 条件分岐入力と4画面の部品化。既存経験・将来の保守を考慮。Vueでも実現可 |
| ビルド | **Vite** | Next.js | サーバー描画不要の静的SPAには軽量なViteが十分。Next.jsの付加機能は現MVPでは優先度が低い |
| 保存API | **IndexedDB** | localStorage | 複数レコード、トランザクション、移行・競合チェックに対応。localStorageで大きなJSONを丸ごと上書きしない |
| DB操作 | **Dexie** | 生のIndexedDB | スキーマ版と操作を統一しやすい。依存を減らしたければ生APIも可能 |
| 状態管理 | **React標準状態＋小さなStore/Context（必要時）** | 専用状態管理ライブラリ | 初期から複雑化しない。大規模化時に追加検討 |
| フォーム検証 | **明示した型／検証関数（必要ならZod）** | ad hoc検証 | 未回答・未定・値ありを区別し、U02/U04のルールを共有 |
| UIスタイル | **CSS変数＋CSS Modules等** | Tailwind CSS | 少人数開発で意味のあるトークンを揃えやすい。Tailwindはチーム実績次第で検討 |
| 単体テスト | **Vitest** | Jest | Viteとの親和性と純関数のロジックテスト |
| E2E | **Playwright** | Cypress | ブラウザ保存・複数タブ・画面遷移・キーボード操作を検証 |
| 公開 | **Cloudflare Pages（静的サイト）** | Vercel静的配信 | サーバー処理の不要なSPAに適合。ルートfallbackとデプロイ設定を検証 |
| サーバーDB／Auth | **なし** | Supabase等 | MVPで不要。サーバー経由の個人データ収集を増やさない |

**提案スタック**：TypeScript + React + Vite + IndexedDB/Dexie + Vitest + Playwright + Cloudflare Pages。**これはユーザー最終承認前であり正式採用ではない。**

## 3. 重要なリスクと対策

1. IndexedDBの保存は通常best-effort。利用者がサイトデータを削除すれば失われ得る。保存成功は「このブラウザに保存」と表現し、バックアップ済みと誤称しない。
2. 旧schemaを開く際の移行が失敗したら、無言でDB削除・初期化しない。移行トランザクションの失敗・ロールバックを検証。
3. 別タブの古いrevisionからの上書きと、削除済みIDの復活を防ぐ。読み取り比較と書き込みは一つのreadwriteトランザクションで管理する。
4. タスク定義のルール版変更はDB構造の移行と区別する。施設公式情報の版も別台帳で追跡する。
5. CDNキャッシュや旧タブからのschema不一致を扱う。変更後は既存タブへ更新案内を出し、保存中の変更がないことを確認してから再読込する。
6. Cloudflare PagesのSPAディープリンクのフォールバックは公開設定を確認する。固定404ページを追加する場合、未マッチのURLの扱いも検証する。
7. PWAによるオフライン動作は**MVP必須としない**。IndexedDBがあることと全画面がオフラインで利用可能であることは別。
8. 利用者の個人情報を明示的に要求しなくても、自由記述には書かれる可能性がある。画面注意と第三者送信監査が必要。

## 4. 技術選定の採用ゲート

次をすべて確認してから採用記録を確定する。
- GitHub上の既存コード構成と採用予定の依存を照合し、旧プロダクトのソースを混入させない。
- チームの開発環境で依存の版とローカル実行の可否を検証。
- ブラウザ保存、削除、revision競合、スキーマ更新、破損復元の小さな技術試験の設計を作る。
- 公開先への権限・費用・プレビュー・静的SPA配信を確認。
- 対応するPC／モバイルブラウザをテスト対象として合意。

## 5. 公式参考資料（調査時点・版は再確認）

- React TypeScript: https://react.dev/learn/typescript
- Vite static deploy: https://vite.dev/guide/static-deploy
- Dexie upgrades: https://dexie.org/docs/Tutorial/Design
- Dexie multi-tab version change: https://dexie.org/docs/Dexie/Dexie.on.versionchange
- MDN storage quota and eviction: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- MDN IndexedDB transaction: https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction
- Playwright browsers: https://playwright.dev/docs/browsers
- Cloudflare Pages serving SPA: https://developers.cloudflare.com/pages/configuration/serving-pages/

すべてユーザーの製品で動作確認済みという意味ではない。
