import axios from "axios";

// const BASE_URL = "http://localhost:4000/api/v1";
const BASE_URL = "https://notion-clone.herokuapp.com/api/v1";

const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
	// エンドポイントとなるURLのベース
	baseURL: BASE_URL,
});

// APIの叩く前の前処理
axiosClient.interceptors.request.use(async (config: any) => {
	const token = await getToken();
	return {
		...config,
		headers: {
			"Content-Type": "application/json",
			// リクエストヘッダーにJWT（トークン）を付けてサーバーに渡す
			authorization: `Bearer ${token}`,
		},
	};
});

axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		throw err.response;
	}
);

export default axiosClient;
