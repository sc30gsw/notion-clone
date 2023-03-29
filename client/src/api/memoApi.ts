import axiosClient from "./axiosClient";

type UpdatedMemo = {
	title?: string;
	description?: string;
};

const memoApi = {
	// 新規登録API
	create: () => axiosClient.post("memo"),
	// メモ一覧取得API
	getAll: () => axiosClient.get("memo"),
	// メモ詳細取得API
	getOne: (id: string) => axiosClient.get(`memo/${id}`),
	// メモ更新API
	update: (id: string, params: UpdatedMemo) =>
		axiosClient.put(`memo/${id}`, params),
};

export default memoApi;
