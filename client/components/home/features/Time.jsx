import { Box, Grid, Typography } from "@mui/material";

const Time = () => {
  return (
    <Grid
      container
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} md={6} data-aos="fade-up-left" >
        <img
          style={{
            width: "100%",
            borderRadius: "8px",
            objectFit: "cover",
          }}
          src="/images/time.jpg"
          alt="Time Master"
        />
      </Grid>
      <Grid item xs={12} md={6} container data-aos="fade-up-left" >
        <Box
          sx={{
            marginLeft: "auto",
            textAlign: "right",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1b2e35" }}
          >
            Time Master
          </Typography>
          <Typography variant="body1" color="#797979" marginTop="-10px">
            Optimize your study schedule and maximize productivity
          </Typography>
          <Typography variant="body1" color="#797979" marginTop="80px">
            Enhance your productivity with our time management tools designed
            specifically for students. Create personalized study plans, set time
            blocks for different tasks, and monitor your time usage to ensure
            you{"'"}re making the most out of every study session.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Time;
