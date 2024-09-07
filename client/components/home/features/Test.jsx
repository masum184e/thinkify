import { Box, Grid, Typography } from "@mui/material";

const Test = () => {
  return (
    <Grid
      container
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} md={6} container data-aos="fade-up-left" >
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
            Practice Exams
          </Typography>
          <Typography variant="body1" color="#797979" marginTop="-10px">
            Test your knowledge anytime, anywhere.
          </Typography>
          <Typography variant="body1" color="#797979" marginTop="80px">
            Take advantage of our comprehensive online test system to assess
            your knowledge and track your progress. With a variety of practice
            exams and quizzes tailored to your curriculum, you can improve your
            skills and boost your confidence before the big test.
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
          src="/images/test.jpg"
          alt="Practice Exams"
        />
      </Grid>
    </Grid>
  );
};

export default Test;
