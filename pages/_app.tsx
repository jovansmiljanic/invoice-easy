// Core types
import type { AppProps } from "next/app";

// App context properties
import { Store } from "@context";

// Vendors
import { SessionProvider } from "next-auth/react";
import { createGlobalStyle, css } from "styled-components";

// Global types
import type { Theme as ThemeType } from "@types";

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, input, select, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    scroll-behavior: smooth;
  }

  button {
    -webkit-appearance: none;
    background-color: transparent;
    color: initial;
  }
  
  
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a { text-decoration: none; }

  html, body {
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-scroll-behavior: smooth;
    -moz-scroll-behavior: smooth;
    -ms-scroll-behavior: smooth;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;

    ${({
      theme: {
        colors,
        font: { size, family, weight },
      },
    }) => css`
      font-style: normal;
      font-feature-settings: "kern";
      font-size: ${size}px;
      background-color: ${colors.white};
      color: ${colors.textColor};
      line-height: ${size * 1.5}px;
      font-family: ${family};
      font-weight: ${weight["medium"]};

      strong {
        font-weight: ${weight["semiBold"]};
      }

      b {
        font-weight: ${weight["semiBold"]};
      }
    `}
  }

  
  h1 {
    font-size: 36px;
    line-height: 42px;
  }

  h2 {
    font-size: 32px;
    line-height: 38px;
  }

  h3 {
    font-size: 28px;
    line-height: 34px;
  }

  h4 {
    font-size: 24px;
    line-height: 30px;
  }

  h5 {
    font-size: 20px;
    line-height: 26px;
  }

  h6 {
    font-size: 16px;
    line-height: 26px;
  }

  p {
    font-size: 14px;
    line-height: 24px;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

interface App extends AppProps {}

const App = ({ Component, pageProps, router }: App) => (
  <SessionProvider refetchInterval={300} session={pageProps?.session}>
    <Store>
      <GlobalStyle />
      <Component key={router.route} {...pageProps} />
    </Store>
  </SessionProvider>
);

export default App;
