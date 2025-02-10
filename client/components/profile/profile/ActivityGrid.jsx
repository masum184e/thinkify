import { Container, Grid, Card } from "@mui/material";

const generateActivityData = () => {
  const startDate = new Date(2024, 0, 1);
  const endDate = new Date(2024, 11, 31);
  const data = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    data.push({
      date: new Date(currentDate),
      activity: Math.floor(Math.random() * 5),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

const activityData = generateActivityData();

const ActivityGrid = () => {
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

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}  >
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
