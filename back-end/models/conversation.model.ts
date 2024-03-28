import mongoose from "mongoose";
import { ConversationSchema } from "../schemas";

const conversationSchema = new mongoose.Schema<ConversationSchema>({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: []
  }]
}, { timestamps: true });

export const ConversationModel = mongoose.model("Conversation", conversationSchema);
