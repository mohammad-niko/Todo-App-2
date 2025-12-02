import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import App from "../App";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import { useSelector } from "react-redux";

function AppTheme() {
  const theme = useSelector((store)=>store.App.theme)
  return (
    <ThemeProvider theme={theme?darkTheme:lightTheme}>
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
