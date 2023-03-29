import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";

type EmojiPickerProps = {
	icon: string;
	onChange: (emoji: string) => void;
};

const EmojiPicker = ({ icon, onChange }: EmojiPickerProps) => {
	const [selectedEmoji, setSelectedEmoji] = useState<string>("");
	const [isShowPicker, setIsShowPicker] = useState<boolean>(false);

	useEffect(() => {
		setSelectedEmoji(icon);
	}, [icon]);

	const showPicker = () => setIsShowPicker(!isShowPicker);

	const selectEmoji = (e: { unified: string }) => {
		// 絵文字のコードを取得
		const emojiCode = e.unified;

		let codesArray: number[] = [];
		// 配列にコードを16進数で追加する
		codesArray.push(parseInt("0x" + emojiCode, 16));
		// 配列（文字コード）を文字列に変換
		const emoji = String.fromCodePoint(...codesArray);

		setIsShowPicker(false);

		// 絵文字の文字コードを関数に渡す
		onChange(emoji);
	};

	return (
		<Box>
			<Typography
				variant="h3"
				fontWeight={700}
				sx={{ cursor: "pointer" }}
				onClick={showPicker}
			>
				{selectedEmoji}
			</Typography>
			<Box
				sx={{
					display: isShowPicker ? "block" : "none",
					position: "absolute",
					zIndex: 100,
				}}
			>
				<Picker onEmojiSelect={selectEmoji} />
			</Box>
		</Box>
	);
};

export default EmojiPicker;
