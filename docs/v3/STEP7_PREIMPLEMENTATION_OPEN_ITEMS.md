# STEP7｜正式採用ADR-001〜017と実装前残件の棚卸し（2026-11-15）

> **目的：既決事項と未決事項を区別し、実装開始を誤って宣言しないための設計レビュー**。対象は地域イベント準備支援Webアプリのみ。GitHubリポジトリ名がvacant-houseでも、旧空き家所有者／物件／マッチングの機能は使わない。ソースコード、ブラウザ試験、Vercelデプロイなし。

## 1. 既決事項の正本

| 優先 | 採用した内容 | 決定書 |
|---|---|---|
| ADR-001 | React + TypeScript + Vite、IndexedDB + Dexie、Vercel | [技術](ADR_001_TECH_STACK_ADOPTED.md) |
| ADR-002 | 物理会場なしでも一般準備を限定支援。オンラインと断定しない | [対象範囲](ADR_002_NO_PHYSICAL_VENUE_SCOPE.md) |
| ADR-003 | P05：成人・対象未定=P2、未成年含む=P1。P08物理会場なし=P2。同優先度はP01〜P12 ID昇順 | [優先度](ADR_003_PRIORITY_RULES_ADOPTED.md) |
| ADR-004 | 再確認は本人が「再確認を終えた」を明示操作し、保存成功時にだけ解除 | [再確認](ADR_004_EXPLICIT_RECHECK_CLEAR.md) |
| ADR-005 | U04確定保存成功時だけ、非該当となった施設固有入力を削除 | [施設入力](ADR_005_CLEAR_INAPPLICABLE_FACILITY_INPUT.md) |
| ADR-006 | 過去の実在日・月は警告付きで保存可能。月を日付へ補完しない | [日時](ADR_006_ALLOW_PAST_SCHEDULE.md) |
| ADR-007 | 任意人数は1以上の安全整数、1,001以上は注意のみで保存可 | [人数](ADR_007_ATTENDEE_COUNT_WARNING.md) |
| ADR-008 | 任意施設名メモ100字、イベント説明500字。IMEで自動切断しない | [文字数](ADR_008_OPTIONAL_TEXT_LIMITS.md) |
| ADR-009 | 公式出典を月1回＋毎本番リリース前＋初回掲載前に確認 | [公式出典](ADR_009_OFFICIAL_SOURCE_MONTHLY_RELEASE_REVIEWS.md) |
| ADR-010 | 月次点検の予定期限超過時は猶予なく施設固有断定を停止し、一般案内へ | [点検遅延](ADR_010_STALE_SOURCE_FAIL_CLOSED.md) |
| ADR-011 | 日本時間の毎月末までにその月の原ページ点検とレビューを完了 | [月末期限](ADR_011_MONTH_END_SOURCE_REVIEW_DEADLINE.md) |
| ADR-012 | 公式出典はVite静的ビルド同梱、新しい版の読込時に再掲載 | [配信方式](ADR_012_BUNDLED_OFFICIAL_SOURCE_CATALOG.md) |
| ADR-013 | 軽量buildIdを自動確認、再読み込みは本人の明示操作のみ | [版確認](ADR_013_MANUAL_REFRESH_ON_AUTO_VERSION_DETECTION.md) |
| ADR-014 | PC・スマホ主要現行Chrome/Edge/Safari/Firefoxを検証対象 | [対応ブラウザ](ADR_014_MAJOR_DESKTOP_MOBILE_BROWSER_SUPPORT.md) |
| ADR-015 | 保存済みイベントと本人進捗のJSONエクスポート＋インポートをMVPに追加 | [バックアップ](ADR_015_JSON_BACKUP_EXPORT_IMPORT.md) |
| ADR-016 | インポート時の既存ID衝突は別IDで複製・既存を維持・全件原子的追加 | [衝突時複製](ADR_016_IMPORT_COLLISION_AS_COPY.md) |
| ADR-017 | 繰返しJSONインポートは毎回件数とコピー増加の可能性を明示、本人確定で許可 | [繰返し復元](ADR_017_REPEAT_IMPORT_WITH_CONFIRMATION.md) |

