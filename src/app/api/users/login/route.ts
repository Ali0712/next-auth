import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({message: "User does not exist"},{status: 400})
        }
        
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({message: "Invalid password"},{status: 400})
        }
        if (!user.isVerified) {
            return NextResponse.json({message: "Please verify your email"},{status: 400})
        }


        const tokenPayload = {id: user._id, email: user.email};
        const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true
        }, { status: 200})

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
        
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}