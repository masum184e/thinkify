import { Box, Grid, Avatar, Typography, Card } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';

import { useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const cookie = Cookies.get(import.meta.env.VITE_COOKIE_KEY)
        if (!cookie) {
            navigate("/login")
        }
    }, [navigate])

    const dashboardData = [
        {
            _id: "1",
            title: "Total Users",
            icon: <NotesIcon sx={{ color: "white" }} />,
            value: 45
        }, {
            _id: "2",
            title: "Total Users",
            icon: <NotesIcon sx={{ color: "white" }} />,
            value: 45
        }, {
            _id: "3",
            title: "Total Users",
            icon: <NotesIcon sx={{ color: "white" }} />,
            value: 45
        }
    ]
    return (
        <Grid container  >
            <Grid item xs="8" sx={{ paddingRight: "15px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    {
                        dashboardData.map(({ data }) => (
                            <Box key={data._id} sx={{ backgroundColor: "#59e3a7", padding: "5px 10px 15px 5px", borderRadius: "5px", flex: "1", boxShadow: "0px 0px 3px 0px #1b2e35" }}>
                                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                                    {data.icon}
                                    <Typography variant="span" sx={{ color: "white" }} >{data.title}</Typography>
                                </Box>
                                <Box sx={{ width: "60px", height: "60px", padding: "15px", fontSize: "20px", fontWeight: "semibold", backgroundColor: "white", borderRadius: "50%", textAlign: "center", margin: "10px auto 0 auto" }}>
                                    <Typography variant="span" >{data.value}</Typography>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Grid>
            <Grid item xs="4" >
                <Box >
                    <Card sx={{
                        backgroundColor: "#59e3a7",
                        borderRadius: "4px",
                        padding: "15px 15px 15px 15px",
                        boxShadow: "0px 0px 3px 0px #1b2e35"
                    }}  >
                        <Box sx={{ display: "flex", justifyContent: "space-between", color: "white" }}>
                            <Box>
                                <Typography variant="h1"
                                    sx={{
                                        fontSize: "45px",
                                        fontWeight: "bold"
                                    }}
                                >Masum Billah</Typography>
                                <Typography variant="h1"
                                    sx={{
                                        fontSize: "20px"
                                    }}
                                >masum184e@gmail.com</Typography>
                            </Box>
                            <Box sx={{
                                margin: "auto",
                                height: "85px",
                                width: "85px",
                                padding: "5px",
                                backgroundColor: "#59e3a7",
                                borderRadius: "50%",
                                border: "2px solid white",
                            }}>
                                <Avatar sx={{ width: "100%", height: "100%" }} alt="Hdy Baker" src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png" />
                            </Box>
                        </Box>
                        {/* <Typography sx={{ color: "gray", margin: "5px 0" }} variant="body1">At Thinkify, our mission is to provide a dynamic and intuitive platform that empowers individuals to transform their ideas into actionable tasks.</Typography> */}
                    </Card>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Dashboard