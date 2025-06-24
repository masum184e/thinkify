import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useThinkify from "../../../src/hooks/useThinkify";

const RecentPost = () => {
  const [posts, setPosts] = useState([]);
  const {
    setAlertBoxOpenStatus,
    setAlertMessage,
    setAlertSeverity,
    setLoadingStatus,
  } = useThinkify();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingStatus(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_ENDPOINT
          }/posts?limit=5&sort=createdAt`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get(
                import.meta.env.VITE_TOKEN_KEY
              )}`,
            },
          }
        );
        if (response.data.status) {
          setPosts(response.data.posts);
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
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Posts
        </Typography>
        <List>
          {posts.map((post, index) => (
            <div key={post._id}>
              <ListItem sx={{ p: 0 }}>
                <ListItemText
                  primary={post.title.slice(0, 40)}
                  secondary={`Posted on: ${new Date(
                    post.createdAt
                  ).toLocaleDateString()}`}
                />
              </ListItem>
              {index < posts.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentPost;
