import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Membership = () => {
  const pacage = [
    {
      icon: <img src="./icons/rocket.svg" style={{ width: "60px" }} />,
      title: "Starter Pack",
      text: "Affordable services to kickstart your journey.",
    },
    {
      icon: <img src="./icons/vip.svg" style={{ width: "60px" }} />,
      title: "Pro Bundle",
      text: "Advanced features for growing your business.",
    },
    {
      icon: <img src="./icons/diamond.svg" style={{ width: "60px" }} />,
      title: "Elite Suite",
      text: "Premium solutions for ultimate success and scale.",
    },
  ];
  return (
    <Box maxWidth="1280px" mx="auto" py={10}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box flex="1">
          <Typography
            variant="h6"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "#1b2e35",
            }}
          >
            How we work
          </Typography>
          <Typography variant="h4" component="h2" color="#797979">
            Get some premium services at a fraction of the cost.
          </Typography>
        </Box>
        <Box flex="1">
          <Typography variant="body1" color="#797979">
            Unlock premium services tailored to your needs at unbeatable prices!
            Whether you{"'"}re just starting out or looking to scale, our
            packages offer the perfect blend of affordability and value.
          </Typography>
          <Link to="/subscription">
            <Button
              variant="contained"
              sx={{
                marginTop: "30px",
                backgroundColor: "#50cb95",
                color: "white",
                fontWeight: "bold",
                padding: "8px 16px",
                "&:hover": { backgroundColor: "#45b584" },
              }}
            >
              See Pricing
            </Button>
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mt: 8,
        }}
      >
        {pacage.map((item, index) => (
          <Box key={index} sx={{ textAlign: "center" }}>
            {item.icon}
            <Typography
              variant="h5"
              component="h3"
              color="#1b2e35"
              textTransform="uppercase"
              fontWeight="bold"
              marginTop="10px"
            >
              {item.title}
            </Typography>
            <Typography variant="body2" color="#797979">
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Membership;
