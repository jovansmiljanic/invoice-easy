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
    white: "#ffffff",
    black: "#000000",
    primary: "#208DD0",
    secondary: "#696cff",
    success: "#40E271",
    danger: "#dc3545",
    warning: "#e9910c",
    textColor: "#222930",
    lightGray: "#d4d4d4",
    hoverGray: "#4359710a",
    background: "#f5f5f9",
    gray: "#5F6E7F",
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

// Export default Light
export const Theme: ThemeContext = {
  light: defaultTheme,
};
