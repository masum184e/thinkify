import express from 'express';
import { addPost, editPost, getAllPost, removePost } from '../controller/post.js';
import userAuthentication from '../middleware/userAuthentication.js';

const post = express.Router();

post.post("/", userAuthentication, addPost);
post.get("/", getAllPost);
post.delete("/:postId", removePost);
post.patch("/:postId", editPost);

export default post