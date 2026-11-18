# STEP11-②｜親タスクの再確認条件・理由コード完全レビュー案 v0.5
2026-11-18。**設計のみ。** ADR-004/005/026/028/031の正式決定を守る。次の文字列は**初版に採用するための候補**であり、既存のpriority表示理由とは別。実装・実行テストは未実施。

## 1. 記録の意味
- 進捗`status`：本人が過去に選んだ状態。`not_started|in_progress|completed|not_applicable`。
- `needsRecheck`：以前の完了/本人対象外等の判断の**前提が変わり、再確認が必要**という別軸。statusを自動で未着手に戻さない。
- `recheckReasonCodes`：再確認が必要な変更の**根拠**を列挙。保存する値の候補を固定した表。英語のpriority理由コード`AUDIENCE_INCLUDES_MINORS`等とは別。
- ルール上の`applicable=no|needs_information`、priority P1〜P3、公式資料の鮮度は**導出値**であり本人のstatusを書き換えない。
- `clearRecheck`は本人明示操作、CAS成功後のみ`needsRecheck=false,recheckReasonCodes=[]`。失敗時は保存前の値とUIを区別。

## 2. 提案する永続理由コード8種類（文字列は正式採用前）
| code候補 | 変更の起点 | 再確認対象の**候補** | やってはいけないこと |
|---|---|---|---|
| RECHECK_EVENT_TYPE_CHANGED | eventType | P01,P06,P09,P10 | 変更しただけで全候補を一律再確認 |
| RECHECK_AUDIENCE_CHANGED | audience | P02,P05,P11 | 未成年か法的な義務を自動認定 |
| RECHECK_DATE_CHANGED | date.kind/value | P03,P06,P10,P11,P12 | 月のみを特定日とみなす |
| RECHECK_ORGANIZER_CHANGED | organizerForm/responsible | P04,P05,P06 | soloを責任者確定とみなす |
| RECHECK_VENUE_CHANGED | venueStatus/region/venueCategory/facilityUsersAge/venueNameMemo | P07,P08,P09,P11,P12 | 旧施設の出典を継続流用 |
| RECHECK_EQUIPMENT_CHANGED | equipmentNeed/categories | P07,P09 | 未回答を不要と確定 |
| RECHECK_ATTENDEE_COUNT_CHANGED | attendeeCount | P02,P05,P07,P09 | 人数だけで必要人員算出 |
| RECHECK_OFFICIAL_SOURCE_CHANGED | 該当する出典の版・対象・失効 | 関係するP07,P08,P09 | 無関係タスクの一律再確認 |

### 再確認の導出を曖昧にしない判定手順（レビュー案）
1. U04の編集**確定保存**前に、旧入力・新入力を正規化し意味のある変更を抽出。草稿中はDB不変。
2. 変更フィールドが依存する親タスク候補を表から抽出。この時点では`needsRecheck`を立てない。
3. **そのタスクに以前の確認状態があるか**を評価する。既存progressが存在しない/未着手の場合は、無条件に「以前の判断をやり直す」とは扱わず一般案内。
4. 過去の状態`completed`または`not_applicable`などで、確認した前提が具体的に変わった場合に限り再確認を付与。すでにneedsRecheckなら理由を重複させず併合する。未変更タスクの進捗や理由を触らない。
5. **元の確認内容が保存されておらず影響判定不能**な場合は「変化した可能性」をUIで説明できるようにし、本人に確認を促す設計案。自動確定の網羅率は実装前に確認が必要。
6. 構造的に無関係なタスク（例：audience変更でP01）は一切変更しない。
7. 同一Dexieトランザクション内でexpectedRevision CAS成功後のみ新入力/影響progress/revision/updatedAtをコミット。失敗時は旧入力・進捗保持。
8. 出典カタログの月末期限到来**だけ**では本人の完了やrevisionを自動変更しない。該当出典の断定を停止。実際の版改定に起因する再確認は対象条件と以前の確認との対応をレビューして判定。

**重要な技術的未決**：本人が何を確認したかを細かく保存しない（ADR-031）ため、履歴情報だけでは上記4の「前提が具体的に変わった」を常に確実に判断できない。特に`venueNameMemo`は自由文で施設IDではない。自動再確認の範囲を広げるか、本人に「確認してほしい理由」として注意を出すかは、誤通知と見落としのトレードオフ。**無根拠に精度100%と宣言しない**。

## 3. 子チェック削除の影響
- `checkedItemIds`は正規EventRecord/JSON v1に**存在しない**。
- `clearRecheck`コマンドの対象は親statusと再確認情報だけ。旧文書にある「checkedItemIdsを保持」は初期MVPでは対象物なし。
- 再確認理由コードは子チェックIDではない。採用されたとしても本人の子操作は作らない。
- 参加D00〜02の`VERIFY_STATUS`等は**別ドメインの公開活動の表示判定**。主催側の永続`RECHECK_*`を流用しない。

## 4. 親進捗の固定受入ケース（期待値のみ、全件not_run）
| case | 事前 | 操作 | 期待 |
|---|---|---|---|
| RCH-01 | P05 completed,false | audience adults→minors、以前の安全確認が成人前提 | P05 completed,true＋AUDIENCE_CHANGED候補。新priorityはP1 |
| RCH-02 | P01 completed,false | audienceだけ変化 | P01はcompleted,falseのまま |
| RCH-03 | P08 not_applicable,false | 地域/施設が変更、以前の対象外判断が旧施設前提 | status維持、needsRecheck=true候補。P08 P2不変 |
| RCH-04 | P03未登録 | date未定→月 | P03自動完了/再確認ではなく、現在priorityを再導出 |
| RCH-05 | P05 completed,true＋既存理由 | さらに独立した影響する前提が変更 | 既存status/理由を消さず、重複なしで新理由追加候補 |
| RCH-06 | P08 completed,true | 本人が明示解除しCAS成功 | P08 completed,false、recheckReasonCodes=[] |
| RCH-07 | P08 completed,true | 別タブによりexpectedRevision不一致 | 旧保存値不変、解除成功と表示しない |
| RCH-08 | P08 completed,false | 出典月末点検失効 | 施設固有断定停止、本人progress/revisionは変えない |
| RCH-09 | P07 completed,false | no_physical_venueへ変更 | 親を自動非該当とせず一般確認、関連する以前の会場確認は再確認対象候補 |
| RCH-10 | 参加カタログの募集が更新 | 参加D02閲覧 | 主催progress/revisionに変更なし |

## 5. レビューで選ぶべき最小の判断
- 8種類の保存コードをversion1の正規値として採用するか。それとも再確認理由は**短い列挙＋説明文導出**に縮小するか。
- 影響判断ができないとき、既存完了への要再確認を**控えめに**付けるか、本人への明示確認に倒すか。
- `needsRecheck=true`で理由配列が空になる過去レコードを初版v1で許容するか（初版の生成では作らない方針推奨）。未知コードの黙った削除はしない。

技術リテラルのレビュー・人の確認前に「確定enum」と表現しないこと。
