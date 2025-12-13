import express from "express";
import dotenv from "dotenv";
import logger from "./middleware/Logger/logger.js";
import cors from "cors";
import connectDb from "./db/connectDb.js";
import dirRoute from "./Routes/directory.route.js";
import taskRoute from "./Routes/task.route.js";
import userRoute from "./Routes/user.route.js";
const server = express();
dotenv.config();

const port = process.env.PORT || 5500;
const URI = process.env.DB_URI;

//middlewares:
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(logger);

//Routes:
server.use("/api", dirRoute);
server.use("/api", taskRoute);
server.use("/api", userRoute);

//not found page:
server.use((req, res) => {
  res.status(404).json({ message: "Page Not Found ❌" });
});

//start server and connect to mongoDB:
server.listen(port, async () => {
  try {
    await connectDb(URI);
    console.log(`server run port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
