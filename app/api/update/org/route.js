import connectMongoDB from "@/database/connect";
import OrgrSchema from "@/models/orgranizations";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

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

    await OrgrSchema.findOneAndUpdate({ email }, update);

    return NextResponse.json({ message: "Account updated successfully" }, { status: 201 });
}
