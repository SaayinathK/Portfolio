"use client";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next"

  import { useEffect, useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  
  interface About {
    firstName?: string;
    lastName?: string;
    title: string;
    shortBio: string;
    longBio: string;
    email: string;
    phone?: string;
    location?: string;
    resumeUrl?: string;
    profileImageUrl?: string;
    highlights?: string[];
    motto?: string;
  }

  async function getData<T = any>(url: string): Promise<T | null> {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  }

  // Import missing icon components
  import { User, MapPin, Phone, Mail, Copy, Linkedin, Github, Instagram, Facebook, Code2, ArrowRight, Download, FileText, Palette, Brain, Shield, ChevronLeft, ChevronRight } from "lucide-react";

  const Typewriter = ({ text, delay, className }: { text: string; delay: number; className?: string }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, delay);

      return () => clearInterval(interval);
    }, [text, delay]);

    return <span className={className}>{displayedText}</span>;
  };

  // Add the main AboutPage component
  export default function AboutPage() {
    const [about, setAbout] = useState<About | null>(null);
    const [contact, setContact] = useState<any[]>([]);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    useEffect(() => {
      // Replace with your actual API endpoints or static data
      getData<About>("/api/about").then(data => {
        if (data) {
          setAbout({
            ...data,
            highlights: Array.isArray(data.highlights) ? data.highlights : [],
          });
        } else {
          setAbout(null);
        }
      });
      getData<any[]>("/api/contact").then(data => setContact(Array.isArray(data) ? data : []));
    }, []);

    return (
      <main className="min-h-screen bg-black text-foreground overflow-hidden relative">
        {/* Animated Background Elements */}
                
          {/* About Section - Hero Layout */}
          <motion.section id="about" className="scroll-mt-24 relative">
            {!about ? (
              <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
                <div className="w-80 h-80 rounded-3xl bg-gray-800 animate-pulse" />
                <div className="space-y-4 flex-1">
                  <div className="h-12 w-3/4 bg-gray-700 rounded animate-pulse" />
                  <div className="h-8 w-1/2 bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            ) : (
              <>
                {/* Animated Floating Code Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -100, opacity: 0 }}
                      animate={{
                        y: [null, window.innerHeight + 100],
                        opacity: [0, 0.8, 0],
                        x: Math.sin(i * 0.5) * 50
                      }}
                      transition={{
                        duration: 20 + Math.random() * 10,
                        delay: i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear"
                      }}
                      className="absolute text-xs text-green-400/30 font-mono whitespace-nowrap"
                      style={{ left: `${(i * 8) % 100}%` }}
                    >
                      {['<div>', 'const', 'function()', 'export', 'import', 'return', '=>', '{}', '[]', '();'][i % 10]}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-center justify-between">
                  {/* Profile Image - clean layout */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="relative flex-shrink-0"
                  >
                    <div className="relative w-50 h-50 sm:w-100 sm:h-80 md:w-120 md:h-[50rem] lg:w-250 lg:h-[40rem] rounded-3xl overflow-hidden">
                      {about.profileImageUrl ? (
                        <Image
                          src={about.profileImageUrl}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          width={400}
                          height={400}
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <User size={120} className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="absolute -bottom-4 -right-4 bg-gray-900/90 text-white px-6 py-3 rounded-full text-sm font-semibold border border-gray-800">
                      <span className="animate-pulse">❤️</span> Available for opportunities
                    </div>
                  </motion.div>

                  {/* Info & CTA - Right Side with typing animation */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 space-y-6 relative"
                  >
                    {/* Name & Title with typewriter effect */}
                    <div className="relative">
                      <motion.p
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-gray-700 to-gray-600"
                      />
                      
                      <p className="text-sm text-gray-400 font-mono mb-2 flex items-center gap-2">
                        <span className="animate-pulse">▶ // about_me.js</span>
                        <span className="text-green-400 text-xs ml-auto">running...</span>
                      </p>
                      
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl md:text-6xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
                      >
                        {about?.firstName || "Your"}
                        <span>{about?.lastName ? ` ${about.lastName}` : " Name"}</span>
                      </motion.h1>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="inline-block mb-4"
                      >
                        <p className="text-xl text-gray-400 font-mono bg-gray-900/50 px-4 py-3 rounded-lg border-l-4 border-gray-600">
                          <span className="text-gray-300">&lt;</span>
                          <Typewriter
                            text={about.title || "React Native / Flutter Developer"}
                            delay={50}
                            className="text-gray-200"
                          />
                          <span className="text-gray-300">/&gt;</span>
                          <span className="ml-2 animate-pulse">|</span>
                        </p>
                      </motion.div>
                      
                      {/* Description */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-gray-400 text-sm leading-relaxed"
                      >
                        {about.shortBio}
                      </motion.div>
                    </div>

                    {/* Contact Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-3"
                    >
                      <div className="flex flex-wrap gap-3">
                        {about.location && (
                          <motion.div
                            whileHover={{ scale: 1.05, y: -3 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm text-gray-300 group cursor-pointer"
                          >
                            <MapPin size={18} />
                            <span>{about.location}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">📍</span>
                          </motion.div>
                        )}
                        
                        {about.phone && (
                          <motion.div
                            whileHover={{ scale: 1.05, y: -3 }}
                            onClick={async (e) => {
                              e.stopPropagation();
                              await navigator.clipboard.writeText(about.phone || '');
                              setCopiedField && setCopiedField('aboutPhone');
                              setTimeout(() => setCopiedField && setCopiedField(null), 1200);
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm text-gray-300 group cursor-pointer"
                          >
                            <Phone size={18} />
                            <span className="font-mono flex items-center gap-2">
                              {about.phone}
                              {copiedField === 'aboutPhone' && (
                                <span className="text-xs text-blue-300 ml-2 animate-pulse">Copied!</span>
                              )}
                            </span>
                            <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        )}
                        
                        {about.email && (
                          <motion.div
                            whileHover={{ scale: 1.05, y: -3 }}
                            onClick={async (e) => {
                              e.stopPropagation();
                              await navigator.clipboard.writeText(about.email);
                              setCopiedField && setCopiedField('aboutEmail');
                              setTimeout(() => setCopiedField && setCopiedField(null), 1200);
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm text-gray-300 group cursor-pointer"
                          >
                            <Mail size={18} />
                            <span className="font-mono text-sm flex items-center gap-2">
                              {about.email}
                              {copiedField === 'aboutEmail' && (
                                <span className="text-xs text-cyan-300 ml-2 animate-pulse">Copied!</span>
                              )}
                            </span>
                            <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Social Media Icons */}
                      {contact.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                          className="flex gap-3"
                        >
                          {Array.isArray(contact) && contact.length > 0 && contact[0].linkedin && (
                            <motion.a
                              whileHover={{ scale: 1.1, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              href={contact[0].linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-blue-400 hover:border-blue-500/50 transition-all"
                            >
                              <Linkedin size={20} />
                            </motion.a>
                          )}
                          
                          {Array.isArray(contact) && contact.length > 0 && contact[0].github && (
                            <motion.a
                              whileHover={{ scale: 1.1, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              href={contact[0].github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-white hover:border-gray-500/50 transition-all"
                            >
                              <Github size={20} />
                            </motion.a>
                          )}
                          
                          {Array.isArray(contact) && contact.length > 0 && contact[0].instagram && (
                            <motion.a
                              whileHover={{ scale: 1.1, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              href={contact[0].instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-pink-400 hover:border-pink-500/50 transition-all"
                            >
                              <Instagram size={20} />
                            </motion.a>
                          )}
                          
                          {Array.isArray(contact) && contact.length > 0 && contact[0].facebook && (
                            <motion.a
                              whileHover={{ scale: 1.1, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              href={contact[0].facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-blue-500 hover:border-blue-600/50 transition-all"
                            >
                              <Facebook size={20} />
                            </motion.a>
                          )}
                        </motion.div>
                      )}
                    </motion.div>

                    {/* CTA Buttons with enhanced effects - Responsive for mobile */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="flex flex-col md:flex-row gap-4 pt-6 flex-wrap w-full"
                    >
                      <motion.a
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        href="#projects"
                        className="relative w-full md:w-auto px-8 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group overflow-hidden backdrop-blur-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <Code2 size={18} />
                        View My Work
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </motion.a>

                      {/* Attractive Resume Button - Responsive */}
                      <motion.a
                        whileHover={{ scale: 1.07, rotate: [0, -2, 2, 0] }}
                        whileTap={{ scale: 0.97 }}
                        href={about?.resumeUrl?.startsWith("data:") 
                          ? about.resumeUrl 
                          : `data:application/pdf;base64,${about?.resumeUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full md:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white font-bold shadow-lg border-2 border-blue-500/30 hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center justify-center gap-3 group overflow-hidden backdrop-blur-sm"
                        style={{ boxShadow: "0 4px 24px 0 rgba(34,211,238,0.15)" }}
                        aria-label="View Resume"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Download size={20} className="text-white drop-shadow" />
                        </motion.div>
                        <span className="relative z-10">View Resume</span>
                      </motion.a>

                      <motion.a
                        whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                        whileTap={{ scale: 0.95 }}
                        href="#contact"
                        className="relative w-full md:w-auto px-8 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Download size={18} />
                        </motion.div>
                        Contact Me
                        <span className="ml-1 group-hover:scale-125 transition-transform">→</span>
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>
              </>
            )}
            
            {/* Bio & Skills Cards Below */}
            {about && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-24 space-y-12 relative"
              >
                {/* Animated binary rain background */}
                <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -100, opacity: 0 }}
                      animate={{
                        y: [null, 600],
                        opacity: [0, 0.4, 0]
                      }}
                      transition={{
                        duration: 10 + Math.random() * 10,
                        delay: i * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear"
                      }}
                      className="absolute text-xs text-gray-400/20 font-mono whitespace-nowrap"
                      style={{ left: `${(i * 5) % 100}%` }}
                    >
                      {Math.random() > 0.5 ? '1' : '0'}
                    </motion.div>
                  ))}
                </div>

                {/* Two-column layout: Left = Bio, Right = Motto + Skills */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left: Bio Section with Interactive Code Editor */}
                  <div className="space-y-4">
                    <div className="bg-black border border-gray-800 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FileText size={20} className="text-gray-400" />
                          <span className="text-gray-300 font-mono">bio.ad</span>
                        </div>
                        
                      </div>

                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-300 pl-4 border-l-2 border-gray-600/50 hover:border-gray-600/90 transition-all group whitespace-pre-line"
                      >
                        {about.longBio}
                      </motion.p>
                    </div>
                  </div>

                  {/* Right: Motto terminal + Skill cards stacked */}
                  <div className="space-y-8">
                    {/* Interactive Code Motto Terminal */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative bg-black border border-gray-800 rounded-2xl p-6 font-mono text-sm backdrop-blur-sm overflow-hidden group"
                    >
                      {/* Terminal header */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-500/70" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                          <div className="w-3 h-3 rounded-full bg-green-500/70" />
                        </div>
                        <span className="text-gray-400 text-xs">terminal — motto.js</span>
                        <div className="ml-auto flex items-center gap-2">
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            className="w-2 h-2 rounded-full bg-green-500"
                          />
                          <span className="text-green-400 text-xs">● LIVE</span>
                        </div>
                      </div>

                      {/* Typing animation for motto */}
                      <div className="space-y-2">
                        <p className="text-gray-500">$ node motto.js</p>

                        <div className="flex items-start gap-2">
                          <span className="text-green-400">▶</span>
                          <Typewriter
                            text={`const motto = "${about.motto || 'Code with purpose, design with passion'}";`}
                            delay={30}
                            className="text-gray-300"
                          />
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                            className="ml-1"
                          >
                            _
                          </motion.span>
                        </div>

                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                          className="text-gray-200"
                        >
                          $ Output: Executing with passion and precision... 🚀
                        </motion.p>
                      </div>

                      {/* Animated cursor */}
                      <motion.div
                        animate={{
                          top: ["10%", "30%", "50%", "70%", "90%", "10%"],
                          left: ["10%", "80%", "40%", "20%", "60%", "10%"]
                        }}
                        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute w-6 h-6 rounded-full bg-gray-500/10 border border-gray-600/30 pointer-events-none"
                      />
                    </motion.div>

                    {/* Animated Skill Cards with Hover Effects */}
                    <div className="relative">
                      {/* Edge fades for nicer scroll affordance */}
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black via-black/70 to-transparent z-10" />

                      {/* Scroll arrows (fixed, not scrolling) */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const container = document.getElementById("highlights-scroll");
                          if (container) {
                            container.scrollBy({ left: -320, behavior: "smooth" });
                          }
                        }}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 border border-white/20 text-white shadow-lg backdrop-blur-sm hover:bg-white/20 opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const container = document.getElementById("highlights-scroll");
                          if (container) {
                            container.scrollBy({ left: 320, behavior: "smooth" });
                          }
                        }}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 border border-white/20 text-white shadow-lg backdrop-blur-sm hover:bg-white/20 opacity-100"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        id="highlights-scroll"
                        className="group overflow-x-auto pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: "none" }}
                      >
                        <div className="flex gap-4 min-w-full whitespace-nowrap pr-6 snap-x snap-mandatory">
                          {(() => {
                            const defaultSkills = [
                              { icon: <Code2 size={32} key="icon-code2" />, title: "Full-Stack Development", color: "purple", emoji: "⚛️" },
                              { icon: <Palette size={32} key="icon-palette" />, title: "UI/UX Design", color: "pink", emoji: "🎨" },
                              { icon: <Brain size={32} key="icon-brain" />, title: "AI & Machine Learning", color: "cyan", emoji: "🤖" },
                              { icon: <Shield size={32} key="icon-shield" />, title: "Network Security", color: "green", emoji: "🔒" }
                            ];
                            const palette = {
                              icons: [<Code2 size={32} key="icon-code2" />, <Palette size={32} key="icon-palette" />, <Brain size={32} key="icon-brain" />, <Shield size={32} key="icon-shield" />],
                              colors: ["purple", "pink", "cyan", "green"],
                              emojis: ["⚛️", "🎨", "🤖", "🔒"],
                            };
                            const highlightSkills = (about?.highlights || [])
                              .filter((h) => h && h.trim())
                              .map((title, index) => ({
                                icon: palette.icons[index % palette.icons.length],
                                title: title.trim(),
                                color: palette.colors[index % palette.colors.length],
                                emoji: palette.emojis[index % palette.emojis.length],
                              }));
                            const skillsToShow = highlightSkills.length > 0 ? highlightSkills : defaultSkills;
                            return skillsToShow.map((skill, index) => (
                              <motion.div
                                key={skill.title + index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                  y: -10,
                                  scale: 1.05,
                                  transition: { type: "spring", stiffness: 300 }
                                }}
                                className="relative p-6 rounded-2xl border border-gray-800 bg-black backdrop-blur-sm group overflow-hidden cursor-pointer min-w-[260px] snap-start"
                              >
                                {/* Animated gradient border */}
                                <div key="gradient-border" className={`absolute inset-0 bg-gradient-to-br from-gray-800/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                {/* Hover shine effect */}
                                <div key="shine-effect" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <div className="relative">
                                  <motion.div
                                    key="icon"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                                    className={`text-${skill.color}-400 mb-4 inline-block`}
                                  >
                                    {skill.icon}
                                  </motion.div>
                                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                                    {skill.title}
                                    <motion.span
                                      key="emoji"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                                      className="text-lg"
                                    >
                                      {skill.emoji}
                                    </motion.span>
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <div key="bar-bg" className={`h-1 flex-1 bg-${skill.color}-500/20 rounded-full overflow-hidden`}>
                                      <motion.div
                                        key="bar"
                                        initial={{ width: "0%" }}
                                        whileInView={{ width: `${70 + index * 10}%` }}
                                        transition={{ duration: 1, delay: index * 0.2 }}
                                        className={`h-full bg-gradient-to-r from-${skill.color}-500 to-${skill.color}-300`}
                                      />
                                    </div>
                                    <span key="percent" className={`text-xs text-${skill.color}-400 font-mono`}>
                                      {70 + index * 10}%
                                    </span>
                                  </div>
                                </div>
                                <motion.div
                                  key="emoji-bg"
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  className="absolute -bottom-2 -right-2 text-4xl opacity-20"
                                >
                                  {skill.emoji}
                                </motion.div>
                              </motion.div>
                            ));
                          })()}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
            )}
          </motion.section>

        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </main>
    );
  }