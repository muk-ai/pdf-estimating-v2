[Bolt](https://bolt.new/)に作成してもらった  
自分でやった事はファイルをアップロードしたのとリポジトリ名を書き換えたくらい

# Work Estimation Visualization Tool

三点見積もりとベータ分布を使用してプロジェクト完了確率を可視化するツールです。

## 機能

- 楽観的見積もり、最頻値、悲観的見積もりの入力
- ベータ分布による確率密度の可視化
- PERT公式による期待値の計算
- レスポンシブデザイン

## 技術スタック

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Chart.js
- Lucide React

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## GitHub Pagesへのデプロイ

このプロジェクトはGitHub Actionsを使用してGitHub Pagesに自動デプロイされます。

### セットアップ手順

1. GitHubリポジトリの設定で、Pages設定を開く
2. Source を "GitHub Actions" に設定
3. `main` ブランチにプッシュすると自動的にデプロイされます

## ライセンス

MIT License
