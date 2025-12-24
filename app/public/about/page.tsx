"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Download, Code, Cpu, Sparkles, Terminal, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface About {
  _id: string;
  title: string;
  shortBio: string;
  longBio: string;
  email: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
  profileImageUrl?: string;
  highlights?: string[];
}

// Animated floating coding icons component
const FloatingCodeIcons = () => {
  const icons = [
    { icon: <Code className="w-4 h-4" />, color: "text-purple-400" },
    { icon: <Terminal className="w-4 h-4" />, color: "text-blue-400" },
    { icon: <Cpu className="w-4 h-4" />, color: "text-cyan-400" },
    { icon: <Zap className="w-4 h-4" />, color: "text-green-400" },
    { icon: <Sparkles className="w-4 h-4" />, color: "text-pink-400" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const size = Math.random() * 24 + 8;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className={`absolute ${randomIcon.color} opacity-20`}
            style={{ left: `${left}%`, top: '-50px' }}
            initial={{ y: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: ['0vh', '100vh'],
              rotate: 360,
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {randomIcon.icon}
          </motion.div>
        );
      })}
    </div>
  );
};

// Binary rain effect component
const BinaryRain = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 15 + 10;
        
        return (
          <motion.div
            key={i}
            className="absolute text-green-400/20 font-mono text-sm"
            style={{ left: `${left}%` }}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: '100vh',
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
            {Math.random() > 0.5 ? '1' : '0'}
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.div>
        );
      })}
    </div>
  );
};

// Animated border component
const AnimatedBorder = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20">
      <div className="absolute inset-0 rounded-2xl">
        <div className="absolute -top-[2px] -left-[2px] -right-[2px] -bottom-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-0 animate-pulse" />
      </div>
      {children}
    </div>
  );
};

// Typing animation component
const TypingAnimation = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      whileInView={{ opacity: 1, width: "auto" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeInOut" }}
      className="overflow-hidden whitespace-nowrap"
    >
      {text}
    </motion.div>
  );
};

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/about", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (res.status === 404) {
        setError("About information not found");
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setAbout(data);
    } catch (error) {
      console.error("Failed to load about:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load about information"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050914] via-[#080f1f] to-[#0b1224] flex justify-center items-center py-24 relative overflow-hidden">
        <FloatingCodeIcons />
        <BinaryRain />
        <div className="text-center relative z-10">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="rounded-full h-16 w-16 border-2 border-purple-500/30 mx-auto mb-4 relative"
          >
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-blue-500 animate-spin" style={{ animationDirection: 'reverse' }} />
          </motion.div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-300 font-mono"
          >
            Loading<span className="animate-pulse">...</span>
          </motion.p>
        </div>
      </div>
    );
  }

  if (error || !about) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050914] via-[#080f1f] to-[#0b1224] relative overflow-hidden">
        <FloatingCodeIcons />
        <BinaryRain />
        <section className="py-24 px-6 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="inline-block p-4 bg-red-500/10 rounded-2xl mb-4">
                <Terminal className="w-12 h-12 text-red-400 mx-auto" />
              </div>
            </motion.div>
            <p className="text-red-400 mb-4 font-mono">{error || "About information not available."}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadAbout}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-medium flex items-center gap-2 mx-auto"
            >
              <Zap className="w-4 h-4" />
              Retry Connection
            </motion.button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050914] via-[#080f1f] to-[#0b1224] text-foreground relative overflow-hidden">
      <FloatingCodeIcons />
      <BinaryRain />
      
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

        <section id="about" className="py-24 px-6 relative z-10">
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Code className="w-8 h-8 text-purple-500" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                <TypingAnimation text="About Me" />
              </h2>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Sparkles className="w-4 h-4" />
              <TypingAnimation text="Get to know me better" delay={0.3} />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-300 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              {about.shortBio}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Image and Contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <AnimatedBorder>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl overflow-hidden border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent"
                >
                  {about.profileImageUrl && (
                    <motion.img
                      src={about.profileImageUrl}
                      alt={about.title}
                      className="w-full h-80 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </AnimatedBorder>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4 relative overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500" />
                <motion.div
                  animate={{
                    background: isHovering
                      ? [
                          "linear-gradient(90deg, rgba(168,85,247,0.1) 0%, rgba(59,130,246,0.1) 100%)",
                          "linear-gradient(90deg, rgba(168,85,247,0.2) 0%, rgba(59,130,246,0.2) 100%)",
                        ]
                      : "linear-gradient(90deg, rgba(168,85,247,0.1) 0%, rgba(59,130,246,0.1) 100%)",
                  }}
                  className="absolute inset-0 -z-10"
                />
                
                <h3 className="font-semibold text-lg mb-4 text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-500" />
                  Contact Information
                </h3>

                <motion.a
                  href={`mailto:${about.email}`}
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-purple-400 transition-all group p-3 rounded-lg hover:bg-white/5"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                  <span className="break-all">{about.email}</span>
                </motion.a>

                {about.phone && (
                  <motion.a
                    href={`tel:${about.phone}`}
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-purple-400 transition-all group p-3 rounded-lg hover:bg-white/5"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                    <span>{about.phone}</span>
                  </motion.a>
                )}

                {about.location && (
                  <motion.div
                    className="flex items-start gap-3 text-sm text-gray-300 p-3 rounded-lg"
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span>{about.location}</span>
                  </motion.div>
                )}

                {about.resumeUrl && (
                  <motion.a
                    href={about.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-medium text-sm w-full justify-center mt-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </motion.a>
                )}
              </motion.div>
            </motion.div>

            {/* Right Side - Bio and Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-y-16 translate-x-16 blur-3xl" />
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-4 text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                >
                  {about.title}
                </motion.h3>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-8"
                />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line font-light">
                    {about.longBio}
                  </p>
                </motion.div>
              </div>

              {about.highlights && about.highlights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
                >
                  <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Key Highlights
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {about.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white/2.5 hover:bg-white/5 transition-all group"
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                          className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0"
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors">
                          {h}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}