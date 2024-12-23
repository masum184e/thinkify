import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import UserModel from "../models/userSchema.js";

const adminAuthentication = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (authorization && authorization.startsWith("Bearer ")) {

            const authorizationToken = authorization.split(" ")[1];
            if (authorizationToken) {

                const { userId } = jwt.verify(authorizationToken, process.env.JWT_SECRET_KEY)
                if (Types.ObjectId.isValid(userId)) {

                    const user = await UserModel.findById(userId).select("-password");
                    if (user.role === "admin") {
                        req.admin = user
                        next();
                    } else {
                        return res.status(403).json({ "status": false, "message": "Invalid Request" });
                    }

                } else {
                    return res.status(403).json({ "status": false, "message": "Invalid Request" });
                }

            } else {
                res.status(401).json({ "status": false, "message": "Authorization Failed" });
            }
        } else {
            throw new Error("Unauthorized User");
        }

    } catch (error) {
        res.status(500).json({ "status": false, "message": "Internal Server Error", "error": error });
    }
}

export default adminAuthentication;