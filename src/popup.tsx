import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import MemoContext from "./memo/MemoContext";

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