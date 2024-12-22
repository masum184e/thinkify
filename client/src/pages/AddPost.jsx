import {
  Box,
  TextField,
  Button,
  InputBase,
  Chip,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";

import SimpleMdeReact from "react-simplemde-editor";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "easymde/dist/easymde.min.css";
import useThinkify from "../hooks/useThinkify";
import axios from "axios";
import Cookies from "js-cookie";

const AddPost = () => {
  const {
    setLoadingStatus,
    setAlertBoxOpenStatus,
    setAlertMessage,
    setAlertSeverity,
  } = useThinkify();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm();
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && tag.trim() !== "") {
      event.preventDefault();
      if (!tags.includes(tag.trim())) {
        setTags([...tags, tag.trim()]);
      }
      setTag("");
      clearErrors("tags");
    }
  };
  
  

  const renderMarkdown = () => {
    const html = marked(description);
    return { __html: DOMPurify.sanitize(html) };
  };

  const handleRemoveTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
  };

  const onSubmit = async (data) => {
    if (tags.length === 0) {
      setError("tags", {
        type: "manual",
        message: "At least one tag is required",
      });
      return;
    }
    const trimmedDescription = description.trim();
    if (trimmedDescription.length === 0) {
      setError("description", {
        type: "manual",
        message: "Description is required",
      });
      return;
    }

    try {
      setLoadingStatus(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/posts`,
        {
          title: data.title,
          tags,
          description: trimmedDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(import.meta.env.VITE_TOKEN_KEY)}`,
          },
        }
      );
      
      if (response.data.status) {
        reset();
        setTags([]);
        setDescription("");
      }
      setLoadingStatus(false);
      setAlertBoxOpenStatus(true);
      setAlertSeverity(response.data.status ? "success" : "error");
      setAlertMessage(response.data.message);
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

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box sx={{ flex: "1" }}>
              <Box>
                <label
                  htmlFor="title"
                  style={{ fontSize: "25px", fontWeight: "bold" }}
                >
                  Title
                </label>
                <TextField
                  placeholder="Enter Post Title"
                  fullWidth
                  {...register("title", { required: "Title is required" })}
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ""}
                />
              </Box>

              <Box>
                <label
                  htmlFor="tags"
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
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {tags.map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
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
                        },
                      }}
                      onDelete={() => handleRemoveTag(index)}
                    />
                  ))}

                  <InputBase
                    sx={{
                      outline: "none",
                      borderBottom: "1px solid #1b2e35",
                      padding: "1px 10px 0 10px",
                      "& input::placeholder": {
                        color: "#1b2e35",
                        opacity: "0.8",
                      },
                    }}
                    placeholder="Enter Your Tag"
                    value={tag}
                    onChange={(event) => setTag(event.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </Box>
                {errors.tags && (
                  <Typography color="error" variant="body2">
                    {errors.tags.message}
                  </Typography>
                )}
              </Box>

              <div dangerouslySetInnerHTML={renderMarkdown()} />
            </Box>

            <Box sx={{ flex: "1" }}>
              <Box>
                <label
                  htmlFor="description"
                  style={{ fontSize: "25px", fontWeight: "bold" }}
                >
                  Description
                </label>
                <SimpleMdeReact
                  id="description"
                  value={description}
                  onChange={setDescription}
                />
              </Box>
              {errors.description && (
                <Typography color="error" variant="body2">
                  {errors.description.message}
                </Typography>
              )}
            </Box>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              color: "white",
              backgroundColor: "#59e3a7",
              "&:hover": { backgroundColor: "#59e3a7" },
            }}
          >
            Post
          </Button>
        </form>
      </Box>
    </>
  );
};

export default AddPost;
