# A〜D初心者用：自分のIssueを開いた後の「次に何をする？」ガイド

**最終更新：2026-11-21／対象：11月23日からの最初の1週間。** このページは**行動手順**です。正式なアプリ仕様はADR-029〜032と各Issueが優先します。実際のアプリ実装・動作テストはこの文書の追加時点では実施していません。

## 0. 最初の10分（A〜D共通）

1. [GitHubのチーム置き場](https://github.com/kot5432/vacant-house)にログイン。
2. [初心者向けGitHub操作ガイド（PR #61、レビュー中）](BEGINNER_START_HERE.md)を開く。GitHub Desktop・Git・Nodeなどの操作やPR提出が分からない場合はこちら。
3. [環境確認Issue #55](https://github.com/kot5432/vacant-house/issues/55)を開き、ページ下のコメント欄にGit・Node.js・npmが使えるか報告。**Node.js v26.13.1**を目標とするが、違う版でも無理に変更せずDに相談。
4. 自分の担当Issue（[A #34](https://github.com/kot5432/vacant-house/issues/34)／[B #36](https://github.com/kot5432/vacant-house/issues/36)／[C #38](https://github.com/kot5432/vacant-house/issues/38)／[D #51](https://github.com/kot5432/vacant-house/issues/51)）を開く。**一番上の「最初にすること」から**進める。
5. 不明な点はIssue最下部に「やろうとしたこと／今見えている状況／何を聞きたいか」をコメントする。トークン・パスワード・個人のPCパスは貼らない。

> **大事：現時点のmainにはアプリ本体（package.json / src）がありません。** Dが#51で共通環境を追加し、そのPRがmainに統合されてからA〜Cが`npm ci`と`npm run dev`を実行します。それ以前に「アプリを起動できない」のは想定どおりで、各自別々にViteを初期化しません。

## 1. 作業の流れ（A〜D共通）

```text
自分のIssueを読む
  ↓ 分からなければIssueに質問
Dの共通環境が準備できるまで → 画面構成・入力例・確認ケースを整理
  ↓ Dの#51 PRがmainへ統合
GitHub Desktopでmainを最新版に更新
  ↓
mainから自分の作業ブランチを作成
  ↓
エディタで自分の担当部分を編集（AIコーディング可）
  ↓
自分のPCで表示や動作を確かめる
  ↓
GitHub Desktopで変更点を見る → Commit → Push
  ↓
PR作成 → ReviewerをE @kot5432に指定
  ↓
Eから指摘されたら同じブランチで修正
  ↓
Eの承認と必要な確認を経てmainへ統合
```

GitHub Desktopでのクリック方法は、[操作ガイド 第3〜5章](BEGINNER_START_HERE.md)を見る。

### AIコーディングする前に知っておくこと
- **必ず自分のブランチで作業する**。mainへ直接pushしない。
- AIには担当Issueと採用済みADRを読ませ、**担当外のファイルを触らないよう指定**。
- AIが生成した変更はGitHub Desktopの「Changes」で自分でも確認する。理解できない部分は説明を求め、分からないままPRを出さない。
- 今週の目標は**小さいPR1本（11月29日まで）**。全部を完成させなくてよい。
- **CI・デプロイ・外部公開は許可されていない**。実行してよいのは11/23からのローカルコード作成・実行テストまで。

## 2. A担当：参加する入口＋活動一覧0件（#34）

**完成イメージ：**「参加する」「企画する」の2つの入口があり、「参加する」を押すと活動一覧に進む。**現在、掲載が承認された活動は0件**なので「まだ掲載できる活動がありません」といった空の案内を表示する。

**11/23前でもできること**
1. [Issue #34](https://github.com/kot5432/vacant-house/issues/34)を開く。
2. D00の2ボタン、D01の検索/絞り込み、0件案内に必要な見出し・文言・画面遷移をメモする。
3. 「正式に掲載してよい活動は0件」の条件をEへ確認する。架空の活動を実際のイベントとして掲載しない。

**Dの共通環境がmainへ入った後（11/23以降）**
1. GitHub Desktopで最新mainへ更新し、`feature/34-participation-entry`ブランチを作る。
2. エディタで**参加入口と一覧の画面部品だけ**を作る。まずD00の2つのボタン、次にD01の「0件案内」を表示する。
3. D01で検索項目を変えたあと戻っても入力状態を保つ形を検討。**未承認活動を表示しない**。主催イベントの保存データと参加活動カタログを混ぜない。
4. 起動して、参加入口→0件案内、戻る、スマホ幅、キーボードでボタンを押せるか確認する。試せなかった項目は`not_run`と記録。
5. Commit→Push→PRを作成してEにレビュー依頼。

**AIに渡す指示例（自分のブランチで）**
```text
私はIssue #34のA担当です。ADR-030とIssue #34を守り、D00の参加/企画の2入口と、
D01の参加活動一覧（公開承認済み0件の空状態）を小さい変更で作ってください。
既存のReact/Vite構成を使い、設定やB/C/Dの担当ファイルを大きく変更しないでください。
実在の活動・募集状態・URLを創作しないでください。
まず変更予定ファイルと画面の流れを説明し、編集後は私が確認する手順も示してください。
```

**初回PRの合格チェック**
- [ ] 2つの入口がわかり、参加→0件一覧を見られる
- [ ] 承認済み0件でもエラーにならず、架空の活動を掲載しない
- [ ] 検索/戻るの状態を想定どおり扱える
- [ ] スマホ幅・キーボードの確認結果（または未実施）をPRに書いた
- [ ] Eのレビューを受けた

**今週は作らない**：個別活動の詳細#35、イベント申込、主催側の保存。

## 3. B担当：主催者の6問入力（#36）

**完成イメージ：**初めてイベントを企画する人が、U02で決まった6つの基本質問に答えられる。入力を途中で変えても消えない。**実際の保存ができるまでは「保存済み」と表示しない**。

**11/23前でもできること**
1. [Issue #36](https://github.com/kot5432/vacant-house/issues/36)を開き、[ADR-032](v3/ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md)と[データ型契約](v3/STEP25_TYPESCRIPT_DOMAIN_TYPES_AND_REPOSITORY_SIGNATURES_20261119.md)を確認。
2. 画面に出す6問、未回答・未定の選択肢、入力ミスの案内を整理。
3. Dと`EventInput`型・`createEvent`の使い方をIssueで相談。**独自の別型を作らない**。

**Dの共通環境がmainへ入った後（11/23以降）**
1. 最新mainから`feature/36-organizer-input`ブランチを作る。
2. 6問の入力欄を順番に作る。未回答`unanswered`／未定`undecided`／回答済み`answered`の違いを壊さない。
3. 入力データの日付名は`input.date`（`schedule`ではない）、設備リストは初期`[]`。Reactの画面状態として途中入力を維持。
4. Dの保存機能が未完成なら**UI確認用のmock**を使い、画面上・PRに「実際には保存していない」と明記。保存失敗時に入力内容を消さず、実際の保存成功前にU03へ遷移しない。
5. 実際に入力・戻る・保存失敗の表示を確認してPR提出。未実施テストは`not_run`。

**AIに渡す指示例**
```text
私はIssue #36のB担当です。ADR-029/032とD担当のEventInput型に従い、
U02の基本6問の入力UIだけを既存React構成に追加してください。
Knownの未回答/未定/回答済みを混同せず、日付キーはinput.date、
設備の初期値は[]です。途中入力を保持し、保存APIが未完成ならmockと明示し、
実際に保存成功するまで「保存済み」表示やU03への遷移をしないでください。
B以外の担当領域を書き換えず、変更点と確認手順を説明してください。
```

**初回PRの合格チェック**
- [ ] 6問に回答でき、未回答と未定を混同しない
- [ ] `input.date`を使い、設備は初期`[]`
- [ ] 入力途中の内容が保持され、失敗しても消えない
- [ ] mockと本物の保存の違いが分かる
- [ ] Eのレビューを受けた

**今週は作らない**：P01〜P12の優先度判定#37、本番の永続保存、U03の読み取りカード。

## 4. C担当：親12タスクの進捗操作（#38）

**完成イメージ：**U03でP01〜P12の**親タスクごと**に「未着手／進行中／完了／非該当」を変更でき、別の「要再確認」も確認できる。**完了と要再確認は同時に成立**する。

**11/23前でもできること**
1. [Issue #38](https://github.com/kot5432/vacant-house/issues/38)を開く。[ADR-031](v3/ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)の親タスクのみの決定を確認。
2. B担当はU03のカード本文、C担当は操作部分、D担当はデータ保存を作ることを整理。
3. 完了後に要再確認が付いた場合や、保存に失敗した場合の画面表示を考える。DのCAS API仕様を質問する。

**Dの共通環境がmainへ入った後（11/23以降）**
1. 最新mainから`feature/38-parent-progress`ブランチを作る。
2. P01〜P12の**親単位**で状態を選択する操作部品を作る。`status`と`needsRecheck`を別々に扱う。
3. `completed`かつ`needsRecheck=true`を維持。要再確認の解除はユーザーの明示操作だけ。**子チェック`checkedItemIds`は作らない**。
4. Dの`updateTaskProgress`/`clearRecheck`が未完成ならmockで表示・操作だけ確認。**保存済みと偽装しない**。競合や失敗時は状態が確定したふりをしない。
5. 状態の変更・再確認表示・エラーを確認し、PRに結果を記録して提出。

**AIに渡す指示例**
```text
私はIssue #38のC担当です。ADR-031/032に従い、
U03の親P01〜P12に対応する進捗操作部分だけをReactで実装してください。
statusとneedsRecheckを分け、completedかつneedsRecheck=trueを維持してください。
子項目のチェックやcheckedItemIdsは追加しません。
Bの読み取りカード・優先度判定・Dの保存処理は書き換えず、
保存API未接続ならmockだとわかる表示にして、競合/保存失敗時は成功扱いしないでください。
変更予定ファイルと試し方を先に示してください。
```

**初回PRの合格チェック**
- [ ] 親12タスクのみを操作する
- [ ] `completed + needsRecheck=true`が共存する
- [ ] 要再確認の解除は本人操作のみ
- [ ] 子チェックはなく、保存失敗を成功と表示しない
- [ ] Eのレビューを受けた

**今週は作らない**：U04編集#39、独自の保存DB、Bの優先度判定。

## 5. D担当：全員の開発土台（#51）

**完成イメージ：**リポジトリ直下に、React+TypeScript+Viteの**最小アプリ**、`package.json`・`package-lock.json`・`.node-version`・`.gitignore`があり、みんなが同じコマンドでローカル起動できる。

**11/23前でもできること**
1. [Issue #51](https://github.com/kot5432/vacant-house/issues/51)を開き、[STEP7〜9の環境構築方針（PR #52）](https://github.com/kot5432/vacant-house/pull/52)を読む。
2. `git --version`、`node --version`、`npm --version`を確認して#55にコメント。Nodeの目標は**v26.13.1**。
3. **すでにmainにある`docs/`・`.github/`・READMEを消さない**方針を確認。

**11/23以降に実行する作業**
1. GitHub Desktopでmainを最新にし、`chore/51-vite-foundation`ブランチを作る。**mainのまま編集しない**。
2. エディタでリポジトリの既存ファイルを確認。**非空のリポジトリでViteの生成コマンドを無確認で実行しない**。既存の資料を保ったまま、React+TypeScript+Viteの最小構成をルートに追加する。AIで生成する場合も削除・上書き予定ファイルを先に確認する。
3. `.node-version`は`26.13.1`。npmのみを使い、`package-lock.json`を作る。`node_modules/`、`dist/`、秘密を含む`.env`などを`.gitignore`で対象外にする。必要な`dev`/`build`スクリプトを`package.json`へ設定。
4. 初回の依存インストールで`npm install`を使用。lockfileができてから`npm ci`、`npm run dev`、`npm run build`を確認。**失敗した結果も正しく記録**。実行中の`dev`サーバーはCtrl+Cで止めてから次のコマンド。
5. GitHub Desktopで変更一覧を確認。`node_modules`や個人情報が含まれていないこと、既存資料が消えていないことを確認。
6. Commit→Publish branch/Push→PR作成。本文へ「何を追加したか」「Node/npmのバージョン」「実行したコマンドと結果」「未実施項目」を記録。ReviewerにE @kot5432を指定。
7. Eの承認と必要な確認でmainへ統合されたらA〜Cへ共有。**型定義#40は別ブランチ/別PRで進める**。

**AIに渡す指示例**
```text
私はIssue #51のD担当です。既存の公開リポジトリにReact + TypeScript + Viteの
最小開発環境を追加します。既存のdocs/ .github/ README CONTRIBUTING等は
削除も上書きもしないでください。まず現在のファイル一覧と変更予定ファイルを示してください。
npmとpackage-lock.jsonのみ、Node.js v26.13.1を.node-versionとenginesに反映、
node_modules/dist/.envを.gitignoreで除外します。CI・デプロイ設定は追加しません。
導入後に私が実行するnpm install / npm ci / npm run dev / npm run buildの手順と
期待結果を教えてください。#40の共有型やA〜Cの画面はまだ実装しません。
```

**初回PRの合格チェック**
- [ ] 既存の資料を残したままReact+TS+Viteの最小アプリを作った
- [ ] Node v26.13.1とnpm/lockfileが揃っている
- [ ] `npm ci`／`npm run dev`／`npm run build`の**実際の結果**をPRに記録した（未実施ならそう記録）
- [ ] CI/デプロイ/秘密情報を追加していない
- [ ] Eレビュー後にmainへ統合し、A〜Cへ連絡した

**今週は作らない**：共通型#40、Dexie保存#41、バックアップ#42、A〜Cの画面。

## 6. PRを出すときにコピーする説明文

```text
関連Issue：#（34/36/38/51）
担当：A/B/C/D
今回追加したもの：
今回はまだ作っていないもの：
変更ファイル：
動作確認：
- node --version：
- npm ci：実施結果 / 未実施（not_run）
- npm run dev：実施結果 / 未実施（not_run）
- npm run build：実施結果 / 未実施（not_run）
- 手で確認した画面や操作：
困っていること：
レビューしてほしい人：@kot5432
```

**重要**：PRを出しただけではIssueはDoneではありません。本人による実行・変更点の確認、別人レビュー、必要な修正、mainへの統合まで行って完了です。

## 7. 迷ったときは、この順番に質問する

1. どのIssueかを確認（A #34、B #36、C #38、D #51）。
2. Issue一番下のコメントに**「どこまでやった」「どこで止まった」「何を聞きたい」**を書く。
3. 共通環境やNode/npmならD、仕様の判断やレビューならEへメンション。
4. 返答がなくても勝手に危険な操作をしない。**mainを直接変更、既存docsを一括削除、秘密の貼り付け、未承認PRのマージはしない**。

[詳しいGitHub操作ガイド（PR #61）](BEGINNER_START_HERE.md)／[環境確認 #55](https://github.com/kot5432/vacant-house/issues/55)／[各担当の初週計画（PR #57）](https://github.com/kot5432/vacant-house/pull/57)
