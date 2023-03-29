import React from "react";

type EmojiPickerProps = {
	icon: string;
};

const EmojiPicker = ({ icon }: EmojiPickerProps) => {
	return <div>{icon}</div>;
};

export default EmojiPicker;
