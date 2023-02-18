import express from "express";

// Express FWによるローカルサーバーの立ち上げ
const app: express.Express = express();
const PORT = 4000;

app.get("/", (req: express.Request, res: express.Response) => {
	res.send("Hello Express");
});

app.listen(PORT, () => {
	console.log("ローカルサーバー起動中");
});
