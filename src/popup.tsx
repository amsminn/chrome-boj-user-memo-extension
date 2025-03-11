import React from "react";
import styled from "styled-components";
import GuideButton from "./components/GuideButton";

const StyledDiv = styled.div`
  width: 70vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .button-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const IndexPopup: React.FC = ()=> {
  return (
    <StyledDiv>
      <h1>BOJ User Memo Extension</h1>
      <div className="button-container">
        <GuideButton />
      </div>
    </StyledDiv>
  );
};

export default IndexPopup;