import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore, useThemeStore } from "./store";
import { LandingPage } from "./pages/LandingPage";
import { LogIn } from "./pages/LogIn";
import { SignUp } from "./pages/SignUp";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { HomePage } from "./pages/HomePage";
import { ChatPage } from "./pages/ChatPage";
import "./index.css";
function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  const isAuthed = !!token || !!localStorage.getItem("token");

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
function App() {
  const { isDark } = useThemeStore();

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-black" : "bg-white"}`}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:chatId"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
