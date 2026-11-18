# 実装前｜固定シナリオと受入期待値（実行なし／2026-11-18）

**全件status=`not_run`。** これはコードではなく、4人がAIに実装依頼するときに同じ入力と同じ期待結果を使うための設計資料。正式根拠：ADR-002/003/004/005/006/007/008/024/025/026/027/028/029。旧空き家案を使用しない。判定優先度は法的義務・安全判定ではない。

## 1. 共通の初期入力（説明用）

以下は**概念上の完全な6問セット**で、保存済みEventRecordのフィクスチャファイルを作成したものではない。

| ケース | eventType | audience | input.date | venueStatus | region | organizerForm | 任意 |
|---|---|---|---|---|---|---|---|
| CASE-A | workshop | minors | `{kind:undecided}` | undecided | takaoka | solo | responsible=unanswered、equipmentNeed=unanswered |
| CASE-B | lecture | adults | `{kind:month,value:2027-02}` | candidate | takaoka | group | responsible=unanswered、equipmentNeed=unanswered |
| CASE-C | other | undecided | `{kind:date,value:2027-02-12}` | confirmed | toyama_other | undecided | responsible=answered/not_decided、equipmentNeed=answered/yes、equipmentCategories=[] |
| CASE-D | exchange | both | `{kind:date,value:2027-02-12}` | no_physical_venue | undecided | group | responsible=answered/decided、equipmentNeed=answered/none_identified |
| CASE-E | workshop | adults | `{kind:date,value:2024-02-29}` | confirmed | takaoka | solo | responsible=undecided、equipmentNeed=undecided |

任意`Known`の記載：`unanswered`は`{kind:"unanswered"}`、`undecided`は`{kind:"undecided"}`、`answered/not_decided`は`{kind:"answered",value:"not_decided"}`など。残る任意入力は規定の未回答/空欄を用いる前提だが、**厳密な保存JSONはDESIGN-01完了後**に固定する。

## 2. 具体的な期待優先度（全12タスク、設計上の演算結果）

| Task | CASE-A | CASE-B | CASE-C | CASE-D | CASE-E |
|---|---|---|---|---|---|
| P01 | P3 | P3 | **P2** | P3 | P3 |
| P02 | P3 | P3 | **P2** | P3 | P3 |
| P03 | **P2** | **P2** | P3 | P3 | P3 |
| P04 | P3 | P3 | **P2** | P3 | **P2** |
| P05 | **P1** | **P2** | **P2** | **P1** | **P2** |
| P06 | P3 | P3 | P3 | P3 | P3 |
| P07 | **P2** | **P2** | P3 | P3 | P3 |
| P08 | **P2** | **P2** | **P2** | **P2** | **P2** |
| P09 | P3 | P3 | **P2** | P3 | P3 |
| P10 | P3 | P3 | P3 | P3 | P3 |
| P11 | P3 | P3 | P3 | P3 | P3 |
| P12 | P3 | P3 | P3 | P3 | P3 |

条件：全タスクが未着手、`needsRecheck=false`、本人が対象外を設定していない。該当性が`no`となる建物専用子項目やその他の独立判定があればpriorityは既存出力契約に従って扱い、**この表は「親タスクの優先度ロジック」の検査用**とする。

- CASE-A：最優先代表はP05（P1）。残りP2はP03→P07→P08の順。過去日ではない。
- CASE-B：P1なし。最優先代表はP03（P2）、他P2はP05→P07→P08。
- CASE-C：P1なし。最優先代表はP01（P2）、P02→P04→P05→P08→P09が続く。会場確定は利用許可認定ではない。
- CASE-D：P05（P1）が代表。P07/P08/P09の**親applicability=needs_information**。建物専用子項目だけ非該当、P08親はP2。
- CASE-E：有効な過去日として**保存可・警告**（ADR-006）。`responsible.kind=undecided`でP04=P2。期間から他のpriorityを推測変更しない。

## 3. 変更・進捗・再確認シナリオ（全件not_run）

| ID | 前提と操作 | 期待 |
|---|---|---|
| STATE-01 | CASE-AのP05=completed, needsRecheck=false | P05の旧完了履歴を保持。代表候補から外す |
| STATE-02 | STATE-01でaudienceをminors→adultsにU04確定保存 | 影響タスクの再確認を既存依存ルールに従って判断。P05はP2へ導出するがstatusを自動初期化しない |
| STATE-03 | P05=completed, needsRecheck=true | 旧status完了を維持し、再確認を未解決候補へ戻す |
| STATE-04 | STATE-03で本人が「再確認を終えた」操作 | revision CAS成功後だけneedsRecheck=false。statusはcompletedのまま |
| STATE-05 | 進捗保存と別タブU04編集の競合 | 先着コミット以外はrevision conflict、遅い側が自動上書きしない |
| STATE-06 | 既存データが任意説明の旧上限超過 | U01/U03閲覧、U03独立CASは保護。U04保存は本人修正するまで拒否 |
| STATE-07 | U01でイベント削除後、古いタブが進捗保存 | NOT_FOUND、削除済みイベントをupsertしない |
| STATE-08 | U04で高岡市センター→別地域へ変更 | **保存成功した場合だけ**施設固有入力をADR-005に従い整理。旧進捗は保持 |

## 4. JSONバックアップシナリオ（全件not_run）

| ID | 入力・境界 | 期待 |
|---|---|---|
| BACK-01 | `formatId`がADR-029と不一致 | 全件拒否、DB不変 |
| BACK-02 | `exportSchemaVersion=2`の未知将来版 | 全件拒否、互換を推測しない |
| BACK-03 | `input.date`ではなく`schedule`のみ | 未定義旧版として拒否、日付を補完しない |
| BACK-04 | `eventCount=101` | 全件拒否 |
| BACK-05 | ファイル実バイト=2,097,153 | パース前に全件拒否 |
| BACK-06 | `events.length=1`, `eventCount=0` | 全件拒否 |
| BACK-07 | ファイル内部でeventId重複 | 全件拒否 |
| BACK-08 | 既存DBのeventIdに衝突 | 本人承認後に別IDで追加、revision1、既存不変 |
| BACK-09 | 同一ファイルの繰返し取込 | 毎回プレビュー＋本人承認。黙って自動追加しない |
| BACK-10 | 無効日時、過去と未来の順序逆転 | 全件拒否。実在する未来の正常日時は警告＋明示同意 |
| BACK-11 | 途中で容量不足、別タブ更新で衝突分類が変更 | 全件ロールバック／再プレビュー、保存済みを偽らない |
| BACK-12 | 書出しで選択0件 | 書出し不可。読込可能な空バックアップとの違いを説明 |
| BACK-13 | 不正な子チェックID・未知タスクID | 未知の値を勝手に捨てず拒否。許容IDの完全表は未固定 |
| BACK-14 | 文字数上限だけ／UTF-8バイト上限だけ超過 | どちらも全件拒否、切詰めなし |

## 5. 記録用フォーマット（人間が実装後に記入する）

```text
caseId:
仕様版 / commit:
input / setup:
expected:
actual: （実行まで空欄）
status: not_run
environment / browser:
reviewer:
evidence:
issue:
```

**未解消**：詳細な`checkedItemIds/equipmentCategories/recheckReasonCodes`の許容値、`optionalDescription/importedFrom`の最終スキーマ、機械可読フィクスチャ・実行結果・レビュアー承認。実装許可前に`PASS`へ更新しない。
