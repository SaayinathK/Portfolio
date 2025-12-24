"use client";

import { useEffect, useState } from "react";
import GalleryForm, { GalleryFormValues } from "@/components/GalleryForm";

interface GalleryItem extends GalleryFormValues {
  _id: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadItems = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleCreate = async (values: GalleryFormValues) => {
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setEditing(null);
    await loadItems();
  };

  const handleUpdate = async (values: GalleryFormValues) => {
    if (!values._id) return;
    await fetch("/api/gallery", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setEditing(null);
    await loadItems();
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      await loadItems();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-indigo-700">Gallery</h1>
        <button
          onClick={() => setEditing(null)}
          className="rounded-lg bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 text-white font-medium shadow-md"
        >
          Add New Photo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form Section */}
        <div className="lg:col-span-1 bg-gray p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-5 text-indigo-800">
            {editing ? "Edit Photo" : "Create Photo"}
          </h2>
          <GalleryForm
            initialValues={editing || undefined}
            onSubmit={editing ? handleUpdate : handleCreate}
            submitLabel={editing ? "Update" : "Create"}
          />
        </div>

        {/* Gallery Items */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow hover:shadow-lg transition flex flex-col"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400 relative">
                {item.images && item.images.length > 0 ? (
                  <>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    {item.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        +{item.images.length - 1} more
                      </div>
                    )}
                  </>
                ) : (
                  <span>No Images</span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {item.images?.length || 0} image(s)
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    onClick={() => setEditing(item)}
                    className="text-sm rounded-md border border-indigo-500 px-3 py-1 text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-sm rounded-md border border-red-500 px-3 py-1 text-red-600 hover:bg-red-50 transition disabled:opacity-60"
                    disabled={deletingId === item._id}
                  >
                    {deletingId === item._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-gray-500 col-span-full text-center mt-4">
              No photos yet. Use the form to add one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
