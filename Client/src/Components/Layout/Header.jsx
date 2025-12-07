import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Drawer from "./Drawer";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { changeThemeMode } from "../../Redux/Reducers/app.reducer";
import { useNavigate } from "react-router";
import SearchDropdown from "../Common/SearchDropdown";
import slugify from "slugify";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "100%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("rgba(239, 246, 249)", 0.15),

  "&:hover": {
    backgroundColor: alpha("rgba(239, 246, 249)", 0.25),
  },

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const debounce = (fn, delay) => {
  let timer;

  const debouncedFn = (arg) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(arg);
    }, delay);
  };

  debouncedFn.cancel = () => {
    clearTimeout(timer);
  };

  return debouncedFn;
};

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.App.theme);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [valueDropdown, setValueDropdown] = useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const debouncedSearch = useMemo(() => {
    return debounce((val) => {
      setValueDropdown(val);
    }, 500);
  }, []);

  function onSeeAllResults(trimmed) {
    navigate(`/result?${new URLSearchParams({ search: trimmed })}`);
    setSearchValue("");
    setValueDropdown("");
  }

  function handleNotFound() {
    setSearchValue("");
    setValueDropdown("");
  }

  function onResultClick({ title, id }) {
    const slug = slugify(title, { lower: true });

    navigate(`/task/${id}/${slug}`);
    setSearchValue("");
    setValueDropdown("");
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchField = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleTheme = () => {
    localStorage.setItem("theme", !theme);
    dispatch(changeThemeMode());
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={1} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit">
          <LightModeIcon />
          {/* <DarkModeIcon /> */}
        </IconButton>
        <p>Light</p>
      </MenuItem>
    </Menu>
  );

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: (theme) => theme.palette.customColors.appbarBg,
            color: (theme) => theme.palette.customColors.appbarText,
          }}
        >
          <Toolbar>
            <Drawer />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={searchValue}
                onChange={handleSearchField}
                placeholder="Search…"
                inputProps={{ "aria-label": "search", width: "100%" }}
              />
              <SearchDropdown
                query={valueDropdown}
                onSeeAllResults={onSeeAllResults}
                onResultClick={onResultClick}
                handleNotFound={handleNotFound}
              />
            </Search>

            {/* Right Side */}
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* light and dark icons */}
              <IconButton
                size="large"
                color="inherit"
                onClick={handleTheme}
                sx={{
                  "&:hover": {
                    color: " yellow",
                  },
                }}
              >
                <Badge>{theme ? <DarkModeIcon /> : <LightModeIcon />}</Badge>
              </IconButton>

              <IconButton size="large" color="inherit">
                <Badge badgeContent={1}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </header>
  );
}
