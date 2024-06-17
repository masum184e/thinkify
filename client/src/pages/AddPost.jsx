import { Box, TextField, Button, Chip } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import ClearIcon from "@mui/icons-material/Clear";

import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from "react";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AddPost = () => {
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const cookie = Cookies.get(import.meta.env.VITE_COOKIE_KEY);
    if (!cookie) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box sx={{ flex: "1" }}>
            <Box>
              <label
                htmlFor=""
                style={{ fontSize: "25px", fontWeight: "bold" }}
              >
                Title
              </label>
              <TextField
                placeholder="Enter Post Title"
                fullWidth
                {...register("title", { required: true })}
              />
            </Box>
            <Box>
              <label
                htmlFor=""
                style={{ fontSize: "25px", fontWeight: "bold" }}
              >
                Tags
              </label>
              <Box
                sx={{
                  border: "1px solid lightgray",
                  padding: "7px",
                  borderRadius: "5px",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center", // Align items vertically in flex container
                }}
              >
                <Chip
                  label="blockchain"
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: "#1b2e35",
                    color: "white",
                    borderRadius: "25px",
                    fontSize: "13px",
                    padding: "5px",
                    "& .MuiChip-deleteIcon": {
                      color: "white",
                      marginLeft: "px",
                    },
                  }}
                  onDelete={() => {}}
                />

                <InputBase
                  sx={{
                    outline: "none",
                    borderBottom: " 1px solid #1b2e35",
                    padding: "1px 10px 0 10px",
                    "&::placeholder": {
                      color: "#1b2e35",
                    },
                  }}
                  placeholder="Enter Your Tag"
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: "1" }}>
            <Box>
              <label
                htmlFor=""
                style={{ fontSize: "25px", fontWeight: "bold" }}
              >
                Title
              </label>
              <SimpleMdeReact value={description} setValue={setDescription} />
            </Box>
          </Box>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            color: "white",
            backgroundColor: "#1b2e35",
            "&:hover": { backgroundColor: "#1b2e35" },
          }}
        >
          Post
        </Button>
      </form>
    </Box>
  );
};

export default AddPost;
