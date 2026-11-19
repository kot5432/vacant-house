# STEP10｜mainのRuleset保護を有効にするための設定・検証手順（A案採用）

- 決定日：2026-11-19
- ユーザー決定：「STEP 10はA案。mainへの変更はPR＋1人以上の承認必須。GitHubで設定できる範囲を確認する」
- リポジトリ：`kot5432/vacant-house`（public、`main`がデフォルト）
- **実確認**：GitHub API `GET /repos/kot5432/vacant-house/rulesets`および`GET /repos/kot5432/vacant-house/rulesets/27586848`を実施。既存ルールの状態は**`enforcement: "disabled"`**。
- **実変更の限界**：現在接続中のGitHub操作ツールにはRulesetを編集/有効化する操作がない。`GET /branches/main/protection`は接続アプリに対して403（権限不足）。そのため**有効化は実施しておらず、強制されているとは言わない**。

## 既存ルールの現在値（APIからの確認結果）

| 項目 | 値 |
|---|---|
| Ruleset ID | `27586848` |
| 名称 | `protect-main` |
| 対象 | `branch`、`~DEFAULT_BRANCH`（現在main） |
| enforcement | **disabled** |
| deletion | ルール登録あり |
| non_fast_forward | ルール登録あり |
| pull_request | ルール登録あり |
| required_approving_review_count | **1** |
| required_review_thread_resolution | **true** |
| dismiss_stale_reviews_on_push | false |
| require_last_push_approval | false |
| require_code_owner_review | false |
| bypass_actors | [] |

ルールの**内容が設定されていることと、実際に強制されることは別**。今回は無効のため、直push/未承認マージを機械的に防げない。

## GitHub画面で管理者Eが行う設定（依頼手順・未実施）

1. `https://github.com/kot5432/vacant-house/rules/27586848`を開く（権限がない場合はRepository → Settings → Rules → Rulesets）。既存の`protect-main`を選ぶ。**重複ルールを作らない**。
2. 対象が現在のデフォルトブランチ`main`であることを確認。
3. **Enforcement statusをActiveへ変更**して保存する。現在はDisabled。
4. Require a pull request before merging と Required approvals = **1**、Require conversation resolution、Block force pushes、Restrict deletionsを維持する。
5. 推奨追加：**Dismiss stale pull request approvals when new commits are pushed**をONにする。新たなpushの後は別人が最新差分を確認する。レビュー負担が増えるため、チームが運用できるか確認する。
6. **Bypassは原則なし**（現在bypass_actors=[]）。管理者自身も自己承認/直接pushで抜け道を使わない。
7. ステータスチェック必須は**現時点ではONにしない**（CIが未許可で、設定するとチェック不能でPRを閉塞させるおそれ）。CIを導入するSTEPで改めて議論。
8. 設定後にRulesets画面で`Active`を確認し、APIで`enforcement:"active"`かつ対象/ルールを再取得して記録する。**ユーザーが有効化したと申告しただけでなく、API値でも確認する**。

## STEP3との関係
- GitHubの承認数1は**誰が承認したかまで固定するものではない**。A〜D作成PRの主レビューは**E @kot5432**。E自身が作者のPRはA〜Dの関連担当から別人レビューを得る。
- 既存のPR #47〜#50、#52はE作成でA担当@Gr3311Moonnへレビュー依頼済み。承認前はmainにマージしない。
- 自己承認の回避、未解決コメントの解消、レビュー後の差分の扱いをPRごとに確認する。

## 実際の有効化後に検証すること
- [ ] ruleset ID 27586848のenforcementが**active**になったことをAPI/画面で確認
- [ ] 対象がmainに一致
- [ ] 1人以上の承認とPR必須が有効
- [ ] 未解決コメントがあるPRをマージできないことの確認（既存の実PRに無害な形で確認）
- [ ] force push/削除の禁止に該当する設定が有効
- [ ] 管理者と一般メンバー双方にbypassルールの抜けがないことを確認
- [ ] CI未設定のためstatus checksを現時点では要求していない
- [ ] 設定が足りない場合はチーム運用ルールだけに依存することを記録

公式参照：https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository
https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets

## 今回の状態
- **A案の方針採用：完了**
- **既存Rulesetの読取監査：完了**
- **Rulesetの有効化：未実施（現在disabled）**
- **アプリ実装/実行テスト/CI/デプロイ：今回実施なし**

次のSTEPは管理者による既存Rulesetの有効化確認。設定できるまでは、すべてのメンバーにmain直push禁止・別人レビュー・PRによるマージの約束を改めて共有する。
