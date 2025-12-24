"use client";

import { Github, Linkedin, Mail, Heart, Code, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ContactLinks {
  email?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
}

export default function Footer() {
  const [contact, setContact] = useState<ContactLinks | null>(null);

  useEffect(() => {
    // Fetch the first contact (or the public one)
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        // If array, take first; else use as is
        if (Array.isArray(data) && data.length > 0) setContact(data[0]);
        else if (data) setContact(data);
      })
      .catch(() => setContact(null));
  }, []);

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative z-10 border-t border-blue-500/10 py-6"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left section */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
              <Code size={20} className="text-blue-400" />
            </div>
            <span className="text-gray-400">
              © {new Date().getFullYear()} Saayinath Kanesamoorthy
            </span>
          </div>
          
          {/* Center section */}
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm flex items-center gap-1">
              Built with <Heart size={12} className="text-blue-500" /> by a passionate developer using Next.js
            </span>
          </div>

          {/* Right section - Social links */}
          <div className="flex items-center gap-4">
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="p-2 hover:text-blue-400 text-gray-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
            {contact?.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-400 text-gray-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {contact?.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-400 text-gray-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {contact?.facebook && (
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-400 text-gray-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {contact?.instagram && (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-400 text-gray-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
