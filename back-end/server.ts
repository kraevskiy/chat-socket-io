import express from "express";
import dotenv from "dotenv";

import routes from "./routes";
import connectToMongoDB from "./db/connectToMongoDB";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(routes);

app.listen(PORT, async () => {
  await connectToMongoDB()
  console.log(`Serve run on http://localhost:${PORT}`);
});
