import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export function TypingIndicator({ isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-4 items-start"
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-md shadow-purple-500/20">
        <Bot size={16} />
      </div>

      <div
        className={`px-4 py-3 rounded-2xl rounded-bl-md ${
          isDark ? "bg-white/10" : "bg-black/10"
        }`}
      >
        <div className="flex gap-1.5 items-center h-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
