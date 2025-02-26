import React from "react";
import styled from "styled-components";

const MemoContainer = styled.div`
  margin-left: 10px;
  font-size: 0.9rem;
  color: #666;
  background-color: #f7f7f7;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: inline-block;
`;

interface BojMemoProps {
  memo: string;
}

const BojMemo: React.FC<BojMemoProps> = ({ memo }) => {
  if (!memo.trim()) return null;

  return <MemoContainer>{memo.trim()}</MemoContainer>;
};

export default BojMemo;