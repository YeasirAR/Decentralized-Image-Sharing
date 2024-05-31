import connectMongoDB from "@/database/connect";
import OrgrSchema from "@/models/orgranizations";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email } = await request.json();
        await connectMongoDB();

        const updatedOrg = await OrgrSchema.findOneAndUpdate(
            { email }, 
            { $inc: { total_images: 1 } },
            { new: true }
        );

        if (!updatedOrg) {
            console.error("Organization not found for email:", email);
            return NextResponse.json({ message: "Organization not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Account updated successfully", updatedOrg }, { status: 201 });
    } catch (error) {
        console.error("Error updating organization:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
