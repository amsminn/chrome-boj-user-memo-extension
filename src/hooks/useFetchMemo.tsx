import { useEffect, useContext } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import MemoContext from "../Context";
import useUrl from "../hooks/useUrl";
import { Storage } from "@plasmohq/storage";

const useFetchMemo = () => {
  const url = useUrl();
  const { flag, handle, text, setFlag, setHandle, setText } = useContext(MemoContext);

  useEffect(() => {
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
};

export default useFetchMemo;