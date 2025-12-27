"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProjectForm, { ProjectFormValues } from "@/components/ProjectForm";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Github,
  Globe,
  Sparkles,
  Archive,
  Filter,
  Search,
  Calendar,
  Tag,
  Eye,
  X
} from "lucide-react";

interface Project extends ProjectFormValues {
  _id: string;
  createdAt?: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Removed selectedTag and tag filtering
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const loadProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (values: ProjectFormValues) => {
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setEditing(null);
    await loadProjects();
  };

  const handleUpdate = async (values: ProjectFormValues) => {
    if (!values._id) return;
    await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setEditing(null);
    await loadProjects();
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      await loadProjects();
    } finally {
      setDeletingId(null);
      setShowDeleteConfirm(null);
    }
  };

  // Technologies/Framework filter (if needed in future)
  const allTechs = Array.from(
    new Set(
      projects
        .map(p =>
          typeof p.technologiesFramework === "string"
            ? p.technologiesFramework.split(",").map(t => t.trim())
            : Array.isArray(p.technologiesFramework)
            ? p.technologiesFramework
            : []
        )
        .flat()
        .filter(Boolean)
    )
  );

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    // No tag filter, could add tech filter here if needed
    return matchesSearch;
  });

  const activeProjects = projects.filter(p => p.liveLink).length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100">
              <Archive className="h-7 w-7 text-blue-700" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Project Management
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Manage your portfolio projects efficiently</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          {/* Stats */}
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activeProjects}</div>
              <div className="text-sm text-gray-500">Live</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{allTechs.length}</div>
              <div className="text-sm text-gray-500">Techs</div>
            </div>
          </div>

          {/* Add Project Button */}
          <button
            onClick={() => setEditing(null)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            <Plus size={18} />
            Add New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
          <div className="sticky top-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editing ? "✏️ Edit Project" : "✨ Create Project"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editing ? "Update your project details" : "Fill in the project details"}
                </p>
              </div>
              {editing && (
                <button
                  onClick={() => setEditing(null)}
                  className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <ProjectForm
              initialValues={editing ? { ...editing } : undefined}
              onSubmit={editing ? handleUpdate : handleCreate}
              submitLabel={
                <span className="flex items-center justify-center gap-2">
                  {editing ? "Update Project" : "Create Project"}
                  <Sparkles size={16} />
                </span>
              }
            />
          </div>
        </motion.div>

        {/* Projects List */}
        <div className="lg:col-span-2">
          {/* Search & Filter */}
          <div className="mb-6 rounded-xl bg-gradient-to-r from-gray-50 to-white p-4 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Technologies/Framework badges (future filter) */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter size={18} className="text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {allTechs.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="rounded-full px-4 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {allTechs.length > 3 && (
                    <span className="px-3 py-1.5 text-sm text-gray-500">+{allTechs.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-3xl border-2 border-dashed border-gray-300 bg-white/50 p-12 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Archive size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700">
                  {searchTerm ? "No matching projects" : "No projects yet"}
                </h3>
                <p className="mt-2 text-gray-500">
                  {searchTerm ? "Adjust your search criteria." : "Create your first project!"}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setEditing(null)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                  >
                    <Plus size={18} /> Create First Project
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                initial="hidden"
                animate="show"
                className="grid gap-4"
              >
                {filteredProjects.map(project => (
                  <motion.div
                    key={project._id}
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                    className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:border-blue-200"
                  >
                    {project.imageUrl && (
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          width={640}
                          height={208}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized={typeof project.imageUrl === 'string' && project.imageUrl.startsWith('/uploads/')}
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate max-w-[220px]" title={project.title} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-1">
                              {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="rounded-full p-1.5 hover:bg-green-50 text-green-600">
                                  <Globe size={14} />
                                </a>
                              )}
                              {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="rounded-full p-1.5 hover:bg-gray-100 text-gray-700">
                                  <Github size={14} />
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-1">
                            {project.projectType && (
                              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold">{project.projectType}</span>
                            )}
                            {project.contribution && (
                              <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-700 text-xs font-semibold">{project.contribution === "individual" ? "Individual" : "Team"}</span>
                            )}
                            {project.year && (
                              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-semibold">{project.year}</span>
                            )}
                          </div>
                          <p className="text-gray-700 line-clamp-2 mb-1">{project.description}</p>
                          {project.technologiesFramework && (
                            <div className="flex flex-wrap gap-1 mb-1">
                              {(typeof project.technologiesFramework === 'string' ? project.technologiesFramework.split(',').map(t => t.trim()) : Array.isArray(project.technologiesFramework) ? project.technologiesFramework : []).filter(Boolean).map((tech, idx) => (
                                <span key={tech + idx} className="px-2 py-0.5 rounded bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 border border-blue-500/20 text-xs font-medium">{tech}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* No tags, replaced by tech badges above */}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {project.createdAt && (
                            <span className="flex items-center gap-1">
                              <Calendar size={14} /> {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditing(project)} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:from-blue-100 hover:to-blue-200 transition-all">
                            <Pencil size={14} /> Edit
                          </button>

                          <AnimatePresence>
                            {showDeleteConfirm === project._id ? (
                              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="flex items-center gap-2 overflow-hidden">
                                <button onClick={() => setShowDeleteConfirm(null)} className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100">Cancel</button>
                                <button onClick={() => handleDelete(project._id)} disabled={deletingId === project._id} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-50 to-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:from-red-100 hover:to-red-200 transition-all">
                                  {deletingId === project._id ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                                  ) : (
                                    <>
                                      <Trash2 size={14} /> Confirm
                                    </>
                                  )}
                                </button>
                              </motion.div>
                            ) : (
                              <button onClick={() => setShowDeleteConfirm(project._id)} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
                                <Trash2 size={14} /> Delete
                              </button>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-50/0 via-transparent to-purple-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