**さらに既決**：基本6問、4領域・P01〜P12、U01〜U04、生成後ブラウザ内保存と複数イベント・再開、U03進捗自動保存、U04編集の明示確定、初回U02の下書き非永続化。施設情報は本人がカテゴリを明示して対象条件が一致した場合のみ公式出典を表示。行政が許可したと断定しない。

## 2. 実装前の決定・検証の残件

| 重要度 | 残件 | 種別 | 進め方 |
|---|---|---|---|
| **高・次の利用者確認** | **復元されたイベントのrevision・日時・由来の保存方法**。繰返し復元はADR-017で確定 | 保存メタデータとU01一覧の設計 | [STEP7-⑭ 比較](STEP7_14_RESTORED_EVENT_METADATA_OPTIONS.md)で検討 |
| 高 | 公式施設の原ページ・対象条件・改定内容の再検証 | 公開前の実地確認 | 既存[公式根拠台帳](OFFICIAL_SOURCE_REGISTER.md)には**2026-11-12時点の閲覧記録がある**。2026-11-15の今回の作業では再確認していない。台帳の過去確認と今回の未確認を区別 |
| 高 | 全P01〜P12の該当性／優先度の未決細則、再確認依存の網羅 | 判定設計 | [判定契約](RULE_ENGINE_CONTRACT_V1.md)の未承認箇所を個別レビュー。優先順A案は変更しない |
| 高 | eventId・revision・schemaVersion・rulesVersion／sourceRevisionの移行時の厳密な扱い | 技術設計 | [データ](DATA_DESIGN_V1.md)と[テスト](TEST_PLAN_V1_DRAFT.md)を一致。旧タブから削除済みIDを復活させない |
| 中 | Unicode書記素の数え方、Intl.Segmenter対応範囲、極端な単一書記素のバイト上限 | 技術レビュー | 100/500字の正式上限は守り、カウンターと保存判定を一致させる |
| 中 | U03のタスク展開の同時開閉、進捗率省略、対象外確認文言、ホームタイトル | UIレビュー | [STEP5-⑤](STEP5_05_UI_DECISIONS.md)の推奨案をユーザー検証前のUI設計に整理 |
| 中 | 人数文字列（全角数字・カンマ・空白）のパース規約 | 入力設計 | 任意人数のB案と矛盾せず、局所エラー／案内を統一 |
| 中 | 公式出典の確認担当、二人目レビュー担当、点検月内日、代行 | チーム運用 | チームの具体的な役割確定後に設定 |
| 中 | 最新版の配信と古いタブへの通知・再読込 | 公開前技術設計 | Vercelの静的配信とIndexedDBを分離し、現行公式情報が即反映されると保証しない |
| 中 | 対応ブラウザ、テストライブラリ、ルーティング、CSS・状態管理 | 開発前技術確認 | [ADR-001](ADR_001_TECH_STACK_ADOPTED.md)の周辺技術は提案であり採用決定ではない |
| 低 | 細かな見た目、タイトル編集、色と余白 | UI完成段階 | アクセシビリティ・利用者テストで決める |

## 3. 仕様上の矛盾を防ぐための優先原則

1. **ADRが明示採用した決定が、古い草案の「未決」「別案」より優先**する。履歴ファイルの表は比較時点の記述。
2. `not_applicable`（本人の進捗）、`applicability=no`（判定結果）、`needsRecheck`（再確認）は別状態。
3. P01〜P12は全体像を保持し、P1が複数ある場合も残りの重要タスクを隠さない。
4. 「物理会場なし」はオンライン専用の保証ではなく、屋外等の使用条件も不要と断定しない。
5. 公式出典は**公的根拠の確認先**であって、アプリに許可申請・予約・会場空き判定はない。
6. U02初回途中はブラウザDBに下書き保存しない。U03の進捗は自動保存、U04の条件変更は明示反映が基本。
7. 技術的に未実装の試験表を「合格」や「確認済み」と表示しない。

## 4. 開発着手前の実施順（実装はしない）

