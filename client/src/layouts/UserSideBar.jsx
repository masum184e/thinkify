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
import Footer from "../../components/home/footer/Footer";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import useThinkify from "../hooks/useThinkify";
import AlertBox from "../../components/common/AlertBox";

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
    try {
      const response = await axios({
        baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
        url: "/users/log-out",
        withCredentials: true,
        method: "GET",
      });
      if (response.data.status) {
        setAlertBoxOpenStatus(true);
        setAlertSeverity("success");
        setAlertMessage(response.data.message);
        Cookies.remove(import.meta.env.VITE_COOKIE_KEY);
        navigate("/login");
      } else {
        setAlertBoxOpenStatus(true);
        setAlertSeverity("error");
        setAlertMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlertBoxOpenStatus(true);
      setAlertSeverity("error");
      error.response.data.message
        ? setAlertMessage(error.response.data.message)
        : setAlertMessage(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios({
        baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
        url: "/users/profile",
        withCredentials: true,
        method: "GET",
      });
      if (response.data.status && response.data.user.role !== "user") {
        Cookies.remove(import.meta.env.VITE_COOKIE_KEY);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Cookies.remove(import.meta.env.VITE_COOKIE_KEY);
      navigate("/login");
    }
  };

  useEffect(() => {
    const cookie = Cookies.get(import.meta.env.VITE_COOKIE_KEY);
    if (cookie) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [navigate]);

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
