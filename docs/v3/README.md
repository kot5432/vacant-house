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
