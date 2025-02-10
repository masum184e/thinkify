import { Box, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useThinkify from "../../hooks/useThinkify";

const Users = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const {
    setLoadingStatus,
    setAlertBoxOpenStatus,
    setAlertMessage,
    setAlertSeverity,
  } = useThinkify();

  const handleDelete = async (userId) => {
    try {
      setLoadingStatus(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(
              import.meta.env.VITE_TOKEN_KEY
            )}`,
          },
        }
      );
      if (response.data.status) {
        setData((prevData) => prevData.filter((item) => item._id !== userId));
        setAlertBoxOpenStatus(true);
        setAlertSeverity("success");
        setAlertMessage(response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setAlertBoxOpenStatus(true);
      setAlertSeverity("error");
      setAlertMessage(
        error.response?.data?.message || "Failed to delete user."
      );
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingStatus(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/users`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get(
                import.meta.env.VITE_TOKEN_KEY
              )}`,
            },
            params: { query: search.trim() },
          }
        );
        if (response.data.status) {
          setData(response.data.users);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        setAlertBoxOpenStatus(true);
        setAlertSeverity("error");
        setAlertMessage(error.message || "Failed to fetch users.");
      } finally {
        setLoadingStatus(false);
      }
    };
    fetchData();
  }, [search]);

  if (!data.length) {
    return (
      <>
        <Box sx={{ width: "97%", margin: 2 }}>
          <TextField
            fullWidth
            label="Search Users"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Box>
          <Typography
            variant="h1"
            textAlign="center"
            color="#1b2e35"
            component="h1"
          >
            No User Available
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box sx={{ width: "97%", margin: 2 }}>
        <TextField
          fullWidth
          label="Search Users"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          height: "88vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="users table">
            <TableHead sx={{ backgroundColor: "#59e3a7" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  #
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Role
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Link
                      style={{ color: "inherit" }}
                      to={`/users/${item._id}`}
                    >
                      {item.fullName}
                    </Link>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <EditIcon sx={{ cursor: "pointer" }} />
                      <DeleteIcon
                        sx={{ cursor: "pointer" }}
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
    </>
  );
};

export default Users;
