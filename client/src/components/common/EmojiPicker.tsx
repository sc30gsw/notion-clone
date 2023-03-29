import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

type EmojiPickerProps = {
	icon: string;
};

const EmojiPicker = ({ icon }: EmojiPickerProps) => {
	const [selectedEmoji, setSelectedEmoji] = useState<string>("");

	useEffect(() => {
		setSelectedEmoji(icon);
	}, [icon]);

	return (
		<Box>
			<Typography variant="h3" fontWeight={700} sx={{ cursor: "pointer" }}>
				{selectedEmoji}
			</Typography>
		</Box>
	);
};

export default EmojiPicker;
