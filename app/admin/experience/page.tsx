"use client";

import { useEffect, useState } from "react";
import ExperienceForm, { ExperienceFormValues } from "@/components/ExperienceForm";
import { Trash2, Edit2, Plus, Briefcase, Calendar, MapPin, Award, Loader2 } from "lucide-react";

interface Experience extends Omit<ExperienceFormValues, "achievements"> {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  achievements?: string[];
}

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/experience");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  const toPayload = (values: ExperienceFormValues) => ({
    ...values,
    startDate: values.startDate ? new Date(values.startDate) : undefined,
    endDate: values.endDate ? new Date(values.endDate) : undefined,
    achievements: values.achievements
      ? values.achievements.split("\n").map((a) => a.trim()).filter(Boolean)
      : [],
  });

  const handleCreate = async (values: ExperienceFormValues) => {
    await fetch("/api/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toPayload(values)),
    });
    setEditing(null);
    await load();
  };

  const handleUpdate = async (values: ExperienceFormValues) => {
    if (!values._id) return;
    await fetch("/api/experience", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toPayload(values)),
    });
    setEditing(null);
    await load();
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await fetch("/api/experience", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    setDeletingId(null);
    await load();
  };

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short" })
      : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-1">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Experience Management
            </h1>
          
          </div>
          <button
            onClick={() => setEditing(null)}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            Add New Experience
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editing ? "Edit Experience" : "Create Experience"}
                </h2>
              </div>
              <div className="border-t border-gray-100 pt-6">
                <ExperienceForm
                  initialValues={
                    editing
                      ? {
                          ...editing,
                          achievements: editing.achievements?.join("\n") ?? "",
                        }
                      : undefined
                  }
                  onSubmit={editing ? handleUpdate : handleCreate}
                  submitLabel={editing ? "Update Experience" : "Create Experience"}
                />
              </div>
            </div>
          </div>

          {/* Experience List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Experience Records ({items.length})
                </h2>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                  <p className="text-gray-600 font-medium">Loading experiences...</p>
                  <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-16 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No Experience Records Yet
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Get started by adding your first professional experience. Click &quot;Add New Experience&quot; to begin.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((exp) => (
                    <div
                      key={exp._id}
                      className="group relative rounded-xl border border-gray-200 bg-white p-6 hover:shadow-2xl transition-all duration-300 hover:border-blue-200 overflow-hidden"
                    >
                      {/* Gradient accent */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500" />
                      
                      <div className="ml-4">
                        {/* Header with title and actions */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              {exp.logo && (
                                <img
                                  src={exp.logo}
                                  alt={`${exp.company} logo`}
                                  className="w-10 h-10 object-contain rounded-lg border border-gray-200 bg-white p-1 shadow-sm"
                                />
                              )}
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                                  {exp.title}
                                </h3>
                                <span className="text-sm font-medium text-gray-600">@ {exp.company}</span>
                                {exp.isCurrentlyWorking && (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs font-semibold">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    Current Role
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Date and location */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">
                                  {formatDate(exp.startDate)} -{" "}
                                  {exp.isCurrentlyWorking ? (
                                    <span className="text-green-600 font-semibold">Present</span>
                                  ) : (
                                    formatDate(exp.endDate) || "N/A"
                                  )}
                                </span>
                              </div>
                              
                              {exp.location && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">{exp.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditing(exp)}
                              className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 group/btn"
                            >
                              <Edit2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(exp._id)}
                              disabled={deletingId === exp._id}
                              className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 hover:border-red-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 group/btn"
                            >
                              {deletingId === exp._id ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                  Delete
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {/* Description */}
                        {exp.description && (
                          <p className="text-gray-700 mb-4 leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-100">
                            {exp.description}
                          </p>
                        )}
                        
                        {/* Achievements */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <Award className="w-4 h-4 text-amber-500" />
                              <h4 className="text-sm font-semibold text-gray-700">Key Achievements</h4>
                            </div>
                            <ul className="space-y-2.5">
                              {exp.achievements.map((achievement, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-3 text-sm text-gray-700"
                                >
                                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                  <span className="leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Timestamp */}
                        {(exp.createdAt || exp.updatedAt) && (
                          <div className="mt-6 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500">
                              {exp.updatedAt
                                ? `Updated ${formatDate(exp.updatedAt)}`
                                : exp.createdAt
                                ? `Created ${formatDate(exp.createdAt)}`
                                : ""}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}