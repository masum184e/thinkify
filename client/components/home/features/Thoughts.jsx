import { Box, Grid, Typography } from "@mui/material";

const Thoughts = () => {
  return (
    <Grid
      container
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} md={6} data-aos="fade-up-left">
        <img
          style={{
            width: "100%",
            borderRadius: "8px",
            objectFit: "cover",
          }}
          src="/images/thoughts.jpg"
          alt="Insight Exchange"
        />
      </Grid>
      <Grid item xs={12} md={6} container data-aos="fade-up-right">
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
            Insight Exchange
          </Typography>
          <Typography variant="body1" color="#797979" marginTop="-10px">
            Share your ideas and gain new perspectives.
          </Typography>
          <Typography variant="body1" color="#797979" marginTop="80px">
            Engage with a community of learners by sharing your insights and
            reading others’ thoughts. Our platform facilitates rich discussions
            and collaborative learning, helping you develop and refine your
            ideas through feedback and interaction
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Thoughts;
