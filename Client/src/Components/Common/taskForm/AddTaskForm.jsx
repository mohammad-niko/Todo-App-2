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
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  useTheme,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "./addTaskSchema";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createTask,
  updateTask,
} from "../../../Redux/Reducers/task/task.thunk";

/* -------------------------------- Make Date-------------------------------- */
const formatDate = (date) => {
  if (!date) return null;
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

/* -------------------------------- Theme Helpers -------------------------------- */
const getBgDialog = (theme) =>
  theme.palette.customColors?.bgDialog || theme.palette.background.paper;

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

/* -------------------------------- Main Dialog -------------------------------- */

export default function TaskFormDialog({ open, handleClose, info }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { type, title, id, dirID } = info;
  const { status, successMessage, error } = useSelector((store) => store.Task);

  const task =
    type === "edit" &&
    useSelector((store) => store.Task.task).find((t) => t.id === id);
  const dirs = useSelector((store) => store.Directory.directory);
  const directorys = dirs.map((d) => d.directoryName);
  const { control, handleSubmit, reset, watch } = useForm({
    resolver: zodResolver(taskFormSchema(directorys)),
    defaultValues: {
      title: "",
      deadLine: null,
      description: "",
      directory: "Main",
      important: false,
      completed: false,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (open) {
      if (type === "edit" && task) {
        reset({
          title: task.title,
          deadLine: task.deadLine ? new Date(task.deadLine) : null,
          description: task.description,
          directory: task.directory,
          important: task.important,
          completed: task.completed,
        });
      } else if (type === "add") {
        reset({
          title: "",
          deadLine: null,
          description: "",
          directory: "Main",
          important: false,
          completed: false,
        });
      }
    }
  }, [open, type, task, reset]);

  const onSubmit = (data) => {
    if (type === "add") {
      const { _id } = dirs.find((d) => d.directoryName === data.directory);
      const URL = `/user/directories/${_id}/tasks`;
      const taskData = {
        ...data,
        deadLine: formatDate(data.deadLine),
        createdAt: formatDate(new Date()),
      };
      console.log(formatDate(data.deadLine));
console.log("data");
console.log(taskData);
      dispatch(createTask({ data: taskData, URL }));
    } else if (type === "edit") {
      const newTaskData = {
        id,
        ...data,
        deadLine: data.deadLine ? formatDate(data.deadLine) : task.deadLine,
        createdAt: formatDate(new Date()),
      };

      dispatch(updateTask(newTaskData, `/user/tasks/${id}`));
    }
    handleClose();
  };

  const directory = watch("directory");

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
          },
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
                {title} Task
              </Typography>

              <Chip
                icon={<FolderIcon />}
                label={directory}
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
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  variant="filled"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  slotProps={{
                    inputLabel: {
                      shrink: Boolean(field.value),
                    },
                  }}
                  sx={{
                    ...filledStyles(theme),
                    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                      transform: "translate(12px, 0px) scale(0.80)",
                    },
                  }}
                />
              )}
            />

            {/* Date */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="deadLine"
                control={control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    {...field}
                    label="Dead Line"
                    value={field.value ?? null}
                    onChange={(v) => field.onChange(v)}
                    slotProps={{
                      textField: {
                        variant: "filled",
                        fullWidth: true,
                        name: field.name,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                        slotProps: {
                          inputLabel: {
                            shrink: Boolean(field.value),
                          },
                        },
                        sx: {
                          ...filledStyles(theme),
                        },
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            {/* Descripion */}
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  variant="filled"
                  fullWidth
                  label="Desciption (optional)"
                  multiline
                  rows={3}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{ ...filledStyles(theme) }}
                />
              )}
            />

            {/* Select */}
            <Controller
              name="directory"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl
                  variant="filled"
                  fullWidth
                  sx={{ ...filledStyles(theme) }}
                  error={!!fieldState.error}
                >
                  <Select
                    {...field}
                    MenuProps={{
                      slotProps: {
                        paper: {
                          sx: {
                            bgcolor: getBgDialog(theme),
                            borderRadius: 2,
                            color: (theme) =>
                              theme.palette.primary.contrastText,
                          },
                        },
                      },
                    }}
                  >
                    {directorys.map((d) => (
                      <MenuItem
                        sx={{
                          color: (theme) => theme.palette.primary.contrastText,
                        }}
                        value={d}
                      >
                        {d}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />

            {/* Toggles */}
            <Stack direction="row" spacing={3}>
              <Controller
                name="important"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label="Important"
                    control={<Switch {...field} checked={field.value} />}
                  />
                )}
              />

              <Controller
                name="completed"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label="Completed"
                    control={<Switch {...field} checked={field.value} />}
                  />
                )}
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
            {title} Task
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
