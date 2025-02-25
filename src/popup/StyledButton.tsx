import styled from 'styled-components';

export type ButtonVariant = 'guide' | 'update';

export interface CommonButtonProps {
  primary?: boolean;
  variant?: ButtonVariant;
}

const StyledButton = styled.button<CommonButtonProps>`
  padding: 10px 20px;
  background-color: ${({ primary, variant }) =>
    variant === 'guide'
      ? primary ? "#28a745" : "#6c757d"
      : primary ? "#0070f3" : "#888"
  };
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ primary, variant }) =>
      variant === 'guide'
        ? primary ? "#218838" : "#5a6268"
        : primary ? "#005bb5" : "#555"
    };
  }
`;

export default StyledButton;