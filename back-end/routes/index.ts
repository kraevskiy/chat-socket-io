import express from "express";
import authRoutes from "./auth.routes";
import messagesRoutes from "./messages.routes";
import userRoutes from "./user.routes";
import { protectRoute } from "../middleware";

const routes = express.Router();

routes.use("/api/auth", authRoutes);
routes.use("/api/messages", protectRoute, messagesRoutes);
routes.use("/api/users", protectRoute, userRoutes);

export default routes;
