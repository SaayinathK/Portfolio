"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Instagram } from "lucide-react";

export interface ContactFormValues {
  _id?: string;
  name: string;
  email: string;
  studentEmail?: string;
  workEmail?: string;
  phone: string;
  location: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
}

interface Props {
  initialValues?: ContactFormValues;
  onSubmit: (values: ContactFormValues) => Promise<void> | void;
  submitLabel?: string;
}

export default function ContactForm({ initialValues, onSubmit, submitLabel = "Send" }: Props) {
  const [values, setValues] = useState<ContactFormValues>(
    initialValues ?? {
      name: "",
      email: "",
      studentEmail: "",
      workEmail: "",
      phone: "",
      location: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      github: "",
    }
  );

  useEffect(() => {
    setValues(
      initialValues ?? {
        name: "",
        email: "",
        studentEmail: "",
        workEmail: "",
        phone: "",
        location: "",
        instagram: "",
        facebook: "",
        linkedin: "",
        github: "",
      }
    );
  }, [initialValues]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(values);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={values.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>

      {/* Email Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
            <Mail size={16} /> Primary Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Student Email
          </label>
          <input
            type="email"
            name="studentEmail"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={values.studentEmail}
            onChange={handleChange}
            placeholder="student@university.edu"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Work Email
          </label>
          <input
            type="email"
            name="workEmail"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={values.workEmail}
            onChange={handleChange}
            placeholder="work@company.com"
          />
        </div>
      </div>

      {/* Phone & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
            <Phone size={16} /> Phone <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={values.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
            <MapPin size={16} /> Location <span className="text-red-500">*</span>
          </label>
          <input
            name="location"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={values.location}
            onChange={handleChange}
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* Social Media Links */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
              <Github size={16} /> GitHub
            </label>
            <input
              name="github"
              type="url"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={values.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
              <Linkedin size={16} /> LinkedIn
            </label>
            <input
              name="linkedin"
              type="url"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={values.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
              <Facebook size={16} /> Facebook
            </label>
            <input
              name="facebook"
              type="url"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={values.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
              <Instagram size={16} /> Instagram
            </label>
            <input
              name="instagram"
              type="url"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={values.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/username"
            />
          </div>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={submitting}
        className="w-full px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold disabled:opacity-50"
      >
        {submitting ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
}