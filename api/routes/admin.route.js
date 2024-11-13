import express from "express";
import {
  addNotification,
  deleteNotifications,
  feedbacks,
  getAllNotifications,
  getAllUrlChecks,
  getAllUsers,
  totalScans,
  totalUsers,
} from "../controllers/admin.controler.js";
import { verifyToken } from "../utils/index.js";

const router = express();

router.get("/total-users", verifyToken, totalUsers);
router.get("/total-scans", verifyToken, totalScans);
router.get("/feedbacks", verifyToken, feedbacks);
router.get("/all-users", verifyToken, getAllUsers);
router.get("/all-url-checks", verifyToken, getAllUrlChecks);
router.post("/notification", verifyToken, addNotification);
router.delete("/notification", verifyToken, deleteNotifications);
router.get("/all-notifications", verifyToken, getAllNotifications);

export default router;
