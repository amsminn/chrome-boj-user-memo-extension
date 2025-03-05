import React from "react";
import Container from "./Container";
import MemoInput from "./MemoInput";
import UpdateButton from "./UpdateButton";
import GuideButton from "./GuideButton";
import useUrl from "../hooks/useUrl";
import { useContext, useEffect } from "react";
import MemoContext from "../Context";
import { useStorage } from "@plasmohq/storage/hook";
import { Storage } from "@plasmohq/storage";

const Main: React.FC = ()=> {
  const url = useUrl();
  const { flag, handle, text, setFlag, setHandle, setText } = useContext(MemoContext);

  useEffect(() => {
    console.log("URL changed to: " + url);
    if (url.includes("acmicpc.net/user/")) {
      setFlag(true);
      const parts = url.split("/");
      const newHandle = parts.at(-1) || "";
      setHandle(newHandle);
    } else {
      setFlag(false);
      setHandle("");
      setText("");
    }
  }, [url, setFlag, setHandle, setText]);

  const storageKey = handle ? `Boj_${handle}` : "BojMemo";
  const [memo] = useStorage<string>({
    key: storageKey,
    instance: new Storage({ area: "sync" })
  });

  useEffect(() => {
    if (handle) {
      setText(memo);
      console.log(`Fetched memo for ${handle}: ${memo}`);
    }
  }, [handle, memo, setText]);

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