1. **公式情報・旧タブ・ブラウザとバックアップ両機能までADR-010〜015で確定済み**。次は[STEP7-⑭](STEP7_14_RESTORED_EVENT_METADATA_OPTIONS.md)で復元イベントのrevision初期値・日時・由来の保存方針を選ぶ。
2. 公式出典の既存登録内容と画面表示条件・最新版照合のチェックリストをレビューする。
3. P01〜P12の全条件を採用済み・仮説・対象外に仕分け、推奨案を実装前に確認。
4. EventRecordの正規化とDexie移行・削除・競合・多タブの設計上の境界を凍結する。
5. U01〜U04のUI文言・入力バリデーション・アクセシビリティ・テスト期待値の統合レビュー。
6. チーム割当と公開前の公式出典運用、Vercel条件確認、利用者による中心価値の検証計画を策定。

**現状：STEP7は設計レビュー段階。決定済みのMVPを変更せず、プログラム実装はまだ行わない。**

## 5. 出典状態と本人進捗の切り分け（ADR-010以降）

出典の`verified / needs_review / suspended / retired`と本人の`not_started / in_progress / completed / not_applicable`および`needsRecheck`は別の次元。[出典有効状態契約草案](STEP7_03_SOURCE_EFFECTIVE_STATUS_CONTRACT.md)で、期限超過してもP01〜P12の一般準備プランを維持し、本人進捗を書き換えない設計を確認。月内の期限日は未決。

## 6. ADR-011と出典配信方式の分離

月次点検は**各月末日JSTまで**、未完了なら翌月1日00:00から該当する施設固有断定を停止する。[ADR-011](ADR_011_MONTH_END_SOURCE_REVIEW_DEADLINE.md)。出典カタログの`reviewedMonth/checkedAt/reviewedAt`と本人のIndexedDB EventRecordを別管理し、出典失効だけで本人の完了・対象外を変更しない。**出典が再検証された後に古いタブへどう反映するかは未決**。[STEP7-④](STEP7_04_SOURCE_UPDATE_DELIVERY_OPTIONS.md)にA/B/C比較を用意した。コード・試験は未実施。

## 7. ADR-012採用後の実装前境界

公式出典はビルドに同梱するため、別サーバーAPIを前提にしない。月境界・タブ復帰では現在読み込まれた出典の有効状態を評価し、新しい`verified`状態は新版アプリを読み込んだ場合のみ適用する。**U02・U04未保存入力を強制再読み込みで破棄しない**ことを最優先とし、[旧タブ更新UXのA/B/C比較](STEP7_05_OLD_TAB_UPDATE_CHOICES.md)を用意。その他の残件（P01〜P12全条件、schemaVersion移行、Intl.Segmenter対応、実際の公式出典照合、チーム担当者割当）は継続。動作試験・実装は未着手。

## 8. ADR-013後に整理した残件

**確定**：軽量buildIdの自動照合、本人による明示再読込、U02/U04未保存入力とU03保存中のデータ保護、出典本文別取得なし。[ADR-013](ADR_013_MANUAL_REFRESH_ON_AUTO_VERSION_DETECTION.md)。

**追加の技術レビュー**：[STEP7-⑥ schemaVersionと旧タブ・複数タブの保存保護](STEP7_06_SCHEMA_AND_OLD_TAB_SAFETY_REVIEW.md)。旧版が未知schemaを上書きしない、更新とイベント削除を混同しない、ルール版とカタログ版を区別する。

**次の利用者選択**：[STEP7-⑦ 対応ブラウザ範囲](STEP7_07_BROWSER_SUPPORT_OPTIONS.md)。推奨AはPC・スマートフォンの主要ブラウザ現行版を検証対象にする。細かなバージョン番号は実機試験後。ルールP01〜P12の未承認部分、公式原出典の最新版確認、運用担当者の割当、文字数の実際のUnicode分割・端末時計の検証は引き続き必要。**設計のみ、実装・試験未実施**。

## 9. ADR-014採用後の整理

