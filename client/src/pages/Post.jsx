import { useParams } from "react-router-dom";
import {
  ThumbUp,
  Favorite,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  TextField,
  Avatar,
  Box,
  Stack,
} from "@mui/material";
import useThinkify from "../hooks/useThinkify";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import Cookies from "js-cookie";

const reactionsList = [
  { type: "like", icon: <ThumbUp />, color: "primary" },
  { type: "love", icon: <Favorite />, color: "secondary" },
  { type: "angry", icon: <SentimentVeryDissatisfied />, color: "error" },
];

const Post = () => {
  const { postId } = useParams();
  const {
    setLoadingStatus,
    setAlertBoxOpenStatus,
    setAlertSeverity,
    setAlertMessage,
  } = useThinkify();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoadingStatus(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/posts/${postId}`
        );
        if (response.data.status) {
          setPost(response.data.post);
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

  const handleComment = async () => {
    if (commentText.trim()) {
      const fetchData = async () => {
        setLoadingStatus(true);
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_ENDPOINT}/posts/${postId}/comment`,
            {
              comment: commentText,
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get(
                  import.meta.env.VITE_TOKEN_KEY
                )}`,
              },
            }
          );
          if (response.data.status) {
            setPost((prevPost) => {
              return {
                ...prevPost,
                comments: [...prevPost.comments, {
                  comment: commentText,
                  userId: Cookies.get(import.meta.env.VITE_USER_KEY),
                  createdAt: new Date().toISOString(),
                }],
              };
            });
            setCommentText("");
            setAlertBoxOpenStatus(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
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
    } else {
      setAlertBoxOpenStatus(true);
      setAlertSeverity("error");
      setAlertMessage("Comment Required");
    }
  };

  const handleReact = async (reactionType) => {
    if (reactionsList.find((reaction) => reaction.type === reactionType)) {
      const fetchData = async () => {
        setLoadingStatus(true);
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_ENDPOINT}/posts/${postId}/reaction`,
            {
              reactionType: reactionType,
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get(
                  import.meta.env.VITE_TOKEN_KEY
                )}`,
              },
            }
          );
          if (response.data.status) {

            // IMPLEMENT REALTIME REACTION UPDATE

            setAlertBoxOpenStatus(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
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
    } else {
      setAlertBoxOpenStatus(true);
      setAlertSeverity("error");
      setAlertMessage("Reaction Required");
    }
    
  };

  return (
    <>
      <NavBar />
      <Card sx={{ maxWidth: 1280, margin: "20px auto", padding: 2 }}>
        <CardContent>
          {post && (
            <Typography sx={{ color: "#1b2e35" }} variant="h5" gutterBottom>
              {post.title}
            </Typography>
          )}
          <Typography variant="subtitle2" color="text.secondary">
            {post && `Author: ${post.authorId.fullName}`}
            {post &&
              post.createdAt !== null &&
              ` | ${new Date(post.createdAt).toLocaleString()}`}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 1 }}>
            {post &&
              post.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={`#${tag}`}
                  color="info"
                  variant="outlined"
                  sx={{ cursor: "pointer" }}
                />
              ))}
          </Stack>

          <Typography variant="body1" paragraph my={4}>
            {post && post.description}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {post &&
              reactionsList.map((reaction) => (
                <Button
                  key={reaction.type}
                  variant="contained"
                  color={reaction.color}
                  startIcon={reaction.icon}
                  onClick={() => handleReact(reaction.type)}
                >
                  {
                    post.reactions.filter((r) => r.reaction === reaction.type)
                      .length
                  }
                </Button>
              ))}
          </Stack>

          {post && (
            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" onClick={handleComment}>
                Comment
              </Button>

              {post.comments.length > 0 &&
                post.comments.map((comment, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mt: 2 }}
                  >
                    <Avatar sx={{ mr: 2 }}>{comment.userId}</Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {comment.comment}
                      </Typography>
                      <Typography variant="body2">{comment.userId}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(comment.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
          )}
        </CardContent>
      </Card>
      <Footer />
    </>
  );
};

export default Post;
