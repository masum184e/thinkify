import { Box, Card, Typography, Avatar } from "@mui/material";
import PropTypes from 'prop-types';

const ProfileCardDetails = ({ data }) => {
  return (
    <Box>
      <Card
        sx={{
          backgroundColor: "#59e3a7",
          borderRadius: "4px",
          padding: "15px 15px 15px 15px",
          boxShadow: "0px 0px 3px 0px #1b2e35",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: "45px",
                fontWeight: "bold",
              }}
            >
              {data?.fullName}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: "20px",
              }}
            >
              {data?.email}
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              height: "85px",
              width: "85px",
              padding: "5px",
              backgroundColor: "#59e3a7",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          >
            <Avatar
              sx={{ width: "100%", height: "100%" }}
              alt={data?.fullName}
              src={data?.image || "https://cdn-icons-png.flaticon.com/512/5556/5556468.png"}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

ProfileCardDetails.propTypes = {
  data: PropTypes.object
}

export default ProfileCardDetails;
