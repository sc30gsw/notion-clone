import { LoginUser } from "../types/LoginUser";
import { User } from "../types/User";
import axiosClient from "./axiosClient";

const authApi = {
	// 新規登録API
	register: (params: User) => axiosClient.post("auth/register", params),
	// ログインAPI
	login: (params: LoginUser) => axiosClient.post("auth/login", params),
	// JWT認証API
	// authApi.verifyTokenで受け取る引数はトークンそのものであるため、paramsではなく、tokenを引数として渡す
	verifyToken: (token: string) =>
		axiosClient.post("auth/verify-token", { token }),
};

export default authApi;
