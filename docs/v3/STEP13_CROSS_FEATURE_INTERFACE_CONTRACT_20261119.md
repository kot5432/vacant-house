# STEP13｜機能間インターフェース契約（実装前のレビュー用）
2026-11-19。設計のみ。ADR-030（参加D00〜02＋主催U01〜04）とADR-031（P01〜P12親進捗のみ）に従う。**未採用リテラルは実装前レビュー待ち**。

## 現在の5人分担（旧技術別A〜D割当を上書きする運用案）
| 役割 | 単独で所有する機能 | 協業先 |
|---|---|---|
| A | D00入口とD01検索・D02活動詳細、出典/不明表示 | E：活動カタログの一次根拠、B：主催導線 |
| B | U02基本6問、P01〜12判定、U03表示カード・理由/次の一歩 | D：作成保存、C：進捗表示 |
| C | U03親進捗操作・明示的再確認解除・U04編集 | D：保存API、B：U03カードUI |
| D | U01ホーム・保存一覧、Dexie、JSONバックアップ、型と保存検証 | B/C：利用契約 |
| E | 高岡の一次情報、公開用カタログの品質/掲載停止、全機能の受入確認、PRレビュー | A：画面/索引、全員：実証 |

## 共有データの単一責任
- Dが`EventInput/EventRecord/TaskProgress`と保存用validator/APIの唯一の定義元を担当。B/Cがそれを参照し、独自の似た型を作らない。
- Bが判定エンジンの唯一の定義元。入力は基本6問と既決の任意回答、出力は`TaskId/priority/applicability/reasonCodes/nextAction`。P05未成年含むP1、P08基本P2、同順位P01〜12昇順。priorityはEventRecord/JSONに保存しない。
- CがU03/U04操作を担当するが、直接Dexieに書かない。DのCAS付きRepositoryを呼ぶ。本人の進捗と出典の鮮度は別次元。
- AがActivityCatalog表示用の型を管理し、Eが一次資料を照合して公開データを用意。主催EventRecordへのコピーは禁止。
- **checkedItemIdsなし**。設備カテゴリ4候補と再確認理由8候補は正式enum採用前、[STEP12-①](STEP12_01_FINAL_TECHNICAL_REVIEW_DEFAULTS_20261119.md)に従いレビューする。

## Repository APIの概念契約（メソッド名・戻り型は提案）
| API案 | 発信者 | 戻り / 保存境界 |
|---|---|---|
| `listEvents(),getEvent(id)` | D/U01、B/C | 保存済み親レコードの読取。破損/未知版を黙って捨てない |
| `createEvent(input)` | B/U02 | 入力全件検証→新規revision1。失敗でU02入力保持、U03へ進まない |
| `updateTaskProgress(id,taskId,status,expectedRevision)` | C/U03 | 対象親progressとrevisionのみ原子的更新。別タブ競合は拒否 |
| `clearRecheck(id,taskId,expectedRevision)` | C/U03 | 本人明示解除でneedsRecheck=false＋理由空、status維持 |
| `saveEventInput(id,input,expectedRevision)` | C/U04 | 明示保存、影響親の再確認・施設固有値クリアを含む、失敗時不変 |
| `deleteEvent(id,expectedRevision)` | D/U01 | 確認後に削除、古いタブから再作成しない |
| `exportSelected(ids)` | D/U01 | 本人選択した保存済みイベントのみ。100件/2MiB上限、無断省略なし |
| `previewImport(bytes),confirmImport(preview)` | D/U01 | 全件検証→衝突件数表示→本人承認→原子的な別ID追加 |

戻りは成功・入力不正・競合・対象なし・保存不可を**判別可能な結果**とし、成功のふりをしない。import previewの承認後も衝突/容量/整合の再検査が必要。

## 画面間の受渡し
| 遷移 | 共有するもの | 保護条件 |
|---|---|---|
| D00→D01→D02→戻る | activityId、地域/分野の絞込（画面state） | 活動が消えたらエラー/一覧へ。外部リンクを創作しない |
| D02→U02 | **空の新規入力草稿** | 参加活動の本文/申込・個人情報を自動転記しない |
| D00→U01 | 主催入口のみ | 参加データがなくても開く |
| U01→U02→U03 | U02は未保存React state、保存成功後のeventId | 保存失敗時草稿を保持 |
| U03→U04→U03 | eventId、最新revision、編集草稿 | キャンセル、競合・保存失敗時はDB不変 |
| U01→JSON | EventRecordのみ | 参加カタログと公式出典は含めない |

## 実装前の確認事項
1. D/B/CでEventRecord v1のrequired/optional、`input.date`、`optionalDescription`/由来キーの一意化をレビュー。
2. C/DでCAS失敗時の画面文言と進捗状態の扱いをレビュー。
3. A/EでActivityCatalogのID/URL/確認日/unknown値/掲載停止をレビュー。
4. 全員でADR-030/031、既存の受入ケースを机上で確認。**実行テストはnot_run**。