PC・スマホの主要現行Chrome、Edge、Safari、Firefoxを検証対象に正式採用（[ADR-014](ADR_014_MAJOR_DESKTOP_MOBILE_BROWSER_SUPPORT.md)）。**検証対象決定≠実機テスト合格**。書記素100/500字、IME、同一オリジンのIndexedDB、別タブの競合、旧タブbuildId更新とJST月末境界の実行テスト計画は[STEP7-⑧](STEP7_08_BROWSER_COMPATIBILITY_TEST_MATRIX.md)に整理した。実機OS・ブラウザの最低対応版、詳細なUnicode・ストレージ制限、移行実装は未決。

**次の利用者の製品判断**：[STEP7-⑨](STEP7_09_BACKUP_SCOPE_OPTIONS.md)でローカル保存データのエクスポート＋インポート、エクスポートのみ、MVPではバックアップなしの3案を比較。保存消去リスクと開発工数のトレードオフがあるため、本人の決定前に新機能を正式採用しない。

## 10. ADR-015によるMVP変更と復元安全性

[ADR-015](ADR_015_JSON_BACKUP_EXPORT_IMPORT.md)で**JSONエクスポート＋インポートをMVPに正式追加**。以前のSTEP4-⑫「ファイル入出力はMVP外」は変更済み。基本6問、P01〜P12、U01〜U04は維持。U01の補助導線から保存済みイベント入力と本人進捗のみをバックアップする。公式出典カタログ、未保存U02/U04ドラフトはバックアップ対象にしない。

**重要な未決**：[STEP7-⑩ 復元時のeventId衝突解決](STEP7_10_BACKUP_IMPORT_CONFLICT_OPTIONS.md)。推薦Aは衝突したイベントを別IDで複製し、既存データを保護する案。[STEP7-⑪ 復元安全契約草案](STEP7_11_BACKUP_SAFETY_CONTRACT_DRAFT.md)にスキーマ検証、サイズ上限、原子的保存、競合と旧空き家JSONの拒否を整理。**実装・試験・配信は未実施**。

## 11. ADR-016正式決定後の残件

既存イベントと同一eventIdのバックアップは**バックアップ側を新IDの別イベントとして追加し、既存イベントの入力／進捗／revisionは不変**。[ADR-016](ADR_016_IMPORT_COLLISION_AS_COPY.md)。ファイル内ID重複は全件拒否。復元前に件数とコピー件数を表示し、保存時の衝突分類がプレビュー時と違えば再プレビュー・本人承認が必要。保存はDexieの一括トランザクションを設計し、全件成功か全件失敗を実装前の受入条件とする。

**残件**：[STEP7-⑫ 繰返しインポートの処理](STEP7_12_REPEAT_IMPORT_OPTIONS.md)が次の利用者判断。[STEP7-⑬ ID/revision/日時/原子的保存の技術細則](STEP7_13_IMPORT_METADATA_AND_TRANSACTION_DRAFT.md)は未確定値を区別してレビュー。公式出典の現在条件、P01〜P12の各種細則、実際の高岡市公式原ページ確認、ブラウザ実機試験も残る。**コード実装・試験・デプロイなし**。

## 12. ADR-017繰返し復元後の仕様整理

**A案を正式採用**：同じJSONの再取込みは制限せず、ファイルハッシュ／取込み履歴の管理をMVPに追加しない。復元するたびに追加件数・別IDコピー件数とコピー増加の注意を表示し、本人が明示確定するまでDBを変更しない。ファイル内の同一eventId重複は拒否し、既存DBとの衝突はADR-016に従い新IDで別コピーにする。書込時点の衝突分類がプレビューと異なるときは再承認。**成功／失敗は全件単位**。[ADR-017](ADR_017_REPEAT_IMPORT_WITH_CONFIRMATION.md)。

**次の判断**：[STEP7-⑭ 復元したイベントのrevision・日時・由来の保存方法](STEP7_14_RESTORED_EVENT_METADATA_OPTIONS.md)。推奨A：新revision=1、復元時の日時を新レコード時刻にし、元の日時を由来として保持。なお、**これは未承認のデータ設計案**。その他の残件としてファイル最大容量・件数、受け入れる過去schemaの版範囲、ID生成方法、保存競合の実機試験、ルールP01〜P12の詳細検証、公式原資料の再照合がある。**コード実装なし**。
