import { Grid, Box, List, Fab, Modal } from "@mui/material";
import TaskStatus from "../../components/profile/task-management/TaskStatus";
import Task from "../../components/profile/task-management/Task";

import AddIcon from "@mui/icons-material/Add";
import AddTask from "../../components/profile/task-management/AddTask";
import { useEffect, useState } from "react";
import axios from "axios";
import useThinkify from "../hooks/useThinkify";
import dayjs from "dayjs";
import { useForm, FormProvider } from "react-hook-form";

const TaskManager = () => {
  const [allTask, setAllTask] = useState([]);
  const [todo, setTodo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const {
    setLoadingStatus,
    setAlertBoxOpenStatus,
    setAlertMessage,
    setAlertSeverity,
  } = useThinkify();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
          url: "/tasks",
          method: "GET",
          withCredentials: true,
        });
        if (response.data.status) {
          setAllTask(response.data.tasks);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setTodo(allTask.filter((task) => task.taskStatus === "todo"));
    setOngoing(allTask.filter((task) => task.taskStatus === "ongoing"));
    setCompleted(allTask.filter((task) => task.taskStatus === "completed"));
  }, [allTask]);
  const onSubmit = async (data) => {
    try {
      setLoadingStatus(true);

      const response = await axios({
        baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
        url: "/tasks",
        withCredentials: true,
        method: "POST",
        data: {
          ...data,
          selectedDate,
        },
      });
      setAllTask((prevTasks) => [
        ...prevTasks,
        { ...data, selectedDate, taskStatus: "todo" },
      ]);
      if (response.data.status) {
        setOpenModal(false);
        methods.reset();
        setSelectedDate(dayjs());
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
  const handleDropTodo = async (taskId) => {
    try {
      setLoadingStatus(true);
      const response = await axios({
        baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
        url: `/tasks/${taskId}/todo`,
        withCredentials: true,
        method: "PATCH",
      });
      const updatedTasks = allTask.map((task) =>
        task._id === taskId ? { ...task, taskStatus: "todo" } : task
      );
      setAllTask(updatedTasks);
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
  const handleDropOngoing = async (taskId) => {
    try {
      setLoadingStatus(true);
      const response = await axios({
        baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
        url: `/tasks/${taskId}/ongoing`,
        withCredentials: true,
        method: "PATCH",
      });
      const updatedTasks = allTask.map((task) =>
        task._id === taskId ? { ...task, taskStatus: "ongoing" } : task
      );
      setAllTask(updatedTasks);
      setAllTask(updatedTasks);
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
  const handleDropCompleted = async (taskId) => {
    try {
      setLoadingStatus(true);
      const response = await axios({
        baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
        url: `/tasks/${taskId}/completed`,
        withCredentials: true,
        method: "PATCH",
      });
      const updatedTasks = allTask.map((task) =>
        task._id === taskId ? { ...task, taskStatus: "completed" } : task
      );
      setAllTask(updatedTasks);
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
      <Box sx={{ position: "relative" }}>
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
          onClick={() => setOpenModal(!openModal)}
        >
          <AddIcon />
        </Fab>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <AddTask
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                />
              </form>
            </FormProvider>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default TaskManager;
