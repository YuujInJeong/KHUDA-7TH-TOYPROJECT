import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

const getVariantStyles = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary}dd;
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.white};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondary}dd;
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        border: 1px solid ${theme.colors.primary};
        color: ${theme.colors.primary};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary}11;
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        padding: ${theme.spacing[2]} ${theme.spacing[4]};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary}11;
        }
      `;
    default:
      return css`
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary}dd;
        }
      `;
  }
};

const getSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${theme.spacing[1]} ${theme.spacing[3]};
        font-size: ${theme.fontSizes.sm};
      `;
    case 'lg':
      return css`
        padding: ${theme.spacing[3]} ${theme.spacing[6]};
        font-size: ${theme.fontSizes.lg};
      `;
    default:
      return css`
        padding: ${theme.spacing[2]} ${theme.spacing[4]};
        font-size: ${theme.fontSizes.base};
      `;
  }
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.fontWeights.medium};
  transition: all ${theme.transitions.duration.normal} ${theme.transitions.easing['ease-in-out']};
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  ${({ variant = 'primary' }) => getVariantStyles(variant)};
  ${({ size = 'md' }) => getSizeStyles(size)};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary}33;
  }
`;
