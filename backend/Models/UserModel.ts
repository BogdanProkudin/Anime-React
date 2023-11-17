import mongoose from "mongoose";
import UserModelTypes from "../types/UserTypes";

const UserSchema = new mongoose.Schema<UserModelTypes>(
  {
    UserName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
