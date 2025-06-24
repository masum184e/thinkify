import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Moderate', 'High', 'Critical'],
        required: true,
    },
    taskStatus: {
        type: String,
        enum: ['todo', 'ongoing', 'completed'],
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
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const TaskModel = mongoose.model('Task', taskSchema);

export default TaskModel;