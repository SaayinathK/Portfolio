"use client";

import { useEffect, useState } from "react";
import AchievementForm, { AchievementFormValues } from "@/components/AchievementForm";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Sparkles,
  Filter,
  Search,
  Trophy,
  Award,
  Calendar,
  Building,
  Target,
  Medal,
  TrendingUp,
  Star,
  X,
  Crown,
  GraduationCap,
  Users,
  Zap
} from "lucide-react";

interface Achievement extends AchievementFormValues {
  _id: string;
}

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editing, setEditing] = useState<Achievement | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const loadAchievements = async () => {
    const res = await fetch("/api/achievements");
    const data = await res.json();
    setAchievements(
      data.map((a: any) => ({
        ...a,
        date: a.date ? new Date(a.date).toISOString().substring(0, 10) : "",
      }))
    );
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  // On create
  const handleCreate = async (values: AchievementFormValues) => {
    const payload = {
      ...values,
      date: values.date ? new Date(values.date) : undefined,
    };
    const res = await fetch("/api/achievements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const newAchievement = await res.json();
    setAchievements(prev => [
      {
        ...newAchievement,
        date: newAchievement.date ? new Date(newAchievement.date).toISOString().substring(0, 10) : "",
      },
      ...prev,
    ]);
    setEditing(null);
  };

  // On update
  const handleUpdate = async (values: AchievementFormValues) => {
    if (!values._id) return;
    const payload = {
      ...values,
      date: values.date ? new Date(values.date) : undefined,
    };
    const res = await fetch("/api/achievements", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updatedAchievement = await res.json();
    setAchievements(prev =>
      prev.map(a =>
        a._id === updatedAchievement._id
          ? {
              ...updatedAchievement,
              date: updatedAchievement.date
                ? new Date(updatedAchievement.date).toISOString().substring(0, 10)
                : "",
            }
          : a
      )
    );
    setEditing(null);
  };

  // On delete
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch("/api/achievements", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      setAchievements(prev => prev.filter(a => a._id !== id));
    } finally {
      setDeletingId(null);
      setShowDeleteConfirm(null);
    }
  };

  const getCategoryBadge = (category?: string) => {
    const colors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
      athletics: { 
        bg: "bg-gradient-to-r from-blue-500 to-gray-800", 
        text: "text-white",
        icon: <Zap size={12} />
      },
      leadership: { 
        bg: "bg-gradient-to-r from-amber-500 to-orange-500", 
        text: "text-white",
        icon: <Crown size={12} />
      },
      academic: { 
        bg: "bg-gradient-to-r from-green-500 to-emerald-500", 
        text: "text-white",
        icon: <GraduationCap size={12} />
      },
      other: { 
        bg: "bg-gradient-to-r from-gray-500 to-slate-500", 
        text: "text-white",
        icon: <Award size={12} />
      },
    };
    
    return colors[category as keyof typeof colors] || colors.other;
  };

  // Get all unique categories
  const categories = Array.from(new Set(achievements.map(a => a.category).filter(Boolean)));
  
  // Filter achievements
  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = 
      achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (achievement.organization && achievement.organization.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (achievement.description && achievement.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? achievement.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Stats
  const totalAchievements = achievements.length;
  const recentAchievements = achievements.filter(a => {
    if (!a.year) return false;
    const currentYear = new Date().getFullYear();
    const achievementYear = parseInt(a.year);
    return currentYear - achievementYear <= 1;
  }).length;

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Achievements Gallery
            </h1>
          </div>
          <p className="text-gray-600">Showcase your accomplishments and milestones</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Stats Cards */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{totalAchievements}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{recentAchievements}</div>
              <div className="text-xs text-gray-500">Recent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-xs text-gray-500">Categories</div>
            </div>
          </div>

          <button
            onClick={() => setEditing(null)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 px-5 py-3 font-medium text-white hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-yellow-500/30"
          >
            <Plus size={18} />
            Add New Achievement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editing ? "✏️ Edit Achievement" : "✨ Create Achievement"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editing ? "Update your achievement details" : "Add a new milestone to your journey"}
                </p>
              </div>
              {editing && (
                <button
                  onClick={() => setEditing(null)}
                  className="rounded-lg p-2 hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <AchievementForm
              initialValues={editing || undefined}
              onSubmit={editing ? handleUpdate : handleCreate}
              submitLabel={
                <span className="flex items-center justify-center gap-2">
                  {editing ? "Update Achievement" : "Create Achievement"}
                  <Sparkles size={16} />
                </span>
              }
            />
          </div>
        </motion.div>

        {/* Achievements List Section */}
        <div className="lg:col-span-2">
          {/* Search and Filter Bar */}
          <div className="mb-6 rounded-xl bg-gradient-to-r from-gray-50 to-white p-4 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search achievements by title, organization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                      selectedCategory === null
                        ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.slice(0, 4).map(category => {
                    const badge = getCategoryBadge(category);
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? badge.bg + " text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {badge.icon}
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <AnimatePresence mode="wait">
            {filteredAchievements.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-2xl border-2 border-dashed border-gray-300 bg-white/50 p-12 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-amber-100">
                  <Trophy size={32} className="text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700">
                  {searchTerm || selectedCategory ? "No matching achievements" : "No achievements yet"}
                </h3>
                <p className="mt-2 text-gray-500">
                  {searchTerm || selectedCategory 
                    ? "Try adjusting your search or filter criteria." 
                    : "Add your first achievement to showcase your journey!"}
                </p>
                {!searchTerm && !selectedCategory && (
                  <button
                    onClick={() => setEditing(null)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 px-6 py-3 font-medium text-white hover:from-yellow-600 hover:to-amber-700 transition-all duration-300"
                  >
                    <Plus size={18} />
                    Add First Achievement
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="achievements"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
                className="grid gap-4"
              >
                {filteredAchievements.map((achievement, index) => {
                  const badge = getCategoryBadge(achievement.category);
                  
                  return (
                    <motion.div
                      key={achievement._id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-yellow-200"
                    >
                      {/* Achievement Image */}
                      {achievement.imageUrl && (
                        <div className="mb-4">
                          <img
                            src={achievement.imageUrl}
                            alt={achievement.title}
                            className="w-full max-h-48 object-cover rounded-xl border border-gray-200 shadow-sm"
                          />
                        </div>
                      )}

                      {/* Achievement Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-100 to-amber-100">
                              <Trophy size={20} className="text-yellow-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                                {achievement.title}
                              </h3>
                              {achievement.organization && (
                                <div className="flex items-center gap-2 mt-1">
                                  <Building size={14} className="text-gray-400" />
                                  <span className="text-sm text-gray-600">
                                    {achievement.organization}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Category Badge */}
                        {achievement.category && (
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${badge.bg} ${badge.text}`}>
                            {badge.icon}
                            {achievement.category}
                          </span>
                        )}
                      </div>

                      {/* Achievement Details */}
                      <div className="space-y-3 mb-4">
                        {/* Date and Year */}
                        <div className="flex flex-wrap gap-4">
                          {achievement.year && (
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">
                                {achievement.year}
                              </span>
                            </div>
                          )}
                          
                          {achievement.date && (
                            <div className="flex items-center gap-2">
                              <Star size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {achievement.date}
                              </span>
                            </div>
                          )}
                          
                          {achievement.icon && (
                            <div className="flex items-center gap-2">
                              <Target size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {achievement.icon}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        {achievement.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {achievement.description}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-5 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {achievement.year && (
                              <div className="flex items-center gap-1">
                                <TrendingUp size={14} className="text-amber-500" />
                                <span className="text-xs text-gray-500">
                                  Achieved in {achievement.year}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditing(achievement)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:from-yellow-100 hover:to-amber-100 transition-all"
                            >
                              <Pencil size={12} />
                              Edit
                            </button>
                            
                            <AnimatePresence>
                              {showDeleteConfirm === achievement._id ? (
                                <motion.div
                                  initial={{ opacity: 0, width: 0 }}
                                  animate={{ opacity: 1, width: "auto" }}
                                  exit={{ opacity: 0, width: 0 }}
                                  className="flex items-center gap-1 overflow-hidden"
                                >
                                  <button
                                    onClick={() => setShowDeleteConfirm(null)}
                                    className="rounded-lg px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleDelete(achievement._id)}
                                    disabled={deletingId === achievement._id}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-50 to-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:from-red-100 hover:to-red-200 transition-all"
                                  >
                                    {deletingId === achievement._id ? (
                                      <>
                                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                                        Deleting...
                                      </>
                                    ) : (
                                      <>
                                        <Trash2 size={12} />
                                        Confirm
                                      </>
                                  )}
                                  </button>
                                </motion.div>
                              ) : (
                                <button
                                  onClick={() => setShowDeleteConfirm(achievement._id)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-all"
                                >
                                  <Trash2 size={12} />
                                  Delete
                                </button>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-50/0 via-transparent to-amber-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}