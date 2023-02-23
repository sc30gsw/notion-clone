import { register } from "../service/userService";
import express, { NextFunction } from "express";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

const router = express.Router();

const User = require("../models/user");

const validUsernameLength = body("username")
	.isLength({ min: 8 })
	.withMessage("ユーザー名は8文字以上である必要があります");

const validPasswordLength = body("password")
	.isLength({ min: 8 })
	.withMessage("パスワードは8文字以上である必要があります");

const validConfirmPasswordLength = body("confirmPassword")
	.isLength({ min: 8 })
	.withMessage("確認用パスワードは8文字以上である必要があります");

const validUsernameExist = body("username").custom((value: string) => {
	return User.findOne({ username: value }).then((user: mongoose.Schema) => {
		if (user) {
			return Promise.reject("このユーザーはすでに使われています");
		}
	});
});

// ユーザー新規登録APIを呼び出し
router.post(
	"/register",
	validUsernameLength,
	validPasswordLength,
	validConfirmPasswordLength,
	validUsernameExist,
	(req: express.Request, res: express.Response, next: NextFunction) => {
		const errors = validationResult(req);
		// エラーが存在する場合
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// エラーが存在しない場合
		next();
	},
	(req: express.Request, res: express.Response) => {
		register(req, res);
	}
);

module.exports = router;
