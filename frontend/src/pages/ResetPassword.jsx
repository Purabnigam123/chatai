import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useThemeStore } from "../store";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  ArrowRight,
  Bot,
  Moon,
  Sun,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { authAPI } from "../api";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useThemeStore();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const passwordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!email || !token) {
      setError("Invalid reset link");
      return;
    }

    setLoading(true);
    try {
      await authAPI.resetPassword(email, token, password);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${isDark ? "bg-black" : "bg-gradient-to-br from-gray-50 to-gray-100"}`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -60, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute -top-40 -left-40 w-96 h-96 rounded-full ${isDark ? "bg-emerald-600/20" : "bg-emerald-400/30"} blur-3xl`}
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 60, 0], scale: [1, 1.25, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full ${isDark ? "bg-teal-600/20" : "bg-teal-400/30"} blur-3xl`}
        />
        <div
          className={`absolute inset-0 ${isDark ? "opacity-20" : "opacity-10"}`}
        >
          <svg className="w-full h-full">
            <pattern
              id="grid4"
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
            <rect width="100%" height="100%" fill="url(#grid4)" />
          </svg>
        </div>
      </div>

      {/* Theme Toggle */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`fixed top-2 right-2 z-50 flex items-center gap-1 p-1 rounded-full backdrop-blur-xl ${isDark ? "bg-white/10 border-white/10" : "bg-black/10 border-black/10"} border transition-colors`}
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
        onClick={() => navigate("/login")}
        className={`fixed top-2 left-2 flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full backdrop-blur-xl ${isDark ? "bg-white/10 hover:bg-white/20 text-white border-white/10" : "bg-black/10 hover:bg-black/20 text-black border-black/10"} border transition-all z-50`}
      >
        <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10 px-2 sm:px-0"
      >
        <div
          className={`p-5 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-xl relative overflow-hidden ${isDark ? "bg-gray-900/80 border-white/10" : "bg-white/80 border-gray-200"} border shadow-2xl`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/20 to-emerald-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="text-center mb-4 sm:mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 text-white shadow-xl shadow-emerald-500/30 relative"
              >
                <ShieldCheck size={28} className="sm:w-9 sm:h-9" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-violet-400 rounded-full border-2 border-white"
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Reset Password
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`flex items-center justify-center gap-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                <Sparkles size={16} className="text-emerald-500" />
                Create your new password
              </motion.p>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30"
                  >
                    <CheckCircle size={40} className="text-white" />
                  </motion.div>
                  <h2
                    className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Password Reset Successful!
                  </h2>
                  <p
                    className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Your password has been updated.
                    <br />
                    You can now sign in with your new password.
                  </p>
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/login")}
                    className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25"
                  >
                    Go to Login <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
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

                  {email && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-4 p-3 rounded-xl text-sm ${isDark ? "bg-white/5 text-gray-400" : "bg-gray-100 text-gray-600"}`}
                    >
                      Resetting password for:{" "}
                      <span className="font-medium text-emerald-500">
                        {email}
                      </span>
                    </motion.div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label
                        className={`block text-sm font-medium mb-1.5 sm:mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <Lock
                          className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "password" ? "text-emerald-500" : isDark ? "text-gray-500" : "text-gray-400"}`}
                          size={18}
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFocusedField("password")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl transition-all ${isDark ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-emerald-500/50 focus:bg-white/10" : "bg-white border-gray-200 text-black placeholder-gray-400 focus:border-emerald-500/50"} border focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"} transition-colors`}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {password && (
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
                      transition={{ delay: 0.5 }}
                    >
                      <label
                        className={`block text-sm font-medium mb-1.5 sm:mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock
                          className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "confirmPassword" ? "text-emerald-500" : isDark ? "text-gray-500" : "text-gray-400"}`}
                          size={18}
                        />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onFocus={() => setFocusedField("confirmPassword")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl transition-all ${isDark ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-emerald-500/50 focus:bg-white/10" : "bg-white border-gray-200 text-black placeholder-gray-400 focus:border-emerald-500/50"} border focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"} transition-colors`}
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {confirmPassword && password === confirmPassword && (
                        <p className="mt-1 text-xs text-emerald-500 flex items-center gap-1">
                          <CheckCircle size={12} /> Passwords match
                        </p>
                      )}
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 disabled:opacity-50"
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
                          Reset Password <ArrowRight size={18} />
                        </>
                      )}
                    </motion.button>
                  </form>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className={`mt-4 sm:mt-6 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Remember your password?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className={`font-semibold ${isDark ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700"} transition-colors`}
                    >
                      Sign In
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
