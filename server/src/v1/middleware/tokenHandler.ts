import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";

// クライアントから渡されたJWTが正常か検証
const tokenDecode = (req: express.Request) => {
	// リクエストヘッダーの"authorization"を取得
	const bearerHeader = req.headers["authorization"];

	// bearerHeaderが存在する場合
	if (bearerHeader) {
		// トークンを取得
		const bearer = bearerHeader.split(" ")[1];
		try {
			// トークンを復号
			const secret = process.env.TOKEN_SECRET_KEY
				? process.env.TOKEN_SECRET_KEY
				: "";
			const decodedToken = jwt.verify(bearer, secret);
			return decodedToken;
		} catch (e) {
			return false;
		}
	} else {
		return false;
	}
};

// JWTを検証するためのミドルウェア
const vefiryToken = (
	req: express.Request,
	res: express.Response,
	next: NextFunction
) => {};

export { vefiryToken };
