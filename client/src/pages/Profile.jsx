import { Box, Grid, Typography, } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';

import { useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import ProfileCardDetails from '../../components/profile/profile/ProfileCardDetails';

const Profile = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const cookie = Cookies.get(import.meta.env.VITE_COOKIE_KEY)
        if (!cookie) {
            navigate("/login")
        }
    }, [navigate])
    return (
        <Grid container  >
            <Grid item sx={{ paddingRight: "15px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <Box sx={{ backgroundColor: "#59e3a7", padding: "5px 10px 15px 5px", borderRadius: "5px", flex: "1", boxShadow: "0px 0px 3px 0px #1b2e35" }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                            <NotesIcon sx={{ color: "white" }} />
                            <Typography variant="span" sx={{ color: "white" }} >Total Post</Typography>
                        </Box>
                        <Box sx={{ width: "60px", height: "60px", padding: "15px", fontSize: "20px", fontWeight: "semibold", backgroundColor: "white", borderRadius: "50%", textAlign: "center", margin: "10px auto 0 auto" }}>
                            <Typography variant="span" >45</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ backgroundColor: "#59e3a7", padding: "5px 10px 15px 5px", borderRadius: "5px", flex: "1", boxShadow: "0px 0px 3px 0px #1b2e35" }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                            <NotesIcon sx={{ color: "white" }} />
                            <Typography variant="span" sx={{ color: "white" }} >Total Assignments</Typography>
                        </Box>
                        <Box sx={{ width: "60px", height: "60px", padding: "15px", fontSize: "20px", fontWeight: "semibold", backgroundColor: "white", borderRadius: "50%", textAlign: "center", margin: "10px auto 0 auto" }}>
                            <Typography variant="span" >45</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ backgroundColor: "#59e3a7", padding: "5px 10px 15px 5px", borderRadius: "5px", flex: "1", boxShadow: "0px 0px 3px 0px #1b2e35" }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                            <NotesIcon sx={{ color: "white" }} />
                            <Typography variant="span" sx={{ color: "white" }} >Total Product</Typography>
                        </Box>
                        <Box sx={{ width: "60px", height: "60px", padding: "15px", fontSize: "20px", fontWeight: "semibold", backgroundColor: "white", borderRadius: "50%", textAlign: "center", margin: "10px auto 0 auto" }}>
                            <Typography variant="span" >45</Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item >
                <ProfileCardDetails />
            </Grid>
        </Grid>
    );
};

export default Profile;
