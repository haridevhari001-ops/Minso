
import { connectDB } from "@/lib/mongodb";
import notes from "@/model/noteModel";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;
        const deletedNote = await notes.findByIdAndDelete(id);

        if (!deletedNote) {
            return NextResponse.json(
                { message: "Note not found!!" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Note deleted successfully" },
            { status: 200 }
        );

    } catch (err) {
        console.log("DELETE Notes Error:", err);

        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}
