import React, { createContext } from "react";
import { Storage } from "@plasmohq/storage";
import { useStorage } from "@plasmohq/storage/hook";

type MemoContextType = {
  flag: boolean;
  handle: string;
  text: string;
  setFlag: (flag: boolean) => void;
  setHandle: (handle: string) => void;
  setText: (memo: string) => void;
};

const MemoContext = createContext<MemoContextType>({
    flag: false,
    handle: "",
    text: "",
    setFlag: () => {},
    setHandle: () => {},
    setText: () => {},
});

export default MemoContext;