import React from 'react';
import StyledButton from './StyledButton';

type GuideButtonProps = {
  primary?: boolean;
};

const GuideButton: React.FC<GuideButtonProps> = ({ primary = true }) => {
  const handleGuideClick = (): void => {
    window.open("https://kim1109123.tistory.com", "_blank", "noopener,noreferrer");
  };

  return (
    <StyledButton 
      variant="guide"
      primary={primary} 
      onClick={handleGuideClick} 
      onFocus={(e) => (e.currentTarget.style.border = "2px solid #28a745")}
    >
      Guide
    </StyledButton>
  );
};

export default GuideButton;