import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ShieldCheck, Mail, Search, OctagonAlert, Bell } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function MainPage() {
  const features = [
    {
      title: "URL Spam Detection",
      description: "Identify and analyze potentially malicious URLs",
      icon: <ShieldCheck className="h-6 w-6" />,
      href: "/url-spam-detection",
    },
    {
      title: "Email Spam Detection",
      description: "Detect and filter unwanted or harmful emails",
      icon: <Mail className="h-6 w-6" />,
      href: "/email-spam-detection",
    },
    {
      title: "Phishing Detection",
      description: "Protect against phishing attempts and scams",
      icon: <OctagonAlert className="h-6 w-6" />,
      href: "/phishing-detection",
    },
    {
      title: "SEO Analysis of Website",
      description:
        "Evaluate and improve your website's search engine optimization",
      icon: <Search className="h-6 w-6" />,
      href: "/seo-analysis",
    },
  ];

  // Define the notification structure
  interface Notification {
    message: string;
    timestamp: Date;
  }

  // Create an array of 10 notifications with security-related messages
  const notifications: Notification[] = [
    {
      message:
        "Data breach alert: Major bank accounts compromised. Update your passwords now!",
      timestamp: new Date("2024-10-02T09:00:00"),
    },
    {
      message:
        "New tips for secure browsing: Always check for HTTPS before entering sensitive information.",
      timestamp: new Date("2024-10-01T17:30:00"),
    },
    {
      message:
        "Stay away from spam emails offering free gifts. They often contain malware links!",
      timestamp: new Date("2024-09-30T11:45:00"),
    },
    {
      message:
        "Cybersecurity warning: Phishing campaign targeting e-commerce websites. Be cautious of unsolicited emails.",
      timestamp: new Date("2024-09-29T08:00:00"),
    },
    {
      message:
        "Latest hack news: Social media platforms targeted by spam bots spreading fake news.",
      timestamp: new Date("2024-09-28T12:15:00"),
    },
    {
      message:
        "Secure your accounts! New banking trojans detected in phishing emails. Double-check links before clicking.",
      timestamp: new Date("2024-09-27T15:20:00"),
    },
    {
      message:
        "Tech tip: Enable two-factor authentication (2FA) to add an extra layer of security to your accounts.",
      timestamp: new Date("2024-09-26T10:05:00"),
    },
    {
      message:
        "New feature: Enhanced phishing detection engine now live. Stay protected from fake emails.",
      timestamp: new Date("2024-09-25T14:35:00"),
    },
    {
      message:
        "Warning: Recent surge in crypto exchange hacks. Avoid clicking links in suspicious emails.",
      timestamp: new Date("2024-09-24T19:10:00"),
    },
    {
      message:
        "Guide: How to recognize a phishing email. Look for misspellings, suspicious links, and fake logos.",
      timestamp: new Date("2024-09-23T08:50:00"),
    },
  ];

  return (
    <Layout className="gap-4">
      <div className="w-3/4 container">
        <div className="flex h-full justify-center items-center flex-col gap-5">
          <h2 className="text-4xl font-semibold my-2">
          Your <span className="text-blue-500">Digital Shield</span> Against Spam and Scams
          </h2>
          <p className="text-muted-foreground">Stay secure online with comprehensive tools for phishing, spam detection, and SEO analysis.</p>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.href}
                className="block hover:no-underline"
              >
                <Card className="h-full transition-shadow hover:shadow-lg border-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2 text-blue-500">
                      <CardTitle className="text-xl mr-2">
                        {feature.title}
                      </CardTitle>
                      {feature.icon}
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/3 h-full border rounded-xl shadow-xl flex flex-col overflow-x-hidden overflow-y-scroll">
        <h2 className="sticky top-0 bg-blue-500 text-white p-4 flex justify-between font-bold text-xl">
          Notifications{" "}
          <span className="my-auto">
            <Bell />
          </span>
        </h2>
        <hr />
        <div className="flex flex-col gap-2 my-3">
          {notifications &&
            notifications.map(({ message, timestamp }) => (
              <div className="w-11/12 mx-auto h-fit border rounded-md shadow-md flex flex-col">
                <span className="text-sm pt-1 pl-1">
                  {timestamp.toDateString()}
                </span>
                <p className="font-semibold px-2 py-1">{message}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-center py-3">
          <Button className="">Mark All As Read</Button>
        </div>
      </div>
    </Layout>
  );
}
