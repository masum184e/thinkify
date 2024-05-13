import express from 'express';
import post from './post.js';
import tag from './tag.js';
import user from './user.js';
import admin from './admin.js';


const router = express.Router();

router.use("/posts",post);
router.use("/tags",tag);
router.use("/users",user);
router.use("/admin",admin)

export default router;