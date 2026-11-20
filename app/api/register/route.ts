
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import userModel from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await userModel.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User Already Exist" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });

        return NextResponse.json({
            message: "Registration Successful",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        }, { status: 201 });

    } catch (err) {
        console.log(err);

        return NextResponse.json(
            { message: "Something Went Wrong!!" },
            { status: 500 }
        );
    }
}
