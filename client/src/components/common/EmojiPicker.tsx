import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";

type EmojiPickerProps = {
	icon: string;
};

const EmojiPicker = ({ icon }: EmojiPickerProps) => {
	const [selectedEmoji, setSelectedEmoji] = useState<string>("");
	const [isShowPicker, setIsShowPicker] = useState<boolean>(false);

	useEffect(() => {
		setSelectedEmoji(icon);
	}, [icon]);

	const showPicker = () => setIsShowPicker(!isShowPicker);

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
				<Picker />
			</Box>
		</Box>
	);
};

export default EmojiPicker;
