import connectMongoDB from "@/database/connect";
import OrgrSchema from "@/models/orgranizations";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken"; 

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    await connectMongoDB();

    const existingUser = await OrgrSchema.findOne({ email });

    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }

    const token = sign({ userId: existingUser._id, email: existingUser.email, profile_image: existingUser.profile_image }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({ message: "Login Successful" }, { status: 200 });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
    });

    return response;

  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
