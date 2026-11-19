# STEP12｜A〜D 初週の開発指示書・受入条件（A案採用）

作成日：2026-11-20。対象：2026-11-23（月）〜11-29（日）。5人チームの計画負担は各週5〜8時間/人。**計画時間は各人の確約ではない**。

## 0. 前提・今回の状態
- 利用者決定：**STEP12 A案「A〜D全員分の作業指示書を用意する」**。
- 現行製品は**富山地域活動の参加入口 D00〜D02 と主催準備 U01〜U04**。旧空き家案は実装しない。
- STEP6の許可：**11/23から担当機能の実装、PC上のローカル実行/テスト、ブランチ・PR作成まで**。**CI、デプロイ、外部公開、応募送信、外部連絡は未許可**。
- STEP10の既存protect-main RulesetはAPIで`active`確認済み（PR・承認1人・レビューコメント解決必須）。**A〜DのPRはE @kot5432を主レビュー**、Eが書いたPRは他担当の別人レビュー。自己承認しない。
- STEP11のGit/Node/npm環境は各メンバーの本人確認が**未回収**（#55）。
- **11/29にA〜D各1件の小さいPRを出す**目標。PR作成≠受入合格≠マージ。Dは先行する環境PRと型PRを分け、最低1件のPRを初週目標とする。初週の4件の全PRが完成・承認済みだとは記載しない。
- main実ファイルの監査：アプリ雛形（`package.json`/`src`）は**未作成**。Issue #51でDが共有環境を整備する。依存を待つA〜Cは各自でルート直下のVite環境を生成しない。

## 1. 読む資料の順番（全員共通）
1. [現行正本](README.md)＋[ADR-029](ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md)・[ADR-030](ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md)・[ADR-031](ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)・[ADR-032](ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md)。
2. [共有TypeScript型とAPI](STEP25_TYPESCRIPT_DOMAIN_TYPES_AND_REPOSITORY_SIGNATURES_20261119.md)、[画面の正常・異常](STEP14_SCREEN_BEHAVIOR_AND_ERROR_MATRIX_20261119.md)、[進捗・編集状態遷移](STEP26_SAVE_EDIT_RECHECK_STATE_TRANSITIONS_20261119.md)。
3. [PR・ブランチルール](../../CONTRIBUTING.md)、[初週計画](STEP5_NOVEMBER_PARALLEL_SCHEDULE_PROPOSAL_20261119.md)（PR #49でレビュー中）、[環境確認](STEP11_TEAM_ENVIRONMENT_CHECK_AND_SHARE_20261120.md)（PR #56でレビュー中）。正式決定の差分はIssueと現行ADRが優先。リンク先がmain未統合なら、該当PRブランチを参照する。
4. 各自のIssueと以下の担当指示を照合。仕様と指示が食い違えば**ADRを無断変更せずIssueで相談**。

