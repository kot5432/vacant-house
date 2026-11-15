# STEP8-⑫｜初回JSONバックアップ形式・検証順序の設計草案（未承認の技術値を区別）

作成：2026-11-16。**設計草案／コード・テスト実行・デプロイなし**。現行のイベント準備支援Webアプリ専用。旧空き家案は**バックアップ識別子・スキーマとも互換対象外**。既決：[ADR-015](ADR_015_JSON_BACKUP_EXPORT_IMPORT.md)〜[ADR-025](ADR_025_LEGACY_OVERSIZED_RECORD_READ_ONLY_UNTIL_FIXED.md)、[ADR-028](ADR_028_LIMITED_P2_PRIORITY_BY_EXISTING_INPUTS.md)。

## 1. JSON形式の候補（初回リリース前に値を固定）

| 識別項目 | 候補 | 状態・意味 |
|---|---|---|
| `formatId` | `toyama-community-event-prep-backup` | **提案文字列**。旧空き家JSONとは異なる専用識別子。正式採用値ではない |
| `exportSchemaVersion` | `1`（整数） | **初回の候補番号**。外部公開後は無断再定義しない |
| `eventSchemaVersion` | `1`（整数） | **イベントJSONレコード形式の候補番号**。バックアップ形式版とDBストア移行版は別 |
| `sourceBuildId` | 書出し元のビルド識別子 | **互換性判定の代わりにしない**。ソフト更新を強制しない |
| `exportedAt` | タイムゾーン付きISO8601日時 | ADR-023に従い実在する瞬間か検証 |
| `eventCount` | `events.length` と一致する非負整数 | ファイル内イベント数。100件上限 |
| `events` | 保存済みEventRecordに相当する配列 | 入力・本人進捗・再確認を保全し、導出タスク・出典本体は含まない |

### 形状例（説明用の擬似JSON、正式なサンプルファイルではない）

```json
{
  "formatId": "toyama-community-event-prep-backup",
  "exportSchemaVersion": 1,
  "exportedAt": "2026-11-16T00:00:00+09:00",
  "sourceBuildId": "example-build",
  "eventCount": 0,
  "events": []
}
```

**あくまで初回形式の提案**。初回公開前に固定し、同じ版で非互換の変更をしない。公式データカタログ・導出タスク・個人情報送信・クラウド同期は含めない。

## 2. EventRecord論理スキーマの連結

- 基本6問は`eventType/audience/date/venueStatus/region/organizerForm`を前提とする**正規名の技術案**。日付を指す`schedule`は[STEP8-⑩](STEP8_10_CANONICAL_INPUT_MAPPING_AND_ENUM.md)で説明名と位置付け、両方を自動補完しない。
- 任意`attendeeCount`・`responsible`・`equipmentNeed`・`equipmentCategories`・条件付き施設カテゴリ／施設利用者構成・任意メモを既存の入力型に従って検証する。
- `progressByTask`は**既知タスクID P01〜P12と既知進捗状態だけ**。完了・対象外・`needsRecheck`・再確認理由を黙って消去しない。
- 新規レコード作成時`revision=1`・`createdAt=updatedAt=importedAt`。元ファイルの`eventId/createdAt/updatedAt`を`importedFrom`に保存（ADR-018）。**既存EventRecordのrevisionは変更しない**。
- 既存の`importedFrom`を再インポートするときは、ADR-018どおり**今回JSONで直接指定された元イベント**を由来とし、無限の祖先配列を伸ばさない。

## 3. インポート検証順の草案

1. 選択ファイルの実バイト長を検査：**2,097,152バイト超ならパース前に拒否**（ADR-019）。
2. JSONパース。ルートがオブジェクト、必須フィールド型・件数が有効、`eventCount===events.length`、100件以内か検証。
3. `formatId`と対応`exportSchemaVersion`を照合。**実在しない旧版・未知の将来版・旧空き家形式は拒否**（ADR-022）。
4. 各`eventSchemaVersion`を検証。既知旧版を将来サポートする場合は**明示的に定義し、元データの検証→安全な移行→現行再検証**。
5. イベントIDの形式・ファイル内部一意性、基本6問、条件付き入力、任意回答、進捗、由来、4/16KiBテキスト制限を全件検証。推測した値で穴埋めしない。
6. `exportedAt`・元`createdAt/updatedAt`のISO8601日時と順序を検証。有効な未来日時は警告、無効や矛盾は**全件拒否**（ADR-023）。
7. 既存DBのeventId衝突をプレビューし、「新規追加件数／別コピー件数／既存の件数／繰返しコピー増加注意」を示す（ADR-016/017）。
8. **本人が明示承認した場合のみ**、プレビュー時点の衝突分類が現在のDBと一致することを保存トランザクション内で検証し、原子的に全件追加する。失敗時は既存・追加とも部分的な変更なし。
9. 保存成功したら一覧へ追加。旧版由来日時は補助表示。ファイルを読めただけで復元成功とは表示しない。

