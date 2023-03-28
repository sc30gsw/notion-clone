import express from "express";
import { create } from "../service/memoService";
import { verifyToken } from "../middleware/tokenHandler";

const router = express.Router();

// メモ新規登録APIを呼び出し
router.post("/", verifyToken, (req: express.Request, res: express.Response) => {
	create(req, res);
});

module.exports = router;
