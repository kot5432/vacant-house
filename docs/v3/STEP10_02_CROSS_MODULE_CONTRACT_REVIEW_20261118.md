# 実装前の契約レビュー v0.4｜参加の判断・主催保存の未決値（2026-11-18）

**ステータス：設計・机上レビューのみ。実装・実行テスト・CI・デプロイなし。** ADR-030のMVP範囲（参加D00〜D02 + 主催U01〜U04）は正式採用済み。以下の詳細技術値は**提案・別担当レビュー待ち**。既決ADR-001〜029を上書きしない。

## 1. 現行資料の整合・誤解を防ぐ正本
- 参加側の`ParticipationListing`は公開・静的な掲載カタログ、主催側の`EventRecord`は本人のIndexedDB保存。**同一のevent型を共用しない**。
- 主催側の開催時期は`input.date`（ADR-029）。参加側の`listing.schedule`は別の公開データ。主催入力`schedule`を新設しない。
- 主催側は`eventType/audience/date/venueStatus/region/organizerForm`の基本6問、P05の未成年P1、P08のP2、限定P2判定、本人進捗とCAS、JSON v1不変。
- `optionalDescription`は既存データ型と検証書の一致からの**推奨統一キー**、`importedFrom`の直接由来4項目はADR-018の文面に一致する**推奨形状**。別担当の機械可読スキーマレビューが済むまで「採用済みの完全schema」と呼ばない。
- **発見した具体的な注意点**：掲載候補台帳における「候補」は実掲載の承認ではない。応募資料のデモにも本物の募集中/参加可能と示してはならない。個別活動と団体/索引は区別する。

## 2. 参加データの最低公開フィールド（要レビュー）

| キー（論理） | 必須 | 出典・検証 |
|---|---|---|
| `listingId` | ○ | 公開元URLだけをIDにしない。活動ごとに一意 |
| `title`, `organizerName` | ○ | 主催主体と活動名称が一次ページで判別可能 |
| `municipality`, `topics[]` | ○ | 市町村は明示された地域。分類は表示上の編集ラベルであり適格性を保証しない |
| `schedule.type`, `schedule.displayText` | ○ | `single_date/date_range/recurring/unknown`。日付不明は未知 |
| `source.url`, `source.publisher`, `source.checkedAt` | ○ | 一次サイトURL、公開主体、最終人的確認日時を保存 |
| `source.reviewStatus` | ○ | `verified/needs_review/archived`。期限超過時の表示を別途導出 |
| `recruitment.state`, `recruitment.checkedAt` | ○ | `confirmed_open/confirmed_closed/unknown`。募集状態不明でも公開活動の参考案内は可 |
| `fields` | ○ | 以下の8表示欄は`confirmed(value + evidence)/unknown/not_applicable`に統一。**未知を偽値に変えない** |
| `catalogVersion` | カタログ単位 | 本人のJSON形式版とは区別 |

**初参加8欄**：日時・場所、参加対象/年齢、費用、申込方法、所要時間、持ち物、初心者歓迎の明記、1人参加の可否。日時・場所は表示上まとめても、データ・出典は別に追跡するのが望ましい。

**技術案の矛盾を避けるための提案**：
- `source.reviewStatus=verified`は過去の人による確認事実、`recruitment.state=confirmed_open`は確認時点の事実。これらと**現在も受付中と表示してよいか**は`effectiveRecruitmentStatus`として評価時刻により別途導出する。
- 保存カタログ自体を書き換えなくても、開催終了/確認期限切れを安全側表示へ切替え可能。ただし現在も公式ページが生きていると自動認証しない。
- `unknown`は未記載/未確認、`confirmed(false)`は公開根拠がある否定。`not_applicable`はその項目がそもそも該当しないという明確な根拠があるときのみ。
- `source.checkedAt`と`recruitment.checkedAt`はタイムゾーン付き実在日時。表示の「最終確認」は事実を示し、将来も有効という意味ではない。
- 個人に関わる参加条件を利用者に推定/入力させず、掲載元が公表する条件と公式ページを表示する。

## 3. 参加「次の一歩」判定の厳密な優先順位（提案）

| 優先 | 条件 | 出力 | 補足 |
|---|---|---|---|
| 0 | 非公開情報が混入、出典/活動主体未確認、URL無効 | `DO_NOT_PUBLISH` | D01に通常のカードを出さない。捏造リンク不可 |
| 1 | 明示された単発終了日が評価日(JST)より前 | `ENDED` | 過去の開催を現在の募集とは呼ばない |
| 2 | 一次ソースで募集終了が確認済み | `CLOSED` | 参加申込可のCTAを出さない |
| 3 | 定期/随時だが**次回の開催日が未確認** | `VERIFY_STATUS` | 次回開催日や「いつでも参加」を作らない |
| 4 | 募集状態不明、確認後に状態が変わり得る、レビュー期限切れ | `VERIFY_STATUS` | 状態未知を「受付中」に変換しない |
| 5 | 参加資格・費用・申込方法など判断に重要な欄が未知 | `VERIFY_REQUIREMENTS` | 不明箇所を箇条書きで示す |
| 6 | 公式の参加案内が一次資料で確認できる | `READ_OFFICIAL_GUIDE` | 実際の申込や空席は保証しない |
| 7 | 上記に当てはまらず参照できる一次情報のみ | `READ_SOURCE` | 「公式情報を確認する」。申込を強制しない |

