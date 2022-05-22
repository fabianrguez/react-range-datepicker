import { createGlobalStyle } from 'styled-components';

export const StyledGlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: system-ui;
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

  .chevron {
    &--prev, &--next {
      &:before {
        content: '';
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-style: solid;
	      border-width: 0.25em 0.25em 0 0;
        height: 0.75em;
        left: 0.15em;
        position: relative;
        top: 0.15em;
        width: 0.75em;
        vertical-align: top;
      }
    }

    &--next {
      transform: rotate(45deg);
    }

    &--prev {
      transform: rotate(-130deg)
    }
  }
`;
