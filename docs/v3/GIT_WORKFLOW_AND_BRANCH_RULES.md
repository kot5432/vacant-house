# GitHubブランチの使い方・命名ルール（5人チーム）

**更新日：2026-11-19。ルールと操作手順の文書化のみ。まだアプリの実装、動作確認、ブランチ保護設定はしていません。**
概要は[リポジトリ直下のCONTRIBUTING.md](../../CONTRIBUTING.md)。MVP正式仕様は[ADR-030](ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md)、[ADR-031](ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)。

## 1. 基本イメージ

```text
main（共同の安定版）
 ├─ feature/18-activity-list ── commit ── commit ── PR → Eレビュー → mainへ統合
 ├─ feature/19-event-input ──── commit ── commit ── PR → E＋関連担当レビュー → main
 ├─ fix/20-progress-recheck ─── commit ── PR → C/D相互レビュー → main
 └─ docs/21-user-guide ─────── commit ── PR → Eレビュー → main
```
**番号18〜21はすべて命名例であり、Issue作成済みという意味ではありません。** 実際にはGitHubに存在するIssue番号を使用します。各ブランチは「その時点の最新main」から作り、**個人がずっと保持するブランチにはしない**。

### 5人の役割とPRレビュー
| 人 | 開発・確認の担当 | 推奨レビュー |
|---|---|---|
| A | D00〜D02 参加・活動一覧・参加条件・次の一歩 | E（出典/表現）、B（画面共通） |
| B | U02・U03入力→優先順位・プラン表示 | E＋C（状態の受渡し） |
| C | U03進捗・U04編集・再確認 | E＋D（CAS/保存） |
| D | U01一覧、保存・JSONバックアップ | E＋C（データ境界） |
| E | 富山一次資料、掲載更新・品質、すべてのPRのレビュー調整 | 自分が文書・データPRを出したらA/Bがレビュー |

## 2. ブランチ名
規則：`種類/Issue番号-短い英語の作業名`。例：`feature/14-participation-catalog`（Issue #14の作業を実装する場合の名前例。Issueが設計レビューなら適切に`docs/`を使う）。使える種類：
- `feature/` 新機能：`feature/22-participation-detail`
- `fix/` 不具合修正：`fix/23-backup-duplicate-id`
- `docs/` 設計資料：`docs/4-git-workflow`
- `test/` テスト：`test/24-rule-cases`
- `chore/` 設定/メンテ：`chore/25-tooling`
- `refactor/` 動作を変えない内部整理：`refactor/26-storage-service`

**22〜26は架空のIssue番号**。先にIssueを作り、その番号で命名。小文字英数字と`-`を使用し、`main`に直接pushしない。名前に担当者名を入れない。基本的にブランチ1本につきIssue1件・PR1件。

## 3. Gitの基本用語
- **main**：みんなの最新の統合済みコード
- **branch**：mainから分岐して安全に作業する場所
- **commit**：変更内容の区切りを記録する
- **push**：ローカルのコミットをGitHubへ送る
- **Pull Request（PR）**：mainへ取り込む前に変更を見せ、確認を依頼する
- **merge**：承認済みの変更をmainへ反映する
- **conflict**：同じ部分などを複数人が変更し、Gitが自動で統合できない状態

## 4. 最初の準備（各自のPC）
Gitインストール、GitHubへの認証、リポジトリへのアクセスが必要。GitHub Desktopを使ってもよいが、以下はターミナル例。

```bash
git clone https://github.com/kot5432/vacant-house.git
cd vacant-house
git switch main
git pull --ff-only origin main
```

- 認証情報、アクセスキーやパスワードはチャット・Issue・コードに貼り付けない。
- すでにcloneしてある人は`git clone`を繰り返さない。
- 上記は**コマンドの説明**。今回実行したものではない。

## 5. Issueを選んでブランチを作る

