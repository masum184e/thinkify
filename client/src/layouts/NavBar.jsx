import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  ButtonGroup,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import AlertBox from '../../components/common/AlertBox';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../context/themeContext';
import { useTheme } from '@mui/material/styles';

export default function NavBar({ forceLoginText = false }) {
  const cookie = Cookies.get("thinkify");
  const { toggleTheme } = useThemeContext();
  const theme = useTheme();


    const isLoggedIn = cookie && !forceLoginText;

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          borderBottom: "1px solid #59e3a7",
          padding: "5px 0"
        }}
        elevation={0}
      >
        <Toolbar>
          <Box
            sx={{
              maxWidth: "1280px",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              {/* Left: Logo and Brand */}
              <Link
                to="/"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img src="./images/favicon.ico" width="55" alt="Thinkify" />
                  <Typography
                    sx={{
                      fontFamily: "Platypi",
                      color: "#1b2e35"
                    }}
                    variant="h3"
                    component="h3"
                  >
                    Thinkify
                  </Typography>
                </Box>
              </Link>

              {/* Right: Auth Buttons and Toggle */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {!isLoggedIn ?(
                  <ButtonGroup>
                    <Link to="/registration">
                      <Button
                        sx={{
                          backgroundColor: "#1b2e35",
                          color: "white",
                          "&:hover": { backgroundColor: "#1b2e35" }
                        }}
                      >
                        Join
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button
                        sx={{
                          backgroundColor: "#1b2e35",
                          color: "white",
                          "&:hover": { backgroundColor: "#1b2e35" }
                        }}
                      >
                        Login
                      </Button>
                    </Link>
                  </ButtonGroup>
                ) : (
                  <ButtonGroup>
                    <Link to="/login">
                      <Button
                        sx={{
                          backgroundColor: "#1b2e35",
                          color: "white",
                          "&:hover": { backgroundColor: "#1b2e35" }
                        }}
                      >
                        LoggedIn
                      </Button>
                    </Link>
                  </ButtonGroup>
                )}

                <IconButton onClick={toggleTheme} color="inherit"   sx={{
    color: theme.palette.mode === "light" ? "#000" : "#fff"
  }}>
                  {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4/>}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <AlertBox />
    </Box>
  );
}
