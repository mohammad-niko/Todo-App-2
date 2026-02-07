import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  useTheme,
  IconButton,
  Divider,
  Fade,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import directorySchema from "./directorySchema";
import { useDispatch } from "react-redux";
import { editTaskDirectory } from "../../../Redux/Reducers/task/Task.reducer";
import {
  createDir,
  updataDir,
} from "../../../Redux/Reducers/directory/directory.thunk";

export default function DirectoryDialog({
  handleClose,
  info,
  open,
  directoryList,
}) {
  const { title, placeHolder, button, id } = info;

  const dispatch = useDispatch();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const { handleSubmit, control, watch, reset } = useForm({
    resolver: zodResolver(directorySchema(directoryList, title, placeHolder)),
    defaultValues: { directoryName: "" },
    mode: "onChange",
  });

  const directoryName = watch("directoryName").trim();

  const onsubmit = async (data) => {
    document.activeElement?.blur();

    if (title === "Edit") {
      const dirData = { directoryName: data.directoryName };
      dispatch(updataDir({ data: dirData, URL: `/user/directories/${id}` }));
    } else {
      const dirData = data.directoryName;

      dispatch(
        createDir({
          data: { directoryName: dirData },
          URL: `/user/directories`,
        })
      );
    }

    reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slots={{ transition: Fade }}
      slotProps={{
        transition: { timeout: 300 },
        paper: {
          sx: {
            borderRadius: 4,
            width: "100%",
            maxWidth: 420,
            mx: 2,
            background: isDarkMode ? theme.palette.background.paper : "#fff",
            border: `1px solid ${
              isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"
            }`,
            boxShadow: isDarkMode
              ? "0 0 30px rgba(0,0,0,0.8)"
              : "0 10px 30px rgba(0,0,0,0.15)",
            overflow: "hidden",
            transition: "all 0.3s ease",
          },
        },
      }}
    >
      {/* Title + Close button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          pt: 2.5,
          pb: 1.5,
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: theme.palette.text.primary,
            m: 0,
            p: 0,
          }}
        >
          {title} directory
        </DialogTitle>

        <IconButton
          onClick={() => {
            document.activeElement?.blur();
            handleClose();
          }}
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.04)",
            },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Form Content */}
      <Box component="form" onSubmit={handleSubmit(onsubmit)}>
        <DialogContent sx={{ px: 3, pt: 2, pb: 1 }}>
          <Box
            component="label"
            htmlFor="directory-name"
            sx={{
              display: "block",
              fontWeight: 500,
              mb: 0.8,
              fontSize: "0.9rem",
              color: theme.palette.text.secondary,
            }}
          >
            Title
          </Box>

          <Controller
            name="directoryName"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                id="directory-name"
                autoFocus
                placeholder={placeHolder}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: isDarkMode
                      ? "rgba(255,255,255,0.04)"
                      : theme.palette.grey[50],
                    transition: "all 0.2s ease",
                    "& fieldset": { borderColor: "transparent" },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: theme.palette.text.secondary,
                    opacity: 0.7,
                  },
                }}
              />
            )}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 1.5 }}>
          <Button
            type="submit"
            disabled={!directoryName}
            variant="contained"
            fullWidth
            sx={{
              borderRadius: "10px",
              py: 1.3,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              boxShadow: isDarkMode
                ? "0 0 10px rgba(0,0,0,0.5)"
                : "0 4px 12px rgba(0,0,0,0.15)",
              background: theme.palette.primary.main,
              "&:hover": { background: theme.palette.primary.dark },
            }}
          >
            {button} Directory
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
