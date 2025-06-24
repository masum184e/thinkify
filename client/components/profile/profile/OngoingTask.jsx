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

const OngoingTask = () => {
  const [tasks, setTasks] = useState([]);
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
          `${import.meta.env.VITE_SERVER_ENDPOINT}/tasks?taskStatus=ongoing`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get(
                import.meta.env.VITE_TOKEN_KEY
              )}`,
            },
          }
        );
        if (response.data.status) {
          setTasks(response.data.tasks);
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
          Ongoing Task
        </Typography>
        <List>
          {tasks.map((task, index) => (
            <div key={task._id}>
              <ListItem sx={{ p: 0 }}>
                <ListItemText
                  primary={task.title}
                  secondary={`Deadline: ${new Date(
                    task.deadline
                  ).toLocaleDateString()}`}
                />
              </ListItem>
              {index < tasks.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default OngoingTask;
