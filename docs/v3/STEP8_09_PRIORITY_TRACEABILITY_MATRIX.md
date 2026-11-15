# STEP8-⑨｜優先度条件とU03理由の追跡マトリクス（ADR-028後続の技術設計）

作成：2026-11-16。現行イベント準備支援Webアプリの**実装前設計**。新たな製品決定ではない。旧空き家案の機能なし。実装・テスト実行・デプロイなし。

## 1. 正本と判定順

優先度の正式決定は[ADR-028](ADR_028_LIMITED_P2_PRIORITY_BY_EXISTING_INPUTS.md)・[ADR-003](ADR_003_PRIORITY_RULES_ADOPTED.md)・[ADR-027](ADR_027_P08_P2_NO_FACILITY_AUTO_ESCALATION.md)。入力の正規化は[STEP6-②](STEP6_02_VALIDATION_CONTRACT.md)。検証は基本6問すべて有効である前提。任意の値は、**未回答／未定／回答済み**を混同しない。

1. 入力バリデーションと条件付き値の正規化
2. 既決の該当性（`yes/no/needs_information`）と必要な条件付き出典の評価（優先度のP1昇格には使用しない）
3. 下表のpriority導出
4. 本人進捗（`status`、`needsRecheck`）を合成
5. 未解決候補をP1→P2→P3／同順位taskId昇順で表示。本人の進捗レコードを順位計算で更新しない

## 2. 入力型・reasonCode・画面文言の追跡

| タスク | 値が実在する入力 | P2条件（P05/P08除く） | 仮reasonCode | 理由・一歩の短文候補 | 非条件時 |
|---|---|---|---|---|---|
| P01 | eventType | other | CONTENT_OTHER | 「活動内容を整理しよう」→体験内容を1文に | P3 |
| P02 | audience | undecided | AUDIENCE_UNDECIDED | 「参加対象を考えよう」→候補を書き出す | P3 |
| P03 | schedule.kind | month / undecided | SCHEDULE_MONTH_ONLY / SCHEDULE_UNDECIDED | 「候補日を考えよう」→予定を整理する | P3 |
| P04 | organizerForm / responsible | organizerForm=undecided、またはresponsibleの明示未定 | RESPONSIBLE_UNDECIDED | 「運営担当を整理しよう」→担当候補を考える | P3 |
| P05 | audience | minors/both→P1、adults/undecided→P2 | AUDIENCE_INCLUDES_MINORS 等 | 「参加者に合わせた見守りを確認」 | ADR-003 |
| P06 | なし | なし | RUN_OF_SHOW_GENERAL | 「当日の流れを考える」 | P3 |
| P07 | venueStatus | undecided / candidate | VENUE_UNDECIDED / VENUE_CANDIDATE | 「会場候補を確認」→候補・窓口を整理する | P3 |
| P08 | 施設条件等 | **P2基本** | FACILITY_CONDITIONS_CHECK | 「利用条件を公式情報で確認」 | ADR-027 |
| P09 | equipmentNeed | 本人が設備ありと明示回答 | EQUIPMENT_SPECIFIED | 「備品を確認」→使用可能な設備と持参品を照合する | P3 |
| P10 | なし | なし | ANNOUNCEMENT_GENERAL | 「告知の方法を考える」 | P3 |
| P11 | なし | なし | CONTACT_GENERAL | 「参加方法を整理する」 | P3 |
| P12 | なし | なし | FINAL_REVIEW_GENERAL | 「当日の確認事項を整理する」 | P3 |

**理由コードはまだ命名案**。正式に採用したのは入力条件とP1/P2/P3の対応。条件に一致しない場合に「設備不要」「責任者が決定済み」などを導出してはいけない。

## 3. 任意項目の保存値の統一（実装前の型詳細としての提案）

- `responsible`：`kind=unanswered`、`kind=undecided`、`kind=answered,value=undecided`など、既存仕様で意味が「まだ決定していない」と明示できる場合だけP04=P2。`kind=answered,value=decided`などはP3。**実際のenum名は既存型と統一するまでは仮**。
- `equipmentNeed`：`kind=answered`かつ「必要な設備あり」の値でP09=P2。`kind=undecided`、`kind=unanswered`、`kind=answered`で「現時点で思いつかない」ならP3。**任意設備カテゴリが空でも必要ありの回答を本人がした場合は、カテゴリを推測せず確認行動を示す**。
- 施設・参加対象・人数・開催時期から必要な行政手続きや保険の加入要否を計算しない。

## 4. UI状態とアクセシビリティの仕様案（新画面なし）

- U03上部に「最初に確認したいこと」カード：タスク名／優先度ラベル／選択された入力に基づく理由／次の一歩を同一領域に配置する。
- P1が複数の場合は代表以外のP1を、折りたたみを開かなければ存在に気づけない状態にしない。
- P2と本人の進捗`completed`は別表示。優先度は急な警告や行政義務を意味せず、文言は「先に確認すると準備しやすい」。
- `needsRecheck`が真なら、以前の完了を取り消さず「条件が変わったため再確認」と示す。
- 表示順・理由コード・P1件数はルールと進捗から再計算。ブラウザの再読込や公式出典更新で本人statusを自動変更しない。

## 5. ケース組み合わせと境界（期待値のみ）

| ID | ケース | 期待 |
|---|---|---|
| TRACE-01 | eventType=other、audience=undecided、schedule=month | P01/P02/P03=P2、P05=P2、ID順で代表P01 |
| TRACE-02 | audience=both、venueStatus=undecided | P05=P1、P07=P2、最優先代表P05 |
| TRACE-03 | venueStatus=no_physical_venue、equipmentNeed=未回答 | P07/P09親=needs_information・P3、P08親=needs_information・P2 |
| TRACE-04 | equipmentNeed=明示必要あり・venueStatus=no_physical_venue | P09親=needs_information・P2、建物専用子項目は非該当 |
| TRACE-05 | organizerForm=solo、responsible=未回答 | P04=P3、担当者決定と断定しない |
| TRACE-06 | organizerForm=solo、responsible=明示未定 | P04=P2 |
| TRACE-07 | attendeeCount=1001、audience=adults | P02=P3、P05=P2、人数警告は独立 |
| TRACE-08 | 地域交流センター対象一致・施設公式出典が有効 | P08=P2、出典を理由にP1にしない |
| TRACE-09 | P01=P2の完了／needsRecheck=false | P01を通常の未解決代表候補から外すが保存済み完了を保持 |
| TRACE-10 | P01の優先度変更でneedsRecheck=true | 進捗の完了履歴を保持、再確認項目として未解決候補へ |
| TRACE-11 | U04未保存の入力だけでタスクを見る | 永続化されていないドラフトによる既存イベントの進捗・priority更新なし |
| TRACE-12 | 同一入力・同一ルール版・同一出典・同一評価時刻 | P01〜P12の出力順と理由は決定的 |

## 6. 実装前の残件

- 任意`responsible/equipmentNeed`の**実際の正規化後enum値**と`unanswered/undecided/answered`の二重未定表現の整理（既存入力数は増やさない）。
- 優先度の理由文の対象者による理解、必要性・納得度、実際の主催準備に役立つかの検証。
- 高岡市の施設固有の公式原資料の**最新の再照合**、該当範囲と有効日の確認。
- テストは表として追加するのみ。**実装や実行を開始する承認は得ていない**。
