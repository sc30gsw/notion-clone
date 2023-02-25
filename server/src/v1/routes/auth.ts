import { login, register } from "../service/userService";
import express from "express";
import {
	printErrors,
	validConfirmPasswordLength,
	validPasswordLength,
	validUsernameExist,
	validUsernameLength,
} from "../handlers/validation";

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

// ユーザーログインAPI

router.post(
	"/login",
	validUsernameLength,
	validPasswordLength,
	printErrors,
	(req: express.Request, res: express.Response) => {
		login(req, res);
	}
);

module.exports = router;
