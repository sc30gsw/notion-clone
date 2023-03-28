import axiosClient from "./axiosClient";

const memoApi = {
	// 新規登録API
	create: () => axiosClient.post("memo"),
};

export default memoApi;
