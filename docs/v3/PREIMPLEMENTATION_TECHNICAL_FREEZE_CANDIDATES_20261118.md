# 実装直前の技術決定候補・検証正本（2026-11-18）

**状態：設計仕様案。利用者による最終技術レビュー待ち。実装・テスト実行・CI・デプロイなし。** 現行v3.1地域イベント準備支援アプリ専用。正式採用されたADR-001〜029を維持する。本書は実装済みTypeScript/JSON Schemaファイルではない。

## 1. 項目名の一意化（推奨）

| 論点 | 推奨する初版の一意な定義 | 根拠/残る確認 |
|---|---|---|
| 開催時期 | `input.date` | **ADR-029正式決定**。UIのscheduleは同じ1問の説明ラベル。JSONのscheduleは拒否 |
| イベント説明 | `input.optionalDescription?: string` | DATA_DESIGN_V1の既存型に合わせる**技術案**。ADR-024のeventDescriptionという表示名を二重保存しない |
| 復元由来 | `importedFrom?: {originalEventId,originalCreatedAt,originalUpdatedAt,importedAt}` | ADR-018の保持要件に従う**技術案**。直接元のみ。再帰チェーンなし |
| `schemaVersion` | `1` / レコード単位 | **ADR-029正式決定**。Dexie版とは別 |
| `exportSchemaVersion` | `1` / ルート | **ADR-029正式決定** |
| `formatId` | `toyama-community-event-prep-backup` | **ADR-029正式決定** |

**判定**：`optionalDescription`と`importedFrom`の技術案は一つの採用候補に絞った。これは正式ADRを変更する行為ではないが、外部公開前に別人レビューと版1フィクスチャ照合を必要とする。意味不明な値をAIが補うのは禁止。

## 2. ランタイム検証の正本（スキーマだけでは足りない箇所）

| 対象 | 検査 | 失敗時 |
|---|---|---|
| ルート | 正確なformatId、整数version1、必須キー、`eventCount===events.length` | 全件拒否 |
| サイズ | JSONファイル実バイト`<=2097152`、`events.length<=100` | パース前にサイズ超過拒否 |
| 基本6問 | 列挙値、dateの実在年月日、regionとvenue状態、Known3状態 | 全件拒否／保存拒否 |
| 任意入力 | `attendeeCount`安全整数>=1、`responsible`と`equipmentNeed`列挙、施設カテゴリ適用範囲 | 本人未回答を推測せず、無効なら拒否 |
| 文字列 | venueNameMemo:100書記素と4096 UTF-8バイト／optionalDescription:500書記素と16384バイト | 超過位置・上限を示す |
| レコード | eventId形式・ファイル内一意、schemaVersion=1、revision正数、timestamp厳密値と順序 | 1件でも不正なら全件拒否 |
| 進捗 | taskIdはP01〜12、キーと値内taskId一致、4status、boolean needsRecheck、checkedItemIds/理由コードの許容値 | 不正なIDを無言で捨てず拒否 |
| 復元由来 | 元ID、元日時、importedAtが妥当、再帰由来を禁止 | 不正なら全件拒否 |
| 出典 | eventの任意施設名から判定せず静的catalog/期限/利用主体で適用確認 | 固有断定のみ停止、本人進捗維持 |
| IndexedDB | 新規とupdate分離、CAS、原子的import、別タブ差分、失敗時不変 | 自動上書き・部分成功を拒否 |

**JSON重複キー**：標準`JSON.parse`では検出できない。初版を厳密なJSONとして公開する場合、重複キー・深さ・文字数などの資源制約を検査する方式を設計Issueで決定し、単純パース後に重複を検出したと主張しない。

**進捗の子IDと設備カテゴリ**：既存カタログの実値一覧を別レビューで調べ、許容キーを一意の版付き表に固定。未知値を黙って消さない。

## 3. 将来の拡張・移行ルール

- 現行対応は`formatId`一致 + `exportSchemaVersion=1` + 各イベント`schemaVersion=1`。既知旧版なし。
- 外部公開後に`1`の意味を無言で変えない。新しい互換性が必要なら版追加・元検証→明示移行→再検証を行う。
- 保存可能な古い入力の扱いはADR-025/026によってU01/U03閲覧・進捗CASを保護し、U04入力更新では現行の文字数・byte制約を守る。
- 復元後は入力・本人進捗・再確認を維持し、現在のP01〜12ルールと出典カタログから導出値だけ再計算する。

## 4. 最小の固定テストフィクスチャ設計（全件not_run）

| ケースID | 主入力 | 期待する仕様結果 |
|---|---|---|
| READY-R01 | audience=minors、venueStatus=undecided | P05=P1、P07=P2、P08=P2。他P1は非表示にしない |
| READY-R02 | audience=adults、date.kind=month、venueStatus=candidate | P03=P2、P05=P2、P07=P2、P08=P2、ID順 |
| READY-R03 | responsible=unansweredとorganizerForm=group | P04=P3、未回答を未決定にしない |
| READY-R04 | responsible=answered/not_decided | P04=P2 |
| READY-R05 | equipmentNeed=answered/yes とカテゴリ空 | P09=P2、カテゴリを推測しない |
| READY-R06 | no_physical_venue | P07/P08/P09親はneeds_information、P08=P2、建物子項目のみ非該当 |
| READY-B01 | formatId違い、未知version、scheduleキー併存 | JSON全件拒否、既存DB不変 |
| READY-B02 | 101件、2,097,153バイト、日時不正 | JSON全件拒否 |
| READY-B03 | 元eventIdが保存済みと衝突 | プレビュー・明示同意→別IDコピー、revision1、既存不変 |
| READY-B04 | 途中書込失敗または別タブ変更 | 原子的失敗、再確認、既存DB不変 |
| READY-U01 | U02初回保存失敗 | 入力を画面内保持、U03に遷移しない |
| READY-U02 | U04 CAS競合 | 保存済みレコード不変、ドラフト保持 |
| READY-U03 | 古い任意説明が上限違反、U03進捗更新 | 入力は変更せず対象進捗だけCASで更新可能 |
| READY-S01 | 出典期限切れ/施設カテゴリ相違 | 固有断定停止、一般確認と本人進捗維持 |

## 5. コード実装直前の未了

1. イベント説明キー・由来データ形状の**技術レビュー承認**。
2. checkedItemIds/equipmentCategories/recheckReasonCodesの具体既知列挙とDB/JSON strict schemaの対応。
3. 機械可読JSON Schema Draftの作成、意味検証の責任境界、固定フィクスチャの実ファイル化（**設計アーティファクト**としてなら作れるが今回は未作成）。
4. 実際のチーム担当・レビュー権限・GitHub Project運用の決定。
5. ユーザーからの**実装開始明示許可**。現在はなし。

**このファイルを読むAIへの指示**：正式採用済み値と未承認の技術案を混同しない。旧空き家案を含めない。実行試験に合格したと書かない。