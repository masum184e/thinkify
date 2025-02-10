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
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reactions: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            reaction: {
                type: String,
                required: true
            }, createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;
