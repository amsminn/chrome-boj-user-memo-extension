import React from "react";
import styled from "styled-components";
import GuideButton from "./components/GuideButton";
import { theme } from "./styles/theme";

const StyledPopup = styled.div`
  width: 70vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.gradient};
  padding: ${theme.spacing.large};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.large};

  h1 {
    font-size: ${theme.fontSizes.large};
    margin-bottom: ${theme.spacing.small};
    color: ${theme.colors.text.primary};
    text-align: center;
  }

  .button-container {
    display: flex;
    gap: ${theme.spacing.small};
    margin-bottom: ${theme.spacing.medium};
  }
`;

interface PopupProps {
  title?: string;
  onGuideClick?: () => void;
}

const IndexPopup: React.FC<PopupProps> = ({ 
  title = "BOJ User Memo Extension",
  onGuideClick 
}) => {
  return (
    <StyledPopup>
      <h1>{title}</h1>
      <div className="button-container">
        <GuideButton onClick={onGuideClick} />
      </div>
    </StyledPopup>
  );
};

export default IndexPopup;