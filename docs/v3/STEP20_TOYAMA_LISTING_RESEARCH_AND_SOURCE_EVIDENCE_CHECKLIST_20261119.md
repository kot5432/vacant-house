# STEP20｜富山の参加掲載候補・実証チェックリスト

2026-11-19。**現段階では一次情報の公開URL候補整理のみ。個別活動の応募受付や現在の利用可能性を確認済みと扱わない。** ADR-030とSTEP15に従う。

## 1. 既存の公開情報候補と役割
| 候補 | URL | この段階の用途 |
|---|---|---|
| 高岡市の生涯学習・行事案内 | https://www.city.takaoka.toyama.jp/soshiki/kyoikuiinkai_shogaigakushu_sportska/2/7/1/10061.html | 個別体験/講座の公式詳細を探す入口 |
| 高岡市立図書館行事案内 | https://www.city.takaoka.toyama.jp/soshiki/kyoikuiinkai_chuotoshokan/2/1/3/ibento/12133.html | 対象・日時・申込条件の個別根拠候補 |
| 高岡市社会福祉協議会 | https://www.takaoka-shakyo.or.jp/service/volunteer/volunteer.html | 活動・ボランティア案内から個別団体の根拠を探す |
| 御旅屋いさま | https://www.otayaisama.com/ | 地域活動・交流の掲載候補 |
| 高岡市の関連活動案内 | https://www.city.takaoka.toyama.jp/soshiki/kikakuka/2/8/1/14372.html | 公式の一般案内先候補 |
| サポナビたかおか | https://saponavitakaoka.jp/calendar/ | **競合・比較対象**。個別活動の一次情報とは別 |

※これらは**掲載候補の入口URL**で、今も募集中の個別イベントを示す根拠としては使わない。URLの現時点の有効性、個別日付、参加条件、掲載可能性は**実査未了**。

## 2. 個別活動の審査カード（Eが作成→Aが別人確認）
```text
sourceId:
activityId:
sourceUrl（公式・個別詳細）:
organizer / publicPublisher:
officialPageTitle:
sourceCheckedAt（JST日時）:
eventDateOrCadence:
recruitmentCheckedAt:
recruitmentState（confirmed_open / confirmed_closed / unknown）:
eligibility / application / fee / soloAllowed / welcomeFirstTime:
  各値と「明示根拠の短いメモ」、不明はunknown
nextActionCode（出典に合わせた案）:
reviewedBy（担当者）:
reviewedAt:
reviewStatus（needs_review / visible / archived）:
copyrightOrQuoteNotes:
withdrawalContactAndProcedure:
```

## 3. 掲載判断の順序
1. 索引・検索結果と**個別の公式イベントページ**を分ける。一般索引のみなら通常カード化しない。
2. 個別URLが存在しても、開催終了・募集終了・変更・一次情報不足なら`unknown`または`archived`へ。
3. 費用未記載は「無料」とせずunknown。一人参加可・初参加歓迎も明記がなければunknown。
4. 開催が確認されたこと≠今申し込めること。日付付き確認時点の事実のみ表示し、公式サイトへの導線を常に設ける。
5. 代表者/広報・著作権確認、訂正/掲載停止の責任が決まるまで、運営継続できると断言しない。

## 4. 取得情報が0件のとき
- D01は「確認済みの活動は現在掲載していません」＋一般の公式窓口・索引へのリンク案内に縮小。
- 開発用のダミーデータを本番の参加活動リストへ混ぜない。
- 公開活動catalogとU01〜04本人イベントDB/JSONは独立。

## 5. 実査時に収集する証拠（未収集）
各候補を個別に開き、**確認日・正確な個別URL・主催者名・日付/参加条件・原文で明示される範囲・別人レビュー**を記録。URLのリンク切れ、開催終了は除外根拠として残す。本人への連絡、掲載元への問い合わせはまだ行わない。

## 6. 未決
A/Eの本人割当と継続更新者、個別候補の実際のリンク確認、募集鮮度ポリシーと市町村/タグenumの人間承認、応募者向け訂正案内。
