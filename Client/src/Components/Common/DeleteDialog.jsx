import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

export default function DeleteConfirmationDialog({
  open,
  handleClose,
  onConfirm,
}) {
  const theme = useTheme();

  const handleConfirm = () => {
    onConfirm?.();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            minWidth: 400,
            p: 1,
            backgroundImage: "none",
            bgcolor: theme.palette.customColors.bgDialog,
            boxShadow:
              theme.palette.mode === "light"
                ? "0px 4px 20px rgba(0, 0, 0, 0.15)"
                : `0px 4px 20px ${theme.palette.customColors.accentGlow}`,
            border:
              theme.palette.mode === "dark"
                ? `1px solid ${theme.palette.primary.main}40`
                : `1px solid ${theme.palette.primary.main}20`,
            transition: "all 0.3s ease",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "1.5rem",
          fontWeight: 600,
          pb: 1,
          pr: 5,
          position: "relative",
          color: theme.palette.text.primary,
        }}
      >
        Are you sure?
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.text.secondary,
            "&:hover": { color: theme.palette.primary.main },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 1, pb: 2 }}>
        <DialogContentText
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          This task will be deleted permanently.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: "flex-end", gap: 1 }}>
        <Button
          onClick={handleClose}
          variant="text"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 600,
            borderRadius: 2,
            fontSize: "1rem",
            textTransform: "none",
            "&:hover": {
              color: theme.palette.primary.main,
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(123,63,243,0.1)"
                  : "rgba(165,132,255,0.1)",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          variant="contained"
          autoFocus
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            py: 1,
            fontSize: "1rem",
            boxShadow:
              theme.palette.mode === "dark"
                ? `0 0 10px ${theme.palette.customColors.accentGlow}`
                : "none",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
