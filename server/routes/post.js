import express from 'express';
import { addComment, addPost, addReaction, editPost, getAllPost, getSinglePost, handleVisibility, removePost } from '../controller/post.js';
import userAuthentication from '../middleware/userAuthentication.js';

const post = express.Router();

// CREATE DATA
post.post("/", userAuthentication, addPost);

// CREATE UTITLITY
post.post("/:postId/comment", userAuthentication, addComment);
post.post("/:postId/reaction", userAuthentication, addReaction);

// READ DATA
post.get("/", userAuthentication, getAllPost);
post.get("/:postId", getSinglePost);

// REMOVE DATA
post.delete("/:postId",userAuthentication, removePost);

// UPDATE DATA
post.patch("/change-visibility/:postId", userAuthentication, handleVisibility);
post.patch("/:postId",userAuthentication, editPost);

export default post