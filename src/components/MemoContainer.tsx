import { useStorage } from "@plasmohq/storage/hook";
import styled from "styled-components";
import { Storage } from "@plasmohq/storage";
import React from "react";

const StyledMemoContainer = styled.div`
  margin-left: 10px;
  font-size: 1.3rem;
  color: #222;
  background-color: #fff;
  padding: 1px 8px;
  border-radius: 10px !important;
  border: 0.5px solid #aaa; 
  box-shadow: 0 2px 6px rgba(32, 14, 14, 0.1);
  display: inline-block;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

interface MemoContainerProps {
  storageKey: string;
}

const MemoContainer: React.FC<MemoContainerProps> = ({ storageKey }: MemoContainerProps): JSX.Element => {
  const [memo] = useStorage<string>({
    key: storageKey,
    instance: new Storage({ area: "sync" })
  });
  return memo ? (<StyledMemoContainer>memo: {memo}</StyledMemoContainer>) : null;
};

export default MemoContainer;