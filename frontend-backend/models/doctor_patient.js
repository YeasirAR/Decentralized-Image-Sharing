import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        recuired: true,
    },
    role: {
        type: String,
        recuired: true,
    },
    age: {
        type: String,
        recuired: true,
    },
    description : {
        type: String,
        recuired: false,
        default: "",
    },
    address: {
        type: String,
        recuired: true,
    },
    phone: {
        type: String,
        recuired: true,
    },
    profile_image: {
        type: String,
        recuired: false,
        default: "",
    },
    password: {
        type: String,
        recuired: true,
    },
    
});

const Users = mongoose.models.doctor_patient||
        mongoose.model("doctor_patient", userSchema);
export default Users;