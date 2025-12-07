import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Link } from "react-router";

const NotFoundPage = () => {
  const theme = useTheme();
  const nf = theme.palette.customNotFound;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        position: "relative",
        background: nf.bg,
        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: nf.glow,
          top: "-120px",
          right: "-140px",
          filter: "blur(90px)",
          animation: "float 8s infinite ease-in-out",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: nf.glow,
          bottom: "-120px",
          left: "-150px",
          filter: "blur(90px)",
          animation: "float 10s infinite ease-in-out reverse",
        },

        "@keyframes float": {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(25px)" },
          "100%": { transform: "translateY(0px)" },
        },
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
            borderRadius: 4,
            backdropFilter: "blur(18px)",
            backgroundColor: nf.cardBg,
            border: `1px solid ${nf.border}`,
            p: { xs: 4, sm: 6 },
            boxShadow: `0 0 40px ${nf.glow}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow decoration */}
          <Box
            sx={{
              position: "absolute",
              top: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "150px",
              height: "150px",
              backgroundColor: nf.glow,
              filter: "blur(70px)",
            }}
          />

          {/* Warning Icon */}
          <WarningAmberRoundedIcon
            sx={{
              fontSize: 95,
              color: theme.palette.primary.light,
              mb: 2,
              animation: "pulseIcon 2.5s infinite",

              "@keyframes pulseIcon": {
                "0%": { transform: "scale(1)", opacity: 1 },
                "50%": { transform: "scale(1.18)", opacity: 0.75 },
                "100%": { transform: "scale(1)", opacity: 1 },
              },
            }}
          />

          {/* 404 text */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "5rem", sm: "7rem", md: "9rem" },
              color: theme.palette.primary.main,
              textShadow: `0 0 40px ${theme.palette.primary.main}80`,
              letterSpacing: "-4px",
              mb: 1,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: nf.textPrimary,
              fontWeight: 700,
              mb: 2,
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: nf.textSecondary,
              mb: 4,
              fontSize: "1.1rem",
              lineHeight: 1.9,
            }}
          >
            The page you are looking for does not exist or has been removed.
          </Typography>

          <Stack direction="row" justifyContent="center">
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.6,
                fontWeight: 700,
                fontSize: "1.05rem",
                textTransform: "none",
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: (theme) =>
                  `0px 0px 18px ${alpha(theme.palette.primary.main, 0.5)}`,
                transition: "0.3s",

                ":hover": {
                  transform: "translateY(-4px)",
                  boxShadow: (theme) =>
                    `0px 0px 28px ${alpha(theme.palette.primary.main, 0.8)}`,
                },
              }}
            >
              Go Back Home
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
