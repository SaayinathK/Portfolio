"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface SkillFormValues {
  _id?: string;
  name: string;
  type: 'Technical Skills' | 'Languages Spoken';
  subtype?: string;
  language?: string;
  level?: string;
  languageProficiency?: string;
  description?: string;
  proficiency?: number;
}

interface SkillFormProps {
  initialValues?: SkillFormValues;
  onSubmit: (values: SkillFormValues) => Promise<void> | void;
  submitLabel?: ReactNode;
}

const SKILL_TYPES = ["Technical Skills", "Languages Spoken"] as const;
const TECHNICAL_SUBTYPES = [
  "Mobile Development",
  "Web Development",
  "Frameworks",
  "Programming Languages",
  "Databases",
  "Tools & Platforms",
];
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const LANGUAGE_PROFICIENCY = [
  "Elementary proficiency",
  "Limited working proficiency",
  "Professional working proficiency",
  "Full professional proficiency",
  "Native or bilingual proficiency",
];

export default function SkillForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
}: SkillFormProps) {
  const [values, setValues] = useState<SkillFormValues>({
    name: "",
    type: "Technical Skills",
    subtype: "",
    language: "",
    level: "",
    languageProficiency: "",
    description: "",
    proficiency: 50,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialValues) {
      setValues({
        ...initialValues,
        type: initialValues.type || "Technical Skills",
      });
      setErrors({});
    } else {
      setValues({
        name: "",
        type: "Technical Skills",
        subtype: "",
        language: "",
        level: "",
        languageProficiency: "",
        description: "",
        proficiency: 50,
      });
      setErrors({});
    }
  }, [initialValues]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    // For Technical Skills, name is required
    // For Languages Spoken, language field serves as name
    if (values.type === "Technical Skills" && !values.name?.trim()) {
      newErrors.name = "Skill name is required";
    }
    if (values.type === "Languages Spoken" && !values.language?.trim()) {
      newErrors.language = "Language is required";
    }
    if (values.proficiency !== undefined && (values.proficiency < 0 || values.proficiency > 100)) {
      newErrors.proficiency = "Proficiency must be between 0 and 100";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      
      // For Languages Spoken, use language value as name
      const submitValues = { ...values };
      if (submitValues.type === "Languages Spoken" && submitValues.language) {
        submitValues.name = submitValues.language;
      }
      
      await onSubmit(submitValues);
      if (!initialValues) {
        setValues({
          name: "",
          type: "Technical Skills",
          subtype: "",
          language: "",
          level: "",
          languageProficiency: "",
          description: "",
          proficiency: 50,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    
      <div>
        <label className="block text-sm font-medium mb-1">
          Type <span className="text-red-500">*</span>
        </label>
        <select
          name="type"
          value={values.type}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          {SKILL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {values.type === "Technical Skills" ? (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Subtype</label>
            <select
              name="subtype"
              value={values.subtype || ""}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a subtype</option>
              {TECHNICAL_SUBTYPES.map((subtype) => (
                <option key={subtype} value={subtype}>
                  {subtype}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Skill Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-300" : "focus:ring-primary"
              }`}
              placeholder="e.g., React, English, Python"
              required
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Level</label>
            <select
              name="level"
              value={values.level || ""}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a level</option>
              {SKILL_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">
              Language <span className="text-red-500">*</span>
            </label>
            <input
              name="language"
              value={values.language || ""}
              onChange={handleChange}
              className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.language ? "border-red-500 focus:ring-red-300" : "focus:ring-primary"
              }`}
              placeholder="e.g., English"
              required
            />
            {errors.language && <p className="text-sm text-red-500 mt-1">{errors.language}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Proficiency <span className="text-red-500">*</span>
            </label>
            <select
              name="languageProficiency"
              value={values.languageProficiency || ""}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select proficiency level</option>
              {LANGUAGE_PROFICIENCY.map((prof) => (
                <option key={prof} value={prof}>
                  {prof}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-primary px-4 py-2 text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitLabel}
      </button>
    </form>
  );
}


