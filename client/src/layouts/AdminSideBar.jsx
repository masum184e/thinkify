import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

import NavBar from "./NavBar";
import useThinkify from "../hooks/useThinkify";
import Cookies from "js-cookie";
import { useEffect } from "react";
import AlertBox from "../../components/common/AlertBox";
import Footer from "./Footer";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAlertBoxOpenStatus, setAlertMessage, setAlertSeverity } =
    useThinkify();
  const listData = [
    {
      label: "My Profile",
      url: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Users",
      url: "/dashboard/users",
      icon: <GroupIcon />,
    }
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
      <Box sx={{ display: "flex" }}>
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
        <Box sx={{ width: "100%", padding: "10px 10px 5px 0px" }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default AdminSideBar;
