import connectMongoDB from "@/database/connect";
import OrgrSchema from "@/models/orgranizations";
import UserSchema from "@/models/doctor_patient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken"; 

export async function POST(request) {
  try {
    const { email, password,loginType } = await request.json();
    await connectMongoDB();
    const existingUser = await (async () => {
      if (loginType === "organization") {
        return OrgrSchema.findOne({ email });
      } else if (loginType === "user") {
        return  UserSchema.findOne({ email });
      }
    })();
    console.log(loginType)
    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }

    const token = sign({ userId: existingUser._id, name: existingUser.name,email: existingUser.email, profile_image: existingUser.profile_image, role:existingUser.role }, process.env.JWT_SECRET, {
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
