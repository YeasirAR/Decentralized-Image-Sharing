import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        recuired: true,
    },
    country: {
        type: String,
        recuired: true,
    },
    street_address: {
        type: String,
        recuired: true,
    },
    reg_no: {
        type: String,
        recuired: true,
    },
    profile_image: {
        type: String,
        recuired: false,
        default: "",
    },
    description: {
        type: String,
        recuired: false,
        default: "",
    },
    password: {
        type: String,
        recuired: true,
    },
    total_images: {
        type: Number,
        recuired: false,
        default: 0,
    },
    role: {
        type: String,
        recuired: false,
        default: "org",
    },
});

const Organization = mongoose.models.organization||
        mongoose.model("organization", organizationSchema);
export default Organization;