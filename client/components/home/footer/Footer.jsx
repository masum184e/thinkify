import { Grid, Typography, Box, Divider, Button } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1b2e35', color: 'white', paddingTop: '4rem', paddingBottom: '1rem' }}>
      <Box maxWidth="1280px" mx="auto">
        <Grid container>
          <Grid item>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <img src="./images/favicon.ico" width="55" alt="Thinkify" />
              <Typography
                sx={{
                  fontFamily: "Platypi",
                  color: "#59e3a7"
                }}
                variant="h3"
                component="h3"
              >Thinkify</Typography>
            </Box>
            <Typography variant="body1" >Connecting Ideas, Inspiring Perspectives</Typography>
          </Grid>
        </Grid>
        <Grid container my={6}>
          <Grid item>
            <Typography variant="subtitle1" fontWeight="bold">Solutions</Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>Control</li>
              <li>Scalability & Efficiency</li>
              <li>Supported by Experts</li>
              <li>Performance & Security</li>
            </ul>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" fontWeight="bold">Products</Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>Integrated Platform</li>
              <li>Payroll</li>
              <li>Human Resources</li>
              <li>Workforce Management</li>
              <li>Recruiting & Onboarding</li>
            </ul>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" fontWeight="bold">Resources</Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>Case Studies</li>
              <li>Blog</li>
            </ul>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" fontWeight="bold">Company</Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>About Us</li>
              <li>Careers</li>
              <li>Newsroom</li>
              <li>Contact Us</li>
            </ul>
          </Grid>
          <Grid item>
            <Box>
              <Typography>1-800-600-0464</Typography>
              <Typography fontWeight="bold" color="#000dff">support@thinkify.com</Typography>
              <Typography>900-140 10th Avenue SE</Typography>
              <Typography>Calgary, AB TG 0R1</Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: '1rem' }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Copyright 2023 ZenTalk. All rights reserved</Typography>
          <Box>
            <Button sx={{ color: "#59e3a7" }}>Privacy Policy</Button>
            <Button sx={{ color: "#59e3a7" }}>Terms of Services</Button>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
