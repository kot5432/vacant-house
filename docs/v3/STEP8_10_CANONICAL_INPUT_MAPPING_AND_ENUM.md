# STEP8-⑩｜入力名・任意回答enumの正規化契約と優先度互換性（技術設計）

作成：2026-11-16。**設計のみ、実装・実行テスト・移行・デプロイなし**。現行地域イベント準備支援アプリ専用、旧空き家所有者・物件・マッチングは対象外。正式採用済みの[ADR-028](ADR_028_LIMITED_P2_PRIORITY_BY_EXISTING_INPUTS.md)の**意味を変更しないための技術的な照合**。

## 1. 実際の型を照合して判明した不整合

[DATA_DESIGN_V1.md](DATA_DESIGN_V1.md)の`EventInput`サンプルは、開催時期の保存フィールドを **`date: DateAnswer`** としている。一方、[STEP6-②](STEP6_02_VALIDATION_CONTRACT.md)やADR-028は **`schedule.kind`** と表現している。これらを別の2問や2つの保存フィールドとして追加してはいけない。

- **現行データ設計での正規名候補は`input.date`**。表示・説明上の「開催時期（schedule）」を同じ回答の別名として扱い、入力は**一問だけ**。実装直前に命名を最終固定し、型・検証・JSON版・U02/U04画面で同じフィールドを使用する。
- この設計では**`input.date.kind=month | undecided`→P03=P2**、`date.kind=date`→P03=P3。ADR-028の`schedule.kind`は同じ開催時期を指す意味上の記述であり、別値は生成しない。
- JSONインポートで**未知の`schedule`と`date`の両方を推測的に受理しない**。対応が認定された既知旧版の明示的な移行でのみ別名を変換する（ADR-022）。
- 日付値は`{kind:date, value:YYYY-MM-DD}`、月は`{kind:month, value:YYYY-MM}`、未定は`{kind:undecided}`。月を`YYYY-MM-01`に変えない。

## 2. 既存任意入力の型とP2判定の一致

[DATA_DESIGN_V1.md](DATA_DESIGN_V1.md)の論理型（技術サンプル）に既存の値がある。

| 任意項目 | 既存の保存型案 | P2へ昇格する条件（ADR-028の意味） | P2にしない条件 |
|---|---|---|---|
| `responsible` | `Known<"decided" \| "not_decided">` | `{kind:"undecided"}` **または** `{kind:"answered",value:"not_decided"}` | `unanswered`または`answered/decided` |
| `equipmentNeed` | `Known<"yes" \| "none_identified">` | `{kind:"answered",value:"yes"}` | `unanswered`、`undecided`、`answered/none_identified` |

- `Known`の`kind=undecided`は本人が「まだ未定」と答えた状態、`unanswered`は未回答。**両者を同一視しない**。
- `responsible.answered/not_decided`は本人が責任者未決定と明示した答え。P04に利用できる。任意質問がなくても`organizerForm=undecided`ならP04=P2。
- `equipmentNeed.answered/none_identified`は「現時点で思いつかない」。**設備不要ではない**。設備カテゴリ配列が空でも、`equipmentNeed.answered/yes`はP09=P2。カテゴリ内容からP1へ昇格させない。
- `responsible`と`equipmentNeed`の列挙値は**新しいUI質問の追加ではない**。画面内日本語ラベルと保存値を対応付けるだけ。

## 3. P01〜P12正規化済み条件（文書間の共通参照）

| タスク | 正規化済みEventInputで判定する条件 | priority |
|---|---|---|
| P01 | `input.eventType==="other"` | 条件合致P2、その他P3 |
| P02 | `input.audience==="undecided"` | 条件合致P2、その他P3 |
| P03 | `input.date.kind==="month" \|\| "undecided"` | 条件合致P2、`date`はP3 |
| P04 | `input.organizerForm==="undecided"`、または上表の`responsible`明示未定 | 条件合致P2、その他P3 |
| P05 | `input.audience==="minors" \|\| "both"` | P1、`adults/undecided`はP2 |
| P06 | 条件なし | P3 |
| P07 | `input.venueStatus==="undecided" \|\| "candidate"` | 条件合致P2、その他P3 |
| P08 | 条件なし（施設出典一致でも自動P1へ変更しない） | P2基本 |
| P09 | `input.equipmentNeed.kind==="answered" && value==="yes"` | 条件合致P2、その他P3 |
| P10 | 条件なし | P3 |
| P11 | 条件なし | P3 |
| P12 | 条件なし | P3 |

※この条件表は論理設計で、実行コードではない。**該当性が`no`のタスクのpriorityは既存出力契約に従いnull**とする。物理会場なしのP07〜P09親は`needs_information`で一般確認を維持する。理由は本人の回答に基づき、期限・許可・必要備品を推測しない。

## 4. JSON・旧レコードの互換性境界

- `EventInput`の保存キーを`date`に統一するなら、`schemaVersion`とJSON`eventSchemaVersion`の受入契約もそれに一致させる。
- **未知のフィールドや二重定義を寛容に解釈しない**。既知旧版の移行は元形式検証→宣言された変換→現行形式再検証。読み取れない値や`date`と`schedule`の衝突を黙って上書きしない。
- この設計変更だけを理由に既存の保存済み進捗・`needsRecheck`・`revision`を変更しない。旧タブ・複数タブのCAS、JSON全件検証・本人承認・原子的追加はADR-015〜026による。

## 5. 追加予定の受入ケース（未実行）

| ID | 入力 | 期待 |
|---|---|---|
| NORM-01 | date.kind=month | P03=P2。月を1日として扱わない |
| NORM-02 | date.kind=date | P03=P3、過去の有効日は警告のみ |
| NORM-03 | responsible.kind=unanswered | organizerFormが未定でなければP04=P3 |
| NORM-04 | responsible.kind=undecided | P04=P2 |
| NORM-05 | responsible.answered/not_decided | P04=P2 |
| NORM-06 | responsible.answered/decided | organizerFormが未定でなければP04=P3 |
| NORM-07 | equipmentNeed.kind=undecided | P09=P3、設備不要と表示しない |
| NORM-08 | equipmentNeed.answered/yes / categories=[] | P09=P2、カテゴリを推測しない |
| NORM-09 | equipmentNeed.answered/none_identified | P09=P3、「不要」と断言しない |
| NORM-10 | 不明なJSONのscheduleキー／date・schedule併存 | 既知移行規則がない限り拒否、既存DB不変 |
| NORM-11 | no_physical_venue / equipmentNeed.yes | P09親はneeds_information・P2、建物子項目だけ非該当 |
| NORM-12 | U04入力編集→優先度変化 | 本人のprogress/revisionは保存処理以外で変更しない |

## 6. 未決の境界

**技術的な整合案**：既存の型サンプルに合わせて`input.date`／`responsible.not_decided`／`equipmentNeed.yes`を参照する。**新規ADRによる製品変更や実装済み宣言はしない**。初回リリースの固定JSONスキーマ名・版番号、入力キーの最終固定、移行テストデータ、実端末での動作は公開前に別途確定・検証する。入力質問自体やP1・P2の意味を変更する場合だけユーザー判断が必要。
