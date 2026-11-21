# ドキュメントの使い分けと整理方針（2026-11-21）

## なぜ残っているファイルが多い？
2026-11-21時点のGitHub mainのツリーを実査した結果、`docs/` に **249ファイル**（`docs/v3/` の技術契約・判断履歴などを含む）がありました。ほとんどは設計の検討過程で生まれた資料です。**Codexも人間も全件を最初から読む必要はありません。**

重要な点：**「不要そうな古い文書」と「正式決定の根拠として保持すべき文書」は別物**。古いSTEPや選択肢の資料も、採用経緯・調査出典・理由コードの根拠を含むことがあります。リンク参照元や最終採否の監査なしに一括削除・移動するとリンク破損と仕様消失を招くため、この整理では**削除・移動していません**。ファイル数を減らしたという意味ではありません。

## 使い分け（普段は上2段だけ）

| 分類 | 正本・ファイル | 読む人 |
|---|---|---|
| **1. 開発の入口** | [CODEX_START_HERE](CODEX_START_HERE.md)、[AGENTS](../AGENTS.md)、[PCセットアップ](ALL_MEMBERS_PC_SETUP.md)、[担当Issue #34〜#42](https://github.com/kot5432/vacant-house/issues) | A〜Dが最初に読む |
| **2. 採用済み仕様** | [v3正式仕様の短い目次](v3/README.md)、`ADR_001〜032`（特に029〜032）、[Schema/fixtures](v3/contracts/VALIDATION_NOTES.md)、[共通UI](v3/SHARED_UI_IMPLEMENTATION_AND_OWNERSHIP_20261121.md) | Codexが実装範囲に応じて参照 |
| **3. 機能の詳細契約** | [画面・エラー](v3/STEP14_SCREEN_BEHAVIOR_AND_ERROR_MATRIX_20261119.md)、[型/API](v3/STEP25_TYPESCRIPT_DOMAIN_TYPES_AND_REPOSITORY_SIGNATURES_20261119.md)、[進捗・再確認](v3/STEP26_SAVE_EDIT_RECHECK_STATE_TRANSITIONS_20261119.md)、[受入試験](v3/STEP27_TEAM_TASK_ACCEPTANCE_AND_RELEASE_GATES_20261119.md)、[公開活動の出典](v3/STEP28_TAKAOKA_VERIFIED_SOURCE_REVIEW_REGISTER_20261119.md) | 当該担当・レビュー時 |
| **4. 古い検討・履歴** | `docs/v3/STEP2_SURVEY_Q*_OPTIONS*`、`STEP6_*`〜`STEP12_*`の選択肢・草案、`PREDEV_*`、`PREIMPLEMENTATION_*`、`FOUR_PERSON_*`、[旧README履歴](v3/README_HISTORY_20261121.md)、旧 `docs/CURRENT_PRODUCT_SPEC.md` など | 原則読まない。採用理由の調査時のみ |
| **5. 旧環境構築の手順** | `docs/ISSUE51_WINDOWS_FINAL_STEPS.md`、`docs/START_DEVELOPMENT_20261121.md` 内の古い途中経過 | **現行の操作には使用禁止**。代わりに[セットアップ](ALL_MEMBERS_PC_SETUP.md)を使う |

## 正本の優先順位
1. 新しい**採用済みADR**と現在の担当Issueの確定条件（矛盾なら人間へ相談）。
2. mainで動く実ファイル・最新の型/API（仕様改変ではなく実装実態を確認するため）。
3. このページからリンクされた現行の仕様・契約。
4. それ以前の草案・選択肢・検討履歴（正式決定を上書きしない）。

- `docs/v3/ADR_001`〜`ADR_032`、`docs/v3/contracts`、根拠台帳は**勝手に削除しない**。
- `src/`、`package.json`、`package-lock.json`、`AGENTS.md`、`CONTRIBUTING.md`は開発に直接使う。
- 今回保管したままの文書を「現行実装仕様」としてAIに一括投入しない。
- さらに物理的に削減する場合は、**1件ごとに**参照リンク→採用された情報→後継資料→必要なレビューを確認し、削除・移動により参照切れが起きないよう更新する。

## 直近の次の作業
[開発前チェック](DEVELOPMENT_READINESS_20261121.md)に「A〜D本人のPC環境」「main保護の実効性」「共通UIテストと担当境界」「仕様／型の接続」「応募資料」を分けて記録。ここに列挙されていない過去のSTEPを順に消化する必要はありません。
