"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Github, Terminal, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import React from "react";

interface Project {
  _id?: string;
  title?: string;
  name?: string;
  description?: string;
  summary?: string;
  github?: string;
  repoUrl?: string;
  githubLink?: string;
  liveLink?: string;
  link?: string;
  imageUrl?: string;
  tags?: string[];
  tech?: string[];
  type?: string;
}

const SectionHeader: React.FC<{ title: string; subtitle: string; codeComment: string }> = ({
  title,
  subtitle,
  codeComment,
}) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-white">{title}</h2>
    <p className="text-blue-300">{subtitle}</p>
    <span className="text-xs text-gray-500">{codeComment}</span>
  </div>
);

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="scroll-mt-20"
    >
      {loading ? (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-96 h-96 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="relative group">
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const container = document.getElementById("projects-scroll");
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

          {/* Scrollable Projects */}
          <div
            id="projects-scroll"
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(59, 130, 246, 0.3) transparent",
            }}
          >
            {projects.map((p, i) => {
              const title = p.title || p.name || "Untitled";
              const desc = p.description || p.summary || "";
              const github = p.github || p.repoUrl || p.githubLink || "";
              const liveLink = p.liveLink || p.link || "";
              const imageUrl = p.imageUrl || "";
              const tags: string[] = p.tags || p.tech || [];
              const filename = title.toLowerCase().replace(/\s+/g, "-");

              return (
                <motion.article
                  key={p._id || title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="flex-shrink-0 w-96 group relative rounded-2xl border-2 border-gray-800 bg-black backdrop-blur-sm overflow-hidden hover:border-gray-700 transition-all flex flex-col"
                >
                  {/* Terminal header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20 bg-slate-900/50">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs text-gray-400 font-mono ml-2">{filename}.tsx</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {liveLink && (
                        <a
                          href={liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Globe size={30} />
                        </a>
                      )}
                      {github && (
                        <a
                          href={github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Github size={30} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Image / Placeholder */}
                  <div className="relative h-48 overflow-hidden bg-slate-800/50">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width={384}
                        height={192}
                        priority={i === 0}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-800/40">
                        <ImageIcon className="text-slate-500" size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1">
                    {/* Title with Icon */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex-shrink-0">
                        <Terminal size={18} className="text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors truncate">
                          {title}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">{p.type || "Web Application"}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{desc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 3).map((t: string, idx: number) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-300 border border-blue-500/20"
                        >
                          {t}
                        </span>
                      ))}
                      {tags.length > 3 && (
                        <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-300 border border-blue-500/20">
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>
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
              const container = document.getElementById("projects-scroll");
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
    </motion.section>
  );
};

export default ProjectsPage;