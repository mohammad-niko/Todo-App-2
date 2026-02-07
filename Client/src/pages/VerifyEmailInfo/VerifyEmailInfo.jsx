import { useLocation } from "react-router";
import {
  Box,
  Stack,
  Typography,
  useTheme,
  Button,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reSendVerifyEmail } from "../../Redux/Reducers/user/user.thunk";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import VerifyEmailSkeletonBox from "../VerifyEmail/VerifyEmailSkeleton";

const URL = "/user/auth/resend-verify-email";

const cardSx = (theme) => ({
  width: "100%",
  maxWidth: 440,
  p: { xs: 3, sm: 4 },
  borderRadius: 3,
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
});

function VerifyEmailInfoPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const email = state?.email;
  const [cooldown, setCooldown] = useState(0);
  const { successMessage, status, error, cooldownUntil } = useSelector(
    (store) => store.User.signup
  );
  const isLoading = status === "loading";
  const isSuccess = status === "succeeded" && !error;
  const isError = status === "failed";

  useEffect(() => {
    const storedCooldownUntil = localStorage.getItem("cooldownUntil");
    console.log(`use 1 get local: ${storedCooldownUntil}`);
    if (!storedCooldownUntil) return;

    const remaining = Math.max(
      Math.floor((storedCooldownUntil - Date.now()) / 1000),
      0
    );
    console.log(remaining);
    setCooldown(remaining);
  }, []);

  useEffect(() => {
    if (cooldown <= 0) {
      localStorage.removeItem("cooldownUntil");
      return;
    }

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (!cooldownUntil) return;
    console.log(`use 3 get local: ${cooldownUntil}`);

    setCooldown(cooldownUntil);
  }, [cooldownUntil]);

  const handleResend = () => {
    if (!email || cooldown > 0) return;
    const data = { email };
    dispatch(
      reSendVerifyEmail({
        URL,
        data,
      })
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: `linear-gradient(
          180deg,
          ${theme.palette.background.default},
          ${theme.palette.action.hover}
        )`,
      }}
    >
      {isLoading ? (
        <VerifyEmailSkeletonBox />
      ) : (
        <Stack spacing={3} sx={cardSx(theme)}>
          {/* Icon */}
          <Box
            sx={{
              width: "full",
              height: "full",
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: isSuccess
                ? theme.palette.success.light
                : theme.palette.error.light,
            }}
          >
            {isSuccess ? (
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: 36,
                  color: "success.main",
                  display: "block",
                  lineHeight: 1,
                  transform: "translateY(1px)",
                }}
              />
            ) : (
              <ErrorOutlineIcon
                sx={{
                  fontSize: 36,
                  color: "error.main",
                  display: "block",
                  lineHeight: 1,
                  transform: "translateY(1px)",
                }}
              />
            )}
          </Box>

          {/* Title */}
          <Typography variant="h6" fontWeight={600}>
            {isSuccess && successMessage}
            {isError && "Verification failed"}
          </Typography>

          {/* Message */}
          <Typography variant="body2" color="text.secondary">
            {isSuccess &&
              "We’ve sent a verification email to the address below."}
            {isError && error}
          </Typography>

          <Divider />

          {/* Email */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              bgcolor: theme.palette.action.hover,
              py: 1,
              px: 2,
              borderRadius: 1,
              wordBreak: "break-all",
            }}
          >
            {email || "No email provided"}
          </Typography>

          {/* Button */}
          <Button
            variant="contained"
            onClick={handleResend}
            disabled={cooldown > 0}
            sx={{
              mt: 1,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            {cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Resend verification email"}
          </Button>

          {/* Hint */}
          <Typography variant="caption" color="primary">
            Please don’t refresh this page
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

export default VerifyEmailInfoPage;
