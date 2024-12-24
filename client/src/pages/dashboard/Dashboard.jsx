import { Grid } from "@mui/material";
import LastMonthActivity from "../../../components/dashboard/LastMonthActivity";
import RoleCount from "../../../components/dashboard/RoleCount";

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <LastMonthActivity />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <RoleCount />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
