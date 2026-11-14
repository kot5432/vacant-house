> **決定後追記：月末締切A案は[ADR-011](ADR_011_MONTH_END_SOURCE_REVIEW_DEADLINE.md)として採用済み。以下の「期限算定未決」記述は以前の技術検討時点のものです。**

# STEP7-③｜公式情報の状態・期限判定・保存進捗の境界 v0.1

作成：2026-11-15。**状態：実装前の技術設計案**。採用済み運用方針は[ADR-009](ADR_009_OFFICIAL_SOURCE_MONTHLY_RELEASE_REVIEWS.md)（月1回＋毎本番リリース前）、[ADR-010](ADR_010_STALE_SOURCE_FAIL_CLOSED.md)（予定期限超過時に猶予なく施設固有断定停止）。**期限日そのものは[STEP7-②](STEP7_02_SOURCE_REVIEW_DUE_DATE_OPTIONS.md)で比較中、未承認**。現行地域イベント準備支援アプリのみ対象。コード・試験・公開なし。

## 1. 本人のイベントデータと公式出典を別管理

| 領域 | 代表フィールド | 保持場所（提案） | 原則 |
|---|---|---|---|
| EventRecord | eventId, input, progressByTask, revision, rulesVersionAtLastReview | IndexedDB/Dexie | 本人の入力・完了・対象外を保持し、出典失効だけで進捗を書き換えない |
| SourceRecord | sourceId, sourceRevision, officialUrl, facilityScope, checkedAt, status, reviewDueDate, verifiedBy/reviewedBy | アプリに同梱する版付き読み取り専用台帳 | 出典の状態・適用先・点検期限を管理。利用者入力を原ページへ送らない |
| Source effective state | sourceId, effectiveStatus, reasonCodes | 画面/ルールへの計算出力 | base statusと期限・適用条件から導出。永続保存済み進捗と区別 |
| TaskEvaluation | P01〜P12, applicability, priority, reason, needsRecheck | 現在条件＋進捗＋ルール／出典版から計算 | 出典失効・該当外は公式の断定だけ無効化。全タスクを消さない |

## 2. 判定順序（暫定）

1. 利用者入力と既存EventRecordを検証。
2. 出典台帳の状態が`verified`でないなら、施設固有の断定を表示しない。
3. 点検期限が定義済みで、**選択した期限算定方法**に基づく期限を過ぎ、必要なレビューが完了していなければ`needs_review`相当に降格。期限が不明なら**「期限内」と推測しない**。
4. 期限内の出典でも、現在の地域、施設カテゴリ、会場状態、施設利用者構成との適用条件を照合。対象外の場合は非表示。
5. 上記の全条件に合致する場合のみ、短い公式確認事項・原URL・最終確認日を提示。
6. 出典に変更があった場合は、関連タスクの**以前の確認前提が変わったか**を差分レビュー。再確認はADR-004の本人操作で解除。出典が見られないだけで本人の`progress.status`を`not_started`へ戻さない。

## 3. 具体的なデータメタデータ（スキーマは提案）

- `status: verified | needs_review | suspended | retired`
- `checkedAt`: 担当者が実際に原ページを開き該当箇所を確認した時刻。
- `reviewedAt`: 他のメンバーが適用先・表示文言をレビューした時刻。
- `reviewDueDate`: 月次点検予定期限。**ADR-010採用で期限に達した場合の停止は確定、日付の決め方は未決**。
- `sourceRevision`: 元資料と対応した台帳の版。運用上の点検日だけ更新した場合に版を増やすかは変更規則で決定する。
- `catalogVersion`: 配信された出典セットの版。表示中のコードと出典セットの整合を取る。
- `effectiveStatus`と`effectiveReason`は原則毎表示時に算出し、古い`verified`値だけを鵜呑みにしない。

## 4. 失効と公開後の限界

- 公式情報の点検期限の判定を**利用者端末の現在日時だけ**に依存すると、端末時計のずれ・旧版のコード・海外タイムゾーン・キャッシュなどの問題がある。
- 最小設計案：台帳の期限とタイムゾーンを明示し、画面表示時に出典の有効期限を再判定。更新された場合は新しい版を利用者へ案内する。旧タブの即時強制停止はMVPで保証しない。
- 最新版を配信するときのVercel Preview・本番の切り分けを維持し、出典データの欠落や破損時は施設固有断定を行わない。
- 公式出典リンクの確認自体は別作業。出典が失効したからといって架空の代替URLを生成しない。

## 5. モック（架空）を用いたレビューケース

| ID | 出典側 | 本人のP08 | 現行表示 |
|---|---|---|---|
| BOUND-01 | verified / 期限内 / 施設条件一致 | not_started | 対象出典と一般確認 |
| BOUND-02 | 期限超過 / 未点検 | completed | **施設固有断定停止、本人の完了は保持** |
| BOUND-03 | needs_review | not_applicable | 出典の断定停止、本人の対象外を勝手に戻さない |
| BOUND-04 | suspended | completed + needsRecheck | 出典停止、再確認は別のUI状態として保持 |
| BOUND-05 | verified / 期限内 / 別施設 | 任意 | 別施設の公式情報を流用しない |
| BOUND-06 | レビュー完了してverified復帰 | completed | 最新の版と本人条件を評価。古い完了を自動認定しない |
| BOUND-07 | 期限が欠落 | 任意 | 有効期限内と推測せず一般確認に留める（推奨技術細則） |

## 6. 次の決定への依存

1. 月次点検の**具体的な期限算定方法**の選択（[STEP7-②](STEP7_02_SOURCE_REVIEW_DUE_DATE_OPTIONS.md)）。
2. 出典担当／レビュー担当／月次確認日のチーム設定。
3. 公式ページの最新検証と正しい適用条件の再確認（[既存台帳](OFFICIAL_SOURCE_REGISTER.md)には2026-11-12時点の机上閲覧記録があるが、本書では実地再閲覧していない）。
4. 本番の古いタブに対する版更新検知や注意表示の技術設計。
5. P01〜P12の詳細理由文・ルール依存・schemaVersionの実装前レビュー。

**本書は仕様整合のための資料で、ソースコードや動作するデータベースは作成していない。**

## 8. 公式出典カタログの配信境界（ADR-012採用）

出典はアプリの**静的Viteビルドに同梱**し、専用APIや起動時の出典JSON別配信をMVPでは行わない。出典カタログとUIの`buildId/catalogVersion`を揃える。確認済み出典の再掲載は**新しいアプリ版の読み込み**が必要で、旧タブが新しいレビュー月を推定することはない。月末をまたいだ場合には、現在保持する出典メタデータをJSTで評価し直して期限超過を停止する。ブラウザ時計異常、非表示・スリープ中、旧タブの再読み込み通知は技術上の未決。[ADR-012](ADR_012_BUNDLED_OFFICIAL_SOURCE_CATALOG.md)。
