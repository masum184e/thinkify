import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import UserModel from "../models/userSchema.js"
import PostModel from '../models/postSchema.js';
import ProductModel from '../models/productSchema.js';
import TaskModel from '../models/taskSchema.js';

const registration = [
    check('fullName').matches(/^[a-zA-Z ]+$/).withMessage('Only alphabets and at least one space are allowed'),
    check('email').isEmail().withMessage('Enter a Valid Email'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one digit'),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: false, message: errors.array()[0].msg });
            }

            const { fullName, email, password } = req.body;
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ status: false, message: "User already exists" });
            }

            const bcryptSaltRounds = parseInt(process.env.BCRYPT_GEN_SALT_NUMBER);
            const bcryptSalt = await bcrypt.genSalt(bcryptSaltRounds);
            const hashPassword = await bcrypt.hash(password, bcryptSalt);

            const userData = new UserModel({
                fullName,
                email,
                password: hashPassword,
                createdAt: new Date(),
                role: "user"
            });
            const savedUser = await userData.save();
            if (savedUser) {
                const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.COOKIE_EXPIRES });
                // const expires = new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRES)) * 24 * 60 * 60 * 1000);
                // res.cookie(process.env.COOKIE_KEY, token, {
                //     httpOnly: false,
                //     secure: true,
                //     sameSite: 'none',
                //     expires
                // }).status(200).json({ status: true, message: "Registration Successful" });
                res.json({ status: true, message: "Registration Successful", token, user: savedUser });
            } else {
                res.status(500).json({ status: false, message: "Something Went Wrong" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    }
];

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ status: false, message: "Invalid Email or User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ status: false, message: "Wrong Password" });
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.COOKIE_EXPIRES });
        // const expires = new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRES)) * 24 * 60 * 60 * 1000);
        // res.cookie(process.env.COOKIE_KEY, token, {
        //     httpOnly: false,
        //     secure: true,
        //     sameSite: 'none',
        //     expires
        // }).status(200).json({ status: true, message: "Login Successful" });
        res.status(200).json({ status: true, message: "Login Successful", token, user: existingUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}


const getUserData = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalPosts = await PostModel.countDocuments({ authorId: userId });
        const totalProducts = await ProductModel.countDocuments({ authorId: userId });
        const ongoingTasks = await TaskModel.countDocuments({ authorId: userId, taskStatus: 'ongoing' });

        const user = req.user.toObject();
        user.totalPosts = totalPosts;
        user.totalProducts = totalProducts;
        user.ongoingTasks = ongoingTasks;

        res.status(200).json({ status: true, message: "Data Fetched Successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

// const logOut = async (req, res) => {
//     try {
//         res.clearCookie(process.env.COOKIE_KEY, {
//             httpOnly: false,
//             secure: true,
//             sameSite: 'none'
//         });

//         res.status(200).json({ status: true, message: "Logout Successful" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: "Internal Server Error" });
//     }

// }

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        const existingUser = await UserModel.findById(req.user._id);
        if (!existingUser) {
            return res.status(401).json({ status: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ status: false, message: "Wrong Password" });
        }

        const bcryptSaltRounds = parseInt(process.env.BCRYPT_GEN_SALT_NUMBER);
        const bcryptSalt = await bcrypt.genSalt(bcryptSaltRounds);
        const hashPassword = await bcrypt.hash(newPassword, bcryptSalt);

        const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, { password: hashPassword }, { new: true });
        if (updatedUser) {
            res.status(200).json({ status: true, message: "Password Changed Successfully" });
        } else {
            res.status(500).json({ status: false, message: "Something Went Wrong" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const getUsers = async (req, res) => {
    try {

        const { query } = req.query;
        let users = null;

        if (query) {
            users = await UserModel.find({
                $or: [
                    { fullName: { $regex: query, $options: "i" } },
                    { email: { $regex: query, $options: "i" } }
                ]
            });
        } else {
            users = await UserModel.find();
        }

        res.status(200).json({ status: true, message: "Data Fetched Successfully", users });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const removeUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const removedUser = await UserModel.findByIdAndDelete(userId);
        if (removedUser) {
            return res.status(200).json({ status: true, message: "User Deleted Successfully" });
        } else {
            return res.status(500).json({ status: false, message: "Something Went Wrong" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }

}

export { registration, login, getUserData, changePassword, getUsers, removeUser }