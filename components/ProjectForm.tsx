"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export interface ProjectFormValues {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  githubLink?: string;
  liveLink?: string;
  contribution?: "individual" | "team";
  year?: string;
  projectType: "Prototype" | "Web Application" | "Mobile Application" | "Website";
  technologiesFramework?: string[];
}

interface ProjectFormProps {
  initialValues?: ProjectFormValues;
  onSubmit: (values: ProjectFormValues) => Promise<void> | void;
  submitLabel?: string | React.ReactNode;
}

export default function ProjectForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
}: ProjectFormProps) {
  const [values, setValues] = useState<ProjectFormValues>({
    title: "",
    description: "",
    imageUrl: "",
    githubLink: "",
    liveLink: "",
    contribution: "individual",
    year: new Date().getFullYear().toString(),
    projectType: "Prototype",
    technologiesFramework: [],
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Add state for tech input and tech list
  const [techInput, setTechInput] = useState<string>("");
  const [techList, setTechList] = useState<string[]>([]);

  useEffect(() => {
    if (initialValues) {
      const techArr = Array.isArray(initialValues.technologiesFramework)
        ? initialValues.technologiesFramework
        : typeof initialValues.technologiesFramework === "string"
          ? (initialValues.technologiesFramework as string).split(",").map((t) => t.trim()).filter((t) => t)
          : [];
      setValues({
        ...initialValues,
        technologiesFramework: techArr,
      });
      setTechList(techArr);
      setImagePreview(initialValues.imageUrl || "");
    }
  }, [initialValues]);

  // Add tech to list and update values
  const handleAddTech = () => {
    const tech = techInput.trim();
    if (tech && !techList.includes(tech)) {
      const updatedList = [...techList, tech];
      setTechList(updatedList);
      setValues((prev) => ({
        ...prev,
        technologiesFramework: updatedList,
      }));
      setTechInput("");
    }
  };

  // Remove tech from list and update values
  const handleRemoveTech = (index: number) => {
    const updatedList = techList.filter((_, i) => i !== index);
    setTechList(updatedList);
    setValues((prev) => ({
      ...prev,
      technologiesFramework: updatedList,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Only allow manual change for non-technologiesFramework fields
    if (name === "technologiesFramework") {
      // If user pastes a comma-separated string, split and add all
      const arr = value.split(",").map((t) => t.trim()).filter(Boolean);
      setTechList(arr);
      setValues((prev) => ({ ...prev, technologiesFramework: arr }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
      if (name === "imageUrl") {
        setImagePreview(value);
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  setUploading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    setValues((prev) => ({ ...prev, imageUrl: data.url }));
    setImagePreview(data.url);
  } catch (err: any) {
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};


  const handleRemoveImage = () => {
    setValues((prev) => ({ ...prev, imageUrl: "" }));
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Always submit technologiesFramework as an array
      await onSubmit({ ...values, technologiesFramework: techList });
      if (!initialValues) {
        setValues({
          title: "",
          description: "",
          imageUrl: "",
          githubLink: "",
          liveLink: "",
          contribution: "individual",
          year: new Date().getFullYear().toString(),
          projectType: "Prototype",
          technologiesFramework: [],
        });
        setTechList([]);
        setImagePreview("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-black text-sm font-medium mb-1">
          Title <span className="text-black">*</span>
        </label>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          className="w-full rounded text-gray-600 border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Agrow - Agriculture Mobile App"
          required
        />
      </div>


      <div>
        <label className="block text-sm text-black font-medium mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          className="w-full rounded border text-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
          placeholder="Describe your project..."
          required
        />
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium mb-2 text-black">
          Project Image <span className="text-red-500">*</span>
        </label>

        {imagePreview ? (
          <div className="relative group">
            <Image
              src={imagePreview}
              alt="Preview"
              width={640}
              height={192}
              className="w-full h-48 object-cover rounded-lg border border-gray-300"
              unoptimized={typeof imagePreview === "string" && imagePreview.startsWith("/uploads/")}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors bg-gray-50">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                  <span className="text-sm text-gray-700 font-medium">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-blue-500" />
                  <span className="text-sm text-gray-800 font-medium">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-600">
                    PNG, JPG, GIF up to 5MB
                  </span>
                </>
              )}
            </label>
          </div>
        )}

        {/* Manual URL Input (Alternative) */}
        <div className="mt-3">
          <label className="block text-xs text-gray-700 font-medium mb-1">Or paste image URL</label>
          <input
            name="imageUrl"
            value={values.imageUrl}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Contribution</label>
          <select
            name="contribution"
            value={values.contribution || "individual"}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="individual">Individual</option>
            <option value="team">Team</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Year</label>
          <input
            name="year"
            value={values.year || ""}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="2025"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-black">Project Type</label>
        <select
          name="projectType"
          value={values.projectType}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="Prototype">Prototype</option>
          <option value="Web Application">Web Application</option>
          <option value="Mobile Application">Mobile Application</option>
          <option value="Website">Website</option>
        </select>
      </div>

      <div>
        {/* Technologies/Framework Input as Array */}
        <label className="block text-sm font-medium mb-1 text-black">Technologies / Frameworks</label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && techInput.trim()) {
                  e.preventDefault();
                  handleAddTech();
                }
              }}
              className="w-full rounded border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., React, Node.js, MongoDB"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="rounded-xl bg-primary px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-primary/90"
            >
              Add
            </button>
          </div>
          {techList.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {techList.map((tech, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 text-sm font-medium text-blue-700"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(index)}
                    className="text-blue-400 hover:text-red-500 ml-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-black">GitHub Link</label>
          <input
            name="githubLink"
            value={values.githubLink || ""}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Live Demo Link</label>
          <input
            name="liveLink"
            value={values.liveLink || ""}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || uploading}
        className="w-full rounded bg-primary px-4 py-2 text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}


