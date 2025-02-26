import React, { useContext, useEffect } from "react";
import StyledButton from "./StyledButton";
import MemoContext from "../memo/MemoContext";
import { useStorage } from "@plasmohq/storage/hook";

const UpdateButton: React.FC = () => {
  const { flag, handle, text } = useContext(MemoContext);

  
  let [storage, setStorage] = useStorage<Record<string, string>>("BojMemo", {});

  useEffect(() => {
    [storage, setStorage] = useStorage<Record<string, string>>("Boj_" + handle, {});
  }, [handle]);

  const onClick = () => {
    if(flag) {
      // setMemo(handle, text);
    } else {
      alert("Please enter a valid profile URL");
    }
  };

  return (
    <StyledButton $variant="update" onClick={onClick}>
      Update
    </StyledButton>
  );
};

export default UpdateButton;