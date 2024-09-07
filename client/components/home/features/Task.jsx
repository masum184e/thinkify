import { Box, Grid, Typography } from "@mui/material";

const Task = () => {
  return (
    <Grid
      container
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} md={6} container data-aos="fade-up-left"  >
        <Box
          sx={{
            marginLeft: "auto",
            textAlign: "left",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1b2e35" }}
          >
            Smart Task Organizer
          </Typography>
          <Typography variant="body1" color="#797979" marginTop="-10px">
            Stay on top of your assignments and deadlines.
          </Typography>
          <Typography variant="body1" color="#797979" marginTop="80px">
            Efficiently manage your workload with our task management tool. Set
            deadlines, create to-do lists, and get reminders to ensure you never
            miss a due date. Stay organized and keep track of your progress to
            achieve your academic goals with ease.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} data-aos="fade-up-right" >
        <img
          style={{
            width: "100%",
            borderRadius: "8px",
            objectFit: "cover",
          }}
          src="/images/task.jpg"
          alt="Smart Task Organizer"
        />
      </Grid>
    </Grid>
  );
};

export default Task;
