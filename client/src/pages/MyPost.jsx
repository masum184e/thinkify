import { Box, Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import useThinkify from "../hooks/useThinkify";

const MyPost = () => {
  const [data, setData] = useState([]);
  const {
    setLoadingStatus,
    setAlertBoxOpenStatus,
    setAlertMessage,
    setAlertSeverity,
  } = useThinkify();
  useEffect(() => {
    const fetchData = async () => {
      setLoadingStatus(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/posts`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get(
                import.meta.env.VITE_TOKEN_KEY
              )}`,
            },
          }
        );
        if (response.data.status) {
          setData(response.data.posts);
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
  if (data.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" color="#1b2e35">
          No Post Available
        </Typography>
      </Box>
    );
  }
  const handleDelete = async (postId) => {
    try {
      setLoadingStatus(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(
              import.meta.env.VITE_TOKEN_KEY
            )}`,
          },
        }
      );
      if (response.data.status) {
        setData(data.filter((item) => item._id !== postId));
        setAlertBoxOpenStatus(true);
        setAlertSeverity("success");
        setAlertMessage(response.data.message);
      } else {
        setLoadingStatus(false);
        console.log(response.data);
        setAlertBoxOpenStatus(true);
        setAlertSeverity("error");
        setAlertMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoadingStatus(false);
      setAlertBoxOpenStatus(true);
      setAlertSeverity("error");
      setAlertMessage("Something Went Wrong");
      // server error message with status code
      error.response.data.message
        ? setAlertMessage(error.response.data.message)
        : setAlertMessage(error.message);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "620px",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#59e3a7", position: "sticky" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Title
              </TableCell>
              {/* <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Like
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Dislike
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Comment
              </TableCell> */}
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Visibility
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link style={{ color: "inherit" }} to={`/posts/${item._id}`}>
                    {item.title}
                  </Link>
                </TableCell>
                {/* <TableCell>{item.likes ? item.likes : "0"}</TableCell> */}
                {/* <TableCell>{item.dislikes ? item.dislikes : "0"}</TableCell> */}
                {/* <TableCell>{item.comments ? item.comments : "0"}</TableCell> */}
                <TableCell>
                  <VisibilityOffIcon />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                  >
                    <EditIcon
                      sx={{
                        border: "1px solid lightgray",
                        borderRadius: "5px",
                        padding: "5px",
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                    />
                    <DeleteIcon
                      sx={{
                        border: "1px solid lightgray",
                        borderRadius: "5px",
                        padding: "5px",
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(item._id)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyPost;
