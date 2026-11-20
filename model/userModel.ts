
import mongoose from "mongoose";

export interface Iuser {
    name: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<Iuser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const users = mongoose.models.users || mongoose.model<Iuser>("users", userSchema);

export default users;
