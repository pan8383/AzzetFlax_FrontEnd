```bash

npm run dev

```

my-next-app/
├── app/
│ ├── \_api/ ← APIルート（serverless functions）
│ │ └── asset/
│ │ └── get/
│ │ └── route.ts ← GET APIエンドポイント
│ ├── assets/ ← ページやコンポーネントごとのフォルダ例
│ │ ├── page.tsx ← /assets ページ
│ │ └── components/
│ │ └── AssetRow.tsx
│ ├── layout.tsx ← ルートレイアウト（全ページ共通）
│ ├── page.tsx ← ルートページ（/）
│ └── globals.css ← グローバルCSS
├── components/ ← ページ間で共通して使うUIコンポーネント
│ └── Header.tsx
├── public/ ← 画像・faviconなどの静的ファイル
│ └── favicon.ico
├── styles/ ← CSSモジュールやグローバルスタイル
│ └── globals.css
├── types/ ← TypeScript型定義
│ └── assets.ts
├── node_modules/
├── package.json
├── middleware.tsx ← ログイン必須のページリクエストのガード
├── next.config.js
└── tsconfig.json
