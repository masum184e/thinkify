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

const changePassword = [
  // validate fields and password strength
  check('oldPassword').notEmpty().withMessage('Old password is required'),
  check('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array()[0].msg });
      }

      const { oldPassword, newPassword } = req.body;

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
];

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

const getUserActivity = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    // Set duration for the past 365 days including today
    const days = 371;
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - (days - 1));

    // Initialize activity map for each day
    const activityMap = {};
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const key = date.toISOString().split("T")[0];
      activityMap[key] = 0;
    }

    const dateFilter = {
      createdAt: {
        $gte: startDate,
        $lte: today,
      },
    };

    const [
      posts,
      products,
      tasksCreated,
      updatedTasks,
      commentsAgg,
      reactionsAgg,
      userDoc,
    ] = await Promise.all([
      PostModel.find({ authorId: userId, ...dateFilter }, "createdAt"),
      ProductModel.find({ authorId: userId, ...dateFilter }, "createdAt"),
      TaskModel.find({ authorId: userId, ...dateFilter }, "createdAt"),
      TaskModel.find({
        authorId: userId,
        updatedAt: { $gte: startDate, $lte: today },
      }, "updatedAt"),
      PostModel.aggregate([
        { $unwind: "$comments" },
        {
          $match: {
            "comments.userId": userId,
            "comments.createdAt": {
              $gte: startDate,
              $lte: today,
            },
          },
        },
        {
          $project: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$comments.createdAt",
              },
            },
          },
        },
        {
          $group: {
            _id: "$date",
            count: { $sum: 1 },
          },
        },
      ]),
      PostModel.aggregate([
        { $unwind: "$reactions" },
        {
          $match: {
            "reactions.userId": userId,
            "reactions.createdAt": {
              $gte: startDate,
              $lte: today,
            },
          },
        },
        {
          $project: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$reactions.createdAt",
              },
            },
          },
        },
        {
          $group: {
            _id: "$date",
            count: { $sum: 1 },
          },
        },
      ]),
      UserModel.findById(userId),
    ]);

    // Count entries by their respective creation or update dates
    const countByDate = (docs, dateField = "createdAt") => {
      docs.forEach((doc) => {
        const key = doc[dateField].toISOString().split("T")[0];
        if (activityMap[key] !== undefined) activityMap[key]++;
      });
    };

    countByDate(posts);
    countByDate(products);
    countByDate(tasksCreated);
    countByDate(updatedTasks, "updatedAt");

    commentsAgg.forEach(({ _id, count }) => {
      if (activityMap[_id] !== undefined) activityMap[_id] += count;
    });

    reactionsAgg.forEach(({ _id, count }) => {
      if (activityMap[_id] !== undefined) activityMap[_id] += count;
    });

    // Include registration date as one activity
    if (userDoc) {
      const createdKey = userDoc.createdAt.toISOString().split("T")[0];
      if (activityMap[createdKey] !== undefined) activityMap[createdKey]++;
    }

    const userActivity = Object.entries(activityMap).map(([date, activity]) => ({
      date,
      activity,
    }));

    res
      .status(200)
      .json({ status: true, message: "Data Fetched Successfully", userActivity });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};


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

export { registration, login, getUserData, changePassword, getUsers, removeUser, getUserActivity }