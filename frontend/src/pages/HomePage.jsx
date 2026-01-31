import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useChatStore, useThemeStore } from "../store";
import { chatAPI } from "../api";
import { Sidebar } from "../components/Sidebar";
import { PromptSuggestions } from "../components/PromptSuggestions";
import { ChatInput } from "../components/ChatInput";
import {
  Bot,
  Moon,
  Sun,
  Sparkles,
  Zap,
  Shield,
  Brain,
  MessageSquare,
} from "lucide-react";

export function HomePage() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useThemeStore();
  const { setChats, setLoading, setError } = useChatStore();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await chatAPI.getChats();
        setChats(response.data.chats || []);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [setChats]);

  const handleCreateChat = async (initialMessage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await chatAPI.createChat();
      const chatId = response.data.chat?._id;

      if (!chatId) {
        throw new Error("Invalid chat response");
      }

      if (initialMessage) {
        await chatAPI.sendMessage(chatId, initialMessage);
      }

      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error("Error creating chat:", error);
      setError("Failed to start chat. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50"}`}
    >
      <Sidebar />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient mesh background */}
          <div
            className={`absolute inset-0 ${isDark ? "opacity-100" : "opacity-50"}`}
          >
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[140px]" />
          </div>

          {/* Subtle grid overlay */}
          <div
            className={`absolute inset-0 ${isDark ? "opacity-[0.03]" : "opacity-[0.02]"}`}
            style={{
              backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 1px, transparent 1px),
                               linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Animated floating orbs */}
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-600/20 blur-3xl"
            animate={{
              x: [0, 80, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: "5%", right: "10%" }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-pink-500/15 blur-3xl"
            animate={{
              x: [0, -60, 0],
              y: [0, 50, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            style={{ bottom: "10%", left: "5%" }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/15 blur-3xl"
            animate={{
              x: [0, 40, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: "40%", left: "50%" }}
          />

          {/* Noise texture overlay */}
          <div
            className={`absolute inset-0 ${isDark ? "opacity-[0.015]" : "opacity-[0.01]"}`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Header */}
        <header
          className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "bg-black/50 border-white/10" : "bg-white/50 border-black/10"} backdrop-blur-xl relative z-10`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-md shadow-purple-500/20">
              <Bot size={18} />
            </div>
            <h1
              className={`font-semibold ${isDark ? "text-white" : "text-black"}`}
            >
              ChatAI
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-black/10 hover:bg-black/20 text-black"} transition-colors`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-xl shadow-purple-500/30"
            >
              <Bot size={40} />
            </motion.div>
            <h2
              className={`text-4xl font-bold mb-3 ${isDark ? "text-white" : "text-black"}`}
            >
              How can I help you today?
            </h2>
            <p
              className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Start a conversation or choose a suggestion below
            </p>
          </motion.div>

          <PromptSuggestions onSelect={handleCreateChat} isDark={isDark} />

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? "bg-violet-500/10 border border-violet-500/20" : "bg-violet-50 border border-violet-200"}`}
            >
              <Sparkles size={14} className="text-violet-500" />
              <span
                className={`text-sm ${isDark ? "text-violet-300" : "text-violet-600"}`}
              >
                Powered by Gemini AI
              </span>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-200"}`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span
                className={`text-sm ${isDark ? "text-emerald-300" : "text-emerald-600"}`}
              >
                Online & Ready
              </span>
            </div>
          </motion.div>

          {/* Keyboard shortcut hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`mt-6 text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}
          >
            Press{" "}
            <kbd
              className={`px-1.5 py-0.5 rounded ${isDark ? "bg-white/10" : "bg-gray-200"}`}
            >
              Enter
            </kbd>{" "}
            to send a message
          </motion.p>
        </div>

        {/* Input */}
        <div
          className={`p-4 border-t ${isDark ? "border-white/10 bg-black/50" : "border-black/10 bg-white/50"} backdrop-blur-xl relative z-10`}
        >
          <div className="max-w-3xl mx-auto">
            <ChatInput onSend={handleCreateChat} isDark={isDark} />
          </div>
        </div>
      </main>
    </div>
  );
}
