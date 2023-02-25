import { login, register } from "../service/userService";
import express from "express";
import {
	printErrors,
	validConfirmPasswordLength,
	validPasswordLength,
	validUsernameExist,
	validUsernameLength,
} from "../handlers/validation";
import { verifyToken } from "../middleware/tokenHandler";

const router = express.Router();

// ユーザー新規登録APIを呼び出し
router.post(
	"/register",
	validUsernameLength,
	validPasswordLength,
	validConfirmPasswordLength,
	validUsernameExist,
	printErrors,
	(req: express.Request, res: express.Response) => {
		register(req, res);
	}
);

// ユーザーログインAPIを呼び出し
router.post(
	"/login",
	validUsernameLength,
	validPasswordLength,
	printErrors,
	(req: express.Request, res: express.Response) => {
		login(req, res);
	}
);

// JWT認証APIを呼び出し
router.post(
	"/verify-token",
	verifyToken,
	(req: express.Request, res: express.Response) => {
		return res.status(200).json({ user: req.user });
	}
);

module.exports = router;
