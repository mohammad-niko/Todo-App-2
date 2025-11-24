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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";

export default function DirectoryDialog({ open, handleClose, info }) {
  const [directoryName, setDirectoryName] = useState("");
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { title, placeHolder, button } = info;

  const handleCreate = () => {
    console.log("Creating directory:", directoryName);
    handleClose();
    setDirectoryName("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      slots={{
        transition: Fade,
      }}
      slotProps={{
        transition: {
          timeout: 300,
        },
        paper: {
          sx: {
            borderRadius: 4,
            minWidth: 420,
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
          onClick={handleClose}
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

      {/* Content */}
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

        <TextField
          id="directory-name"
          autoFocus
          placeholder={`${placeHolder}`}
          fullWidth
          variant="outlined"
          value={directoryName}
          onChange={(e) => setDirectoryName(e.target.value)}
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
            "& .MuiInputBase-input": {
              py: 1.3,
              fontSize: "0.95rem",
            },
            "& .MuiInputBase-input::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 0.7,
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1.5 }}>
        <Button
          onClick={handleCreate}
          disabled={!directoryName.trim()}
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
            "&:hover": {
              background: theme.palette.primary.dark,
            },
          }}
        >
          {button} Directory
        </Button>
      </DialogActions>
    </Dialog>
  );
}
