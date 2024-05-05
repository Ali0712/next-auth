import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, username, password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return NextResponse.json({message: "User already exists"},{status: 400})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
        
        return NextResponse.json({
            message: "User registered successfully",
            user: savedUser,
            success: true
        }, { status: 201 })
        
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

