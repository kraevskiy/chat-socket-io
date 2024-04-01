import { Response } from "express";
import { ISendMessageRequest } from "../types/";
import { errorHandler } from "../utils";
import { ConversationModel, MessageModel } from "../models";
import { errorTexts } from "../texts";
import { getReceiverSocketId, io } from "../socket/socket";

export const sendMessage = async (req: ISendMessageRequest, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    if (!message) {
      return res.status(400).json({ error: errorTexts.message.notEmpty });
    }

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId]
      });
    }

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([
      conversation.save(),
      newMessage.save()
    ]);

    const receiverSocketId = getReceiverSocketId(`${receiverId}`)
    if (receiverId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (e) {
    errorHandler(e, res, "SendMessage controller");
  }
};


export const getMessage = async (req: ISendMessageRequest, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user?._id;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (e) {
    errorHandler(e, res, "GetMessage controller");
  }
};

