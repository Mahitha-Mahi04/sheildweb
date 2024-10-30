import Feedback from "../models/feedback.model.js";
import URLCheck from "../models/urlCheck.model.js";

function standardizeFeedback(feedback) {
  // Trim leading/trailing spaces and replace multiple spaces with a single space
  let cleanedFeedback = feedback.trim().replace(/\s+/g, " ");

  // Capitalize the first letter of each sentence and convert the rest to lowercase
  cleanedFeedback = cleanedFeedback
    .toLowerCase()
    .replace(/(^\w|\.\s*\w)/g, (letter) => letter.toUpperCase());

  return cleanedFeedback;
}

export const submitFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;

    if (!feedback) {
      return res
        .status(400)
        .json({ success: false, message: "Feedback is required!" });
    }

    if (feedback.length < 5 || feedback.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Feedback must between 5 and 30 charecters long!",
      });
    }

    const newFeedback = new Feedback({
      feedback: standardizeFeedback(feedback),
      user: req.user.id,
    });

    await newFeedback.save();
    return res.json({ success: true, message: "Feedback Submited" });
  } catch (error) {
    console.log(error);
  }
};

export const storeUrlResult = async (req, res) => {
  try {
    const { data, userId } = req.body;

    // Basic checks to validate incoming data
    if (
      !data ||
      !data.url ||
      typeof data.risk_score === "undefined" ||
      !userId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { url, risk_score, security_checks } = data;

    // Additional check on security_checks structure
    const requiredChecks = [
      "domain_flagged",
      "url_flagged",
      "ai_flagged",
      "new_domain",
    ];
    if (
      !security_checks ||
      !requiredChecks.every((key) => key in security_checks)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid security checks format" });
    }

    try {
      // Save the new check data to the database
      const newCheck = new URLCheck({
        url,
        risk_score,
        security_checks,
        requested_user: userId,
      });

      await newCheck.save();
      res.status(201).json({ message: "URL check result stored successfully" });
    } catch (error) {
      console.error("Error storing URL check result:", error);
      res.status(500).json({ message: "Failed to store URL check result" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const urlChecks = async (req, res) => {
  try {
    // Fetch all URLCheck documents for the requested user
    const urlChecks = await URLCheck.find({ requested_user: req.user.id }).sort({updatedAt: -1});

    if (!urlChecks.length) {
      return res.json({ message: "No URL check results found for this user"});
    }

    res.status(200).json(urlChecks);
  } catch (error) {
    console.error("Error retrieving URL check results:", error);
    res.status(500).json({ message: "Failed to retrieve URL check results" });
  }
};
