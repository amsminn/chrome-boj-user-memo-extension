import React, { useContext } from "react";
import StyledButton from "./StyledButton";
import MemoContext from "../memo/MemoContext";
import { setMemo } from "../memo/set_memo";

const UpdateButton: React.FC = () => {
  const { flag, handle, text } = useContext(MemoContext);

  const onClick = () => {
    console.log("Update button clicked");

    if(flag) {
      console.log("Update clicked in valid profile URL memo:", text);
      setMemo(handle, text);
    } else {
      console.log("Update clicked in invalid profile URL");
    }
  };

  return (
    <StyledButton variant="update" onClick={onClick}>
      Update
    </StyledButton>
  );
};

export default UpdateButton;