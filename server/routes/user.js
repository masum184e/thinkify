import express from 'express';
import { getUserData, login, registration, changePassword } from '../controller/user.js';
import userAuthentication from '../middleware/userAuthentication.js';

const user = express.Router();

user.post("/registration", registration);
user.post("/login", login);
user.get("/profile", userAuthentication, getUserData);
user.put("/change-password", userAuthentication, changePassword);
// user.get("/log-out", logOut);

export default user;