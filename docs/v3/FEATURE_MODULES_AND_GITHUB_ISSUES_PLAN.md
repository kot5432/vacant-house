# 4人AI開発向け｜機能構成・フォルダ責任・Issue分割案 v0.1

作成：2026-11-18。**設計案**。この文書はGitHub Issues・Projects・ブランチ・アプリのソースコードを作成した記録ではない。**実装・依存導入・テスト実行・デプロイは未実施**。

対象：「初めて単発・小規模の地域イベントを主催する人が、基本6問から準備の全体像・理由付き優先順位・次の一歩を知り、同じブラウザで保存・再開できる」現行v3.1。旧空き家物件・所有者・マッチング案は一切引き継がない。

## 0. 結論と順序

**機能別にIssueを管理し、コードの所有権は共有基盤を中心に分ける**。4人が全員AIコーディング中心・初心者のため「画面4枚を4人で独立生成して最後に結合」は採用しない。画面の見た目とデータ・ルール・永続化の責務を分離し、最初に**ひとつの縦断導線**を作ってから並列化する。

1. いま：本書のフォルダ境界・共通型・Issue依存・レビュー担当を確認する。
2. 次：未確定のデータ型（例：`optionalDescription` vs `eventDescription`）とバックアップの機械可読schemaの一致を決める。ADR-029の識別子/初期版/`input.date`は決定済みで再質問しない。
3. 実装許可が出てから：作業環境・型・検証を少人数で組み、**U02基本6問→保存→U03理由付きプラン**を縦につなぐ。
4. 縦断導線のレビュー後にU01一覧・U04編集・U03進捗・JSONバックアップを分担並行。
5. 本番公開、実ブラウザ試験、施設管理者への連絡、アンケートは別の許可/実施工程。

本書のディレクトリ・担当ラベル・Issue IDは**作成提案**であり、採用済みADRを上書きしない。技術本体はReact+TypeScript+Vite / IndexedDB+Dexie / Vercel（ADR-001）。初回JSON版はADR-029。

## 1. 機能と責務の対応

| 機能のまとまり（GitHub Projectsの大分類） | 対象画面・仕様 | 主な処理 | 予定フォルダ |
|---|---|---|---|
| F0 共通契約・基盤 | 全画面、EventInput/Record、エラー | 入力/進捗型、共通のruntime validation、画面遷移、例外型、ビルド版 | `src/domain/types`, `src/domain/validation`, `src/app` |
| F1 イベントの作成・編集 | U02・U04 | 基本6問、任意・条件付き項目、U02メモリ内ドラフト、U04明示保存・キャンセル | `src/features/events` |
| F2 準備プラン生成 | U03 / P01〜P12 | 該当性・優先度・理由・次の一歩・代表選択、再確認候補の導出 | `src/domain/rules`, `src/domain/catalog` |
| F3 プラン・進捗操作 | U03 | 4領域タスクの表示、本人の進捗・対象外・再確認解除、保存の成功/失敗表示 | `src/features/plan`, `src/application/progress` |
| F4 一覧・保存・削除 | U01・U02・U04 | 複数イベント一覧、作成・取得・revision CAS・削除防止、入力編集確定 | `src/features/events`, `src/application/events`, `src/infrastructure/db` |
| F5 JSONバックアップ | U01 | 選択式エクスポート、2MiB/100件、全件検証、プレビュー、原子的インポート | `src/features/backup`, `src/application/backup` |
| F6 公的情報・更新 | U03と全画面の版通知 | 静的出典カタログ、施設適用・JST月末期限、本人操作での再読込 | `src/domain/catalog`, `src/application/sources`, `src/features/updates` |
| F7 共通UI・品質 | U01〜U04 | 再利用部品、保存状態、320px/200%、キーボード・読み上げ、テスト設計 | `src/ui`, `tests` |

**F1/F4が同じ`features/events`を使うのは意図的**。U01・U02・U04はイベントを操作する同一機能群。F2が優先度を計算し、F3がU03で表示・保存を指示する。F4だけがDBを直接操作するわけではなく、**全機能が共通Repositoryインターフェース経由**でサービスを呼ぶ。JSONはU01にボタンがあるが機能本体はF5へ分離する。

## 2. 提案するソースコード構造（今はフォルダを作らない）

