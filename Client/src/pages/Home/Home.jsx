import { Outlet, useLocation } from "react-router";
import Header from "../../Components/Layout/Header";
import AddNewTaskCardApp from "../../Components/Common//AddNewTaskCardApp";
import AddNewTaskCardFormat from "../../Components/Common/AddNewTaskCardFormat";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import TaskFormDialog from "../../Components/Common/taskForm/AddTaskForm";
import { changeShowTask, SortByOption } from "../../Redux/Reducers/app.reducer";
//Mui Components:
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AppsIcon from "@mui/icons-material/Apps";

function Home() {
  const dispatch = useDispatch();
  const isList = useSelector((store) => store.App.showTask);
  const tasks = useSelector((store) => store.Task.task);
  const theme = useTheme();
  const [isOpenFormDialog, setisOpenFormDialog] = useState("");
  const location = useLocation();
  const isInDirectoryPage = location.pathname === "/";
  const routeName = location.pathname;
  const [sortBy, setSortBy] = useState("");
  // handle change select Form (sort):
  const handelCahngeSortForm = (e) => {
    setSortBy(e.target.value);
    dispatch(SortByOption(e.target.value));
  };

  // Extract and Capitalize Pathname:
  const convertPath = (str) => {
    const match = str.match(/[^\/]+$/);
    if (!match) return "";

    return match[0].replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
  };

  const getPageType = (pathname) => {
    if (pathname === "/") return { type: "all" };
    if (pathname === "/important-task") return { type: "important" };
    if (pathname === "/completed-task") return { type: "completed" };
    if (pathname === "/uncompleted-task") return { type: "uncompleted" };

    const match = pathname.match(/^\/directory\/(.+)/);
    console.log(match[1]);
    if (match) return { type: "directory", name: convertPath(match[1]) };

    return { type: "unknown" };
  };

  const numberOfTasks = (pathname) => {
    const { type, name } = getPageType(pathname);

    switch (type) {
      case "important":
        return tasks.filter((t) => t.important === true).length;

      case "completed":
        return tasks.filter((t) => t.completed === true).length;

      case "uncompleted":
        return tasks.filter((t) => t.completed === false).length;

      case "directory":
        return tasks.filter((t) => t.directory === name).length;

      case "all":
      default:
        return tasks.length;
    }
  };

  function handleFormDialog() {
    document.activeElement?.blur();
    setisOpenFormDialog(!isOpenFormDialog);
  }
  return (
    <>
      <Header />
      <Box
        component={"main"}
        sx={{
          ml: { xs: 0, sm: "230px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ pl: 4, pt: 3 }}>
          {routeName === "/" ? "All tasks" : convertPath(routeName)} (
          {numberOfTasks(routeName) + " "}
          {numberOfTasks(routeName) > 1 ? "tasks" : "task"})
        </Typography>
        {/* //Toolbar: */}
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            textAlign: "center",
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 112,
          }}
        >
          <Box>
            <IconButton
              sx={{
                color: isList
                  ? (theme) => theme.palette.primary.main
                  : (theme) => theme.palette.text.disabled,
                px: 1,
                py: 1,
              }}
              onClick={() => {
                dispatch(changeShowTask());
                localStorage.setItem("isList", JSON.stringify(true));
              }}
            >
              <FormatListBulletedIcon />
            </IconButton>

            <IconButton
              sx={{
                color: !isList
                  ? (theme) => theme.palette.primary.main
                  : (theme) => theme.palette.text.disabled,
                px: 1,
                py: 1,
              }}
              onClick={() => {
                dispatch(changeShowTask());
                localStorage.setItem("isList", JSON.stringify(false));
              }}
            >
              <AppsIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={handleFormDialog}
              sx={{
                py: 1.5,
                mr: 1,
                display: { xl: "inline", sm: "none", md: "inline" },
              }}
            >
              Add New Task
            </Button>

            {isInDirectoryPage && (
              <FormControl
                variant="filled"
                size="small"
                sx={{
                  m: 1,
                  minWidth: 150,

                  // Label
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.secondary,
                  },

                  // Root of filled input inside Select
                  "& .MuiInputBase-root": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#1A2238" : "#ffffff",

                    borderRadius: 1,
                    color: theme.palette.text.primary,
                    transition: "0.2s ease",

                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#1E2A44" : "#f0f0f0",
                    },

                    "&.Mui-focused": {
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#233150" : "#ffffff",
                    },
                  },

                  // Select icon color
                  "& .MuiSelect-icon": {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                <InputLabel id="sort-select-label">Sort by</InputLabel>

                <Select
                  labelId="sort-select-label"
                  value={sortBy}
                  onChange={handelCahngeSortForm}
                >
                  <MenuItem value="">None (Default)</MenuItem>
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="deadlineAsc">Closest Deadline</MenuItem>
                  <MenuItem value="deadlineDesc">Farthest Deadline</MenuItem>
                  <MenuItem value="completed">Completed First</MenuItem>
                  <MenuItem value="uncompleted">Uncompleted First</MenuItem>
                  <MenuItem value="important">Important First</MenuItem>
                  <MenuItem value="normal">Normal First</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </Box>
        {/* //Cards: */}
        <Box
          sx={{
            width: "100%",
            p: 5,
            display: "flex",
            flexDirection: isList ? "column" : "row",
            alignItems: isList ? "start" : "center",
            flexWrap: isList ? "nowrap" : "wrap",
            gap: "15px",
          }}
        >
          {/* children: */}
          <Outlet />

          {/* add task card */}
          {isList ? <AddNewTaskCardFormat /> : <AddNewTaskCardApp />}
        </Box>

        {/* add task dialog */}
        <TaskFormDialog
          open={isOpenFormDialog}
          handleClose={handleFormDialog}
          info={{ type: "add", title: "Add New" }}
        />
      </Box>
    </>
  );
}

export default Home;
