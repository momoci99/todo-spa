import { DefaultTheme } from "styled-components";

const colors = {
  primary: {
    dark: "#096C68",
    default: "#1c967e",
    light: "#24A19C",
    background: "#FEF9F9",
    focused: "#a9cec7",
    pressed: "#0f4d40",
    outline: "#f2f9f9",
  },

  secondary: {
    dark: "#1868BA",
    default: "#218EFD",
  },

  neutral: {
    primary: "#1D3066",
    secondary: "#737FA0",
    ghost: "#A9B0C5",
    line: "#E3E6EC",
    background: "#FEF9F9",
    white: "#FFFFFF",
  },

  success: {
    dark: "#117A7A",
    default: "#17A1A1",
    background: "#e3f3f3",
    focused: "#B8D7D7",
    pressed: "#0f6666",
    outline: "#8BD0D0",
  },

  fail: {
    dark: "#CC3A55",
    default: "#FF486A",
    background: "#FFE9ED",
    focused: "#F0C4CC",
    pressed: "#B234A",
    outline: "#FFA3B4",
  },

  warning: {
    dark: "#E0740F",
    default: "#FD831",
    background: "#FEF0E2",
    focused: "#F6D5B7",
    pressed: "#CC6A0E",
    outline: "#FEC188",
  },
};

const fontSizes = {
  xxLarge: "28px",
  xLarge: "26px",
  large: "24px",
  medium: "18px",
  normal: "16px",
  small: "14px",
  xSmall: "12px",
  xxSmall: "10px",
};

const fontWeights = {
  bold: 700,
  medium: 500,
  normal: 400,
  light: 300,
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSizes;
export type FontWeightsTypes = typeof fontWeights;

const theme: DefaultTheme = {
  colors,
  fontSizes,
  fontWeights,
};
export default theme;
