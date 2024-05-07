import { Box, Grid, Avatar, Typography, Card, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import VerifiedIcon from '@mui/icons-material/Verified';

const Profile = () => {
    return (
        <Grid container m={2}>
            <Grid item xs="4">1</Grid>
            <Grid item xs="4">2</Grid>
            <Grid item xs="4" >
                <Box sx={{ position: "relative", marginTop: "50px" }}>
                    <Box sx={{
                        margin: "auto",
                        height: "90px",
                        width: "90px",
                        padding: "5px",
                        backgroundColor: "#59e3a7",
                        borderRadius: "50%",
                        border: "2px solid lightgray",
                        position: "absolute",
                        zIndex: "50",
                        left: "50%",
                        transform: "translateX(-50%)",
                        top: "-50px"
                    }}>
                        <Avatar sx={{ width: "100%", height: "100%" }} alt="Hdy Baker" src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png" />
                    </Box>
                    <Card sx={{ backgroundColor: "#59e3a7", borderRadius: "10px", padding: "40px 15px 15px 15px" }}  >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="h1"
                                sx={{
                                    fontSize: "45px",
                                    fontWeight: "bold"
                                }}
                            >Masum Billah</Typography>
                            <VerifiedIcon />
                        </Box>
                        <Typography variant="h1"
                            sx={{
                                fontSize: "20px"
                            }}
                        >masum184e@gmail.com</Typography>
                        <Typography sx={{ color: "gray", margin: "5px 0" }} variant="body1">At Thinkify, our mission is to provide a dynamic and intuitive platform that empowers individuals to transform their ideas into actionable tasks.</Typography>
                        <Button component={Link} to="update-profile" sx={{
                            backgroundColor: "white",
                            color: "black",
                            "&:hover": {
                                backgroundColor: "white"
                            }
                        }} fullWidth >Edit Profile</Button>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Profile;
