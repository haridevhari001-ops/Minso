
import mongoose from "mongoose";

export interface Inote {
    _id?: string;
    title: string;
    description: string;
    color: string;
    userMail: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const noteSchema = new mongoose.Schema<Inote>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        enum: ["pink", "yellow", "green", "sky"],
        default: "yellow",
        required: true
    },
    userMail: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.notes ||
    mongoose.model<Inote>("notes", noteSchema);
