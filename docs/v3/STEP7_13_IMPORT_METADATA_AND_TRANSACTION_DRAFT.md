# STEP7-⑬｜JSON復元の保存メタデータ・トランザクション・版の設計細則（草案）

作成：2026-11-15。**正式採用済みの前提**：[ADR-015](ADR_015_JSON_BACKUP_EXPORT_IMPORT.md) JSON書出し・復元両方、[ADR-016](ADR_016_IMPORT_COLLISION_AS_COPY.md) 衝突時の別IDコピー・既存不変・全件原子的追加。以下のデータ型・初期番号・時間の厳密値は実装前の技術設計案。現行イベント開催準備支援Webアプリのみ。旧空き家データ移行なし。コード／テスト実行／デプロイなし。

## 1. 提案するバックアップ契約
```text
BackupEnvelope
 formatId: 現行イベント準備支援専用の固定値
 exportSchemaVersion: エクスポート仕様版
 exportedAt: 書出し日時（ISO-8601）
 sourceBuildId: 元アプリビルド識別子
 eventCount: 書出しイベントの数
 events: 保存済みEventRecordの配列（派生タスク・出典カタログは含めない）
```

**ルール**：ルートとイベントの`schemaVersion`を分離、未知形式は拒否、イベント間の重複eventIdはファイル全体を拒否、入力／進捗／再確認理由をランタイム検証、`eventCount=events.length`を検証。書出し時に全レコードが**保存済みスナップショット**であることを保証する。現在のアプリの`rulesVersion`／出典版が元のJSONと違っても、ルール・出典の内容自体をバックアップからコピーせず再評価する。

## 2. IDとrevisionの案

| 場合 | eventId | revision | input/progress |
|---|---|---|---|
| 衝突なしの新規追加 | 元のeventIdを維持 | **初期revision 1を推奨**（元revisionはバックアップ元メタデータとして必要なら別保存） | 検証済み値を維持 |
| 衝突あり | 暗号学的な衝突耐性のある新IDを発行し、既存と全追加対象で照合 | **初期revision 1を推奨** | バックアップ側の値を独立複製 |
| 既存DBのレコード | 変更しない | 変更しない | 変更しない |

**rev=1はまだ正式決定ではない**が、新しいイベントとしての一貫性を高められる。元のrevisionを引き継ぐと、元DBの更新履歴と誤認しやすい。コピー元のeventIdを本人に示すには、`importedFromEventId`などの任意メタデータを設ける案。ただしコピーのコピーで履歴が伸びる可能性があるため、最小MVPでは表示用の「復元したコピー」ラベルだけでもよい。

## 3. 日時の扱い（追加決定前の候補）

- `createdAt/updatedAt`は**このDBへ新規追加された時点**の日時へ統一する案（元の作成日時は任意のimport provenanceに別保持）。元の日付のままにする場合、U01の「最終更新順」に復元したイベントが直近へ出ない等の違和感がある。
- 元イベントの内容と本人進捗の記録は日時と独立して維持する。ただし既存スキーマにタスク別時刻がある場合は、本人の履歴として扱うか仕様を確認する。
- リストの「コピー」表示が誤認を生まないよう、イベント名／開催時期／復元日時をU01で区別する。

## 4. Dexie一括保存の構成案

```text
select file → validate all → preview collision counts → user confirms
→ begin IndexedDB readwrite transaction
  ├─ check DB schema/version and current event IDs
  ├─ if preview's collision classification changed: abort
  ├─ assign new IDs for colliding items; ensure all unique
  └─ add only new EventRecords in one atomic batch
→ transaction committed → verify inserted count → show result
                      ↳ error/abort → no partial imported records
```

※Dexieでの具体APIや`transaction`の読み書き、別タブ間の競合が確実に検知できるかは実機試験で確定する。**未検証で技術保証とはしない**。確定後はU01一覧に追加分を表示、既存レコードは維持。ファイルの選択や読込成功だけでは復元済みと表示しない。

## 5. 追加の安全境界

- JSONファイルに含まれ得る任意メモ・個人情報を外部サーバーへ送らない。
- ファイルが巨大なら読む前に容量上限を確認、入れ子の深さ、イベント件数などを制限する。**具体的な最大MB・件数値は未採用**。
- ストレージ不足、読み込み拒否、スキーマ不明、ファイル内重複、保存中のエラーは旧DB無変更。全件保存できない場合に一部成功を表示しない。
- 製品名の似た他のJSONや旧空き家案のファイルは`formatId`で拒否する。
- 端末のデータを消す機能や上書き復元・同期機能を暗黙に導入しない。

## 6. 実装前テスト追加候補

| ID | ケース | 合格条件 |
|---|---|---|
| META-01 | 衝突で複製 | コピーのrevisionは新規イベントとして独立 |
| META-02 | インポート済み別コピーを編集 | 既存元イベントとコピーのrevision・進捗が連動しない |
| META-03 | eventCount不一致 | ファイルを拒否し旧DB保持 |
| META-04 | eventId重複 | ファイル拒否 |
| META-05 | 元JSONの日時が現在より未来 | 異常値の方針に従い誤解を招かない日付表示（未決） |
| META-06 | 途中保存失敗 | 原子的ロールバック、部分追加ゼロ |
| META-07 | 現在のルール版だけ異なる | 進捗を守りタスク評価を再計算 |

## 7. 次の利用者判断

[STEP7-⑫ 繰返しバックアップ取込みの扱い](STEP7_12_REPEAT_IMPORT_OPTIONS.md)でA/B/Cを選ぶのが先。revision・日時の細目、バックアップサイズ／件数・対応する過去版はその後、必要な事項だけ判断を求める。

## 8. ADR-017採用後の変更点

**反復インポートでは過去のファイルハッシュや取込み履歴を保持しない**。毎回、現在のDBと比較した件数・コピー増加の注意・本人の明示確認を必要とする。別IDコピー、プレビュー後の衝突分類変更時の再承認、全件原子的追加はADR-016のまま。次の詳細決定は、新規復元イベントのrevision初期値と日時の扱いを[STEP7-⑭](STEP7_14_RESTORED_EVENT_METADATA_OPTIONS.md)で比較する。[ADR-017](ADR_017_REPEAT_IMPORT_WITH_CONFIRMATION.md)。
