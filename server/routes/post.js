import express from 'express';
import { addComment, addPost, addReaction, editPost, getAllPost, getSinglePost, removePost } from '../controller/post.js';
import userAuthentication from '../middleware/userAuthentication.js';

const post = express.Router();

post.post("/", userAuthentication, addPost);
post.post("/:postId/comment", userAuthentication, addComment);
post.post("/:postId/reaction", userAuthentication, addReaction);
post.get("/", userAuthentication, getAllPost);
post.get("/:postId", getSinglePost);
post.delete("/:postId",userAuthentication, removePost);
post.patch("/:postId",userAuthentication, editPost);

export default post