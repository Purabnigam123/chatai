import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

export function ChatInput({ onSend, loading, isDark }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={`flex items-end gap-3 p-3 rounded-2xl ${isDark ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/10"}`}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          disabled={loading}
          className={`flex-1 resize-none bg-transparent focus:outline-none text-sm leading-relaxed max-h-[200px] ${isDark ? "text-white placeholder-gray-500" : "text-black placeholder-gray-400"} disabled:opacity-50`}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!message.trim() || loading}
          className={`p-3 rounded-xl transition-all flex-shrink-0 ${
            message.trim() && !loading
              ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-md shadow-purple-500/25"
              : isDark
                ? "bg-white/10 text-gray-500"
                : "bg-gray-200 text-gray-400"
          } disabled:cursor-not-allowed`}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={18} />
            </motion.div>
          ) : (
            <Send size={18} />
          )}
        </motion.button>
      </div>
      <p
        className={`text-xs text-center mt-3 ${isDark ? "text-gray-600" : "text-gray-400"}`}
      >
        ChatAI can make mistakes. Consider checking important information.
      </p>
    </form>
  );
}
