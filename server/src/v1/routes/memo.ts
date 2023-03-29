import express from "express";
import {
	create,
	deleteMemo,
	getAll,
	getOne,
	update,
} from "../service/memoService";
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

// メモ詳細取得APIを呼び出し
router.get(
	"/:memoId",
	verifyToken,
	(req: express.Request, res: express.Response) => {
		getOne(req, res);
	}
);

// メモ更新APIを呼び出し
router.put(
	"/:memoId",
	verifyToken,
	(req: express.Request, res: express.Response) => {
		update(req, res);
	}
);

// メモ削除APIを呼び出し
router.delete(
	"/:memoId",
	verifyToken,
	(req: express.Request, res: express.Response) => {
		deleteMemo(req, res);
	}
);

module.exports = router;
