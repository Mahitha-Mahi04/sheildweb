import express from "express";
import {
  feedbacks,
  totalScans,
  totalUsers,
} from "../controllers/admin.controler.js";
import { verifyToken } from "../utils/index.js";

const app = express();

app.get("/total-users", verifyToken, totalUsers);
app.get("/total-scans", verifyToken, totalScans);
app.get("/feedbacks", verifyToken, feedbacks);

export default app;
