import {
  MessageCircle,
  LogOut,
  Plus,
  Trash2,
  Bot,
  Sparkles,
  Clock,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useChatStore, useThemeStore } from "../store";
import { chatAPI } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { isDark } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredChat, setHoveredChat] = useState(null);
  const {
    chats,
    activeChat,
    setActiveChat,
    setChats,
    removeChat,
    clearMessages,
  } = useChatStore();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await chatAPI.getChats();
        setChats(response.data.chats || []);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };
    fetchChats();
  }, [setChats]);

  const filteredChats = chats.filter((chat) =>
    (chat.title || "New Chat")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleNewChat = () => {
    // Navigate immediately for instant feedback
    setActiveChat(null);
    clearMessages();
    navigate("/chat");
  };

  const handleDeleteChat = async (e, chatId) => {
    e.stopPropagation();
    if (window.confirm("Delete this conversation?")) {
      try {
        await chatAPI.deleteChat(chatId);
        removeChat(chatId);
        if (activeChat?._id === chatId) {
          setActiveChat(null);
          clearMessages();
          navigate("/chat");
        }
      } catch (error) {
        console.error("Failed to delete chat:", error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    navigate(`/chat/${chat._id}`);
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={`w-72 flex flex-col h-screen border-r ${isDark ? "bg-black/95 border-white/10" : "bg-white/95 border-black/10"} backdrop-blur-xl`}
    >
      {/* Logo & Header */}
      <div
        className={`p-5 border-b ${isDark ? "border-white/10" : "border-black/10"}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/25"
          >
            <Bot size={22} />
          </motion.div>
          <div>
            <span
              className={`font-bold text-xl ${isDark ? "text-white" : "text-black"}`}
            >
              ChatAI
            </span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span
                className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Online
              </span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: "0 8px 30px rgba(139, 92, 246, 0.3)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewChat}
          className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-purple-500/25"
        >
          <motion.div
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 0.3 }}
            key={Date.now()}
          >
            <Plus size={18} />
          </motion.div>
          New Chat
          <Sparkles size={14} className="opacity-60" />
        </motion.button>
      </div>

      {/* Search Bar */}
      <div
        className={`px-4 py-3 border-b ${isDark ? "border-white/5" : "border-black/5"}`}
      >
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? "bg-white/5" : "bg-black/5"}`}
        >
          <Search
            size={16}
            className={isDark ? "text-gray-500" : "text-gray-400"}
          />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`bg-transparent text-sm flex-1 outline-none ${isDark ? "text-white placeholder-gray-500" : "text-black placeholder-gray-400"}`}
          />
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-violet-500/20 scrollbar-track-transparent">
        {filteredChats.length > 0 && (
          <div
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            <Clock size={12} />
            <span>Recent Conversations</span>
            <span
              className={`ml-auto px-2 py-0.5 rounded-full text-[10px] ${isDark ? "bg-white/10" : "bg-black/10"}`}
            >
              {filteredChats.length}
            </span>
          </div>
        )}
        <AnimatePresence>
          {filteredChats.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-12 ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              <MessageCircle size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">
                {searchQuery ? "No chats found" : "No conversations yet"}
              </p>
              <p className="text-xs mt-1 opacity-60">
                {searchQuery
                  ? "Try a different search"
                  : "Start a new chat to begin"}
              </p>
            </motion.div>
          ) : (
            filteredChats.map((chat, index) => (
              <motion.div
                key={chat._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ x: 4 }}
                onClick={() => handleSelectChat(chat)}
                onMouseEnter={() => setHoveredChat(chat._id)}
                onMouseLeave={() => setHoveredChat(null)}
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  activeChat?._id === chat._id
                    ? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 shadow-lg shadow-violet-500/10"
                    : isDark
                      ? "hover:bg-white/5 border border-transparent hover:border-white/10"
                      : "hover:bg-gray-100 border border-transparent hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <motion.div
                    animate={
                      activeChat?._id === chat._id ? { scale: [1, 1.2, 1] } : {}
                    }
                    transition={{ duration: 0.3 }}
                    className={`p-1.5 rounded-lg ${
                      activeChat?._id === chat._id
                        ? "bg-violet-500/20 text-violet-400"
                        : isDark
                          ? "text-gray-400"
                          : "text-gray-500"
                    }`}
                  >
                    <MessageCircle size={16} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-sm truncate block ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      {chat.title || "New Chat"}
                    </span>
                    <span
                      className={`text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}
                    >
                      {new Date(
                        chat.updatedAt || chat.createdAt,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <AnimatePresence>
                  {(hoveredChat === chat._id ||
                    activeChat?._id === chat._id) && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={(e) => handleDeleteChat(e, chat._id)}
                      className={`p-1.5 rounded-lg transition-all ${isDark ? "hover:bg-red-500/20 text-gray-400 hover:text-red-400" : "hover:bg-red-50 text-gray-500 hover:text-red-500"}`}
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* User Profile */}
      <div
        className={`p-4 border-t ${isDark ? "border-white/10" : "border-black/10"}`}
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`relative overflow-hidden p-4 rounded-2xl transition-all ${isDark ? "bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15" : "bg-gradient-to-br from-black/5 to-black/10 hover:from-black/10 hover:to-black/15"} border ${isDark ? "border-white/10" : "border-black/10"}`}
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-bold bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 ring-2 ring-white/20">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black shadow-lg shadow-emerald-500/50"
              />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-black"}`}
              >
                {user?.name || "User"}
              </p>
              <p
                className={`text-xs truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {user?.email}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className={`p-2.5 rounded-xl transition-all ${isDark ? "bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400" : "bg-black/5 hover:bg-red-50 text-gray-500 hover:text-red-500"}`}
              title="Logout"
            >
              <LogOut size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
