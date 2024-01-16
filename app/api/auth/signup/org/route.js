import connectMongoDB from "@/database/connect";
import OrgrSchema from "@/models/orgranizations";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { name, email, region, streetAddress, regNo, password } =
    await request.json();
  await connectMongoDB();
  const existingUser = await OrgrSchema.findOne({
    $or: [{ email }, { regNo }],
  });

  if (existingUser) {
    return NextResponse.json({ message: "An account with this email or registration number already exists" },
     { status: 409 });
  }
  const newUser = new OrgrSchema({
    name,
    email,
    region,
    streetAddress,
    regNo,
    password: await bcrypt.hash(password, 12),
  });
  await newUser.save();
  return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
}
