
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaX } from "react-icons/fa6";

export default function Note() {

    const session = useSession();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const [noteDetails, setNoteDetails] = useState({
        title: "",
        description: "",
        color: "",
        userMail: ""
    });

    const [loading, setLoading] = useState(true);

    // Get existing note
    const getNote = async () => {

        try {
            const response = await fetch(`/api/notes/${id}`);

            if (!response.ok) {
                toast.error("Failed to get note");
                return;
            }

            const result = await response.json();

            console.log("Fetched Note:", result);

            const note = result.note || result.data || result;

            setNoteDetails({
                title: note.title || "",
                description: note.description || "",
                color: note.color || "",
                userMail: note.userMail || session.data?.user?.email || ""
            });

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    // Authentication and fetch note
    useEffect(() => {

        if (session.status === "unauthenticated") {
            router.replace("/login");
        }

        if (session.status === "authenticated" && id) {
            getNote();
        }

    }, [session.status, id]);

    if (session.status === "loading" || loading) {
        return (
            <p className="text-center my-10 text-xl">
                Loading...
            </p>
        );
    }

    if (session.status === "unauthenticated") {
        return null;
    }

    // Update note
    const handleSubmit = async () => {

        console.log(noteDetails);

        const { title, description, color } = noteDetails;

        if (!title || !description || !color) {
            toast.error("Enter Valid Inputs!!");
            return;
        }

        try {

            const response = await fetch(`/api/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(noteDetails)
            });

            const result = await response.json();

            console.log("Update Response:", result);

            if (response.status === 200) {
                toast.success("Note Updated!!");
                router.push("/note");
            }
            else {
                toast.error(result.message || "Notes Updation Failed!!");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 flex justify-center items-center p-5">

                <div className={`w-full md:w-1/3 shadow-2xl p-6 md:p-8 rounded-[28px] border border-white transition-colors duration-500
                    ${noteDetails.color === "pink" ? "bg-pink-200" :
                        noteDetails.color === "yellow" ? "bg-yellow-200" :
                            noteDetails.color === "green" ? "bg-green-200" :
                                noteDetails.color === "sky" ? "bg-sky-200" :
                                    "bg-white"}`}>

                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">

                        <div>
                            <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">
                                MINISO WORKSPACE ✦
                            </p>

                            <h1 className="text-3xl font-black text-slate-800">
                                Edit Note<span className="text-blue-500">.</span>
                            </h1>
                        </div>

                        <button
                            onClick={() => router.push("/note")}
                            className="text-xl bg-white/70 text-slate-600 p-3 rounded-xl hover:bg-red-500 hover:text-white transition"
                        >
                            <FaX />
                        </button>

                    </div>

                    {/* Theme Selector */}
                    <div className="flex justify-between items-center mb-7">

                        <span className="text-sm font-bold text-slate-700">
                            Choose Theme:
                        </span>

                        <div className="flex gap-3">

                            <span
                                onClick={() =>
                                    setNoteDetails({ ...noteDetails, color: "pink" })
                                }
                                className={noteDetails.color === "pink"
                                    ? "w-9 h-9 cursor-pointer bg-pink-300 rounded-xl border-4 border-white ring-2 ring-pink-400"
                                    : "w-9 h-9 cursor-pointer bg-pink-300 rounded-xl hover:scale-110 transition"}
                            ></span>

                            <span
                                onClick={() =>
                                    setNoteDetails({ ...noteDetails, color: "yellow" })
                                }
                                className={noteDetails.color === "yellow"
                                    ? "w-9 h-9 cursor-pointer bg-yellow-300 rounded-xl border-4 border-white ring-2 ring-yellow-400"
                                    : "w-9 h-9 cursor-pointer bg-yellow-300 rounded-xl hover:scale-110 transition"}
                            ></span>

                            <span
                                onClick={() =>
                                    setNoteDetails({ ...noteDetails, color: "sky" })
                                }
                                className={noteDetails.color === "sky"
                                    ? "w-9 h-9 cursor-pointer bg-sky-300 rounded-xl border-4 border-white ring-2 ring-sky-400"
                                    : "w-9 h-9 cursor-pointer bg-sky-300 rounded-xl hover:scale-110 transition"}
                            ></span>

                            <span
                                onClick={() =>
                                    setNoteDetails({ ...noteDetails, color: "green" })
                                }
                                className={noteDetails.color === "green"
                                    ? "w-9 h-9 cursor-pointer bg-green-300 rounded-xl border-4 border-white ring-2 ring-green-400"
                                    : "w-9 h-9 cursor-pointer bg-green-300 rounded-xl hover:scale-110 transition"}
                            ></span>

                        </div>

                    </div>

                    {/* Title */}
                    <div className="mb-6">

                        <label className="block text-sm font-bold text-slate-700 mb-3">
                            Note Title
                        </label>

                        <input
                            type="text"
                            value={noteDetails.title}
                            onChange={(e) => {
                                setNoteDetails({
                                    ...noteDetails,
                                    title: e.target.value
                                });
                            }}
                            className="w-full bg-white/80 border border-white rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 transition"
                            placeholder="Enter note title..."
                        />

                    </div>

                    {/* Description */}
                    <div className="mb-8">

                        <label className="block text-sm font-bold text-slate-700 mb-3">
                            Description
                        </label>

                        <textarea
                            value={noteDetails.description}
                            onChange={(e) => {
                                setNoteDetails({
                                    ...noteDetails,
                                    description: e.target.value
                                });
                            }}
                            className="w-full bg-white/80 border border-white rounded-xl px-4 py-3 outline-none resize-none focus:ring-4 focus:ring-blue-100 transition"
                            rows={6}
                            placeholder="Write your thoughts..."
                        ></textarea>

                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition duration-300"
                    >
                        Update Note ✦
                    </button>

                </div>

            </div>
        </>
    );
}
