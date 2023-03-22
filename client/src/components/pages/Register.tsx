import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import authApi from "../../api/authApi";

const Register = () => {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// 入力欄の文字列を取得
		const data = new FormData(e.target as HTMLFormElement);
		const username = data.get("username")?.toString().trim() as string;
		const password = data.get("password")?.toString().trim() as string;
		const confirmPassword = data
			.get("confirmPassword")
			?.toString()
			.trim() as string;

		// 新規登録APIの呼び出し
		try {
			const res = await authApi.register({
				username,
				password,
				confirmPassword,
			});

			// ローカルストレージにトークンを保存
			localStorage.setItem("token", res.data.token);

			console.log("新規登録に成功しました");
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<Box component="form" onSubmit={handleSubmit}>
				<TextField
					fullWidth
					id="username"
					label="お名前"
					margin="normal"
					name="username"
					required
				/>
				<TextField
					fullWidth
					type="password"
					id="password"
					label="パスワード"
					margin="normal"
					name="password"
					required
				/>
				<TextField
					fullWidth
					type="password"
					id="confirmPassword"
					label="確認用パスワード"
					margin="normal"
					name="confirmPassword"
					required
				/>
				<LoadingButton
					type="submit"
					fullWidth
					sx={{ mt: 3, mb: 2 }}
					loading={false}
					color="primary"
					variant="outlined"
				>
					アカウント作成
				</LoadingButton>
			</Box>
			<Button component={Link} to="/login">
				すでにアカウントを持っていますか？ログイン
			</Button>
		</>
	);
};

export default Register;
