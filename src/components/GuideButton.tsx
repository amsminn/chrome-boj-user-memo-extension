import React from "react";
import StyledButton from "./StyledButton";

const GuideButton: React.FC = () => {
  const handleGuideClick = (): void => {
    window.open("https://kim1109123.tistory.com", "_blank", "noopener,noreferrer");
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