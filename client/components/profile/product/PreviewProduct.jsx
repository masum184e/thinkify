import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const PreviewProduct = () => {
  const { watch } = useFormContext();
  const productImage = watch("productimage");

  let productImageUrl = null;
  if (productImage && productImage[0] && productImage[0] instanceof File) {
    try {
      productImageUrl = URL.createObjectURL(productImage[0]);
    } catch (error) {
      console.error("Error creating object URL:", error);
    }
  }

  return (
    <Box sx={{ marginX: 2 }}>
      <Typography
        variant="h2"
        sx={{ fontSize: "30px", fontWeight: "thin", color: "#8db4a3" }}
      >
        {watch("title") ||
        productImageUrl ||
        watch("price") ||
        watch("description")
          ? "Preview"
          : ""}
      </Typography>
      <Box
        sx={{
          padding: "5px 0px",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "40px", fontWeight: "700", color: "#1b2e35" }}
        >
          {watch("title")}
        </Typography>
        {productImageUrl && (
          <>
            <img
              style={{
                border: "1px solid lightgray",
                borderRadius: "5px",
              }}
              width="100%"
              height="200px"
              src={productImageUrl}
              alt=""
            />
          </>
        )}
        {watch("price") && (
          <>
            <Typography
              variant="h3"
              sx={{ fontSize: "30px", color: "#1b2e35" }}
            >
              Price:{" "}
              <span style={{ fontWeight: "bold", color: "#1b2e35" }}>
                ${watch("price")}
              </span>
            </Typography>
          </>
        )}

        <Typography
          variant="body1"
          sx={{ color: "#797979", textAlign: "justify" }}
        >
          {watch("description")}
        </Typography>
      </Box>
    </Box>
  );
};

export default PreviewProduct;
