import express from "express";
import { create, getAll } from "../service/memoService";
import { verifyToken } from "../middleware/tokenHandler";

const router = express.Router();

// メモ新規登録APIを呼び出し
router.post("/", verifyToken, (req: express.Request, res: express.Response) => {
	create(req, res);
});

// メモ一覧取得APIを呼び出し
router.get("/", verifyToken, (req: express.Request, res: express.Response) => {
	getAll(req, res);
});

module.exports = router;
