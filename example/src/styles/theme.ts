import { createGlobalStyles } from 'solid-styled-components';

export const GlobalStyles = createGlobalStyles`
  html, body, #root {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    background: black;
    min-height: 90vh;
  }
  * {
    box-sizing: border-box;
  }
`;
