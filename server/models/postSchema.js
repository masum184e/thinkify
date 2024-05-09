import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: [],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post
