> **STEP4の正式更新（2026-11-19）：開発順序はB案＝A〜Dが最初から並行開発を採用。** 以下の「先行順」は**本物APIに接続・統合する順序**であり、各担当の画面作成開始を待たせる意味ではありません。[並行開発の正式計画](STEP4_PARALLEL_DEVELOPMENT_EXECUTION_PLAN_20261119.md)を優先してください。担当GitHub Issue #23〜27/#34〜44は割当済み。実装/実行試験は未開始。

# 開発開始ガイドと作業パッケージ依存表（2026-11-19）

**開発許可が出る前の作業手順書。12件の新Issue #34〜45は**計画タスク**で、アプリ実装/テストを開始したわけではない。現行のA〜D開発者＋E品質責任の5人体制を想定し、GitHub実アカウントは未割当。

## 最初に全員が読むもの
1. [最新ADRと旧文書の衝突監査](FINAL_SOURCE_OF_TRUTH_AND_LEGACY_CONFLICT_AUDIT_20261119.md)、ADR-029〜032。
2. [親12件の優先度判定](STEP8_10_CANONICAL_INPUT_MAPPING_AND_ENUM.md)と[JSON v1](contracts/VALIDATION_NOTES.md)。
3. [画面/エラー](STEP14_SCREEN_BEHAVIOR_AND_ERROR_MATRIX_20261119.md)、[API](STEP25_TYPESCRIPT_DOMAIN_TYPES_AND_REPOSITORY_SIGNATURES_20261119.md)、[状態遷移](STEP26_SAVE_EDIT_RECHECK_STATE_TRANSITIONS_20261119.md)。
4. [自分の担当と人がする作業](ACTION_CHECKLIST_OWNER_DELIVERABLES_20261119.md)。

## 開発パッケージ：大Issueは親として保持

| 役割 | 最初のパッケージ | 次のパッケージ | 依存 | 主な注意点 |
|---|---|---|---|---|
| **A 参加** | [#34 D00/D01](https://github.com/kot5432/vacant-house/issues/34) | [#35 D02](https://github.com/kot5432/vacant-house/issues/35) | Eの掲載根拠・カタログ契約 | `visible=0`でも動く、unknownを捏造しない |
| **B 主催プラン** | [#36 U02](https://github.com/kot5432/vacant-house/issues/36) | [#37 P01〜12/U03読取](https://github.com/kot5432/vacant-house/issues/37) | Dの型/Repository API | P05/P08固定。条件を推測しない |
| **C 進捗/編集** | [#38 U03親進捗](https://github.com/kot5432/vacant-house/issues/38) | [#39 U04編集](https://github.com/kot5432/vacant-house/issues/39) | DのCAS、Bの判定/カード | 進捗statusを勝手に戻さない |
| **D 保存** | [#40 共有型/検証](https://github.com/kot5432/vacant-house/issues/40) | [#41 Dexie/CAS/U01](https://github.com/kot5432/vacant-house/issues/41) → [#42 JSON](https://github.com/kot5432/vacant-house/issues/42) | ADR-032、Schema/fixture | 旧子チェックを持たない |
| **E 地域/品質** | [#43 一次情報審査](https://github.com/kot5432/vacant-house/issues/43) | [#44 需要/品質証拠](https://github.com/kot5432/vacant-house/issues/44) | A/Bの別人確認、本人調査実施 | 自分の作成した掲載候補/PRを自分だけで承認しない |
| **全員** | [#45 統合・受入](https://github.com/kot5432/vacant-house/issues/45) | 動作動画・提出前確認 | #34〜44の必要範囲 | 未実装機能を完成と発表しない |

## 先行順（依存があるから同時に同じファイルを編集しない）
1. D担当は**#40 型とRepository公開境界**をまず共有。B/Cはその定義をレビュー、独自の似た型を増やさない。
2. Aは#34の0件表示、Eは#43の根拠/別人確認フローを並行で進める。情報公開の条件は別。
3. Bは#36のU02、#37のルール（純粋導出）をDの型で進める。
4. Dの#41 CASが揃った後、Cの#38/#39を保存APIへ接続。
5. Dの#42 JSONを作り、Aの#35 D02出典表示をEの掲載判断へ接続。
6. 最後に全員で#45。**各項目の試験実行とmainマージは実装許可後**。

## 毎PRで書くべきこと
- 関連Issue/変更したファイル/影響する画面・保存型/既決ADRとの対応。
- **実際に実行した**チェックと結果。実行前は`not_run`。再現手順/検証環境。
- 機能増加（ログイン・DM・外部投稿・子チェックなど）や無断の仕様変更がないこと。
- レビュアーの承認と解決したコメント。作者の自己承認をしない。
- 機密情報や個人の情報が含まれていないこと。

## 完了の意味
- **本ドキュメントとIssueが作成済み**＝計画の準備は完了。
- **別の人が実際にレビューした**＝人レビュー完了（未実施）。
- **実動作の検証結果がある**＝動作が確認された（未実施）。
- **応募フォーム提出の控えがある**＝提出完了（未実施）。

残る本人アクションは[具体的な実行チェックリスト](ACTION_CHECKLIST_OWNER_DELIVERABLES_20261119.md)のH01〜H05を参照。
