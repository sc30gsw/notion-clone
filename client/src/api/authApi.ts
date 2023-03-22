import { User } from "../types/User";
import axiosClient from "./axiosClient";

const authApi = {
	// 新規登録API
	register: (params: User) => axiosClient.post("auth/register", params),
};

export default authApi;
