import express, { NextFunction } from "express";
import "dotenv/config";
import mongoose from "mongoose";

const Memo = require("../models/memo");

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

export { create };
