
import { connectDB } from "@/lib/mongodb";
import notes from "@/model/noteModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { title, description, color, userMail } = await req.json();

    // Validate inputs
    if (!title?.trim() || !description?.trim() || !color || !userMail) {
      return NextResponse.json(
        { message: "Please enter all required fields" },
        { status: 400 }
      );
    }

    // Create new note
    const newNote = await notes.create({
      title,
      description,
      color,
      userMail
    });

    return NextResponse.json(
      {
        message: "Note added successfully",
        note: newNote
      },
      { status: 201 }
    );

  } catch (err) {
    console.log("POST Notes Error:", err);

    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const noteList = await notes.find().sort({ createdAt: -1 });

    return NextResponse.json(noteList, { status: 200 });

  } catch (err) {
    console.log("GET Notes Error:", err);

    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
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
      { message: "Note deleted Successfully!!!" },
      { status: 200 }
    );
  }
  catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to delete note!!" },
      { status: 500 }
    )
  }
}