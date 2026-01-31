import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { useThemeStore } from "../store";
import { authAPI } from "../api";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useThemeStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.requestPasswordReset(email);
      setMessage(
        response.data?.message ||
          "If that email exists, a reset link has been sent.",
      );
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Request failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div
          className={`p-8 rounded-3xl backdrop-blur-xl relative ${isDark ? "bg-gray-900/80 border border-white/10" : "bg-white/80 border border-gray-200"} shadow-2xl`}
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 pointer-events-none" />

          <div className="text-center mb-8">
            <h1
              className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-black"}`}
            >
              Forgot Password
            </h1>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Enter your email to receive a reset link
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm bg-red-500/10 border border-red-500/30 text-red-400">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 rounded-xl text-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all ${isDark ? "bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10" : "bg-black/5 border border-black/10 text-black placeholder-gray-400 focus:border-black/30 focus:bg-black/10"} focus:outline-none`}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-purple-500/25 disabled:opacity-50"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send Reset Link
                  <Send size={18} />
                </>
              )}
            </motion.button>
          </form>

          <button
            onClick={() => navigate("/login")}
            className={`mt-6 w-full text-sm flex items-center justify-center gap-2 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"} transition-colors`}
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </button>
        </div>
      </motion.div>
    </div>
  );
}
