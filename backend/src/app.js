import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import dotenv from "dotenv";
import connectToSocket from "./controller/socketManager.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);


connectToSocket(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Failed:", err.message);
  });
