
"use client"

import Link from "next/link"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Metadata } from "next"

export default function Register() {

    const router = useRouter()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleRegister = async () => {

        const { name, email, password } = user

        if (!name || !email || !password) {
            toast.error("Enter Valid Inputs")
            return
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            const res = await response.json()

            console.log(res)

            if (response.status === 201) {
                toast.success("Registration Successful")

                setUser({
                    name: "",
                    email: "",
                    password: ""
                })

                router.push("/login")
            }
            else {
                toast.error(res.message || "Registration Failed!")
            }

        }
        catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        }
    }

    return (
        <>
            <div className="min-h-screen w-full flex justify-center items-center">

                <div className="border-2 border-blue-300 rounded-2xl p-5 w-96">

                    <h1 className="text-center my-2 text-xl font-bold">
                        User Register
                    </h1>

                    <div>

                        <div className="mt-5 mb-3 w-full">
                            <input
                                type="text"
                                placeholder="Name"
                                value={user.name}
                                onChange={(e) => setUser({
                                    ...user,
                                    name: e.target.value
                                })}
                                className="rounded bg-gray-100 p-3 w-full"
                            />
                        </div>

                        <div className="mt-5 mb-3 w-full">
                            <input
                                type="email"
                                placeholder="Email"
                                value={user.email}
                                onChange={(e) => setUser({
                                    ...user,
                                    email: e.target.value
                                })}
                                className="rounded bg-gray-100 p-3 w-full"
                            />
                        </div>

                        <div className="mt-5 mb-3 w-full">
                            <input
                                type="password"
                                placeholder="Password"
                                value={user.password}
                                onChange={(e) => setUser({
                                    ...user,
                                    password: e.target.value
                                })}
                                className="rounded bg-gray-100 p-3 w-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">

                            <button
                                onClick={handleRegister}
                                className="p-3 bg-green-600 text-white rounded"
                            >
                                Register
                            </button>

                            <Link
                                href="/login"
                                className="p-3 bg-yellow-200 text-center rounded"
                            >
                                Already a User!
                            </Link>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