## 4. エクスポート生成の草案

1. U01書出し画面は選択0件。1〜100保存イベントのときだけ全選択可能（ADR-021）。
2. 本人が`selectedEventIds`を選び、**選択X件／保存済みY件／今回含まれないY-X件**を確認。
3. 保存済みの一貫したスナップショットを取得。選択IDが削除／更新されたら黙って除外・旧版を出さない。
4. 対応スキーマに変換し、ユーザー入力・進捗・再確認・直接の由来を含むJSONを**全件分**作成。出典カタログや再計算可能なpriorityは含めない。
5. 最終JSON UTF-8バイト長**2 MiB以下**・イベント数100以下を検証。超過なら選択見直し、無断切詰め・自動分割なし（ADR-019/020）。
6. ブラウザのダウンロード開始を「端末に確実に保管完了」と扱わない。元DBは一切変更しない。

## 5. 互換性と復元可能性の受入ケース（すべて未実行）

| ID | ケース | 期待 |
|---|---|---|
| JSON-S01 | 固定formatId＋初回対応版／0件 | 0件として読取可能。既存データ消去なし |
| JSON-S02 | formatIdが旧空き家の識別子 | 全件拒否 |
| JSON-S03 | 未知の将来版 | 全件拒否、既存DB不変 |
| JSON-S04 | sourceBuildIdのみ異なる対応版 | buildIdだけを理由に拒否しない |
| JSON-S05 | dateだけの正規データ | P03判定に使える |
| JSON-S06 | 未定義のscheduleキーやdateとの重複 | 明示移行契約なしでは推測受理しない |
| JSON-S07 | progressByTaskに未知TaskId | 全件拒否・無断欠損なし |
| JSON-S08 | 2,097,153バイト・101件 | どちらの条件でも拒否 |
| JSON-S09 | エクスポートした正常JSONを復元 | ユーザーの入力／本人進捗／再確認が保持され、priorityと公式出典は現行版で再評価 |
| JSON-S10 | 復元先eventIdと衝突 | 既存不変・別コピー・revision=1、毎回本人承認 |
| JSON-S11 | 異常な未来日時・不正日時 | 未来は警告／不正は全件拒否 |
| JSON-S12 | 途中のIndexedDB失敗・多タブ変更 | 原子的に失敗、成功を偽らない |

## 6. 保留する技術値と品質ゲート

- **正式なformatId・初期版番号・保存キーの最終固定**は未決。実装開始が別途明示承認された場合に、型スキーマ・テストデータ・旧版移行一覧として確定する。今回のサンプルは採用済み仕様を表す**案**であり、対応済みバックアップの実物があるわけではない。
- 既存IndexedDB旧版の移行、Dexieトランザクションの多タブ競合、Safariでのダウンロード・読込、保存容量不足は**端末を使う実験なしに保証しない**。
- 本人が入力した任意メモに個人情報が含まれ得るため、エクスポート前にローカルファイルであることと保管の注意を提示。外部送信の追加はしない。

## 後続の実装前整理（2026-11-16）

[STEP8-⑱](STEP8_18_TECHNICAL_CONTRACT_CONSOLIDATION.md)で本草案の未確定値と既決の不変条件を整理。[STEP8-⑲](STEP8_19_ACCEPTANCE_CASES_AND_EVIDENCE_TEMPLATE.md)のBACKUP-F01〜10が今後の受入予定。**formatIdと初期versionの候補値は正式採用ではない**。初回リリース前に実スキーマの版固定とテストフィクスチャを要し、現時点で読込・復元の動作を検証した実装はない。
