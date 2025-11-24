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
import { useState } from "react";
import TaskCardAppList from "../Common/TaskCardAppList";
import TaskCardFormatList from "../Common/TaskCardFormatList";
import AddNewTaskCard from "../Common/AddMewTaskCardApp";
import AddNewTaskCardApp from "../Common/AddMewTaskCardApp";
import AddNewTaskCardFormat from "../Common/AddNewTaskCardFormat";

const mmad = [1, 2, 3];

function AllTasks() {
  const [sortBy, setSortBy] = useState("");
  const [isList, setIsList] = useState(() => {
    const saved = localStorage.getItem("isList");
    return saved ? JSON.parse(saved) : false;
  });
  const theme = useTheme();

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Box
      component={"main"}
      sx={{
        ml: { xs: 0, sm: "230px" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={{ pl: 4, pt: 3 }}>
        All task (3 task)
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
              setIsList(true);
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
              setIsList(false);
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
            sx={{
              py: 1.5,
              mr: 1,
              display: { xl: "inline", sm: "none", md: "inline" },
            }}
          >
            Add New Task
          </Button>

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
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Order Add</MenuItem>
              <MenuItem value={20}>Earlier first</MenuItem>
              <MenuItem value={30}>Later first</MenuItem>
              <MenuItem value={40}>Completed first</MenuItem>
              <MenuItem value={50}>Uncompleted first</MenuItem>
            </Select>
          </FormControl>
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
        {isList
          ? mmad.map((item) => <TaskCardFormatList key={item} />)
          : mmad.map((item) => <TaskCardAppList key={item} />)}
        {isList ? <AddNewTaskCardFormat /> : <AddNewTaskCardApp />}
      </Box>
    </Box>
  );
}

export default AllTasks;
