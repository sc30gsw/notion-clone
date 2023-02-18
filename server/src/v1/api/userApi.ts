import { register } from "../service/userService";
import express from "express";

const userApis = (app: express.Express) => {
	// ユーザー新規登録API
	app.post("/register", (req: express.Request, res: express.Response) => {
		register(req, res);
	});
};

export default userApis;
