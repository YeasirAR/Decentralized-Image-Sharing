import connectMongoDB from "@/database/connect";
import OrgrSchema from "@/models/orgranizations";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { name, email, country, street_address, reg_no, password,description } =
    await request.json();
  await connectMongoDB();
  const existingUser = await OrgrSchema.findOne({
    $or: [{ email }, { reg_no }],
  });

  if (existingUser) {
    return NextResponse.json({ message: "An account with this email or registration number already exists" },
     { status: 409 });
  }
  const newUser = new OrgrSchema({
    name,
    email,
    country,
    street_address,
    reg_no,
    description,
    password: await bcrypt.hash(password, 10)
  });
  await newUser.save();
  return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
}
