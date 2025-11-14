import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import App from "../App";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";

function AppTheme() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.customColors.bodyBg,
          minHeight: "100vh",
        }}
      >
        <App />
      </Box>
    </ThemeProvider>
  );
}

export default AppTheme;
