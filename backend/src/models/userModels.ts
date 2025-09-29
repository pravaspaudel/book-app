import mongoose from "mongoose";
import { UserType } from "../middlewares/userValidator";

const userSchema = new mongoose.Schema<UserType>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username is required"],
      trim: true,
      minlength: [4, "username must be at least 4 characters"],
      maxlength: [20, "username cannot exceed 20 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email cannot be empty"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "passowrd must be at least 6 characters"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema);

export default userModel;
