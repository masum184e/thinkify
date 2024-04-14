import { Box, Grid, TextField, Typography, Stack, Chip } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const Banner = () => {
    return (
        <>
            <Grid minHeight="90vh" maxWidth="1280px" mx="auto" container spacing={2} justifyContent="center" alignItems="center" >
                <Grid item xs={6} >
                    <Box sx={{ display: "flex", gap: "5px", color: "#797979" }}  >
                        <ConnectWithoutContactIcon />
                        <Typography variant="body1" >Connecting Ideas, Inspiring Perspectives</Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: "Platypi",
                            color: "#1b2e35"
                        }}
                        variant="h1"
                        component="h1"
                    >Thinkify</Typography>
                    <Box mb={4} mt={6}>
                        <form action="" method="post" >
                            <TextField
                                placeholder="Search Here ..."
                                sx={{
                                    width: '75%'
                                }}

                            />
                        </form>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Chip label="vr-gaming" sx={{ backgroundColor: "#1b2e35", color: "white" }} />
                        <Chip label="blockchain" sx={{ backgroundColor: "#1b2e35", color: "white" }} />
                        <Chip label="crypto-currency" sx={{ backgroundColor: "#1b2e35", color: "white" }} />
                        <Chip label="machine-learning" sx={{ backgroundColor: "#1b2e35", color: "white" }} />
                        <Chip label="cyber-security" sx={{ backgroundColor: "#1b2e35", color: "white" }} />
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