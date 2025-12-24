"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Smartphone, Globe, Users } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  type: "individual" | "team";
  year: string;
  icon: React.ReactNode;
  github?: string;
  demo?: string;
  imageUrl?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Agrow",
    description: "Agriculture Mobile App",
    longDescription:
      "A mobile application encouraging youth engagement in agriculture through educational content and e-commerce features. Includes video tutorials, articles, and a buy/sell platform.",
    technologies: ["Kotlin", "Android Studio", "Firebase", "Figma"],
    type: "individual",
    year: "2025",
    icon: <Smartphone className="w-6 h-6" />,
    github: "https://github.com/Saayinath",
    imageUrl: "/agrow.jpg",
  },
  {
    id: "2",
    title: "FinMate",
    description: "Personal Finance Tracker",
    longDescription:
      "Mobile application for managing personal finances with income/expense tracking, budget analysis, spending insights, and intuitive dashboards with pie chart visualizations.",
    technologies: ["Kotlin", "Android Studio", "Room Database", "MPAndroidChart", "Figma"],
    type: "individual",
    year: "2025",
    icon: <Smartphone className="w-6 h-6" />,
    github: "https://github.com/Saayinath",
    imageUrl: "/finmate.jpg",
  },
  {
    id: "3",
    title: "Cloud Kitchen Platform",
    description: "Community Forum Module",
    longDescription:
      "Collaborated in a team project for a Cloud Kitchen platform, designing and developing the Community Forum component with user posts, comment threads, and moderation features.",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
    type: "team",
    year: "2025",
    icon: <Globe className="w-6 h-6" />,
    github: "https://github.com/Saayinath",
    imageUrl: "/cloud-kitchen.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <div id="top" className="space-y-6 max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold">Projects</h1>

      <section id="projects" className="py-24 px-6 relative">
        {/* Background accent */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl">
              A collection of projects that showcase my skills in mobile
              development, web development, and UI/UX design.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all flex flex-col h-full relative"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                  <img
                    src={project.imageUrl || "/placeholder-project.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                      {project.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                          project.type === "individual"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {project.type === "individual" ? (
                          "Individual"
                        ) : (
                          <>
                            <Users className="w-3 h-3" /> Team
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-blue-600 mb-3">
                      {project.description}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Year badge */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-gray-600">{project.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Admin CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <a
              href="/admin"
              className="inline-block px-6 py-2 border border-blue-600/50 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Manage Projects (Admin)
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
