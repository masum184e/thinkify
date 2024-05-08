import { Box } from "@mui/material";

import AddProductFrom from "../../components/profile/product/AddProductFrom";
import PreviewProduct from "../../components/profile/product/PreviewProduct";

const AddProduct = () => {
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