```text
src/
  app/
    App.tsx                     # 画面の組立てと遷移
    routes.ts                   # U01〜U04とイベントID
  domain/
    types/
      event.ts                  # EventInput, EventRecord, Known, TaskProgress
      task.ts                   # P01〜P12、priority、applicability
      backup.ts                 # ADR-029のBackupEnvelope
    validation/
      eventInput.ts             # 6問、任意項目、日付、上限
      eventRecord.ts            # DB・JSONからのruntime validation
      backup.ts                 # バックアップ版・件数・サイズ・日時
    rules/
      evaluatePlan.ts           # 純粋関数：該当性、P1/P2/P3、理由
      selectNextAction.ts       # 未解決代表、複数P1、taskId昇順
      recheck.ts                # 入力変更による再確認導出
    catalog/
      taskCatalog.ts            # P01〜P12の4領域、文言
      officialSources.ts        # Gitで管理しViteへ同梱する公的出典
      sourceApplicability.ts    # 地域・会場条件・期限・出典版
  application/
    events/
      eventService.ts           # 新規作成・読込・入力編集確定・削除
    progress/
      progressService.ts        # task単位CAS、明示再確認解除
    backup/
      exportService.ts          # 保存済み選択集合から完成JSON
      importService.ts          # 全件検証→プレビュー→承認→原子追加
    sources/
      sourceService.ts          # 有効出典のみ一般/施設固有を選択
  infrastructure/
    db/
      database.ts               # Dexie store/version
      eventRepository.ts        # repository adapter; CASと削除保護
      migrations/               # 実在する版間移行のみ
  features/
    events/
      EventListPage.tsx         # U01イベント一覧の本体
      EventSetupPage.tsx        # U02初回入力
      EventEditPage.tsx         # U04既存入力編集
      components/               # 基本6問、条件付き会場入力
    plan/
      PlanPage.tsx              # U03
      components/               # 最優先、4領域、進捗、再確認
    backup/
      components/               # U01から呼ぶ書出し・取込UI
    updates/
      components/               # 新版検知と本人再読込
  ui/
    components/                 # ボタン、フォーム、メッセージ等の共有部品
    tokens/                     # 見出し、色、余白等
tests/
  fixtures/                     # 架空イベントと境界JSON（実行前は設計のみ）
  unit/                         # ルール・validation
  integration/                  # DB/JSON/CAS
  e2e/                          # U01〜U04・アクセシビリティ
```

**ファイル名は仮**。例えばReact Router採用の是非は未決であり、`routes.ts`の存在は採用決定ではない。厳密schemaの前に同名のTypeScriptインターフェースを各担当が重複生成しない。パスや命名を変更する場合はPRで公開のインターフェースとテスト計画を併せて見直す。

## 3. ファイルの依存方向（重要）

```text
features/* (画面・UI)
       ↓
application/* (利用者操作・保存順序)
       ├──→ domain/types + validation + rules + catalog (純粋な判定)
       └──→ EventRepository interface
                     ↓
             infrastructure/db (Dexie/IndexedDB)
```

- `domain/rules`はReact、Dexie、ブラウザ現在時刻、ネットワークアクセスを持たない。必要な時計・カタログは引数で渡す。
- `ui`でP1/P2/P3を独自計算しない。`infrastructure/db`でUIの通知文言を決めない。
- U03本人進捗操作とU04入力編集は異なるサービス。旧入力が上限違反でもU03の進捗CASを不必要に止めない（ADR-025/026）。
- 施設出典はビルド同梱、本人データはブラウザ内。施設名自由メモからカテゴリ・許認可を推測しない。
- `features/events`と`features/plan`が直接互いの内部ファイルを読み込まない。共通型とapplicationのサービスを経由する。
- `tests/fixtures`は実在の主催者・個人情報ではなく架空データのみ。

## 4. 4人全員初心者・AI中心：役割は機能責任＋相互レビュー

| 仮担当 | 主な所有機能 | 初期の作業 | レビュー相手 | 要注意 |
|---|---|---|---|---|
| A | F0 / F2（共通型・判定） | 入力6問/任意項目の型とP01〜12の既決ルールを一元化 | C | 他人が勝手に型を増やさない |
| B | F1 / F3（U02/U04/U03操作画面） | 入力・プランを画面で見せる、誤解しない説明 | D | ルールをUI内部で重複実装しない |
| C | F4 / F5（Repository/JSON） | 新規保存、CAS、削除保護、バックアップ原子性 | A | DB版・JSON版を混同しない |
| D | F6 / F7（出典・品質・統合） | 出典の適用条件・共通UI・レビュー・Issue/PR運用 | B | 許可/安全性とタスク優先度を混同しない |

4人全員が**AIへの指示・生成差分の確認・テスト設計・PRのレビュー**に関わる。Dを唯一のテスト係にしない。**保存/JSONの難しさを考慮しCへのレビューはAとDも補助**。レビュー相手はPR単位で交代できるが、実装者本人による自己承認はしない。

