import { LoginUser } from "../types/LoginUser";
import { User } from "../types/User";
import axiosClient from "./axiosClient";

const authApi = {
	// 新規登録API
	register: (params: User) => axiosClient.post("auth/register", params),
	// ログインAPI
	login: (params: LoginUser) => axiosClient.post("auth/login", params),
};

export default authApi;
