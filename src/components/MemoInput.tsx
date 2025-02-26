import React, { useContext } from "react";
import StyledInput from "./StyledInput";
import MemoContext from "../Context";

const MemoInput: React.FC = () => {
  const { text, setText } = useContext(MemoContext);

  return (
    <StyledInput
      onChange={(e) => {
        const newText = e.target.value.slice(0, 100);
        setText(newText||"");
      }}
      value={text||""}
      placeholder="Enter your note here..."
    />
  );
};

export default MemoInput;