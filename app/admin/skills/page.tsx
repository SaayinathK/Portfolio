"use client";

import { useEffect, useState } from "react";
import SkillForm, { SkillFormValues } from "@/components/SkillForm";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Sparkles,
  Filter,
  Search,
  Star,
  Tag,
  TrendingUp,
  Layers,
  Award,
  X,
  Code,
  Palette,
  Database,
  Globe,
  Server,
  Smartphone,
  Cloud,
} from "lucide-react";

interface Skill extends SkillFormValues {
  _id: string;
  description?: string;
  yearsOfExperience?: number;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const loadSkills = async () => {
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkills(data);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleCreate = async (values: SkillFormValues) => {
    await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setEditing(null);
    await loadSkills();
  };

  const handleUpdate = async (values: SkillFormValues) => {
    if (!values._id) return;
    await fetch("/api/skills", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setEditing(null);
    await loadSkills();
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch("/api/skills", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      await loadSkills();
    } finally {
      setDeletingId(null);
      setShowDeleteConfirm(null);
    }
  };

  const categories = Array.from(new Set([
    ...(Array.isArray(skills) ? skills.map((s) => s.type).filter(Boolean) : []),
    ...(Array.isArray(skills) ? skills.map((s) => s.subtype).filter(Boolean) : []),
  ]));

  const filteredSkills = Array.isArray(skills)
    ? skills.filter((skill) => {
        const matchesSearch =
          skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (skill.description && skill.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (skill.type && skill.type.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory ? skill.subtype === selectedCategory || skill.type === selectedCategory : true;
        return matchesSearch && matchesCategory;
      })
    : [];

  const categoryIcons: Record<string, React.ReactNode> = {
    "Mobile Development": <Smartphone className="h-4 w-4 text-indigo-600" />,
    "Web Development": <Globe className="h-4 w-4 text-emerald-600" />,
    Frameworks: <Code className="h-4 w-4 text-pink-600" />,
    "Programming Languages": <Code className="h-4 w-4 text-amber-600" />,
    Databases: <Database className="h-4 w-4 text-sky-600" />,
    "Tools & Platforms": <Server className="h-4 w-4 text-cyan-600" />,
    "Languages Spoken": <Globe className="h-4 w-4 text-purple-600" />,
  };


  const totalSkills = Array.isArray(skills) ? skills.length : 0;
  const expertSkills = Array.isArray(skills) ? skills.filter((s) => s.level === "Expert").length : 0;
  const intermediateSkills = Array.isArray(skills) ? skills.filter((s) => s.level === "Intermediate").length : 0;

  return (
    <div className="space-y-10 text-gray-900">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20">
              <Award className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Skill Management
            </h1>
          </div>
          <p className="text-gray-600">
            Manage, categorize, and highlight your professional skills
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalSkills}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{expertSkills}</div>
              <div className="text-xs text-gray-500">Expert</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-600">{intermediateSkills}</div>
              <div className="text-xs text-gray-500">Intermediate</div>
            </div>
          </div>

          <button
            onClick={() => setEditing({
              _id: '',
              name: '',
              type: 'Technical Skills',
              subtype: '',
              level: '',
              description: '',
              yearsOfExperience: undefined,
            })}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-indigo-500/30 transition"
          >
            <Plus size={18} /> Add New Skill
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="sticky top-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editing ? "Edit Skill" : "Create Skill"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {editing ? "Modify existing skill details" : "Add a new skill to your profile"}
                </p>
              </div>
              {editing && (
                <button
                  onClick={() => setEditing(null)}
                  className="rounded-xl p-2 hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <SkillForm
              initialValues={editing || undefined}
              onSubmit={editing ? handleUpdate : handleCreate}
              submitLabel={
                <span className="flex items-center justify-center gap-2">
                  {editing ? "Update Skill" : "Create Skill"}
                  <Sparkles size={16} />
                </span>
              }
            />
          </div>
        </motion.div>

        {/* Skills List */}
        <div className="lg:col-span-2">
          {/* Search & Filter */}
          <div className="mb-6 rounded-2xl bg-white border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search skills..."
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Filter size={18} className="text-gray-400" />
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                    selectedCategory === null
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                {categories.slice(0, 4).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category ?? null)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {categoryIcons[category as keyof typeof categoryIcons] ?? <Tag size={14} />}
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-xl transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gray-100">
                        {categoryIcons[skill.subtype || skill.type] || <Layers className="h-4 w-4" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{skill.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                            {skill.type}
                          </span>
                          {skill.subtype && (
                            <span className="text-xs text-gray-500">{skill.subtype}</span>
                          )}
                          {skill.language && (
                            <span className="text-xs text-gray-500">• {skill.language}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {skill.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {skill.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">
                      {skill.type === "Languages Spoken" ? "Proficiency" : "Level"}
                    </span>
                    <div className="flex items-center gap-1">
                      {skill.type === "Languages Spoken" ? (
                        <span className="text-sm font-medium text-gray-700">
                          {skill.languageProficiency || "Not specified"}
                        </span>
                      ) : (
                        <>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i <
                                (skill.level === "Expert"
                                  ? 5
                                  : skill.level === "Advanced"
                                  ? 4
                                  : skill.level === "Intermediate"
                                  ? 3
                                  : skill.level === "Beginner"
                                  ? 2
                                  : 1)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {skill.level}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => setEditing({ ...skill })}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
                    >
                      <Pencil size={12} /> Edit
                    </button>

                    <button
                      onClick={() => setShowDeleteConfirm(skill._id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
