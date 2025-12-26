"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight, Trophy, Award, Medal } from "lucide-react";
import React from "react";

// Define your types
interface Achievement {
  _id?: string;
  title?: string;
  name?: string;
  organization?: string;
  year?: string;
  date?: string;
  imageUrl?: string;
  description?: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  codeComment: string;
}

// Dummy SectionHeader for demo; replace with your actual SectionHeader component if needed
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, codeComment }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-white">{title}</h2>
    <p className="text-blue-300">{subtitle}</p>
    <span className="text-xs text-gray-500">{codeComment}</span>
  </div>
);

const AchievementsPage: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch("/api/achievements");
        const data = await res.json();
        setAchievements(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false); // <-- Always set loading to false after fetch
      }
    }
    fetchAchievements();
  }, []);

  return (
    <motion.section 
      id="achievements"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="scroll-mt-20"
    >
      <SectionHeader 
        title=""
        subtitle=""
        codeComment=""
      />
      
      {loading ? (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="flex-shrink-0 w-80 h-64 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="relative group">
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const container = document.getElementById("achievements-scroll");
              if (container) {
                container.scrollBy({
                  left: -420,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-blue-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Scrollable Achievements */}
          <div
            id="achievements-scroll"
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {achievements
              .sort((a, b) => {
                const yearA = parseInt(a.year || a.date?.split('-')[0] || '0');
                const yearB = parseInt(b.year || b.date?.split('-')[0] || '0');
                return yearB - yearA;
              })
              .map((a, i) => {
              const Icon = i % 3 === 0 ? Trophy : i % 3 === 1 ? Award : Medal;
              const colorScheme = { border: "border-gray-500/30", bg: "from-blue-500/10", iconBg: "from-blue-500/20 to-cyan-500/20", glow: "from-blue-600/20 to-cyan-600/20", icon: "text-blue-400" };

              return (
                <motion.article
                  key={a._id || a.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.08,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ 
                    y: -12,
                    scale: 1.02,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className={`flex-shrink-0 w-80 group/card relative rounded-3xl border-2 ${colorScheme.border} bg-gradient-to-br ${colorScheme.bg} to-transparent backdrop-blur-md p-8 overflow-hidden cursor-pointer`}
                >

                  {/* Achievement Image */}
                  {a.imageUrl && (
                    <div className="mb-4 -mx-4 -mt-4">
                      <Image
                        src={a.imageUrl}
                        alt={a.title || "Achievement"}
                        className="w-full h-80 object-cover rounded-2xl border border-blue-500/10 shadow"
                        width={320}
                        height={320}
                      />
                    </div>
                  )}

                  {/* Animated background glow */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${colorScheme.glow} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Icon with pulsing effect */}

                  <motion.div 
                    className="relative mb-0 flex items-center gap-3" // changed from inline-flex to flex, added gap
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                     <motion.div 
                      className={`absolute inset-0 rounded-2xl blur-xl`}
                      style={{ background: `radial-gradient(circle, ${colorScheme.icon.includes('blue') ? 'rgba(59, 130, 246, 0.3)' : colorScheme.icon.includes('cyan') ? 'rgba(34, 211, 238, 0.3)' : 'rgba(14, 165, 233, 0.3)'})` }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      }}
                    />
                    <h3 className="text-xl font-bold text-white mb-1 group-hover/card:text-blue-300 transition-colors line-clamp-2 relative z-10">
                      {a.title || a.name || "Achievement"}
                    </h3>
                  </motion.div>

                  {/* Organization (if available) */}
                    {a.organization && (
                      <div className="text-sm text-blue-200 mb-2 font-medium truncate">
                        {a.organization}
                      </div>
                    )}

                  {/* Content */}
                  <div className="relative z-10">
                                      
                    {/* Date badge */}
                    {(a.year || a.date) && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 w-fit"
                      >
                        <Calendar size={14} className="text-blue-400" />
                        <span className="text-xs font-semibold text-blue-300">{a.year || a.date}</span>
                      </motion.div>
                    )}
                    
                    {/* Description */}
                    {a.description && (
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                        {a.description}
                      </p>
                    )}

                    {/* Bottom accent line */}
                    <motion.div 
                      className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 rounded-full mt-6"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                    />
                  </div>
                  
                  {/* Enhanced floating particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(5)].map((_, idx) => (
                      <motion.div
                        key={idx}
                        className="absolute h-1.5 w-1.5 rounded-full bg-blue-400/40"
                        initial={{ 
                          x: Math.random() * 100 + '%',
                          y: '100%',
                          opacity: 0
                        }}
                        animate={{ 
                          y: '-20%',
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0]
                        }}
                        transition={{
                          duration: 3,
                          delay: idx * 0.4,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 2,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const container = document.getElementById("achievements-scroll");
              if (container) {
                container.scrollBy({
                  left: 420,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-blue-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      )}
      {/* Hide scrollbars */}
      <style jsx global>{`
        .no-scrollbar {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
    </motion.section>
  );
};

export default AchievementsPage;