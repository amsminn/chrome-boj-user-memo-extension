import React, { useContext, useEffect } from "react";
import MemoContext from "../memo/MemoContext";
import Container from "./Container";
import MemoInput from "./MemoInput";
import UpdateButton from "./UpdateButton";
import GuideButton from "./GuideButton";
import { getMemo } from "../memo/get_memo";
import useUrl from "../hooks/useUrl";
import { Storage } from "@plasmohq/storage";
import useStorage from "../hooks/useStorage";

const Main: React.FC = ()=> {
  const url = useUrl();
  const { flag, handle, text, setFlag, setHandle, setText } = useContext(MemoContext);

  useEffect(() => {
    console.log("URL changed to ", url);

    if(url.includes("acmicpc.net/user/")) {
      setFlag(true);

      const splitURL = url.split("/");
      const newHandle = splitURL.at(-1);
      setHandle(newHandle);

      console.log("Valid profile URL: ", handle);

      getMemo(handle).then((prev_memo) => {
        console.log("set text to prev_memo: ", prev_memo);
        setText(prev_memo);
      });
    } else {
      setFlag(false);
      setHandle("");
      setText("");
    }
  }, [url]);

    const storageFlag = useStorage();
    useEffect(() => {
        if(!storageFlag) {
            const storage: Storage = new Storage();
            storage.set("BojUserMemo", {});
            console.log("init local storage BojUserMemo");
        }
    }, [storageFlag]);

  return (
    <Container>
      <h1>BOJ User Memo Extension</h1>
      <MemoInput />
      <div className="button-container">
        <UpdateButton />
        <GuideButton />
      </div>
    </Container>
  );
};

export default Main;