"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Zap, Database, Wrench, Cloud, Package, Globe, Shield } from "lucide-react";

interface Skill {
  _id: string;
  name: string;
  type: "Technical Skills" | "Languages Spoken";
  subtype?: string;
  level?: string;
  language?: string;
  languageProficiency?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Map subtypes → icon + color theme
const categoryMeta: Record<string, { icon: React.ReactNode; classes: { border: string; chip: string; iconBg: string } }> = {
  "Mobile Development": {
    icon: <Code2 className="w-6 h-6" />,
    classes: { border: "border-indigo-500/30", chip: "bg-indigo-500/10 text-indigo-200 border-indigo-500/20", iconBg: "bg-indigo-500/15 text-indigo-300" },
  },
  "Web Development": {
    icon: <Globe className="w-6 h-6" />,
    classes: { border: "border-fuchsia-500/30", chip: "bg-fuchsia-500/10 text-fuchsia-200 border-fuchsia-500/20", iconBg: "bg-fuchsia-500/15 text-fuchsia-300" },
  },
  "Frameworks": {
    icon: <Zap className="w-6 h-6" />,
    classes: { border: "border-violet-500/30", chip: "bg-violet-500/10 text-violet-200 border-violet-500/20", iconBg: "bg-violet-500/15 text-violet-300" },
  },
  "Programming Languages": {
    icon: <Code2 className="w-6 h-6" />,
    classes: { border: "border-blue-500/30", chip: "bg-blue-500/10 text-blue-200 border-blue-500/20", iconBg: "bg-blue-500/15 text-blue-300" },
  },
  "Databases": {
    icon: <Database className="w-6 h-6" />,
    classes: { border: "border-cyan-500/30", chip: "bg-cyan-500/10 text-cyan-200 border-cyan-500/20", iconBg: "bg-cyan-500/15 text-cyan-300" },
  },
  "Tools & Platforms": {
    icon: <Wrench className="w-6 h-6" />,
    classes: { border: "border-emerald-500/30", chip: "bg-emerald-500/10 text-emerald-200 border-emerald-500/20", iconBg: "bg-emerald-500/15 text-emerald-300" },
  },
  "Cybersecurity": {
    icon: <Shield className="w-6 h-6" />,
    classes: { border: "border-orange-500/30", chip: "bg-orange-500/10 text-orange-200 border-orange-500/20", iconBg: "bg-orange-500/15 text-orange-300" },
  },
  Other: {
    icon: <Package className="w-6 h-6" />,
    classes: { border: "border-slate-500/30", chip: "bg-slate-500/10 text-slate-200 border-slate-500/20", iconBg: "bg-slate-500/15 text-slate-300" },
  },
};

const levelColors: Record<string, string> = {
  Beginner: "bg-blue-100 text-blue-800",
  Intermediate: "bg-amber-100 text-amber-800",
  Advanced: "bg-green-100 text-green-800",
  Expert: "bg-purple-100 text-purple-800",
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  // No filter UI in the target design; always show grouped categories

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.error("Failed to load skills:", error);
    } finally {
      setLoading(false);
    }
  };

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

  // Get Languages Spoken
  const languagesSpoken = skills.filter((skill) => skill.type === "Languages Spoken");

  return (
    <div id="top" className="space-y-6 max-w-6xl mx-auto px-6 py-16">
      <section id="skills" className="py-6 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="font-mono text-sm text-blue-400/80">function getSkills() {'{'} </div>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              Technical Skills
            </h2>
            <div className="font-mono text-sm text-blue-400/80"> {'}'} </div>
          </motion.div>

          {/* Technical Skills Grid as category cards with chips */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading skills...</p>
            </div>
          ) : Object.keys(groupedTechnicalSkills).length === 0 && languagesSpoken.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No skills available yet.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(groupedTechnicalSkills).map(([subtype, subtypeSkills], idx) => (
                  <motion.div
                    key={subtype}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.05 }}
                    className={`rounded-2xl p-6 border backdrop-blur-md bg-gradient-to-br from-white/5 to-transparent ${
                      (categoryMeta[subtype]?.classes.border) || "border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-xl inline-flex items-center justify-center ${(categoryMeta[subtype]?.classes.iconBg) || "bg-white/10 text-white/70"}`}>
                        {categoryMeta[subtype]?.icon || <Package className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold">{subtype}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {subtypeSkills.map((skill) => (
                        <span
                          key={skill._id}
                          className={`px-3 py-1 rounded-full text-sm border ${
                            (categoryMeta[subtype]?.classes.chip) || "bg-white/10 text-white/80 border-white/20"
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Languages Section */}
          {languagesSpoken.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-20 pt-12 border-t border-white/10"
            >
              <div className="text-center mb-12">
                <div className="font-mono text-sm text-emerald-400/80">{/* Languages Spoken */}</div>
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent tracking-tight mt-2">
                  Languages
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {languagesSpoken.map((lang, idx) => {
                  // Extract proficiency level abbreviation
                  const proficiency = lang.languageProficiency || "Not specified";
                  const shortProficiency = proficiency
                    .replace("Elementary proficiency", "Elementary")
                    .replace("Limited working proficiency", "Limited")
                    .replace("Professional working proficiency", "Professional")
                    .replace("Full professional proficiency", "Fluent")
                    .replace("Native or bilingual proficiency", "Native");
                  
                  return (
                    <motion.div
                      key={lang._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="rounded-xl p-5 border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent backdrop-blur-md hover:border-emerald-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg inline-flex items-center justify-center bg-emerald-500/20 text-emerald-300">
                          <Globe className="w-5 h-5" />
                        </div>
                        <h4 className="font-semibold text-white text-lg">
                          {lang.language}
                        </h4>
                      </div>
                      <p className="text-sm text-emerald-200/80 font-medium">
                        ({shortProficiency})
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}