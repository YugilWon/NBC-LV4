import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  body {
    font-family: 'GmarketSansMedium', sans-serif;
  }

  @font-face {
    font-family: "OKDDUNG";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/OKDDUNG.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

`;

export default GlobalStyle;
