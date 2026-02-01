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
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle,
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
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
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      setAuth(response.data.user, response.data.token);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strengthColors = [
    "bg-gray-300",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-emerald-500",
  ];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${isDark ? "bg-black" : "bg-gradient-to-br from-gray-50 to-gray-100"}`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute -top-40 -left-40 w-96 h-96 rounded-full ${isDark ? "bg-violet-600/20" : "bg-violet-400/30"} blur-3xl`}
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full ${isDark ? "bg-fuchsia-600/20" : "bg-fuchsia-400/30"} blur-3xl`}
        />
        <div
          className={`absolute inset-0 ${isDark ? "opacity-20" : "opacity-10"}`}
        >
          <svg className="w-full h-full">
            <pattern
              id="grid2"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>
      </div>

      {/* Theme Toggle */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`fixed top-3 right-3 z-50 relative flex items-center gap-1 p-1 rounded-full backdrop-blur-xl ${isDark ? "bg-white/10 border-white/10" : "bg-black/10 border-black/10"} border transition-colors`}
      >
        <motion.div
          className={`absolute w-8 h-8 rounded-full ${isDark ? "bg-violet-500" : "bg-amber-400"}`}
          animate={{ x: isDark ? 0 : 36 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <div
          className={`relative z-10 w-8 h-8 flex items-center justify-center ${isDark ? "text-white" : "text-gray-500"}`}
        >
          <Moon size={16} />
        </div>
        <div
          className={`relative z-10 w-8 h-8 flex items-center justify-center ${!isDark ? "text-white" : "text-gray-500"}`}
        >
          <Sun size={16} />
        </div>
      </motion.button>

      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className={`fixed top-3 left-3 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl ${isDark ? "bg-white/10 hover:bg-white/20 text-white border-white/10" : "bg-black/10 hover:bg-black/20 text-black border-black/10"} border transition-all z-50`}
      >
        <ArrowLeft size={18} />
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className={`p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden ${isDark ? "bg-gray-900/80 border-white/10" : "bg-white/80 border-gray-200"} border shadow-2xl`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="text-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-xl shadow-purple-500/30 relative"
              >
                <Bot size={36} />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Create Account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`flex items-center justify-center gap-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                <Sparkles size={16} className="text-violet-500" />
                Join ChatAI today
              </motion.p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="mb-4 p-4 rounded-2xl text-sm bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Name
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "name" ? "text-violet-500" : isDark ? "text-gray-500" : "text-gray-400"}`}
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl transition-all ${isDark ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-violet-500/50 focus:bg-white/10" : "bg-white border-gray-200 text-black placeholder-gray-400 focus:border-violet-500/50"} border focus:outline-none focus:ring-2 focus:ring-violet-500/20`}
                    placeholder="Your name"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "email" ? "text-violet-500" : isDark ? "text-gray-500" : "text-gray-400"}`}
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl transition-all ${isDark ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-violet-500/50 focus:bg-white/10" : "bg-white border-gray-200 text-black placeholder-gray-400 focus:border-violet-500/50"} border focus:outline-none focus:ring-2 focus:ring-violet-500/20`}
                    placeholder="your@email.com"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "password" ? "text-violet-500" : isDark ? "text-gray-500" : "text-gray-400"}`}
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-12 py-3.5 rounded-xl transition-all ${isDark ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-violet-500/50 focus:bg-white/10" : "bg-white border-gray-200 text-black placeholder-gray-400 focus:border-violet-500/50"} border focus:outline-none focus:ring-2 focus:ring-violet-500/20`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"} transition-colors`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength() ? strengthColors[passwordStrength()] : isDark ? "bg-white/10" : "bg-gray-200"}`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
                    >
                      {strengthLabels[passwordStrength()]}
                    </p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "confirmPassword" ? "text-violet-500" : isDark ? "text-gray-500" : "text-gray-400"}`}
                    size={18}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-12 py-3.5 rounded-xl transition-all ${isDark ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-violet-500/50 focus:bg-white/10" : "bg-white border-gray-200 text-black placeholder-gray-400 focus:border-violet-500/50"} border focus:outline-none focus:ring-2 focus:ring-violet-500/20`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"} transition-colors`}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <p className="mt-1 text-xs text-emerald-500 flex items-center gap-1">
                      <CheckCircle size={12} /> Passwords match
                    </p>
                  )}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 shadow-lg shadow-purple-500/25 disabled:opacity-50"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    Create Account <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`mt-6 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className={`font-semibold ${isDark ? "text-violet-400 hover:text-violet-300" : "text-violet-600 hover:text-violet-700"} transition-colors`}
              >
                Sign In
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
