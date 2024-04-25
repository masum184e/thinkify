import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import NavBar from "../../components/home/NavBar";
import Footer from "../../components/home/footer/Footer";

import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListAltIcon from '@mui/icons-material/ListAlt';

const Dashboard = () => {
    const listData = [
        {
            label: "My Profile",
            url: "/dashboard",
            icon: <DashboardIcon />
        }, {
            label: "My Post",
            url: "/dashboard/my-post",
            icon: <ListAltIcon />
        }, {
            label: "Add Post",
            url: "/dashboard/add-post",
            icon: <AddBoxIcon />
        },
    ];

    const location = useLocation();

    return (
        <div>
            <NavBar />
            <Box>
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
                                    style={{ textDecoration: "none", display: "flex", alignItems: "center", color: location.pathname === url ? '#59e3a7' : 'inherit' }}
                                    activeStyle={{ color: '#59e3a7' }}
                                >
                                    <ListItemIcon sx={{ color: location.pathname === url ? '#59e3a7' : 'inherit' }}>{icon}</ListItemIcon>
                                    <ListItemText primary={label} sx={{ color: location.pathname === url ? '#59e3a7' : 'inherit' }} />
                                </NavLink>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
            <Footer />
        </div>
    );
};

export default Dashboard;
