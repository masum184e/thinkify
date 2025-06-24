import { Container, Grid, Card } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useThinkify from "../../../src/hooks/useThinkify";

const ActivityGrid = () => {
  const [activityData, setActivityData] = useState([]);
  const {
    setAlertBoxOpenStatus,
    setAlertMessage,
    setAlertSeverity,
    setLoadingStatus,
  } = useThinkify();
  const weeks = [];
  let week = [];

  activityData.forEach((day) => {
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
  });

  if (week.length > 0) weeks.push(week);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let lastMonth = -1;

  useEffect(() => {
    const fetchData = async () => {
      setLoadingStatus(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/users/activity`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get(
                import.meta.env.VITE_TOKEN_KEY
              )}`,
            },
          }
        );
        if (response.data.status) {
          const formattedData = response.data.userActivity.map((entry) => ({
            date: new Date(entry.date),
            activity: entry.activity,
          })).sort((a, b) => a.date - b.date);
          setActivityData(formattedData);
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
    console.log(activityData);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ margin: "30px auto" }}>
      <Grid container spacing={1} wrap="nowrap" alignItems="flex-start">
        <Grid
          item
          container
          sx={{
            margin: "20px 0 0 0",
            paddingLeft: "0px",
            paddingTop: "0px",
            width: "auto",
          }}
          flexDirection="column"
        >
          {dayNames.map((dayName, index) => (
            <Grid
              item
              key={index}
              sx={{
                width: 15,
                height: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span style={{ fontSize: "10px", lineHeight: "0" }}>
                {dayName}
              </span>
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          container
          direction="row"
          wrap="nowrap"
          alignItems="flex-start"
        >
          {weeks.map((week, weekIndex) => {
            const firstDayOfWeek = week[0];
            const currentMonth = firstDayOfWeek.date.getMonth();
            const isNewMonth = lastMonth !== currentMonth;
            lastMonth = currentMonth;

            return (
              <Grid
                item
                key={weekIndex}
                container
                direction="column"
                sx={{ margin: "0 5px 0 0", padding: "0", width: "auto" }}
              >
                {isNewMonth ? (
                  <span
                    style={{
                      textAlign: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    {monthNames[currentMonth]}
                  </span>
                ) : (
                  <div style={{ height: "15px", marginBottom: "5px" }} />
                )}
                {week.map((day, dayIndex) => (
                  <Grid item key={dayIndex}>
                    <Card
                      sx={{
                        width: 15,
                        height: 15,
                        cursor: "pointer",
                        marginBottom: "5px",
                        backgroundColor:
                          day.activity === 0
                            ? "#EBEDF0"
                            : `rgba(0, 128, 0, ${day.activity / 5})`,
                      }}
                      title={`${day.date.toDateString()}: ${
                        day.activity
                      } contributions`}
                    />
                  </Grid>
                ))}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActivityGrid;
