import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useThemeStore } from "../store";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Bot,
  Moon,
  Sun,
  ArrowLeft,
} from "lucide-react";
import { authAPI } from "../api";

export function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth, isAuthenticated } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (isAuthenticated) navigate("/chat");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.signup(
        formData.name,
        formData.email,
        formData.password,
      );

      // Store auth data before navigation
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      // Also update the store
      setAuth(response.data.user, response.data.token);

      // Navigate after storing
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}
    >
      {/* Background Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 ${isDark ? "opacity-20" : "opacity-10"}`}
        >
          <svg className="w-full h-full">
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M 60 0 L 0 0 0 60`}
                fill="none"
                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Theme Toggle */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 relative flex items-center gap-1 p-1 rounded-full ${isDark ? "bg-white/10" : "bg-black/10"} transition-colors`}
      >
        <motion.div
          className={`absolute w-8 h-8 rounded-full ${isDark ? "bg-violet-500" : "bg-amber-400"}`}
          animate={{ x: isDark ? 0 : 36 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <div
          className={`relative z-10 w-8 h-8 flex items-center justify-center ${isDark ? "text-white" : "text-gray-500"} transition-colors`}
        >
          <Moon size={16} />
        </div>
        <div
          className={`relative z-10 w-8 h-8 flex items-center justify-center ${!isDark ? "text-white" : "text-gray-500"} transition-colors`}
        >
          <Sun size={16} />
        </div>
      </motion.button>

      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className={`fixed top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-black/10 hover:bg-black/20 text-black"} transition-colors z-50`}
      >
        <ArrowLeft size={18} />
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className={`p-8 rounded-3xl backdrop-blur-xl relative ${isDark ? "bg-gray-900/80 border border-white/10" : "bg-white/80 border border-gray-200"} shadow-2xl`}
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 pointer-events-none" />
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/30"
            >
              <Bot size={32} />
            </motion.div>
            <h1
              className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-black"}`}
            >
              Create Account
            </h1>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Join ChatAI today
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Name
              </label>
              <div className="relative">
                <User
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all ${isDark ? "bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10" : "bg-black/5 border border-black/10 text-black placeholder-gray-400 focus:border-black/30 focus:bg-black/10"} focus:outline-none`}
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all ${isDark ? "bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10" : "bg-black/5 border border-black/10 text-black placeholder-gray-400 focus:border-black/30 focus:bg-black/10"} focus:outline-none`}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  size={18}
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all ${isDark ? "bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10" : "bg-black/5 border border-black/10 text-black placeholder-gray-400 focus:border-black/30 focus:bg-black/10"} focus:outline-none`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  size={18}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all ${isDark ? "bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10" : "bg-black/5 border border-black/10 text-black placeholder-gray-400 focus:border-black/30 focus:bg-black/10"} focus:outline-none`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all mt-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-purple-500/25 disabled:opacity-50"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          <p
            className={`text-center text-sm mt-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className={`font-semibold ${isDark ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"} transition-colors`}
            >
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
