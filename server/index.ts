import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const User = require("./src/v1/models/user");

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
app.post("/register", async (req: express.Request, res: express.Response) => {
	// パスワードの受け取り
	const password = req.body.password;
	try {
		// パスワードの暗号化
		const key = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";
		req.body.password = CryptoJS.AES.encrypt(password, key);

		// ユーザー新規作成
		const user = await User.create(req.body);

		// JWTの発行
		const secret = process.env.TOKEN_SECRET_KEY
			? process.env.TOKEN_SECRET_KEY
			: "";
		const token = jwt.sign({ id: user._id }, secret, {
			expiresIn: "24h",
		});

		return res.status(200).json({ user, token });
	} catch (e) {
		return res.status(500).json(e);
	}
});

app.listen(PORT, () => {
	console.log("ローカルサーバー起動中");
});
