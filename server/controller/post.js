import Post from "../models/postSchema.js";

const addPost = async (req, res) => {
    try {
        const { title, tags, description } = req.body;
        const authorId = req.user._id.toString();

        if (!title || !tags.length || !description) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        const newPost = await Post({
            title,
            tags,
            description,
            authorId,
            createdAt: new Date(),
        })
        const savedPost = await newPost.save();
        if (savedPost) {
            return res.status(201).json({ status: true, message: "Post created successfully" });
        } else {
            return res.status(500).json({ status: false, message: "Something Went Wrong" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }

}

const removePost = async (req, res) => {

}

const editPost = async (req, res) => {

}

const getAllPost = async (req, res) => {
    try {

        const authorId = req.user._id.toString();
        const posts = await Post.find({ authorId });
        res.status(200).json({ status: true, message: "Data Fetched Successfully", posts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

export { addPost, removePost, editPost, getAllPost };