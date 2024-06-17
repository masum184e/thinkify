import { Grid, Box, List, Fab } from "@mui/material";
import TaskStatus from "../../components/profile/task-management/TaskStatus";
import Task from "../../components/profile/task-management/Task";

import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AddTask from "../../components/profile/task-management/AddTask";

const TaskManager = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleDropTodo = () => {
    console.log("Handle Drop Clicked");
  };
  const handleDropOngoing = () => {
    console.log("Handle Drop On Going Clicked");
  };
  const handleDropCompleted = () => {
    console.log("Handle Drop Completed Clicked");
  };
  const todo = [
    {
      _id: "1",
      title: "Hello",
    },
  ];
  const ongoing = [
    {
      _id: "1",
      title: "Hello",
    },
  ];
  const completed = [
    {
      _id: "1",
      title: "Hello",
    },
  ];
  useEffect(() => {
    const cookie = Cookies.get(import.meta.env.VITE_COOKIE_KEY);
    if (!cookie) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <Box sx={{ position: "relative" }}>
        {/* <Typography variant="h2" textAlign="center" sx={{ mb: "16px", fontWeight: "bold" }}>Coordination of Work</Typography> */}
        <Grid container spacing={3}>
          <Grid item xs>
            <Box
              sx={{
                borderRadius: "5px",
                p: 2,
                backgroundColor: "#59e3a7",
              }}
            >
              <TaskStatus status="todo" onDrop={handleDropTodo} />
            </Box>
          </Grid>
          <Grid item xs>
            <Box
              sx={{
                borderRadius: "5px",
                p: 2,
                backgroundColor: "#00844b",
              }}
            >
              <TaskStatus status="ongoing" onDrop={handleDropOngoing} />
            </Box>
          </Grid>
          <Grid item xs>
            <Box
              sx={{
                borderRadius: "5px",
                p: 2,
                backgroundColor: "#28483a",
              }}
            >
              <TaskStatus status="completed" onDrop={handleDropCompleted} />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ minHeight: "70vh" }} spacing={3}>
          <Grid item xs>
            <List>
              {todo.map((item) => (
                <Task key={item._id} text={item.title} taskId={item._id} />
              ))}
            </List>
          </Grid>
          <Grid item xs>
            <List>
              {ongoing.map((item) => (
                <Task key={item._id} text={item.title} taskId={item._id} />
              ))}
            </List>
          </Grid>
          <Grid item xs>
            <List>
              {completed.map((item) => (
                <Task key={item._id} text={item.title} taskId={item._id} />
              ))}
            </List>
          </Grid>
        </Grid>

        <Fab
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: "50px",
            right: "70px",
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#59e3a7",
            color: "white",
            "&:hover": { backgroundColor: "#59e3a7" },
          }}
          onClick={()=>setOpenModal(!openModal)}
        >
          <AddIcon />
        </Fab>
        <AddTask openModal={openModal} setOpenModal={setOpenModal} />
      </Box>
    </>
  );
};

export default TaskManager;
