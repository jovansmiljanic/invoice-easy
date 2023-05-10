export interface Theme {
  name: string;
  defaults: {
    gutter: number;
    radius: number;
    transition: {
      speed: number;
    };
  };
  colors: {
    white: string;
    black: string;
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    textColor: string;
    lightGray: string;
    hoverGray: string;
    background: string;
    gray: string;
  };
  font: {
    size: number;
    family: string;
    baseSize: number;
    weight: {
      light: number;
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
    };
  };
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  spaces: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
  };
}

export interface ThemeContext {
  light: Theme;
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {} // extends the global DefaultTheme with our Theme.
}
