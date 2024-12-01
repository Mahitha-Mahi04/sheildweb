import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ShieldCheck,
  Mail,
  Search,
  OctagonAlert,
  Bell,
  LoaderCircle,
  Loader,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";

export default function MainPage() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<{
    [key: string]: boolean;
  }>({}); // Track updating status per notification

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
      href: "#",
    },
    {
      title: "SEO Analysis of Website",
      description:
        "Evaluate and improve your website's search engine optimization",
      icon: <Search className="h-6 w-6" />,
      href: "#",
    },
  ];

  // Define the notification structure
  interface Notification {
    _id: string;
    title: string;
    content: string;
    type: string;
    createdAt: Date;
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user/notifications?userId=${user?._id}`);
        const data = await res.json();
        if (!res.ok) {
          toast({
            title: "Notifications fetch error",
            description: data.message || "Failed to fetch notifications",
            variant: "destructive",
          });
          return;
        }
        setNotifications(data.notifications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Mark a single notification as read
  const handleMarkAsRead = async (notificationId: string) => {
    setUpdatingStatus((prev) => ({ ...prev, [notificationId]: true })); // Set loading for specific notification
    try {
      const res = await fetch(
        `/api/user/update-notification-status?notificationId=${notificationId}&userId=${user?._id}`,
        {
          method: "PATCH",
        }
      );
      if (!res.ok) {
        const data = await res.json();
        toast({
          title: "Error",
          description: data.message || "Failed to mark as read",
          variant: "destructive",
        });
        return;
      }

      // Update the notification in local state to avoid re-fetching
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== notificationId)
      );

      toast({ title: "Success", description: "Notification marked as read" });
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [notificationId]: false })); // Reset loading for specific notification
    }
  };

  // Mark all notifications as read
  // const handleMarkAllAsRead = async () => {
  //   try {
  //     const res = await fetch(`/api/user/notifications/markAllAsRead?userId=${user?._id}`, {
  //       method: "PATCH",
  //     });
  //     if (!res.ok) {
  //       const data = await res.json();
  //       toast({
  //         title: "Error",
  //         description: data.message || "Failed to mark all as read",
  //         variant: "destructive",
  //       });
  //       return;
  //     }

  //     // Clear all notifications from local state
  //     setNotifications([]);
  //     toast({ title: "Success", description: "All notifications marked as read" });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <Layout className="gap-4">
      <div className="w-3/4 container">
        <div className="flex h-full justify-center items-center flex-col gap-5">
          <h2 className="text-4xl font-semibold my-2">
            Your <span className="text-blue-500">Digital Shield</span> Against
            Spam and Scams
          </h2>
          <p className="text-muted-foreground">
            Stay secure online with comprehensive tools for phishing, spam
            detection, and SEO analysis.
          </p>
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
          <div className="relative my-auto">
            <Bell />
            <span className="bg-white text-blue-600 rounded-full px-1 text-xs absolute -top-3 -right-1">
              {notifications ? notifications.length : 0}
            </span>
          </div>
        </h2>
        <hr />
        <div className="flex flex-col gap-2 my-3">
          {loading ? (
            <div className="size-full">
              <LoaderCircle className="text-muted-foreground size-6 animate-spin" />
            </div>
          ) : notifications.length > 0 ? (
            <div className="flex flex-col gap-3">
              {notifications.map((notification) => (
                <div key={notification._id} className="flex flex-col w-11/12 px-4 py-2 mx-auto border rounded-lg shadow-lg">
                  <h3 className="border-b text-xl font-semibold">
                    {notification.title}
                  </h3>
                  <p className="line-clamp-3 hover:line-clamp-none transition-transform duration-500">
                    {notification.content}
                  </p>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </span>
                    {updatingStatus[notification._id] ? (
                      <Loader className="text-muted-foreground size-4 animate-spin" />
                    ) : (
                      <span
                        onClick={() => handleMarkAsRead(notification._id)}
                        className="text-xs text-muted-foreground font-semibold transition-all duration-300 hover:text-blue-600 cursor-pointer"
                      >
                        Mark As Read
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {/* <Button className="mx-auto my-3">Mark All As Read</Button> */}
            </div>
          ) : (
            <div className="flex items-center justify-center py-3">
              <p className="text-xl text-center text-muted-foreground font-semibold">
                No Notification are available!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
