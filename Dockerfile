# Node.js 20.9 を使う
FROM node:20.9

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json を先にコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# プロジェクトの残りのファイルをコピー
COPY . .

# 開発モードで起動
CMD ["npm", "run", "dev"]