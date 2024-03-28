import { Types } from "mongoose";

export interface MessageSchema {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  message: string;
}
