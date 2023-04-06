# 概要
Notionのクローンアプリを作成しました。

# 使用技術
- Typescript
- React.js
- Redux
- Node.js
- MongoDB

# アプリケーション起動手順
- git clone https://github.com/sc30gsw/notion-clone.git
- cd server
- npm install
- cd ../client
- npm install
- MongoDBでプロジェクトを作成し、アプリケーションの接続設定を行う
- .envを作成し、環境変数として以下を定義する

- MONGODB_URL = 'MONGODBのアプリケーション接続URL'
- SECRET_KEY = '任意の文字列'
- TOKEN_SECRET_KEY = '任意の文字列'

- npm start
