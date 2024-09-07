import { Box } from "@mui/material";

import AddProductFrom from "../../components/profile/product/AddProductFrom";
import PreviewProduct from "../../components/profile/product/PreviewProduct";

import { useForm, FormProvider } from "react-hook-form";

const AddProduct = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <AddProductFrom />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PreviewProduct />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default AddProduct;
