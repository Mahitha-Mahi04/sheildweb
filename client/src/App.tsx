import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import URLSpamDetection from "./pages/UrlSpanDetectionPage";
import { UserProvider } from "./context/userContext";
import PrivateRoute from "./components/PrivateRoute";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import History from "./pages/History";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/toaster";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<MainPage />} />
          <Route path="/history" element={<History />} />
          <Route path="/url-spam-detection" element={<URLSpamDetection />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Toaster/>
      <ScrollToTop/>
    </UserProvider>
  );
};

export default App;
