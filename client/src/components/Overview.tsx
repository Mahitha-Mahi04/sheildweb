import { AlertTriangle, BarChart, LoaderCircle, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Overview = () => {
  const [stats, setStats] = useState({
    totalScans: 0,
    activeUsers: 0,
    threatsBlocked: 0,
    pendingAlerts: 0,
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState<boolean | null>(null);

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
  return (
    <div className="size-full">
      {loading ? (
        <div className="size-full flex justify-center items-center">
          <LoaderCircle className="size-8 animate-spin"/>
        </div>
      ) : (
        <div className="flex-1 p-8 overflow-auto">
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
                    <div
                      key={feedback._id}
                      className="flex items-start [&:not(:last-child)]:border-b"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-1"></div>
                      <div>
                        <p className="font-semibold">{feedback.feedback}</p>
                        {feedback.rating && <p>Rating : <span className="text-blue-600 font-semibold">{feedback.rating}</span></p>}
                        <p className="text-sm">
                          User :{" "}
                          <span className="text-blue-500">
                            {feedback.user.name}
                          </span>
                        </p>
                        <p className="text-sm">
                          ID :{" "}
                          <span className="text-blue-500">
                            {feedback.user._id}
                          </span>
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(feedback.createdAt).toDateString()}
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
        </div>
      )}
    </div>
  );
};

export default Overview;
