import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import memoApi from "../../api/memoApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setMemo } from "../../redux/features/memoSlice";
import { useDispatch } from "react-redux";
import { Memo } from "../../types/Memo";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const memos: Memo[] = useSelector((state: RootState) => state.memo.value);

	const createMemo = async () => {
		try {
			setLoading(true);
			const res = await memoApi.create();
			console.log(res);
			const newMemos = [...memos, res.data];
			dispatch(setMemo(newMemos));
			navigate(`/memo/${res.data._id}`);
		} catch (err) {
			alert(err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Box
			sx={{
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<LoadingButton
				variant="outlined"
				onClick={() => createMemo()}
				loading={loading}
			>
				最初のメモを作成
			</LoadingButton>
		</Box>
	);
};

export default Home;
