import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { register } from "./src/v1/service/userService";

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

// ユーザー新規登録API
app.post("/register", (req: express.Request, res: express.Response) => {
	register(req, res);
});

app.listen(PORT, () => {
	console.log("ローカルサーバー起動中");
});
