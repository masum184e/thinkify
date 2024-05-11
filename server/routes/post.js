import express from 'express';
import { addPost, editPost, getAllPost, removePost } from '../controller/post.js';

const post = express.Router();

post.post("/", addPost);
post.get("/", getAllPost);
post.delete("/:postId", removePost);
post.patch("/:postId", editPost);

export default post