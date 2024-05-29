import connectMongoDB from "@/database/connect";
import OrgrSchema from "@/models/orgranizations";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const {email, password} = await request.json();
  await connectMongoDB();
  const existingUser = await OrgrSchema.findOne({email});

  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    
    return NextResponse.json({ message: "Login Successful" }, { status: 200 });
  }
  return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
}
