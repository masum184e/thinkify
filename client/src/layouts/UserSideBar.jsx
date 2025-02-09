import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import NavBar from "./NavBar";
import Footer from "./Footer";
import Cookies from "js-cookie";
import useThinkify from "../hooks/useThinkify";
import AlertBox from "../../components/common/AlertBox";
import { useEffect } from "react";
import SellIcon from '@mui/icons-material/Sell';

const UserSideBar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAlertBoxOpenStatus, setAlertMessage, setAlertSeverity } =
    useThinkify();

  const listData = [
    {
      label: "My Profile",
      url: "/profile",
      icon: <DashboardIcon />,
    },
    {
      label: "My Post",
      url: "/my-post",
      icon: <ListAltIcon />,
    },
    {
      label: "Add Post",
      url: "/add-post",
      icon: <AddBoxIcon />,
    },
    {
      label: "Add Product",
      url: "/add-product",
      icon: <AddShoppingCartIcon />,
    },
    {
      label: "My Product",
      url: "/my-product",
      icon: <SellIcon />,
    },
    {
      label: "Task Manager",
      url: "/task-management",
      icon: <PlaylistAddCheckIcon />,
    },
    {
      label: "Setting",
      url: "/setting",
      icon: <SettingsIcon />,
    },
  ];

  const handleLogOut = async () => {
    setAlertBoxOpenStatus(true);
    setAlertSeverity("success");
    setAlertMessage("Logged Out Successfully");
    Cookies.remove(import.meta.env.VITE_TOKEN_KEY, { path: "" });
    Cookies.remove(import.meta.env.VITE_USER_ROLE, { path: "" });
    navigate("/login");
  };

  useEffect(() => {
    const token = Cookies.get(import.meta.env.VITE_TOKEN_KEY);
    const role = Cookies.get(import.meta.env.VITE_USER_ROLE);
    if (token && role) {
      if (role === "user") {
        navigate("/profile");
      } else if (role === "admin") {
        navigate("/dashboard");
      }
    } else {
      Cookies.remove(import.meta.env.VITE_TOKEN_KEY, { path: "" });
      Cookies.remove(import.meta.env.VITE_USER_ROLE, { path: "" });
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <NavBar />
      <AlertBox />
      <Box sx={{ display: "flex", minHeight: "620px" }}>
        <Drawer
          variant="persistent"
          open
          sx={{
            width: "240px",
            "& .MuiDrawer-paper": {
              position: "static",
            },
          }}
        >
          <List sx={{ p: "0" }}>
            {listData.map(({ label, url, icon }, index) => (
              <ListItem
                key={label + "_" + index}
                sx={{ borderBottom: "1px solid lightgray" }}
                component="div"
              >
                <NavLink
                  to={url}
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    color: location.pathname === url ? "#59e3a7" : "inherit",
                  }}
                  activestyle={{ color: "#59e3a7" }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === url ? "#59e3a7" : "inherit",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{
                      color: location.pathname === url ? "#59e3a7" : "inherit",
                    }}
                  />
                </NavLink>
              </ListItem>
            ))}
            <ListItem
              sx={{ borderBottom: "1px solid lightgray" }}
              component="div"
            >
              <NavLink
                onClick={handleLogOut}
                component="button"
                style={{
                  width: "100%",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  color: "inherit",
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Sign Out"} />
              </NavLink>
            </ListItem>
          </List>
        </Drawer>
        <Box sx={{ width: "100%", margin: "10px" }}>{children}</Box>
      </Box>
      <Footer />
    </div>
  );
};

UserSideBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserSideBar;
