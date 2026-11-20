import Notes from "@/app/note/page";
import { connectDB } from "@/lib/mongodb";
import note from "@/model/noteModel"
import { promises } from "dns";
import { NextResponse,NextRequest } from "next/server";


// delete note with id
export async function DELETE(req:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try{
        await connectDB()
        const {id}=await  params
        const noteDetails=await note.findById(id)
        return NextResponse.json(noteDetails,{status:200})
    }
    catch(err){
        console.log(err)
        return NextResponse.json("Something Went Wrong!!",{status:500})
    }
}

// note details with id
export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}){
    try{
        await connectDB()
        const {id}=await params
        const noteDetails=await note.findById(id)
        return NextResponse.json(noteDetails,{status:200})
    }
    catch(err){
        console.log(err)
        return NextResponse.json("Something Went wrong!",{status:500})
    }
}

