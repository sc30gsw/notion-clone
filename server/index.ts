import express, { Router } from "express";
import mongoose from "mongoose";
import "dotenv/config";

// Express FWによるローカルサーバーの立ち上げ
const app: express.Express = express();
const PORT = 4000;
const url = process.env.MONGODB_URL ? process.env.MONGODB_URL : "";

// jsonオブジェクトを扱うため
app.use(express.json());

// エンドポイント
app.use("/api/v1", require("./src/v1/routes/auth"));

// DB接続
try {
	mongoose.set("strictQuery", true);
	mongoose.connect(url);
	console.log("DB接続");
} catch (e) {
	console.log(e);
}

app.listen(PORT, () => {
	console.log("ローカルサーバー起動中");
});
