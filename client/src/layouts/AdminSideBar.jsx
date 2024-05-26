import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportIcon from '@mui/icons-material/Report';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

import NavBar from "./NavBar";
import Footer from "../../components/home/footer/Footer";

const AdminSideBar = () => {
    const listData = [
        {
            label: "My Profile",
            url: "/dashboard",
            icon: <DashboardIcon />
        },{
            label: "Users",
            url: "/dashboard/users",
            icon: <GroupIcon />
        },{
            label: "Reports",
            url: "/dashboard/reports",
            icon: <ReportIcon />
        },{
            label: "Sign Out",
            url: "#",
            icon: <LogoutIcon />
        },
    ];

    const location = useLocation();
    return (
        <div>
            <NavBar />
            <Box sx={{ display: "flex" }}>
                <Drawer
                    variant="persistent"
                    open
                    sx={{
                        width: "240px",
                        '& .MuiDrawer-paper': {
                            position: "static"
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
                                    style={{ width:"100%",textDecoration: "none", display: "flex", alignItems: "center", color: location.pathname === url ? '#59e3a7' : 'inherit' }}
                                    activestyle={{ color: '#59e3a7' }}
                        
                                >
                                    <ListItemIcon sx={{ color: location.pathname === url ? '#59e3a7' : 'inherit' }}>{icon}</ListItemIcon>
                                    <ListItemText primary={label} sx={{ color: location.pathname === url ? '#59e3a7' : 'inherit' }} />
                                </NavLink>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box sx={{ width: "100%", margin: "10px" }}>
                    <Outlet />
                </Box>
            </Box>
            <Footer />
        </div>
    )
}

export default AdminSideBar