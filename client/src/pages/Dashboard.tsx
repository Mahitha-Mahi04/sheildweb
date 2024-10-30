"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Users,
  Shield,
  AlertTriangle,
  Settings,
  LogOut,
  LoaderCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalScans: 0,
    activeUsers: 0,
    threatsBlocked: 0,
    pendingAlerts: 0,
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { logout } = useUser();

  const fetchDashboardData = async () => {
    try {
      // Fetch total scans
      setLoading(true);
      const scansRes = await fetch("/api/admin/total-scans");
      const scansData = await scansRes.json();

      // Fetch total users
      const usersRes = await fetch("/api/admin/total-users");
      const usersData = await usersRes.json();

      // Fetch feedbacks
      const feedbacksRes = await fetch("/api/admin/feedbacks");
      const feedbacksData = await feedbacksRes.json();

      // Update stats and feedbacks
      setStats({
        totalScans: scansData.totalScans,
        activeUsers: usersData.totalUsers,
        threatsBlocked: scansData.threatURLs.length,
        pendingAlerts: feedbacksData.totalFeedbacks,
      });
      setFeedbacks(feedbacksData.feedbacks);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/auth/sign-out", {
        method: "POST",
      });
      if (res.ok) {
        logout();
        navigate("/sign-in");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(activeTab);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">ShieldWeb Admin</h1>
        </div>
        <nav className="mt-6">
          {["Overview", "Users", "Scans", "Alerts", "Settings"].map((item) => (
            <Button
              key={item}
              variant="ghost"
              className={`w-full justify-start px-4 py-2 ${
                activeTab === item.toLowerCase()
                  ? "bg-primary/10 text-primary"
                  : ""
              }`}
              onClick={() => setActiveTab(item.toLowerCase())}
            >
              {item === "Overview" && <BarChart className="mr-2 h-4 w-4" />}
              {item === "Users" && <Users className="mr-2 h-4 w-4" />}
              {item === "Scans" && <Shield className="mr-2 h-4 w-4" />}
              {item === "Alerts" && <AlertTriangle className="mr-2 h-4 w-4" />}
              {item === "Settings" && <Settings className="mr-2 h-4 w-4" />}
              {item}
            </Button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <Button
            onClick={() => handleLogOut()}
            variant="ghost"
            className="w-full justify-start px-4 py-2"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoaderCircle size={50} className="animate-spin" />
        </div>
      ) : (
        // Main Section
        <main className="flex-1 p-8 overflow-auto">
          <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total Scans", value: stats.totalScans, icon: BarChart },
              { title: "Active Users", value: stats.activeUsers, icon: Users },
              {
                title: "Threats Blocked",
                value: stats.threatsBlocked,
                icon: Shield,
              },
              {
                title: "Pending Alerts",
                value: stats.pendingAlerts,
                icon: AlertTriangle,
              },
            ].map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Feedback Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Feedbacks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbacks.length > 0 ? (
                  feedbacks.map((feedback: any) => (
                    <div key={feedback._id} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-1"></div>
                      <div>
                        <p className="font-semibold">{feedback.feedback}</p>
                        <p className="text-sm">User : <span className="text-blue-500">{feedback.user.name}</span></p>
                        <p className="text-sm">ID : <span className="text-blue-500">{feedback.user._id}</span></p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(feedback.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm">No feedback available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      )}
    </div>
  );
}
