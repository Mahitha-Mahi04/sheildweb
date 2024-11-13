import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import URLCheck from "../models/urlCheck.model.js";
import Feedback from "../models/feedback.model.js";
import { errorHandler } from "../utils/index.js";
import { isValidObjectId } from "mongoose";

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
    let feedbacks = await Feedback.find()
      .sort({ updatedAt: -1 })
      .populate("user", "name");
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

export const getAllUsers = async (req, res, next) => {
  try {
    // Check if user exists and has admin privileges
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const users = await User.find({}, "-password").sort({ createdAt: -1 });

    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "No users found!" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUrlChecks = async (req, res, next) => {
  try {
    // Check if user exists and has admin privileges
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const urlChecks = await URLCheck.find()
      .sort({ createdAt: -1 })
      .populate("requested_user", "name email");

    if (!urlChecks) {
      return res
        .status(404)
        .json({ success: false, message: "No url checks found!" });
    }

    res.status(200).json({ success: true, urlChecks });
  } catch (error) {
    console.log(error);
  }
};

export const addNotification = async (req, res, next) => {
  try {
    // Check if user exists and has admin privileges
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { title, content, type } = req.body;

    if (!title || !content || !type) {
      return next(errorHandler(400, "All fields are required!"));
    }

    await Notification.create({
      title,
      content,
      type,
    });

    res.status(200).json({ success: true, message: "New notification added" });
  } catch (error) {
    console.log(error);
  }
};

export const getAllNotifications = async (req, res, next) => {
  try {
    // Check if user exists and has admin privileges
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const notifications = await Notification.find({}, { title: 1, content: 1, type: 1, createdAt: 1 })
      .lean()
      .populate("readBy", "_id")
      .sort({createdAt: -1})
      .then((notifications) => 
        notifications.map((notification) => ({
          ...notification,
          readByCount: notification.readBy?.length || 0,
        }))
      );

    if (!notifications) {
      return next(400, "No notification found!");
    }


    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotifications = async (req, res, next) => {
  try {
    // Check if user exists and has admin privileges
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { id } = req.query;

    if(!id || !isValidObjectId(id)){
      return next(errorHandler(400, id ? "Invalid ID" : "ID is required"));
    }

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return next(400, "Notification not found or already been deleted!");
    }

    res
      .status(200)
      .json({ success: true, message: "Notification deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
