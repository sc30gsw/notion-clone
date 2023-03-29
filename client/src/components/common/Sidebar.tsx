import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {
	Box,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import assets from "../../assets";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import memoApi from "../../api/memoApi";
import { useDispatch } from "react-redux";
import { setMemo } from "../../redux/features/memoSlice";
import { Memo } from "../../types/Memo";

const Sidebar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.user.value);
	const memos: Memo[] = useSelector((state: RootState) => state.memo.value);

	const [activeIndex, setActiveIndex] = useState<number>(0);
	// URLのIDを取得
	const { memoId } = useParams();

	const logout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	useEffect(() => {
		const getMemos = async () => {
			try {
				const res = await memoApi.getAll();
				dispatch(setMemo(res.data));
			} catch (err) {
				alert(err);
			}
		};
		getMemos();
	}, [dispatch]);

	// 依存配列をnavigateにすることで画面遷移のたびに発火する
	useEffect(() => {
		const activeIndex = memos.findIndex((memo: Memo) => memo._id === memoId);
		setActiveIndex(activeIndex);
	}, [navigate]);

	return (
		<Drawer
			container={window.document.body}
			variant="permanent"
			open={true}
			sx={{ width: 250, height: "100vh" }}
		>
			<List
				sx={{
					width: 250,
					height: "100vh",
					backgroundColor: assets.colors.secondary,
				}}
			>
				<ListItemButton onClick={logout}>
					<Box
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Typography variant="body2" fontWeight="700">
							{user.username}
						</Typography>
						<IconButton>
							<LogoutOutlinedIcon />
						</IconButton>
					</Box>
				</ListItemButton>
				<Box sx={{ paddingTop: "10px" }}></Box>
				<ListItemButton>
					<Box
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Typography variant="body2" fontWeight="700">
							お気に入り
						</Typography>
					</Box>
				</ListItemButton>
				<Box sx={{ paddingTop: "10px" }}></Box>
				<ListItemButton>
					<Box
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Typography variant="body2" fontWeight="700">
							プライベート
						</Typography>
						<IconButton>
							<AddBoxOutlinedIcon fontSize="small" />
						</IconButton>
					</Box>
				</ListItemButton>
				{memos.map((memo, index) => (
					<ListItemButton
						key={memo._id}
						sx={{ pl: "20px" }}
						component={Link}
						to={`/memo/${memo._id}`}
						selected={index === activeIndex}
					>
						<Typography>
							{memo.icon} {memo.title}
						</Typography>
					</ListItemButton>
				))}
			</List>
		</Drawer>
	);
};

export default Sidebar;
