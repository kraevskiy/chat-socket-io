import { Types } from "mongoose";

export interface ConversationSchema {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
}
