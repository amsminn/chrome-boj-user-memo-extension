import React, { useContext } from "react";
import StyledButton from "./StyledButton";
import MemoContext from "../Context";
import { useStorage } from "@plasmohq/storage/hook";
import { Storage } from "@plasmohq/storage";

const UpdateButton: React.FC = () => {
  const { flag, handle, text } = useContext(MemoContext);

  const storageKey = "Boj_" + handle;
  const [memo, setMemo, {
    setRenderValue,
    setStoreValue,
    remove
  }] = useStorage<string>({
      key: storageKey,
      instance: new Storage({ area: "sync" })
    });
  
  const modify = async () => {
    const value = (text||"").trim();
    if (value === "") {
      if(memo) {
        await remove();
        console.log("Memo removed for key:" + storageKey);
      }
    } else {
      await setStoreValue(value);
    }
  };

  const onClick = () => {
    if(flag) {
      modify();
    } else {
      alert("Profile URL not found");
    }
  };

  return (
    <StyledButton $variant="update" onClick={onClick}>
      Update
    </StyledButton>
  );
};

export default UpdateButton;