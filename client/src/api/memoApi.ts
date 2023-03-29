import axiosClient from "./axiosClient";

type UpdatedMemo = {
	title?: string;
	description?: string;
	icon?: string;
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
	// メモ削除API
	delete: (id: string) => axiosClient.delete(`memo/${id}`),
	// メモお気に入り登録API
	favorite: (id: string) => axiosClient.put(`memo/${id}/fav`),
};

export default memoApi;
