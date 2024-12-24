import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import useThinkify from "../../src/hooks/useThinkify";
import { Typography } from "@mui/material";

const RoleCount = () => {
  const [countData, setCountData] = useState([]);
  const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

  const {
    setLoadingStatus,
    setAlertBoxOpenStatus,
    setAlertMessage,
    setAlertSeverity,
  } = useThinkify();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingStatus(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/admin/users/role-count`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get(
                import.meta.env.VITE_TOKEN_KEY
              )}`,
            },
          }
        );
        if (response.data.status) {
          setCountData(response.data.roleCounts);
        } else {
          setAlertBoxOpenStatus(true);
          setAlertSeverity("error");
          setAlertMessage(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAlertBoxOpenStatus(true);
        setAlertSeverity("error");
        setAlertMessage(error.response?.data?.message || error.message);
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
        Distribution of Users
      </Typography>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={countData}
            dataKey="count"
            nameKey="role"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ role, count }) => `${role}: ${count}`}
          >
            {countData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoleCount;