**手順0**：GitHubのIssuesで作業を決め、担当者を設定する。設計中で未承認の機能Issueを勝手に開発開始しない。

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/22-participation-detail
```
`22`は存在確認してから置き換える。成功すると、自分の作業場所が`main`から新しいブランチへ切り替わる。

現在のブランチ確認：
```bash
git branch --show-current
git status
```

## 6. 作業の節目にコミットする

```bash
git status
git diff
git add path/to/changed-file
git diff --cached
git commit -m "feat: 参加詳細の表示を追加"
```
- `git add .`は意図しないファイルや秘密情報を入れやすいので、慣れるまでは**ファイルを指定してadd**。
- 一つの小さな成果（基本画面→データ表示→エラー表示など）ごとにコミット。
- タイトルは`feat:`（機能）、`fix:`（不具合）、`docs:`（文書）、`test:`、`chore:`、`refactor:`等。
- AIが変更したコードも、本人が`git diff`を確認する。

## 7. GitHubへpushしてPRを作る

```bash
git push -u origin feature/22-participation-detail
```

GitHubのリポジトリを開き、上部の **Compare & pull request**、または **Pull requests → New pull request** を選ぶ。
- base = `main`、compare = `feature/22-participation-detail`
- タイトル例：`feat: 参加詳細と公式確認導線を追加`
- 本文にIssue、変更点、確認したこと、未確認、スクリーンショット（テスト用の架空データのみ）、レビュー担当を書く
- 未完成なら **Draft pull request** にし、マージを求めない
- **Eがレビュー**、データ関連はC/D、出典はA/E等が追加確認
- 合格するまでは`main`へマージしない

## 8. レビューで修正を依頼されたとき
同じブランチへ戻り、修正したら**追加コミット→push**。同じPRへ自動的に反映される。

```bash
git switch feature/22-participation-detail
git status
git add path/to/fixed-file
git commit -m "fix: 未確認条件の表示を修正"
git push
```

レビューコメントはIssue/PR上で解決した根拠を添える。「AIが直した」だけで完了としない。

## 9. 別の人がmainへ先にマージしたとき
自分の変更を退避・コミットしてから最新mainを取り込む。初心者向けの安全な方法は`merge`。公開済みブランチを`rebase`して強制pushする必要はない。

```bash
git switch feature/22-participation-detail
git status
git fetch origin
git merge origin/main
```

**コンフリクトが出たとき**：
1. `git status`で衝突ファイルを確認し、GitHub/エディタで`<<<<<<<`などの競合マーカーを確認。
2. A〜Dの該当担当者に、どちらの変更も残す必要があるか相談。
3. 正しい内容に修正し、競合マーカーを除去。
4. `git add <file>`を行い、`git commit`でマージを確定（Gitがマージコミットの案内を出す場合）。
5. PRで変更を確認し、再びレビューを受ける。

**解決できない場合の中止**（マージ中だけ）：`git merge --abort`。未コミットの作業がある場合は安易に操作せずE/Cへ相談。決して`git push --force`で共有ブランチを書き換えない。

## 10. マージ後
- GitHubでPRの承認・必要なチェック後、主にEがmainへマージする。E自身の変更は別担当がレビューする。
- GitHubの **Delete branch** を使って済んだ作業ブランチを削除。
- 各自のPCは更新：
```bash
git switch main
git pull --ff-only origin main
git branch -d feature/22-participation-detail
```
削除に失敗したら**無理に`-D`しない**。未統合のコミットが残っていないか確認。次のIssueは新しいブランチから開始する。

## 11. よくあるトラブルと安全側の行動
| 状況 | 対応 |
|---|---|
| 間違ったブランチで編集した | まず`git status`と`git branch --show-current`。コミット/共有前に担当者へ相談 |
| コミット前の変更を取り消したい | `git diff`で対象確認。`git restore -- <file>`は**未コミット変更が消える**ため実行前によく確認 |
| コミットを取り消したい | 共有済みなら履歴を上書きせず、担当者と確認して`git revert <commit>`を検討 |
| マージに失敗した | `git merge --abort`はマージ進行中のみ。エラー内容と`git status`を共有 |
| 誤って秘密情報をコミットした | ファイル削除だけで履歴から消えない。すぐE/管理者に知らせ、該当資格情報を無効化・再発行。ログに秘密を貼らない |
| 他人のブランチが変わった | `git push --force`や`reset --hard`は安易に使わない |
| PRの変更が巨大 | 別Issue/PRへ分割し、レビュー可能なサイズにする |
| テスト未実行 | PRの確認欄に必ず「未実施」と書く |

## 12. GitHub管理者に設定してもらう保護ルール（**まだ設定していない**）
- `main`に対し **Require a pull request before merging** を有効化
- **最低1人の承認**（できればE、ただしE本人のPRは別の人が承認）
- 可能なプラン/権限の範囲で、承認なしの直接push・強制push・ブランチ削除を禁止
- CIが将来導入されたら **必須チェック** を設定（現在はまだ実行しない）
- GitHub repository Settings → Rules → Rulesets または Branch protection rules（GitHubの権限やUIで名称が異なる）
- **管理者による設定が済むまでは運用上の約束であり、GitHub上で機械的に強制されているとは限らない**。

## 13. PR前の自己確認リスト
- [ ] 関連Issueの範囲内、最新ADR-030/031に整合
- [ ] 変更ファイルを`git diff`で読んだ
- [ ] 認証情報・個人情報・無許可の画像なし
- [ ] 重要な未検証事項をPRに記載
- [ ] `main`から分岐し、ブランチ名が規則に一致
- [ ] 他の担当者が触る型・保存契約の変更は共有済み
- [ ] Eまたは関連担当がレビュー可能なサイズ
- [ ] **実行していない確認をPASSと書いていない**

この手順はチームに共有してよいが、**実際のブランチやPRは「実装開始」の指示が出た後に作成する**。
