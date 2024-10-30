import User from "../models/user.model.js";
import URLCheck from "../models/urlCheck.model.js";
import Feedback from "../models/feedback.model.js";

export const totalUsers = async (req, res) => {
  try {
    // Check if user exists and has admin privileges
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    // Count total users
    const totalUsers = await User.countDocuments();
    return res.status(200).json({ success: true, totalUsers });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const totalScans = async (req, res) => {
  // Check if user exists and has admin privileges
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  try {
    const totalScans = await URLCheck.countDocuments();
    const threatURLs = await URLCheck.find({ risk_score: { $gte: 1 } });

    return res.status(200).json({ success: true, totalScans, threatURLs });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const feedbacks = async (req, res) => {
  // Check if user exists and has admin privileges
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  try {
    const feedbacks = await Feedback.find().sort({ updatedAt: -1 });
    return res
      .status(200)
      .json({ success: true, totalFeedbacks: feedbacks.length, feedbacks });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
