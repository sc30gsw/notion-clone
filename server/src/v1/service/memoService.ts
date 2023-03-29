import express, { NextFunction } from "express";
import "dotenv/config";
import mongoose from "mongoose";

const Memo = require("../models/memo");

// メモ新規作成API
const create = async (req: express.Request, res: express.Response) => {
	try {
		const memoCount = await Memo.find().count();

		// メモ新規作成
		const memo = await Memo.create({
			user: req.user?.id,
			position: memoCount > 0 ? memoCount : 0,
		});

		return res.status(200).json(memo);
	} catch (e) {
		return res.status(500).json(e);
	}
};

// メモ一覧取得API
const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const memos = await Memo.find({ user: req.user?.id }).sort({
			updateDate: -1,
		});
		return res.status(200).json(memos);
	} catch (e) {
		return res.status(500).json(e);
	}
};

// メモ詳細取得API
const getOne = async (req: express.Request, res: express.Response) => {
	const { memoId } = req.params;
	try {
		const memo = await Memo.findOne({ user: req.user?.id, _id: memoId });
		if (!memo) return res.status(404).json("メモが存在しません");

		return res.status(200).json(memo);
	} catch (e) {
		return res.status(500).json(e);
	}
};

// メモ更新API
const update = async (req: express.Request, res: express.Response) => {
	const { memoId } = req.params;
	const { title, description } = req.body;
	try {
		if (title === "") req.body.title = "無題";
		if (description === "")
			req.body.description = "ここに自由に記入してください";

		const memo = await Memo.findOne({ user: req.user?.id, _id: memoId });
		if (!memo) return res.status(404).json("メモが存在しません");

		// メモ更新
		const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
			$set: { ...req.body, updateDate: Date.now() },
		});

		return res.status(200).json(updatedMemo);
	} catch (e) {
		return res.status(500).json(e);
	}
};

// メモ削除API
const deleteMemo = async (req: express.Request, res: express.Response) => {
	const { memoId } = req.params;
	try {
		const memo = await Memo.findOne({ user: req.user?.id, _id: memoId });
		if (!memo) return res.status(404).json("メモが存在しません");

		// メモ削除
		await Memo.deleteOne({ _id: memoId });

		return res.status(200).json("メモを削除しました");
	} catch (e) {
		return res.status(500).json(e);
	}
};

// メモお気に入り登録API
const favorite = async (req: express.Request, res: express.Response) => {
	const { memoId } = req.params;
	try {
		const memoCount = await Memo.find({ favorite: true }).count();

		const memo = await Memo.findOne({ user: req.user?.id, _id: memoId });
		if (!memo) return res.status(404).json("メモが存在しません");

		// メモ更新
		const favoriteMemo = await Memo.findByIdAndUpdate(memoId, {
			$set: {
				favorite: !memo.favorite,
				favoritePosition: memoCount > 0 ? memoCount : 0,
				updateDate: Date.now(),
			},
		});

		return res.status(200).json(favoriteMemo);
	} catch (e) {
		return res.status(500).json(e);
	}
};

export { create, getAll, getOne, update, deleteMemo, favorite };
