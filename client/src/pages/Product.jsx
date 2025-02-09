import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useThinkify from "../hooks/useThinkify";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

const Product = () => {
  const { productId } = useParams();
  const {
    setLoadingStatus,
    setAlertBoxOpenStatus,
    setAlertSeverity,
    setAlertMessage,
  } = useThinkify();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingStatus(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/products/${productId}`
        );
        if (response.data.status) {
          setProduct(response.data.product);
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
  }, [
    productId,
    setAlertBoxOpenStatus,
    setAlertMessage,
    setAlertSeverity,
    setLoadingStatus,
  ]);

  return (
    <Container sx={{ maxWidth: 1280, margin: "20px auto", padding: 2 }}>
      {product ? (
        <Card>
          <CardMedia
            component="img"
            height="240"
            image={`${import.meta.env.VITE_SERVER_ENDPOINT}/productimage/${
              product.image
            }`}
            alt={product.title}
          />
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" component="div">
                {product.title}
              </Typography>
              <Box textAlign="right" color="text.secondary">
                <Typography>{product.authorName}</Typography>
                <Typography>{product.authorEmail}</Typography>
              </Box>
            </Box>
            <Typography variant="body1" color="text.secondary">
              {product.description}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ marginTop: 2, color: "#59e3a7" }}>
                Price: ${product.price}
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#59e3a7",
                  color: "white",
                  paddingLeft: "20px!important",
                  paddingRight: "20px!important",
                  "&:hover": { backgroundColor: "#59e3a7" },
                  fontWeight: "semibold",
                }}
                startIcon={<ShoppingCart />}
              >
                Buy
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" align="center">
          Product not found
        </Typography>
      )}
    </Container>
  );
};

export default Product;
