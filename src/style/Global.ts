import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';
import './font-face.css';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    margin: 0;
    padding: 0;
    background-color: #1b191a;
    line-height: normal;
    box-sizing: border-box;
    user-select: none;
    -webkit-user-drag: none;
    font-family: 'Montserrat', sans-serif;
    font-stretch: normal;
    font-style: normal;
  }

  h1, h2, h3, h4, h5, h6, p, ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
  }

  img {
    -webkit-user-drag: none;
  }

  input, textarea {
    user-select: text;
    background-color: transparent;
    border: none;
    outline: none;

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export default GlobalStyle;
