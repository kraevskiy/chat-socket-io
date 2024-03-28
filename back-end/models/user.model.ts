import mongoose from "mongoose";
import { UserGenderEnum } from "../types";
import { UserSchema } from "../schemas";

const userSchema = new mongoose.Schema<UserSchema>({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  gender: {
    type: String,
    required: true,
    enum: UserGenderEnum
  },
  picture: {
    type: String,
    default: ""
  }
});

const User = mongoose.model<UserSchema>("User", userSchema);

export default User;
