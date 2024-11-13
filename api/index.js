import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((e) => {
    console.log("Mongo DB Error: " + e.message);
  });

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  res.json({success: false, statusCode, message})
})
