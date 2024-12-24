import { Box, Grid, Typography } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import LastMonthActivity from "../../../components/dashboard/LastMonthActivity";

const Dashboard = () => {
  const dashboardData = [
    {
      _id: "1",
      title: "Total Users",
      icon: <NotesIcon sx={{ color: "white" }} />,
      value: 45,
    },
    {
      _id: "2",
      title: "Active Users",
      icon: <NotesIcon sx={{ color: "white" }} />,
      value: 30,
    },
    {
      _id: "3",
      title: "New Users",
      icon: <NotesIcon sx={{ color: "white" }} />,
      value: 10,
    },
  ];

  return (
    <Grid container>
      <Grid item xs={6}>
        <LastMonthActivity />
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}
        >
          {dashboardData.map(({ _id, title, icon, value }) => (
            <Box
              key={_id}
              sx={{
                backgroundColor: "#59e3a7",
                padding: "5px 10px 15px 5px",
                borderRadius: "5px",
                flex: "1",
                boxShadow: "0px 0px 3px 0px #1b2e35",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                {icon}
                <Typography component="span" sx={{ color: "white" }}>
                  {title}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  padding: "15px",
                  fontSize: "20px",
                  fontWeight: 600,
                  backgroundColor: "white",
                  borderRadius: "50%",
                  textAlign: "center",
                  margin: "10px auto 0 auto",
                }}
              >
                <Typography component="span">{value}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
