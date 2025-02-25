import React, { useContext } from "react";
import StyledButton from "./StyledButton";
import MemoContext from "../memo/MemoContext";
import { setMemo } from "../memo/set_memo";

const UpdateButton: React.FC = () => {
  const { flag, handle, text } = useContext(MemoContext);

  const onClick = () => {
    if(flag) {
      setMemo(handle, text);
    } else {
      alert("Please enter a valid profile URL");
    }
  };

  return (
    <StyledButton variant="update" onClick={onClick}>
      Update
    </StyledButton>
  );
};

export default UpdateButton;