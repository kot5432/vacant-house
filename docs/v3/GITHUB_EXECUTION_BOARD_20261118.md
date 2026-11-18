# 実装直前｜GitHubタスク管理の実際の登録状況（2026-11-18）

**実際に作成済み**：GitHub Issues 13件（設計5、実装待ち8）、Issue/PRテンプレート各1。**未作成**：GitHub Projectsボード、ラベル、担当者割当、PR、ブランチ、実装コード、CI、テスト実行、デプロイ。

## 1. 実際のIssueへの入口

### 設計：実装前に解消する5件

| GitHub Issue | 内容 | 状態 |
|---|---|---|
| [#1](https://github.com/kot5432/vacant-house/issues/1) | DESIGN-01 保存キー・importedFrom・JSON v1仕様 | open、未完了 |
| [#2](https://github.com/kot5432/vacant-house/issues/2) | DESIGN-02 U01〜U04とサービスの境界 | open、未完了 |
| [#3](https://github.com/kot5432/vacant-house/issues/3) | DESIGN-03 P01〜P12と保存・復元の固定期待ケース | open、未完了 |
| [#4](https://github.com/kot5432/vacant-house/issues/4) | DESIGN-04 4人の実担当とレビュー責任 | open、未完了 |
| [#5](https://github.com/kot5432/vacant-house/issues/5) | DESIGN-05 高岡市4施設比較・管理者質問の確認 | open、未完了 |

### 実装待ち：機能単位の8件（着手禁止）

| GitHub Issue | 機能 | 仮担当 | 依存 |
|---|---|---|---|
| [#6](https://github.com/kot5432/vacant-house/issues/6) | 共通型・runtime validation | A | #1 |
| [#7](https://github.com/kot5432/vacant-house/issues/7) | U02・イベント作成 | B | #1,#2,#6 |
| [#8](https://github.com/kot5432/vacant-house/issues/8) | P01〜12・理由 | A | #1,#3,#6 |
| [#9](https://github.com/kot5432/vacant-house/issues/9) | EventRepository・CAS | C | #1,#6 |
| [#10](https://github.com/kot5432/vacant-house/issues/10) | U03表示・進捗 | B（C補助） | #2,#3,#7,#8,#9 |
| [#11](https://github.com/kot5432/vacant-house/issues/11) | U01一覧・U04編集 | B（C補助） | #2,#7,#9 |
| [#12](https://github.com/kot5432/vacant-house/issues/12) | JSON書出し・検証・取込 | C（A,Dレビュー） | #1,#3,#6,#9,#11 |
| [#13](https://github.com/kot5432/vacant-house/issues/13) | 公式出典・共通UI・品質 | D | #3,#5,#8,#10 |

**#12は大きい**ため実装開始後に`export/validate/preview/commit`へ分割する。#13も出典・共通UI・試験を必要に応じ分割。これらが「1PRで全部実装する」指示ではない。

## 2. 追加した実ファイル

- [.github/ISSUE_TEMPLATE/feature.md](https://github.com/kot5432/vacant-house/blob/main/.github/ISSUE_TEMPLATE/feature.md)
- [.github/PULL_REQUEST_TEMPLATE.md](https://github.com/kot5432/vacant-house/blob/main/.github/PULL_REQUEST_TEMPLATE.md)
- [初版データの最終技術案](PREIMPLEMENTATION_TECHNICAL_FREEZE_CANDIDATES_20261118.md)

## 3. GitHub Projectsの推奨設定（**未作成**）

1. リポジトリに関連付けるProjectを作成し、名前例「地域イベント準備ガイド｜開発管理」。
2. Status欄：`Backlog / Ready / In progress / Review / Testing / Done`。現在の実装Issue #6〜13は`Backlog`。設計 #1〜5 も未完了として置く。
3. カスタム`Area`：`foundation, event-input, rules, plan, data, backup, sources, quality`。必要に応じ`Work`：`critical/normal/later`。アプリ内部P1/P2/P3とGitHub優先度ラベルを混同しない。
4. 設計と実装はフィルタ/ビューで分ける。担当者は4人のGitHubユーザー名が確認できるまで割り当てない。
5. `main`直pushを避け、feature branch→小PR→別人レビュー→試験記録→mergeのルール。**保護設定やCIは未変更**。
6. Projectが作れなくてもリポジトリIssuesで作業の参照は可能。Projectの有無でテスト完了や実装開始許可を判定しない。

## 4. 決定済み・未決の境界

**正式決定**：4人初心者・AIコーディング中心、React/TS/Vite + Dexie/IndexedDB + Vercel、初回JSON v1のformatIdと`input.date`（ADR-029）、基本6問、P01〜12、4画面、本人進捗のCAS、バックアップ100件/2MiB。

**技術案を一本化・まだ承認していない**：`optionalDescription`へのイベント説明キー統一、`importedFrom`の非再帰形状、checkedItemIds・設備カテゴリの厳密列挙、JSON重複キー扱い、完全な機械可読Schema。

**実行待ち**：アンケート、施設管理者への実問い合わせ、ユーザーによる実装開始・公開許可、実ブラウザ試験。

## 5. チームの最初の作業

1. #1の型・JSON・由来メタデータをレビューし完了。
2. #2と#3のサービス境界と固定判定ケースを別レビュアーが確認。
3. #4で実際の4人の役割・レビュアー・GitHubアクセスを設定。
4. #5で公式出典は未確認を未確認と維持（問い合わせは別承認）。
5. **明示の実装開始許可が出てから**#6→#7/#8/#9→#10/#11→#12/#13へ着手。

**禁止**：このドキュメントやIssue登録を実装完了、試験PASS、公開済み、需要実証済みと表現しない。旧空き家案のデータ・機能を持ち込まない。
