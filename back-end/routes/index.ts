import express from "express";
import authRoutes from "./auth.routes";
import messagesRoutes from "./messages.routes";
import { protectRoute } from "../middleware";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("aloha");
});
routes.use("/api/auth", authRoutes);
routes.use("/api/messages", protectRoute, messagesRoutes);

export default routes;
