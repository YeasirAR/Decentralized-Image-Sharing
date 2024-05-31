import connectMongoDB from "@/database/connect";
import UserSchema from "@/models/doctor_patient";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
  
    let decodedToken = null;
    if (token) {
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        console.error("Invalid or expired token:", error);
        return NextResponse.json({ message: "Invalid Login Error 1" }, { status: 401 });
      }
    }
  
    if (!decodedToken) {
        console.log(decodedToken);
        return NextResponse.json({ message: "Invalid Login Error 2" }, { status: 401 });
    }
    try {
        const email  = decodedToken.email;
        await connectMongoDB();
    
        const existingUser = await UserSchema.findOne({ email });
    
        if (!existingUser) {
          return NextResponse.json({ message: "Invalid User" }, { status: 401 });
        }

        const response = NextResponse.json({ data: existingUser }, { status: 200 });
        return response;
    
      } catch (error) {
        console.error("Error in login:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
      }
}