
"use client";

import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Add() {

    const router = useRouter();

    const session = useSession();
    const [noteDetails, setNoteDetails] = useState({
        title: "",
        description: "",
        color: "",
        userMail: session?.data?.user?.email || ""
    })

    useEffect(() => {
        if (session.status === "authenticated") {
            setNoteDetails(prev => ({
                ...prev,
                userMail: session.data?.user?.email || ""
            }));
        }
    }, [session.status, session.data]);

    if (session?.status === "unauthenticated") {
        redirect('/login')
    }

    if (session?.status === "loading") {
        return <p className="text-center my-10 text-xl">Loading...</p>
    }

    const handleReset = () => {
        setNoteDetails({
            title: "",
            description: "",
            color: "",
            userMail: session?.data?.user?.email || ""
        })
    }

    const handleSubmit = async () => {

        console.log("Note details:", noteDetails);
        console.log("Email:", noteDetails.userMail);

        const { title, description, color, userMail } = noteDetails;

        if (!title.trim() || !description.trim() || !color || !userMail) {
            toast.error("Please fill all the fields");
            return;
        }

        try {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(noteDetails)
            });

            if (response.status === 201) {
                toast.success("Note added successfully");
                handleReset();
                router.push("/note");
            } else {
                const result = await response.json();
                console.log(result);
                toast.error("Adding note failed!");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <div className="min-h-screen w-full flex justify-center items-center px-4 py-10 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100">

                {/* Background Decorations */}
                <div className="fixed top-10 left-10 w-52 h-52 bg-pink-200/40 rounded-full blur-3xl"></div>
                <div className="fixed bottom-10 right-10 w-64 h-64 bg-orange-200/40 rounded-full blur-3xl"></div>

                {/* Main Container */}
                <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-200/40 border border-white overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 px-7 py-9 md:px-10 relative overflow-hidden">

                        <div className="absolute -right-8 -top-12 w-40 h-40 bg-white/20 rounded-full"></div>
                        <div className="absolute right-28 -bottom-16 w-32 h-32 bg-white/20 rounded-full"></div>

                        <div className="relative flex justify-between items-center">

                            <div>
                                <p className="text-white/80 text-xs font-bold tracking-[3px] uppercase">
                                    Your Creative Space
                                </p>

                                <h1 className="text-3xl md:text-4xl font-bold text-white mt-3">
                                    Create a Note
                                </h1>

                                <p className="text-white/90 text-sm mt-2">
                                    Every thought deserves a place ✨
                                </p>
                            </div>

                            <div className="hidden sm:flex w-16 h-16 bg-white/30 backdrop-blur-md rounded-2xl items-center justify-center text-3xl shadow-lg">
                                📝
                            </div>

                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-6 md:p-10">

                        {/* Top Actions */}
                        <div className="flex justify-between items-center mb-9">

                            <Link href="/notes"
                                className="text-gray-500 hover:text-orange-500 flex items-center gap-2 text-sm font-medium transition">
                                <span>←</span>
                                Back to Notes
                            </Link>

                            <span className="bg-orange-50 text-orange-500 px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                                NEW NOTE
                            </span>

                        </div>

                        {/* Theme Selection */}
                        <div className="mb-9">

                            <h2 className="text-gray-800 font-bold text-lg">
                                Pick your theme
                            </h2>

                            <p className="text-gray-400 text-sm mt-1 mb-5">
                                Choose a color that matches your mood.
                            </p>

                            <div className="flex flex-wrap gap-5">

                                <span
                                    onClick={() => setNoteDetails({ ...noteDetails, color: "pink" })}
                                    className={`w-11 h-11 rounded-full cursor-pointer bg-pink-200 transition-all hover:scale-110 ${noteDetails.color === "pink" ? "ring-4 ring-pink-300 ring-offset-2 scale-110" : "shadow-sm"}`}>
                                </span>

                                <span
                                    onClick={() => setNoteDetails({ ...noteDetails, color: "yellow" })}
                                    className={`w-11 h-11 rounded-full cursor-pointer bg-yellow-200 transition-all hover:scale-110 ${noteDetails.color === "yellow" ? "ring-4 ring-yellow-300 ring-offset-2 scale-110" : "shadow-sm"}`}>
                                </span>

                                <span
                                    onClick={() => setNoteDetails({ ...noteDetails, color: "sky" })}
                                    className={`w-11 h-11 rounded-full cursor-pointer bg-sky-200 transition-all hover:scale-110 ${noteDetails.color === "sky" ? "ring-4 ring-sky-300 ring-offset-2 scale-110" : "shadow-sm"}`}>
                                </span>

                                <span
                                    onClick={() => setNoteDetails({ ...noteDetails, color: "green" })}
                                    className={`w-11 h-11 rounded-full cursor-pointer bg-green-200 transition-all hover:scale-110 ${noteDetails.color === "green" ? "ring-4 ring-green-300 ring-offset-2 scale-110" : "shadow-sm"}`}>
                                </span>

                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                                {noteDetails.color
                                    ? `Selected theme: ${noteDetails.color}`
                                    : "No theme selected yet"}
                            </p>

                        </div>

                        {/* Title */}
                        <div className="mb-7">

                            <label className="block text-gray-700 font-semibold text-sm mb-3">
                                Note Title
                            </label>

                            <input
                                type="text"
                                placeholder="Give your note a title..."
                                className="w-full bg-orange-50/50 border border-orange-100 rounded-xl px-5 py-4 text-gray-800 outline-none transition focus:bg-white focus:border-orange-300 focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400"
                                value={noteDetails.title}
                                onChange={(e) => setNoteDetails({ ...noteDetails, title: e.target.value })}
                            />

                        </div>

                        {/* Description */}
                        <div className="mb-8">

                            <label className="block text-gray-700 font-semibold text-sm mb-3">
                                Description
                            </label>

                            <textarea
                                name=""
                                id=""
                                rows={7}
                                placeholder="Write down your thoughts, ideas and plans..."
                                className="w-full bg-orange-50/50 border border-orange-100 rounded-xl px-5 py-4 text-gray-800 outline-none resize-none transition focus:bg-white focus:border-orange-300 focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400 leading-7"
                                value={noteDetails.description}
                                onChange={(e) => setNoteDetails({ ...noteDetails, description: e.target.value })}
                            ></textarea>

                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row gap-4">

                            <button
                                onClick={() => { handleReset(); redirect("/notes") }}
                                className="flex-1 py-4 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 hover:border-gray-300 transition">
                                Cancel
                            </button>

                            <button
                                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-[1.02] transition duration-300"
                                onClick={handleSubmit}>
                                Save Note ✨
                            </button>

                        </div>

                        {/* Footer */}
                        <div className="mt-9 text-center">
                            <p className="text-gray-400 text-xs tracking-wide">
                                A little space for your big ideas ♡
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
