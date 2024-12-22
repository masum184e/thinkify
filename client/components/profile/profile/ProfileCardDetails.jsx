import { Box, Card, Typography, Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useThinkify from "../../../src/hooks/useThinkify";

const ProfileCardDetails = () => {
  const [data, setData] = useState([]);
  const { setAlertBoxOpenStatus, setAlertMessage, setAlertSeverity } =
    useThinkify();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get(
                import.meta.env.VITE_TOKEN_KEY
              )}`,
            },
          }
        );
        if (response.data.status) {
          setData(response.data.user);
        } else {
          console.log(response.data);
          setAlertBoxOpenStatus(true);
          setAlertSeverity("error");
          setAlertMessage(response.data.message);
        }
      } catch (error) {
        console.log(error);
        setAlertBoxOpenStatus(true);
        setAlertSeverity("error");
        setAlertMessage("Something Went Wrong");
        // server error message with status code
        error.response.data.message
          ? setAlertMessage(error.response.data.message)
          : setAlertMessage(error.message);
      }
    };

    fetchData();
  }, []);
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
              {data.fullName}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: "20px",
              }}
            >
              {data.email}
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
              alt="Hdy Baker"
              src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileCardDetails;
