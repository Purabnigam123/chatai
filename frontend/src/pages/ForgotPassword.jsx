import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  Bot,
  Moon,
  Sun,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Send,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useThemeStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const resetToken = btoa(email + Date.now());
      const resetLink = `${window.location.origin}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_7x5plzh",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_hmftd5k",
        {
          to_email: email,
          reset_link: resetLink,
          to_name: email.split("@")[0],
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "0HruXJqhDHS2AQGgh",
      );

      setSuccess(true);
    } catch (err) {
      console.error("Email send error:", err);
      setError("Failed to send reset email. Please try again.");
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
          animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full ${isDark ? "bg-amber-600/20" : "bg-amber-400/30"} blur-3xl`}
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full ${isDark ? "bg-orange-600/20" : "bg-orange-400/30"} blur-3xl`}
        />
        <div
          className={`absolute inset-0 ${isDark ? "opacity-20" : "opacity-10"}`}
        >
          <svg className="w-full h-full">
            <pattern
              id="grid3"
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
            <rect width="100%" height="100%" fill="url(#grid3)" />
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
        className={`fixed top-2 left-2 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl ${isDark ? "bg-white/10 hover:bg-white/20 text-white border-white/10" : "bg-black/10 hover:bg-black/20 text-black border-black/10"} border transition-all z-50`}
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
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-500/20 to-amber-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="text-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -10 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/30 relative"
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
                Forgot Password?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`flex items-center justify-center gap-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                <Sparkles size={16} className="text-amber-500" />
                We'll send you a reset link
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
                    Check Your Email
                  </h2>
                  <p
                    className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    We've sent a password reset link to
                    <br />
                    <span className="font-medium text-amber-500">{email}</span>
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/login")}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"}`}
                  >
                    Back to Login
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

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "email" ? "text-amber-500" : isDark ? "text-gray-500" : "text-gray-400"}`}
                          size={18}
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-xl transition-all ${isDark ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-amber-500/50 focus:bg-white/10" : "bg-white border-gray-200 text-black placeholder-gray-400 focus:border-amber-500/50"} border focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                          placeholder="your@email.com"
                        />
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 40px -10px rgba(245, 158, 11, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white hover:from-amber-600 hover:via-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/25 disabled:opacity-50"
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
                          Send Reset Link <Send size={18} />
                        </>
                      )}
                    </motion.button>
                  </form>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className={`mt-6 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Remember your password?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className={`font-semibold ${isDark ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"} transition-colors`}
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
