# 11月23日の開発開始までのチェック（2026-11-21）

> 状態を推測で「完了」にしない。ソースは各Issue/PRと本人の確認結果。**必要な環境が揃った担当から独立した開発を開始**し、全員一斉の足止めはしない。

| 優先 | 項目 | 現在わかること | 残る対応と追跡先 |
|---|---|---|---|
| **最優先** | A〜DそれぞれのPC・GitHub権限 | EのPCではNode v26.13.1 / npm ci / doctor / typecheck / build / dev・仮画面を確認。A〜D本人の確認結果は未回収として扱う | [#55](https://github.com/kot5432/vacant-house/issues/55)へ各自コメント。困った人のセットアップ支援 |
| **最優先** | Codexへの正本参照 | [AGENTS.md](../AGENTS.md)・[単一ガイド](CODEX_START_HERE.md)はPR #67でmainに統合済み | A〜Dが担当Issueと現在のブランチをCodexに読ませる。Issueの取得ができない環境なら本文を貼る |
| **最優先** | 最新mainを各ブランチへ取り込む | #63 の共通雛形・#66 の共通UI・#67 のCodexガイドがmainに入っている | A〜DはGitHub Desktopで main Pull → 自分のブランチに Update from main。未コミット変更を先に保護する |
| **最優先** | B/C/Dの型と画面境界 | 仕様と契約あり、実装された共有型・保存APIは未確認 | D #40 が型と呼出し境界をB #36、C #38へ先に共有。U03カード表示B／操作C／保存Dを守る |
| **高** | main保護の実効性 | 過去のAPIではRuleset `active` と報告。しかし #66/#67 は承認0件でmergeが成立した | [#53](https://github.com/kot5432/vacant-house/issues/53)で管理者がルール適用・権限・bypass・required approvalsを再確認。**人によるレビュー規約は別途遵守** |
| **高** | 共通UIの本番画面組込み・検証 | #66 統合済み。専用の操作/320px/200%/キーボード確認は未実施 | [#65](https://github.com/kot5432/vacant-house/issues/65)に残件を追跡。担当画面に使う際にローカル確認を実施 |
| **高** | 初週のタスク | A #34、B #36、C #38、D #40。11/29は小PR各1件の**目標** | 初週は各1小PR、動作・未実行を明記。レビューはE、E自身のPRは他の担当 |
| **後続** | 地域データと利用者検証 | 公開可能な候補は別人の承認待ち。需要や改善効果は未検証 | E [#43](https://github.com/kot5432/vacant-house/issues/43)・[#44](https://github.com/kot5432/vacant-house/issues/44)。未承認活動は表示しない |
| **後続** | 横断結合と応募資料 | 基本仕様・応募要件の調査資料はある。主催→保存→判定→進捗の実動作は未確認 | [#45](https://github.com/kot5432/vacant-house/issues/45)で統合試験・動画構成・AI活用記録。実装済みの範囲だけをデモする |

## A〜Dが実際にする順番
1. [PCセットアップ](ALL_MEMBERS_PC_SETUP.md)と [Issue #55](https://github.com/kot5432/vacant-house/issues/55)。
2. [Codexの共通入口](CODEX_START_HERE.md)と[AGENTS.md](../AGENTS.md)を読む。
3. [自分のIssueと最初のブランチ](CODEX_START_HERE.md#1-誰が何を見る)を使い、小さく実装。
4. ローカル確認の実績をPRに記録、Eにレビュー依頼。
5. PRをmainへ統合したら、各自がmainを取り込み、次のIssueへ。

**開発開始に全件の解消は不要**：#53 の設定確認や#65 UI品質の追跡は並行してよい。ただし、レビューや安全性を必要とする変更のmain統合には所定の確認が必要。CI・デプロイ・外部公開・アンケートの配布・応募は、別の許可や具体的な条件確認まで行わない。
