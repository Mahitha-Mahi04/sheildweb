import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Shield } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";

export default function Footer() {
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<null | boolean>(null);

  const submitFeedback = async () => {
    try {
      setMessage("");
      setSuccess(null);
      setFeedback("");
      const res = await fetch("/api/user/submit-feedback", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ feedback }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message);
        setSuccess(data.success);
      }
      setMessage(data.message);
      setSuccess(data.success);
      setTimeout(() => {
        setMessage("");
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="bg-muted mt-auto text-muted-foreground ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-primary">
                Shield Web
              </span>
            </div>
            <p className="text-sm">
              Protecting your digital world from spam and malicious content.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/spam-check" className="hover:text-primary">
                  Spam Link Checker
                </Link>
              </li>
              <li>
                <Link to="/email-scan" className="hover:text-primary">
                  Email Scanning
                </Link>
              </li>
              <li>
                <Link to="/website-protection" className="hover:text-primary">
                  Website Protection
                </Link>
              </li>
              <li>
                <Link to="/api" className="hover:text-primary">
                  API Access
                </Link>
              </li>
              <li>
                <Link to="/enterprise" className="hover:text-primary">
                  Enterprise Solutions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-primary">
                  User Guides
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/security-tips" className="hover:text-primary">
                  Security Tips
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-primary">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Submit Your Feedback</h3>
            <div className="flex flex-col gap-3">
              <Label>Please give your feedback</Label>
              <Textarea
              value={feedback}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setFeedback(e.target.value)
                }
              />
              <div className="flex w-1/4 justify-between items-center">
                <span className="border-2 size-8 rounded-sm flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                    />
                  </svg>
                </span>
                <span className="border-2 size-8 rounded-sm flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                    />
                  </svg>
                </span>
              </div>
              <Button onClick={() => submitFeedback()}>Submit Feedback</Button>
              {message && (
                <div
                  className={`text-center ${
                    success ? "text-green-600" : "text-red-600"
                  } font-semibold`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-muted-foreground/20 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Shield Web. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
