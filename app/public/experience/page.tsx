"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface Experience {
  _id?: string;
  logo?: string;
  company?: string;
  organization?: string;
  position?: string;
  title?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
  skills?: string[];
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  codeComment: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, codeComment }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-white">{title}</h2>
    <p className="text-blue-300">{subtitle}</p>
    <span className="text-xs text-gray-500">{codeComment}</span>
  </div>
);

const ExperiencePage: React.FC = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => {
        setExperience(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.section
      id="experience"
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
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-96 h-64 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="relative group">
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const container = document.getElementById("experience-scroll");
              if (container) {
                container.scrollBy({
                  left: -420,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-gray-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Scrollable Experience */}
          <div
            id="experience-scroll"
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(107, 114, 128, 0.3) transparent",
            }}
          >
            {Array.isArray(experience) && experience.map((exp, i) => (
              <motion.div
                key={exp._id || i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="flex-shrink-0 w-96 group relative rounded-2xl border border-gray-800 bg-black backdrop-blur-sm overflow-hidden hover:border-gray-700 transition-all p-6 flex flex-col"
              >
                {/* Position, Company, and Logo */}
                <div className="mb-4 flex items-start gap-3">
                  {exp.logo && (
                    <Image
                      src={exp.logo}
                      alt={`${exp.company || exp.organization || "Company"} logo`}
                      className="w-10 h-10 object-contain rounded-lg border border-gray-800 bg-black/40 p-1 shadow-sm"
                      width={40}
                      height={40}
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gray-300 transition-colors">
                      {exp.position || exp.title || "Position"}
                    </h3>
                    <p className="text-blue-500 text-sm font-semibold">{exp.company || exp.organization || "Company"}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4 flex-1">
                  {exp.type && <p className="text-gray-400 text-sm">💼 {exp.type}</p>}
                  {exp.startDate && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <Calendar size={16} />
                      <span>
                        {new Date(exp.startDate).getFullYear()} {exp.endDate ? `- ${new Date(exp.endDate).getFullYear()}` : "- Present"}
                      </span>
                    </div>
                  )}
                  {exp.location && <p className="text-gray-400 text-sm">📍 {exp.location}</p>}
                  {exp.description && <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>}
                </div>

                {/* Skills Used */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.slice(0, 3).map((skill: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 rounded-md text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700/50">
                        {skill}
                      </span>
                    ))}
                    {exp.skills.length > 3 && (
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700/50">
                        +{exp.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const container = document.getElementById("experience-scroll");
              if (container) {
                container.scrollBy({
                  left: 420,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-gray-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      )}
    </motion.section>
  );
};

export default ExperiencePage;