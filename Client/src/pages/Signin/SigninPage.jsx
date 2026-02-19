import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import singinValidation from "./singinValidation";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../../Redux/Reducers/user/user.thunk";
import { purple } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import { useEffect } from "react";

const URL = "/user/auth/login";
const getAccentGlow = (theme) =>
  theme.palette.customColors?.accentGlow || "rgba(0,0,0,0.18)";

const filledStyles = (theme) => ({
  borderRadius: 2,
  overflow: "hidden",
  transition: "0.2s ease",

  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[200]
        : purple[100],
  },
  "&.input": {
    color: "wight",
  },

  "&.Mui-focused": {
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
  },
});

function SigninPage() {
  const theme = useTheme();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(singinValidation),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successMessage, status, error } = useSelector(
    (store) => store.User.signin
  );

  const isLoading = status === "loading";
  const isSuccess = status === "succeeded" && !error;
  const isError = status === "failed";

  useEffect(() => {
    if (isSuccess) {
      const t = setTimeout(() => navigate("/"), 2500);
      return () => clearTimeout(t);
    }
  }, [isSuccess]);

  const onSubmit = async (data) => {
    await dispatch(signinUser({ data, URL })).unwrap();
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          gap: "25px",
          px: { xs: "15px", md: "35px" },
          py: "40px",
          mx: "10px",
          boxShadow: `0 12px 40px ${getAccentGlow(theme)}`,
          borderRadius: "20px",
          width: "585px",
        }}
      >
        <Stack spacing={1.2} sx={{ textAlign: "center", mb: 1 }}>
          <Typography
            component="h1"
            sx={{
              color: theme.palette.primary.contrastText,
              fontWeight: 700,
              fontSize: {
                xs: "1.6rem",
                sm: "1.8rem",
                md: "2rem",
              },
              lineHeight: 1.3,
              letterSpacing: "-0.5px",
            }}
          >
            Sign in to your account
          </Typography>

          <Typography
            component="p"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: {
                xs: "0.85rem",
                sm: "0.95rem",
                md: "1rem",
              },
              lineHeight: 1.6,
              maxWidth: "420px",
              mx: "auto",
            }}
          >
            Welcome back 👋 Please enter your email and password to continue.
          </Typography>
        </Stack>
        {isError && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error && error}
          </Alert>
        )}
        {isSuccess && (
          <Alert severity="success" sx={{ width: "100%" }}>
            {successMessage && successMessage}
          </Alert>
        )}
        {/* Form: */}
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label={"Email"}
                {...field}
                variant="filled"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={filledStyles(theme)}
                slotProps={{
                  input: {
                    sx: {
                      backgroundColor: (theme) =>
                        theme.palette.customColors.bgDialog,
                    },
                  },
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Password"
                type="password"
                {...field}
                variant="filled"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={filledStyles(theme)}
                slotProps={{
                  input: {
                    sx: {
                      backgroundColor: (theme) =>
                        theme.palette.customColors.bgDialog,
                    },
                  },
                }}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              py: "10px",
              px: "20px",
              bgcolor: isLoading && grey[500],
            }}
          >
            Sign in
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Button>
        </Box>
        <Typography
          component="p"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.9rem",
          }}
        >
          Don’t have an account?{" "}
          <Box
            component={Link}
            to="/auth/signup"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign up
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default SigninPage;
