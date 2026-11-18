# STEP12-①｜実装前の技術仕様一本化・暫定凍結候補（2026-11-19）

**状態：設計レビュー用の一本化案。ADR-001〜031は正式決定、以下の未採用技術値を自動的にADR化しない。**
対象は富山地域活動「参加D00〜D02＋企画U01〜U04」。旧空き家案は含めない。**実装・テスト実行・CI・デプロイ・外部連絡なし。**

## 0. 必ず守る不変条件
- ADR-030：富山の活動を探す・初参加の判断を助ける参加側、基本6問→P01〜12の準備順位・進捗を示す主催側。データを混ぜない。
- ADR-031：子チェックを不採用。`checkedItemIds`は**初回v1ではキー自体を持たない**。過去の「24子ID案」は履歴のみ。
- P05=未成年・両方のときP1、成人・未定はP2。P08=P2、施設出典でP1自動昇格なし。P01/02/03/04/07/09の限定P2、P06/10/11/12=P3、同優先度なら親ID順。
- 本人statusと`needsRecheck`は独立。明示解除+C​​AS成功時のみfalse/理由空、親status保持。出典期限だけで本人の完了を消さない。
- JSONバックアップはformatId`toyama-community-event-prep-backup`、version1、100件・2MiB。参加公開カタログは含めない。

## 1. 残る技術値：比較ではなく推奨案を1つに絞る
| 対象 | 実装着手前の推奨値 | 選定理由 | 状態 |
|---|---|---|---|
| イベント説明キー | `input.optionalDescription?` | 既存DATA_DESIGN_V1の型と一致。eventDescriptionは画面/過去文書の意味上の別名 | 人のレビュー待ち |
| 取込由来 | `importedFrom?={originalEventId,originalCreatedAt,originalUpdatedAt,importedAt}` | ADR-018の「直接元のみ」を4つで表す。再帰的な由来チェーンなし | 人のレビュー待ち |
| 親進捗形状 | `{taskId,status,needsRecheck,recheckReasonCodes,updatedAt}` | ADR-031の子項目削除と整合 | 親の意味は採用済み、完全型レビュー待ち |
| 設備カテゴリ | 初回は4カテゴリ`tables_chairs/audio_visual/power_internet/other`を推奨 | 小規模イベントで扱いやすい。自由記述の分類を推定しない | **案**。既存UI入力との照合必須 |
| 設備の「必要」 | `equipmentNeed=answered/yes`を唯一のP09=P2条件 | カテゴリ未選択でもP2（ADR-028） | 正式採用済み |
| 保存再確認理由 | `RECHECK_EVENT_TYPE_CHANGED/AUDIENCE_CHANGED/DATE_CHANGED/ORGANIZER_CHANGED/VENUE_CHANGED/EQUIPMENT_CHANGED/ATTENDEE_COUNT_CHANGED/OFFICIAL_SOURCE_CHANGED` | 入力変更の起点と地域出典を8種類で区別 | **候補**、正式enumレビュー待ち |
| 参加分類 | 初回5分野`children_education/community/culture_crafts/environment/other` | 高岡周辺の活動を無理なく整理 | **候補**、二人目レビュー待ち |
| 出典期限 | **参加側の「現在募集中」は無条件に保証しない**。人が確認した事実と確認日時を表示し公式へ誘導 | 24時間・7日を勝手に「参加可能保証」へ変換しない | 安全側の推奨案 |
| 静的カタログ | 活動の個別URL、公開主体、確認日、分野・地域、根拠付き各項目、掲載停止状態、版ID | ログイン/バックエンドなしで運用負担最小 | ADR-030範囲は決定済み、詳細はレビュー待ち |

### 再確認ロジックでの注意（未採用技術方針）
1. 入力差分が依存表に当たるだけで親12件へ一斉に`needsRecheck`を付けない。
2. **親のみ進捗**では「以前本人が確認した細部」が保存されず、本人の判断前提に影響したか厳密には証明できない場合がある。
3. 保存済み`completed/not_applicable`で重要な入力差分が起きた場合、関係する親に限って「変更が影響する可能性」を知らせる保守案を優先し、自動で完了を取消さない。実際のneedsRecheck更新条件は人のレビューで確定。
4. `needsRecheck=true`と空の理由配列は新規生成しない案を推奨。ただし既存/破損データを黙って変えない。判定と修復の責務を区別。
5. `recheckReasonCodes`は保存用、P01〜12のpriorityReasonCodesは表示用。両者を混ぜない。

## 2. JSON v1のフィールド契約（コードではない）
- Root: `formatId/exportSchemaVersion/exportedAt/sourceBuildId/eventCount/events`を必須。rootにeventSchemaVersionは追加しない。
- EventRecord: `eventId/schemaVersion/rulesVersionAtLastReview/revision/createdAt/updatedAt/input/progressByTask`を必須。取込由来`importedFrom`は任意。
- EventInput必須6: `eventType/audience/date/venueStatus/region/organizerForm`。任意回答は`Known<T>`の`unanswered/undecided/answered(value)`。型上必須でもUIの入力強制とは異なる。
- EventInputの任意メモ`venueNameMemo,optionalDescription`は任意。書記素/byte双方の既存上限。仮の余分なフィールドを保存しない。
- ParentProgress: `taskId/status/needsRecheck/recheckReasonCodes/updatedAt`。未操作の親は`progressByTask`に無くてよく、UIでは未着手に導出。親keyとtaskId一致、unknown taskIdを拒否。
- **厳密な物理スキーマの生成、重複JSONキーを拒否する実パーサ方式、サンプルfixtureの実証は未実施**。`JSON.parse`のみでオブジェクト重複キーが検出できると主張しない。
- インポートは物理2MiBの検査→形式/版/全件型・意味検証→本人プレビュー→原子的追加。ファイルに旧`checkedItemIds`があったら無言削除せず非対応として拒否。
- 日付（JST含む）は実在日時/オフセットを確認。未来の有効日時は既存ADRの本人警告、過去の開催日は通常保存可。
- 差分保存はCASで対象親のみ。旧入力の文字数上限違反でもU03進捗が勝手に更新不能にならないようADR-025/026を守る。

## 3. レビューの短い順番
1. A/C：親保存型、8再確認コード候補、設備4分類、optionalDescription、importedFrom、strict JSON required/optionalを読み合わせ。異論があれば**リテラルと根拠を残す**。
2. B/D：参加の5分類・D02根拠/未確認文言、掲載候補を一次URLでレビュー。個別募集が無い索引は案内先に降格。
3. A/B/C/D：同一入力でP05/P08/P09/参加の未確認表示が説明できるかの**机上レビュー**。実行結果としてPASSは付けない。
4. ユーザー：人によるレビューで未決が解消してから、仕様の最終承認と実装開始の許可（今回求めているわけではない）。

## 4. 参考・最新版の位置
- [ADR-031](ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md)
- [主催JSON保存](STEP11_01_PARENT_ONLY_EVENT_RECORD_BACKUP_CONTRACT_20261118.md)
- [再確認](STEP11_02_PARENT_RECHECK_CODE_AND_TRANSITION_CONTRACT_20261118.md)
- [参加出典と一歩](STEP11_03_PARTICIPATION_PUBLISHING_AND_NEXT_ACTION_CONTRACT_20261118.md)
- [実装開始ゲート](STEP11_04_FINAL_PREIMPLEMENTATION_GATE_20261118.md)

**ここまでで技術値の候補は一本化。新しいADRの採用・実装許可・実行PASSではない。**
