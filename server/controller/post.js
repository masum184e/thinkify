import PostModel from "../models/postSchema.js";

const addPost = async (req, res) => {
    try {
        const { title, tags, description } = req.body;
        const authorId = req.user._id.toString();

        if (!title || !tags.length || !description) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        const newPost = await PostModel({
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
    try {

        const postId = req.params.postId;
        const authorId = req.user._id.toString();
        const post = await PostModel.findOne({ _id: postId, authorId });
        if (!post) {
            return res.status(404).json({ status: false, message: "Post not found" });
        }

        const deletedPost = await PostModel.findByIdAndDelete(postId);
        if (deletedPost) {
            return res.status(200).json({ status: true, message: "Post Deleted Successfully" });
        } else {
            return res.status(500).json({ status: false, message: "Something Went Wrong" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const editPost = async (req, res) => {

}

const getAllPost = async (req, res) => {
    try {

        const authorId = req.user._id.toString();
        const posts = await PostModel.find({ authorId });
        res.status(200).json({ status: true, message: "Data Fetched Successfully", posts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const getSinglePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await PostModel.findById(postId)
            .populate("authorId", "fullName")
        // .populate("comments.userId", "fullName")
        // .populate("reactions.userId", "fullName")

        // console.log(post);

        if (!post) {
            return res.status(404).json({ status: false, message: "Post not found" });
        }
        return res.status(200).json({ status: true, message: "Data Fetched Successfully", post });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { comment } = req.body;
        const userId = req.user._id.toString();

        if (!comment) {
            return res.status(400).json({ status: false, message: "Comment is required" });
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ status: false, message: "Post not found" });
        }

        const existingComment = post.comments.find(comment => comment.userId.toString() === userId.toString());

        if (existingComment) {
            return res.status(400).json({ status: false, message: "You have already commented on this post" });
        }

        post.comments.push({ userId, comment });
        const updatedPost = await post.save();
        if (updatedPost) {
            return res.status(201).json({ status: true, message: "Comment added successfully" });
        } else {
            return res.status(500).json({ status: false, message: "Something Went Wrong" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const addReaction = async (req, res) => {
    try {
        const { postId } = req.params;
        const { reactionType } = req.body;
        const userId = req.user._id.toString();

        if (!reactionType) {
            return res.status(400).json({ status: false, message: "Reaction is required" });
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ status: false, message: "Post not found" });
        }

        const existingReaction = post.reactions.find(reaction => reaction.userId.toString() === userId.toString());
        if (existingReaction) {
            if (existingReaction.reaction === reactionType) {
                post.reactions = post.reactions.filter(reaction => reaction.userId.toString() !== userId.toString());
                await post.save();
                return res.status(201).json({ status: true, message: "Reaction updated successfully" });
            } else {
                existingReaction.reaction = reactionType;
                const updatedPost = await post.save();
                if (updatedPost) {
                    return res.status(201).json({ status: true, message: "Reaction updated successfully" });
                } else {
                    return res.status(500).json({ status: false, message: "Something Went Wrong" });
                }
            }
        }

        post.reactions.push({ userId, reaction: reactionType });
        const updatedPost = await post.save();
        if (updatedPost) {
            return res.status(201).json({ status: true, message: "Reaction added successfully" });
        } else {
            return res.status(500).json({ status: false, message: "Something Went Wrong" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

export { addPost, removePost, editPost, getAllPost, getSinglePost, addComment, addReaction };