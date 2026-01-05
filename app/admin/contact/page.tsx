"use client";

import { useEffect, useState } from "react";
import ContactForm, { ContactFormValues } from "@/components/ContactForm";
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Instagram } from "lucide-react";

interface Contact extends ContactFormValues {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminContactPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/contact");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toPayload = (values: ContactFormValues) => ({ ...values });

  const handleCreate = async (values: ContactFormValues) => {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toPayload(values)),
    });
    setEditing(null);
    await load();
  };

  const handleUpdate = async (values: ContactFormValues) => {
    if (!values._id) return;
    await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toPayload(values)),
    });
    setEditing(null);
    await load();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/contact", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    await load();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-indigo-700">Contact Information Management</h1>

      {/* Form Section */}
      <div className="border border-indigo-200 rounded-xl bg-white p-8 shadow-md">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-6">
          {editing ? "Edit Contact Information" : "Add Contact Information"}
        </h2>
          <ContactForm
            initialValues={
              editing
                ? {
                    _id: editing._id,
                    name: editing.name,
                    email: editing.email,
                    studentEmail: editing.studentEmail,
                    workEmail: editing.workEmail,
                    phone: editing.phone,
                    location: editing.location,
                    instagram: editing.instagram,
                    facebook: editing.facebook,
                    linkedin: editing.linkedin,
                    github: editing.github,
                  }
                : {
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
            }
            onSubmit={editing ? handleUpdate : handleCreate}
            submitLabel={editing ? "Update" : "Create"}
          />
      </div>

      {/* Submissions Section */}
      <div>
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Contact Submissions</h2>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading submissions...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-600">No submissions yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {Array.isArray(items) && items.map((contact) => (
              <div
                key={contact._id}
                className="border border-gray-200 rounded-lg bg-white p-6 shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                  </div>
                </div>

                {/* Contact Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-gray-600 font-medium">Email</p>
                      <p className="text-gray-900">{contact.email}</p>
                    </div>
                  </div>

                  {contact.studentEmail && (
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-600 font-medium">Student Email</p>
                        <p className="text-gray-900">{contact.studentEmail}</p>
                      </div>
                    </div>
                  )}

                  {contact.workEmail && (
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-600 font-medium">Work Email</p>
                        <p className="text-gray-900">{contact.workEmail}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-gray-600 font-medium">Phone</p>
                      <p className="text-gray-900">{contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:col-span-2">
                    <MapPin size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-gray-600 font-medium">Location</p>
                      <p className="text-gray-900">{contact.location}</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                {(contact.github || contact.linkedin || contact.facebook || contact.instagram) && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">Social Media</p>
                    <div className="flex gap-4">
                      {contact.github && (
                        <a
                          href={contact.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {contact.linkedin && (
                        <a
                          href={contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700"
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                      {contact.facebook && (
                        <a
                          href={contact.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700"
                        >
                          <Facebook size={20} />
                        </a>
                      )}
                      {contact.instagram && (
                        <a
                          href={contact.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700"
                        >
                          <Instagram size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setEditing(contact)}
                    className="px-4 py-2 text-sm rounded-lg border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="px-4 py-2 text-sm rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}