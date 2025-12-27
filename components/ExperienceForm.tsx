// eslint-disable-next-line jsx-a11y/alt-text
"use client";

import { useState, useEffect } from "react";
import { Save, Building2, Briefcase, MapPin, Calendar, FileText, Trophy, Loader2, Image, X } from "lucide-react";
import NextImage from "next/image";

export interface ExperienceFormValues {
  _id?: string;
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrentlyWorking: boolean;
  description?: string;
  achievements?: string; // newline-separated
  logo?: string;
}

interface Props {
  initialValues?: ExperienceFormValues;
  onSubmit: (values: ExperienceFormValues) => Promise<void> | void;
  submitLabel?: string | React.ReactNode;
}

export default function ExperienceForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
}: Props) {
  const [values, setValues] = useState<ExperienceFormValues>(
    initialValues ?? {
      company: "",
      title: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrentlyWorking: false,
      description: "",
      achievements: "",
      logo: "",
    }
  );
  const [submitting, setSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>(initialValues?.logo || "");

  // Update form values when initialValues change (e.g., when editing a different item)
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
      setLogoPreview(initialValues.logo || "");
    } else {
      // Reset to default when no initialValues
      setValues({
        company: "",
        title: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrentlyWorking: false,
        description: "",
        achievements: "",
        logo: "",
      });
      setLogoPreview("");
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({
      ...v,
      isCurrentlyWorking: e.target.checked,
      endDate: e.target.checked ? "" : v.endDate,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setLogoPreview(base64String);
      setValues((v) => ({ ...v, logo: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoPreview("");
    setValues((v) => ({ ...v, logo: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(values);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Building2 className="w-4 h-4 text-blue-600" />
          Company *
        </label>
        <input
          name="company"
          value={values.company}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
          placeholder="Enter company name (e.g., Google)"
          required
        />
      </div>

      {/* Logo Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Image className="w-4 h-4 text-blue-600" />
          Company Logo
        </label>
        <div className="space-y-3">
          {logoPreview ? (
            <div className="relative inline-block">
              <NextImage
                src={logoPreview}
                alt="Company logo preview"
                width={128}
                height={128}
                className="w-32 h-32 object-contain rounded-lg border-2 border-gray-200 bg-white p-2"
                unoptimized
              />
              <button
                type="button"
                onClick={removeLogo}
                className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
              />
            </div>
          )}
          <p className="text-xs text-gray-500">
            Supported formats: PNG, JPG, SVG, GIF (Max 2MB)
          </p>
        </div>
      </div>

      {/* Title Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Briefcase className="w-4 h-4 text-blue-600" />
          Job Title *
        </label>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
          placeholder="Enter your job title (e.g., Senior Software Engineer)"
          required
        />
      </div>

      {/* Location Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <MapPin className="w-4 h-4 text-blue-600" />
          Location
        </label>
        <input
          name="location"
          value={values.location}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
          placeholder="City, Country (e.g., San Francisco, CA)"
        />
      </div>

    
      {/* Date Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <Calendar className="w-4 h-4 text-blue-600" />
            Start Date *
          </label>
          <div className="relative">
            <input
              type="date"
              name="startDate"
              value={values.startDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
              required
            />
            {!values.startDate && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                Select date
              </span>
            )}
          </div>
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Calendar className="w-4 h-4 text-blue-600" />
              End Date
            </label>
            <span className="text-xs text-gray-500">
              {values.isCurrentlyWorking ? "(Disabled when current)" : ""}
            </span>
          </div>
          <div className="relative">
            <input
              type="date"
              name="endDate"
              value={values.endDate}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-3 text-gray-800 focus:outline-none transition-all duration-200 ${
                values.isCurrentlyWorking
                  ? "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                  : "border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
              disabled={values.isCurrentlyWorking}
            />
            {!values.endDate && !values.isCurrentlyWorking && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                Select date
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Currently Working Checkbox */}
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="relative">
          <input
            type="checkbox"
            id="currentlyWorking"
            checked={values.isCurrentlyWorking}
            onChange={handleToggle}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 transition-all duration-200"
          />
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <label htmlFor="currentlyWorking" className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm font-semibold text-gray-800">Currently working here</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
            Sets end date to &quot;Present&quot;
          </span>
        </label>
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <FileText className="w-4 h-4 text-blue-600" />
          Description
        </label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 resize-none"
          rows={3}
          placeholder="Describe your role, responsibilities, and impact..."
        />
        <p className="text-xs text-gray-500 text-right">
          {values.description?.length || 0}/500 characters
        </p>
      </div>

      {/* Achievements Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Trophy className="w-4 h-4 text-blue-600" />
          Key Achievements
          <span className="text-xs font-normal text-gray-600">(one per line)</span>
        </label>
        <div className="relative">
          <textarea
            name="achievements"
            value={values.achievements}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 resize-none"
            rows={4}
            placeholder="• Increased performance by 40%&#10;• Led a team of 5 developers&#10;• Implemented new CI/CD pipeline"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-500">
            {values.achievements?.split('\n').filter(line => line.trim()).length || 0} items
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <span>Each line will become a bullet point in the list</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="group w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-semibold text-white hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {typeof submitLabel === 'string' ? (
                <>
                  <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {submitLabel}
                </>
              ) : (
                submitLabel
              )}
            </>
          )}
        </button>
        
        {/* Form Status */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>
            {values.company && values.title && values.startDate
              ? "All required fields are filled ✓"
              : "Fill in required fields (*) to enable submission"}
          </span>
        </div>
      </div>
    </form>
  );
}