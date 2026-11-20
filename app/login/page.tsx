
"use client"

import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { FaRegUser, FaLock } from "react-icons/fa"

export default function Login() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { email, password } = user

        if (email && password) {

            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            })

            console.log(res)

            if (res?.ok) {
                toast.success("Login Successful!!")

                setTimeout(() => {
                    window.location.href = "/note"
                }, 1000)
            }
            else {
                toast.error("Login Failed!! Invalid Credentials")
                setUser({ email: "", password: "" })
            }
        }
        else {
            toast.error("Enter valid Inputs!!")
        }
    }

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-sky-50 via-white to-blue-100 p-5">

            <div className="w-full max-w-md">

                {/* Login Card */}
                <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl shadow-blue-100">

                    {/* Logo */}
                    <div className="text-center mb-8">

                        <h1 className="text-4xl font-extrabold text-blue-500">
                            Miniso<span className="text-slate-800">.</span>
                        </h1>

                        <h2 className="text-2xl font-bold text-slate-800 mt-6">
                            Welcome Back!
                        </h2>

                        <p className="text-slate-500 text-sm mt-2">
                            Login to continue organizing your ideas.
                        </p>

                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>

                        {/* Email */}
                        <div className="mb-5">

                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Email Address
                            </label>

                            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 focus-within:ring-2 focus-within:ring-blue-400 transition">

                                <FaRegUser className="text-slate-400" />

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={user.email}
                                    onChange={(e) => {
                                        setUser({ ...user, email: e.target.value })
                                    }}
                                    className="w-full p-3 bg-transparent outline-none text-slate-700"
                                />

                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-7">

                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>

                            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 focus-within:ring-2 focus-within:ring-blue-400 transition">

                                <FaLock className="text-slate-400" />

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={user.password}
                                    onChange={(e) => {
                                        setUser({ ...user, password: e.target.value })
                                    }}
                                    className="w-full p-3 bg-transparent outline-none text-slate-700"
                                />

                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-4">

                            <button
                                type="submit"
                                className="w-full p-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition duration-300"
                            >
                                Login →
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="flex-1 border-t border-slate-200"></div>
                                <span className="text-xs text-slate-400">OR</span>
                                <div className="flex-1 border-t border-slate-200"></div>
                            </div>

                            <Link
                                href="/register"
                                className="w-full p-3 bg-slate-100 text-slate-700 text-center rounded-xl font-semibold hover:bg-slate-200 transition"
                            >
                                Create New Account
                            </Link>

                        </div>

                    </form>

                    <p className="text-center text-xs text-slate-400 mt-8">
                        Capture your ideas anytime, anywhere.
                    </p>

                </div>

            </div>
        </div>
    )
}
