// Global types
import type { Theme as ThemeType, ThemeContext } from "@types";

const defaultTheme: ThemeType = {
  name: "default",
  defaults: {
    gutter: 1,
    radius: 6,
    transition: {
      speed: 150,
    },
  },
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    primary: "#208DD0",
    secondary: "#7A7DFF",
    success: "#37C864",
    danger: "#E04A5A",
    warning: "#FFA726",
    textColor: "#222222",
    lightGray: "#BDBDBD",
    lighterGray: "#E0E0E0",
    darkGray: "#404040",
    hoverGray: "#4359710A",
    background: "#f2f4fc",
    gray: "#64748B",
  },
  font: {
    size: 16,
    baseSize: 20,
    family: "'Public Sans', sans-serif",
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
  },
  breakpoints: {
    xs: 576,
    sm: 992,
    md: 992,
    lg: 1192,
    xl: 1440,
  },
  spaces: {
    0: 0,
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 30,
    6: 40,
    7: 50,
    8: 60,
    9: 70,
    10: 80,
  },
};

const darkTheme: ThemeType = {
  name: "dark",
  defaults: {
    gutter: 1,
    radius: 6,
    transition: {
      speed: 150,
    },
  },
  colors: {
    white: "#1E1E1E",
    black: "#FFFFFF",
    primary: "#4BA3D9",
    secondary: "#7A7DFF",
    success: "#37C864",
    danger: "#E04A5A",
    warning: "#FFA726",
    textColor: "#CBCBE2",
    lightGray: "#A1A1A1",
    lighterGray: "#BDBDBD",
    darkGray: "#303030",
    hoverGray: "#4359710A",
    background: "#2D2D2D",
    gray: "#64748B",
  },
  font: {
    size: 16,
    baseSize: 20,
    family: "'Public Sans', sans-serif",
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
  },
  breakpoints: {
    xs: 576,
    sm: 992,
    md: 992,
    lg: 1192,
    xl: 1440,
  },
  spaces: {
    0: 0,
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 30,
    6: 40,
    7: 50,
    8: 60,
    9: 70,
    10: 80,
  },
};

// Export both Light and Dark themes
export const Theme: ThemeContext = {
  light: defaultTheme,
  dark: darkTheme,
};
