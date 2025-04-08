import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

export type ButtonVariant = 'guide' | 'update';

export interface CommonButtonProps {
  $variant?: ButtonVariant;
}

const StyledButton = styled.button<CommonButtonProps>`
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  background-color: ${({ $variant }) =>
    $variant === 'guide'
      ? theme.colors.success : theme.colors.primary
  };
  color: ${theme.colors.background.primary};
  border: none;
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  font-size: ${theme.fontSizes.small};
  transition: background-color ${theme.transitions.default};

  &:hover {
    background-color: ${({ $variant }) =>
      $variant === 'guide'
        ? theme.colors.successHover : theme.colors.primaryHover
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