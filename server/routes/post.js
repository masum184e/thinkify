import express from 'express';
import { addPost, editPost, getAllPost, removePost } from '../controller/post.js';
import userAuthentication from '../middleware/userAuthentication.js';

const post = express.Router();

post.post("/", userAuthentication, addPost);
post.get("/", userAuthentication, getAllPost);
post.delete("/:postId",userAuthentication, removePost);
post.patch("/:postId",userAuthentication, editPost);

export default post