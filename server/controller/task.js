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

}

const editTask = async (req, res) => {

}

const getAllTask = async (req, res) => {

}

export { addTask, removeTask, editTask, getAllTask };