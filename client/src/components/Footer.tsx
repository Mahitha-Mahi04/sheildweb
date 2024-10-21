import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
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
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="hover:text-primary">
                  Press Releases
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-primary">
                  Partners
                </Link>
              </li>
            </ul>
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
