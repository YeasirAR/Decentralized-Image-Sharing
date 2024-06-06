import connectMongoDB from "@/database/connect";
import OrgrSchema from "@/models/orgranizations";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken"; 

export async function POST(request) {
    const { name, email, country, street_address, password, profile_image, description } =
        await request.json();
    await connectMongoDB();

    const update = {
        name: name,
        email: email,
        country: country,
        street_address: street_address,
        description: description ,
        profile_image: profile_image,
        password: await bcrypt.hash(password, 10),
    }

    const existingUser = await OrgrSchema.findOne({ email });
    await OrgrSchema.findOneAndUpdate({ email }, update);
    const token = sign({ userId: existingUser._id, name: existingUser.name,email: existingUser.email, profile_image: existingUser.profile_image, role:existingUser.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      const response = NextResponse.json({ message: "Account updated successfully" }, { status: 201 });
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
      });
    return response;
}
