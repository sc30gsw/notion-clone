import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import authApi from "../../api/authApi";

const Register = () => {
	const [usernameErrMsg, setUsernameErrMsg] = useState<string>("");
	const [passwordErrMsg, setPasswordErrMsg] = useState<string>("");
	const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] =
		useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setUsernameErrMsg("");
		setPasswordErrMsg("");
		setConfirmPasswordErrMsg("");

		// 入力欄の文字列を取得
		const data = new FormData(e.target as HTMLFormElement);
		const username = data.get("username")?.toString().trim() as string;
		const password = data.get("password")?.toString().trim() as string;
		const confirmPassword = data
			.get("confirmPassword")
			?.toString()
			.trim() as string;

		// バリデーションチェック
		let err = false;
		if (!username) {
			err = true;
			setUsernameErrMsg("名前を入力してください");
		}

		if (!password) {
			err = true;
			setPasswordErrMsg("パスワードを入力してください");
		}

		if (!confirmPassword) {
			err = true;
			setConfirmPasswordErrMsg("確認用パスワードを入力してください");
		}

		if (password !== confirmPassword) {
			err = true;
			setConfirmPasswordErrMsg("パスワードと確認用パスワードが一致しません");
		}

		if (err) return;

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
		} catch (err: any) {
			const errors = err.data.errors;
			console.log(errors);
			errors.map((err: any) => {
				switch (err.param) {
					case "username":
						setUsernameErrMsg(err.msg);
						break;

					case "password":
						setPasswordErrMsg(err.msg);
						break;

					case "confirmPassword":
						setConfirmPasswordErrMsg(err.msg);
						break;
				}
			});
		}
	};
	return (
		<>
			<Box component="form" onSubmit={handleSubmit} noValidate>
				<TextField
					fullWidth
					id="username"
					label="お名前"
					margin="normal"
					name="username"
					required
					helperText={usernameErrMsg}
					error={usernameErrMsg !== ""}
				/>
				<TextField
					fullWidth
					type="password"
					id="password"
					label="パスワード"
					margin="normal"
					name="password"
					required
					helperText={passwordErrMsg}
					error={passwordErrMsg !== ""}
				/>
				<TextField
					fullWidth
					type="password"
					id="confirmPassword"
					label="確認用パスワード"
					margin="normal"
					name="confirmPassword"
					required
					helperText={confirmPasswordErrMsg}
					error={confirmPasswordErrMsg !== ""}
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
