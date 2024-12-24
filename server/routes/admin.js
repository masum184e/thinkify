import express from 'express';
import { getLastMonthNewUsersCount, getUserData, logOut, login, userList } from '../controller/admin.js';
import adminAuthentication from '../middleware/adminAuthentication.js';

const admin = express.Router();

admin.post("/login", login);
admin.get("/profile", adminAuthentication, getUserData);
admin.get("/log-out", logOut);
admin.get("/users", adminAuthentication, userList);
admin.get("/users/last-month-count", adminAuthentication, getLastMonthNewUsersCount);

export default admin;