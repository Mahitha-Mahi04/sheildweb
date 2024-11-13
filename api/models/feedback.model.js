import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("feedback", feedbackSchema);

export default Feedback;
