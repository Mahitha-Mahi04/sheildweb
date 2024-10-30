import mongoose from "mongoose";

const URLCheckSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    risk_score: {
      type: Number,
      required: true,
    },
    security_checks: {
      domain_flagged: {
        type: Boolean,
        default: false,
      },
      url_flagged: {
        type: Boolean,
        default: false,
      },
      ai_flagged: {
        type: Boolean,
        default: false,
      },
      new_domain: {
        type: Boolean,
        default: false,
      },
    },
    requested_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const URLCheck = mongoose.model("URLCheck", URLCheckSchema);
export default URLCheck;
