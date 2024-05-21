import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    phno: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    status: {
        type: Boolean,
        default: false
    },
    adminId: {
        type: String,
        required: false,
    }
})

const User = mongoose.model('user', userSchema);

export default User;