## 2. D担当（最初に共通環境、次に型） @milkyara
**Issue [#51](https://github.com/kot5432/vacant-house/issues/51) → [#40](https://github.com/kot5432/vacant-house/issues/40)**。提案ブランチ`chore/51-vite-foundation`、続いて`feature/40-domain-types`。レビューE、型の専門確認B/C。

**作業順**
1. #55にGit・Node v26.13.1・npm・11/23参加可否を回答。不一致はEへ共有。npm採用・Node固定（STEP8/9）。
2. 11/23以降の最新mainから`chore/51-vite-foundation`を作成。既存`docs/`、`.github/`、READMEを保持。React+TS+Vite最小構成、`.node-version`(`26.13.1`)、npm`package-lock.json`、`.gitignore`、ローカル起動手順のみを作る。UIの独占実装はしない。
3. `node --version`、`npm --version`、`npm ci`、`npm run dev`、`npm run build`を**実際に行ったときだけ**結果・環境・エラーをPRに記録。CI/公開先の設定は作らない。
4. #51を先にEへPR提出。採用された共通構成・APIの**ファイル配置をB/Cへ先に共有**。レビュー・マージ後、最新mainから#40の新しいブランチを作る。
5. #40では`EventInput`、`EventRecord`、`ParentTaskProgress`、`RepoResult`とRepositoryメソッド契約を正規の1か所に実装。TypeScript型だけで実行時データが検証済みとは主張しない。JSON v1のstrict validationは後続で安全に扱う。

**#51の受入**：既存文書非削除、同一Node/npm/lockfile、`dev`/`build`の用意、秘密情報・デプロイなし、実行記録（未実施は`not_run`）、Eによるレビュー。

**#40の受入**：ADR-029/031/032の正規キー、`input.date`、親進捗の`taskId/status/needsRecheck/recheckReasonCodes/updatedAt`の5キー、子チェック型なし、優先度は保存しない。B/Cが署名をレビュー。Repositoryの名称一覧は**実際は10件**（`listEvents/getEvent/createEvent/updateTaskProgress/clearRecheck/saveEventInput/deleteEvent/exportSelected/previewImport/confirmImport`）。旧文書の「9 API」表現は**数え間違い**として扱い、既定の10名を減らさない。

**今週除外**：Dexie永続化完成（#41）、JSON復元/バックアップ完成（#42）、CI・ホスティング。

## 3. A担当（参加入口） @Gr3311Moonn
**Issue [#34](https://github.com/kot5432/vacant-house/issues/34)**。提案ブランチ`feature/34-participation-entry`。主レビューE、カタログ公開条件はEと事前照合。

**作業順**
1. #55に開発環境を回答。公開対象のActivityCatalogと主催EventRecordを混ぜないことを確認。
2. Dの共通雛形が未統合の間に、D00の2入口とD01の0件状態、検索入力・空状態・公式案内のUI契約をEに提示。承認済み活動は現在**0件**。
3. 11/23以降、共通雛形に接続できる独立コンポーネントを構築。D00から「参加」→D01、「企画」→主催の入口へ遷移する想定。ただしBの未完成画面を完成済みと表示しない。
4. D01の「見つからない場合」「公開活動0件」「公式一次情報へ確認」の表現を実装。未承認候補を可視化しない。入力保持・キーボード操作・320px表示の確認方法をPRに記載。
5. #34の小PRをEへ提出（目標11/27、遅くとも11/29）。追加の#35 D02詳細は次のIssue。

**初回PR受入**：承認済み0件でも壊れない、`visible=0`が表示されない、募集/会場確定を推測しない、主催データへの転記なし、画面戻りで絞込保持。**実テスト未実施は`not_run`**。

**今週除外**：実在活動の審査なし公開、D02の全詳細、申し込み/参加履歴保存。

## 4. B担当（主催入力） @unoyuyu0913-design
**Issue [#36](https://github.com/kot5432/vacant-house/issues/36)**。提案ブランチ`feature/36-organizer-input`。主レビューE、DとEventInputの型を照合、CとはU03画面境界を共有。

**作業順**
1. #55に環境回答。U02の**主入力6問**の画面仕様と補助回答を正本で確認。自分でEventInput型を重複定義しない。
2. Dが共有する`EventInput`と`createEvent`結果（`ok`/`invalid_input`等）を照合。Dの実装待ちなら**mockを明示**して入力UIを独立させる。
3. `Known<T>`の未回答/未定/回答済みを勝手に一値へ変換しない。日付は`input.date`、設備カテゴリは必須`[]`初期値。入力途中のdraftは画面で保持。
4. 11/23以降、共通雛形と接続可能なU02入力コンポーネントを作る。**createEventが実際に成功した時だけU03に遷移**。未接続の仮応答では「保存済み」にしない。保存失敗時はdraftを保持。
5. 入力ケース/エラー/未実施内容をPR本文に書き、Eへ提出。

**初回PR受入**：6問の入力・未回答/未定の区別・ドラフト保持・`input.date`と設備`[]`・保存の成功/失敗のUI境界が契約に一致。スキップ時の推測値補完をしない。

**今週除外**：全P01〜P12判定の完成、U03カード、Dの本番保存。判定は次の[#37](https://github.com/kot5432/vacant-house/issues/37)でBが唯一の所有者。

## 5. C担当（親タスク進捗UI） @ynykrrc1219-stack
**Issue [#38](https://github.com/kot5432/vacant-house/issues/38)**。提案ブランチ`feature/38-parent-progress`。主レビューE、Bが読取カード、Dが型/API/保存の所有者。

**作業順**
1. #55に環境回答。親P01〜P12のみ、ユーザーが変更する`status`と`needsRecheck`の分離を確認。
2. BのU03読取カードとは**独立した操作コンポーネント**を設計。Bが算出した優先度/根拠を再計算しない。
3. Dの`updateTaskProgress`/`clearRecheck`の`expectedRevision`と共通`RepoResult`を参照。未完成ならmockでユーザー操作の状態を確認し、永続保存済みとは表示しない。
4. 11/23以降、親単位のステータス更新UI・再確認中表示・明示解除ボタン・エラー/競合メッセージの小さな差分を作成。
5. `completed+needsRecheck=true`を共存させ、意図せず`status`を初期化しない。操作/競合のテストケース案と実行結果（または`not_run`）をPRに記載しEへ提出。

**初回PR受入**：親12件以外への操作なし、`checkedItemIds`なし、完了状態+要再確認の共存、保存成功/失敗表示の区別、B/Dのファイル所有を守る。

**今週除外**：本番CAS全接続、U04入力編集（次の[#39](https://github.com/kot5432/vacant-house/issues/39)）、子チェック。

## 6. E担当（品質・レビュー・調査） @kot5432
- **#55**（環境回答）でA〜Dの確認状況を分類し、ブロック時はDと調整。本人からの申告なしにOKを付けない。
- **#51**の共通雛形PRは先に確認。必要な型・ファイル所有の調整を短時間で決める。
- **#34/#36/#38/#40**の初回PRはEが主レビュー。内容によりD/B/Cにも専門レビューを依頼。自分のPR #47〜#56等はA〜Dの別人レビューが必要で、自己マージしない。
- **#43**の公式活動の根拠確認を並行。別人確認未了の実在候補は`visible=0`、0件表示を維持。外部連絡・アンケート配布は別途判断。
- PR提出時に機密ファイル、AI生成差分の理解、ADR-029〜032、エラー処理と未実施テストの明記を確認。**デプロイ・CI・公開を実行しない**。
- PRが期日までに出ない場合、量を半分に分割し、依存調整。期限だから未承認PRを承認した扱いにしない。

## 7. 11/23〜29のチーム進行とPR提出ルール
| 日 | 目安 | 注意 |
|---|---|---|
| 11/23 | #55回答とDの雛形着手、A〜Cは担当コンポーネントの独立準備 | 環境未整備の人へ実機成功を強制しない |
| 11/24〜26 | Dは#51優先、A/B/Cは独立UI、Eはレビュー | Dの雛形がmain未統合なら各自で競合するルート初期化をしない |
| 11/27 | 最初の小PR提出目標 | PR本文にIssue・影響範囲・テスト実績・未完を記す |
| 11/28〜29 | E＋専門担当レビューと修正 | **小PR4件提出**が目標、マージは受入次第 |

**PR本文の必須事項**：関連Issue、何をした/しない、どのADRと画面契約を守ったか、変更した主なファイル、実行したコマンドと結果、実施していない検証（`not_run`）、mock/本物の境界、プライバシー、Eレビュー依頼。PRはDraftでもよいが、未完成と完成待ちを区別する。

**Issue Done条件**：PR提出ではなく、別人レビュー・必要なローカルテストの証拠・未解決コメント解消・mainマージ・受入条件確認まで達成した時。CIやデプロイはDone条件にしない（現在未許可）。

## 8. 確認が必要な残項目
- 全員の環境・初週作業時間は#55で未回答。
- Dの#51環境PRがいつ完成するか。A〜Cは雛形の統合前でも独立コンポーネント/設計で準備可能。
- Dの#40の初週作業量。環境構築を優先し、型はAPI設計共有後に別PR。
- 既存のドキュメントPR #47〜#56の別人レビューとmainへの統合状況（**未統合の資料をmain反映済みと扱わない**）。
- 統合時のB/C共有U03親コンポーネント所有、Node/npm実機互換、公開活動の二人目審査。
- 今後のCIやデプロイの実行許可は別STEPで扱う。

**この文書作成・Issue更新は「指示書の準備」であり、アプリ作成・テスト・実運用の完了ではない。**
