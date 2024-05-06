import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";


export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "User logout successfully",
            success: true
        }, { status: 200 })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
        
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}