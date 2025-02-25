import React from 'react';
import StyledButton from './StyledButton';

type UpdateButtonProps = {
  text: string;
  primary?: boolean;
};

const onClick = (text: string): void => {
  alert("Update button clicked: " + text);
  // update logic here
};

const UpdateButton: React.FC<UpdateButtonProps> = ({ text, primary }) => {
  return (
    <StyledButton 
      variant="update"
      primary={primary}
      onClick={() => onClick(text)}
      onFocus={(e) => (e.currentTarget.style.border = "2px solid #0070f3")}
    >
      Update
    </StyledButton>
  );
};

export default UpdateButton;