import { Box, Button, TextField, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { useForm } from "react-hook-form";

const AddProductFrom = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const file = watch("productimage");
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data);
    console.log(formData);
    console.log(data);
  };
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
                    ["image/jpeg", "image/png"].includes(value[0].type),
                },
              })}
            />
          </Box>
          <Box>
            {file && (
              <>
                <Box sx={{ position: "relative", display: "inline" }}>
                  <img
                    src={URL.createObjectURL(file[0])}
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
