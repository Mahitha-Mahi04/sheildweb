import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useUser } from "@/context/userContext";
const Header = ({ theme = "light" }: { theme?: "light" | "dark" }) => {
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { user, logout } = useUser();

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
      console.log(error);
    }
  };

  return (
    <header
      className={`w-full h-16 px-4 sm:px-6 lg:px-8 ${
        isDark ? "text-white" : "text-black"
      } bg-transparent z-20 relative`}
    >
      <div className="container mx-auto h-full flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-blue-500">
          Shield Web
        </Link>
        <nav className="hidden md:flex w-1/4 justify-around">
          <Link
            to="/home"
            className="text-sm font-medium hover:text-blue-500 transition-all"
          >
            Home
          </Link>
          {user && user.isAdmin ? (
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-blue-500 transition-all"
            >
              Dashboard
            </Link>
          ) : (
            user && (
              <Link
                to="/history"
                className="text-sm font-medium hover:text-blue-500 transition-all"
              >
                History
              </Link>
            )
          )}
          <Link
            to="/about"
            className="text-sm font-medium hover:text-blue-500 transition-all"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium hover:text-blue-500 transition-all"
          >
            Contact
          </Link>
        </nav>
        {user ? (
          <div className="flex w-1/3  justify-between items-center">
            {user.isAdmin && (
              <span className="cursor-pointer rounded-md px-2 bg-black text-white font-semibold text-sm shadow-md">
                Admin
              </span>
            )}
            <p className="text-xl">
              Welcome{" "}
              <span className="font-semibold text-blue-500">{user.name}</span>
            </p>
            <Button variant={"default"} onClick={() => handleLogOut()}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button asChild variant={`${isDark ? "secondary" : "default"}`}>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
