import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import UserModel from "../models/userSchema.js"

const registration = [
    check('fullName').matches(/^[a-zA-Z ]+$/).withMessage('Only alphabets and at least one space are allowed'),
    check('email').isEmail().withMessage('Enter a Valid Email'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one digit'),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ "status": false, "message": errors.array()[0].msg });
            }

            const { fullName, email, password } = req.body;
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).send({ "status": false, "message": "User already exists" });
            }

            const bcryptSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_GEN_SALT_NUMBER));
            const hashPassword = await bcrypt.hash(password, bcryptSalt);

            const userData = new UserModel({
                fullName,
                email,
                password: hashPassword,
                createdAt: new Date(),
                role: "user"
            })
            const savedUser = await userData.save();
            if (savedUser) {

                const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES });
                res.cookie(process.env.EXPRESSJS_COMPLETE_AUTHENTICATION_TOKEN_COOKIE_KEY, token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                }).status(200).send({ "status": true, "message": "Registration Successfull" })

            } else {
                res.status(500).send({ "status": false, "message": "Something Went Wrong" });
            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ "status": false, "message": error.message });
        }
    }
];

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {

            const existingUser = await UserModel.findOne({ email });
            if (!existingUser || existingUser.role !== "user") {
                return res.status(401).send({ "status": false, "message": "Invalid Email" });
            }

            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (isMatch) {

                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES });
                res.cookie(process.env.EXPRESSJS_COMPLETE_AUTHENTICATION_TOKEN_COOKIE_KEY, token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                }).status(200).send({ "status": true, "message": "Login Successfull" })

            } else {
                res.status(401).send({ "status": false, "message": "Wrong Password" });
            }

        } else {
            res.status(400).send({ "status": false, "message": "All fields are required" })
        }

    } catch (error) {
        console.error(error)
        res.status(500).send({ "status": false, "message": error.message })
    }
}

const getUserData = async (req, res) => {
    res.status(200).send(req.user);
}

const logOut = async (req, res) => {

}

export { registration, login, getUserData, logOut }