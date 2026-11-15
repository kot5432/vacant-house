# ADR-028｜P01〜P12の残る優先度は実在する入力値による限定P2分岐（A案正式採用）

決定日：2026-11-16。**利用者が[STEP8-⑧](STEP8_08_REMAINING_PRIORITY_POLICY_GATE.md)のA案を明示採用**。現行の「初めて地域の単発・小規模イベントを主催する人の準備支援Webアプリ」専用。旧空き家案／物件・所有者・マッチングとは無関係。**設計のみ：実装、試験実行、デプロイ、公式原ページの今回再確認は行っていない**。

## 1. 決定

- P01〜P04・P07・P09は**原則P3**とし、**本人が実際に回答可能な条件だけ**でP2へ引き上げる。対象入力が未回答のとき「未定」と推測しない。**新しいP1条件は導入しない**。
- P06・P10・P11・P12は**初期MVPではP3固定**。開催日からの残日数、人数の大きさ、自由記述から自動昇格させない。
- **従来の正式決定を優先**：[ADR-003](ADR_003_PRIORITY_RULES_ADOPTED.md)のP05（`audience=minors/both`→P1、`adults/undecided`→P2）、同区分ID昇順、`no_physical_venue`時のP08親P2。[ADR-027](ADR_027_P08_P2_NO_FACILITY_AUTO_ESCALATION.md)の**P08親P2基本、施設固有出典が一致してもP1へ自動昇格させない**。P08は原則P2、施設固有の行政申請必須性を確定しない。
- P07/P08/P09の「物理会場なし」は建物専用子項目のみ非該当、**親は`applicable=needs_information`**（ADR-002）。該当性とpriorityを別次元とする。
- `priority`は毎回入力＋固定されたルール版から導出。本人の`progressByTask`、`needsRecheck`、`revision`を優先度変化だけで書き換えない。ユーザーが進捗を保存する際は既決CAS契約を守る。
- 最優先の未解決候補は**P1→P2→P3、同区分ならP01〜P12のID昇順**。代表以外のP1は隠さない。

## 2. 実在する入力との照合

参照：[入力検証契約](STEP6_02_VALIDATION_CONTRACT.md)。**架空の「企画整理希望」「人数検討希望」というフラグは存在しないため条件に使用しない**。

| taskId | 基本 | P2の条件（全て実在する保存入力） | P2以外の例・注意 |
|---|---|---|---|
| P01 | P3 | `eventType=other` | workshop/lecture/exchangeはP3。otherでも企画不備を断定しない |
| P02 | P3 | `audience=undecided` | `attendeeCount`未回答／未定だけでは昇格しない。0人扱いもしない |
| P03 | P3 | `schedule.kind=undecided` または `month` | `date`はP3。月のみを日付に補完せず、期限も算出しない |
| P04 | P3 | `organizerForm=undecided`、または任意`responsible`が**明示的に未定／未決定** | `responsible`未回答はP2にしない。`solo`でも責任者決定済みと推測しない |
| P05 | ADR-003 | `audience=minors/both`ならP1、`adults/undecided`ならP2 | 本ADRで変更しない |
| P06 | P3 | なし | 日程が近いだけのP1/P2昇格なし |
| P07 | P3 | `venueStatus=undecided` または `candidate` | `confirmed`はP3（予約完了ではない）。`no_physical_venue`は親の一般確認をP3で残す |
| P08 | ADR-027 | **P2基本**、施設出典によるP1昇格なし | `no_physical_venue`は親`needs_information`・P2 |
| P09 | P3 | 任意`equipmentNeed`が**必要な設備あり（回答済み）** | 未回答・未定・思いつかないはP3。設備不要とは断定しない。`no_physical_venue`時は建物専用項目だけ非該当 |
| P10 | P3 | なし | 募集期限を推測しない |
| P11 | P3 | なし | 未成年を含む場合の注意文は可能だが優先度を自動で昇格させない |
| P12 | P3 | なし | 「14日前」等の仮閾値なし |

**任意値の厳密なコード表現は未確定**：`responsible`や`equipmentNeed`は[STEP6-②](STEP6_02_VALIDATION_CONTRACT.md)の`{kind:unanswered|undecided|answered}`と意味のある回答値へ正規化して比較する。日本語ラベルだけをTypeScriptのenumとして誤用しない。「未定」には回答の`undecided`と回答済みの「未決定」があり得るため、**入力仕様で明示された意味の範囲だけ**をP2にする。最終のenumリテラルは実装前の技術設計に記録。

