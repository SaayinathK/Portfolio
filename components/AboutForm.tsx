"use client";

import { useState, useEffect } from "react";
import { Upload, X, Mail, Phone, MapPin, FileText, User } from "lucide-react";

export interface AboutFormValues {
  firstName: string;
  lastName: string;
  title: string;
  shortBio: string;
  longBio: string;
  email: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
  resumeUrlName?: string;
  profileImageUrl?: string;
  highlights?: string;
  motto?: string;
}

interface AboutFormProps {
  initialValues?: AboutFormValues;
  onSubmit: (values: AboutFormValues) => Promise<void>;
  submitLabel?: string;
}

export default function AboutForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
}: AboutFormProps) {
  const [values, setValues] = useState<AboutFormValues>({
    firstName: "",
    lastName: "",
    title: "",
    shortBio: "",
    longBio: "",
    email: "",
    phone: "",
    location: "",
    resumeUrl: "",
    profileImageUrl: "",
    highlights: "",
    motto: "",
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [highlightsList, setHighlightsList] = useState<string[]>([]);
  const [currentHighlight, setCurrentHighlight] = useState("");

  useEffect(() => {
    if (initialValues) {
      const highlights = Array.isArray(initialValues.highlights)
        ? initialValues.highlights
        : initialValues.highlights
        ? initialValues.highlights.split("\n").filter(Boolean)
        : [];
      
      setHighlightsList(highlights);
      setValues({
        ...initialValues,
        highlights: highlights.join("\n"),
        firstName: initialValues.firstName || "",
        lastName: initialValues.lastName || "",
      });
      if (initialValues.profileImageUrl) {
        setImagePreview(initialValues.profileImageUrl);
      }
    }
  }, [initialValues]);

  const handleAddHighlight = () => {
    if (currentHighlight.trim()) {
      const newHighlights = [...highlightsList, currentHighlight.trim()];
      setHighlightsList(newHighlights);
      setValues((prev) => ({ ...prev, highlights: newHighlights.join("\n") }));
      setCurrentHighlight("");
    }
  };

  const handleRemoveHighlight = (index: number) => {
    const newHighlights = highlightsList.filter((_, i) => i !== index);
    setHighlightsList(newHighlights);
    setValues((prev) => ({ ...prev, highlights: newHighlights.join("\n") }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddHighlight();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setValues((prev) => ({ ...prev, profileImageUrl: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValues((prev) => ({ ...prev, profileImageUrl: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...values,
        highlights: values.highlights
          ? values.highlights
              .split("\n")
              .map((h) => h.trim())
              .filter(Boolean)
          : [],
      } as any);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30";

  const labelBase = "mb-1 flex items-center gap-2 text-sm font-semibold text-gray-800";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl bg-white p-6 md:p-8 shadow-lg"
    >
      {/* Profile Image */}
      <div className="rounded-xl border border-dashed border-gray-300 p-6">
        <label className="mb-4 block text-sm font-semibold text-gray-800">
          Profile Image
        </label>
        {imagePreview ? (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Profile preview"
              className="h-36 w-36 rounded-xl object-cover ring-2 ring-primary/40"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white shadow hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center transition hover:border-primary">
              <Upload className="mx-auto mb-3 h-10 w-10 text-primary" />
              <p className="text-sm font-medium text-gray-700">
                Click to upload or drag & drop
              </p>
              <p className="mt-1 text-xs text-gray-500">PNG or JPG up to 10MB</p>
            </div>
          </label>
        )}
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className={labelBase}>
            <User className="h-4 w-4 text-primary" /> First Name
          </label>
          <input
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            className={inputBase}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label className={labelBase}>
            <User className="h-4 w-4 text-primary" /> Last Name
          </label>
          <input
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            className={inputBase}
            placeholder="Last Name"
            required
          />
        </div>
        <div>
          <label className={labelBase}>
            <User className="h-4 w-4 text-primary" /> Title
          </label>
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            className={inputBase}
            placeholder="Full Stack Developer"
            required
          />
        </div>
        <div>
          <label className={labelBase}>
            <Mail className="h-4 w-4 text-primary" /> Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={inputBase}
            placeholder="your.email@example.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className={labelBase}>
            <Phone className="h-4 w-4 text-primary" /> Phone
          </label>
          <input
            name="phone"
            value={values.phone || ""}
            onChange={handleChange}
            className={inputBase}
            placeholder="+94 7XXXXXXXX"
          />
        </div>

        <div>
          <label className={labelBase}>
            <MapPin className="h-4 w-4 text-primary" /> Location
          </label>
          <input
            name="location"
            value={values.location || ""}
            onChange={handleChange}
            className={inputBase}
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className={labelBase}>Short Bio</label>
        <textarea
          name="shortBio"
          value={values.shortBio}
          onChange={handleChange}
          rows={2}
          className={inputBase}
          placeholder="Brief introduction for hero section"
          required
        />
      </div>

      <div>
        <label className={labelBase}>Long Bio</label>
        <textarea
          name="longBio"
          value={values.longBio}
          onChange={handleChange}
          rows={4}
          className={inputBase}
          placeholder="Detailed description for about page"
          required
        />
      </div>

      {/* Resume Upload */}
      <div>
        <label className={labelBase}>
          <FileText className="h-4 w-4 text-primary" /> Resume (PDF)
        </label>
        {values.resumeUrl ? (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-700 font-medium">{values.resumeUrlName || "Resume.pdf"}</span>
            <button
              type="button"
              onClick={() => setValues((prev) => ({ ...prev, resumeUrl: "", resumeUrlName: "" }))}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="cursor-pointer">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64 = reader.result as string;
                  setValues((prev) => ({ ...prev, resumeUrl: base64, resumeUrlName: file.name }));
                };
                reader.readAsDataURL(file);
              }}
              className="hidden"
            />
            <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-primary">
              <Upload className="mx-auto mb-3 h-8 w-8 text-primary" />
              <p className="text-sm font-medium text-gray-700">Click to upload PDF resume</p>
              <p className="mt-1 text-xs text-gray-500">PDF up to 10MB</p>
            </div>
          </label>
        )}
      </div>

      {/* Motto */}
      <div>
        <label className={labelBase}>Personal Motto</label>
        <input
          name="motto"
          value={values.motto}
          onChange={handleChange}
          className={inputBase}
          placeholder='e.g., Code with purpose, design with passion'
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Your personal motto or tagline for the portfolio
        </p>
      </div>

      {/* Highlights */}
      <div>
        <label className={labelBase}>Key Points / Highlights</label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentHighlight}
              onChange={(e) => setCurrentHighlight(e.target.value)}
              onKeyPress={handleKeyPress}
              className={inputBase}
              placeholder="e.g., UI/UX Design, Full Stack Development, AI Machine Learning"
            />
            <button
              type="button"
              onClick={handleAddHighlight}
              className="rounded-xl bg-primary px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-primary/90"
            >
              Add
            </button>
          </div>
          
          {highlightsList.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {highlightsList.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
                >
                  <span>{highlight}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Add key points one by one. Press Enter or click Add button.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3 font-semibold text-white shadow-md transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
