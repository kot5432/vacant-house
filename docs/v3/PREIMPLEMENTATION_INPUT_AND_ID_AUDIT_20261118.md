# 実装前・非コード設計の確定作業｜入力/保存型・チェックID監査（2026-11-18）

**状態：レビュー可能な技術契約案／実装未着手。** 最新正式ADR-001〜029を優先。ユーザーが「実装以外」を指示しているので、TypeScript/JSON Schemaの実行ファイル、テストランナー、依存、アプリ本体は作成しない。アンケート、施設への連絡は保留。正式承認済み事項と今回の設計推奨を以下で区別する。

## 1. 既存資料で照合できたこと

| 項目 | 正規値/候補 | 状態 |
|---|---|---|
| 基本6問 | eventType, audience, date, venueStatus, region, organizerForm | **既決** |
| 時期 | `input.date`; date YYYY-MM-DD / month YYYY-MM / undecided | **ADR-029既決** |
| イベント種別 | workshop, lecture, exchange, other | 既存型・検証と一致 |
| 参加対象 | minors, adults, both, undecided | 既存型・検証と一致 |
| 会場決定状況 | undecided, candidate, confirmed, no_physical_venue | 既存型・ADR-002と一致 |
| 開催地域 | takaoka, toyama_other, outside_toyama, undecided | 既存型と一致 |
| 主催者形態 | solo, group, undecided | 既存型と一致 |
| 任意回答 | Known<T> = unanswered / undecided / answered(value) | 既決。未回答を未定に補完しない |
| 責任者 | Known<decided,not_decided> | ADR-028と整合 |
| 設備必要性 | Known<yes,none_identified> | ADR-028と整合 |
| 施設分類 | Known<takaoka_community_center,other> | 既存型。別カテゴリ施設を自動分類しない |
| 施設の利用主体 | Known<minors_only,includes_adults> | 既存型。イベント参加対象から推測しない |
| イベント説明のキー | `optionalDescription` | **既存のDATA_DESIGN_V1とSTEP6_02に共通、技術統一案**。ADR-024の`eventDescription`は同一説明欄の用語と位置付ける |
| 復元由来 | 直接元のID/日時 + 取込時刻 | **ADR-018の意味は既決、キー形状は技術案**。推奨`importedFrom.{originalEventId,originalCreatedAt,originalUpdatedAt,importedAt}` |
| 進捗 | P01〜P12のキー + 既知4status + needsRecheck + checkedItemIds + recheckReasonCodes | 既決の論理形状。詳細IDは別契約 |
| バックアップ | formatId=toyama-community-event-prep-backup、exportSchemaVersion=1、レコードschemaVersion=1、旧版互換なし | **ADR-029既決** |

## 2. 実装者向け必須キー表の設計規約

- `EventInput`では基本6問を必須。任意設問の`attendeeCount/responsible/equipmentNeed/venueCategory/facilityUsersAge`は`Known.unanswered`を表せる設計で、**質問を増やす意味での必須ではない**。
- `equipmentCategories`は既存サンプルで配列。**現行の採用済み列挙を確認できるまでは空配列以外の具体リテラルを勝手に生成しない**。そのまま実装を開始する前にカテゴリ名と状態遷移を採用済み入力仕様と照合する。
- `checkedItemIds`はタスク別の子項目IDだけを受理すべきだが、**タスクカタログ版の対応表がまだ必要**。知らないIDを無断で無視/切断せず、保存/取込時は保護的に拒否する設計。
- `recheckReasonCodes`はカタログ/ルール版に基づく既知値だけとする**推奨**。一覧が凍結するまでは「全件PASS」「定義済み」と扱わない。再確認履歴・本人進捗を無断削除しない。
- 施設名メモ100書記素/4096 bytes、任意イベント説明500書記素/16384 bytes。書記素は`Intl.Segmenter`第一候補、保存/取込の同一検証を要求。IME中は強制切断しない。
- DateAnswerは文字列の見かけの正規表現だけでなく**実在する年月日/月**を検証。開催過去日/月はADR-006で保存可・警告のみ。
- `EventRecord`の`schemaVersion=1`はDB内部のDexie版でなく**JSONレコードの形式**。入力が古い文字上限に不適合でもU01/U03閲覧とU03独立CASを保護する（ADR-025/026）。
- 初回JSONのrootは`formatId/exportSchemaVersion/exportedAt/sourceBuildId/eventCount/events`、イベントごとに`schemaVersion=1`、`eventSchemaVersion`をrootへ二重保存しない（ADR-029）。
- `JSON.parse`だけでは重複キー拒否や書記素/日時検証を保証しない。重複キー対策は**実装前レビュー項目**として明示する。

## 3. フィールドごとの検査表と担当

| 層 | 検証すること | 担当 | 実際に失敗したら |
|---|---|---|---|
| U02/U04 | 基本6問・条件付き任意回答・IME中の扱い | B（Aレビュー） | 入力保持、無断補完せずエラー |
| domain/validation | 列挙、日付実在性、Known、書記素とbytes | A（Cレビュー） | 不正値をEventRecordとして認定しない |
| RuleEngine | P01〜P12、applicability、recheck、priority、reason | A（Dレビュー） | 既決ルールにないP1/P2を増やさない |
| EventRepository | 既知schema、CAS、上限超過の旧入力の保護 | C（Aレビュー） | 旧タブ上書き、削除復活を拒否 |
| ImportService | バイト、型、日時、eventId、進捗、未知キー、同意 | C（A/Dレビュー） | ファイル全件拒否／DB不変 |
| SourceService | 出典版、施設の地域・カテゴリ・利用主体・期限 | D（Bレビュー） | 施設固有断定を停止、一般タスクと進捗を残す |

## 4. まだ採用確認が必要な技術値（ユーザーの高影響判断ではなく、実装直前のチームレビュー）

1. `optionalDescription`への統一（既存2資料で使われるキーを優先）と`importedFrom`4フィールドの非再帰構造。
2. `equipmentCategories`、`checkedItemIds`、`recheckReasonCodes`の**実在する採用済み全値**、旧タスクIDからの変換が要るかの照合。
3. 保存版ID生成、UUID/オフセット日時のパーサー、重複キー/極端な深さの扱い、schemaのunknownキー方針。
4. 実際の機械可読JSON Schemaと固定フィクスチャ作成（本書は**設計だけ**で機械可読スキーマそのものではない）。
5. 人間による別担当レビューとユーザーの実装開始明示許可。

**この段階で止める理由**：存在しないチェック項目ID・理由コードをAIが創作すると互換性と保存済みデータを損なう。未確認を「確定」としない方が安全。別Issueの完了確認後に初版を凍結する。
