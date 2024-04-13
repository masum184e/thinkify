import { Box, Grid, TextField, Typography, Stack, Chip } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const Banner = () => {
    return (
        <>
            <Grid minHeight="90vh" maxWidth="1280px" mx="auto" container spacing={2} justifyContent="center" alignItems="center" >
                <Grid item xs={6} >
                    <Box sx={{ display: "flex", gap: "5px", color: "#1b2e35" }}  >
                        <ConnectWithoutContactIcon />
                        <Typography variant="body1" >Connecting Ideas, Inspiring Perspectives</Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: "Platypi",
                            color: "#59e3a7"
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
                        <Chip label="primary" sx={{ backgroundColor: "#59e3a7", color: "#1b2e35" }} />
                        <Chip label="success" sx={{ backgroundColor: "#59e3a7", color: "#1b2e35" }} />
                        <Chip label="primary" sx={{ backgroundColor: "#59e3a7", color: "#1b2e35" }} />
                        <Chip label="success" sx={{ backgroundColor: "#59e3a7", color: "#1b2e35" }} />
                        <Chip label="primary" sx={{ backgroundColor: "#59e3a7", color: "#1b2e35" }} />
                        <Chip label="success" sx={{ backgroundColor: "#59e3a7", color: "#1b2e35" }} />
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