- **一番先に一致した1アクション**だけを強調し、その他の未確認事項は並列表示。状態`ENDED/CLOSED`でも関係者の再募集を推測しない。
- 技術上の鮮度閾値（何日で受付中→未知へ落とすか）は**レビュー未決**。提案値は別の運用手順で設定し、ADRの月末JST出典規則を参加募集に流用しない。
- `DO_NOT_PUBLISH`は通常の募集状況とは異なる**編集・公開ガード**である。参加一覧に出すステータスと混同しない。
- 出典の誤りを発見したら本人の企画EventRecordを編集/削除しない。

## 4. 主催JSON v1・保存の最終固定対象

| 正本項目 | 既決 | 今回できる作業 | 残る確認 |
|---|---|---|---|
| root formatId/version1/eventCount/size2MiB×100 | ADR-029/019 | 検証表で一致を確認 | 実際のparserとバイト上限試験は未実行 |
| `input.date` / 基本6問 / Known3状態 | ADR-029/INPUT | 型表へ反映 | 完全なJSON Schemaと旧文書キー整理 |
| `optionalDescription` / `importedFrom` | ADR-018/024の意味 | 既存型との一致から一つの候補に収束 | 技術レビュー＋版1スキーマの固定 |
| `equipmentCategories` | 配列・equipmentNeed=yesで使用 | **具体値を想像せず照合** | 正式に採用された列挙値の全件 |
| `checkedItemIds` | TaskProgressの配列 | タスクごとの子項目ID表を作成 | P01〜P12カタログ全子IDと将来版 |
| `recheckReasonCodes` | 再確認時の理由配列 | 依存変更と理由の対応表を作成 | 名前・版・旧値扱い |
| CAS / JSONの原子的操作 | ADR-026ほか | U02/U03/U04/復元の不変条件を確認 | 人が実装後に実行するテストの結果 |

### 未確定IDに対する重要な取り決め（技術案）
- **未確定IDをAIが自作して現行v1の有効値として保存しない**。
- `checkedItemIds`が空の正常なレコードと、未知のチェックIDがある破損レコードを区別する。
- 未知IDを黙って捨てて検証済みにしない。読取保護/書込停止/移行はADR-025/026の既決範囲に従い、本人データを勝手に上書きしない。
- 実装前に一次カタログと照合した **[taskId,childItemId,reasonCode,ruleVersion]** の全件対応表が必要。現段階は未完成。

## 5. 設計レビューケース追加（全件 not_run）

| case | 条件 | 期待 |
|---|---|---|
| PART-01 | `confirmed_open`を1週間前に記録、今回の再確認なし | 無条件に「現在募集中」と表示しない。実際の有効期限規約は要決定 |
| PART-02 | `firstTimerWelcome`がunknown | 「初参加歓迎」と断定しない |
| PART-03 | `soloWelcome`がconfirmed(false) | 未確認とは区別して、公式に確認した条件を案内 |
| PART-04 | `single_date`の終了日が過去 | ENDED、申込可能と表示しない |
| PART-05 | 定期活動だが次回開催日なし | VERIFY_STATUS |
| PART-06 | 募集ページURLが活動詳細を指さない | DO_NOT_PUBLISH または案内先としてのみ整理 |
| PART-07 | 検索結果0件 | 0件と代替の地域活動ポータルを案内。架空の活動で埋めない |
| PART-08 | D02→U02 | 6問は本人が新規入力。参加の内容を暗黙で転写しない |
| ORG-01 | P05未成年, P08高岡センター | P05=P1,P08=P2。施設カテゴリ/出典条件一致のみ固有案内 |
| ORG-02 | JSON rootに`schedule`や旧空き家formatId | 未対応として全件拒否、DB不変 |
| ORG-03 | U03の対象task progress CAS成功 | 旧入力が上限超過でも本人の他フィールドを無断修正しない |
| ORG-04 | checkedItemIds未知 | 破損を正常扱いせず保護。型全件固定前はテスト結果を保証しない |

## 6. 次の非実装作業・役割
- [#14](https://github.com/kot5432/vacant-house/issues/14)：参加カタログデータの完全な列挙・必須/任意・状態ガード・期限の一次案。D主担当、Aレビュー（仮）。
- [#15](https://github.com/kot5432/vacant-house/issues/15)：参加D00〜D02の文言/分岐/空表示。B、Dレビュー（仮）。
- [#16](https://github.com/kot5432/vacant-house/issues/16)：参加と主催の境界・JSON/CAS回帰。A、Cレビュー（仮）。
- [#17](https://github.com/kot5432/vacant-house/issues/17)：一次情報確認、掲載停止、訂正導線。D、Bレビュー（仮）。
- [#1](https://github.com/kot5432/vacant-house/issues/1)：主催側の厳密JSONスキーマ、設備/子項目/理由コード一覧の完全固定。A、Cレビュー（仮）。

**設計の境界**：ユーザーが承認したのはADR-030のMVP範囲まで。本書のenum値・鮮度日数等は一括正式採用されたことにしない。ユーザーの実装・実証開始の明示許可はない。
