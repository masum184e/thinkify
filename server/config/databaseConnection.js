import mongoose from "mongoose";

const databaseConnection = async (DATABASE_URL, DATABASE_NAME) => {
    try {
        const DB_OPTIONS = {
            dbName: DATABASE_NAME,
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("Database Connected Successfully...");
    } catch (error) {
        console.log("Database Connection Failed");
        console.error(error);
    }
}

export default databaseConnection;