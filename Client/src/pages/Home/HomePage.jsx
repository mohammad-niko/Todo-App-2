import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import Header from "../../Components/Layout/Header";
import AddNewTaskCardApp from "../../Components/Common//AddNewTaskCardApp";
import AddNewTaskCardFormat from "../../Components/Common/AddNewTaskCardFormat";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import TaskFormDialog from "../../Components/Common/taskForm/AddTaskForm";
import { changeShowTask } from "../../Redux/Reducers/app/app.reducer";
//Mui Components:
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AppsIcon from "@mui/icons-material/Apps";
import AllTasks from "./AllTasksPage";
import { useEffect } from "react";
import { getTaskList } from "../../Redux/Reducers/task/task.thunk";
import { getAllDirs } from "../../Redux/Reducers/directory/directory.thunk";

function Home() {
  const dispatch = useDispatch();
  const isList = useSelector((store) => store.App.showTask);
  const taskStore = useSelector((store) => store.Task);
  const pagination = taskStore.pagination;
  const theme = useTheme();
  const location = useLocation();
  const isInDirectoryPage = location.pathname === "/";
  const pathIstask = location.pathname.substring(1, 5) === "task";
  const routeName = location.pathname;
  const [isOpenFormDialog, setisOpenFormDialog] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const query = searchParams.get("search");
  const safeQuery = query?.toLowerCase() || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = 8;
  const importance = searchParams.get("importance") || "all";
  const status = searchParams.get("status") || "all";
  const sort = searchParams.get("sort") || "normal";
  const dirName = useParams().name || "";

  // get task list:
  useEffect(() => {
    dispatch(
      getTaskList(
        `/user/tasks?page=${page}&limit=${limit}&importance=${importance}&status=${status}&sort=${sort}&search=${safeQuery}&dirtasks=${dirName}`,
      ),
    );
  }, [page, limit, importance, status, sort, dirName, safeQuery]);

  // get dirctory list:
  useEffect(() => {
    dispatch(getAllDirs("/user/directories"));
  }, []);

  // handle change select Form (sort):
  const handelCahngeSortForm = (e) => {
    setSortBy(e.target.value);
    e.target.value
      ? setSearchParams({ sort: e.target.value })
      : setSearchParams({});
  };

  // Extract and Capitalize Pathname:
  const convertPath = (str) => {
    const match = str.match(/[^\/]+$/);
    if (!match) return "";

    return match[0].replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
  };

  // const count = numberOfTasks(routeName);
  const count = pagination.totalItems;

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
        <Typography
          variant="h5"
          sx={{
            pl: 4,
            pt: 3,
            color: (theme) => theme.palette.primary.contrastText,
          }}
        >
          {count !== 0
            ? pathIstask
              ? convertPath(routeName)
              : `${
                  routeName === "/" ? "All tasks" : convertPath(routeName)
                } (${count} ${count > 1 ? "tasks" : "task"})`
            : routeName === "/"
              ? "All tasks"
              : convertPath(routeName)}
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
                  ? theme.palette.primary.main
                  : theme.palette.text.disabled,
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
                  ? theme.palette.primary.main
                  : theme.palette.text.disabled,
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
                display: { xs: "none", sm: "none", md: "inline" },
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
                  <MenuItem value="deadlineasc">Closest Deadline</MenuItem>
                  <MenuItem value="deadlinedesc">Farthest Deadline</MenuItem>
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
            justifyContent: {
              xs: "center",
              sm: "initial",
            },
            flexWrap: isList ? "nowrap" : "wrap",
            gap: "15px",
          }}
        >
          {/* children: */}

          {/* all tasks:  */}
          {isInDirectoryPage && <AllTasks />}

          <Outlet />

          {/* add task card */}
          {isList ? <AddNewTaskCardFormat /> : <AddNewTaskCardApp />}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
            mb: 1.5,
          }}
        >
          <Pagination
            count={pagination.totalPages}
            color="primary"
            onChange={(_, value) => {
              setSearchParams((prev) => {
                prev.set("page", value.toString());
                return prev;
              });
            }}
            sx={{
              display:
                Number(pagination.totalPages) === 1
                  ? "none"
                  : pathIstask
                    ? "none"
                    : "inline",
            }}
          />
        </Box>

        {/* add task dialog */}
        {isOpenFormDialog && (
          <TaskFormDialog
            open={isOpenFormDialog}
            handleClose={handleFormDialog}
            info={{ type: "add", title: "Add New" }}
          />
        )}
      </Box>
    </>
  );
}

export default Home;
