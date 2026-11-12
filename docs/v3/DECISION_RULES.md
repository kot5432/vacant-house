# 現行判断ルール v3.1 — 障壁から最初の事前確認へ
更新：2026-11-12／**コードなし・実行テストなし**。旧v3.0のルールはGit履歴で参照。v1所有者向けA/B診断・v2の施設適合判断は使用しない。

## 入力
- activityType：child_place / community_event / other（必須）。
- startingMode：solo / forming_team（必須）。
- blocker：people / operation / venue / cost / unsure / none_or_unknown（任意、未回答はnone_or_unknown）。
- supportPeople：available / looking / unknown。
- responsibleLead：available / coordinating / unknown。
- district：高岡の手動選択／別地域／unknown。高岡以外の地域へ高岡の制度を当てはめない。
- participantCount：1以上整数またはunknown、0・負数・非整数は入力エラー。
- schedule / frequency / equipmentNeeds：任意（未定を許容、未選択は「必要なし」とは断定しない）。
- centerConsidered：yes / no / unknown（地域交流センターの利用を検討する場合のみ）。
- centerUserComposition：minor_only / adult_involved / unknown（**センター検討時だけ**、個人の年齢を取得しない）。
- optionalDescription：任意、個人情報を求めない。**ルールの自動分類に使用しない。**

## 優先ロジック（決定的、重複排除）
安全・子どもに関する重要な注意は**最優先行動カードの順位とは独立して常時表示**。本人の障壁は尊重するが、危険な誤認や施設利用上の制約を隠してはならない。

| 優先グループ | 条件 | 最初に促す行動例 |
| --- | --- | --- |
| G0 安全の入口 | child_placeかつ責任者不明/未確定 | 見守り・責任体制について学校・保護者・信頼できる成人・既存団体に相談する |
| G1 地域施設の既知制約 | centerConsidered=yes かつ centerUserComposition=minor_only | **高岡市地域交流センターは未成年者のみで利用できない**と公式注意にあることを示し、施設管理者と安全な責任体制を確認する |
| G2 本人が選んだ障壁 | people/operation/venue/cost | 協力者を相談／責任者を確認／利用条件を公式案内で確認／費用・資金の相談項目を整理 |
| G3 条件が不明 | 人数・日時が未定 | 参加人数と開催条件の目安を整理 |
| G4 一般的な次の一歩 | 上記に該当しない | 既存の地域施設・活動団体の使用条件を公式案内で確認 |

- G0がある場合は原則先頭、G1も同時に適用し、表示3件を超えたら「別の確認事項」に残す。G1は**地域交流センター固有**の条件であり、他の施設に一般化しない。
- G2の障壁がvenueでも、G0/G1の必要な条件を省かない。
- costの場合は補助金受給を前提とせず、必要費用・対象制度の申請要件を**公式情報で確認する**案内だけとする。
- blocker=unsureなら現時点の未決事項を提示、blocker=none_or_unknownなら一般的な入口を案内。
- 生成される文章は同じ入力/ルール版/公式情報版なら同じ。LLM APIから自由に内容を生成しない。

## 地域の出典データ（決定ルールと別）
カードにsourceId、公式URL、ページ更新・確認日、対象施設・地区、具体的な確認条件、注意書き、検証状態を保持。
- sourceKind=official_reference：公式掲載事実。個別利用可否は未確認。
- sourceKind=general_advice：一般的な準備の例。法令上の断定不可。
- sourceKind=not_checked：現在の情報は未確認。
- sourceKind=demo：架空例。デモであることを全画面・カードに表示。
情報が古い/リンク切れの場合は確定的なルール表示を一旦保留し、**公式施設管理者へ問い合わせて確認する**一般案内に縮退する。

### 現時点で確認した事例
- 高岡市地域交流センター：2026年1月改定の利用上の注意に「未成年者のみで利用するとき」は許可不可。https://www.city.takaoka.toyama.jp/material/files/group/26/riyoujounotyuui.pdf
- 施設のオンライン空き確認・申込みは既存サービス。各センターの承認あり。https://www.city.takaoka.toyama.jp/gyosei/kurashi_tetsuzuki/juminkatsudo_community_kyodo/2/10190.html
- 市民活動の一般相談：https://www.city.takaoka.toyama.jp/soshiki/kikakuka/2/4_1/5355.html
- 既存活動/団体の情報：https://saponavitakaoka.jp/shimin
- 高岡市2026年度市民共創チャレンジ事業は**個人・単発開催のみが当然に対象とはならない**。本MVPは申請可否を自動判定せず、具体的な条件は https://www.city.takaoka.toyama.jp/soshiki/kikakuka/2/4_1/1/1/13472.html でその都度確認。

## 結果カード（必須フィールド）
- 状態のまとめ（本人入力と不明を分離）
- 最優先1件の questionText、firstActionText、actionMethod、reasonText、sourceRefs、unverifiedNotes
- 補助行動最大2件（重複除去）
- 安全・運営・公的制度の注意（上限3件とは別）
- 相談文の定型テンプレート（編集可能、**送信は本人の手動**）

## 受入ケース（すべて未実装・架空）
| ケース | 入力 | 期待事項 |
| --- | --- | --- |
| C01 | 個人、子どもの居場所、責任者未定 | G0に基づき成人等と見守り責任体制の相談。単独開催を促さない |
| C02 | 学生3人、地域交流センター検討、未成年のみ | G1の地域センター制限と出典。成人の参加だけで許可済みとしない |
| C03 | チーム、地域交流、会場が障壁、責任者あり | 施設利用条件の具体的確認先と質問を表示 |
| C04 | 個人、費用が障壁 | 予算整理と窓口への確認、助成金の適用や交付を保証しない |
| C05 | チーム、人数未定、他は決定 | 人数の目安を整理する行動 |
| C06 | 施設検討なし | 地域交流センターの利用制限を**当該施設の確定事項として勝手に推薦しない**。一般的な注意は可 |
| C07 | 高岡以外の地区 | 高岡の公式情報を現地の条件として出さない |
| C08 | 公式リンク確認できず | 断定文ではなく未確認と表示し管理者へ |
| C09 | 自由記述だけ変更 | 活動カテゴリ・状態をAIが勝手に変更しない |
| C10 | 食事/危険性ある内容をotherで入力 | 専門的な許可判断を自動化せず、専門窓口での確認を案内 |

## 最終注意
このルールは「情報整理の手順」であり、子どもの安全認定・法令適合・施設利用許可を判断するものではない。根拠の最新性と誤認を利用者・専門家に検証する必要がある。
