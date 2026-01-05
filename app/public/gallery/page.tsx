"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Eye, X, Image as ImageIcon } from "lucide-react";
import React from "react";

interface GalleryItem {
  _id?: string;
  title?: string;
  description?: string;
  images?: string[];
  image?: string;
  url?: string;
  imageUrl?: string;
  src?: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  codeComment: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, codeComment }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-white">{title}</h2>
    <p className="text-blue-300">{subtitle}</p>
    <span className="text-xs text-gray-500">{codeComment}</span>
  </div>
);

const GalleryPage: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [selectedAlbumItem, setSelectedAlbumItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryScrollRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for gallery scroll
  const handleGalleryKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (document.activeElement !== document.body) return;
      if (!galleryScrollRef.current) return;
      if (e.key === "ArrowRight") {
        galleryScrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
      } else if (e.key === "ArrowLeft") {
        galleryScrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
      }
    },
    []
  );

  // Keyboard navigation for modal
  const handleModalKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isAlbumModalOpen || !selectedAlbumItem) return;
      if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          selectedAlbumItem.images && selectedAlbumItem.images.length > 0
            ? (prev + 1) % selectedAlbumItem.images.length
            : prev
        );
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          selectedAlbumItem.images && selectedAlbumItem.images.length > 0
            ? (prev - 1 + selectedAlbumItem.images.length) % selectedAlbumItem.images.length
            : prev
        );
      } else if (e.key === "Escape") {
        setIsAlbumModalOpen(false);
      }
    },
    [isAlbumModalOpen, selectedAlbumItem]
  );

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setGallery(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isAlbumModalOpen) {
      window.addEventListener("keydown", handleModalKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      window.addEventListener("keydown", handleGalleryKeyDown);
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleModalKeyDown);
      window.removeEventListener("keydown", handleGalleryKeyDown);
      document.body.style.overflow = "";
    };
  }, [isAlbumModalOpen, handleModalKeyDown, handleGalleryKeyDown]);

  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="scroll-mt-20"
    >
      <SectionHeader
        title=""
        subtitle=""
        codeComment=""
      />

      {loading ? (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex-shrink-0 w-80 h-96 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="relative group">
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (galleryScrollRef.current) {
                galleryScrollRef.current.scrollBy({
                  left: -400,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-blue-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Scrollable Gallery */}
          <div
            id="gallery-scroll"
            ref={galleryScrollRef}
            tabIndex={0}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {Array.isArray(gallery) && gallery.map((g, i) => {
              const src = g.images?.[0] || g.image || g.url || g.imageUrl || g.src;
              const alt = g.title || "Gallery item";
              const imageCount = g.images?.length || 1;
              return (
                <motion.figure
                  key={g._id || src}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    rotateY: 3,
                    transition: { duration: 0.3 },
                  }}
                  className="flex-shrink-0 w-65 h-96 group/item relative overflow-hidden rounded-3xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent backdrop-blur-md cursor-pointer shadow-xl hover:shadow-blue-500/20"
                  onClick={() => {
                    setSelectedAlbumItem(g);
                    setCurrentImageIndex(0);
                    setIsAlbumModalOpen(true);
                  }}
                >
                  <motion.div
                  key={g._id || i}
                  whileHover={{ y: -10 }}
                  className="relative w-80 h-96 rounded-3xl overflow-hidden border-2 border-blue-500/20 cursor-pointer group/item"
                  onClick={() => {
                    setSelectedAlbumItem(g);
                    setIsAlbumModalOpen(true);
                  }}
                >
                  {/* BACKGROUND IMAGE (ALWAYS PRESENT) */}
                  {src ? (
                    <Image
                      src={src}
                      alt={g.title || "Gallery"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-900/20">
                      <ImageIcon size={48} className="text-blue-400/40" />
                    </div>
                  )}

                  {/* DARK GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-blue-900/20 to-transparent" />

                  {/* DEFAULT STATE (TITLE ONLY) */}
                  <div className="absolute bottom-0 w-full p-4 transition-opacity duration-300 group-hover/item:opacity-0">
                    <h3 className="text-white text-lg font-bold truncate">
                      {g.title}
                    </h3>
                  </div>

                  {/* HOVER STATE (TITLE + DESCRIPTION) */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 px-5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm">
                    <h3 className="text-white text-xl font-bold mb-2">
                      {g.title}
                    </h3>
                    <p className="text-gray-200 text-sm text-size-2 line-clamp-6 justify-center left-0 right-4">
                      {g.description}
                    </p>
                  </div>

                </motion.div>
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-400/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />                 

                  {/* Image Count Badge */}
                  {imageCount > 1 && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1">
                      <ImageIcon size={14} />
                      +{imageCount - 1} more
                    </div>
                  )}

                
                  {/* Floating indicator badge */}
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                  >
                    <div className="p-2.5 rounded-full bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-md shadow-lg opacity-0 group-hover:item:opacity-100 transition-opacity">
                      <Eye size={18} className="text-white" />
                    </div>
                  </motion.div>

                  {/* Particle effects */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
                    {[...Array(4)].map((_, idx) => (
                      <motion.div
                        key={idx}
                        className="absolute h-1 w-1 rounded-full bg-blue-400/60"
                        initial={{
                          x: Math.random() * 100 + "%",
                          y: "100%",
                          opacity: 0,
                        }}
                        animate={{
                          y: "-10%",
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          delay: idx * 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 1.5,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.figure>
              );
            })}
          </div>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (galleryScrollRef.current) {
                galleryScrollRef.current.scrollBy({
                  left: 400,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-blue-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Progress indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {Array.isArray(gallery) && gallery.slice(0, Math.min(gallery.length, 8)).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-blue-500/30" />
            ))}
          </div>
        </div>
      )}

      {/* Album Modal - View All Images */}
      <AnimatePresence>
        {isAlbumModalOpen && selectedAlbumItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAlbumModalOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            style={{
              alignItems: "flex-end",
              // Center on mobile, bottom on desktop
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-black/95 to-black/85 border-2 border-blue-500/30 rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col relative"
              style={{ width: "800px", height: "600px", marginBottom: "3rem" }} // Move modal 4rem up from bottom
            >
              {/* Header */}
              <div className="p-6 border-b border-blue-500/20 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 truncate">{selectedAlbumItem.title || "Album"}</h3>
                  <p className="text-gray-400 text-sm">{selectedAlbumItem.images?.length || 1} images</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAlbumModalOpen(false)}
                  className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Main Image and Description Side by Side */}
              <div className="flex-1 flex flex-col sm:flex-row bg-black/50 overflow-hidden">
                
                {/* Image Panel */}
                <div className="w-full sm:w-3/5 flex items-center justify-center relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <div 
                        className="relative w-[90vw] h-[220px] sm:w-[400px] sm:h-[400px] flex items-center justify-center group/imagepanel"
                      >
                        <Image
                          src={
                            selectedAlbumItem.images?.[currentImageIndex]
                              ? selectedAlbumItem.images[currentImageIndex] as string
                              : (selectedAlbumItem.image as string)
                          }
                          alt={`${selectedAlbumItem.title} - Image ${currentImageIndex + 1}`}
                          className="object-contain rounded-xl shadow-lg w-full h-full"
                          width={400}
                          height={400}
                          sizes="(max-width: 640px) 90vw, 400px"
                        />
                        {/* Image Counter */}
                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-blue-500/30">
                          <span className="text-blue-300 font-semibold text-xs sm:text-sm">
                            {currentImageIndex + 1} / {selectedAlbumItem.images?.length || 1}
                          </span>
                        </div>
                        {/* Navigation Arrows */}
                        {selectedAlbumItem.images && selectedAlbumItem.images.length > 1 && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                setCurrentImageIndex(
                                  (prev) => {
                                    const len = selectedAlbumItem.images?.length ?? 0;
                                    return len > 0 ? (prev - 1 + len) % len : prev;
                                  }
                                )
                              }
                              className="absolute left-2 sm:left-4 p-2 sm:p-3 rounded-full bg-gray-800/80 text-white transition-all shadow-lg opacity-0 group-hover/imagepanel:opacity-100 transition-opacity"
                            >
                              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                setCurrentImageIndex(
                                  (prev) => {
                                    const len = selectedAlbumItem.images?.length ?? 0;
                                    return len > 0 ? (prev + 1) % len : prev;
                                  }
                                )
                              }
                              className="absolute right-2 sm:right-4 p-2 sm:p-3 rounded-full bg-gray-800/80 text-white transition-all shadow-lg opacity-0 group-hover/imagepanel:opacity-100 transition-opacity"
                            >
                              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </motion.button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Description Panel */}
                <div className="w-full sm:w-2/5 flex flex-col items-start p-4 sm:p-8 bg-blue/90 backdrop-blur-md border-r border-blue-500/20 overflow-y-auto max-h-80 no-scrollbar">
                  {selectedAlbumItem.title && (
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedAlbumItem.title}</h3>
                  )}
                  {selectedAlbumItem.description && (
                    <p className="text-gray-200 text-sm sm:text-base whitespace-pre-line mb-4">{selectedAlbumItem.description}</p>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {selectedAlbumItem.images && selectedAlbumItem.images.length > 1 && (
                <div className="p-4 border-t border-blue-500/20 bg-black/50 overflow-x-auto max-h-32 no-scrollbar">
                  <div className="flex gap-3">
                    {selectedAlbumItem.images.map((img: string, idx: number) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx
                            ? "border-blue-400 shadow-lg shadow-blue-500/50"
                            : "border-blue-500/20 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          width={80}
                          height={80}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide scrollbars */}
      <style jsx global>{`
        .no-scrollbar {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
    </motion.section>
  );
};

export default GalleryPage;