import { motion } from "framer-motion";
import { MessageSquare, Code, Lightbulb, FileText } from "lucide-react";

const suggestions = [
  {
    icon: MessageSquare,
    title: "Explain a concept",
    prompt: "Explain quantum computing in simple terms",
  },
  {
    icon: Code,
    title: "Help with code",
    prompt: "Write a Python function to sort a list",
  },
  {
    icon: Lightbulb,
    title: "Brainstorm ideas",
    prompt: "Give me 5 creative project ideas for a portfolio",
  },
  {
    icon: FileText,
    title: "Write content",
    prompt: "Help me write a professional email to my boss",
  },
];

export function PromptSuggestions({ onSelect, isDark }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(suggestion.prompt)}
          className={`group p-4 rounded-2xl text-left transition-all ${
            isDark
              ? "bg-white/5 hover:bg-violet-500/10 border border-white/10 hover:border-violet-500/30"
              : "bg-gray-50 hover:bg-violet-50 border border-gray-200 hover:border-violet-300"
          } hover:shadow-lg hover:shadow-purple-500/10`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-xl transition-colors ${
                isDark
                  ? "bg-white/10 group-hover:bg-violet-500/20"
                  : "bg-violet-100 group-hover:bg-violet-200"
              }`}
            >
              <suggestion.icon
                size={18}
                className={
                  isDark
                    ? "text-white group-hover:text-violet-300"
                    : "text-violet-600"
                }
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`font-medium text-sm mb-1 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {suggestion.title}
              </h3>
              <p
                className={`text-xs truncate ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {suggestion.prompt}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
