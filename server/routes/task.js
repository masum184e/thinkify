import express from 'express';
import { addTask, editTask, getAllTask, removeTask } from '../controller/task.js';
import userAuthentication from '../middleware/userAuthentication.js';

const task = express.Router();

task.post("/", userAuthentication, addTask);
task.get("/", userAuthentication, getAllTask);
task.delete("/:taskId", removeTask);
task.patch("/:taskId", editTask);

export default task;