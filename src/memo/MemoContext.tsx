import React, { createContext } from "react";

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