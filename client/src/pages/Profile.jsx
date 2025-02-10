import { Box, Grid, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArticleIcon from "@mui/icons-material/Article";
import TaskIcon from "@mui/icons-material/Task";

import ProfileCardDetails from "../../components/profile/profile/ProfileCardDetails";
import ActivityGrid from "../../components/profile/profile/ActivityGrid";

const Profile = () => {
  return (
  <>
    <Grid container spacing={2}>
      <Grid xs={12} sm={6} item>
        <Box
          sx={{
            display: "flex",
            mb: "10px",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Box
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
              <ArticleIcon sx={{ color: "white" }} />
              <Typography variant="span" sx={{ color: "white" }}>
                Total Post
              </Typography>
            </Box>
            <Box
              sx={{
                width: "60px",
                height: "60px",
                padding: "15px",
                fontSize: "20px",
                fontWeight: "semibold",
                backgroundColor: "white",
                borderRadius: "50%",
                textAlign: "center",
                margin: "10px auto 0 auto",
              }}
            >
              <Typography variant="span">45</Typography>
            </Box>
          </Box>
          <Box
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
              <TaskIcon sx={{ color: "white" }} />
              <Typography variant="span" sx={{ color: "white" }}>
                Ongoing Task
              </Typography>
            </Box>
            <Box
              sx={{
                width: "60px",
                height: "60px",
                padding: "15px",
                fontSize: "20px",
                fontWeight: "semibold",
                backgroundColor: "white",
                borderRadius: "50%",
                textAlign: "center",
                margin: "10px auto 0 auto",
              }}
            >
              <Typography variant="span">45</Typography>
            </Box>
          </Box>
          <Box
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
              <ShoppingCartIcon sx={{ color: "white" }} />
              <Typography variant="span" sx={{ color: "white" }}>
                Total Product
              </Typography>
            </Box>
            <Box
              sx={{
                width: "60px",
                height: "60px",
                padding: "15px",
                fontSize: "20px",
                fontWeight: "semibold",
                backgroundColor: "white",
                borderRadius: "50%",
                textAlign: "center",
                margin: "10px auto 0 auto",
              }}
            >
              <Typography variant="span">45</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} sm={6} item>
        <ProfileCardDetails />
      </Grid>
    </Grid>

    <ActivityGrid />
  
  </>
  );
};

export default Profile;
