import React, { useContext } from "react";
import StyledInput from "./StyledInput";
import MemoContext from "../memo/MemoContext";

const MemoInput: React.FC = () => {
  const { text, setText } = useContext(MemoContext);

  return (
    <StyledInput
      onChange={(e) => {
        setText(e.target.value)
        console.log(text);
      }}
      value={text}
      placeholder="Enter your note here..."
    />
  );
};

export default MemoInput;