**初期の例外**：縦断導線（6問→保存→プラン）の初回だけはA/B/C/Dが15〜30分程度の仕様読み合わせをし、型・serviceインターフェースの責任者を先に決める。その後に並列着手する。全員同時に`App.tsx`、`event.ts`、`database.ts`をAIに作らせない。

## 5. GitHub管理の置き方

- **GitHub Projects（Kanban）**：Backlog → Ready → In Progress → Review → Testing → Done。Testingは実装後のみ。現時点では設計IssuesをBacklog/Ready止まりにする。
- **Issueの大分類ラベル（提案）**：`area:foundation`, `area:event-input`, `area:rules`, `area:plan`, `area:data`, `area:backup`, `area:sources`, `area:quality`。
- **種別ラベル（提案）**：`type:design`, `type:feature`, `type:test`, `type:docs`, `type:bug`。
- **優先度ラベル（提案）**：`priority:P0`, `priority:P1`, `priority:P2`。**GitHub Issues用のP0/P1/P2とアプリ内のP01〜P12・優先区分P1/P2/P3は名前が衝突するため、Issueラベルでは`work:critical/normal/later`を採用推奨**。本番では一組に統一し、両方併用しない。
- **1 Issue = 1成果・1主担当・1〜2個の受入条件群**。大きなIssueはタスクを小分けする。1 PR = 原則1 Issue相当。AIによる大規模差分を最初から一括でmergeしない。
- ブランチ名案：`feature/issue-xx-short-name`、`docs/issue-xx-short-name`。PRはタイトル、関連Issue、正本ADR、変更パス、実際の確認証拠、AI利用内容、未検証項目を書く。
- **レビューとテストは別**：AIの「動きます」は証拠としない。別メンバーのdiffレビュー→実行許可後のテスト記録→Done。
- GitHubの実Issue番号はGitHubが自動採番する。本書の`PLAN-xx`は登録前の**仮タスクID**でありIssue #番号ではない。

## 6. 最初に用意するIssue草案（GitHubに未登録）

| ID | タイトル（機能別） | 前提／依存 | 担当（仮） | 完了条件（設計段階） |
|---|---|---|---|---|
| PLAN-01 | 共通型・入力キー・runtime schemaの一意化 | ADR-029、DATA_DESIGN_V1、ADR-024 | A | `input.date`、Known、イベント説明キー、JSON版が1つの型表で一貫 |
| PLAN-02 | 4画面の遷移・サービス呼出・エラー契約 | PLAN-01 | B | U01〜U04の保存成功/失敗/取消時の遷移表 |
| PLAN-03 | P01〜P12の純粋判定と優先理由 | PLAN-01、ADR-003/027/028 | A | 判定条件・優先度・該当性・理由・代表のケース表 |
| PLAN-04 | EventRepository・CASと削除防止 | PLAN-01 | C | 作成/取得/一覧/進捗/編集/削除の原子的境界とエラー一覧 |
| PLAN-05 | U02 基本6問・条件付き入力 | PLAN-01/02 | B | 未回答/未定、途中入力・初回失敗・IMEの画面仕様 |
| PLAN-06 | U03 次の一歩と4領域の準備プラン | PLAN-02/03 | B | 複数P1・理由・出典・進捗の画面状態表 |
| PLAN-07 | U03 進捗保存・本人対象外・再確認 | PLAN-03/04/06 | C+B | CAS成功/失敗・解除操作の状態遷移 |
| PLAN-08 | U01 イベント一覧・削除・後日再開 | PLAN-02/04 | C+B | 複数イベント・削除競合・DB使用不可の確認表 |
| PLAN-09 | U04 明示編集保存と条件変更 | PLAN-01/02/03/04 | B+C | ドラフト、保存失敗、施設値クリア、再確認の契約 |
| PLAN-10 | JSON書出し：本人選択・容量と失敗 | PLAN-01/04、ADR-029 | C | 0/100/101件、2MiB境界、既存値保全の表 |
| PLAN-11 | JSON取込み：全件検証・プレビュー・原子的復元 | PLAN-01/04/10、ADR-029 | C+A | 未知版・ID衝突・未来日時・重複取込・失敗原子性 |
| PLAN-12 | 出典カタログ・適用・旧タブ更新 | PLAN-01/03/06 | D | 期限切れ・別カテゴリ非適用・手動更新・一般案内への退避 |
| PLAN-13 | 共通UI・アクセシビリティの受入仕様 | PLAN-02/05/06 | D+B | 320px/200%・キーボード・読み上げ・保存状態 |
| PLAN-14 | 実行後テスト証拠とコンテスト提出条件 | PLAN-03〜13 | D＋全員 | 試験ケース・証拠欄・動画・AI活用説明・公開ゲート |
| PLAN-15 | 施設4候補の公開資料比較と個別確認準備 | 既存比較資料、ADR-009〜012 | D＋別レビュー | 出典表・適用範囲・未確認欄。**施設への実連絡は別承認** |
| PLAN-16 | 需要アンケート・利用者検証（後日） | 調査計画と協力者の同意 | 全員 | **未実施の必須検証としてBacklogに置く** |

