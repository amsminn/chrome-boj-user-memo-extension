import React, { useContext, useEffect } from "react";
import MemoContext from "../memo/MemoContext";
import Container from "./Container";
import MemoInput from "./MemoInput";
import UpdateButton from "./UpdateButton";
import GuideButton from "./GuideButton";
import { getMemo } from "../memo/get_memo";
import useUrl from "../hooks/useUrl";

const Main: React.FC = ()=> {
  const url = useUrl();
  const { flag, handle, text, setFlag, setHandle, setText } = useContext(MemoContext);

  const fetchMemo = async () => {
    if (url.includes("acmicpc.net/user/")) {
      setFlag(true);

      const splitURL = url.split("/");
      const newHandle = splitURL.at(-1);
      setHandle(newHandle);

      const memo = await getMemo(newHandle!);
      console.log(memo);
      setText(memo);
    } else {
      setFlag(false);
      setHandle("");
      setText("");
    }
  };

  useEffect(() => {
    console.log("popup open fetch memo");
    fetchMemo();
  }, []);

  useEffect(() => {
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