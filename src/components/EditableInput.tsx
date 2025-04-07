import { useStorage } from '@plasmohq/storage/hook';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Storage } from '@plasmohq/storage';
import type { FC } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface StyledMemoContainerProps {
  $isEditing: boolean;
}

const StyledMemoContainer = styled.div<StyledMemoContainerProps>`
  margin-left: 10px;
  font-size: 1.3rem;
  color: #222;
  background-color: #fff;
  padding: 1px 8px;
  border-radius: 10px !important;
  border: ${({ $isEditing }) => ($isEditing ? '2px solid #aaa' : '0.5px solid #aaa')};
  box-shadow: 0 2px 6px rgba(32, 14, 14, 0.1);
  display: inline-block;
  transition: border 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  width: fit-content;
  position: relative;
`;

const HiddenSpan = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: 1.3rem;
  font-family: inherit;
`;

interface EditableInputProps {
  storageKey: string;
}

const EditableInput: FC<EditableInputProps> = ({ storageKey }): JSX.Element => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  
  const storage = useMemo(() => new Storage({ area: "sync" }), []);
  const [memo, setMemo] = useStorage<string>({
      key: storageKey,
      instance: storage
    });
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setText(memo || "");
  }, [memo]);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const content = text || inputRef.current.placeholder;
      spanRef.current.textContent = content;
      const newWidth = spanRef.current.offsetWidth + 5;
      inputRef.current.style.width = `${newWidth}px`;
    }
  }, [text]);

  const handleFocus = useCallback((): void => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(async (): Promise<void> => {
    setIsEditing(false);
    if (text === "") {
      await storage.remove(storageKey);
    } else {
      setMemo(text.trim());
    }
  }, [storage, storageKey, setMemo, text]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing == false) {
      inputRef.current?.blur();
    }
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    let temp = inputRef.current?.value;
    if (temp.length > 100) { 
      temp = temp.slice(0, 100);
    }
    setText(temp);
  }, []);

  return (
    <StyledMemoContainer $isEditing={isEditing}>
      <input
        ref={inputRef}
        type="text"
        value={text||""}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="edit"
        style={{ 
          border: 'none', 
          outline: 'none', 
          backgroundColor: 'transparent',
          padding: '2px'
        }}
      />
      <HiddenSpan ref={spanRef} />
    </StyledMemoContainer>
  );
};

export default EditableInput;