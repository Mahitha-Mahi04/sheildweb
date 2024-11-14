import React from "react";
import { Users, Shield, LogOut, ChartPie, MessageSquare, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import UsersPage from "@/components/UserData";
import Overview from "@/components/Overview";
import UrlChecksPage from "@/components/URLCheckData";
import Feedbacks from "@/components/Feedbacks";
import Notifications from "@/components/Notifications";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "overview";

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

  interface Nav {
    title: string;
    url: string;
    icon: React.ElementType;
  }

  const nav: Nav[] = [
    {
      title: "Overview",
      url: "/dashboard",
      icon: ChartPie,
    },
    {
      title: "Users",
      url: "/dashboard?tab=users",
      icon: Users,
    },
    {
      title: "Url Checks",
      url: "/dashboard?tab=url-checks",
      icon: Shield,
    },
    {
      title: "Feedbacks",
      url: "/dashboard?tab=feedbacks",
      icon: MessageSquare,
    },
    {
      title: "Notifications",
      url: "/dashboard?tab=notifications",
      icon: Bell,
    },
  ];

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className=" w-64 bg-white shadow-md">
        <div className="p-4">
          <Link to={"/"} className="text-2xl font-bold text-primary">ShieldWeb Admin</Link>
        </div>
        <nav className="flex flex-col gap-2">
          {nav.map(({ title, url, icon: Icon }) => (
            <Link to={url} key={title}>
              <Button
                variant="outline"
                className={`${
                  tab === url.split("tab=")[1] ||
                  (tab === "overview" && url === "/dashboard")
                    ? "text-blue-600 bg-blue-100"
                    : ""
                } w-11/12 mx-auto flex justify-start gap-4`}
              >
                <Icon className="h-5 w-5" />
                {title}
              </Button>
            </Link>
          ))}
        </nav>
        <Button
          onClick={handleLogOut}
          variant="outline"
          className="w-11/12 mx-auto flex justify-start mt-2"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </aside>
      {/* Content */}
      <main className="overflow-y-scroll flex-1 p-4">
        {tab === "users" ? (
          <UsersPage />
        ) : tab === "url-checks" ? (
          <UrlChecksPage />
        ) : tab === "feedbacks" ? (
          <Feedbacks />
        ) : tab === "notifications" ? (
          <Notifications/>
        ) : (
          <Overview />
        )}
      </main>
    </div>
  );
}
