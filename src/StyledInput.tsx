import styled from "styled-components";

const StyledInput = styled.input`
  padding: 12px 16px;
  width: 80%;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border: 2px solid #0070f3;
  }
`;

export default StyledInput;