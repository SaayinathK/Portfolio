"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Download, Share2, Check } from "lucide-react";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  createdAt: string;
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [thumbnailScroll, setThumbnailScroll] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setGalleries(data);
      } catch (error) {
        console.error("Failed to load galleries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const openGallery = (gallery: GalleryItem) => {
    setSelectedGallery(gallery);
    setCurrentImageIndex(0);
    setThumbnailScroll(0);
    setSelectedIndices([]);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    setCurrentImageIndex(0);
    setThumbnailScroll(0);
    setSelectedIndices([]);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => 
        prev < selectedGallery.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => 
        prev > 0 ? prev - 1 : selectedGallery.images.length - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleSelected = (idx: number) => {
    setSelectedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const downloadSelected = () => {
    if (!selectedGallery || selectedIndices.length === 0) return;
    selectedIndices.forEach((idx) => {
      const url = selectedGallery.images[idx];
      const a = document.createElement("a");
      a.href = url;
      a.download = `image-${idx + 1}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-pink-500 border-t-transparent mx-auto"></div>
          <p className="text-white mt-4 text-lg">Loading galleries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Gallery Collection
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Explore our curated collection of moments and memories
          </p>
        </motion.div>

        {/* Galleries Grid */}
        {galleries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ImageIcon className="h-24 w-24 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl">No galleries available yet</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery, index) => (
              <motion.div
                key={gallery._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => openGallery(gallery)}
                className="relative group cursor-pointer rounded-3xl overflow-hidden bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm border border-pink-500/20 shadow-xl hover:shadow-pink-500/20 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={gallery.images[0]}
                    alt={gallery.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Image Count Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                    <ImageIcon size={16} />
                    {gallery.images.length}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                    {gallery.title}
                  </h3>
                  {gallery.description && (
                    <p className="text-gray-400 line-clamp-2 mb-4">
                      {gallery.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(gallery.createdAt).toLocaleDateString()}</span>
                    <span className="text-pink-400 font-medium group-hover:translate-x-2 transition-transform">
                      View Gallery →
                    </span>
                  </div>
                </div>

                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
            onClick={closeGallery}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeGallery}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all z-10"
            >
              <X size={24} />
            </motion.button>

            {/* Gallery Info Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-2xl p-6 max-w-md z-10 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedGallery.title}
              </h2>
              {selectedGallery.description && (
                <p className="text-gray-300 text-sm mb-3">
                  {selectedGallery.description}
                </p>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-pink-400 font-semibold">
                  {currentImageIndex + 1} / {selectedGallery.images.length}
                </span>
                <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentImageIndex + 1) / selectedGallery.images.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Main Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[70vh] flex items-center justify-center"
            >
              {/* Navigation Arrows */}
              {selectedGallery.images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, x: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all z-10 group"
                  >
                    <ChevronLeft size={32} className="group-hover:text-pink-400 transition-colors" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all z-10 group"
                  >
                    <ChevronRight size={32} className="group-hover:text-pink-400 transition-colors" />
                  </motion.button>
                </>
              )}

              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={selectedGallery.images[currentImageIndex]}
                  alt={`${selectedGallery.title} - ${currentImageIndex + 1}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain rounded-2xl"
                />
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="absolute bottom-6 right-6 flex gap-3 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all"
                  title="Download image"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!selectedGallery) return;
                    const a = document.createElement("a");
                    a.href = selectedGallery.images[currentImageIndex];
                    a.download = `image-${currentImageIndex + 1}`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                  }}
                >
                  <Download size={20} />
                </motion.button>
                {/* Download selected (only shown when any selected) */}
                {selectedIndices.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-pink-600/70 hover:bg-pink-600 rounded-full text-white backdrop-blur-sm transition-all"
                    title={`Download ${selectedIndices.length} selected`}
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadSelected();
                    }}
                  >
                    <Download size={20} />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all"
                  title="Share image"
                >
                  <Share2 size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Thumbnails Strip */}
            {selectedGallery.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-0 right-0 flex justify-center"
              >
                <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10 max-w-4xl overflow-x-auto">
                  {selectedGallery.images.map((img, idx) => {
                    const isSelected = selectedIndices.includes(idx);
                    return (
                      <div key={idx} className="relative">
                        {/* Select overlay toggle */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelected(idx);
                          }}
                          aria-pressed={isSelected}
                          aria-label={`Select image ${idx + 1}`}
                          className={`absolute -top-2 -left-2 z-10 p-1.5 rounded-full border text-white ${
                            isSelected
                              ? "bg-pink-600 border-pink-400"
                              : "bg-black/60 border-white/30 hover:bg-white/20"
                          }`}
                        >
                          {isSelected ? <Check size={14} /> : <span className="block w-3 h-3" />}
                        </button>

                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            goToImage(idx);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
                            idx === currentImageIndex
                              ? "border-pink-500 ring-2 ring-pink-500/50 scale-110"
                              : "border-white/30 opacity-60 hover:opacity-100"
                          } ${isSelected ? "outline outline-2 outline-pink-500" : ""}`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-pink-500/20 pointer-events-none" />
                          )}
                        </motion.button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Keyboard Navigation Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-6 text-xs text-gray-400 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10"
            >
              Use arrow keys to navigate • ESC to close
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}