## 3. 評価順と出典・進捗

1. 基本6問の有効値を検証し、条件付き回答が適用されるときだけ参照。任意入力の未回答と未定は区別。
2. 上表の優先度を決める。**施設固有出典、法的義務、人数大小、期限、自由記述の内容は優先度昇格に使わない**。
3. 既決の該当性を独立判定し、進捗や`needsRecheck`を別に合成する。公式出典の失効時は施設固有の断定を抑制するが、本人進捗はそのまま。
4. 未解決タスクを優先度→taskId昇順で表示。P1が残っていれば代表1件のほか全P1へ到達可能にする。
5. ルールは実際の参加者・初主催者への検証前のMVP方針。**優先度は主催判断の補助であり危険・行政の必要手続き・許可結果を保証しない**。

## 4. U03の理由・次の行動

- P01 `other`：「イベントの内容をもう少し整理すると、次の準備を決めやすくなります」／「実施したい体験を一文でまとめる」
- P02 `audience=undecided`：「参加する人の範囲を決めると、準備の目安が立てやすくなります」／「対象を候補から考える」
- P03 `month`：「開催月は決まっています。具体的な日程の確認が次の手掛かりになります」／「候補日を考える」
- P04 主催形態・責任者未定：「運営担当を整理すると、当日の役割を考えやすくなります」／「担当候補と連絡方法を考える」
- P07 会場未定／候補：「会場の状況を確認すると、必要な準備を整理できます」／「会場候補・確認先を書き出す」
- P09 設備あり：「必要と考えている備品を確認しましょう」／「使える設備と持参するものを整理する」
- **本人がそのように回答していない場合、この理由を表示しない**。P05/P08については既決の説明を用いる。

## 5. 受入試験（期待値のみ、未実行）

| ID | 入力 | 期待 |
|---|---|---|
| PRIO-A01 | eventType=other | P01=P2、内容をAI補完しない |
| PRIO-A02 | eventType=workshop | P01=P3 |
| PRIO-A03 | audience=undecided | P02=P2、P05=P2 |
| PRIO-A04 | audience=minors | P02=P3、P05=P1 |
| PRIO-A05 | schedule.kind=month | P03=P2、勝手な日付補完なし |
| PRIO-A06 | schedule.kind=date | P03=P3、開催が近くてもP06/P12=P3 |
| PRIO-A07 | organizerForm=undecided | P04=P2 |
| PRIO-A08 | responsibleが明示未決定／未定 | P04=P2、未回答だけではP2にしない |
| PRIO-A09 | venueStatus=undecided/candidate | P07=P2 |
| PRIO-A10 | venueStatus=confirmed | P07=P3、利用許可済みとは断定しない |
| PRIO-A11 | venueStatus=no_physical_venue | P07・P09親を`needs_information`かつP3、P08親P2、建物固有子項目のみ非該当 |
| PRIO-A12 | equipmentNeed=必要な設備あり | P09=P2、未回答／未定ではP3 |
| PRIO-A13 | 施設出典が有効かつ対象一致 | P08=P2、施設条件から自動P1なし |
| PRIO-A14 | P05未成年含む | P05=P1、その他のP1自動追加なし |
| PRIO-A15 | 複数のP2、進捗未解決 | P01からID昇順で代表選択 |
| PRIO-A16 | 優先度再評価と本人完了履歴 | 保存済み完了・needsRecheck・revisionは変えない |
| PRIO-A17 | attendeeCountのみ高値・施設名自由記述 | それだけで昇格なし |
| PRIO-A18 | 表現だけ変更／旧カタログ期限切れ | 本人進捗は維持し、公式断定を抑制 |
| PRIO-A19 | 12タスクすべて検証 | P01〜P12それぞれP1/P2/P3が上表と一致し、非該当のpriorityはnullなど既決の出力契約を遵守 |

## 6. 今後の確認が必要な範囲

**入力条件に応じてP2を限定的に上げる方針と上表のルールは本ADRで正式採用**。実在しない項目、入力の推測、新規P1を追加しない。例文・enum名の厳密表記・画面の細かな配置は技術／UI設計で精査可能。将来P1の追加、タスク構成変更、法的義務の断定、入力6問の増減、外部送信などの高影響な仕様変更は利用者の承認を改めて得る。
