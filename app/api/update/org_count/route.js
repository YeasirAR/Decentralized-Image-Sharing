import connectMongoDB from "@/database/connect";
import OrgrSchema from "@/models/orgranizations";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {email} = await request.json();
    await connectMongoDB();

    await OrgrSchema.findOneAndUpdate({ email },{ $inc: { total_images: 1 } });

    return NextResponse.json({ message: "Account updated successfully" }, { status: 201 });
}
