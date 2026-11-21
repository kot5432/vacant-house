# 共通UIコンポーネントと共有ファイルの編集・統合ガイド（Issue #65）

> **状態：レビュー前の実装案。** `chore/65-shared-ui-foundation` に追加。E本人のPRであるため、**A〜Dのいずれか別人によるレビューが済むまでmainにマージしない**。配色などの数値は暫定トークンであり、デザインの最終確定ではない。

## 1. 何を共通化したか

| パス | 用途 | 使用者 |
|---|---|---|
| `src/ui/styles/tokens.css` | 色、角丸、余白基準、本文幅、共通フォーカス表示 | A〜D全員 |
| `src/ui/styles/components.css` | 共通コンポーネントの見た目 | A〜D全員 |
| `src/ui/components/Button.tsx` | 主・副・危険ボタン、処理中、無効化 | A/B/C/D |
| `src/ui/components/Card.tsx` | 情報表示用の共通カード | A/B/C/D |
| `src/ui/components/PageLayout.tsx` | 共通ヘッダー/本文幅/見出し、戻る操作枠 | A/B/C/D |
| `src/ui/components/FormField.tsx` | ラベル、ヒント、入力、エラー、aria属性 | 主にB/C |
| `src/ui/components/StatusMessage.tsx` | 成功/警告/失敗/情報の共通表示 | A/B/C/D |
| `src/ui/components/index.ts` | 共通コンポーネントのimport窓口 | A〜D全員 |
| `src/main.tsx` | CSSを1回だけ読み込む（既存画面の機能変更なし） | **共有管理対象** |

## 2. 実際の使い方（取り込み後）

```tsx
import { Button, Card, FormField, PageLayout, StatusMessage } from './ui/components'

function Example() {
  return (
    <PageLayout title="イベントを企画する" description="基本情報を入力してください">
      <Card>
        <FormField label="イベントの名前（任意）" name="title" hint="個人情報は入力しないでください" />
        <Button onClick={() => { /* 実際の処理は担当機能で実装する */ }}>次へ</Button>
      </Card>
      <StatusMessage tone="info">この例は共通UIの使用方法です。保存機能ではありません。</StatusMessage>
    </PageLayout>
  )
}
```

上記の相対importは配置先に応じて変更する（例：`src/features/...`からなら `../../ui/components`）。`Button`は原則`type="button"`、フォーム送信に使うときだけ`type="submit"`を指定する。削除の確認ダイアログやルーティングは各機能側の責任であり、`Button`自身は処理を実行しない。

## 3. 共有ファイルの責任分界（最初の開発段階）

| 対象 | 変更窓口・調整責任 | 原則 |
|---|---|---|
| `src/main.tsx`、`src/App.tsx`、画面遷移・トップレベルのルーティング | **Eが変更調整を担当**。実際にコードを書く人はEがIssue単位で指名 | A〜Dが直接同時編集せず、画面追加/遷移追加は小PR・Eと関係者レビューで接続 |
| `src/ui/**`、全体スタイル | **Eが共通UI仕様と変更調整を担当**。誰でも修正案をIssueで提案可 | 変更の影響をA〜Dに知らせ、少なくとも実利用者1名がPRレビュー |
| 参加D00〜D02 | A、掲載事実はEレビュー | 参加画面は主催イベントのIndexedDBを操作しない |
| U02入力・U03表示/判定 | B | Dの共有型を使用。U03進捗部品はCの責任 |
| U03進捗・U04編集 | C | 保存APIはDを経由。U03の親画面はB/Cが接続方法を合意し、Eが最終調整 |
| 共通型/Repository/IndexedDB/U01/JSON | D | 型変更時はB/Cへ事前連絡とレビュー |
| `package.json`、`package-lock.json`、tsconfig、Vite設定 | Eが変更調整。必要に応じてD等が実装提案 | 担当者ごとの依存追加は禁止。変更は独立したIssue/PRで実施 |

**これは「Eが全コードを書く」という意味ではない。** 共通ファイルの変更衝突を防ぐための窓口で、機能コードはA〜Dが担当する。

## 4. BとCが同じU03を作る場合の接続

```text
U03親画面（接続方針はB/C/Eで調整）
├─ B: 準備タスクの表示・優先度・理由・次の一歩
└─ C: 親タスクstatus変更、要再確認解除、保存状態
      └─ D: Repository API、CAS、IndexedDB（唯一の保存層）
```

- Bは表示カードの専用コンポーネント、Cは進捗操作の専用コンポーネントを作成。
- どちらかが相手の部品を独自実装したり、`App.tsx`を同時編集したりしない。
- Dの型/メソッドがまだ完成していないときは、明示的なmockで画面単体を作る。保存できたふりをしない。
- **11/25まで**にB/C/D/EでUIの結合位置と型/APIをIssue #37/#38/#40に書いて合意。

## 5. GitHub Desktopで他メンバーの機能を取り込む

1. 自分の未コミットの変更を確認してからGitHub Desktopで`main`に切り替える。
2. **Fetch origin → Pull origin**で最新mainを取得。
3. 自分の作業ブランチに戻り、**Branch → Update from main**で最新コードを取り込む。
4. `npm run typecheck`、`npm run build`、影響画面のローカル確認を行う。
5. 衝突時は他人の変更を破棄したり、全ファイルを自分側で上書きしない。E＋該当担当に相談。
6. この共通UI PRがmainに**マージされてから**、A〜Dは同じ操作で共通部品を取り込む。**PRを作成しただけでは各メンバーのPCは更新されない。**

## 6. UIを実装する人のチェックリスト

- [ ] `src/ui/components`から共通部品をimportした
- [ ] 色や文字・余白はtokenで指定し、画面ごとに独自のデザイン体系を作っていない
- [ ] `PageLayout`の共通本文幅・ヘッダーを守った
- [ ] フォームはラベルとエラーが関連付けられている
- [ ] 保存・競合・未確認の状態は色だけに依存していない
- [ ] 幅320px・文字200%・キーボード・フォーカスを手元で確認した（未確認はnot_run）
- [ ] 変更対象が自分のIssueと責務に収まっている
- [ ] 共通ファイルを変える場合はEと関連担当レビューを依頼した

## 7. 検証状況と注意

- この段階で**実際のnpm typecheck/build/画面操作は未実施（not_run）**。Eか別担当がPRレビュー時に実行し、結果を記録する。
- `FormField`は基本的なテキスト入力用。日付・ラジオ選択・施設条件・複数選択の仕様を代わりに実装したものではない。
- `PageLayout`の`backAction`は呼び出し元がリンク/ボタンを指定する。ブラウザー履歴操作やルーティングは共通部品へハードコードしない。
- 現在の`src/App.tsx`は環境確認用プレースホルダーのまま。共通部品を各画面に実際に適用するのは担当者のPR以降。
- トークンの色・本文幅などは提案値。**視認性・コントラスト、長文と狭幅の実機確認後**に正式確定する。
- このPRでCI、Vercel、イベント掲載、アンケート配布、一般公開はしない。

## 関連
- [共通開発ルール](TEAM_SHARED_DEVELOPMENT_AND_UI_RULES_20261121.md)
- [担当別の計画](TEAM_INDIVIDUAL_DEVELOPMENT_SCHEDULE_PROPOSAL_20261121.md)
- [機能間インターフェース](STEP13_CROSS_FEATURE_INTERFACE_CONTRACT_20261119.md)
- [ADR-030](ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md) / [ADR-031](ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md) / [ADR-032](ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md)
