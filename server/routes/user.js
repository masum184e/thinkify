import express from 'express';
import { getUserData, logOut, login, registration } from '../controller/user.js';
import userAuthentication from '../middleware/userAuthentication.js';

const user = express.Router();

user.post("/registration", registration);
user.post("/login", login);
user.get("/profile", userAuthentication, getUserData);
user.get("/log-out", logOut);

export default user;