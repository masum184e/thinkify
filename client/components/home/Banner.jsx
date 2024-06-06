import { Box, Grid, TextField, Typography, Stack, Chip } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const Banner = () => {
    return (
        <>
            <Grid minHeight="92vh" maxWidth="1280px" mx="auto" container spacing={2} justifyContent="center" alignItems="center" >
                <Grid item xs={6} >
                    <Box sx={{ display: "flex", gap: "5px", color: "#797979" }}  >
                        <ConnectWithoutContactIcon />
                        <Typography variant="body1" >Connecting Ideas, Inspiring Perspectives</Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: "Platypi",
                            color: "#1b2e35",
                            margin: "5px 0 30px 0"
                        }}
                        variant="h1"
                        component="h1"
                    >Thinkify</Typography>
                    <Typography sx={{ color: "#797979" }} variant="body1">At Thinkify, our mission is to provide a dynamic and intuitive platform that empowers individuals to transform their ideas into actionable tasks.</Typography>
                    <Box sx={{ margin: "30px 0 35px 0" }}>
                        <form action="" method="post" >
                            <TextField
                                placeholder="Search Here ..."
                                sx={{
                                    width: '75%',
                                }}

                            />
                        </form>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Chip label="vr-gaming" sx={{ backgroundColor: "#1b2e35", color: "white", cursor: "pointer" }} />
                        <Chip label="blockchain" sx={{ backgroundColor: "#1b2e35", color: "white", cursor: "pointer" }} />
                        <Chip label="crypto-currency" sx={{ backgroundColor: "#1b2e35", color: "white", cursor: "pointer" }} />
                        <Chip label="machine-learning" sx={{ backgroundColor: "#1b2e35", color: "white", cursor: "pointer" }} />
                        <Chip label="cyber-security" sx={{ backgroundColor: "#1b2e35", color: "white", cursor: "pointer" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <img style={{ width: "100%" }} src="/images/banner.jpg" alt="Thinkify" />
                </Grid>
            </Grid>
        </>
    )
}

export default Banner