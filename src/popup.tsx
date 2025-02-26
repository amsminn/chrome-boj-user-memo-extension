import React, { useState } from "react";
import Main from "./components/Main";
import MemoContext from "./Context";

const IndexPopup: React.FC = ()=> {
  const [flag, setFlag] = useState<boolean>(false);
  const [handle, setHandle] = useState<string>("");
  const [text, setText] = useState<string>("");

  return (
    <MemoContext.Provider value={{ flag, handle, text, setFlag, setHandle, setText }}>
      <Main />
    </MemoContext.Provider>
  );
};

export default IndexPopup;