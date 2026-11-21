export default function App() {
  return (
    <main className="page">
      <p className="eyebrow">富山県プログラミングコンテスト / 共同開発</p>
      <h1>地域活動の参加と企画をサポート</h1>
      <p>これは開発環境を確認するための仮画面です。実際の画面・保存機能・イベント一覧はまだ実装されていません。</p>
      <section aria-label="開発予定の2つの入口" className="choices">
        <div className="choice"><h2>活動に参加する</h2><p>担当Aが開発予定です。</p></div>
        <div className="choice"><h2>活動を企画する</h2><p>担当B・C・Dが開発予定です。</p></div>
      </section>
      <p className="notice">表示は開発用のプレースホルダーです。ボタンや保存機能はまだありません。</p>
    </main>
  )
}
