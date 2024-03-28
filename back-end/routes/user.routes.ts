import express from "express";
import { getUsersForSidebar } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.get("/", getUsersForSidebar);

export default userRoutes;
