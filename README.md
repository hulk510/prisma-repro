# monorepo-template

## Project概要

Monorepoを始めやすくするために自分用に作っているテンプレート。
ライセンスはMITですが、使用は自己責任でお願いします。要望等は受け付けていませんので悪しからず。

- Auth.js
- Next.js
- Storybook
- MSW
- Prisma + NeonDB

> [!TIP]
> Projectの構築にあたって、Sentryの設定などは適宜上書きしてください。また、いくつかいらないコンポーネントなどもあるため必要に応じて調整してください。

## Start Guide

### 環境変数のセットアップ

```bash
cp apps/web/.env.example apps/web/.env.local
cp packages/database/.env.example packages/database/.env
```

Auth.jsで使用するAUTH_SECRETの生成

```bash
cd apps/web
npx auth secret
```

こちらは必要なら、OAuthアプリを作成してそのID, Secretを追加

- AUTH_GOOGLE_ID
- AUTH_GOOGLE_SECRET

現状Global Envには以下を追加している

```json
  "globalEnv": [
    "DATABASE_URL",
    "AUTH_SECRET",
    "AUTH_GOOGLE_ID",
    "AUTH_GOOGLE_ID_SECRET",
    "AUTH_REDIRECT_PROXY_URL",
    "SENTRY_AUTH_TOKEN"
  ],
```

### Github Actionsの環境変数

リポジトリでは、Chromatic, CodecovがCIで動いているので、

- `CHROMATIC_PROJECT_TOKEN`
- `CODECOV_TOKEN`

上記のトークンを必要に応じてActionsのシークレットに追加する。削除する場合はCIから対象のアップロードしている処理をCIファイルから削除してください。

### 必要環境

- node v20以上
- pnpm（corepackでinstallできます）
- docker

### 構築手順

1. リポジトリをクローンする

```bash
gh repo clone hulk510/monorepo-template
```

2. pnpm install

```bash
pnpm install # or pnpm i
```

3. DBの起動

```bash
docker compose up -d
```

migrationを適用していない場合は起動後、下記コマンドを実行してください。

```bash
pnpm -F @repo/db db:migrate:dev
```

4. 開発環境の立ち上げ

```bash
pnpm dev
```

内部で動いてるturboコマンドがdev scriptを持ってるprojectを動かします。

## その他開発で使いそうなコマンド

Prisma（DB操作）

- `pnpm -F @repo/db db:migrate:dev`: DBのマイグレーションファイルを適用したり、作成します
- `pnpm -F @repo/db db:generate` or `turbo db:generate`: Prismaのクライアントコードの作成
- `pnpm -F @repo/db db:seed`: DBにseedデータの挿入
- `pnpm -F @repo/db db:push`: Migrationファイルを作成せずにDBの構成を変える（主に開発中に使う）

> [!TIP]
> `pnpm -F`workspaceを指定してそのパッケージのnpm scriptsが実行できます。

Format and lint

- `pnpm format-and-lint`: biomeでformatとlintを行う
- `pnpm format-and-lint:fix`: checkでエラー出た箇所を修正できるものは修正してくれる

## リポジトリ構成

Projectは[turbo repo](https://turbo.build/repo/docs)を使ったMonorepo構成になっています。

```bash
.
├── README.md
├── apps
│   ├── storybooks # packages/uiなどのUIコンポーネントを開発するためのStorybook
│   └── web # monorepo-templateのフロントエンド
├── biome.json
├── package.json
├── packages
│   ├── auth # auth.jsの設定
│   ├── database # prismaの設定
│   ├── mocks # mockの定義
│   ├── schema # zodのschema定義
│   ├── stylelint-config
│   ├── tailwind-config
│   ├── typescript-config
│   ├── ui # サービスで使うUIコンポーネントを定義しているところ
│   └── utils # 汎用的なUtils
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
└── turbo.json
```

apps, packagesにプロダクトのコードが入っていて、monorepo-templateのフロントエンドは`apps/web`に入っています。共通で使いたいものなどはpackagesの中に入っています。

### DB

[DatabaseのDBML](/packages/database/prisma/dbml/schema.dbml)の内容をコピーして、https://dbdiagram.io/d に全て貼り付けて確認できます。
