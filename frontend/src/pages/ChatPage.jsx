import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore, useThemeStore } from "../store";
import { chatAPI } from "../api";
import { Sidebar } from "../components/Sidebar";
import { ChatInput } from "../components/ChatInput";
import { Message } from "../components/Message";
import { TypingIndicator } from "../components/TypingIndicator";
import { Bot, Moon, Sun } from "lucide-react";

export function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const { isDark, toggleTheme } = useThemeStore();
  const {
    activeChat,
    messages,
    loading,
    setActiveChat,
    setMessages,
    addMessage,
    setLoading,
    setError,
    error,
  } = useChatStore();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await chatAPI.getChat(chatId);
        setActiveChat(response.data.chat);
        setMessages(response.data.chat.messages || []);
      } catch (error) {
        console.error("Error fetching chat:", error);
        navigate("/chat");
      }
    };

    if (chatId) {
      fetchChat();
    }
  }, [chatId, navigate, setActiveChat, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (content) => {
    if (!content.trim() || loading) return;
    if (!chatId) {
      setError("No active chat selected");
      return;
    }

    setError(null);

    const userMessage = { role: "user", content, timestamp: new Date() };
    addMessage(userMessage);
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(chatId, content);
      const updatedMessages = response.data.messages;
      if (Array.isArray(updatedMessages)) {
        setMessages(updatedMessages);
      } else {
        const aiMessage =
          response.data.messages?.[response.data.messages.length - 1];
        if (aiMessage) addMessage(aiMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const statusCode = error.response?.status;
      const errorData = error.response?.data;

      let errorMessage = "Sorry, I encountered an error. Please try again.";

      if (
        statusCode === 429 ||
        errorData?.error?.includes?.("quota") ||
        errorData?.error?.includes?.("rate")
      ) {
        errorMessage =
          "⚠️ API quota exceeded. The free tier limit (20 requests/day) has been reached. Please try again tomorrow or use a different API key.";
      } else if (statusCode === 500) {
        errorMessage = "Server error. Please try again in a moment.";
      }

      setError(errorMessage);
      addMessage({
        role: "assistant",
        content: errorMessage,
        timestamp: new Date(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async (messageId) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await chatAPI.regenerateMessage(chatId, messageId);
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error regenerating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${isDark ? "bg-black" : "bg-gray-50"}`}
    >
      <Sidebar />

      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header
          className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "bg-black/50 border-white/10" : "bg-white/50 border-black/10"} backdrop-blur-xl`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-md shadow-purple-500/20">
              <Bot size={18} />
            </div>
            <h1
              className={`font-semibold truncate max-w-md ${isDark ? "text-white" : "text-black"}`}
            >
              {activeChat?.title || "New Chat"}
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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {error && (
              <div
                className={`text-sm px-4 py-3 rounded-lg ${isDark ? "bg-white/10 text-gray-200" : "bg-black/10 text-gray-700"}`}
              >
                {error}
              </div>
            )}
            <AnimatePresence>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  message={message}
                  onRegenerate={() => handleRegenerate(message._id)}
                  isDark={isDark}
                />
              ))}
            </AnimatePresence>

            {loading && <TypingIndicator isDark={isDark} />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div
          className={`p-4 border-t ${isDark ? "border-white/10 bg-black/50" : "border-black/10 bg-white/50"} backdrop-blur-xl`}
        >
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSend={handleSendMessage}
              loading={loading}
              isDark={isDark}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
