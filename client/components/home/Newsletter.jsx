import { Box, Typography, TextField, Button } from "@mui/material";

const Newsletter = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem",
        backgroundColor: "#1b2e35",
        borderRadius: "5px",
        maxWidth: "1280px",
        margin: "2rem auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ marginRight: "2rem" }}>
        <Typography variant="h4" component="h1" gutterBottom color="white">
          Subscribe to our Newsletter
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "1.5rem", color: "#797979" }}
        >
          Stay updated with the latest trends, insights, and highlights. Enter
          your email and never miss out on exciting news.
        </Typography>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <TextField
            placeholder="Enter your email address"
            fullWidth
            sx={{
              backgroundColor: "transparent",
              "& .MuiInputBase-input": {
                padding: "10px",
                background: "white",
                borderRadius: "5px",
              },
            }}
          />
          <Button
            sx={{
              backgroundColor: "#50cb95",
              color: "white",
              "&:hover": { backgroundColor: "#50cb95" },
              padding: "0 15px",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Newsletter;
