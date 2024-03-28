import mongoose from "mongoose";
import { MessageSchema } from "../schemas";

const messageSchema = new mongoose.Schema<MessageSchema>({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const MessageModel = mongoose.model("Message", messageSchema);
