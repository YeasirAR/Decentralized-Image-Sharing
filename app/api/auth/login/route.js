import connectMongoDB from "@/database/connect";
import OrgrSchema from "@/models/orgranizations";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { withSession } from "@/database/session";

export async function POST(request) {
  const {email, password } = await request.json();
  await connectMongoDB();
  const existingUser = await OrgrSchema.findOne({email});
  console.log(existingUser);
  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    req.session.user = {
      id: existingUser._id,
      email: existingUser.email,
      imagePath: existingUser.profile_image,
      inLogedin: true,
    };
    await req.session.save();
    return NextResponse.json({ message: "Login Successful"}, { status: 200 });
  }
  return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
}
