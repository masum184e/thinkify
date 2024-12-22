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
import Cookies from "js-cookie";

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
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get(
                import.meta.env.VITE_TOKEN_KEY
              )}`,
            },
          }
        );
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
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/tasks`,
        { ...data, selectedDate },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(
              import.meta.env.VITE_TOKEN_KEY
            )}`,
          },
        }
      );

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

  const handleDrop = async (taskId, status) => {
    try {
      setLoadingStatus(true);
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/tasks/${taskId}/${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(
              import.meta.env.VITE_TOKEN_KEY
            )}`,
          },
        }
      );
      const updatedTasks = allTask.map((task) =>
        task._id === taskId ? { ...task, taskStatus: status } : task
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
  const handleDelete = async (taskId) => {
    try {
      setLoadingStatus(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(
              import.meta.env.VITE_TOKEN_KEY
            )}`,
          },
        }
      );
      if (response.data.status) {
        setAllTask(allTask.filter((item) => item._id !== taskId));
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
              <TaskStatus status="todo" onDrop={handleDrop} />
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
              <TaskStatus status="ongoing" onDrop={handleDrop} />
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
              <TaskStatus status="completed" onDrop={handleDrop} />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ minHeight: "70vh" }} spacing={3}>
          <Grid item xs>
            <List>
              {todo.map((item) => (
                <Task
                  key={item._id}
                  text={item.title}
                  taskId={item._id}
                  handleDelete={handleDelete}
                />
              ))}
            </List>
          </Grid>
          <Grid item xs>
            <List>
              {ongoing.map((item) => (
                <Task
                  key={item._id}
                  text={item.title}
                  taskId={item._id}
                  handleDelete={handleDelete}
                />
              ))}
            </List>
          </Grid>
          <Grid item xs>
            <List>
              {completed.map((item) => (
                <Task
                  key={item._id}
                  text={item.title}
                  taskId={item._id}
                  handleDelete={handleDelete}
                />
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
