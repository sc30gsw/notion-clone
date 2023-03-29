import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import memoApi from "../../api/memoApi";

const Memo = () => {
	const { memoId } = useParams<{ memoId?: string }>();
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	useEffect(() => {
		const getMemo = async () => {
			try {
				const res = await memoApi.getOne(memoId!);
				setTitle(res.data.title);
				setDescription(res.data.description);
			} catch (err) {
				alert(err);
			}
		};
		memoId && getMemo();
	}, [memoId]);

	let timer: any;
	const timeout = 500;

	const updateTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
		clearTimeout(timer);
		const newTitle = e.target.value;
		setTitle(newTitle);

		timer = setTimeout(async () => {
			try {
				await memoApi.update(memoId!, { title: newTitle });
			} catch (err) {
				alert(err);
			}
		}, timeout);
	};

	const updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearTimeout(timer);
		const newDescription = e.target.value;
		setDescription(newDescription);

		timer = setTimeout(async () => {
			try {
				await memoApi.update(memoId!, { description: newDescription });
			} catch (err) {
				alert(err);
			}
		}, timeout);
	};

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					width: "100%",
				}}
			>
				<IconButton>
					<StarBorderOutlinedIcon />
				</IconButton>
				<IconButton color="error">
					<DeleteOutlinedIcon />
				</IconButton>
			</Box>
			<Box sx={{ padding: "10px 50px" }}>
				<TextField
					value={title}
					placeholder="無題"
					variant="outlined"
					fullWidth
					sx={{
						".MuiOutlinedInput-input": { padding: 0 },
						".MuiOutlinedInput-notchedOutline": { border: "none" },
						".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
					}}
					onChange={updateTitle}
				/>
				<TextField
					value={description}
					placeholder="追加"
					variant="outlined"
					fullWidth
					sx={{
						".MuiOutlinedInput-input": { padding: 0 },
						".MuiOutlinedInput-notchedOutline": { border: "none" },
						".MuiOutlinedInput-root": { fontSize: "1rem" },
					}}
					onChange={updateDescription}
				/>
			</Box>
		</>
	);
};

export default Memo;
