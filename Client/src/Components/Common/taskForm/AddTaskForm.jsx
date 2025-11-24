import { useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "./addTaskSchema";
/* -------------------------------- Theme Helpers -------------------------------- */

const getBgDialog = (theme) =>
  theme.palette.customColors?.bgDialog || theme.palette.background.paper;

const getAccentGlow = (theme) =>
  theme.palette.customColors?.accentGlow || "rgba(0,0,0,0.18)";

const filledStyles = (theme) => ({
  borderRadius: 2,
  overflow: "hidden",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  transition: "0.2s ease",

  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },

  "&.Mui-focused": {
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
  },

  "& .MuiFilledInput-input": {
    padding: "14px 14px 12px 14px",
    fontSize: "0.95rem",
  },
});

/* ----------------------------- Reusable TextField ----------------------------- */

const FilledTextField = ({
  label,
  name,
  shrink,
  type,
  onChange,
  placeholder,
  multiline,
  rows,
  inputRef,
  customSX,
  register,
}) => {
  const theme = useTheme();

  return (
    <TextField
      label={label}
      name={name}
      type={type}
      onChange={onChange}
      variant="filled"
      fullWidth
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      inputRef={inputRef}
      slotProps={{ inputLabel: { shrink: Boolean(shrink) } }}
      sx={{
        ...filledStyles(theme),
        ...customSX,
      }}
    />
  );
};

/* -------------------------------- Main Dialog -------------------------------- */

export default function TaskFormDialog({ open, handleClose, onSubmit }) {
  const theme = useTheme();
  const dateRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskFormSchema(taskFormSchema())),
    defaultValues: {
      title: "",
      deadLine: null,
      description: "",
      directory: "main",
      important: false,
      completed: false,
    },
  });

  const { task, setTask } = onSubmit;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(task);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            background: getBgDialog(theme),
            p: 0,
            boxShadow: `0 12px 40px ${getAccentGlow(theme)}`,
            backdropFilter: "blur(14px)",
            border:
              theme.palette.mode === "light"
                ? "1px solid #e0e0e0"
                : "1px solid #444",
          },
        },
      }}
    >
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{ p: { xs: 2.5, sm: 3.5 } }}
      >
        {/* Header */}
        <DialogTitle sx={{ px: 0, pb: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ letterSpacing: 0.4 }}
              >
                Add a Task
              </Typography>

              {task.directory && (
                <Chip
                  icon={<FolderIcon />}
                  label={task.directory}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    borderRadius: 1.5,
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "rgba(123, 63, 243, 0.12)"
                        : "rgba(165, 132, 255, 0.18)",
                    color:
                      theme.palette.mode === "light"
                        ? theme.palette.primary.main
                        : theme.palette.primary.light,
                  }}
                />
              )}
            </Stack>

            <IconButton
              onClick={handleClose}
              sx={{
                bgcolor: theme.palette.action.hover,
                borderRadius: 2,
                p: 1,
                transition: "0.2s",
                "&:hover": {
                  bgcolor: theme.palette.action.selected,
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        {/* Content */}
        <DialogContent sx={{ px: 0, mt: 1 }}>
          <Stack spacing={3.2}>
            {/* Title */}
            <FilledTextField
              label="Title"
              name="title"
              shrink={task.title}
              onChange={handleChange}
              customSX={{
                "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                  transform: "translate(12px, 0px) scale(0.80)",
                },
              }}
            />

            {/* Date */}
            <FilledTextField
              label="Date"
              name="date"
              type="date"
              shrink={task.date}
              onChange={handleChange}
              inputRef={dateRef}
              customSX={{
                "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                  display: "none",
                },
              }}
            />

            {/* Descripion */}
            <FilledTextField
              label="Description (optional)"
              name="description"
              shrink={task.description}
              onChange={handleChange}
              placeholder="Add more details..."
              multiline
              rows={3}
            />

            {/* Select */}
            <FormControl variant="filled" fullWidth sx={filledStyles(theme)}>
              <InputLabel shrink={Boolean(task.directory)}>
                {task.directory ? "" : "Select directory"}
              </InputLabel>
              <Select
                name="directory"
                value={task.directory}
                onChange={handleChange}
                MenuProps={{
                  slotProps: {
                    paper: {
                      sx: {
                        bgcolor: getBgDialog(theme),
                        borderRadius: 2,
                        boxShadow: `0 8px 20px ${getAccentGlow(theme)}`,
                      },
                    },
                  },
                }}
              >
                <MenuItem value="Main">Main</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
              </Select>
            </FormControl>

            {/* Toggles */}
            <Stack direction="row" spacing={3}>
              <FormControlLabel
                label="Important"
                control={
                  <Switch
                    checked={task.isImportant}
                    onChange={handleChange}
                    name="isImportant"
                  />
                }
              />

              <FormControlLabel
                label="Completed"
                control={
                  <Switch
                    checked={task.isCompleted}
                    onChange={handleChange}
                    name="isCompleted"
                  />
                }
              />
            </Stack>
          </Stack>
        </DialogContent>

        {/* Footer */}
        <DialogActions sx={{ px: 0, pt: 3 }}>
          <Button
            type="button"
            onClick={handleClose}
            variant="outlined"
            fullWidth
            sx={{ py: 1.3, borderRadius: 2 }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.3,
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: `0 8px 20px ${getAccentGlow(theme)}`,
              textTransform: "none",
            }}
          >
            Add New Task
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
