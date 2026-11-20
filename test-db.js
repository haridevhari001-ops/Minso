
import mongoose from "mongoose";

async function testConnection() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);

        console.log("MongoDB Connected Successfully!");

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
}

testConnection();
