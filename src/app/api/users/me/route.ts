import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
    try {
        const id = await getDataFromToken(request);
        const user = await User.findById({ _id: id }).select("-password");
        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 })
        }
        return NextResponse.json({
            message: "User fetched successfully",
            data: user,
            success: true
        }, { status: 200 
        })

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}