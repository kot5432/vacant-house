> **2026-11-21 ペルソナと構成の共有（設計PR）**：主役は[初めて地域の小規模イベントを企画する一人](v3/PRIMARY_PERSONA_AND_SUCCESS_SCENARIO_20261121.md)。[現行アーキテクチャ](v3/ARCHITECTURE_CURRENT_TWO_ENTRANCES_20261121.md)と[作品部門の資料計画](v3/CONTEST_SUBMISSION_EVIDENCE_PACK_20261121.md)を参照。参加入口はADR-030どおり維持。架空の一人に向けてUX・デモ・受入を考えるが、実際の需要はまだ未検証。

> **最新（2026-11-21）：共通React開発環境は準備完了。** EがNode v26.13.1でdoctor・typecheck・build・dev起動・ブラウザー表示を確認し、[PR #63](https://github.com/kot5432/vacant-house/pull/63)で`package-lock.json`をmainに統合しました。A〜Dは[PC環境構築ガイド](ALL_MEMBERS_PC_SETUP.md)に沿って各自のPCで`npm ci`から確認できます。**各自でViteプロジェクトを新規作成したり`npm install`でlockfileを作り直したりしません。** 11/23から機能実装を開始します。

# A〜D初心者用：自分のIssueを開いた後の「次に何をする？」ガイド

**最終更新：2026-11-21／対象：11月23日からの最初の1週間。** このページは**行動手順**です。正式なアプリ仕様はADR-029〜032と各Issueが優先します。実際のアプリ実装・動作テストはこの文書の追加時点では実施していません。

## 0. 最初の10分（A〜D共通）

1. [GitHubのチーム置き場](https://github.com/kot5432/vacant-house)にログイン。
2. [初心者向けGitHub操作ガイド（mainに掲載済み）](BEGINNER_START_HERE.md)を開く。GitHub Desktop・Git・Nodeなどの操作やPR提出が分からない場合はこちら。
3. [環境確認Issue #55](https://github.com/kot5432/vacant-house/issues/55)を開き、ページ下のコメント欄にGit・Node.js・npmが使えるか報告。**Node.js v26.13.1**を目標とするが、違う版でも無理に変更せずDに相談。
4. 自分の担当Issue（[A #34](https://github.com/kot5432/vacant-house/issues/34)／[B #36](https://github.com/kot5432/vacant-house/issues/36)／[C #38](https://github.com/kot5432/vacant-house/issues/38)／[D #40](https://github.com/kot5432/vacant-house/issues/40)）を開く。**一番上の「最初にすること」から**進める。
5. 不明な点はIssue最下部に「やろうとしたこと／今見えている状況／何を聞きたいか」をコメントする。トークン・パスワード・個人のPCパスは貼らない。

 > **現在の状態：** 共通のReact雛形と`package-lock.json`はmainにあり、EのPCで動作確認済みです。**A〜Dも各自のPCで動作を確認し、結果をIssue #55に報告**してください。Dは#40の共通データ型から着手します。

## 1. 作業の流れ（A〜D共通）

```text
自分のIssueを読む
  ↓ 分からなければIssueに質問
各自のPCで共有環境を確認（Node v26.13.1、npm ci、doctor、typecheck、build、dev）
  ↓ 各自の環境確認結果をIssue #55へ報告
GitHub Desktopでmainを最新版に更新
  ↓
用意済みの自分の作業ブランチに切り替え、最新mainの変更を取り込む
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

**lockfileがmainへ入った後（11/23以降）**
1. GitHub Desktopで最新mainへ更新し、用意済みの`feature/34-participation-entry`ブランチに切り替え、最新mainを取り込む。
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

**lockfileがmainへ入った後（11/23以降）**
1. 最新mainから用意済みの`feature/36-organizer-input`ブランチに切り替え、最新mainを取り込む。
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

**lockfileがmainへ入った後（11/23以降）**
1. 最新mainから用意済みの`feature/38-parent-progress`ブランチに切り替え、最新mainを取り込む。
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

## 5. D担当：共通データ型・保存の実装（最初は#40）

**共通React雛形の作成はEが前倒しで担当済み**。Dは[Issue #40](https://github.com/kot5432/vacant-house/issues/40)を最初に開き、EventInput/EventRecord、ParentTaskProgress、Repository契約の型と検証境界を作ります。次は[#41 保存・一覧](https://github.com/kot5432/vacant-house/issues/41)、[#42 バックアップ](https://github.com/kot5432/vacant-house/issues/42)です。

1. [最新のD向け指示](START_DEVELOPMENT_20261121.md)と[Issue #40](https://github.com/kot5432/vacant-house/issues/40)を読む。
2. 実装開始（11/23）までにADR-029〜032・Schema・fixturesを確認し、B/Cへ共通型の要件を確認。
3. Eが配布する`feature/40-domain-types`ブランチで作業する。別のVite環境を作らない。
4. TypeScriptの型・Repository結果型・メソッド署名を実装。既存契約に列挙された**10メソッドを省略しない**。
5. `input.date`、親タスク進捗の5キー、`completed + needsRecheck=true`、JSONスキーマバージョンの制約を守る。子チェック`checkedItemIds`を追加しない。
6. 本番のDexie・一覧・バックアップは#41/#42の別PR。mockの場合は本番保存と混同しない。
7. 自分が実施した型チェック/ビルドの結果を記録。lockfile未整備なら`not_run`と理由を記載。
8. Commit→Push→PR、Reviewer E。B/Cにも型の確認を依頼する。

**AIへの指示例**
```text
私はD担当、Issue #40です。ADR-029〜032とdocs/v3/contractsのSchema/fixturesに従い、
EventInput/EventRecord/ParentTaskProgressとRepository API（契約にある10件）を
TypeScriptで定義してください。まず変更予定ファイルと型の名前を列挙し、B/Cとの接続を
壊さない構成にしてください。input.date、進捗の親5キー、JSON v1条件を守り、
checkedItemIdsや旧空き家機能は作らないでください。IndexedDB/Dexie/バックアップ
実装は次の#41/#42で別PRにします。変更後はレビューすべき点と確認方法を示してください。
```

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

1. どのIssueかを確認（A #34、B #36、C #38、D #40）。
2. Issue一番下のコメントに**「どこまでやった」「どこで止まった」「何を聞きたい」**を書く。
3. 共通環境やNode/npmならD、仕様の判断やレビューならEへメンション。
4. 返答がなくても勝手に危険な操作をしない。**mainを直接変更、既存docsを一括削除、秘密の貼り付け、未承認PRのマージはしない**。

[詳しいGitHub操作ガイド（mainに掲載済み）](BEGINNER_START_HERE.md)／[環境確認 #55](https://github.com/kot5432/vacant-house/issues/55)／[各担当の初週計画（PR #57、別途レビュー中）](https://github.com/kot5432/vacant-house/pull/57)
