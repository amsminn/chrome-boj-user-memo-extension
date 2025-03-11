import React from "react";
import styled from "styled-components";

export type ButtonVariant = 'guide' | 'update';

export interface CommonButtonProps {
  $variant?: ButtonVariant;
}

const StyledButton = styled.button<CommonButtonProps>`
  padding: 10px 20px;
  background-color: ${({ $variant }) =>
    $variant === 'guide'
      ? "#28a745" : "#0070f3"
  };
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ $variant }) =>
      $variant === 'guide'
        ? "#218838" : "#005bb5"
    };
  }
`;

const GuideButton: React.FC = () => {
  const handleGuideClick = (): void => {
    window.open("https://github.com/amsminn/chrome-boj-user-memo-extension/tree/main", "_blank", "noopener,noreferrer");
  };

  return (
    <StyledButton 
      $variant="guide"
      onClick={handleGuideClick} 
    >
      Guide
    </StyledButton>
  );
};

export default React.memo(GuideButton);