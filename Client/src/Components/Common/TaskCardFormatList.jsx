import {
  Box,
  Typography,
  IconButton,
  Chip,
  Card,
  CardContent,
  CardActions,
  Stack,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteDialog from "./DeleteDialog";
import { useDispatch } from "react-redux";
import { useState } from "react";
import TaskFormDialog from "./taskForm/AddTaskForm";
import { updateTask } from "../../Redux/Reducers/task/task.thunk";

const TaskCardFormatList = ({ data }) => {
  const dispatch = useDispatch();
  const {
    _id: id,
    title,
    deadLine,
    description,
    dirName,
    important,
    completed,
  } = data;

  const [deleteDialogInfo, setDeleteDialogInfo] = useState({});
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenFormDialog, setisOpenFormDialog] = useState("");

  function handleImportant(id) {
    dispatch(
      updateTask({
        data: { important: !important },
        URL: `/user/tasks/${id}`,
      })
    );
  }
  function handleCompleted(id) {
    dispatch(
      updateTask({
        data: { completed: !completed },
        URL: `/user/tasks/${id}`,
      })
    );
  }

  //handle delete Dialog:
  const handelDeleteDialog = async () => {
    document.activeElement?.blur();
    setIsOpenDeleteDialog(true);
    setDeleteDialogInfo({
      type: "task",
      id: id,
      title: "Are you sure?",
      discription: "This task will be deleted permanently.",
    });
  };

  // handle edit dialog:
  function handleFormDialog() {
    document.activeElement?.blur();
    setisOpenFormDialog(!isOpenFormDialog);
  }

  return (
    <Box sx={{ position: "relative", width: "100%", pb: 2.5 }}>
      {/* "Main" label */}
      <Box
        sx={{
          position: "absolute",
          top: -18,
          right: 24,
          backgroundColor: "#FBCFE8",
          color: "#7A2040",
          fontSize: 13,
          px: 2.2,
          py: 0.5,
          borderRadius: 2,
          boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
          fontWeight: 600,
          letterSpacing: 0.5,
          zIndex: 1000,
        }}
      >
        {dirName}
      </Box>

      {/* Main Card */}
      <Card
        elevation={4}
        sx={{
          background: "linear-gradient(145deg, #6D28D9, #8B5CF6)",
          color: "white",
          borderRadius: 3,
          p: 0,
          mb: 2,
          "&:hover": {
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          },
        }}
      >
        {/* Content */}
        <CardContent sx={{ pb: 1.5 }}>
          {/* Title */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", fontSize: 16 }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Box
            sx={{
              mt: 0.5,
              maxHeight: 60,
              overflowY: "auto",
              pr: 0.5,
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: "4px",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{ opacity: 0.9, fontSize: 13.5, lineHeight: 1.5 }}
            >
              {description}
            </Typography>
          </Box>
        </CardContent>

        {/* Footer / Actions */}
        <CardActions
          sx={{
            px: 2,
            pb: 2.2,
            pt: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Date */}
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarMonthIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontSize: 13.5 }}>
              {deadLine}
            </Typography>
          </Stack>

          {/* Right side icons */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.2}
            sx={{
              "@media (max-width:640px)": {
                spacing: 0.3,
                "& .MuiChip-root": {
                  fontSize: "0.6rem",
                  height: 22,
                  px: 0.3,
                },
                "& .MuiIconButton-root": {
                  padding: "1px",
                },
              },
            }}
          >
            <Chip
              label={completed ? "Completed" : "Uncompleted"}
              onClick={() => handleCompleted(id)}
              sx={{
                bgcolor: completed ? "greenyellow" : "#FDE68A",
                color: "#000",
                fontWeight: 600,
                borderRadius: "14px",
                height: 26,
                fontSize: 13,
              }}
            />

            {/* important */}
            <IconButton
              size="small"
              onClick={() => handleImportant(id)}
              sx={{
                color: important ? "#FACC15" : "",
                "&:hover": "#FDE68A",
              }}
            >
              <StarIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => handelDeleteDialog(id)}
              sx={{
                color: "#EF4444",
                "&:hover": { color: "#F87171", transform: "scale(1.1)" },
                transition: "all 0.2s",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={() => handleFormDialog(id)}
              size="small"
              sx={{
                color: "white",
                "&:hover": { color: "#E0E7FF" },
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Stack>
        </CardActions>
      </Card>

      {/* Dialogs */}
      <DeleteDialog
        info={deleteDialogInfo}
        handleClose={() => setIsOpenDeleteDialog(false)}
        open={isOpenDeleteDialog}
      />
      <TaskFormDialog
        open={isOpenFormDialog}
        handleClose={handleFormDialog}
        info={{ type: "edit", title: "Edit", id: id }}
      />
    </Box>
  );
};

export default TaskCardFormatList;
