# 業務管理システム — フロントエンド

## 概要

日本企業向けの汎用業務管理システムのフロントエンド Web アプリケーションです。
ダッシュボード・社員管理・プロジェクト管理の画面を提供します。

このリポジトリは、OpenShift 上で CI/CD パイプライン（Tekton）と GitOps（ArgoCD）を
構築・学習するためのサンプルアプリケーションとして設計されています。

> **演習課題**: このリポジトリ用の CI/CD パイプラインは提供されていません。
> バックエンドのパイプライン定義を参考に、フロントエンド用のパイプラインを
> 自分で作成してください。

## 技術スタック

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Node.js | 20+（v0.1仕様: 24固定） | 実行環境 |
| Next.js | 15.x（App Router） | React フレームワーク |
| React | 19.x | UI ライブラリ |
| TypeScript | 5.7.x | 型安全な開発 |
| Tailwind CSS | 4.x | ユーティリティファーストCSS |
| Jest | 29.x | ユニットテスト |

## 画面一覧

### ダッシュボード（`/`）

業務全体の状況を一目で把握できるトップページ

- KPI カード（総社員数・進行中プロジェクト数・完了タスク数・出勤率）
- 最近のアクティビティ一覧

### 社員管理（`/employees`）

社員情報の一覧表示と管理

- 社員テーブル（社員番号・氏名・部署・役職・メール・在籍状態）
- 検索フィルター（氏名・部署）
- ページネーション

### プロジェクト管理（`/projects`）

プロジェクトの進捗状況を一覧で管理

- ステータスサマリーカード（全件数・進行中・計画中・完了）
- プロジェクトテーブル（コード・名前・クライアント・担当部署・ステータス・期間）

## ディレクトリ構成

```
frontend/
├── .s2i/
│   └── environment           ← OpenShift S2I ビルド設定
├── package.json              ← npm パッケージ設定
├── next.config.mjs           ← Next.js 設定（standalone出力・APIプロキシ）
├── tsconfig.json             ← TypeScript 設定
├── postcss.config.mjs        ← PostCSS 設定（Tailwind CSS）
├── jest.config.js            ← Jest テスト設定
│
├── app/                      ← Next.js App Router ページ
│   ├── layout.tsx            ← ルートレイアウト（サイドバー・ヘッダー）
│   ├── page.tsx              ← ダッシュボードページ
│   ├── globals.css           ← グローバルスタイル
│   ├── employees/
│   │   └── page.tsx          ← 社員管理ページ
│   └── projects/
│       └── page.tsx          ← プロジェクト管理ページ
│
├── components/               ← 共通コンポーネント
│   ├── Sidebar.tsx           ← サイドバーナビゲーション
│   └── Header.tsx            ← ヘッダーバー
│
├── public/                   ← 静的ファイル
│
└── __tests__/                ← ユニットテスト
    └── page.test.tsx
```

## ローカル開発

### 前提条件

- Node.js 20 以上
- npm 10 以上

### セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動（ホットリロード対応）
npm run dev

# ブラウザでアクセス
# http://localhost:3000
```

### ビルドとテスト

```bash
# ユニットテストの実行（CI/CD パイプラインと同じコマンド）
npm run test

# プロダクションビルド
npm run build

# プロダクションモードで起動
npm run start
# → http://localhost:8080
```

## バックエンド API との連携

フロントエンドは `next.config.mjs` の `rewrites` 設定により、
`/api/*` へのリクエストをバックエンドに自動プロキシします。

| 環境 | バックエンド接続先 |
|------|------------------|
| ローカル開発 | 環境変数 `BACKEND_URL` で指定（デフォルト: `http://bizapp-backend:8080`） |
| OpenShift | クラスタ内 Service `bizapp-backend:8080` に自動接続 |

ローカルでバックエンドと連携する場合：

```bash
# バックエンドを先に起動（別ターミナル）
cd ../backend && ./mvnw spring-boot:run

# フロントエンドを起動（BACKEND_URL を指定）
BACKEND_URL=http://localhost:8080 npm run dev
```

## OpenShift へのデプロイ

### CI/CD パイプライン（演習課題）

このリポジトリ用の CI/CD パイプラインは **演習課題** として、利用者自身が作成します。

バックエンドのパイプラインを参考に、以下の Task を作成してください：

| Task | 参考元（バックエンド） | 変更点 |
|------|---------------------|--------|
| `npm-build-test` | `maven-build-test` | `npm ci && npm run build && npm run test` |
| `s2i-nodejs-build` | `s2i-java-build` | Node.js ランタイムイメージを使用 |
| `git-update-manifest` | そのまま共用 | `APP_NAME` を `frontend` に変更するだけ |
| `git-clone` | そのまま共用 | OpenShift 内蔵 ClusterTask |

### S2I（Source-to-Image）

このアプリケーションは **S2I 方式** でコンテナイメージを生成します。
開発者が Dockerfile / Containerfile を記述する必要はありません。

- `next.config.mjs` で `output: 'standalone'` を設定済み
- Next.js のスタンドアロンビルド成果物を Node.js ランタイムイメージに組み込む
- `.s2i/environment` に S2I ビルド時の設定を記述

## 関連リポジトリ

| リポジトリ | 用途 |
|-----------|------|
| [bizapp-backend](https://github.com/juhou-merlin/bizapp-backend) | バックエンド（Spring Boot） |
| [bizapp-manifests-app](https://github.com/juhou-merlin/bizapp-manifests-app) | アプリ用マニフェスト（Kustomize） |
