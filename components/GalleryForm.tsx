"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { X, Upload, Star } from "lucide-react";


export interface GalleryFormValues {
  _id?: string;
  title: string;
  description?: string;
  images: string[];
}

interface GalleryFormProps {
  initialValues?: GalleryFormValues;
  onSubmit: (values: GalleryFormValues) => void;
  submitLabel?: ReactNode; // Allows icons or styled text
}

export default function GalleryForm({
  initialValues,
  onSubmit,
  submitLabel,
}: GalleryFormProps) {
  const [form, setForm] = useState<GalleryFormValues>({
    title: "",
    description: "",
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
      setImagePreviews(initialValues.images || []);
    } else {
      setForm({
        title: "",
        description: "",
        images: [],
      });
      setImagePreviews([]);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (!file.type.startsWith("image/")) {
          alert("Only images allowed");
          return null;
        }
        if (file.size > 10 * 1024 * 1024) {
          alert("Max 10MB allowed");
          return null;
        }
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data.url;
      });

      const cloudinaryUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[];
      setImagePreviews((prev) => [...prev, ...cloudinaryUrls]);
      setForm((prev) => ({ ...prev, images: [...prev.images, ...cloudinaryUrls] }));
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const setAsThumbnail = (index: number) => {
    setImagePreviews((prev) => {
      const next = [...prev];
      const [img] = next.splice(index, 1);
      next.unshift(img);
      return next;
    });
    setForm((prev) => {
      const nextImages = [...prev.images];
      const [img] = nextImages.splice(index, 1);
      nextImages.unshift(img);
      return { ...prev, images: nextImages };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.images.length === 0) {
      alert("Please upload at least one image");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(form);
      if (!initialValues) {
        setForm({
          title: "",
          description: "",
          images: [],
        });
        setImagePreviews([]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-xl shadow-md"
    >
      <div>
        <label className="block text-sm font-semibold text-indigo-700 mb-2">
          Gallery Title *
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter gallery title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-indigo-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          rows={3}
          placeholder="Optional description"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-indigo-700 mb-2">
          Images * (First image will be the thumbnail)
        </label>

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {imagePreviews.map((img, index) => (
              <div key={index} className="relative group">
                <Image
                  src={img}
                  alt={`Preview ${index + 1}`}
                  width={320}
                  height={128}
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                  unoptimized={typeof img === "string" && img.startsWith("/uploads/")}
                />
                {index === 0 ? (
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                    Thumbnail
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAsThumbnail(index)}
                    className="absolute top-2 left-2 px-2 py-1 rounded bg-indigo-600 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                    aria-label="Set as thumbnail"
                  >
                    <Star size={12} />
                    Set thumbnail
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors bg-gray-50">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            multiple
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
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                <span className="text-sm text-gray-700 font-medium">
                  Uploading...
                </span>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-indigo-500" />
                <span className="text-sm text-gray-800 font-medium">
                  Click to upload multiple images
                </span>
                <span className="text-xs text-gray-600">
                  PNG, JPG, GIF - First image will be thumbnail
                </span>
              </>
            )}
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 shadow-md disabled:opacity-60"
        disabled={isSubmitting || form.images.length === 0}
      >
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
}
