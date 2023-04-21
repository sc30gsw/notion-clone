import express, { Router } from "express";
import mongoose from "mongoose";
import "dotenv/config";
const cors = require("cors");

const app: express.Express = express();

// CORS対応
app.use(
	cors({
		origin: "*",
		exposedHeaders: [
			"Content-Length",
			"Authorization",
			"Access-Control-Allow-Origin",
			"Access-Control-Allow-Headers",
		],
	})
);

// Express FWによるローカルサーバーの立ち上げ
const PORT = process.env.PORT || 4000;

const url = process.env.MONGODB_URL as string;

// jsonオブジェクトを扱うため
app.use(express.json());

// エンドポイントからAPIを呼び出す
app.use("/api/v1", require("./src/v1/routes"));

// DB接続
try {
	mongoose.set("strictQuery", true);
	mongoose.connect(url);
	console.log("DB接続");
} catch (e) {
	console.log(e);
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
