import React, { useState } from "react";
import Container from "./Container";
import NoteInput from "./NoteInput";
import UpdateButton from "./UpdateButton";
import GuideButton from "./GuideButton";

const index = () => {
  const [data, setData] = useState("");

  return (
    <Container>
      <h1>BOJ User Notes Extension</h1>
      <NoteInput data={data} setData={setData} />
      <div className="button-container">
        <UpdateButton text={data} primary={true} />
        <GuideButton primary={true} />
      </div>
    </Container>
  );
};

export default index;