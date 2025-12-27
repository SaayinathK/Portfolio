"use client";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next"
import dynamic from "next/dynamic";
import { Code, Terminal, Cpu, Database, Server, Smartphone, Code2 } from "lucide-react";

const TypingLabel = ({ text }: { text: string }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="font-mono text-sm text-blue-400/90"
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


// Dynamically import sections
const AboutSection = dynamic(() => import("./public/about/page"), { ssr: false });
const SkillsSection = dynamic(() => import("./public/skills/page"), { ssr: false });
const ProjectsSection = dynamic(() => import("./public/projects/page"), { ssr: false });
const EducationSection = dynamic(() => import("./public/education/page"), { ssr: false });
const ExperienceSection = dynamic(() => import("./public/experience/page"), { ssr: false });
const AchievementsSection = dynamic(() => import("./public/achievements/page"), { ssr: false });
const GallerySection = dynamic(() => import("./public/gallery/page"), { ssr: false });
const ContactSection = dynamic(() => import("./public/contact/page"), { ssr: false });

  import { useEffect, useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
   

  // Main page component
  export default function HomePage() {
    // Define codingIcons array with some example icons from lucide-react
    const codingIcons = [Code, Terminal, Cpu, Database, Server, Smartphone, Code2];

    // Move hooks here!
    useEffect(() => {
      const icons = Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        iconIndex: Math.floor(Math.random() * codingIcons.length),
        size: Math.random() * 20 + 10,
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() > 0.5 ? 1 : -1
      }));
      // You can use these icons for animation or other effects
    }, [codingIcons.length]);

    return (
      <main className="min-h-screen bg-black text-foreground overflow-hidden relative">
        <div className="container mx-auto px-4 py-4 max-w-7xl relative z-10 space-y-40">
          {/* About Section - Hero Layout */}
          <motion.section id="about" className="scroll-mt-24 relative">
            <AboutSection />
          </motion.section>

          {/* Skills Section */}
          <motion.section id="skills" className="scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  <TypingLabel text="// get languages.spoken()"/>
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Languages I Speak
                </h3>
                <p className="text-gray-400 text-lg mt-3 max-w-xl mx-auto">
                  Communication across cultures and communities
                </p>
              </motion.div>
            <SkillsSection />
          </motion.section>

          {/* Projects Section - now calls the moved component */}
          <motion.section id="projects" className="scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  <TypingLabel text="// load projects[]"/>
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Featured Projects
                </h3>
                <p className="text-gray-400 text-lg mt-3 max-w-xl mx-auto">
                  A collection of my best work and creative solutions
                </p>
              </motion.div>
            <ProjectsSection />
          </motion.section>

          {/* Education Section - Vertical Timeline */}
          <motion.section id="education" className="scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  <TypingLabel text="// set ContinuousLearning()"/>
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Academic Background
                </h3>
                <p className="text-gray-400 text-lg mt-3 max-w-xl mx-auto">
                  A structured journey of formal learning, continuous improvement, and technical depth
                </p>
              </motion.div>
            <EducationSection />
          </motion.section>
          
          {/* Experience Section - now calls the moved component */}
          <motion.section id="experience" className="scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  <TypingLabel text="// getIndustryExposure()"/>
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Professional Experience
                </h3>
                <p className="text-gray-400 text-lg mt-3 max-w-xl mx-auto">
                  My career journey and professional achievements
                </p>
              </motion.div>
            <ExperienceSection />
          </motion.section>

          {/* Achievements Section - now calls the moved component */}
          <motion.section id="achievements" className="scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  <TypingLabel text="// await import('achievements');"/>
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Achievements & Awards
                </h3>
                <p className="text-gray-400 text-lg mt-3 max-w-xl mx-auto">
                  Recognition earned through commitment, performance, and leadership
                </p>
              </motion.div>
            <AchievementsSection />
          </motion.section>

          {/* Gallery Section - now calls the moved component */}
          <motion.section id="gallery" className="scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  <TypingLabel text="// await loadImages()"/>
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Moments
                </h3>
                <p className="text-gray-400 text-lg mt-3 max-w-xl mx-auto">
                  Visual highlights that capture key projects, milestones, and moments
                </p>
              </motion.div>
            <GallerySection />
          </motion.section>

          {/* Contact Section - now calls the moved component */}
          <motion.section id="contact" className="scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  <TypingLabel text="// contact[]"/>
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Contact
                </h3>
                <p className="text-gray-400 text-lg mt-3 max-w-xl mx-auto">
                  Interested in collaborating or discussing an idea? I welcome conversations and opportunities
                </p>
              </motion.div>
            <ContactSection />
          </motion.section>
        </div>
        <SpeedInsights />
      </main>
    );
  }