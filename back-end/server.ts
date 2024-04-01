import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import { app, server } from "./socket/socket";
import routes from "./routes";
import connectToMongoDB from "./db/connectToMongoDB";

dotenv.config();

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.use(express.static(path.join(__dirname, "..", "/front-end/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "front-end", "dist", "index.html"));
});

server.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Serve run on http://localhost:${PORT}`);
});
