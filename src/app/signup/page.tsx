"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignupPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const signup = async (e:any) => {
        e.preventDefault()
        setButtonDisabled(true);
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("response", response);
            toast.success("Signup successful");
            setTimeout(()=>{
                router.push("/login");
            },1000)

        } catch (error: any) {
            console.log("error", error);
            toast.error(error.response.data.message);
        } finally {
            setButtonDisabled(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            user.username.length > 0 &&
            user.email.length > 0 &&
            user.password.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="max-w-md w-full px-6 py-8 bg-gray-800 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-6 text-white">Sign Up</h2>
                <form className="space-y-4" onSubmit={signup}>
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-700 text-white px-3 py-2"
                            placeholder="Enter your username"
                            value={user.username}
                            onChange={(e) =>
                                setUser({ ...user, username: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-700 text-white px-3 py-2"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-700 text-white px-3 py-2"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                buttonDisabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            disabled={buttonDisabled}
                            
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
