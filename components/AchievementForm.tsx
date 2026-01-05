"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface AchievementFormValues {
  _id?: string;
  title: string;
  organization?: string;
  date?: string;
  description?: string;
  category?: "athletics" | "leadership" | "academic" | "other";
  year?: string;
  imageUrl?: string; // <-- Add this line
  priority?: number;
}

export interface AchievementFormProps {
  initialValues?: AchievementFormValues;
  onSubmit: (values: AchievementFormValues) => void | Promise<void>;
  submitLabel?: React.ReactNode;
}

export default function AchievementForm({
  initialValues,
  onSubmit,
  submitLabel,
}: AchievementFormProps) {
  const [form, setForm] = useState<AchievementFormValues>({
    title: "",
    organization: "",
    date: "",
    description: "",
    category: "other",
    year: "",
    imageUrl: "", // <-- Add this line
    priority: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
      setImagePreview(initialValues.imageUrl || null);
    } else {
      setForm({
        title: "",
        organization: "",
        date: "",
        description: "",
        category: "other",
        year: "",
        imageUrl: "",
        priority: 0,
      });
      setImagePreview(null);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload to Cloudinary
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Only images allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Max 5MB allowed");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm((prev) => ({ ...prev, imageUrl: data.url }));
      setImagePreview(data.url);
    } catch (err: any) {
      alert("Upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(form);
      if (!initialValues) {
        setForm({
          title: "",
          organization: "",
          date: "",
          description: "",
          category: "other",
          year: "",
          imageUrl: "",
          priority: 0,
        });
        setImagePreview(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Achievement Details</h2>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Image (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            width={96}
            height={96}
            className="mt-2 h-24 rounded-lg object-cover border"
            unoptimized={typeof imagePreview === "string" && imagePreview.startsWith("/uploads/")}
          />
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          placeholder="e.g., President - SLIIT Athletics"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Organization</label>
        <input
          name="organization"
          value={form.organization || ""}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          placeholder="e.g., SLIIT, Hindu College"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
          <input
            name="year"
            value={form.year || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            placeholder="e.g., 2024, Present"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
        <select
          name="category"
          value={form.category || "other"}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        >
          <option value="athletics">Athletics</option>
          <option value="leadership">Leadership</option>
          <option value="academic">Academic</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          rows={4}
          placeholder="Brief description of the achievement"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
}
