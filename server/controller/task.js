import TaskModel from "../models/taskSchema.js";

const addTask = async (req, res) => {
    try {
        const { title, description, priority, selectedDate } = req.body;
        const authorId = req.user._id.toString();

        if (!title || !description || !priority || !selectedDate || isNaN(Date.parse(selectedDate))) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        const newTask = await TaskModel({
            title,
            description,
            priority,
            deadline: selectedDate,
            authorId,
            createdAt: new Date(),
            taskStatus: "todo"
        })
        const savedTask = await newTask.save();
        if (savedTask) {
            return res.status(201).json({ status: true, message: "Task created successfully" });
        } else {
            return res.status(500).json({ status: false, message: "Something Went Wrong" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const removeTask = async (req, res) => {
    try {

        const authorId = req.user._id.toString();
        const { taskId } = req.params;
        const task = await TaskModel.findOne({ authorId, _id: taskId });
        if (!task) {
            return res.status(404).json({ status: false, message: "Task not found" });
        }
        
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        if (deletedTask) {
            return res.status(200).json({ status: true, message: "Task Deleted Successfully" });
        } else {
            return res.status(500).json({ status: false, message: "Something Went Wrong" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }

}

const editTask = async (req, res) => {
    try {

        const authorId = req.user._id.toString();
        const { taskId, taskStatus } = req.params;
        const updatedTask = await TaskModel.findOneAndUpdate({ authorId, _id: taskId }, { $set: { taskStatus, updatedAt: new Date(), } }, { new: true });
        if (updatedTask.taskStatus === taskStatus) {
            res.status(200).json({ status: true, message: "Task Status Updated Successfully" });
        } else {
            return res.status(500).json({ status: false, message: "Something Went Wrong" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const getAllTask = async (req, res) => {
    try {
        const { taskStatus } = req.query;
        const authorId = req.user._id.toString();

        const filter = { authorId };
        if (taskStatus) {
            filter.taskStatus = taskStatus;
        }

        const tasks = await TaskModel.find(filter);
        res.status(200).json({ status: true, message: "Data Fetched Successfully", tasks });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

export { addTask, removeTask, editTask, getAllTask };