**現段階で優先するのは PLAN-01〜04 の設計整合とPLAN-15の資料整備**。実装Issueの実行は、明示された実装許可後に開始する。最初から16個全部を人に割当てて同時進行しない。大きなPLAN-11は「取込検証」「プレビュー」「原子的保存」などへ分割可能。

## 7. 最初の縦断導線（ユーザーに価値を見せる最短経路）

```text
U02 6問を入力
    ↓ 同じ入力型でvalidation
EventService.createEvent
    ↓ 保存成功後のみU03へ（保存失敗時は入力保持）
RuleEngine(input, progress, rulesVersion)
    ↓ P1→P2→P3、同区分タスクID順
U03 理由・次の一歩・全体像を表示
```

最初に**架空の2条件**で体験差を説明できるようにする：
- ケースA：参加対象minors、会場未定 → P05=P1、P07=P2。全P1を表示。
- ケースB：参加対象adults、会場候補 → P05=P2、P07=P2、P08=P2。他P2も含めID昇順で代表を決める。

この例は**見せるケースの設計**であり、テスト合格やアプリ実装を意味しない。

## 8. AIへのIssue共通テンプレート

```md
## 目的・利用者ができること
## 対象画面／タスクID／関連する最新ADR
## 許可する変更範囲（パス）
## 変更してはいけない契約（入力6問、P05/P08、進捗、JSON等）
## 入力・期待表示・保存失敗時の動作（架空データ）
## 依存Issueと公開インターフェース
## 実装者が確認すること
## レビュアーが確認すること
## 実行試験・証拠（現段階: not_run）
## AI利用内容と残る未決事項
```

AIに「設計書を全部読んで作って」とだけ依頼しない。**このIssueで必要な最新ADR・許可パス・成果物・禁止事項・期待ケース**を渡す。AIが不明な仕様を見つけたらIssueに記録させ、暗黙の既定値を作らない。

## 9. 完了を判断する基準

- **設計Issue Done**：型と仕様が矛盾せず、依存と受入条件が文書にあり、別担当のレビューが済んだ状態。アプリ動作合格は含まない。
- **実装Issue Done**：実装があり、別人PRレビューを受け、関連テストの実行証拠が記録され、重大な失敗が残っていない状態。AIの自己申告では不十分。
- **公開判断**：利用者の明示許可・最新施設出典の確認・プライバシー/バックアップ注意・応募規定の照合を別ゲートで行う。
- **未決で保持**：技術ライブラリ（ルーティング・runtime schema/スタイル/試験ツール）、`eventDescription`命名の揺れ、完全なJSON Schema、4人の実際の担当者・作業可能時間、施設個別確認、アンケート。決定済みADR-029の値を再質問しない。

## 10. 参照する正本

- [ADR-001 技術採用](ADR_001_TECH_STACK_ADOPTED.md)
- [ADR-003 P05・表示順](ADR_003_PRIORITY_RULES_ADOPTED.md)
- [ADR-027 P08の施設出典によるP1昇格なし](ADR_027_P08_P2_NO_FACILITY_AUTO_ESCALATION.md)
- [ADR-028 残るP01〜P12のP2条件](ADR_028_LIMITED_P2_PRIORITY_BY_EXISTING_INPUTS.md)
- [ADR-029 JSON初期識別子・版・dateキー](ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md)
- [アーキテクチャ v1](ARCHITECTURE_V1.md)
- [データ設計 v1](DATA_DESIGN_V1.md)
- [4人AI開発計画](PREDEV_FOUR_PERSON_AI_DEVELOPMENT_PLAN_20261117.md)
- [受入ケース（未実行）](STEP8_19_ACCEPTANCE_CASES_AND_EVIDENCE_TEMPLATE.md)
- [施設4候補比較](PREDEV_MULTI_FACILITY_COMPARISON_20261117.md)
