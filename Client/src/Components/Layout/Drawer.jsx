import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import LinearWithValueLabel from "../Common/ProgressTaskBar";
import DirectoryDialog from "../Common/directoryForm/DirectoryDialog";
import TaskFormDialog from "../Common/taskForm/AddTaskForm";
// mui components:
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Button, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ListAltIcon from "@mui/icons-material/ListAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../Common/DeleteDialog";

const drawerWidth = 230;

const addDialogInfo = {
  title: "Create New",
  placeHolder: "Enter a directory name...",
  button: "Create",
};
const editDialogInfo = {
  title: "Edit",
  placeHolder: "",
  button: "Edit",
};

function ResponsiveDrawer() {
  const listDirectories = useSelector((store) => store.Directory.directory);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpenDirectoreDailog, setIsOpenDirectoreDailog] = useState(false);
  const [editdialogInfo, setEditDialogInfo] = useState(addDialogInfo);
  const [isOpenFormDialog, setIsOpenFormDialog] = useState(false);
  const [directoriesOpen, setDirectoriesOpen] = useState(() => {
    const savd = localStorage.getItem("directoryIsOpen");
    return savd ? JSON.parse(savd) : false;
  });
  const [deleteDialogInfo, setDeleteDialogInfo] = useState({});
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const sidebarItems = [
    { label: "All Tasks", path: "/", icon: <ListAltIcon /> },
    { label: "Important Tasks", path: "/important-task", icon: <StarIcon /> },
    {
      label: "Completed Tasks",
      path: "/completed-task",
      icon: <TaskAltIcon />,
    },
    {
      label: "Uncompleted Tasks",
      path: "/uncompleted-task",
      icon: <PendingActionsIcon />,
    },
  ];

  //handle delete Dialog:
  const handleConfirmDeleteDialog = async (id, directoryName) => {
    setIsOpenDeleteDialog(true);
    setDeleteDialogInfo({
      type: "directory",
      title: "Are you sure?",
      discription: "This directory will be deleted permanently.",
      id: id,
      name: directoryName,
    });
  };

  function handleFormDialog() {
    document.activeElement?.blur();
    setIsOpenFormDialog(!isOpenFormDialog);
  }

  function handleAddDialog() {
    document.activeElement?.blur();
    setIsOpenDirectoreDailog(true);
    setEditDialogInfo(addDialogInfo);
  }

  function handleEditDirectory(id, name) {
    document.activeElement?.blur();
    setIsOpenDirectoreDailog(true);
    setEditDialogInfo({
      ...editDialogInfo,
      placeHolder: name,
      id,
    });
  }

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header + Add button */}
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          py: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          To-Do List
        </Typography>

        <Button
          onClick={handleFormDialog}
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: (theme) => theme.palette.primary.main,
            px: 5,
            py: 0.5,
            borderRadius: 2,
            width: { xs: "100%", sm: "90%" },
            fontSize: "1rem",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
              transform: "translateY(-2px)",
              boxShadow: (theme) =>
                `0 4px 12px ${theme.palette.primary.dark}55`,
            },
          }}
        >
          Add New Task
        </Button>
      </Toolbar>

      <Divider />

      {/* Sidebar Main Items */}
      <List>
        {sidebarItems.map(({ label, path, icon }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              component={NavLink}
              to={path}
              sx={{
                position: "relative",
                "&.active": {
                  color: (theme) => theme.palette.secondary.main,
                  "& .MuiListItemText-primary": {
                    color: (theme) => theme.palette.secondary.main,
                    fontWeight: 500,
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    top: 0,
                    width: "3px",
                    height: "100%",
                    bgcolor: (theme) => theme.palette.secondary.main,
                    borderRadius: "2px",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* SCROLLABLE AREA */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          minHeight: 0,
          pb: "55.2125px",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.25)"
                : "rgba(0,0,0,0.25)",
            borderRadius: "10px",
          },
        }}
      >
        <List sx={{ pl: directoriesOpen ? 0.5 : 0 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                const newValue = !directoriesOpen;
                setDirectoriesOpen(newValue);
                localStorage.setItem(
                  "directoryIsOpen",
                  JSON.stringify(newValue)
                );
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {directoriesOpen ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <FolderOpenIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary="Directories"
                slotProps={{
                  primary: {
                    sx: { fontWeight: 500, fontSize: "1rem" },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          {directoriesOpen && (
            <ListItem disablePadding sx={{ pl: 6, py: 0.2 }}>
              <ListItemButton component={NavLink} to="/directory/main">
                <ListItemText
                  primary="Main"
                  slotProps={{
                    primary: {
                      sx: { fontSize: "1rem", color: "text.secondary" },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {directoriesOpen &&
            listDirectories.map(({ id, directoryName, path }) => (
              <ListItem key={id} disablePadding sx={{ pl: 6 }}>
                <ListItemButton
                  component={NavLink}
                  to={path}
                  sx={{
                    position: "relative",
                    "&:hover .directory-actions-icon": {
                      display: "flex",
                    },
                  }}
                >
                  <ListItemText
                    primary={directoryName}
                    slotProps={{
                      primary: {
                        sx: { fontSize: "1rem", color: "text.secondary" },
                      },
                    }}
                  />

                  <ListItemIcon
                    className="directory-actions-icon"
                    sx={{ minWidth: 32, display: "none" }}
                  >
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEditDirectory(id, directoryName);
                      }}
                    >
                      <EditIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleConfirmDeleteDialog(id, directoryName);
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}

          {directoriesOpen && (
            <ListItem disablePadding sx={{ pl: 6 }}>
              <ListItemButton onClick={handleAddDialog}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Add"
                  slotProps={{
                    primary: {
                      sx: { fontSize: "1rem", color: "text.secondary" },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>

      {/* Progress Bar — stays bottom */}
      <LinearWithValueLabel />
    </Box>
  );

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
        size="large"
      >
        <MenuIcon />
      </IconButton>

      <aside>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                backgroundColor: (theme) => theme.palette.customColors.drawerBg,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
              },
            }}
            slotProps={{
              root: { keepMounted: true },
            }}
          >
            {drawer}
          </Drawer>

          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                backgroundColor: (theme) => theme.palette.customColors.drawerBg,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </aside>

      {/* Dialogs */}
      <DirectoryDialog
        handleClose={() => setIsOpenDirectoreDailog(false)}
        info={editdialogInfo}
        open={isOpenDirectoreDailog}
        directoryList={listDirectories}
      />
      <DeleteDialog
        info={deleteDialogInfo}
        handleClose={() => setIsOpenDeleteDialog(false)}
        open={isOpenDeleteDialog}
      />
      <TaskFormDialog
        open={isOpenFormDialog}
        handleClose={handleFormDialog}
        info={{ type: "add", title: "Add New" }}
      />
    </>
  );
}

export default ResponsiveDrawer;
