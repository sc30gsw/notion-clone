import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userApis from "./src/v1/api/userApi";

// Express FWによるローカルサーバーの立ち上げ
const app: express.Express = express();
const PORT = 4000;
const url = process.env.MONGODB_URL ? process.env.MONGODB_URL : "";

// jsonオブジェクトを扱うため
app.use(express.json());

// DB接続
try {
	mongoose.set("strictQuery", true);
	mongoose.connect(url);
	console.log("DB接続");
} catch (e) {
	console.log(e);
}

// ユーザーのAPI呼び出し
userApis(app);

app.listen(PORT, () => {
	console.log("ローカルサーバー起動中");
});
