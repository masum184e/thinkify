import {Grid } from "@mui/material";
import ChangePassword from "../../components/setting/ChangePassword";

const Setting = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} sm={4} item>
        <ChangePassword />
      </Grid>
      <Grid xs={12} sm={4} item></Grid>
      <Grid xs={12} sm={4} item></Grid>
    </Grid>
  );
};

export default Setting;
