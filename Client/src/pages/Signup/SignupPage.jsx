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
import singupValidation from "./singupValidation";
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../Redux/Reducers/user/user.thunk";



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

  "&.Mui-focused": {
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
  },
});

const URL = `/user/auth/register`;

function SignupPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.User.signup);
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(singupValidation),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const isLoading = status === "loading";

  const onSubmit = async (data) => {
    try {
      await dispatch(signupUser({ data, URL }));
      navigate("/auth/verify-email-info", { state: { email: data.email } });
    } catch (error) {
      console.log("Error: " + error);
    }
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
            Create your account
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
            Get started in just a few seconds. Enter your details below to
            create your account.
          </Typography>
        </Stack>

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
            name="userName"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                variant="filled"
                label="full Name"
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
                {...field}
                variant="filled"
                fullWidth
                type="password"
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
            Create Account
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
          Already have an account?{" "}
          <Box
            component={Link}
            to="/auth/signin"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign in
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default SignupPage;
