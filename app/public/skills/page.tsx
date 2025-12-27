"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Globe, Zap, Code2, Database, Wrench, Shield, Package } from "lucide-react";
import React from "react";

interface Skill {
  _id?: string;
  name: string;
  type: string;
  subtype?: string;
  language?: string;
  languageProficiency?: string;
}

const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Group Technical Skills by subtype
  const technicalSkills = skills.filter((skill) => skill.type === "Technical Skills");
  const groupedTechnicalSkills = technicalSkills.reduce(
    (acc, skill) => {
      const subtype = skill.subtype || "Other";
      if (!acc[subtype]) acc[subtype] = [];
      acc[subtype].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
  
  const TypingLabel = ({ text }: { text: string }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="font-mono text-sm text-blue-400 flex items-center"
    >
      {text}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        _
      </motion.span>
    </motion.span>
  );
};

  // Get Languages Spoken
  const languagesSpoken = skills.filter((skill) => skill.type === "Languages Spoken");

  const categoryMeta: Record<string, { icon: React.ReactNode; classes: { border: string; chip: string; iconBg: string; gradient: string } }> = {
    "Mobile Development": {
      icon: <Smartphone className="w-6 h-6" />,
      classes: { 
        border: "border-gray-700/50", 
        chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
        iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
        gradient: "from-gray-800/10 via-black-800/20 to-transparent"
      },
    },
    "Web Development": {
      icon: <Globe className="w-6 h-6" />,
      classes: { 
        border: "border-gray-700/50", 
        chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
        iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
        gradient: "from-gray-800/10 via-black-800/20 to-transparent"
      },
    },
    "Frameworks": {
      icon: <Zap className="w-6 h-6" />,
      classes: { 
        border: "border-gray-700/50", 
        chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
        iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
        gradient: "from-gray-800/10 via-black-800/20 to-transparent"
      },
    },
    "Programming Languages": {
      icon: <Code2 className="w-6 h-6" />,
      classes: { 
        border: "border-gray-700/50", 
        chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
        iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
        gradient: "from-gray-800/10 via-black-800/20 to-transparent"
      },
    },
    "Databases": {
      icon: <Database className="w-6 h-6" />,
      classes: { 
        border: "border-gray-700/50", 
        chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
        iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
        gradient: "from-gray-800/10 via-black-800/20 to-transparent"
      },
    },
    "Tools & Platforms": {
      icon: <Wrench className="w-6 h-6" />,
      classes: { 
        border: "border-gray-700/50", 
        chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
        iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
        gradient: "from-gray-800/10 via-black-800/20 to-transparent"
      },
    },
    "Cybersecurity": {
      icon: <Shield className="w-6 h-6" />,
      classes: { 
        border: "border-gray-700/50", 
        chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
        iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
        gradient: "from-gray-800/10 via-black-800/20 to-transparent"
      },
    },
    Other: {
      icon: <Package className="w-6 h-6" />,
      classes: { 
        border: "border-slate-500/30", 
        chip: "bg-slate-500/10 text-slate-200 border-slate-500/20", 
        iconBg: "bg-gradient-to-br from-slate-500/20 to-slate-600/20 text-slate-300",
        gradient: "from-slate-500/5 via-black-500/10 to-transparent"
      },
    },
  };

  return (
    <motion.section 
      id="skills"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="scroll-mt-20"
    >
      {loading ? (
        <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="h-40 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-20">
          {/* Languages Spoken Section */}
          {languagesSpoken.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative">
                
                <div className="flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
                  {languagesSpoken.map((lang, idx) => (
                    <motion.div
                      key={lang._id || idx}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.1,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.03,
                        transition: { duration: 0.2 },
                      }}
                      className="group relative rounded-2xl p-6 min-w-[260px] border border-gray-800/60 bg-black/70 backdrop-blur-lg transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] hover:border-blue-400"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-black/30 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      />
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div
                            className="w-14 h-14 rounded-xl inline-flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-white/10 shadow-lg group-hover:shadow-blue-400/30 transition-shadow"
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <Globe className="w-7 h-7 text-blue-400 py-0" />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-xl group-hover:text-blue-400 transition-colors py-0">
                              {lang.language}
                            </h4>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mt-2">
                          <div className="flex flex-col w-full">
                            <span className="text-[11px] sm:text-xs text-gray-400 font-mono mt-1 py-1">
                              {lang.languageProficiency || "Not specified"}
                            </span>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: "0%" }}
                                whileInView={{
                                  width:
                                    lang.languageProficiency === "Native or bilingual proficiency"
                                      ? "100%"
                                      : lang.languageProficiency === "Full professional proficiency"
                                      ? "90%"
                                      : lang.languageProficiency === "Professional working proficiency"
                                      ? "75%"
                                      : lang.languageProficiency === "Limited working proficiency"
                                      ? "55%"
                                      : lang.languageProficiency === "Elementary proficiency"
                                      ? "35%"
                                      : "45%",
                                }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: idx * 0.1 }}
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                              />
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-3xl" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Technical Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
                <Code2 className="w-5 h-5 text-blue-400" />
                <TypingLabel text="// set skills.technical()"/>
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold bg-white bg-clip-text text-transparent tracking-tight">
                Technical Arsenal
              </h3>
              <p className="text-gray-400 text-lg mt-3 max-w-xl mx-auto">
                Technologies and tools I work with to build amazing solutions
              </p>
            </motion.div>
            <div className="flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
              {Object.entries(groupedTechnicalSkills).map(([subtype, subtypeSkills], idx) => {
                const meta = categoryMeta[subtype] || categoryMeta.Other;
                return (
                  <motion.div
                    key={subtype}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: idx * 0.08,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className={`group relative rounded-2xl p-6 min-w-[260px] border ${meta.classes.border} bg-gradient-to-br ${meta.classes.gradient} to-transparent backdrop-blur-xl hover:border-blue-500 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] transition-all overflow-hidden`}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-black/30 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-6">
                        <motion.div 
                          className={`w-12 h-12 rounded-xl inline-flex items-center justify-center ${meta.classes.iconBg} shadow-lg`}
                          whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {meta.icon}
                        </motion.div>
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:scale-105 transition-transform">
                          {subtype}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {subtypeSkills.map((skill, skillIdx) => (
                          <motion.span
                            key={skill._id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 + skillIdx * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${meta.classes.chip} hover:bg-opacity-20 transition-all cursor-default`}
                          >
                            {skill.name}
                          </motion.span>
                        ))}
                      </div>                              
                    </div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-3xl" />
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-br-3xl" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
};

export default SkillsPage;