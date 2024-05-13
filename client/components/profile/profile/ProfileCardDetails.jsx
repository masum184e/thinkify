import { Box, Card, Typography, Avatar } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ProfileCardDetails = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
                    url: "/users/profile",
                    withCredentials: true,
                    method: "GET",
                });
                if (response.data.status) {
                    setData(response.data.user)
                } else {
                    console.log(response.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])
    return (
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
                        >{data.fullName}</Typography>
                        <Typography variant="h1"
                            sx={{
                                fontSize: "20px"
                            }}
                        >{data.email}</Typography>
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
    )
}

export default ProfileCardDetails