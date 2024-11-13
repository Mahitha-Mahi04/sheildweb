import express from "express";
import { verifyToken } from "../utils/index.js";
import {
  getUnreadNotifications,
  markNotificationAsRead,
  storeUrlResult,
  submitFeedback,
  urlChecks,
} from "../controllers/user.controler.js";

const router = express();

router.post("/submit-feedback", verifyToken, submitFeedback);
router.post("/store-url-result", verifyToken, storeUrlResult);
router.get("/url-checks", verifyToken, urlChecks);
router.get("/notifications", verifyToken, getUnreadNotifications);
router.patch("/update-notification-status", verifyToken, markNotificationAsRead);

export default router;
