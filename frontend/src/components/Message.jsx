import { motion } from "framer-motion";
import { User, Bot, Copy, Check } from "lucide-react";
import { useState } from "react";

export function Message({ message, isDark }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-md shadow-purple-500/20"
        >
          <Bot size={16} />
        </motion.div>
      )}

      <div className={`group max-w-[70%] relative`}>
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-br-md shadow-md shadow-purple-500/20"
              : isDark
                ? "bg-white/10 text-white rounded-bl-md border border-white/5"
                : "bg-gray-100 text-gray-800 rounded-bl-md border border-gray-200"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </motion.div>

        {/* Copy button - always visible below message */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className={`mt-1 flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors ${
            isUser ? "ml-auto" : "mr-auto"
          } ${
            copied
              ? "text-green-500"
              : isDark
                ? "hover:bg-white/10 text-gray-500 hover:text-white"
                : "hover:bg-black/5 text-gray-400 hover:text-black"
          }`}
        >
          {copied ? (
            <>
              <Check size={12} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </motion.button>
      </div>

      {isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-fuchsia-600 to-pink-600 shadow-md shadow-fuchsia-500/20"
        >
          <User size={16} className="text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}
