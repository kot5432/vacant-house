> **2026-11-21 設計更新（PR提出用）**：[主役を一人に固定したペルソナ](PRIMARY_PERSONA_AND_SUCCESS_SCENARIO_20261121.md)／[二入口を反映した現行アーキテクチャ](ARCHITECTURE_CURRENT_TWO_ENTRANCES_20261121.md)／[作品部門の応募用資料と証拠一覧](CONTEST_SUBMISSION_EVIDENCE_PACK_20261121.md)。正式ADR-030〜032は変更せず、架空ペルソナを利用者調査の実績と誤認しない。

> **2026-11-19｜開発担当がまず読む最新の作業分割・静的監査**：[12件の機能別作業パッケージ・依存関係・着手ガイド](WORK_PACKAGE_DEPENDENCIES_AND_START_GUIDES_20261119.md)／[JSON Schema・保存境界の静的ギャップ10件](STATIC_VALIDATION_AUDIT_AND_GAP_REGISTER_20261119.md)。計画Issue [#34〜#45](https://github.com/kot5432/vacant-house/issues?q=is%3Aissue+is%3Aopen+%22plan%28%22)を作成し、親Issue #23〜#27と関連付け済み。**未実装・検証not_run・実担当未割当**。

> **まず作業に取りかかるならこちら（2026-11-19）**：[担当・順序・完了条件・期限目安を具体化した実行チェックリスト](ACTION_CHECKLIST_OWNER_DELIVERABLES_20261119.md)。**H01〜H05が最初の本人作業**。実装・テスト・応募はまだ未実施で、予定日はチームで決める提案です。

# 現行MVP正本への入口（2026-11-19横断監査）

> **まずここを参照：** [最新ADRと旧仕様の衝突監査](FINAL_SOURCE_OF_TRUTH_AND_LEGACY_CONFLICT_AUDIT_20261119.md)｜[あなた・チームが行う残作業](HUMAN_ONLY_ACTIONS_AND_FINAL_GATE_20261119.md)｜[競合の一次資料比較と独自性仮説](COMPETITOR_POSITIONING_AND_FALSIFICATION_20261119.md)｜[配布前アンケート・ヒアリングキット](USER_VALIDATION_INTERVIEW_SURVEY_PACK_20261119.md)｜[7画面UX受入シナリオ](MVP_UI_REVIEW_SCENARIOS_AND_RELEASE_MINIMUM_20261119.md)｜[コンテスト応募・動画チェック](CONTEST_DELIVERY_REQUIREMENTS_AND_PROJECT_DECISION_GATES_20261119.md)。
>
> 正式なプロダクト設計は**富山の地域活動に参加/企画する2入口**（ADR-030）で、旧空き家案ではありません。**親タスク12件だけ**（ADR-031）、技術保存仕様（ADR-032）、`input.date`（ADR-029）が正本です。旧資料に残る子チェック・MVPバックアップ不採用・古いA〜D役割分担は採用しません。**実装/実行試験/外部公開は未実施。**

---

> **2026-11-19｜STEP28 高岡の活動一次資料・掲載前レビュー**：[個別活動の出典照合と要レビュー台帳](STEP28_TAKAOKA_VERIFIED_SOURCE_REVIEW_REGISTER_20261119.md)。公式ページの個別日時・費用・申込締切を照合し、**掲載候補4件と期限経過の候補1件**を区別。**公開承認済みの`visible`は0件、最新の残席保証なし**。調査後の別人確認・継続運用・実装・実行テストは未実施。

> **2026-11-19｜実装前の機械可読なバックアップ設計**：[JSON Schema Draft 2020-12](contracts/backup-v1.schema.json)、[検証の注意点と全fixture一覧](contracts/VALIDATION_NOTES.md)、[正常サンプル](contracts/fixtures/valid-one-event.json)、[要再確認の正常サンプル](contracts/fixtures/valid-parent-recheck.json)。A〜Eの開発・品質計画Issue [#23](https://github.com/kot5432/vacant-house/issues/23)／[#24](https://github.com/kot5432/vacant-house/issues/24)／[#25](https://github.com/kot5432/vacant-house/issues/25)／[#26](https://github.com/kot5432/vacant-house/issues/26)／[#27](https://github.com/kot5432/vacant-house/issues/27)。**保存形式の構造と静的サンプルは作成済み、パーサ/テスト実行・アプリ実装・デプロイは未実施。**

> **2026-11-19｜STEP24〜27／保存・開発接続の設計詳細**：[STEP24 JSON検証3層・fixture期待ケース](STEP24_BACKUP_VALIDATION_LAYERS_AND_FIXTURE_SPEC_20261119.md) → [STEP25 TypeScript共有型・Repository署名](STEP25_TYPESCRIPT_DOMAIN_TYPES_AND_REPOSITORY_SIGNATURES_20261119.md) → [STEP26 保存/編集/再確認の状態遷移](STEP26_SAVE_EDIT_RECHECK_STATE_TRANSITIONS_20261119.md) → [STEP27 5人の機能Issue受入・リリースゲート](STEP27_TEAM_TASK_ACCEPTANCE_AND_RELEASE_GATES_20261119.md)。**ADR-032採用値を踏襲。実際のJSON Schemaコード・fixtureファイル・実行試験は未作成/未実施**。本資料は設計の正本としてPR #21に含める。

> **2026-11-19｜技術値の推奨案を正式採用**：[ADR-032｜v1の保存型・再確認8コード・設備4分類・strict JSON検証・機能間API](ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md)。利用者の「技術面は基本おすすめの方向で」を受け、旧STEP11/12/18/19の**未採用技術候補のうちADR-032が明示する項目を初版方針として採用**。詳細な実装ライブラリ/物理Schema/fixtureと別人レビューは未完。**アプリ実装・実行テスト・デプロイの許可ではない。**

> **2026-11-19 STEP18〜23｜実装前仕様の詳細レビュー案**：[保存データ・JSON v1](STEP18_EVENT_RECORD_V1_SCHEMA_DECISION_PACKAGE_20261119.md) → [機能間API・エラー](STEP19_REPOSITORY_AND_SCREEN_API_FAILURE_CONTRACT_20261119.md) → [富山の一次候補と掲載可否](STEP20_TOYAMA_LISTING_RESEARCH_AND_SOURCE_EVIDENCE_CHECKLIST_20261119.md) → [5人のIssue分割・依存](STEP21_ISSUE_BREAKDOWN_AND_HANDOFF_ORDER_20261119.md) → [需要・独自性検証計画](STEP22_DEMAND_DIFFERENTIATION_VALIDATION_PLAN_20261119.md) → [未決事項・開始ゲート](STEP23_READINESS_GATE_AND_OPEN_DECISIONS_20261119.md)。新しい技術リテラルは**提案・レビュー待ち**。実装・実行テスト・デプロイ・外部連絡なし。**mainには設計PRレビュー後に統合**。

> **2026-11-19｜STEP13〜17 設計PR候補（レビュー前・未実装）**：[STEP13 5人の機能間インターフェース](STEP13_CROSS_FEATURE_INTERFACE_CONTRACT_20261119.md) → [STEP14 7画面の状態/異常系](STEP14_SCREEN_BEHAVIOR_AND_ERROR_MATRIX_20261119.md) → [STEP15 富山掲載情報と運用](STEP15_PARTICIPATION_CATALOG_EVIDENCE_WORKFLOW_20261119.md) → [STEP16 機能別Issue・開発依存順](STEP16_TEAM_ISSUE_DEPENDENCY_AND_ACCEPTANCE_PLAN_20261119.md) → [STEP17 最終レビュー/未決台帳](STEP17_PREIMPLEMENTATION_REVIEW_AND_DECISION_REGISTER_20261119.md)。**現行役割はA参加/B主催プラン/C進捗編集/D保存/E地域・品質**。既決ADR-030/031を維持。技術enum・実掲載データ・担当者アサイン・実装許可は未決。**STEP13〜17はPR #19でmainへ反映済み。**

> **2026-11-19 GitHubチーム運用最新版**：[チーム共通Gitルール](../../CONTRIBUTING.md)／[ブランチ名・作成/コミット/PR/マージ/削除の手順](GIT_WORKFLOW_AND_BRANCH_RULES.md)。5人＝4人機能別開発＋Eが地域情報/品質レビュー。**実装・テストは未実施。mainのprotect-main Rulesetは設定済み（実PRでの強制挙動はプラン・権限に依存）**。

> **2026-11-19 STEP12｜実装前の設計整理・個人別役割最新版**：[未確定技術値の推奨案一本化](STEP12_01_FINAL_TECHNICAL_REVIEW_DEFAULTS_20261119.md)、[4人の主担当・相互レビューと引継ぎ](STEP12_02_FOUR_MEMBER_OWNERSHIP_REVIEW_PLAN_20261119.md)、[富山県公式コンテスト応募要項・10分以内動画/AI活用の説明準備](STEP12_03_TOYAMA_CONTEST_SUBMISSION_REQUIREMENTS_20261119.md)。ADR-030/031維持。**再確認enum・設備分類などの新たな技術候補は未承認**。本名/GitHub担当・掲載更新責任・実装開始許可はまだない。コード実装、試験実行、CI、デプロイ、応募・外部連絡なし。

> **2026-11-18 STEP11｜実装前ハンドオフ最新版（設計のみ）**：[親タスクだけのEventRecord/JSON v1必須・任意と厳密検証](STEP11_01_PARENT_ONLY_EVENT_RECORD_BACKUP_CONTRACT_20261118.md)、[再確認8理由コード案・CAS状態遷移](STEP11_02_PARENT_RECHECK_CODE_AND_TRANSITION_CONTRACT_20261118.md)、[参加D00〜02の公開/次の一歩判定契約](STEP11_03_PARTICIPATION_PUBLISHING_AND_NEXT_ACTION_CONTRACT_20261118.md)、[最終の開始ゲート・担当レビュー](STEP11_04_FINAL_PREIMPLEMENTATION_GATE_20261118.md)。**正式ADR-030/031の範囲は確定、機械可読Schema・enumの人間承認/一次活動の掲載審査/実人員割当は未完。実装・テスト実行・CI・デプロイ・外部連絡はなし。**

> **2026-11-18 最新・正式採用**：[ADR-031｜MVPで子チェックを不採用、P01〜P12親進捗のみ](ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)。[保存・JSON・U03画面の差分](STEP10_09_PARENT_ONLY_SAVE_BACKUP_UI_IMPACT_20261118.md)。旧子チェック案24件は**不採用の履歴**。初回v1から`checkedItemIds`を除外し、親status/needsRecheck/CAS、基本6問・優先順位、参加D00〜02を維持。**実装・実行試験・公開なし**。

> **2026-11-18 STEP10 設計候補とレビュー用ケースを追加（未実装）**：[主催P01〜P12の子チェック24件・再確認理由8種・設備4種の**正式採用前の提案**](STEP10_06_PROPOSED_CHILD_IDS_RECHECK_CODES_AND_EQUIPMENT_20261118.md)、[参加16件＋主催12件の受入期待ケース（全件not_run）](STEP10_07_PARTICIPATE_ORGANIZE_ACCEPTANCE_MATRIX_20261118.md)、[4人チームのレビュー引継ぎと確認が必要な残件](STEP10_08_FOUR_PERSON_REVIEW_AND_DECISION_BACKLOG_20261118.md)。GitHub #1/#3/#4/#14〜#17へ参照追記。**ADR-030のMVP範囲以外の技術詳細は別人レビュー前。人員割当・掲載承認・実装/試験/公開なし。**

> **2026-11-18 STEP10追加監査（実装なし）**：[P01〜P12理由コード・子ID・設備カテゴリの区別](STEP10_04_TASK_IDS_AND_REASON_AUDIT_20261118.md)、[参加の情報鮮度・掲載停止と更新担当レビュー手順](STEP10_05_PARTICIPATION_FRESHNESS_AND_EDITORIAL_WORKFLOW_20261118.md)。Issue #1/#14/#17へ反映済み。**既決ADRは維持。詳細enum・子ID、二人目レビュー、掲載/実装は未完了。**

> **2026-11-18 STEP10 実装前の残件整理**：[参加の募集鮮度・根拠状態と主催JSON/子IDの横断レビュー](STEP10_02_CROSS_MODULE_CONTRACT_REVIEW_20261118.md)、[実装前ゲートとレビュー順](STEP10_03_PREIMPLEMENTATION_GATE_AND_REVIEW_ORDER_20261118.md)。Issue #1/#14/#15/#16/#17 に参照を追加。**ADR-030のMVP範囲は採用済み、個別enum・募集の期限・主催の完全な子IDはレビュー待ち。実装・テスト・CI・公開・外部連絡なし**。

> **2026-11-18 最新MVPの正式採用**：[ADR-030｜富山の「参加D00〜D02＋企画U01〜U04」二入口を採用](ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md)。[参加カタログの詳細な掲載・更新設計](STEP10_PARTICIPATION_CATALOG_PUBLICATION_RULES_V03.md)は**技術レビュー前の案**。下記の「参加案は未採用」はADR-030採用前の記録として読み替える。既存ADR-001〜029、主催の基本6問・P01〜P12・JSON v1は不変。**実装・テスト・CI・デプロイ・外部連絡なし**。

> **2026-11-18 参加＋企画MVPの実装直前設計（未採用・コードなし）**：[画面・データ・判定・運用・受入の詳細](TOYAMA_PARTICIPATE_ORGANIZE_IMPLEMENTATION_HANDOFF_V02_20261118.md)、[高岡の一次資料候補と掲載審査台帳](TOYAMA_PARTICIPATION_PRIMARY_SOURCE_CANDIDATES_20261118.md)。設計Issue [#14〜#17](https://github.com/kot5432/vacant-house/issues)を追加。**主催側ADR-001〜029・U01〜U04は未変更。参加機能の正式採用／情報の二人目レビュー／実装許可は未了。**

> **2026-11-18 新MVP拡張案（採用前・実装なし）**：[富山特化「参加する・企画する」MVP設計](TOYAMA_PARTICIPATE_ORGANIZE_MVP_PROPOSAL_20261118.md)。既存U01〜U04/基本6問/P01〜P12の既決ADRは**不変**。参加D00〜D02、公開情報の出典/鮮度/未確認の区別、公式外部導線、機能除外、受入ケースを設計。**未承認の提案であり既存実装Issue・正式ADRは変更していない**。

> **2026-11-18 実装以外の準備を追加**：[入力/保存型・ID監査](PREIMPLEMENTATION_INPUT_AND_ID_AUDIT_20261118.md)、[全12タスク×架空5シナリオ／保存・復元の受入ケース](PREIMPLEMENTATION_FIXED_ACCEPTANCE_VECTORS_20261118.md)、[4人AI開発の運用手順とキックオフ](FOUR_PERSON_AI_TEAM_OPERATING_GUIDE_20261118.md)。GitHub設計Issue #1/#2/#3/#4に参照追記。**設計提案であり別人レビュー・厳密schema凍結・Project作成は未完、実装/試験/CI/公開/外部連絡なし**。

> **2026-11-18 GitHub登録状況**：[実際のIssue #1〜#13とProject未設定の一覧](GITHUB_EXECUTION_BOARD_20261118.md)。設計5件・実装待ち8件を起票し、[技術値の一本化案](PREIMPLEMENTATION_TECHNICAL_FREEZE_CANDIDATES_20261118.md)と`.github`のIssue/PRテンプレートを作成。**Project/ラベル/担当アサインは未設定、実装・テスト実行・CI・デプロイなし**。

> **2026-11-18 実装直前の設計レビュー（コード作成なし）**：[共通データ契約レビュー](PREIMPLEMENTATION_SHARED_DATA_CONTRACT_REVIEW.md)、[U01〜U04サービス・エラー境界](PREIMPLEMENTATION_UI_SERVICES_AND_ERROR_CONTRACT.md)、[GitHub Issue分割・4人レビュー・開始ゲート](PREIMPLEMENTATION_GITHUB_ISSUE_READY_PLAN.md)。**設計済みと正式採用済みを区別**。未確定の厳密JSONフィールド／技術値・個人割当・実装許可は別途確認が必要。実装・CI・実行試験・デプロイ・外部連絡なし。

> **2026-11-18 機能・開発単位の設計案**：[4人AI開発向け｜機能構成・フォルダ責任・Issue分割案](FEATURE_MODULES_AND_GITHUB_ISSUES_PLAN.md)。F0〜F7の責務、予定フォルダ、16件の仮Issue、最初の縦断導線、PRレビューと完了条件を整理。**GitHub Issue・コード・テスト実行・デプロイは未作成／未実施**。

> **2026-11-17 最新の開発前決定**：ユーザーがJSON初期識別子A案、複数施設比較B案、AIコーディング中心の4人開発を指定。正式決定は[ADR-029](ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md)、机上施設比較は[4施設比較](PREDEV_MULTI_FACILITY_COMPARISON_20261117.md)、開発の仮役割とPR運用は[4人AI開発計画](PREDEV_FOUR_PERSON_AI_DEVELOPMENT_PLAN_20261117.md)。以前の「JSON版・formatId未採用／施設1件／人数未確定」は**過去時点の記録**。実装・実行試験・デプロイ・施設照会はなし。

> **2026-11-17 開発前準備（アンケート以外）**：[JSON初期形式の推奨セット・高岡市公式出典再閲覧・3人以上の仮役割と工程](PREDEV_NON_SURVEY_ACTIONS_20261117.md)。新規ADR未採用、個別施設照会なし、実装・実行試験・デプロイなし。

> **2026-11-16 最新の棚卸し**：[STEP8-㉒｜設計済み・ユーザー判断待ち・実証待ちの総一覧](STEP8_22_FINAL_DECISION_AND_EVIDENCE_BACKLOG.md)。これを直近の作業状態の入口とし、以下に残る過去時点の「未決」「旧版」表現より採用済みのADR-001〜028と後続STEP8を優先してください。**実装・試験実行・公開なし**。

# 現行設計 v3.1 — 初めての地域イベント開催準備ガイド（仮称）
更新：2026-11-13（STEP1・STEP2方針とSTEP3-①〜⑭の採用事項を整理、⑮詳細設計中）。**設計・公開資料の机上調査のみ／未実装／利用者の需要は未検証。**

> **現行仕様の唯一の入口です。** docs/直下の旧v1/v2資料と `PROJECT_CONCEPT.md` の過去章、v3.0の内容を現行仕様に混ぜないでください。**v3.1が現在の最新版**です。v3.0との差分はGit履歴に保存されています。

## 設計成果物の作成方針（2026-11-14追記）

**[現行プロダクトの境界・設計成果物ロードマップ](DESIGN_DELIVERABLES_ROADMAP.md)** に、STEP4-⑥の生成後進捗更新B案、旧空き家案との分離、最終的に作る9つの設計資料、技術選定・アーキテクチャの決定タイミングを記録。**後続のSTEP4-⑨・⑫で、進捗のブラウザ保存・後日再開・複数イベント対応を採用済み**。古いSTEP3の「継続管理なし」は更新されています。P01〜P12の詳細判定契約は引き続き最終レビュー対象です。

## STEP4-⑫の最新MVP範囲（2026-11-14）

**[MVP要件定義 v0.1・複数イベント保存と持ち帰りの範囲](STEP4_12_MVP_REQUIREMENTS_V01.md)** を参照してください。後続決定により、旧STEP3-①の「1回限り・継続進捗管理なし」は更新され、**生成後の進捗管理・ブラウザ保存・同じブラウザでの後日再開・複数イベント保存**が現行MVPに含まれます。ファイル出力／インポート・PDFは初期MVP外。技術スタックの採用は後続のADR-001で確定しましたが、実装・検証は未完了です。旧空き家案は引き継ぎません。

## STEP5の最新画面設計（2026-11-14）

**[STEP5 画面設計 v0.1](STEP5_SCREEN_DESIGN_V01.md)** が現行の画面フロー・操作状態の設計案です。古い `STEP5_USER_EXPERIENCE.md` と `USER_FLOW.md` の「困りごと入力・相談文コピー」導線はMVPに採用しません。保存済みの複数イベントを後日再開できる画面を採用方針とし、詳しいレイアウトは今後確定します。

## STEP5-② U01/U02詳細ワイヤーフレーム（2026-11-14）

[ホーム／基本入力の画面構成・操作仕様](STEP5_02_HOME_SETUP_WIREFRAMES.md)。4画面の現行MVPを前提に、基本6問の3ステップ配置・条件付き施設質問・保存／削除／エラー状態を文章で具体化。**設計案でありUI実装・ユーザーテスト未実施**。旧空き家案は対象外。

## STEP5-③ 中心画面U03の詳細設計（2026-11-15）

[準備プラン画面の情報階層・タスク展開・進捗と再確認・保存失敗の設計](STEP5_03_PREPARATION_PLAN_UI.md)。**旧空き家案や旧「困りごと→相談文」フローではなく**現行MVPの4領域P01〜P12を対象とする。設計案のため実装・操作テストは未実施。

## STEP5-④ 編集・保存・競合・削除の詳細UI（2026-11-15）

[U04イベント編集と保存・競合・削除の操作仕様](STEP5_04_EDIT_SAVE_ERROR_UI.md) を追加しました。**U03の進捗変更は自動保存、U04の変更は「反映する」操作で確定保存**と分けます。未保存の編集差分・既存データ・保存成功を混同しない設計案です。旧空き家案とは無関係で、実装・検証は未実施です。

## 2026-11-15 設計書の現行入口（採用事項と提案を区別）

- [STEP5-⑤ UI未決事項と推奨仕様](STEP5_05_UI_DECISIONS.md) — 初回入力の下書き、進捗率、タスク開閉、表示トークンの**提案**。
- [要件定義 v1 草案](REQUIREMENTS_V1_DRAFT.md) — FR／NFR／受け入れ条件の統合。**未承認・未実装**。
- [技術選定書 v1 提案](TECH_SELECTION_V1_PROPOSAL.md) — 採用前の比較資料。Cloudflare Pages案は正式採用されていません。
- [アーキテクチャ・データ設計 v1 提案](ARCHITECTURE_DATA_V1_PROPOSAL.md) — 正式採用前の構成草案。最新の技術に沿う設計は[アーキテクチャv1](ARCHITECTURE_V1.md)。
- [テスト設計 v1 草案](TEST_PLAN_V1_DRAFT.md) — 判定・ブラウザDB・UI・異常系の期待結果。**テスト未実施**。

この一覧は最新の設計資料へのリンクです。旧 `STEP5_USER_EXPERIENCE.md`、`USER_FLOW.md`、旧空き家案、旧STEP3の保存なし説明を優先しないでください。**コード開発、動作テスト、公開は行っていません。**

## 技術比較・Vercel候補（2026-11-15）

[技術スタック比較 B案：React/Vite、Next.js、Vue、Svelte、Vercel](TECH_STACK_COMPARISON_VERCEL.md) を追加しました。**後続の採用決定によりVercel、React + TypeScript + Vite、IndexedDB + Dexieを正式採用済み**です。旧Cloudflare候補資料は比較の履歴です。コード・デプロイ・実際のテストは未実施です。

## 最新の技術決定・実装前設計（2026-11-15）

**技術スタックはユーザーが正式採用**：**React + TypeScript + Vite／IndexedDB + Dexie／Vercel**。ログイン・クラウドDB・共同編集はMVP外。関連する正本／設計書：

1. [ADR-001 技術選定の正式決定](ADR_001_TECH_STACK_ADOPTED.md) — **技術スタックの最新正本**。旧Cloudflare候補は不採用。
2. [P01〜P12の判定エンジン契約 v1](RULE_ENGINE_CONTRACT_V1.md) — 該当性／優先度／完了＋再確認／出典条件を統合。**細かなルールは最終承認前**。
3. [データ設計 v1](DATA_DESIGN_V1.md) — Dexie/IndexedDB、イベントID、revision、保存・復元・移行・削除。**実装前の草案**。
4. [アーキテクチャ設計 v1](ARCHITECTURE_V1.md) — Vercelの静的配信＋ブラウザ内データ、各レイヤの責務。
5. [テスト設計 v1](TEST_PLAN_V1_DRAFT.md) — 採用技術と失敗・競合・判定のテストマトリクス。**テスト未実施**。
6. [開発・運用計画 v1](DEVELOPMENT_OPERATIONS_PLAN_V1.md) — AIコーディング／人のレビュー／フェーズ／Vercel公開前のゲート。

**過去資料との関係：** [TECH_SELECTION_V1_PROPOSAL.md](TECH_SELECTION_V1_PROPOSAL.md)、[TECH_STACK_COMPARISON_VERCEL.md](TECH_STACK_COMPARISON_VERCEL.md)、[ARCHITECTURE_DATA_V1_PROPOSAL.md](ARCHITECTURE_DATA_V1_PROPOSAL.md) は正式採用前の比較・草案。最新の技術決定とは区別する。旧STEP3の「後日保存なし」も後続決定で更新済み。

**現状：設計のみ。アプリ本体、依存インストール、CI、動作テスト、Vercel接続・公開、利用者調査はいずれも未実施。** 旧空き家の所有者・物件・マッチング・6用途診断の仕様は引き継がない。

## 2026-11-15 最新の下書き保存決定とオンライン範囲の検討

- **正式採用**：[STEP5-⑤ UI仕様](STEP5_05_UI_DECISIONS.md)の「U02初回入力の下書きは永続保存しない」（A案）。基本6問の入力中は画面内保持、初回プラン生成で保存成功後U03へ。生成済みイベントは従来どおりブラウザ内保存・再開可能。
- **判定ルール詳細案**：[P01〜P12のルール条件と再確認の表 v1.1](STEP4_RULE_DECISION_TABLE_V11.md)。優先細則とオンラインの適用は一部承認前。「開催14日前」は正式ルールではない。
- **要確認**：[オンライン／物理会場なしのMVP対応範囲比較](ONLINE_SCOPE_OPTIONS_V1.md)。A：物理会場開催に限定、B：物理会場なしも一般準備まで限定支援（推奨）、C：オンライン専用まで詳細支援。**利用者選択待ち**。
- **引き続き正式採用**：React + TypeScript + Vite、IndexedDB + Dexie、Vercel。[ADR-001](ADR_001_TECH_STACK_ADOPTED.md)。
- **実装、テスト、デプロイ、利用者検証は実施していない**。旧空き家所有者向け・物件マッチング案と混同しない。

## 2026-11-15 最新のMVP判定範囲（正式採用・レビュー待ちの区別）

- **正式採用**：[ADR-002 物理会場なしの限定支援B案](ADR_002_NO_PHYSICAL_VENUE_SCOPE.md)。基本6問は維持。「物理会場なし＝オンライン」と断定せず、P07〜P09の建物専用の子項目のみ非該当、親は場所／手続き／環境の一般確認を残す。屋外・オンライン特有の手続きを自動判定しない。
- **最終レビュー草案**：[P01〜P12の判定詳細・優先度・再確認v1.2](STEP4_RULE_REVIEW_V12.md)。P05の一般安全確認P2/P3基準、同優先度の代表順、P08の一般確認P2基準は**未承認**。
- [判定ルール統合契約](RULE_ENGINE_CONTRACT_V1.md)、[データ設計](DATA_DESIGN_V1.md)、[テスト設計](TEST_PLAN_V1_DRAFT.md)、[U02画面設計](STEP5_02_HOME_SETUP_WIREFRAMES.md)にも採用範囲を反映。旧オンライン比較資料は[履歴](ONLINE_SCOPE_OPTIONS_V1.md)。
- **実装・自動テスト・公開なし**。旧空き家案の機能や物件データは使用しない。

## 2026-11-15 優先順位の細則A案（正式採用）

- **正式採用**：[ADR-003 P05/P08と同順位の判定](ADR_003_PRIORITY_RULES_ADOPTED.md)。P05一般安全確認は参加対象`adults`/`undecided`なら**P2**、`minors`/`both`なら**P1**。物理会場なしのP08一般利用条件確認は**P2**。
- **同優先度の順**：P1→P2→P3、同順位は**タスクIDの数字昇順（P01〜P12）**。旧「P08→P05→…」の特別順は採用しない。複数P1は代表以外も表示。
- [判定契約](RULE_ENGINE_CONTRACT_V1.md)、[詳細判定表](STEP4_RULE_DECISION_TABLE_V11.md)、[判定レビューv1.2](STEP4_RULE_REVIEW_V12.md)、[テスト設計](TEST_PLAN_V1_DRAFT.md)を更新。**その他の詳細条件は引き続き設計草案**。
- 技術はReact + TypeScript + Vite / IndexedDB + Dexie / Vercel採用。**アプリ実装・テスト実行・デプロイは未実施**。旧空き家案と混同しない。

## STEP6｜進捗の再確認・入力バリデーション（2026-11-15、実装前の推奨仕様）

- [STEP6-① 進捗・対象外・再確認解除の操作仕様](STEP6_01_PROGRESS_RECHECK_SPEC.md)：本人の「対象外」と条件による「非該当」の区別、完了履歴維持、明示的な再確認解除、保存失敗・競合の扱い。**新しい操作の詳細は承認前**。
- [STEP6-② 基本6問・任意項目・保存データの検証仕様](STEP6_02_VALIDATION_CONTRACT.md)：未回答と未定、日付・人数・条件付き施設・ランタイムデータ検証。**人数上限、過去日、文字数等は提案段階**。
- [判定契約](RULE_ENGINE_CONTRACT_V1.md)、[データ設計](DATA_DESIGN_V1.md)、[テスト設計](TEST_PLAN_V1_DRAFT.md)、[U04画面設計](STEP5_04_EDIT_SAVE_ERROR_UI.md)へ参照を反映。
- **優先順位は[ADR-003](ADR_003_PRIORITY_RULES_ADOPTED.md)で正式決定済み**。初回入力下書き非保存A案、物理会場なし限定支援B案、React/TypeScript/Vite + IndexedDB/Dexie + Vercelも維持。
- **設計のみ**。アプリ本体のコード、実行テスト、Vercel公開は行っていない。旧空き家関連の所有者・物件・マッチング機能を引き継がない。

## STEP6 再確認解除A案正式採用・次の入力データ判断（2026-11-15）

- **正式決定**：[ADR-004 「再確認を終えた」の明示操作](ADR_004_EXPLICIT_RECHECK_CLEAR.md)。状態`needsRecheck`は本人の明示操作＋IndexedDB保存成功後のみ解除。本人の進捗`completed`/`not_applicable`等は保持。旧空き家案と混同しない。
- **確定仕様反映**：[STEP6-① 進捗・再確認UI](STEP6_01_PROGRESS_RECHECK_SPEC.md)、[データ設計](DATA_DESIGN_V1.md)、[判定契約](RULE_ENGINE_CONTRACT_V1.md)、[U03](STEP5_03_PREPARATION_PLAN_UI.md)、[テスト設計](TEST_PLAN_V1_DRAFT.md)。**テスト未実施**。
- **入力バリデーション草案**：[STEP6-②](STEP6_02_VALIDATION_CONTRACT.md)で基本6問・任意回答・日付・人数・保存データの検証を整理。未承認の上限値はまだ固定しない。
- **次の重要判断**：[STEP6-③ 非該当の施設固有入力の保持A／確定時削除B](STEP6_03_INACTIVE_FACILITY_DATA_OPTIONS.md)。B案推奨、**未決**。現在の条件から外れた施設固有回答は、いずれの案でも判定・公式案内に使わない。
- **設計のみ**：React+TypeScript+Vite / IndexedDB+Dexie / Vercel正式採用済みだが、アプリ実装、依存導入、動作テスト、公開は未実施。

## 2026-11-15 STEP6｜施設固有入力の削除B案（正式採用）と次の設計判断

- **正式採用：[ADR-005 非該当となった施設固有入力の削除B案](ADR_005_CLEAR_INAPPLICABLE_FACILITY_INPUT.md)**。U04で地域／会場条件が変わり旧施設固有の回答が非該当になる場合、**「変更を反映する」による保存成功時だけ**旧施設カテゴリ・センター利用者構成・該当する施設名メモをクリア。キャンセル／保存失敗／revision競合では保存済みデータを変更しない。以前の本人進捗や他イベントは保持する。
- [データ設計](DATA_DESIGN_V1.md)・[U04編集](STEP5_04_EDIT_SAVE_ERROR_UI.md)・[判定契約](RULE_ENGINE_CONTRACT_V1.md)・[入力検証](STEP6_02_VALIDATION_CONTRACT.md)・[テスト設計](TEST_PLAN_V1_DRAFT.md)に反映済み。[STEP6-③](STEP6_03_INACTIVE_FACILITY_DATA_OPTIONS.md)は決定前の比較履歴。
- **公式情報の更新運用草案**：[出典台帳・版管理・誤案内停止](OFFICIAL_SOURCES_OPERATIONS_V1.md)。高岡市の最新公式文書自体は**今回未確認**、利用案内の事実は公開前に実地検証する。
- **次の入力設計確認**：[STEP6-④ 過去日許容・人数上限・メモ文字数の比較](STEP6_04_VALIDATION_REMAINING_OPTIONS.md)。過去日を警告で許容するA案を推奨するが**利用者の判断待ち**。人数上限・テキスト長・出典の更新頻度も未承認。
- **実装・テスト実行・Vercelデプロイなし**。現行の地域イベント準備支援アプリのみ対象とし、旧空き家所有者・物件マッチング案は引き継がない。

## 2026-11-15 STEP6｜過去の開催日A案採用・入力上限／公式出典の運用比較

- **正式採用**：[ADR-006 過去日・過去月を警告付きで許容](ADR_006_ALLOW_PAST_SCHEDULE.md)。当日・当月は過去扱いしない。実在日を検証し、月を月初日に補完せず、過去だから法定期限超過や開催済みとは判定しない。
- [入力検証](STEP6_02_VALIDATION_CONTRACT.md)、[データ設計](DATA_DESIGN_V1.md)、[U04](STEP5_04_EDIT_SAVE_ERROR_UI.md)、[テスト設計](TEST_PLAN_V1_DRAFT.md)に境界条件を反映。日付についてテスト期待値を追加したが**実行は未実施**。
- **次の未決**：[STEP6-⑤ 参加人数の上限と任意テキスト文字数の比較](STEP6_05_COUNT_TEXT_LIMIT_OPTIONS.md)。人数を1以上の安全整数とする最低条件は維持。1,000人の注意しきい値、施設名100字・イベント説明500字は**提案であり未採用**。
- **公式出典運用の提案**：[出典台帳](OFFICIAL_SOURCES_OPERATIONS_V1.md)・[役割／点検頻度／誤案内停止](OFFICIAL_SOURCES_REVIEW_CADENCE_PROPOSAL.md)。各リリース前の確認と月次点検は提案段階。実際の高岡市公式資料の最新内容は今回確認していない。
- 技術は[ADR-001](ADR_001_TECH_STACK_ADOPTED.md)でReact/TypeScript/Vite・IndexedDB/Dexie・Vercel正式採用済み。旧空き家所有者・物件関連機能を混同しない。**設計のみ・実装／テスト／公開なし**。

## 2026-11-15｜人数B案の正式採用と文字数・公式情報の残件

- **正式決定**：[ADR-007 参加予定人数B案](ADR_007_ATTENDEE_COUNT_WARNING.md)。任意人数は1以上の安全整数を受理し、**1,001人以上でも警告のみで保存可能**。1,000は法令等の定義でなく製品内の注意閾値。未回答／未定も有効。
- [入力バリデーション](STEP6_02_VALIDATION_CONTRACT.md)、[データ設計](DATA_DESIGN_V1.md)、[U04](STEP5_04_EDIT_SAVE_ERROR_UI.md)、[テスト設計](TEST_PLAN_V1_DRAFT.md)を更新。期待値を定義したのみで**テスト未実行**。
- **文字数の判断待ち**：[STEP6-⑥ 施設名メモ・イベント説明の上限とUnicode単位](STEP6_06_TEXT_LENGTH_DESIGN_OPTIONS.md)。施設名100字／説明500字案を推奨するが**正式採用前**。日本語入力中の強制切断を避ける設計。
- **公式情報の運用はまだ提案**：[点検担当・頻度](OFFICIAL_SOURCES_REVIEW_CADENCE_PROPOSAL.md)、[出典の状態遷移・公開停止と再開](OFFICIAL_SOURCES_STATUS_TRANSITIONS_V1.md)。月1回＋リリース前の点検は利用者承認待ち。**高岡市公式資料の最新内容を今回照合した事実はない**。
- **技術**：React＋TypeScript＋Vite、IndexedDB＋Dexie、Vercel採用済み。旧空き家案の所有者・物件・マッチングと混同しない。**実装・デプロイは行っていない**。

## 2026-11-15｜任意テキスト100/500字の採用・公式情報の更新頻度の判断

- **正式採用**：[ADR-008 任意メモの文字数制限A案](ADR_008_OPTIONAL_TEXT_LIMITS.md)：施設名メモ100字、イベント説明500字。空欄可・超過時は保存エラー。IME変換中に強制切断しない。文字数カウンターと保存前検証を一致させる。Unicode書記素によるカウントは技術第一候補で、対応ブラウザと長い単一書記素の安全策は実装前の検証事項。
- [入力検証](STEP6_02_VALIDATION_CONTRACT.md)、[データ設計](DATA_DESIGN_V1.md)、[U04編集](STEP5_04_EDIT_SAVE_ERROR_UI.md)、[テスト計画](TEST_PLAN_V1_DRAFT.md)を更新。[STEP6-⑥比較](STEP6_06_TEXT_LENGTH_DESIGN_OPTIONS.md)は採用前の比較履歴。
- **次の運用判断**：[STEP6-⑦ 公式出典更新頻度のA/B/C比較](STEP6_07_OFFICIAL_SOURCE_CADENCE_OPTIONS.md)。A案：月1回＋各リリース前（推奨）、B案：3か月ごと＋各リリース前、C案：各リリース前のみ。**未承認**。
- [公式情報更新運用](OFFICIAL_SOURCES_OPERATIONS_V1.md)、[担当・点検フロー](OFFICIAL_SOURCES_REVIEW_CADENCE_PROPOSAL.md)、[状態遷移](OFFICIAL_SOURCES_STATUS_TRANSITIONS_V1.md)は設計案であり、**最新の高岡市公式原資料を今回実地確認したわけではない**。
- 現行イベント準備支援Webアプリ専用。旧空き家案の所有者、物件、マッチングに関する機能を再導入しない。**実装／動作テスト／Vercel公開は未実施**。

## 2026-11-15｜公式情報の更新頻度A案（ADR-009）正式採用とSTEP7の残件

- **正式採用**：[ADR-009 公式情報の月次点検＋本番毎リリース前点検](ADR_009_OFFICIAL_SOURCE_MONTHLY_RELEASE_REVIEWS.md)。新規掲載前にも原ページを確認。変更・誤案内が判明したときは周期を待たず施設固有の断定を停止する。
- [公式情報の運用](OFFICIAL_SOURCES_OPERATIONS_V1.md)、[状態遷移](OFFICIAL_SOURCES_STATUS_TRANSITIONS_V1.md)、[更新担当と点検記録](OFFICIAL_SOURCES_REVIEW_CADENCE_PROPOSAL.md)、[テスト設計](TEST_PLAN_V1_DRAFT.md)、[開発運用計画](DEVELOPMENT_OPERATIONS_PLAN_V1.md)に反映した。[STEP6-⑦のA/B/C比較](STEP6_07_OFFICIAL_SOURCE_CADENCE_OPTIONS.md)は採用前の履歴。
- **現行の正式採用／未承認／公開前作業の全体整理**：[STEP7 実装前残件レビュー](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)。
- **次に利用者判断が必要**：[STEP7-① 月次点検が遅れた場合の施設固有表示の扱い](STEP7_01_STALE_OFFICIAL_INFO_POLICY_OPTIONS.md)。推奨Aは期限超過時に一般確認へ切替。**未採用**。
- [既存の高岡市出典台帳](OFFICIAL_SOURCE_REGISTER.md)には**2026-11-12に公式ページを机上閲覧した記録**がある。今回の作業では最新情報を再確認していない。過去の閲覧履歴と、最新の原ページ照合実施を混同しない。
- 現行の単発・小規模地域イベント主催者向け準備支援Webアプリのみ。旧空き家所有者、物件診断、物件マッチングの要件は混入させない。**実装・テスト実行・Vercelデプロイは未実施**。

## 2026-11-15｜月次点検期限超過時の表示停止（ADR-010正式採用）

- **正式採用**：[ADR-010 公式出典の期限超過時は猶予なく施設固有の断定を停止](ADR_010_STALE_SOURCE_FAIL_CLOSED.md)。一般的なP01〜P12の準備プランは引き続き利用可能。原資料確認・必要なレビューが済んだ出典のみ再掲。本人の進捗`completed/not_applicable`と出典の`needs_review`は別の状態。
- [公式出典運用](OFFICIAL_SOURCES_OPERATIONS_V1.md)・[状態遷移](OFFICIAL_SOURCES_STATUS_TRANSITIONS_V1.md)・[U03準備プラン](STEP5_03_PREPARATION_PLAN_UI.md)・[テスト設計](TEST_PLAN_V1_DRAFT.md)・[開発運用計画](DEVELOPMENT_OPERATIONS_PLAN_V1.md)を更新。[STEP7-①](STEP7_01_STALE_OFFICIAL_INFO_POLICY_OPTIONS.md)は決定前の比較履歴。
- **次の正式判断待ち**：[STEP7-② 月次点検の具体期限の比較](STEP7_02_SOURCE_REVIEW_DUE_DATE_OPTIONS.md)（月末／毎月指定日／直近確認から30日）。**月末を推奨するが未承認**。
- **技術設計案**：[STEP7-③ 出典の有効状態と本人進捗の分離](STEP7_03_SOURCE_EFFECTIVE_STATUS_CONTRACT.md)。公開中の古いタブの即時更新は保証しない。
- [STEP7実装前残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)で正式採用ADR-001〜010と実装前の課題を整理。現行の地域イベント準備支援アプリのみを対象とし、旧空き家所有者診断・物件登録・マッチングを再導入しない。**実装・テスト実行・Vercel公開は未実施**。

## 2026-11-15｜公式情報の月末締切ADR-011と配信方式の判断

- **正式採用**：[ADR-011 日本時間の各月末日を月次点検期限とする](ADR_011_MONTH_END_SOURCE_REVIEW_DEADLINE.md)。その月の点検と必要なレビューが未完了のまま翌月1日00:00 JSTとなった場合、[ADR-010](ADR_010_STALE_SOURCE_FAIL_CLOSED.md)に従い**対象施設の断定案内を猶予なく停止**。一般の準備プランと本人の保存進捗は保持。
- [出典状態と進捗の分離](STEP7_03_SOURCE_EFFECTIVE_STATUS_CONTRACT.md)、[データ設計](DATA_DESIGN_V1.md)、[U03](STEP5_03_PREPARATION_PLAN_UI.md)、[公式出典運用](OFFICIAL_SOURCES_OPERATIONS_V1.md)、[テスト](TEST_PLAN_V1_DRAFT.md)、[開発・運用計画](DEVELOPMENT_OPERATIONS_PLAN_V1.md)に反映。[STEP7-②](STEP7_02_SOURCE_REVIEW_DUE_DATE_OPTIONS.md)は決定前の比較履歴。
- **次の未決**：[STEP7-④ 出典の配信・更新方式](STEP7_04_SOURCE_UPDATE_DELIVERY_OPTIONS.md)。**A案：静的ビルドに同梱して更新版読込で復帰**を推奨するが、まだ正式採用していない。古いタブへの即時反映は保証できない。
- [STEP7残件一覧](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)はADR-001〜011の採用と未決を区別。現行地域イベント準備支援アプリのみ対象、旧空き家案の要件を混入しない。**実装・動作テスト・Vercel公開は未実施**。

## 2026-11-15｜出典カタログを静的ビルドに同梱（ADR-012正式採用）

- **正式決定**：[ADR-012 公式出典カタログはVite静的アプリへ同梱](ADR_012_BUNDLED_OFFICIAL_SOURCE_CATALOG.md)。毎月点検・各リリース前確認・JST月末失効はADR-009〜011に従う。期限切れの施設固有断定は停止し、**再確認後の再掲載は新しいアプリ版の読み込み時のみ**。
- [アーキテクチャ](ARCHITECTURE_V1.md)、[データモデル](DATA_DESIGN_V1.md)、[出典有効状態](STEP7_03_SOURCE_EFFECTIVE_STATUS_CONTRACT.md)、[U03](STEP5_03_PREPARATION_PLAN_UI.md)、[公式出典運用](OFFICIAL_SOURCES_OPERATIONS_V1.md)、[テスト](TEST_PLAN_V1_DRAFT.md)、[開発運用](DEVELOPMENT_OPERATIONS_PLAN_V1.md)へ反映。[STEP7-④](STEP7_04_SOURCE_UPDATE_DELIVERY_OPTIONS.md)は以前の比較履歴。
- **次の重要判断は[STEP7-⑤ 旧タブの新ビルド検知と再読込方法](STEP7_05_OLD_TAB_UPDATE_CHOICES.md)**。軽量なビルド識別子だけ自動確認し、更新の読み込みは本人の操作にするA案を推奨。**未決**。
- [STEP7実装前残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)をADR-001〜012まで更新。未決：P01〜P12の細条件／データ移行／Unicode計数の技術仕様／公式原ページの最新照合／担当割当。現行の地域イベント準備支援Webアプリのみ、旧空き家案の物件・所有者・マッチングを混同しない。**実装・動作テスト・公開なし**。

## 2026-11-15｜旧タブの自動新版確認＋本人操作による再読み込み（ADR-013）

- **正式決定**：[ADR-013 軽量buildIdの自動照合・本人による再読込](ADR_013_MANUAL_REFRESH_ON_AUTO_VERSION_DETECTION.md)。新しいアプリ版を照合できたときだけ知らせ、**U02初回入力・U04未保存編集・U03保存中の進捗を強制リロードで消さない**。公式出典本文は静的ビルド同梱のまま（ADR-012）。
- [アーキテクチャ](ARCHITECTURE_V1.md)、[U01/U02](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[U03](STEP5_03_PREPARATION_PLAN_UI.md)、[U04](STEP5_04_EDIT_SAVE_ERROR_UI.md)、[テスト](TEST_PLAN_V1_DRAFT.md)、[開発運用](DEVELOPMENT_OPERATIONS_PLAN_V1.md)へ反映。[STEP7-⑤](STEP7_05_OLD_TAB_UPDATE_CHOICES.md)は決定前の比較履歴。
- **残る技術設計**：[STEP7-⑥ 旧タブとDBスキーマの保護](STEP7_06_SCHEMA_AND_OLD_TAB_SAFETY_REVIEW.md)。保存形式・schemaVersion・ルール版・出典版の混同を防ぐ仕様を追加レビュー中。
- **次の確認**：[STEP7-⑦ 対応ブラウザの範囲](STEP7_07_BROWSER_SUPPORT_OPTIONS.md)。スマホとPCの現行主要ブラウザを試験対象とするA案を推奨するが未承認。
- [STEP7残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)をADR-001〜013に更新。現行イベント開催準備支援Webアプリのみ。旧空き家物件登録・所有者診断・マッチングは含めない。**アプリコード・実行テスト・公開は未着手**。

## 2026-11-15｜PC・スマホ主要ブラウザA案正式採用（ADR-014）

- **正式決定**：[ADR-014 主要Chrome・Edge・Safari・Firefox現行版をPC／スマホで検証](ADR_014_MAJOR_DESKTOP_MOBILE_BROWSER_SUPPORT.md)。検証対象の決定であり、まだ動作確認・具体的な最低版の確定はしていない。
- [アーキテクチャ](ARCHITECTURE_V1.md)、[入力バリデーション](STEP6_02_VALIDATION_CONTRACT.md)、[データ設計](DATA_DESIGN_V1.md)、[U02](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[U04](STEP5_04_EDIT_SAVE_ERROR_UI.md)、[テスト計画](TEST_PLAN_V1_DRAFT.md)、[開発運用](DEVELOPMENT_OPERATIONS_PLAN_V1.md)へ反映。Unicode書記素（Intl.Segmenter）を技術第一候補に、IMEのcompositionイベント、IndexedDB保存の失敗と別タブ競合、buildIdの手動更新などを検証。
- **技術検証計画**：[STEP7-⑧ ブラウザ別試験行列](STEP7_08_BROWSER_COMPATIBILITY_TEST_MATRIX.md)。**未実施**。出典期限切れと更新通知、IME、書記素、ブラウザ保存データの一貫性をテストする。
- **次の利用者判断**：[STEP7-⑨ 保存データのバックアップ範囲](STEP7_09_BACKUP_SCOPE_OPTIONS.md)。A：エクスポート・インポート／B：エクスポートのみ／C：MVPでは機能なし。推奨Aだが**未承認**。
- [STEP7残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)はADR-001〜014まで更新。現行の地域イベント準備支援アプリのみ扱い、旧空き家の物件・所有者・マッチング機能を引き継がない。**実装・テスト実行・デプロイは一切行っていない**。

## 2026-11-15｜JSONバックアップの書き出し・復元をMVPに正式追加（ADR-015）

- **正式採用**：[ADR-015 エクスポート＋インポート（A案）](ADR_015_JSON_BACKUP_EXPORT_IMPORT.md)。ブラウザIndexedDBに保存済みのイベント・進捗・再確認情報をローカルJSONへ書き出し、対応形式を選択して復元する機能をMVPに含める。[STEP4-⑫旧要件](STEP4_12_MVP_REQUIREMENTS_V01.md)の「ファイル入出力はMVP外」は本決定で変更。
- [MVP要件](REQUIREMENTS_V1_DRAFT.md)、[データ設計](DATA_DESIGN_V1.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[U01/U02](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[U04](STEP5_04_EDIT_SAVE_ERROR_UI.md)、[テスト](TEST_PLAN_V1_DRAFT.md)、[開発運用](DEVELOPMENT_OPERATIONS_PLAN_V1.md)に反映。本人の明示確認なしで既存イベントを上書き・削除しない。未保存U02/U04はバックアップ済みと偽らない。
- **次の正式判断**：[STEP7-⑩ インポート時にeventIdが衝突したときの対応](STEP7_10_BACKUP_IMPORT_CONFLICT_OPTIONS.md)。衝突したイベントを別IDで複製するA案を推奨するが**未採用**。[STEP7-⑪復元安全契約](STEP7_11_BACKUP_SAFETY_CONTRACT_DRAFT.md)で形式・サイズ・競合・原子的保存の詳細を検討。
- [STEP7実装前残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)にADR-001〜015を整理。現行地域イベント準備支援アプリのみ対象で、**旧空き家用のJSON・物件・所有者・マッチングを一切復元しない**。**実装・ブラウザ試験・デプロイは未実施**。

## 2026-11-15｜既存イベントID衝突時は別IDで複製（ADR-016正式採用）

- **正式決定**：[ADR-016 JSON復元で既存eventIdが衝突した場合はバックアップ側を新IDでコピー追加](ADR_016_IMPORT_COLLISION_AS_COPY.md)。**既存イベントの本文・進捗・revision・日時は無変更**。ファイル内ID重複は全件拒否し、既存と衝突しないIDは可能な範囲で保持。
- **復元の確認・安全条件**：追加件数と別コピー件数をプレビュー→本人の明示確定→同一Dexieトランザクションで全件追加・全件失敗。プレビュー後に別タブで衝突分類が変わった場合は再プレビュー・再承認。中断や容量不足で旧DBを変更せず、成功表示しない。
- [ADR-015 JSONバックアップMVP](ADR_015_JSON_BACKUP_EXPORT_IMPORT.md)、[データ設計](DATA_DESIGN_V1.md)、[U01ホーム](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[U04保存競合](STEP5_04_EDIT_SAVE_ERROR_UI.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[テスト計画](TEST_PLAN_V1_DRAFT.md)、[要件](REQUIREMENTS_V1_DRAFT.md)を更新。[STEP7-⑩](STEP7_10_BACKUP_IMPORT_CONFLICT_OPTIONS.md)は正式決定前の比較履歴。
- **次の判断**：[STEP7-⑫ 同一JSONを繰り返しインポートした際の重複防止](STEP7_12_REPEAT_IMPORT_OPTIONS.md)。A：毎回件数とコピー増加の可能性を注意＋明示確定（推奨）／B：インポート済みファイルハッシュを記録／C：同一ファイル再取込み禁止。**未採用**。
- [STEP7-⑬ データ・トランザクション細則](STEP7_13_IMPORT_METADATA_AND_TRANSACTION_DRAFT.md)、[STEP7残件整理](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)で未確定のrevision初期値・作成日時・サイズ上限・旧版JSONの互換性を区別。**現在の地域イベント準備支援Webアプリのみ／旧空き家案なし／実装・実行試験・公開は未実施**。

## 2026-11-15｜JSON繰返しインポートのA案を正式採用（ADR-017）

- **正式決定**：[ADR-017 繰返し取込みは毎回、追加件数・別コピー件数とコピー増加の可能性を案内し、本人の明示承認で許可](ADR_017_REPEAT_IMPORT_WITH_CONFIRMATION.md)。ファイルハッシュと過去の取込履歴テーブルはMVPでは追加しない。「以前取り込んだ同じファイル」と断定しない。
- [ADR-016 衝突時は別IDで複製](ADR_016_IMPORT_COLLISION_AS_COPY.md)は維持。ファイル内eventId重複は拒否。プレビュー後に別タブで衝突分類が変われば再承認、保存失敗では一括ロールバック、既存イベントは不変。
- [U01の復元画面](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[U04編集と復元競合](STEP5_04_EDIT_SAVE_ERROR_UI.md)、[データ設計](DATA_DESIGN_V1.md)、[テスト仕様](TEST_PLAN_V1_DRAFT.md)、[要件](REQUIREMENTS_V1_DRAFT.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[開発運用](DEVELOPMENT_OPERATIONS_PLAN_V1.md)を更新。[STEP7-⑫比較](STEP7_12_REPEAT_IMPORT_OPTIONS.md)は採用前の履歴。
- **次の製品判断**：[STEP7-⑭ 復元イベントのrevision・日時・由来情報](STEP7_14_RESTORED_EVENT_METADATA_OPTIONS.md)。推奨Aは新revision=1・復元時刻を新作成日時として記録・元の日時を由来として保持するが**未承認**。[STEP7-⑬技術草案](STEP7_13_IMPORT_METADATA_AND_TRANSACTION_DRAFT.md)も更新。
- [STEP7残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)をADR-001〜017へ更新。**現行の地域イベント準備支援Webアプリのみ**。旧空き家・物件登録・所有者診断・マッチングの要件は含めない。**実装・実行テスト・Vercel配信は未実施**。

## 2026-11-15｜復元イベントのrevision=1と元日時保持（ADR-018正式採用）

- **正式採用**：[ADR-018 復元イベントのrevision=1・復元日時を新日時・元イベントIDと元作成/更新日時を由来として保持](ADR_018_RESTORED_EVENT_REVISION_AND_PROVENANCE.md)。既存IDとの衝突有無にかかわらず**新規追加するすべてのイベント**はrevision=1。`createdAt/updatedAt`は今回の復元コミット日時で、元の日時は`importedFrom`へ区別して記録。既存イベントの日時・revision・進捗は不変。
- [データ設計](DATA_DESIGN_V1.md)、[U01一覧](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[U04編集](STEP5_04_EDIT_SAVE_ERROR_UI.md)、[テスト](TEST_PLAN_V1_DRAFT.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[要件](REQUIREMENTS_V1_DRAFT.md)、[復元メタデータ技術草案](STEP7_13_IMPORT_METADATA_AND_TRANSACTION_DRAFT.md)を更新。[STEP7-⑭比較](STEP7_14_RESTORED_EVENT_METADATA_OPTIONS.md)は決定前の履歴。
- **次の正式判断**：[STEP7-⑮ JSONバックアップの容量とイベント件数上限](STEP7_15_BACKUP_LIMIT_OPTIONS.md)。A：2MiB/100件（暫定推奨）、B：10MiB/500件、C：固定上限なし。**未採用**。書出ししたファイルが復元できない事態を防ぐため、上限超過時の分割も設計対象。
- [STEP7残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)はADR-001〜018まで整理。現行の地域イベント準備支援アプリだけを対象とし、**旧空き家案の機能・データを取り込まない**。**コード実装・実行試験・Vercel公開は行っていない**。

## 2026-11-15｜JSONバックアップ容量2 MiB・100イベント（ADR-019正式採用）

- **正式採用**：[ADR-019 バックアップ1ファイルの上限は2 MiB（2,097,152 UTF-8バイト）かつ100イベント](ADR_019_JSON_BACKUP_LIMIT_2MIB_100_EVENTS.md)。**インポートとエクスポート両方**へ同じ条件を適用。書出し時は完成JSONのエスケープ・メタデータも含めた実バイト数、取込み時は実ファイルバイト数とJSONイベント件数を検証する。
- **上限超過時**：入力イベントを無断で間引き・切り捨てせず、復元不能ファイルを「バックアップ完了」としない。既存DBに変更を加えず、超過理由と現在の上限を表示する。
- [MVP要件](REQUIREMENTS_V1_DRAFT.md)、[データ設計](DATA_DESIGN_V1.md)、[U01バックアップUI](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[テスト](TEST_PLAN_V1_DRAFT.md)、[運用・開発計画](DEVELOPMENT_OPERATIONS_PLAN_V1.md)へ反映。[STEP7-⑮比較](STEP7_15_BACKUP_LIMIT_OPTIONS.md)は採用前の履歴。
- **次の正式判断**：[STEP7-⑯ 上限超過時の書出し方法](STEP7_16_EXPORT_SPLIT_OPTIONS.md)。本人選択で複数回書き出すA案／自動複数ファイル化B案／超過時は停止C案。**A案を推奨するが未決定**。
- [STEP7実装前残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)をADR-001〜019へ更新。現行の地域イベント準備支援アプリだけを対象とし、旧空き家データ・物件マッチングを含めない。**実装・実行テスト・Vercel公開なし**。

## 2026-11-15｜上限超過時の選択式JSON書き出し（ADR-020正式採用）

- **正式採用**：[ADR-020 本人がイベントを選択し、上限内のJSONへ複数回に分けて書き出す](ADR_020_MANUAL_EVENT_SELECTION_EXPORT.md)。既決の[ADR-019](ADR_019_JSON_BACKUP_LIMIT_2MIB_100_EVENTS.md)に従い、**1ファイル最大2 MiB（2,097,152バイト）かつ100件**。無断で先頭100件だけに縮小・フィールド切断・複数ファイル自動生成しない。
- [U01書き出し画面](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[データ設計](DATA_DESIGN_V1.md)、[要件](REQUIREMENTS_V1_DRAFT.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[テスト](TEST_PLAN_V1_DRAFT.md)、[開発運用](DEVELOPMENT_OPERATIONS_PLAN_V1.md)へ反映。[STEP7-⑯](STEP7_16_EXPORT_SPLIT_OPTIONS.md)は採用前の比較履歴。
- 書出し対象・未選択件数を表示し、完成したUTF-8 JSONの実バイト長を確認してからダウンロード。**ダウンロード開始と端末での保管完了は同一視しない**。U02/U04の未保存下書きを書き出したことにしない。
- **次の判断**：[STEP7-⑰ バックアップ選択画面の初期状態](STEP7_17_EXPORT_SELECTION_UI_OPTIONS.md)。A案（推奨）：初期選択なし・保存済み100件以内のときだけ「すべて選択」可能。B/Cも比較、**未決**。
- [STEP7実装前残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)はADR-001〜020に更新。現行地域イベント準備支援Webアプリのみ対象で、旧空き家案のデータやマッチング機能を混同しない。**実装・実行テスト・デプロイは未実施**。

## 2026-11-15｜バックアップ書出しの初期未選択・全選択の条件（ADR-021正式採用）

- **正式採用**：[ADR-021 U01のバックアップ書出しは初期0件・保存済み1〜100件の場合のみ「すべて選択」可能](ADR_021_EXPORT_INITIAL_NONE_SELECT_ALL_WITHIN_100.md)。101件以上は全選択を不可として理由を表示し、本人が最大100件を個別選択。100件チェック中の101件目は他のチェックを勝手に置換せず、0件選択時の書出し主操作は無効。
- 画面には**選択件数／保存済み総数／今回ファイルに含めない件数**を表示。[ADR-019](ADR_019_JSON_BACKUP_LIMIT_2MIB_100_EVENTS.md)の完成JSON実UTF-8容量2 MiB上限、[ADR-020](ADR_020_MANUAL_EVENT_SELECTION_EXPORT.md)の本人選択式分割を維持。実データを書き換えたり未選択イベントを無断で出力したりしない。
- [U01画面仕様](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[データ設計](DATA_DESIGN_V1.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[要件](REQUIREMENTS_V1_DRAFT.md)、[テスト仕様](TEST_PLAN_V1_DRAFT.md)、[開発運用](DEVELOPMENT_OPERATIONS_PLAN_V1.md)へ反映。[STEP7-⑰](STEP7_17_EXPORT_SELECTION_UI_OPTIONS.md)は採用前の比較履歴。
- **次の利用者判断**：[STEP7-⑱ JSONバックアップ形式のバージョン互換性](STEP7_18_BACKUP_VERSION_COMPATIBILITY_OPTIONS.md)。現在版＋検証済みの既知旧版を許すA案を推奨するが、未採用。
- [STEP7残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)はADR-001〜021を反映。**現行の地域イベント準備支援アプリのみ**。旧空き家・物件・所有者の仕様は引き継がない。**コード実装・動作試験・Vercel公開なし**。

## 2026-11-15｜JSONバックアップの対応版は現在＋検証済み既知旧版（ADR-022正式採用）

- **正式採用**：[ADR-022 現行のバックアップ形式と、安全な移行手順とテストが検証済みの既知旧形式のみインポート](ADR_022_BACKUP_KNOWN_VERSION_COMPATIBILITY.md)。未対応旧版・未知将来版・旧空き家等の他アプリJSONは**拒否**して既存データを守る。旧形式移行は旧版スキーマ検証→意味の欠落を許さない変換→現在版全件再検証。
- **重要な制限**：初期の正式`formatId`と初期`exportSchemaVersion`の値、対応旧版一覧は未決で、実際に公開・検証した旧JSON版は**まだない**。バックアップ互換性の方針決定を「旧版の移行実装・試験が完了した」と混同しない。
- [バックアップのデータ設計](DATA_DESIGN_V1.md)、[U01復元エラーUI](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[インポート安全契約](STEP7_11_BACKUP_SAFETY_CONTRACT_DRAFT.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[テスト仕様](TEST_PLAN_V1_DRAFT.md)、[MVP要件](REQUIREMENTS_V1_DRAFT.md)、[開発運用計画](DEVELOPMENT_OPERATIONS_PLAN_V1.md)へ反映。[STEP7-⑱](STEP7_18_BACKUP_VERSION_COMPATIBILITY_OPTIONS.md)は比較履歴。
- **次の確認**：[STEP7-⑲ JSON復元時の不正・矛盾・未来の元保存日時](STEP7_19_IMPORTED_TIMESTAMP_VALIDATION_OPTIONS.md)。元の作成・更新日時を由来として残すADR-018との整合を図る。A/B/Cは未決。
- [STEP7残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)をADR-001〜022まで更新。現行の地域イベント準備支援アプリ専用、旧空き家案は引き継がない。**実装・動作テスト・Vercel公開は行っていない**。

## 2026-11-15｜復元元の保存日時：不正拒否・有効な未来日時は本人確認（ADR-023正式採用）

- **正式採用**：[ADR-023 JSON内の元保存日時が不正・順序矛盾ならファイル全体拒否、有効な未来日時は端末時計への注意と本人の明示確認後に復元可能](ADR_023_BACKUP_TIMESTAMP_STRICT_WITH_FUTURE_WARNING.md)。不正な暦日、タイムゾーン不明、`updatedAt<createdAt`、不正`exportedAt`は元DBを変更せず拒否。オフセットの異なる同一瞬間を誤判定しない。
- [ADR-018](ADR_018_RESTORED_EVENT_REVISION_AND_PROVENANCE.md)の復元新レコード`revision=1`、`createdAt=updatedAt=importedAt`、元日時を`importedFrom`へ保持する方針を変更しない。イベント開催予定日Q3の過去日を許容する[ADR-006](ADR_006_ALLOW_PAST_SCHEDULE.md)とも混同しない。
- [データ設計](DATA_DESIGN_V1.md)、[U01復元エラー・警告](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[インポート安全契約](STEP7_11_BACKUP_SAFETY_CONTRACT_DRAFT.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[MVP要件](REQUIREMENTS_V1_DRAFT.md)、[テスト](TEST_PLAN_V1_DRAFT.md)に反映。[STEP7-⑲](STEP7_19_IMPORTED_TIMESTAMP_VALIDATION_OPTIONS.md)は正式採用前の比較履歴。
- **次の判断**：[STEP7-⑳ 任意入力のUnicode書記素制限に追加するUTF-8バイト上限](STEP7_20_TEXT_BYTE_SAFETY_LIMIT_OPTIONS.md)。A：施設名メモ4 KiB／イベント説明16 KiB（暫定推奨）、B：両方64 KiB、C：追加のバイト制限なし。**数値は未採用**。
- [STEP7残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)をADR-001〜023に更新。現行地域イベント準備支援Webアプリのみ扱い、旧空き家所有者・物件マッチング案を取り込まない。**実装・実行テスト・Vercel公開なし**。

## 2026-11-15｜Unicode書記素数と別のUTF-8技術上限を正式採用（ADR-024）

- **正式採用**：[ADR-024 施設名メモ4 KiB・イベント説明16 KiBの追加UTF-8制限](ADR_024_UTF8_TEXT_BYTE_LIMITS.md)。既決の100/500書記素上限は維持し、両方を独立検証。上限値は施設名メモ**4,096バイト**、イベント説明**16,384バイト**。
- [入力バリデーション契約](STEP6_02_VALIDATION_CONTRACT.md)、[データ設計](DATA_DESIGN_V1.md)、[U04編集・エラーUI](STEP5_04_EDIT_SAVE_ERROR_UI.md)、[U01 JSON取込エラー](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[バックアップ安全契約](ADR_024_UTF8_TEXT_BYTE_LIMITS.md)、[テスト仕様](TEST_PLAN_V1_DRAFT.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[要件](REQUIREMENTS_V1_DRAFT.md)へ反映。[STEP7-⑳](STEP7_20_TEXT_BYTE_SAFETY_LIMIT_OPTIONS.md)は採用前の比較履歴。
- IME変換中の強制切断をせず、確定後の超過エラー時は編集ドラフトを維持。JSON全体の2 MiB上限とは別の制限で、1イベントでも超過ならインポート全件を拒否する。
- **次の利用者判断**：[STEP7-㉑ 既存レコードが新バイト上限を超える場合](STEP7_21_EXISTING_OVERSIZE_RECORD_OPTIONS.md)。A：閲覧を維持し、修正後に保存可（推奨）／B：旧版例外／C：自動切断。**未決**。
- [STEP7実装前残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)はADR-001〜024へ更新。**現行の地域イベント準備支援アプリのみ**。旧空き家・物件診断・マッチングは引き継がない。**コード実装・実行試験・Vercel公開なし**。

## 2026-11-15｜既存のサイズ超過イベントは閲覧維持・修正までU04保存不可（ADR-025正式採用）

- **正式採用**：[ADR-025 現行サイズ上限を超える既存保存済みイベントは閲覧維持、本人の修正後のみU04保存可](ADR_025_LEGACY_OVERSIZED_RECORD_READ_ONLY_UNTIL_FIXED.md)。U01/U03に警告し、元の入力・進捗・revisionを自動切断・削除しない。
- **JSONバックアップ**：上限違反のイベントを含むファイルのインポートは**全件拒否**。本人選択エクスポートに不適合レコードが含まれるときは**全体停止**し、本人が選択を見直すかU04で修正するよう案内。無断除外・無断切断・部分成功表示は禁止。
- [データ設計](DATA_DESIGN_V1.md)、[入力バリデーション](STEP6_02_VALIDATION_CONTRACT.md)、[U01閲覧・JSON入出力UI](STEP5_02_HOME_SETUP_WIREFRAMES.md)、[U04編集・保存エラー](STEP5_04_EDIT_SAVE_ERROR_UI.md)、[テスト](TEST_PLAN_V1_DRAFT.md)、[要件](REQUIREMENTS_V1_DRAFT.md)、[アーキテクチャ](ARCHITECTURE_V1.md)、[開発運用](DEVELOPMENT_OPERATIONS_PLAN_V1.md)へ反映。[STEP7-㉑](STEP7_21_EXISTING_OVERSIZE_RECORD_OPTIONS.md)は採用前の比較履歴。
- **次の正式判断**：[STEP8-① U03進捗保存を不適合な既存入力と切り離すか](STEP8_01_CORE_VALUE_RULES_AND_LEGACY_PROGRESS_REVIEW.md)。A（推奨）は入力を変更せず、進捗のみCAS付き保存。Bは修正まで進捗保存停止、Cは全EventRecord書き直しの特例。**いずれも未採用**。
- [STEP7実装前残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)をADR-001〜025に更新。次段階はP01〜P12判定・中心価値の安全性レビュー。**現行の地域イベント準備支援アプリのみ**で、旧空き家データ・所有者診断・マッチングを引き継がない。**コード実装・試験実行・Vercel公開なし**。

## 2026-11-15｜U03進捗の独立CAS保存（ADR-026）とP01〜P12中心価値監査

- **正式採用**：[ADR-026 入力に既存のサイズ上限違反があっても、U03の本人のタスク進捗だけをrevision CASで安全に保存](ADR_026_U03_PROGRESS_CAS_INDEPENDENT_OF_INVALID_INPUT.md)。対象taskIdの進捗と明示的再確認解除を更新し、入力メモ・説明、他タスク、createdAt、由来を無断変更しない。成功時revision+1・updatedAt更新、保存失敗・別タブ競合で「保存済み」と表示しない。
- **設計監査**：[STEP8-② P01〜P12の入力根拠・次の一歩・誤案内禁止を整理](STEP8_02_RULES_CORE_VALUE_AUDIT.md)。[判定契約](RULE_ENGINE_CONTRACT_V1.md)、[判定表v1.1](STEP4_RULE_DECISION_TABLE_V11.md)、[U03画面](STEP5_03_PREPARATION_PLAN_UI.md)、[進捗・再確認](STEP6_01_PROGRESS_RECHECK_SPEC.md)、[データ設計](DATA_DESIGN_V1.md)、[テスト](TEST_PLAN_V1_DRAFT.md)、[アーキテクチャ](ARCHITECTURE_V1.md)へ反映。P05、物理会場なしP08、同優先度ID順の正式決定を維持。他のP01〜P12昇格案は引き続き**推奨／未承認**。
- **次の大きな判断**：[STEP8-③ P08の施設固有条件でP1自動昇格するか](STEP8_03_FACILITY_P08_PRIORITY_GATE.md)。推奨Aは初期MVPではP08をP2基本で案内し、根拠が検証できた公式情報へのリンクを示す（正式採用は未決）。安全・施設条件の断定や優先順位が大きく変わるためユーザー確認対象。
- **設計委任**：既決に沿う文言・表示・テスト候補は推奨案で進める。対象利用者・入力6問・タスク集合・P1/P2の大幅変更、外部送信やデータ消去、実装・公開着手は確認する。
- [実装前残件](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)をADR-001〜026へ更新。**現行の地域イベント準備支援Webアプリのみ**、旧空き家案は混ぜない。**実装・実行テスト・デプロイ未実施**。

## 2026-11-16｜P08施設固有P1自動昇格なし（ADR-027正式採用）／P01〜P12理由の詳細化

- **正式採用**：[ADR-027 P08は初期MVPではP2基本、施設固有の有効公式出典を理由に自動P1昇格しない](ADR_027_P08_P2_NO_FACILITY_AUTO_ESCALATION.md)。本人が明示した地域／施設カテゴリと対象が合い、期限内の公式出典に限り確認事項・リンク・確認日を案内。期限切れでは施設固有の断定を停止。P05未成年参加P1／成人・対象未定P2、物理会場なしのP08親P2、同優先度ID順を維持。
- [判定表v1.1](STEP4_RULE_DECISION_TABLE_V11.md)、[判定エンジン契約](RULE_ENGINE_CONTRACT_V1.md)、[U03プランUI](STEP5_03_PREPARATION_PLAN_UI.md)、[テスト計画](TEST_PLAN_V1_DRAFT.md)、[STEP8-②監査](STEP8_02_RULES_CORE_VALUE_AUDIT.md)を更新。[STEP8-③](STEP8_03_FACILITY_P08_PRIORITY_GATE.md)は決定前の比較履歴。
- **推奨設計を継続**：[STEP8-④ P01〜P12の理由コード・次の一歩・否定例](STEP8_04_REASON_CODE_AND_SCREEN_COPY_DRAFT.md)。説明・テスト候補の具体化であり、ほかのP2/P1昇格や法的判断を新たに正式採用したものではない。
- ユーザーが確認すべき大きな変更は、中心価値・対象者・基本6問・P01〜P12の追加削除や広範な順位変更、法的断定、保存済みデータの破壊・外部送信、実装／公開への着手等。既決の範囲の細部は推奨案で進める。
- [STEP7残件一覧](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)をADR-001〜027まで更新。**現行の地域イベント準備支援アプリだけが対象**、旧空き家・所有者・物件マッチング案は混ぜない。**コード実装・動作試験・デプロイ未実施**。

## このプロダクトを使うのは誰？
**2026-11-13のSTEP1で範囲を確定**：富山県（初期情報は高岡市）で、**初めて単発・小規模の非営利イベントや体験会を主催しようとする個人・立ち上げ前の小規模チーム**。団体への所属は不要。中心課題は**開催に必要な準備・手続きの全体像と順番が分からないこと**。継続的な子どもの居場所運営・長期学習支援は初期対象外。

## 何を提供する？（STEP2で中心価値を確定）
**初回イベントの準備の全体像と、自分の準備状況に合った優先順位を理解できること**が主役。自分に必要な準備領域と未確認点を示し、今取り組む確認を理由とともに案内する。**高岡市の公式の施設条件・相談先と最初の一歩は補助する価値**。自治体の相談・予約サービスを置き換えず、利用の可否を保証しない。相談文コピーなどの具体機能はSTEP3で改めて決める。

最初の具体例は**単発の子ども向けプログラミング体験会**、地域交流イベント、単発ワークショップ。継続的な学習支援・居場所運営は将来検討。空き家は必要な場合の選択肢の一つであり、物件を探したり予約したりしない。

## 【開発前の優先資料】6つのSTEPを順番に進める

**[開発前の6ステップ・決定事項・未決事項](PREDEVELOPMENT_PLAN.md)** が現在の計画の入口です。

1. [STEP1 課題とターゲット](STEP1_PROBLEM_TARGET.md) — 誰の何を解決するか。
2. [STEP2 提供価値と独自性](STEP2_VALUE_DIFFERENTIATION.md) — アプリを使う理由と既存サービスとの差。
3. [STEP3 MVPの範囲](STEP3_MVP_BOUNDARY.md) — 入力方式①〜⑫、条件ベース順位提案⑬、結果表示⑭の採用事項と⑮詳細案。
4. [STEP4 データと判断ルール](STEP4_INPUT_OUTPUT_EVIDENCE.md) — **4領域12項目の条件別判定表**、優先度・例外・根拠の設計案（最終確定前）。
5. [STEP5 現行MVP画面設計 v0.1](STEP5_SCREEN_DESIGN_V01.md) — 4画面・基本6問・プラン・進捗・保存／復元／削除・エラー状態を整理。旧 [画面案](STEP5_USER_EXPERIENCE.md) は履歴資料。
6. [STEP6 コンテストと開発着手条件](STEP6_CONTEST_READINESS.md) — 架空デモと未決事項。

**現在の進め方**：**STEP1・STEP2は方針確定**。STEP3-①〜⑫の入力方式、⑬「本人の困りごとを追加で聞かない」、⑭「重要確認→次の行動→準備の全体像」、**基本6問→暫定プラン→任意詳細化→持ち帰り**を採用しました。⑮の**4領域12項目の詳細な判定ルールは設計案・最終確認前**です。STEP4はこの現行方針を反映済みですが、STEP5と以下の旧来のv3.1補助文書には「活動障壁の入力」「最初の一歩のみ」の古い仮仕様が残ります。**STEP3と更新後のSTEP4を優先し、矛盾する記述は採用しない**でください。旧v1所有者向け用途診断、旧v2営利活動・場所診断は現行仕様に混ぜません。聞き取り・アンケート・実装は未実施です。

## 補助資料（旧仮仕様を含むため、STEP3/更新済みSTEP4を優先）
1. [PRODUCT_SPEC.md](PRODUCT_SPEC.md) — 対象・価値・MVP。
2. [USER_FLOW.md](USER_FLOW.md) — 画面と実際の利用体験。
3. [DECISION_RULES.md](DECISION_RULES.md) — **旧・障壁入力方式の判定案。現行の優先順位仕様として採用しない**。
4. [VALUE_PROPOSITION_V31.md](VALUE_PROPOSITION_V31.md) — 旧版との差、架空の画面例。
5. [DEMAND_AND_COMPETITOR_AUDIT.md](DEMAND_AND_COMPETITOR_AUDIT.md) — 需要の根拠と競合の限界。
6. [EVIDENCE_AND_VALIDATION.md](EVIDENCE_AND_VALIDATION.md) — 机上調査の結論と残る仮説。
7. [VALIDATION_PROTOCOL_V31.md](VALIDATION_PROTOCOL_V31.md) — **開発前の聞き取り・紙の比較テスト**。
8. [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) — 検証優先の作業計画。
9. [DECISION_AND_AI_LOG.md](DECISION_AND_AI_LOG.md) — 方針・生成AI利用の履歴。

## 今回追加した開発前の具体的成果物（2026-11-12）
- [高岡市・公式情報の確認台帳](OFFICIAL_SOURCE_REGISTER.md) — 条件、確認日、対象範囲、利用可否の未確認を分離。
- [架空の5ケースと期待出力](TABLETOP_SCENARIOS.md) — 個人・学生チーム・会場・費用などを机上でレビュー。
- [仕様の矛盾と改善決定](DESIGN_REVIEW_AND_DECISIONS.md) — 結果を出す前の入力タイミングと、公式条件の適用範囲を整理。
- [コンテスト向けのデモ構成案](CONTEST_DEMO_DESIGN.md) — 作品が完成した後に見せたい3つの体験。

**聞き取りはユーザーの指示で後回し。** この4資料は実際の利用者テストやコードの実行結果ではありません。

## 現状の真偽の区別
**確認できた**：高岡市の相談・施設予約サービスとその公式情報、一部施設の利用条件、他地域の団体立ち上げ時の障壁、子どもの居場所への希望。  
**仮説**：活動条件と準備状況に応じた開催までの見通し・優先順位に、高岡市の確認済み情報を必要に応じて加えると、既存チェックリストや汎用AIより次に動きやすくなる。**競合優位は未実証**。  
**未実施**：活動希望者への面談、紙プロトタイプ比較、実装、テスト、外部連絡、施設の予約、デプロイ、応募。

## 安全と制限
未成年のみの高岡市地域交流センター利用は2026年1月改定の公式注意で認められていません。ただし**実際の利用可否は管理者の判断で別確認**。学校・保護者や信頼できる成人等への相談を案内し、条件を回避することは促さない。子ども向け活動の見守り責任・安全も個別確認する。

## 開発可否
まず小規模な実需要の聞き取り・比較で独自の価値を検証。**設計完了は需要証明でも開発の承認でもありません。**

## 2026-11-16｜推奨で進める設計・STEP8-⑤整合レビュー

- **設計改善**：[STEP8-⑤ 判定ルールとU03画面の不整合を点検](STEP8_05_RULE_UI_CONSISTENCY_REVIEW.md)。既決ADR-003/027に合わせ、[U03画面](STEP5_03_PREPARATION_PLAN_UI.md)の「子ども参加なのに会場P2が代表」の例を**P05安全・見守りP1**へ訂正。[STEP4判定表](STEP4_RULE_DECISION_TABLE_V11.md)のP08旧P1候補を**P2基本・施設固有の自動P1昇格なし**へ修正。
- **要件矛盾の訂正**：[REQUIREMENTS_V1_DRAFT.md](REQUIREMENTS_V1_DRAFT.md)の初期章にあった「データファイルの入出力はMVP対象外」を、後続[ADR-015](ADR_015_JSON_BACKUP_EXPORT_IMPORT.md)で採用済みの**JSON入出力は対象内**へ整理。PDFは引き続き対象外。
- [テスト仕様](TEST_PLAN_V1_DRAFT.md)に、P05・P08の表示順、出典期限切れ、旧入力サイズ超過とU03進捗、JSONのMVP範囲を追加。**設計レビューのみ**で実装・試験実行・公式情報原ページの確認なし。
- 細かなUI文言・判定理由・否定例は推奨設計として継続。**基本6問・P01〜P12の優先度の大きな変更・利用者・中心価値・データ削除／外部送信・実装開始**のみ本人確認。

## 2026-11-16｜設計の横断検証チェックリスト（STEP8-⑥）

[STEP8-⑥ 実装前の品質・利用者検証チェックリスト](STEP8_06_PREIMPLEMENTATION_VALIDATION_CHECKLIST.md)を追加。ADR-020/021の本人選択式JSON書き出しを含め、6問→P01〜P12→U01〜U04→保存・JSON復元→公式出典の整合を、未実施の検証項目として列挙した。**新しい優先度・画面・機能は正式採用していない**。旧空き家案への回帰なし。実装・実行テスト・公開なし。

## 2026-11-16｜画面・保存境界の横断設計と次の製品判断

- [STEP8-⑦ U01〜U04状態遷移・バックアップ・出典失効の横断ケース](STEP8_07_CROSS_SCREEN_STATE_TRANSITIONS.md)を追加。保存成功前の遷移禁止、U03進捗CAS、U04施設条件変更、本人選択JSON、旧版・日時不正の復元等、**未実行の20ケース**を整理。
- **次の利用者判断**：[STEP8-⑧ P01〜P12の残る優先度ルール比較](STEP8_08_REMAINING_PRIORITY_POLICY_GATE.md)。**A案推奨（根拠ある入力条件に限ってP2へ、未検証の新P1は追加しない）／B案固定優先度／C案詳細条件分岐**。いずれも**未採用**。ADR-003のP05・同優先度ID昇順、ADR-027のP08 P2基本を変更しない。
- 現行のイベント準備支援アプリ専用。旧空き家案への回帰なし。**コード実装・テスト実行・デプロイ・新しい公式原ページ確認なし**。

## 2026-11-16｜STEP8-⑧ A案採用：限定P2優先度（ADR-028）

- **正式採用**：[ADR-028 実在する入力値だけでP01〜P04・P07・P09をP3→P2へ限定分岐](ADR_028_LIMITED_P2_PRIORITY_BY_EXISTING_INPUTS.md)。P06/P10/P11/P12はP3固定。P05は未成年含むP1・それ以外P2、P08はP2基本・施設根拠だけではP1にしない。同順位はtaskId昇順。[比較資料STEP8-⑧](STEP8_08_REMAINING_PRIORITY_POLICY_GATE.md)は決定前の比較履歴。
- [入力検証](STEP6_02_VALIDATION_CONTRACT.md)、[判定エンジン契約](RULE_ENGINE_CONTRACT_V1.md)、[理由コード](STEP8_04_REASON_CODE_AND_SCREEN_COPY_DRAFT.md)、[U03画面](STEP5_03_PREPARATION_PLAN_UI.md)、[要件](REQUIREMENTS_V1_DRAFT.md)、[テスト](TEST_PLAN_V1_DRAFT.md)、[画面・ルール整合](STEP8_05_RULE_UI_CONSISTENCY_REVIEW.md)、[残件一覧](STEP7_PREIMPLEMENTATION_OPEN_ITEMS.md)に反映。
- **次の設計残件**：本人が明示できる任意責任者／設備回答の厳密な値と理由文の整合、公式情報の最新原ページ確認、実利用者による優先度説明の検証。新しいP1・6問の変更・法的義務判定は重要な変更なので再確認を要する。**旧空き家案は対象外／実装・テスト実行・デプロイなし**。

## 2026-11-16｜STEP8-⑨優先度の追跡マトリクス

[STEP8-⑨ P01〜P12の入力条件・優先度・U03理由・回帰ベクトル](STEP8_09_PRIORITY_TRACEABILITY_MATRIX.md)を作成し、正式採用したADR-028の期待表示とテストケースを追跡可能にした。**理由コード名は提案**であり、本人に承認されたP1/P2/P3の条件とは区別する。今後の大きな製品変更、実装開始、公式出典の最新版確認、ユーザビリティ検証は未実施。

## 2026-11-16｜STEP8-⑩入力名・任意enumの整合レビュー

[STEP8-⑩ 開催時期のschedule/date命名差とresponsible/equipmentNeedの正規化](STEP8_10_CANONICAL_INPUT_MAPPING_AND_ENUM.md)を作成。**既存データ設計では開催時期は`EventInput.date`、入力仕様の`schedule`は同じ一問の説明名**。任意`responsible`は`decided/not_decided`、`equipmentNeed`は`yes/none_identified`という型サンプルを使用し、ADR-028のP2分岐で未回答と未定を混同しない。**正式なJSONキー・初期版番号の固定は公開前の技術仕様残件**。新機能・旧空き家案なし、実装・実行試験なし。

## 2026-11-16｜STEP8-⑪ U03状態別文言・ユーザビリティ検証計画

[STEP8-⑪](STEP8_11_U03_STATE_COPY_AND_USABILITY_PLAN.md)に、本人の未着手／進行中／完了／対象外、要再確認、出典の有効性、保存競合を分けて見せる画面文言案と検証手順を追記。U03の新画面・新機能は追加しない。**中心価値の実利用者検証、公式出典の原ページ再確認、実装・試験実行・デプロイはいずれも未実施**。

## 2026-11-16｜STEP8-⑫バックアップ初回形式と検証順

[STEP8-⑫ JSON初期形式・インポート／エクスポート検証順の技術草案](STEP8_12_BACKUP_JSON_V1_SCHEMA_DRAFT.md)を追加。専用formatId・初期exportSchemaVersion/eventSchemaVersionは**未採用の値案**として示し、2 MiB/100件、本人選択、全件原子的復元、日時の異常拒否・未来警告など既決ADRとの整合を整理。存在しない旧形式のサポート宣言、実装、テスト実行、公開は行っていない。

## 2026-11-16｜STEP8-⑬／⑭ 公式情報と利用者検証の準備

- [STEP8-⑬ 高岡市公式情報の部分再確認](STEP8_13_OFFICIAL_SOURCE_PARTIAL_RECHECK_20261116.md)：地域交流センターと市民活動相談窓口の公開**HTMLを部分照合**。PDF全ページ・施設別適用範囲・管理者への問い合わせ・二人目の確認は未完で、掲載承認とは区別。
- [STEP8-⑭ 初主催者の中心価値・U02〜U04/U01操作検証計画](STEP8_14_FIRST_ORGANIZER_USABILITY_RESEARCH_PLAN.md)：観察項目・記録票・仮の対象者構成を設計。**実際の募集・参加者テストはしていない**。
- 旧空き家案との混同なし。コード実装、実行試験、デプロイなし。既決ADR-001〜028の範囲を維持。

## 2026-11-16｜STEP8-⑮ 開発・公開の証拠ゲート

[STEP8-⑮ 実装着手前・公開前の判断ゲート](STEP8_15_READINESS_AND_EVIDENCE_GATES.md)に、現在ある設計の正本と不足する実証・承認をG0〜G6で整理。**G1 JSON正式版値、G2高岡市PDF・対象施設確認、G3実利用者検証、G4本人の実装指示、G5動作試験、G6本人の公開許可**を区別した。資料作成を検証実施や公開承認と誤表示しない。現在は設計のみ、旧空き家案なし。

## 2026-11-16｜高岡市公式PDFのページ画像照合を追加

[STEP8-⑬](STEP8_13_OFFICIAL_SOURCE_PARTIAL_RECHECK_20261116.md)と[公式根拠台帳](OFFICIAL_SOURCE_REGISTER.md)に、**地域交流センター利用上の注意PDF（公開1ページ、R8.1改定）**の原本画像を確認した記録を追加。利用主体が未成年のみの場合の基準と火気使用の原則不可を照合。ただし、**施設個別運用・例外可否・管理者問い合わせ・別人レビュー・公開版カタログ承認は未実施**。P08はP2基本で、参加者の年齢から施設利用主体を推測しない。新しい開発・テスト・デプロイなし。

## 2026-11-16｜検証を実施できる準備資料（STEP8-⑯／⑰）

- [STEP8-⑯ 初主催者向けインタビュー実施パック](STEP8_16_USER_RESEARCH_SESSION_KIT.md)：協力依頼文案、**誘導しない質問**、架空5シナリオ、匿名観察票、改善の判断基準を用意。**人への連絡・インタビューは未実施**。
- [STEP8-⑰ 高岡市公式情報の表示可否と適用対象マトリクス](STEP8_17_OFFICIAL_SOURCE_APPLICABILITY_REVIEW.md)：センターHTMLと利用上の注意PDF・相談窓口について原文確認と個別適用を分離。**管理者確認・二人目レビュー・公開採用は未実施**。旧空き家案なし。実装・実行テスト・デプロイなし。

## 2026-11-16｜STEP8-㉓ 既存アンケートの需要根拠を区別

[STEP8-㉓ 地域イベント主催・市民活動に類似する調査の比較](STEP8_23_RELATED_SURVEYS_AND_DEMAND_EVIDENCE.md)で、大阪市のイベント開催状況アンケート、富山県2009年団体実態調査／2024年県政モニター調査、2025年祭り主催者調査等を対象・時期・回答数付きで整理。**既存団体の運営課題が報告されていることと、富山県の初主催者が優先順位支援を求めることは別の仮説**。大阪市にはアンケートに基づく編集可能な地域イベント開催チェックリストも存在。V-01需要・V-02理解の実証は未実施。ADR-001〜028と初期MVPは不変。
