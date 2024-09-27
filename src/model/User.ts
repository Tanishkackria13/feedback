import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Message interface
export interface Message extends Document {
    content: string;
    createdAt: Date;
    _id:string;
}

// Define the Message schema
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

// Define the User interface
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifycode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

// Define the User schema
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifycode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify code expiry is required'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema],
});

// Create and export the User model
const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);
export default UserModel;
