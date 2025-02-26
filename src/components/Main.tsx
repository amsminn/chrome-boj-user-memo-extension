import React from "react";
import Container from "./Container";
import MemoInput from "./MemoInput";
import UpdateButton from "./UpdateButton";
import GuideButton from "./GuideButton";
import useFetchMemo from "../hooks/useFetchMemo";

const Main: React.FC = ()=> {
  useFetchMemo();

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