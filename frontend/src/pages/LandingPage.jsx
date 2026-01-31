import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  Zap,
  Shield,
  ArrowRight,
  Moon,
  Sun,
  Bot,
  Brain,
  Code,
  Lightbulb,
  Flame,
  TrendingUp,
  CheckCircle2,
  Star,
  Rocket,
  Cpu,
} from "lucide-react";
import { useThemeStore } from "../store";

const features = [
  {
    icon: Brain,
    title: "Advanced AI",
    description:
      "Powered by cutting-edge language models for intelligent conversations",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant responses with our optimized infrastructure",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your conversations are encrypted and never shared",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Code,
    title: "Code Assistant",
    description:
      "Get help with coding, debugging, and learning new technologies",
    color: "from-purple-500 to-pink-500",
  },
];

const benefits = [
  { icon: CheckCircle2, text: "24/7 Availability" },
  { icon: Flame, text: "Real-time Processing" },
  { icon: TrendingUp, text: "Continuous Learning" },
  { icon: Rocket, text: "Instant Deployment" },
];

const floatingWords = [
  "Create",
  "Explore",
  "Learn",
  "Build",
  "Imagine",
  "Discover",
];

export function LandingPage() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useThemeStore();
  const [currentWord, setCurrentWord] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % floatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {/* Film Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated Background Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 ${isDark ? "opacity-30" : "opacity-15"}`}
        >
          {/* Mouse follow gradient */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
              left: mousePosition.x - 300,
              top: mousePosition.y - 300,
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Grid pattern */}
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d={`M 60 0 L 0 0 0 60`}
                  fill="none"
                  stroke={
                    isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
                  }
                  strokeWidth="0.5"
                />
              </pattern>
              <linearGradient id="gridFade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="30%" stopColor="white" stopOpacity="1" />
                <stop offset="70%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="gridMask">
                <rect width="100%" height="100%" fill="url(#gridFade)" />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#grid)"
              mask="url(#gridMask)"
            />
          </svg>
        </div>

        {/* Floating Particles - Enhanced */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0
                ? `w-2 h-2 ${isDark ? "bg-violet-400/60" : "bg-violet-500/40"}`
                : i % 3 === 1
                  ? `w-1.5 h-1.5 ${isDark ? "bg-fuchsia-400/50" : "bg-fuchsia-500/30"}`
                  : `w-1 h-1 ${isDark ? "bg-white/40" : "bg-black/20"}`
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40 - Math.random() * 30, 0],
              x: [0, (Math.random() - 0.5) * 20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl ${isDark ? "bg-black/50 border-white/10" : "bg-white/50 border-black/10"} border-b`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Bot size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">ChatAI</span>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`relative flex items-center gap-1 p-1 rounded-full ${isDark ? "bg-white/10" : "bg-black/10"} transition-colors`}
            >
              <motion.div
                className={`absolute w-8 h-8 rounded-full ${isDark ? "bg-violet-500" : "bg-amber-400"}`}
                animate={{ x: isDark ? 0 : 36 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              <div
                className={`relative z-10 w-8 h-8 flex items-center justify-center ${isDark ? "text-white" : "text-gray-500"} transition-colors`}
              >
                <Moon size={16} />
              </div>
              <div
                className={`relative z-10 w-8 h-8 flex items-center justify-center ${!isDark ? "text-white" : "text-gray-500"} transition-colors`}
              >
                <Sun size={16} />
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className={`px-5 py-2 rounded-full font-medium ${isDark ? "border border-white/30 hover:bg-white/10" : "border border-black/30 hover:bg-black/10"} transition-all`}
            >
              Sign In
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight"
          >
            <span className={`${isDark ? "text-white" : "text-gray-900"}`}>
              The Future of
            </span>
            <br />
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 90 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
                >
                  {floatingWords[currentWord]}
                </motion.span>
              </AnimatePresence>

              {/* Animated background glow */}
              <motion.div
                className="absolute -inset-2 rounded-lg blur-2xl opacity-30 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 -z-10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Experience the power of advanced AI. Create, explore, and learn with
            an intelligent assistant that understands you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="group relative px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white overflow-hidden shadow-lg shadow-purple-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className={`px-8 py-4 rounded-full font-semibold text-lg ${isDark ? "border-2 border-white/30 hover:border-white/60 hover:bg-white/5" : "border-2 border-black/30 hover:border-black/60 hover:bg-black/5"} transition-all`}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Animated Chat Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 relative"
          >
            <div
              className={`relative mx-auto max-w-3xl rounded-2xl ${isDark ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/10"} backdrop-blur-xl p-6 overflow-hidden`}
            >
              {/* Glowing Effect */}
              <div
                className={`absolute -inset-1 rounded-2xl blur-xl opacity-30 ${isDark ? "bg-gradient-to-r from-white/20 via-transparent to-white/20" : "bg-gradient-to-r from-black/10 via-transparent to-black/10"}`}
              />

              <div className="relative space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className={`flex justify-end`}
                >
                  <div className="px-5 py-3 rounded-2xl rounded-br-md max-w-xs bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-500/20">
                    What can you help me with?
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex gap-3"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-white/10" : "bg-black/10"}`}
                  >
                    <Bot size={18} />
                  </div>
                  <div
                    className={`px-5 py-3 rounded-2xl rounded-bl-md ${isDark ? "bg-white/10" : "bg-black/10"}`}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      I can help you with coding, writing, research, creative
                      projects, and so much more! ✨
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose ChatAI?
            </h2>
            <p
              className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Built for the future, designed for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group relative p-6 rounded-2xl ${isDark ? "bg-white/5 border border-white/10 hover:border-white/30" : "bg-black/5 border border-black/10 hover:border-black/30"} transition-all duration-300 overflow-hidden`}
              >
                {/* Gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${feature.color}`}
                  whileHover={{ opacity: 0.15 }}
                  transition={{ duration: 0.3 }}
                />

                <div
                  className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center relative z-10 ${isDark ? "bg-white/10 group-hover:bg-white group-hover:text-black" : "bg-black/10 group-hover:bg-black group-hover:text-white"} transition-all duration-300`}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    <feature.icon size={24} />
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">
                  {feature.title}
                </h3>
                <p
                  className={`relative z-10 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {feature.description}
                </p>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    border: "2px solid transparent",
                    backgroundClip: "padding-box",
                  }}
                  whileHover={{
                    boxShadow: `0 0 20px ${feature.color}`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className={`relative rounded-2xl p-8 ${isDark ? "bg-white/5" : "bg-black/5"} border border-transparent bg-clip-padding`}
            style={{
              backgroundImage: `linear-gradient(${isDark ? "rgb(0,0,0)" : "rgb(255,255,255)"}, ${isDark ? "rgb(0,0,0)" : "rgb(255,255,255)"}), linear-gradient(90deg, #a855f7, #ec4899, #8b5cf6)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { number: "100+", label: "Active Users" },
                { number: "50M+", label: "Messages Processed" },
                { number: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                    className="mb-4"
                  >
                    <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {stat.number}
                    </p>
                  </motion.div>
                  <p
                    className={`text-lg font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2
            className={`text-4xl md:text-6xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Start creating with AI
          </h2>
          <p
            className={`text-xl mb-10 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Free to use. Easy to try. Just ask and ChatAI can help with writing,
            learning, brainstorming and more.
          </p>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/signup")}
            className="group px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
          >
            Start now — it's free
            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 px-6 border-t ${isDark ? "border-white/10" : "border-black/10"}`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <span className="font-semibold">ChatAI</span>
          </div>
          <p
            className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}
          >
            © 2026 ChatAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
