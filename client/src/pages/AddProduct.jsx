import { Box } from "@mui/material";

import AddProductFrom from "../../components/profile/product/AddProductFrom";
import PreviewProduct from "../../components/profile/product/PreviewProduct";

import { useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const cookie = Cookies.get(import.meta.env.VITE_COOKIE_KEY)
    if (!cookie) {
      navigate("/login")
    }
  }, [navigate])
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 1 }}>
        <AddProductFrom />
      </Box>
      <Box sx={{ flex: 1 }}>
        <PreviewProduct />
      </Box>
    </Box>
  );
};

export default AddProduct;
