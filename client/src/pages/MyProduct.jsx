import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useThinkify from "../hooks/useThinkify";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const MyProduct = () => {
  const [data, setData] = useState([]);
  const {
    setLoadingStatus,
    setAlertBoxOpenStatus,
    setAlertMessage,
    setAlertSeverity,
  } = useThinkify();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingStatus(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/products`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get(
                import.meta.env.VITE_TOKEN_KEY
              )}`,
            },
          }
        );
        if (response.data.status) {
          setData(response.data.products);
        } else {
          setAlertBoxOpenStatus(true);
          setAlertSeverity("error");
          setAlertMessage(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAlertBoxOpenStatus(true);
        setAlertSeverity("error");
        setAlertMessage(
          error.response?.data?.message || "Something Went Wrong"
        );
      } finally {
        setLoadingStatus(false);
      }
    };
    fetchData();
  }, []);

  if (data.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" color="#1b2e35">
          No Product Available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "88vh",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Grid container spacing={3} paddingBottom={5}>
        {data.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Link
              to={`/products/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${
                    import.meta.env.VITE_SERVER_ENDPOINT
                  }/productimage/${product.image}`}
                  alt={product.title}
                />
                <CardContent
                  sx={{
                    paddingBottom: "12px !important",
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" color="#59e3a7">
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="#59e3a7"
                    >
                      ${product.price}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyProduct;
