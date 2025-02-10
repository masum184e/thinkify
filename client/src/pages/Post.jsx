import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  ThumbUp,
  Favorite,
  SentimentVeryDissatisfied,
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
  Print,
} from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import { marked } from "marked";
import DOMPurify from "dompurify";

const reactionsList = [
  { type: "like", icon: <ThumbUp />, color: "primary" },
  { type: "love", icon: <Favorite />, color: "error" },
  { type: "angry", icon: <SentimentVeryDissatisfied />, color: "warning" },
];

const Post = () => {
  const { postId } = useParams();
  const shareUrl = `https://thinkify.vercel.app/posts/${postId}`;
  const {
    setLoadingStatus,
    setAlertBoxOpenStatus,
    setAlertSeverity,
    setAlertMessage,
  } = useThinkify();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const renderMarkdown = (description) => {
    const html = marked(description);
    return { __html: DOMPurify.sanitize(html) };
  };
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
                comments: [
                  ...prevPost.comments,
                  {
                    comment: commentText,
                    userId: Cookies.get(import.meta.env.VITE_USER_KEY),
                    createdAt: new Date().toISOString(),
                  },
                ],
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
            setPost((prevPost) => {
              const authorizedUser = jwtDecode(
                Cookies.get(import.meta.env.VITE_TOKEN_KEY)
              ).userId;
              const userReaction = prevPost.reactions.find(
                (r) => r.reactor_id === authorizedUser
              );

              if (!userReaction) {
                return {
                  ...prevPost,
                  reactions: [
                    ...prevPost.reactions,
                    {
                      reactor_id: authorizedUser,
                      reaction: reactionType,
                    },
                  ],
                };
              } else if (userReaction.reaction === reactionType) {
                return {
                  ...prevPost,
                  reactions: prevPost.reactions.filter(
                    (r) => r.reactor_id !== authorizedUser
                  ),
                };
              } else {
                return {
                  ...prevPost,
                  reactions: prevPost.reactions.map((r) =>
                    r.reactor_id === authorizedUser
                      ? { ...r, reaction: reactionType }
                      : r
                  ),
                };
              }
            });

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

  const cardRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => cardRef.current,
    documentTitle: post?.title || "Post Print",
    removeAfterPrint: true,
    contentRef: cardRef,
  });

  return (
    <>
      <Card
        ref={cardRef}
        sx={{ maxWidth: 1280, margin: "20px auto", padding: 2 }}
      >
    {
      post?
      <CardContent>
      {post && (
        <Typography
          sx={{ color: "#1b2e35" }}
          variant="h3"
          fontWeight={"bold"}
          gutterBottom
        >
          {post.title}
        </Typography>
      )}
      <Typography variant="subtitle2" color="text.secondary">
        {post && `Author: ${post.author}`}
        {post &&
          post.createdAt !== null &&
          ` | ${new Date(post.createdAt).toLocaleString()}`}
      </Typography>

      {post && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ marginTop: 1 }}
          className="no-print"
        >
          <FacebookShareButton url={shareUrl} quote={post.title}>
            <Facebook
              sx={{ fontSize: 30, cursor: "pointer", color: "#1877F2" }}
            />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={post.title}>
            <Twitter
              sx={{ fontSize: 30, cursor: "pointer", color: "#1DA1F2" }}
            />
          </TwitterShareButton>

          <LinkedinShareButton
            url={shareUrl}
            title={post.title}
            source={shareUrl}
          >
            <LinkedIn
              sx={{ fontSize: 30, cursor: "pointer", color: "#0077B5" }}
            />
          </LinkedinShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={post.title}
            separator=" - "
          >
            <WhatsApp
              sx={{ fontSize: 30, cursor: "pointer", color: "#25D366" }}
            />
          </WhatsappShareButton>

          <Print
            onClick={handlePrint}
            sx={{ fontSize: 30, cursor: "pointer", color: "#333333" }}
          />
        </Stack>
      )}

      <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 1 }}>
        {post &&
          post.tags.map((tag, index) => (
            <Chip
              key={index}
              label={`#${tag}`}
              color="info"
              variant="outlined"
              sx={{
                cursor: "pointer",
                borderColor: "#1b2e35",
                color: "#1b2e35",
              }}
            />
          ))}
      </Stack>

      {post && (
        <Typography
          variant="body1"
          paragraph
          my={4}
          dangerouslySetInnerHTML={renderMarkdown(post.description)}
        />
      )}

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
            className="no-print"
          />
          <Button
            variant="contained"
            onClick={handleComment}
            className="no-print"
            sx={{ backgroundColor: "#1b2e35" }}
          >
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
                  <Typography variant="body2">
                    {comment.commenter}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      )}
    </CardContent>:
    <CardContent>
        <Box textAlign="center" mt={5}>
        <Typography variant="h4" color="#1b2e35">
          Post Not Available
        </Typography>
      </Box>
    </CardContent>
    }
      </Card>
    </>
  );
};

export default Post;
