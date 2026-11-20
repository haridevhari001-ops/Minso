
"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CiCalendar } from "react-icons/ci"
import { FaPowerOff, FaTrash, FaUser, FaEdit } from "react-icons/fa"
import { useEffect, useState } from "react"

export default function Notes() {

    const session = useSession()
    const router = useRouter()

    const [notes, setNotes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch saved notes
    const getNotes = async () => {
        try {
            const response = await fetch("/api/notes")

            if (response.status === 200) {
                const result = await response.json()

                console.log("Fetched Notes:", result)

                const noteData = Array.isArray(result)
                    ? result
                    : result.notes || result.data || []

                setNotes(noteData)
            } else {
                console.log("Failed to fetch notes")
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // Authentication check and fetch notes
    useEffect(() => {

        if (session.status === "unauthenticated") {
            router.replace("/login")
        }

        if (session.status === "authenticated") {
            getNotes()
        }

    }, [session.status])

    if (session.status === "loading" || loading) {
        return (
            <p className="text-center my-10 text-xl">
                Loading Notes...
            </p>
        )
    }

    // Note theme colors
    const themeColors: any = {
        pink: "bg-pink-200 border-pink-300",
        yellow: "bg-yellow-100 border-yellow-300",
        sky: "bg-sky-200 border-sky-300",
        green: "bg-green-200 border-green-300"
    }


    // Delete Note
    const handleDelete = async (id: string) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: "DELETE"
            });

            if (response.status === 200) {

                setNotes(prevNotes =>
                    prevNotes.filter(note => note._id !== id)
                );

                alert("Note deleted successfully!");

            } else {
                alert("Failed to delete note!");
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong!");
        }
    };


    return (
        <div className="min-h-screen bg-slate-100 py-8">

            <div className="md:mx-40 mx-5">

                {/* Header */}
                <div className="p-5 mb-10 flex justify-between items-center bg-white rounded-2xl shadow-sm border border-slate-200">

                    <div className="text-2xl font-bold text-slate-800">
                        Miniso<span className="text-blue-500">.</span>
                    </div>

                    <div className="items-center text-slate-600 flex gap-4">

                        <p className="flex items-center gap-2 font-medium">
                            <FaUser className="text-blue-500" />
                            {session.data?.user?.name}
                        </p>

                        <button
                            className="border border-slate-200 p-3 rounded-xl text-slate-600 hover:bg-red-500 hover:text-white transition"
                            onClick={() => signOut({
                                callbackUrl: "/login"
                            })}
                            title="Logout"
                        >
                            <FaPowerOff />
                        </button>

                    </div>
                </div>

                {/* Heading */}
                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-slate-800">
                        My Notes
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Keep your thoughts organized in one place.
                    </p>

                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    {notes.map((item: any, index: number) => (

                        <div
                            key={item._id || index}
                            className={`${themeColors[item.color] || "bg-white border-slate-200"} p-5 rounded-2xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col justify-between min-h-52`}
                        >

                            <div>

                                <h1 className="text-xl font-bold text-slate-800 mb-3">
                                    {item.title}
                                </h1>

                                <p className="text-slate-600 leading-relaxed">
                                    {item.description}
                                </p>

                            </div>

                            <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-300">

                                <span className="text-sm text-slate-500 flex gap-2 items-center">

                                    <CiCalendar className="text-lg" />

                                    {item.createdAt
                                        ? new Date(item.createdAt).toLocaleDateString()
                                        : ""}

                                </span>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    title="Delete Note"
                                    className="text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition duration-300"
                                >
                                    <FaTrash />
                                </button>
                            </div>

                        </div>

                    ))}

                    {/* Empty State */}
                    {notes.length === 0 && (

                        <div className="col-span-full text-center py-10 text-slate-400">

                            <p className="text-lg font-semibold">
                                No notes found!
                            </p>

                            <p className="text-sm mt-2">
                                Start by creating your first note.
                            </p>

                        </div>

                    )}

                    {/* Add Note */}
                    <Link
                        href="/note/add"
                        className="border-2 border-dashed border-slate-300 p-5 rounded-2xl bg-white flex flex-col justify-center items-center gap-3 text-slate-400 cursor-pointer hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 transition duration-300 min-h-52"
                    >

                        <div className="text-3xl">
                            <FaEdit />
                        </div>

                        <span className="text-sm font-semibold">
                            Add New Note
                        </span>

                    </Link>

                </div>

            </div>

        </div>
    )
}
