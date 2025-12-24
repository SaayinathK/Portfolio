"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Zap, Code, Trophy, Mail, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GraduationCap = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
  </svg>
);

const BriefcaseIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const ImageIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const adminItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "About", href: "/admin/about" },
  { label: "Skills", href: "/admin/skills" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Education", href: "/admin/education" },
  { label: "Experience", href: "/admin/experience" },
  { label: "Achievements", href: "/admin/achievements" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Contact", href: "/admin/contact" },  
];

const navLinks = [
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "projects", label: "Projects", icon: Code },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: BriefcaseIcon },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "contact", label: "Contact", icon: Mail },  
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const pathname = usePathname();

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "education", "experience", "achievements", "gallery", "contact"];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Center Navigation - Home Page Only */}
      {pathname === "/" && (
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-xs md:max-w-none md:w-auto">
          <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl shadow-blue-900/20 md:gap-2 md:px-4 md:py-3">
            {navLinks.map((link) => {
              const Icon = typeof link.icon === 'function' ? link.icon : link.icon;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setActiveSection(link.id)}
                  className="relative group"
                >
                  <motion.div
                    className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-300
                      ${activeSection === link.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'}
                      md:gap-2 md:px-4 md:py-2`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                    <span className="font-medium text-xs md:text-sm hidden md:inline">{link.label}</span>
                  </motion.div>
                  <AnimatePresence>
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full border-2 border-blue-400/50"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
