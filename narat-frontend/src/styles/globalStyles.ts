import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-size: 16px;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.white};
    height: 100%;
    overflow-x: hidden;
  }

  body {
    line-height: ${({ theme }) => theme.lineHeights.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    overflow-x: hidden;
    position: relative;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    line-height: ${({ theme }) => theme.lineHeights.tight};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 500;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    touch-action: manipulation;
  }

  input, textarea, select {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.base};
    -webkit-appearance: none;
    appearance: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    list-style: none;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    padding-left: ${({ theme }) => theme.spacing[4]};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }

  code, pre {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: ${({ theme }) => theme.spacing[4]};
    margin-left: 0;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    font-style: italic;
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
    margin: ${({ theme }) => theme.spacing[8]} 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  th, td {
    padding: ${({ theme }) => theme.spacing[2]};
    border: 1px solid ${({ theme }) => theme.colors.gray[200]};
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    font-weight: 500;
  }

  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[200]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[400]};
    border-radius: ${({ theme }) => theme.borderRadius.full};

    &:hover {
      background: ${({ theme }) => theme.colors.gray[500]};
    }
  }

  /* 선택 텍스트 스타일링 */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  /* 모바일 최적화 */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }

    input, textarea, select {
      font-size: 16px; /* iOS에서 자동 확대 방지 */
    }
  }
`; 