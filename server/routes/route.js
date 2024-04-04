import express from 'express';
import post from './post.js';
import tag from './tag.js';
import user from './user.js';


const router = express.Router();

router.use("/posts",post);
router.use("/tags",tag);
router.use("/users",user);

export default router;