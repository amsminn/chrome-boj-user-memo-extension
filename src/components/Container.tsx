import styled from "styled-components";

const Container = styled.div`
  width: 80vw;
  height: 80vh;
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

export default Container;