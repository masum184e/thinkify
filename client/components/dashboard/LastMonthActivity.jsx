import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";
import axios from "axios";
import Cookies from "js-cookie";
import { Typography } from "@mui/material";
import useThinkify from "../../src/hooks/useThinkify";

const LastMonthActivity = () => {
  const [countData, setCountData] = useState([]);
  const {
    setLoadingStatus,
    setAlertBoxOpenStatus,
    setAlertMessage,
    setAlertSeverity,
  } = useThinkify();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_ENDPOINT
          }/admin/users/last-month-count`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get(
                import.meta.env.VITE_TOKEN_KEY
              )}`,
            },
          }
        );
        if (response.data.status) {
          setCountData(response.data.userCount);
        } else {
          setLoadingStatus(false);
          setAlertBoxOpenStatus(true);
          setAlertSeverity(response.data.status ? "success" : "error");
          setAlertMessage(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingStatus(false);
        setAlertBoxOpenStatus(true);
        setAlertSeverity("error");
        setAlertMessage("Something Went Wrong");
        error.response.data.message
          ? setAlertMessage(error.response.data.message)
          : setAlertMessage(error.message);
      } finally {
        setLoadingStatus(false);
      }
    };

    fetchData();
  }, []);

  if (!countData.length) {
    return <p>No Data Found</p>;
  }

  return (
    <div>
      <Typography
        variant="h6"
        sx={{ m: "0", textAlign: "center", color: "inherit" }}
      >
        Last Month User Activity
      </Typography>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={600}
          height={300}
          data={countData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LastMonthActivity;
