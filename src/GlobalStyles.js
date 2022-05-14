import { createGlobalStyle } from 'styled-components';

export const StyledGlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
    border: none;
    appearance: none;
    -webkit-appearance: none;
  }

  *::before, *::after {
    box-sizing: inherit;
  }

  fieldset {
    border: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`