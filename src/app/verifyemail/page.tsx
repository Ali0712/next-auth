"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

const VerifyEmailPage = () => {
    const pathname = usePathname()
  const searchParams = useSearchParams()
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const verifyEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", {
                token,
            });
            console.log("response", response);
            setVerified(true);
            toast.success("User verified");
        } catch (error: any) {
            console.log("error", error);
            setError(error.response.data.message);
        }
    };

    useEffect(() => {
        const token = searchParams.get("token")
        setToken(token || "")
        console.log("token", token)
      }, [pathname, searchParams])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
             <Toaster position="top-right" reverseOrder={false} />
            <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
            {verified ? (
               <>
                <p className="text-green-500 mb-4">Email verified successfully!</p>
                <Link href="/login" className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</Link>
               </>
            ) : (
                <>
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        onClick={verifyEmail}
                    >
                        Verify Email
                    </button>
                </>
            )}
        </div>
    )
};

export default VerifyEmailPage;
