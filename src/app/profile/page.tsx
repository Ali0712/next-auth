"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const ProfilePage = () => {
    const router = useRouter();
    const [data, setData] = useState<any>({});

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/users/me");
            console.log("response", response);
            setData(response.data.data);
            toast.success(response.data.message);
        } catch (error: any) {
            console.log("error", error);
            toast.error(error.response.data.message);
        }
    };

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        } catch (error: any) {
            console.log("error", error);
            toast.error(error.response.data.message);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="max-w-md w-full px-6 py-8 bg-gray-800 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-6 text-white">Profile</h2>
                <div>
                    <p className="text-white">ID: {data._id}</p>
                    <p className="text-white">Username: {data.username}</p>
                    <p className="text-white">Email: {data.email}</p>
                </div>
                <div className="space-y-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-4 py-2 px-4 rounded"
                        onClick={fetchData}
                    >
                        Fetch Profile
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
