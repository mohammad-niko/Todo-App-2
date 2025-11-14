import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
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
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinearWithValueLabel from "../Common/ProgressTaskBar";
import DirectoryDialog from "../Common/DirectoryDialog";

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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [directoriesOpen, setDirectoriesOpen] = useState(false);
  const [directoreDailog, setDirectoreDailog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState(addDialogInfo);
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

  const listDirectories = ["secondary"];

  function handleAddDialog() {
    setDirectoreDailog(true);
    setDialogInfo(addDialogInfo);
  }
  function handleEditDirectory(name) {
    setDirectoreDailog(true);
    setDialogInfo({ ...editDialogInfo, placeHolder: name });
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
    <div>
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
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: (theme) => theme.palette.primary.main,
            px: 5,
            py: 0.5,
            borderRadius: 2,
            width: "90%",
            fontSize: "1rem",
            width: { xs: "100%", sm: "90%" },
            transition: "all 0.3s ease",

            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
              transform: "translateY(-2px)",
              boxShadow: (theme) =>
                `0 4px 12px ${theme.palette.primary.dark}55`,
            },
          }}
        >
          Add Task
        </Button>
      </Toolbar>
      <Divider />
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
      <List
        sx={{
          transition: "padding-left 0.25s ease",
          pl: directoriesOpen ? 0.5 : 0,
        }}
      >
        {/* --- Directories header --- */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setDirectoriesOpen(!directoriesOpen)}>
            <ListItemIcon
              sx={{ minWidth: 40, width: directoriesOpen ? "0px" : "56px" }}
            >
              {directoriesOpen ? <KeyboardArrowDownIcon /> : <FolderOpenIcon />}
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

        {/* --- Subdirectories --- */}
        {directoriesOpen &&
          listDirectories.map((name) => (
            <ListItem
              key={name}
              disablePadding
              sx={{
                pl: 6,
                py: 0.2,
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 32,
                  "&:hover": {
                    "& .directory-actions-icon": { display: "flex" },
                  },
                }}
              >
                <ListItemText
                  primary={name}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: "1rem",
                        color: "text.secondary",
                      },
                    },
                  }}
                />
                <ListItemIcon
                  className="directory-actions-icon"
                  sx={{
                    minWidth: 32,
                    display: "none",
                  }}
                >
                  <IconButton
                    size="small"
                    aria-label="edit"
                    sx={{ p: 0.3 }}
                    onClick={() => handleEditDirectory(name)}
                  >
                    <EditIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                  <IconButton size="small" aria-label="delete" sx={{ p: 0.3 }}>
                    <DeleteIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}

        {directoriesOpen && (
          <ListItem disablePadding sx={{ pl: 6, py: 0.2 }}>
            <ListItemButton sx={{ minHeight: 32 }}>
              <ListItemText
                primary="main"
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: "1rem",
                      color: "text.secondary",
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        )}

        {/* --- Add new directory --- */}
        {directoriesOpen && (
          <ListItem disablePadding sx={{ pl: 5, py: 0.2 }}>
            <ListItemButton onClick={handleAddDialog} sx={{ minHeight: 32 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Add"
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: "1rem",
                      color: "text.secondary",
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <LinearWithValueLabel />
    </div>
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
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: (theme) => theme.palette.customColors.drawerBg,
              },
            }}
            slotProps={{
              root: {
                keepMounted: true, // Better open performance on mobile.
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: (theme) => theme.palette.customColors.drawerBg,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <DirectoryDialog
          open={directoreDailog}
          handleClose={() => setDirectoreDailog(false)}
          info={dialogInfo}
        />
      </aside>
    </>
  );
}

export default ResponsiveDrawer;
