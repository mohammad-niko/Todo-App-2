import { createTheme, responsiveFontSizes } from "@mui/material";
import baseTheme from "./baseTheme ";

let darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#A584FF",
      light: "#C6A6FF",
      dark: "#7A3DFF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF85AA",
      dark: "#C94C6A",
      contrastText: "#fff",
    },
    success: { main: "#4ADE80" },
    warning: { main: "#FACC15" },
    error: { main: "#FF6B6B" },
    info: { main: "#60A5FA" },

    background: {
      default: "#0D132B",
      paper: "linear-gradient(145deg, #1B2644, #0F172A)",
    },

    text: {
      primary: "#E5E7EB",
      secondary: "#A5B4FC",
    },

    customColors: {
      appbarText: "#E5E7EB",
      drawerBg: "#0F172A",
      bodyBg: "#0B1120",
      accentGlow: "#A584FF33",
      bgDialog: "#10162C",
    },
    customNotFound: {
      bg: "radial-gradient(circle at top, #1B2644 0%, #0D132B 80%)",
      cardBg: "rgba(16, 22, 44, 0.35)",
      border: "rgba(165,132,255,0.35)",
      glow: "rgba(165,132,255,0.35)",
      textPrimary: "#E5E7EB",
      textSecondary: "#A5B4FC",
    },
  },

  // components: {
  //   MuiMenuItem: {
  //     styleOverrides: {
  //       root: {
  //         color: "#E5E7EB",
  //         backgroundColor: "#10162C",
  //         "&.Mui-selected": {
  //           backgroundColor: "#233150",
  //         },
  //         "&:hover": {
  //           backgroundColor: "#1E2A44",
  //         },
  //       },
  //     },
  //   },

  //   MuiPaper: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: "#10162C",
  //       },
  //     },
  //   },
  // },
});

darkTheme = responsiveFontSizes(darkTheme);
export default darkTheme;
