import express from "express";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const User = require("../models/user");

const register = async (req: express.Request, res: express.Response) => {
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
};

export { register };
