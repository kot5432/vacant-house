# STEP14｜既存PRの優先レビュー順・README競合の統合手順（A案正式採用）

作成：2026-11-20。利用者決定：**A案「11月23日の開発開始に必要なPRから優先してレビューする」**。

## 1. GitHubで現物を確認した状態
2026-11-20時点で以下の**9件のPRはすべてopen・main未マージ・レビュー提出0件**。GitHub返却のmergeableは9件とも`true`だったが、**それぞれ現在のmainに対しての値**であり、いずれかをマージした後も問題なくマージできる保証ではない。全PRが主に同一mainから分岐していた。**初回監査時点はA @Gr3311Moonnだけにレビュー依頼が集中**していたが、STEP14作業で担当A〜Dに配分を変更済み（下記）。

| レビュー順位 | PR | 内容 | 競合しうる既存ファイル | 理由 |
|---|---|---|---|---|
| **1** | [#47](https://github.com/kot5432/vacant-house/pull/47) | STEP3 E主レビュー・本人作成PRの別人承認 | `CONTRIBUTING.md`, PR template, ACTION_CHECKLIST, `docs/v3/README.md` | 全員のPR審査ルール |
| **2** | [#50](https://github.com/kot5432/vacant-house/pull/50) | STEP6 11/23ローカル実装/テスト許可 | CONTRIBUTING, ACTION_CHECKLIST, README | 作業範囲の誤解防止 |
| **3** | [#48](https://github.com/kot5432/vacant-house/pull/48) | STEP4 A〜D並行作業・依存 | ACTION_CHECKLIST, README, WORK_PACKAGE | 同時編集衝突の防止 |
| **4** | [#52](https://github.com/kot5432/vacant-house/pull/52) | STEP7〜9 リポジトリ監査/npm/Node 26.13.1 | README, WORK_PACKAGE | Dの環境#51へ直結 |
| **5** | [#56](https://github.com/kot5432/vacant-house/pull/56) | STEP11 メンバーの環境確認 | README | #55の回答を促す |
| **6** | [#57](https://github.com/kot5432/vacant-house/pull/57) | STEP12 初週の担当別指示 | README | 11/23〜29の作業指示 |
| **7** | [#49](https://github.com/kot5432/vacant-house/pull/49) | STEP5 日程/初週PR/週5〜8h | ACTION_CHECKLIST, README | 開発期限とキャパシティ |
| **8** | [#58](https://github.com/kot5432/vacant-house/pull/58) | STEP13 非同期GitHub共有 | CONTRIBUTING, README | #49旧「週1回15分定例」案を正式に上書き |
| **9** | [#54](https://github.com/kot5432/vacant-house/pull/54) | STEP10 main Rulesetの監査/有効化 | CONTRIBUTING, README | すでに実APIで**active**確認済み。旧disabled記述の修正が必要 |

**順位はレビュー着手の順序**。承認できないPRは飛ばして後続の確認へ進んでよい。マージ順は競合状況や更新履歴に応じて調整し、厳密に順位どおりでなくてもよい。ただし技術契約に依存するPRは内容を照合する。

## 2. 同一ファイル変更の交差表（実際のGitHub changed filenamesから）
- `docs/v3/README.md`：#47, #48, #49, #50, #52, #54, #56, #57, #58 **全9PR**。
- `CONTRIBUTING.md`：#47, #50, #54, #58。
- `docs/v3/ACTION_CHECKLIST_OWNER_DELIVERABLES_20261119.md`：#47, #48, #49, #50。
- `docs/v3/WORK_PACKAGE_DEPENDENCIES_AND_START_GUIDES_20261119.md`：#48, #52。
- `.github/PULL_REQUEST_TEMPLATE.md`：#47のみ。
- 各STEPの新規文書9件は**互いに異なるファイル名**なので、これらを保持して共通indexの衝突を安全に解消する。

## 3. 競合を解消するときの統合規則
1. **承認前に勝手にマージしない**。すべてEが作者のPRなので、A〜Dの別人から1件以上の承認を得る。A〜Dの開発者PRならEが主レビュー。Ruleset `protect-main`は`active`で承認1件とレビューコメント解決が必須。CIは未許可なので必須CIチェックを新規追加しない。
2. READMEは**既存行をどちらか選ぶのではなく、各STEPの文書リンクと最終決定をすべて保持**。見出し「現行決定 2026-11-20」を先頭に置き、STEP3〜13への短い一覧（今後各PRがmainへ統合されてから有効URLになる）を一度だけ作る。個々のSTEP文書の内容をREADMEに全文複製しない。重複した過去時点の「未許可」「未割当」は現在の明示決定で読み替え、削除時は決定履歴が元文書に残ることを確認。
3. CONTRIBUTINGは**STEP3（レビュー）＋STEP6（実装許可）＋STEP10（main保護active）＋STEP13（非同期共有）**の4項を**併存**させる。旧「ruleset disabled」「実装開始未許可」「週次定例必須」は現在の方針として残さない。
4. ACTION_CHECKLISTは**STEP3レビュー、STEP4並行、STEP5日程、STEP6許可**の更新を併存させる。未承認コード・未実行テストを完了にしない。
5. WORK_PACKAGEは**STEP4並行開発優先**かつ**STEP7〜9 Dの#51環境PR先行**を同時に維持。Dの環境準備中もA〜Cは独立画面や契約確認を並行する。
6. STEP5文書内の「毎週15分定例会議」は**STEP13 B案で不採用**。週1回の**非同期Issueコメント**が現行ルール。必要なときだけ関係者で短い会議。
7. STEP10文書の「enforcement=disabled」は**監査当時の履歴**。2026-11-20の再確認では`enforcement=active`。現行ステータスはactiveと明記し、過去の無効時点の記録を時系列として保全する。
8. NodeはSTEP9採用`26.13.1`、npm採用。#52の追加文書にあるSTEP7初期の「バージョン未確定」表記はSTEP9の正式決定で上書き。
9. Repositoryメソッド名称列挙は**10操作**。STEP12の指摘を踏まえ、過去の「9 API」という件数誤記で実APIを欠落させない。
10. **マージ直後に必ず**次のPRのFiles changed・mergeable・README差分を再取得。競合があれば後続PRブランチへ**mainの最新変更を取り込み**、上の両立表をもとに手動で解決する。プッシュ後は別人が最新差分を再確認（GitHub側のstale approvals自動失効は現状OFF）。`git push --force`で共有ブランチを書き換えない。
11. Eのレビュー負担とAへの審査集中を軽減するため、**各PRの別人レビュー担当をA〜Dに再配分済み**（以下）。すべてAが即日対応する前提を置かない。承認の強制代理やAIによる承認済み表記は不可。

## 4. 11/23に向けた短期行動
- 11/20〜22：#47/#50/#48/#52の順に**差分確認の依頼**を出し、#55で各人のGit/Node/npmと参加可能時間を確認する。
- **Dの環境#51は許可済みの11/23から着手可能**。文書PRの承認待ちを理由に4人全員の設計・独立コンポーネント準備を止めない。ただしREADME競合と共通雛形の重複生成に注意。
- 新しいアプリ機能PRが来たら、**Dの#51共通環境→A#34/B#36/C#38の接続→D#40共有型**という技術依存を確認。型#40の正本はD、U03はB読み取り・C操作・D保存。
- **PRの承認・マージ・各人環境確認は人の作業**。この文書を作成したことだけでは完了にしない。

## 5. 更新状態の確認
- 対象9 PR：現物確認時点でopen、承認レビュー提出0、main未統合。
- `protect-main`：ID 27586848、APIで`enforcement=active`確認済み。
- GitHubへの計画記録・Issue進捗管理はできるが、今回の目的は**レビュー優先度・競合解消の方針確定**。文書PRを自己承認/マージしない。
- CI、デプロイ、外部公開、応募送信は未許可。ローカル実装/テストは11/23から許可されるが、このSTEP14作業では実行しない。


## 6. STEP14で実施したレビュー依頼の再配分（実績）

初回監査では9件すべてA @Gr3311Moonnに依頼中だったため、Eが書いたPRの**別人レビュー**というSTEP3要件を維持したまま、関連担当へレビュー依頼を移動した。GitHubのreview requestを実際に変更したが、**レビュー本文の投稿・Approve・マージは一切行っていない**。

| レビュー担当 | PR |
|---|---|
| A @Gr3311Moonn | #47、#50、#54（3件） |
| B @unoyuyu0913-design | #48、#57（2件） |
| C @ynykrrc1219-stack | #49、#56（2件） |
| D @milkyara | #52、#58（2件） |

- #48/#49/#52/#56/#57/#58では**新担当をrequestし、Aへの依頼を取り消した**。
- 担当PRの承認は本人の実際のレビュー判断に委ねる。担当外の人も必要なら専門コメント可能。
- 11/23の開発開始までに全9PRがマージされることを前提にしない。PR #47/#50/#48/#52を優先して検討し、#55の環境回答に並行して対応する。
