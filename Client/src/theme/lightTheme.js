import { createTheme, responsiveFontSizes } from "@mui/material";
import baseTheme from "./baseTheme ";

let lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#7B3FF3",
      light: "#A577F8",
      dark: "#5A26B8",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF6584",
      dark: "#C93B5C",
      contrastText: "#fff",
    },
    success: {
      main: "#34C38F",
    },
    warning: {
      main: "#FFCC00",
    },
    error: {
      main: "#FF6B6B",
    },
    info: {
      main: "#60A5FA",
    },
    background: {
      default: "#E8ECF5",
      paper: "#F5F7FB",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
    customColors: {
      appbarBg: "rgba(223, 232, 239)",
      appbarText: "#000",
      drawerBg: "rgba(239, 246, 249)",
      bodyBg: "rgba(223, 232, 239)",
      accentGlow: "#7B3FF333",
      bgDialog: "#F5F7FB",
    },
  },
});

lightTheme = responsiveFontSizes(lightTheme);
export default lightTheme;
