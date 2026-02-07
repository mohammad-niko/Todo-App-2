import { useSearchParams, useNavigate } from "react-router";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../../Redux/Reducers/user/user.thunk";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import VerifyEmailSkeleton from "./VerifyEmailSkeleton";

const cardSx = (theme) => ({
  width: "100%",
  maxWidth: 460,
  p: { xs: 3, sm: 4 },
  borderRadius: "20px",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  textAlign: "center",
});



function VerifyEmailPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { successMessage, status, error } = useSelector(
    (store) => store.User.verifyEmail
  );

  const userID = searchParams.get("userid");
  const token = searchParams.get("token");

  const isLoading = status === "loading";
  const isSuccess = status === "succeeded";
  const isError = status === "failed";

  useEffect(() => {
    if (!userID || !token) return;
    if (status !== "idle") return;

    dispatch(
      verifyUser(
        `/user/auth/verify-email?userid=${userID}&token=${token}`
      )
    );
  }, [dispatch, userID, token, status]);

  useEffect(() => {
    if (status === "succeeded") {
      const direction = setTimeout(() => {
        navigate("/auth/signin", { replace: true });
      }, 2500);
      return () => clearTimeout(direction);
    }
  }, [successMessage]);

  return status === "idle" ? (
    <VerifyEmailSkeleton />
  ) : (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: `linear-gradient(
      180deg,
      ${theme.palette.background.default} 0%,
      ${theme.palette.action.hover} 100%
    )`,
      }}
    >
      {isLoading ? (
        <VerifyEmailSkeleton />
      ) : (
        <Stack spacing={3} alignItems="center" sx={cardSx(theme)}>
          {/* Icon */}
          {isSuccess && (
            <CheckCircleOutlineIcon
              sx={{ fontSize: 64, color: "success.main" }}
            />
          )}

          {isError && (
            <ErrorOutlineIcon sx={{ fontSize: 64, color: "error.main" }} />
          )}

          {/* Title */}
          <Typography variant="h5" fontWeight={700}>
            {isSuccess && successMessage}
            {isError && error}
          </Typography>

          {/* Description */}
          <Typography
            color="text.secondary"
            sx={{ fontSize: "0.95rem", maxWidth: 360 }}
          >
            {isSuccess &&
              "Your email has been successfully verified. You can now Sign in to your account."}

            {isError &&
              "This verification link is invalid or expired. Please back to the verify email info and request a new one."}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

export default VerifyEmailPage;
