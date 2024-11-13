import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Shield,
  Frown,
  Meh,
  Smile,
  Laugh,
  Angry,
} from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";

export default function Footer() {
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<null | boolean>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const submitFeedback = async () => {
    // Check if a rating is selected
    if (selectedRating === null) {
      setMessage("Please select a rating.");
      setSuccess(false);
      return;
    }

    try {
      const res = await fetch("/api/user/submit-feedback", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ feedback, rating: selectedRating }),
      });

      const data = await res.json();
      setMessage(data.message);
      setSuccess(data.success);

      if(res.ok){
        setTimeout(() => {
          setFeedback("");
          setSelectedRating(null);
          setMessage("");
          setSuccess(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      setMessage("Failed to submit feedback. Please try again.");
      setSuccess(false);
    }
  };

  const handleSelectRating = (rating: number) => {
    if(rating == selectedRating){
      setSelectedRating(null);
    }else{
      setSelectedRating(rating);
    }
  };

  const icons = [
    { rating: 1, Icon: Angry, label: "Very Unsatisfied" },
    { rating: 2, Icon: Frown, label: "Unsatisfied" },
    { rating: 3, Icon: Meh, label: "Satisfied" },
    { rating: 4, Icon: Smile, label: "Very Satisfied" },
    { rating: 5, Icon: Laugh, label: "Extremely Satisfied" },
  ];

  return (
    <footer className="bg-muted mt-auto text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-primary">Shield Web</span>
            </div>
            <p className="text-sm">
              Protecting your digital world from spam and malicious content.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons */}
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href={"#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                  aria-label={Icon.name}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {["Spam Link Checker", "Email Scanning", "Website Protection", "API Access", "Enterprise Solutions"].map(
                (service) => (
                  <li key={service}>
                    <Link to={`/${service.replace(/\s+/g, "-").toLowerCase()}`} className="hover:text-primary">
                      {service}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Feedback Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Submit Your Feedback</h3>
            <div className="flex flex-col gap-3">
              <Label>Please give your feedback</Label>
              <Textarea
                className="min-h-20 max-h-48 font-semibold"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setFeedback(e.target.value)
                }
              />
              <div className="flex gap-2 items-center" role="radiogroup" aria-label="Rating">
                {icons.map(({ rating, Icon, label }) => (
                  <button
                    key={rating}
                    onClick={() => handleSelectRating(rating)}
                    className={`border-2 w-8 h-8 rounded-sm flex items-center justify-center ${
                      selectedRating === rating ? "bg-blue-200" : ""
                    }`}
                    aria-checked={selectedRating === rating}
                    role="radio"
                    aria-label={label}
                  >
                    <Icon className={`text-blue-600 ${selectedRating === rating ? "text-blue-800" : ""}`} />
                  </button>
                ))}
              </div>
              <Button onClick={submitFeedback}>Submit Feedback</Button>
              {message && (
                <div className={`text-center ${success ? "text-green-600" : "text-red-600"} font-semibold`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 pt-8 border-t border-muted-foreground/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Shield Web. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((policy) => (
              <Link key={policy} to={`/${policy.replace(/\s+/g, "-").toLowerCase()}`} className="hover:text-primary">
                {policy}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
