import { AppBar, Toolbar, Box, Typography, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import AlertBox from '../../components/common/AlertBox';

export default function NavBar() {
    const cookie = Cookies.get(import.meta.env.VITE_COOKIE_KEY)
    return (
        <Box>
            <AppBar position="static" sx={{ backgroundColor: "transparent", borderBottom: "1px solid #59e3a7", padding: "5px 0" }} elevation={0} >
                <Toolbar>
                    <Box sx={{ maxWidth: "1280px", width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >
                                <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                    <img src="./images/favicon.ico" width="55" alt="Thinkify" />
                                    <Typography
                                        sx={{
                                            fontFamily: "Platypi",
                                            color: "#1b2e35"
                                        }}
                                        variant="h3"
                                        component="h3"
                                    >Thinkify</Typography>
                                </Box>
                            </Link>
                            <Box >
                            {
                                !cookie && <>
                                <ButtonGroup >
                                    <Link to="/registration"><Button sx={{ backgroundColor: "#1b2e35", color: "white", "&:hover": { backgroundColor: "#1b2e35" } }}>Join</Button></Link>
                                    <Link to="/login"><Button sx={{ backgroundColor: "#1b2e35", color: "white", "&:hover": { backgroundColor: "#1b2e35" } }}>Login</Button></Link>
                                </ButtonGroup>
                                </>
                            }
                            </Box>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <AlertBox />
        </Box>
    );
}