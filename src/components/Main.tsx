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
  const storageFlag = useStorage();
  useEffect(() => {
    const initializeStorage = async () => {
      if (!storageFlag) {
        const storage: Storage = new Storage();
        await storage.set("BojUserMemo", {});
      }
    };
  
    initializeStorage();
  }, [storageFlag]);
  

  const url = useUrl();
  const { flag, handle, text, setFlag, setHandle, setText } = useContext(MemoContext);

  useEffect(() => {
    const fetchMemo = async () => {
      if (url.includes("acmicpc.net/user/")) {
        setFlag(true);
  
        const splitURL = url.split("/");
        const newHandle = splitURL.at(-1);
        setHandle(newHandle);
  
        const memo = await getMemo(newHandle!);
        setText(memo);
      } else {
        setFlag(false);
        setHandle("");
        setText("");
      }
    };
  
    fetchMemo();
  }, [url]);  

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