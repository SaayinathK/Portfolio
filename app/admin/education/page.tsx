"use client";

import { useEffect, useState } from "react";
import EducationForm, { EducationFormValues } from "@/components/EducationForm";
import { Trash2, Edit2 } from "lucide-react";

interface Education extends Omit<EducationFormValues, 'activities'> {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  activities?: string[];
}

export default function AdminEducationPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [editing, setEditing] = useState<Education | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEducations();
  }, []);

  const loadEducations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/education");
      const data = await res.json();
      setEducations(data);
    } catch (error) {
      console.error("Failed to load educations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values: EducationFormValues) => {
    const payload = {
      ...values,
      startDate: values.startDate ? new Date(values.startDate) : undefined,
      endDate: values.endDate ? new Date(values.endDate) : undefined,
      activities: values.activities
        ? values.activities.split("\n").map((a) => a.trim()).filter(Boolean)
        : [],
    };
    await fetch("/api/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setEditing(null);
    await loadEducations();
  };

  const handleUpdate = async (values: EducationFormValues) => {
    if (!values._id) return;
    const payload = {
      ...values,
      startDate: values.startDate ? new Date(values.startDate) : undefined,
      endDate: values.endDate ? new Date(values.endDate) : undefined,
      activities: values.activities
        ? values.activities.split("\n").map((a) => a.trim()).filter(Boolean)
        : [],
    };
    await fetch("/api/education", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setEditing(null);
    await loadEducations();
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch("/api/education", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      await loadEducations();
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="space-y-10 p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Education</h1>
        <button
          onClick={() => setEditing(null)}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-md"
        >
          Add New Education
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            {editing ? "Edit Education" : "Create Education"}
          </h2>
          <EducationForm
            initialValues={editing ? { ...editing, activities: editing.activities?.join("\n") } : undefined}
            onSubmit={editing ? handleUpdate : handleCreate}
            submitLabel={editing ? "Update" : "Create"}
          />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg font-medium">Loading...</p>
            </div>
          ) : educations.length === 0 ? (
            <div className="text-center py-12 border rounded-xl bg-gray-50 shadow-sm">
              <p className="text-gray-500 text-base">
                No education records yet. Use the form to add one.
              </p>
            </div>
          ) : (
            educations.map((edu) => (
              <div
                key={edu._id}
                className="flex flex-col md:flex-row items-start justify-between rounded-xl border p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow"
              >
                <div className="flex-1 space-y-2">
                  {/* Line 1: Logo on left, Field and Institution on right */}
                  <div className="flex items-start gap-4 mb-3">
                    {edu.logo && (
                      <img
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        className="w-16 h-16 object-contain rounded-lg border border-gray-200 bg-white p-2 flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-lg">{edu.field}</h3>
                        {edu.isCurrentlyEnrolled && (
                          <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium whitespace-nowrap">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm font-medium">{edu.institution}</p>
                    </div>
                  </div>

                  {/* Line 3: Date */}
                  <div className="text-sm text-gray-500">
                    <p>
                      {formatDate(edu.startDate)} -{" "}
                      {edu.isCurrentlyEnrolled ? "Present" : formatDate(edu.endDate) || "N/A"}
                    </p>
                  </div>

                  {/* Line 4: GPA */}
                  {edu.gpa && (
                    <p className="text-sm text-indigo-600 font-medium">GPA: {edu.gpa}</p>
                  )}

                  {/* Line 5: Description */}
                  {edu.description && (
                    <p className="text-sm text-gray-700 mt-2 leading-relaxed">{edu.description}</p>
                  )}

                  {/* Line 6: Activities */}
                  {edu.activities && edu.activities.length > 0 && (
                    <div className="mt-3 text-sm">
                      <p className="text-gray-800 font-semibold mb-1">Activities:</p>
                      <ul className="text-gray-600 space-y-1 list-disc list-inside">
                        {edu.activities.map((activity: string, i: number) => (
                          <li key={i} className="text-sm">{activity}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 md:ml-6">
                  <button
                    onClick={() => setEditing(edu)}
                    className="flex items-center gap-1 px-4 py-1 border rounded-lg text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
                    className="flex items-center gap-1 px-4 py-1 border rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-60"
                    disabled={deletingId === edu._id}
                  >
                    <Trash2 className="w-4 h-4" />
                    {deletingId === edu._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
