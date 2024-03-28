import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller";

const messagesRoutes = express.Router();

messagesRoutes.post("/send/:id", sendMessage);
messagesRoutes.get("/:id", getMessage);

export default messagesRoutes;
