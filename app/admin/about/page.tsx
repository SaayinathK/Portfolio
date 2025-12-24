"use client";

import { useEffect, useState } from "react";
import AboutForm, { AboutFormValues } from "@/components/AboutForm";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface About extends AboutFormValues {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminAboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/about");
      if (res.status === 404) {
        setAbout(null);
      } else {
        const data = await res.json();
        setAbout({
          ...data,
          highlights: data.highlights || [],
        });
      }
    } catch (err) {
      setError("Failed to load about information");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: AboutFormValues) => {
    try {
      setError(null);
      const method = about ? "PUT" : "POST";
      const res = await fetch("/api/about", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to save");

      const data = await res.json();
      setAbout(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to save about information");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-500 animate-pulse text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">About Section</h1>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 animate-fadeIn">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-4 animate-fadeIn">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <p className="text-green-800 font-medium">
            About information saved successfully!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md border p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">
              {about ? "Edit About Section" : "Create About Section"}
            </h2>
            <AboutForm
              initialValues={
                about
                  ? {
                      title: about.title || "",
                      shortBio: about.shortBio || "",
                      longBio: about.longBio || "",
                      email: about.email || "",
                      phone: about.phone || "",
                      location: about.location || "",
                      resumeUrl: about.resumeUrl || "",
                      profileImageUrl: about.profileImageUrl || "",
                      motto: about.motto || "",
                      highlights: Array.isArray(about.highlights)
                        ? about.highlights.join("\n")
                        : "",
                    }
                  : undefined
              }
              onSubmit={handleSubmit}
              submitLabel={about ? "Update" : "Create"}
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-semibold text-lg text-gray-700 mb-4">Preview</h3>

            {about ? (
              <div className="space-y-4">
                {about.profileImageUrl && (
                  <img
                    src={about.profileImageUrl}
                    alt="Profile"
                    className="w-full rounded-xl object-cover shadow-sm"
                  />
                )}

                <div>
                  <p className="text-xs text-gray-400 mb-1">TITLE</p>
                  <p className="font-medium text-gray-700">{about.title}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">EMAIL</p>
                  <p className="text-gray-600">{about.email}</p>
                </div>

                {about.phone && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">PHONE</p>
                    <p className="text-gray-600">{about.phone}</p>
                  </div>
                )}

                {about.location && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">LOCATION</p>
                    <p className="text-gray-600">{about.location}</p>
                  </div>
                )}

                {about.motto && (
                  <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                    <p className="text-xs text-gray-400 mb-1">MOTTO</p>
                    <p className="text-gray-700 italic">{about.motto}</p>
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-400 mb-1">SHORT BIO</p>
                  <p className="text-gray-600 line-clamp-2">{about.shortBio}</p>
                </div>

                {about.longBio && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">LONG BIO</p>
                    <p className="text-gray-600 whitespace-pre-line line-clamp-6">
                      {about.longBio}
                    </p>
                  </div>
                )}

                {about.resumeUrl && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">RESUME</p>
                    <a
                      href={about.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                    >
                      View Resume
                    </a>
                  </div>
                )}

                {about.highlights && (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">HIGHLIGHTS</p>
                    <ul className="text-gray-600 space-y-1 list-disc list-inside">
                      {(Array.isArray(about.highlights)
                        ? about.highlights
                        : about.highlights.split("\n")
                      ).map((h: string, i: number) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No about information created yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
