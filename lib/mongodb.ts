
import mongoose from "mongoose";


const connectString = process.env.CONNECTION_STRING;

export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        if (!connectString) {
            throw new Error("Connection string missing");
        }

        await mongoose.connect(connectString);

        console.log("DB Connection Successful!!");

    } catch (err) {
        console.error("DB Connection Failed:", err);
        throw err;
    }
};
