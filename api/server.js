import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import contractRoute from "./routes/contract.route.js";
import reviewRouter from "./routes/review.route.js";
import messageRouter from "./routes/message.route.js";
import conversationRoute from "./routes/conversation.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
mongoose.set("strictQuery", true);
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to database");
  } catch (error) {
    handleError(error);
  }
};
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/contracts", contractRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRouter);
app.use("/api/reviews", reviewRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Server is running");
});
