import connectMongoDB from "@/database/connect";
import UserSchema from "@/models/doctor_patient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { name,email,role,age,phone_number,address,profile_image,password,description } =
    await request.json();
  await connectMongoDB();
  const existingUser = await UserSchema.findOne({
    $or: [{ email }],
  });

  if (existingUser) {
    return NextResponse.json({ message: "An account with this email already exists" },
     { status: 409 });
  }
  const newUser = new UserSchema({
    name: name,
    email: email,
    role: role,
    age: age,
    phone: phone_number,
    address: address,
    profile_image: profile_image,
    password: await bcrypt.hash(password, 12),
    description: description,
  });
  await newUser.save();
  return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
}
