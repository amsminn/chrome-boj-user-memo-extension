import { useStorage } from '@plasmohq/storage/hook';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Storage } from '@plasmohq/storage';
import type { FC } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface StyledMemoContainerProps {
  $isEditing: boolean;
}

const StyledMemoContainer = styled.div<StyledMemoContainerProps>`
  margin-left: ${theme.spacing.small};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.secondary};
  background-color: ${theme.colors.background.primary};
  padding: 1px ${theme.spacing.small};
  border-radius: ${theme.borderRadius.medium} !important;
  border: ${({ $isEditing }) => 
    $isEditing ? theme.colors.border.dark : theme.colors.border.light
  };
  box-shadow: ${theme.shadows.small};
  display: inline-block;
  transition: border ${theme.transitions.fast}, 
              transform ${theme.transitions.fast}, 
              box-shadow ${theme.transitions.fast};
  width: fit-content;
  position: relative;
`;

const HiddenSpan = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: ${theme.fontSizes.medium};
  font-family: inherit;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 2px;
`;

interface EditableInputProps {
  storageKey: string;
  maxLength?: number;
  placeholder?: string;
}

const useEditableInput = (storageKey: string, maxLength: number = 100) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  
  const storage = useMemo(() => new Storage({ area: "sync" }), []);
  const [memo, setMemo] = useStorage<string>({
    key: storageKey,
    instance: storage
  });

  useEffect(() => {
    setText(memo || "");
  }, [memo]);

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
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.currentTarget.blur();
    }
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const newText = e.target.value.slice(0, maxLength);
    setText(newText);
  }, [maxLength]);

  return {
    isEditing,
    text,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleChange
  };
};

const EditableInput: FC<EditableInputProps> = ({ 
  storageKey, 
  maxLength = 100,
  placeholder = "edit"
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  
  const {
    isEditing,
    text,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleChange
  } = useEditableInput(storageKey, maxLength);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const content = text || inputRef.current.placeholder;
      spanRef.current.textContent = content;
      const newWidth = spanRef.current.offsetWidth + 5;
      inputRef.current.style.width = `${newWidth}px`;
    }
  }, [text]);

  return (
    <StyledMemoContainer $isEditing={isEditing}>
      <StyledInput
        ref={inputRef}
        type="text"
        value={text}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <HiddenSpan ref={spanRef} />
    </StyledMemoContainer>
  );
};

export default React.memo(EditableInput);