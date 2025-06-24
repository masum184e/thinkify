import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useThinkify from "../../../src/hooks/useThinkify";

const LatestProduct = () => {
  const [products, setProducts] = useState([]);
  const {
    setAlertBoxOpenStatus,
    setAlertMessage,
    setAlertSeverity,
    setLoadingStatus
  } = useThinkify();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingStatus(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_ENDPOINT
          }/products?limit=5&sort=createdAt`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get(
                import.meta.env.VITE_TOKEN_KEY
              )}`,
            },
          }
        );
        if (response.data.status) {
          setProducts(response.data.products);
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
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Latest Products
        </Typography>
        <List>
          {products.map((product, index) => (
            <div key={product._id}>
              <ListItem sx={{ p: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    alt={product.title}
                    src={`${
                      import.meta.env.VITE_SERVER_ENDPOINT
                    }/productimage/${product.image}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.title}
                  secondary={`Price: $${product.price}`}
                />
              </ListItem>
              {index < products.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default LatestProduct;
