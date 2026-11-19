# STEP26｜保存・編集・再確認の状態遷移表（実装前）

2026-11-19。**期待動作の設計**。ADR-004/005/025/026/031/032が優先。実装・状態遷移テストはnot_run。

## 1. U02新規保存

| 状態 | 操作/条件 | 次状態 | 保存された値 |
|---|---|---|---|
| `editing` | 基本6問入力、任意回答未回答 | `editing` | DB変更なし |
| `editing` | 保存開始、形式検証OK | `saving` | DB変更なし |
| `saving` | DのcreateEventが成功 | `saved`→U03 | 新規EventRecord、revision1、progressByTask空 |
| `saving` | 不正入力/容量/IndexedDB不可 | `error`→`editing` | DB不変、草稿保持 |
| `saving` | 二重送信 | `saving` | 二重作成しない |

## 2. U03親進捗と明示再確認解除

| 現在 | 操作 | 結果 |
|---|---|---|
| 未登録親 | 本人が進捗選択 | 対象親のParentTaskProgressを生成、revision+1 |
| completed,false | U04で関係する条件が変わる | completed,true＋理由（関係親のみ） |
| completed,true | 本人が「確認済み」を明示 | completed,false＋理由[]、CAS成功時のみ |
| not_applicable,false | 条件変更で以前の対象外判断に影響 | not_applicable,true、statusを維持 |
| 全ステータス | 別タブが先に保存しCAS不一致 | conflictを表示、旧DB不変、黙って再試行/上書きしない |
| 親未登録 | 出典情報の期限だけ切れる | 当該出典表示の断定を停止。本人レコードとrevision不変 |

`needsRecheck`は本人の過去の確認と、**実際に影響しうる条件変更の関係を示す目印**。行政適合・施設利用可否の法的判定ではない。理由コードはSTEP11-②を上限候補表とし、関連しないP01〜12への一斉フラグ禁止。

## 3. U04編集

1. 最新の`EventRecord`を読取、編集ドラフトを分けて作成。元recordは不変。
2. 変更がない場合は保存不要とし、無意味なrevision増加を避ける。
3. 保存操作時に差分・入力検証・影響親を特定。対象親の既存statusを保持。
4. Dへ`saveEventInput(eventId,newInput,expectedRevision)`。成功なら入力＋影響進捗＋revision+1を**単一トランザクション**。
5. 競合なら元のドラフトを消さず、最新保存値と今回の変更を利用者が確認できるようにする。
6. 保存失敗・画面からのキャンセルは元DB不変。既に成功した操作まで巻戻すと誤説明しない。

## 4. JSON復元の状態と中断
`idle→reading→validating→preview→awaiting_confirmation→importing→success`
- `reading/validating`で容量・型・重複キー等の不正を検出したら`rejected`、既存DB不変。
- `preview`の本人キャンセルなら終了。無断追加なし。
- `importing`中にDBが変化/保存失敗なら`conflict/error`、全件追加を取り消す。
- 成功した場合だけ追加件数と新しいIDを案内する。重複IDでも既存の記録を上書きしない。

## 5. 机上受入ケース（全件not_run）
- STATE-01 U02作成失敗で入力保持、U03へ進まない。
- STATE-02 U03既完了P05に対象変更→status維持/理由コード追加。
- STATE-03 P01に無関係なaudience変更→進捗不変。
- STATE-04 P08施設出典の期限到来のみ→priority P2、本人progress/revision不変。
- STATE-05 2つのタブで同時更新→片方CAS失敗。
- STATE-06 U04キャンセル/同条件保存→データ無変更。
- STATE-07 JSON不正1件でプレビュー成功にしない。
- STATE-08 JSONプレビュー後に保存状況が変化→必要時は再プレビュー、部分取込なし。
