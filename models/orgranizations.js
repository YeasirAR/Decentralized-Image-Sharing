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
    region: {
        type: String,
        recuired: true,
    },
    streetAddress: {
        type: String,
        recuired: true,
    },
    regNo: {
        type: String,
        recuired: true,
    },
    profileImage: {
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
    
});

const Organization = mongoose.models.organization||
        mongoose.model("organization", organizationSchema);
export default Organization;