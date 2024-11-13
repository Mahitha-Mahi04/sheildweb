import { toast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Notification {
  _id: string;
  title: string;
  content: string;
  type: string;
  createdAt: Date;
  readByCount: Number;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [notificationData, setNotificationData] = useState({
    title: "",
    content: "",
    type: "",
  });

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/all-notifications");
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Failed to fetch notifications",
          description:
            data.message || "Notifications fetching failed, try again!",
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

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChange = (
    id: string,
    value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = typeof value === "string" ? value : value.target.value;
    setNotificationData((prev) => ({ ...prev, [id]: newValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/notification", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(notificationData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Failed to send notification",
          description:
            data.message || "Notification sending failed, try again!",
        });
        return;
      }
      toast({
        title: "Notification sent successfully",
        description: "Your notification has been sent to all users.",
      });
      setNotificationData({ title: "", content: "", type: "" });
      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/notification?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Failed to delete notification",
          description: data.message || "Error deleting notification",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Notification deleted successfully",
        description: data.message || "Successfully deleted notification",
      });

      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="size-full flex justify-between gap-3">
      {loading ? (
        <div className="h-full w-1/2 flex justify-center items-center">
          <LoaderCircle className="size-6 animate-spin" />
        </div>
      ) : (
        <div className="w-1/2 flex flex-col">
          {notifications ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Notifications</h2>
              {notifications.map((notification: Notification) => (
                <Card key={notification._id}>
                  <CardHeader className="border-b">
                    <CardTitle className="text-xl font-semibold">
                      {notification.title}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="text-black px-7 py-3 font-semibold line-clamp-3">
                    {notification.content}
                  </CardDescription>
                  <CardFooter className="flex flex-col gap-2">
                    <div className="text-muted-foreground w-full flex gap-2">
                      <span className="text-sm font-semibold">
                        {new Date(notification.createdAt).toDateString()}
                      </span>
                      <span className="text-sm font-semibold">
                        #{notification.type}
                      </span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <Button
                        onClick={() => handleDelete(notification._id)}
                        className="bg-red-600 mr-auto"
                      >
                        Delete
                      </Button>
                      <span className="text-sm text-muted-foreground font-semibold">
                        Total Views {notification.readByCount.toString()}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="size-full flex justify-center items-center">
              <span className="text-xl text-muted-foreground font-semibold">
                No notifications are found!
              </span>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2">
        <h2 className="text-2xl font-semibold">Add a new notification</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="title"
            placeholder="Enter the title"
            value={notificationData.title}
            onChange={(e) => handleChange("title", e)}
            required
          />
          <Select
            required
            defaultValue={notificationData.type}
            onValueChange={(value) => handleChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="security_alert">Security Alert</SelectItem>
              <SelectItem value="data_breach">Data Breach</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          id="content"
          className="min-h-20 max-h-40"
          placeholder="Write your notification here..."
          value={notificationData.content}
          onChange={(e) => handleChange("content", e)}
          required
          minLength={5}
          maxLength={200}
        />
        <span className="text-xs text-muted-foreground">
          {200 - notificationData.content.length} charecters remaining{" "}
        </span>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() =>
              setNotificationData({
                title: "",
                content: "",
                type: "",
              })
            }
          >
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Notifications;
