import axiosClient from "./axiosClient";

const memoApi = {
	// 新規登録API
	create: () => axiosClient.post("memo"),
	// メモ一覧取得API
	getAll: () => axiosClient.get("memo"),
	// メモ詳細取得API
	getOne: (id: string) => axiosClient.get(`memo/${id}`),
};

export default memoApi;
