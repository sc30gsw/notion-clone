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

const login = async (req: express.Request, res: express.Response) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username: username });

		// ユーザーが存在しない場合
		if (!user) {
			return res.status(401).json({
				errors: {
					param: "username",
					message: "ユーザー名が無効です",
				},
			});
		}

		// パスワードが合致するか照合
		// →新規登録時に暗号化したパスワードを復号化することで照合可能
		const secret = process.env.TOKEN_SECRET_KEY
			? process.env.TOKEN_SECRET_KEY
			: "";
		const decryptedPassword = CryptoJS.AES.decrypt(
			user.password,
			secret
		).toString(CryptoJS.enc.Utf8);

		// 入力したパスワードが復号化したパスワードと一致しない場合
		if (decryptedPassword !== password) {
			return res.status(401).json({
				errors: {
					param: "password",
					message: "パスワードが無効です",
				},
			});
		}

		// JWTトークンの発行
		const token = jwt.sign({ id: user._id }, secret, {
			expiresIn: "24h",
		});

		return res.status(201).json({ user, token });
	} catch (e) {
		return res.status(500).json(e);
	}
};

export { register, login };
