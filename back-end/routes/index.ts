import authRoutes from "./auth.routes";
import express from "express";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("aloha");
});
routes.use("/api/auth", authRoutes);

export default routes;
