import React from "react";
import StyledButton from "./StyledButton";

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