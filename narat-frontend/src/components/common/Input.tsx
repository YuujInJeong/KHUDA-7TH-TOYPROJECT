import React from 'react';
import styled from 'styled-components';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'small' | 'medium' | 'large';
  error?: boolean;
}

const StyledInput = styled.input<InputProps>`
  width: 100%;
  padding: ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return '8px 12px';
      case 'large':
        return '16px 20px';
      default:
        return '12px 16px';
    }
  }};
  border: 1px solid ${({ theme, error }) => error ? theme.colors.error : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme, size = 'medium' }) => {
    switch (size) {
      case 'small':
        return theme.fontSizes.sm;
      case 'large':
        return theme.fontSizes.lg;
      default:
        return theme.fontSizes.base;
    }
  }};
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => error ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme, error }) => error ? `${theme.colors.error}33` : `${theme.colors.primary}33`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <StyledInput ref={ref} {...props} />
);

Input.displayName = 'Input';
