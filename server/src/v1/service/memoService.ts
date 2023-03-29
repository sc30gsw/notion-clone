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
		const memos = await Memo.find({ user: req.user?.id }).sort("-position");
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

export { create, getAll, getOne };
