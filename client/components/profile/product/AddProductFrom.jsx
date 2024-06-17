import { Box, Button, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext } from "react-hook-form";

const AddProductFrom = () => {
  const { register, handleSubmit, setValue, watch } = useFormContext();
  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.productimage && data.productimage[0] instanceof File) {
      formData.append("file", data.productimage[0]);
    }
    console.log(formData);
    console.log(data);
  };

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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TextField
            label="Product Title"
            placeholder="Enter Product Title"
            fullWidth
            sx={{ marginBottom: 1 }}
            {...register("title", {
              required: "Product title is required",
            })}
          />
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#59e3a7",
                marginBottom: 1,
              }}
              fullWidth
              onClick={() => {
                document.getElementById("productimage").click();
              }}
            >
              Upload Images
            </Button>
            <input
              id="productimage"
              style={{ display: "none" }}
              type="file"
              {...register("productimage", {
                required: "File is required",
                validate: {
                  validFileType: (value) =>
                    value &&
                    value.length > 0 &&
                    ["image/jpeg", "image/png"].includes(value[0].type),
                },
              })}
            />
          </Box>
          <Box>
            {productImageUrl && (
              <>
                <Box sx={{ position: "relative", display: "inline" }}>
                  <img
                    src={productImageUrl}
                    alt=""
                    width="100"
                    height="50"
                    style={{ border: "1px solid #59e3a7", borderRadius: "5px" }}
                  />
                  <IconButton
                    aria-label="delete"
                    sx={{
                      position: "absolute",
                      right: "-10px",
                      zIndex: "500",
                      bottom: "0",
                      color: "red",
                    }}
                    onClick={() => setValue("productimage", null)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </>
            )}
          </Box>

          <TextField
            label="Product Price"
            placeholder="Enter Product Price"
            fullWidth
            {...register("price", {
              required: "Product price is required",
            })}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            sx={{ marginY: 1 }}
            {...register("description", {
              required: "Description is required",
            })}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#59e3a7" }}
            type="submit"
          >
            Add
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddProductFrom;
