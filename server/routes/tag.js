import express from 'express';
import { addTag, editTag, getAllTag, removeTag } from '../controller/tag.js';

const tag = express.Router();

tag.post("/", addTag);
tag.get("/", getAllTag);
tag.delete("/:tagId", removeTag);
tag.patch("/:tagId", editTag);

export default tag;