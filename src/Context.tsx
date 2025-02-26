import { createContext } from "react";

type ContextType = {
  flag: boolean;
  handle: string;
  text: string;
  setFlag: (flag: boolean) => void;
  setHandle: (handle: string) => void;
  setText: (memo: string) => void;
};

const MemoContext = createContext<ContextType>({
    flag: false,
    handle: "",
    text: "",
    setFlag: () => {},
    setHandle: () => {},
    setText: () => {},
});

export default MemoContext;