"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export interface EducationFormValues {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  isCurrentlyEnrolled: boolean;
  description?: string;
  gpa?: string;
  activities?: string;
  logo?: string;
}

interface EducationFormProps {
  initialValues?: EducationFormValues;
  onSubmit: (values: EducationFormValues) => Promise<void>;
  submitLabel?: string;
}

const DEGREES = [
  "High School Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Professional Certificate",
  "Bootcamp",
  "Other",
];

export default function EducationForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
}: EducationFormProps) {
  const [values, setValues] = useState<EducationFormValues>({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    isCurrentlyEnrolled: false,
    description: "",
    gpa: "",
    activities: "",
    logo: "",
  });
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setValues({
        ...initialValues,
        startDate: initialValues.startDate
          ? new Date(initialValues.startDate as any).toISOString().substring(0, 10)
          : "",
        endDate: initialValues.endDate
          ? new Date(initialValues.endDate as any).toISOString().substring(0, 10)
          : "",
        activities: Array.isArray(initialValues.activities)
          ? initialValues.activities.join("\n")
          : initialValues.activities || "",
      });
      if (initialValues.logo) {
        setLogoPreview(initialValues.logo);
      }
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as any;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoPreview(result);
        setValues((prev) => ({
          ...prev,
          logo: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview("");
    setValues((prev) => ({
      ...prev,
      logo: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit(values);
      if (!initialValues) {
        setValues({
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          isCurrentlyEnrolled: false,
          description: "",
          gpa: "",
          activities: "",
          logo: "",
        });
        setLogoPreview("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white shadow-md rounded-lg">
      

      {/* Institution Logo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Institution Logo
        </label>
        <div className="space-y-3">
          {logoPreview && (
            <div className="relative inline-block">
              <img
                src={logoPreview}
                alt="Logo preview"
                className="h-32 w-32 object-contain rounded-lg border-2 border-gray-300 p-2 bg-gray-50"
              />
              <button
                type="button"
                onClick={removeLogo}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
              >
                <X size={16} />
              </button>
            </div>
          )}
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                cursor-pointer"
            />
          </label>
          <p className="text-xs text-gray-500">
            Supported formats: PNG, JPG, SVG, GIF (Max 2MB)
          </p>
        </div>
      </div>

      {/* Institution */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Institution <span className="text-red-500">*</span>
        </label>
        <input
          name="institution"
          value={values.institution}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 text-gray-900 placeholder-gray-400"
          placeholder="e.g., SLIIT, Harvard University"
          required
        />
      </div>

      {/* Degree & Field */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Field of Study <span className="text-red-500">*</span>
          </label>
          <input
            name="field"
            value={values.field}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 text-gray-900 placeholder-gray-400"
            placeholder="e.g., Computer Science, Engineering"
            required
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={values.startDate}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={values.endDate || ""}
            onChange={handleChange}
            disabled={values.isCurrentlyEnrolled}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Currently Enrolled */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isCurrentlyEnrolled"
          name="isCurrentlyEnrolled"
          checked={values.isCurrentlyEnrolled}
          onChange={handleChange}
          className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
        <label htmlFor="isCurrentlyEnrolled" className="text-sm font-medium text-gray-700">
          Currently Enrolled
        </label>
      </div>

      {/* GPA */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">GPA</label>
        <input
          name="gpa"
          value={values.gpa || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 text-gray-900 placeholder-gray-400"
          placeholder="e.g., 3.8/4.0"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={values.description || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 text-gray-900 placeholder-gray-400"
          rows={3}
          placeholder="Additional details about your education"
        />
      </div>

      {/* Activities */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Activities (one per line)
        </label>
        <textarea
          name="activities"
          value={values.activities || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 text-gray-900 font-mono text-sm"
          rows={4}
          placeholder={`Dean's List\nScholar Athlete\nPresident of Tech Club`}
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter each activity on a new line
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-4 py-2 hover:from-blue-600 hover:to-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
