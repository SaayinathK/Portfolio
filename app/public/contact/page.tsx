"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Instagram, Send } from "lucide-react";
import React from "react";

interface Contact {
  email: string;
  studentEmail?: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
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

const ContactPage: React.FC = () => {
  const [contact, setcontact] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        setcontact(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !subject || !message) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setSubmitting(true);

    const mailtoLink = `mailto:k.saayinath@gmail.com
      ?subject=${encodeURIComponent(subject)}
      &body=${encodeURIComponent(
        `From: ${email}\n\nMessage:\n${message}`
      )}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };


  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="scroll-mt-20"
    >
      <SectionHeader
        title=""
        subtitle=""
        codeComment=""
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl border-2 border-gray-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent backdrop-blur-xl p-8 overflow-hidden relative shadow-2xl"
      >
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          />
        </div>

        {contact.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
            <div className="animate-pulse">Loading contact information...</div>
          </div>
        ) : (() => {
          const c = contact[0];
          return (
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left - Contact Info */}
              <div className="space-y-6">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-teal-100 bg-clip-text text-transparent mb-6"
                >
                  Get In Touch
                </motion.h3>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await navigator.clipboard.writeText(c.email);
                      setCopiedField('email');
                      setTimeout(() => setCopiedField(null), 1200);
                    }}
                    className="group relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-transparent border border-gray-500/20 hover:border-cyan-500/40 transition-all backdrop-blur-sm overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-cyan-500/30 to-teal-500/30 shadow-lg group-hover:shadow-cyan-500/20 transition-shadow">
                      <Mail size={22} className="text-cyan-300" />
                    </div>
                    <div className="relative flex-1">
                      <p className="text-xs text-cyan-400/80 font-semibold mb-1 uppercase tracking-wider">Email</p>
                      <p className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                        {c.email}
                        {copiedField === 'email' && (
                          <span className="text-xs text-cyan-300 ml-2 animate-pulse">Copied!</span>
                        )}
                      </p>
                    </div>
                  </motion.div>

                  {c.studentEmail && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 }}
                      whileHover={{ x: 8, scale: 1.02 }}
                      onClick={async (e) => {
                        e.stopPropagation();
                        await navigator.clipboard.writeText(c.studentEmail!);
                        setCopiedField('studentEmail');
                        setTimeout(() => setCopiedField(null), 1200);
                      }}
                      className="group relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-teal-500/10 to-transparent border border-teal-500/20 hover:border-teal-500/40 transition-all backdrop-blur-sm overflow-hidden cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative p-3 rounded-xl bg-gradient-to-br from-teal-500/30 to-cyan-500/30 shadow-lg group-hover:shadow-teal-500/20 transition-shadow">
                        <Mail size={22} className="text-teal-300" />
                      </div>
                      <div className="relative flex-1">
                        <p className="text-xs text-teal-400/80 font-semibold mb-1 uppercase tracking-wider">Student Email</p>
                        <p className="font-bold text-white text-lg group-hover:text-teal-300 transition-colors flex items-center gap-2">
                          {c.studentEmail}
                          {copiedField === 'studentEmail' && (
                            <span className="text-xs text-teal-300 ml-2 animate-pulse">Copied!</span>
                          )}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await navigator.clipboard.writeText(c.phone);
                      setCopiedField('phone');
                      setTimeout(() => setCopiedField(null), 1200);
                    }}
                    className="group relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all backdrop-blur-sm overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 shadow-lg group-hover:shadow-blue-500/20 transition-shadow">
                      <Phone size={22} className="text-blue-300" />
                    </div>
                    <div className="relative flex-1">
                      <p className="text-xs text-blue-400/80 font-semibold mb-1 uppercase tracking-wider">Phone</p>
                      <p className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors flex items-center gap-2">
                        {c.phone}
                        {copiedField === 'phone' && (
                          <span className="text-xs text-blue-300 ml-2 animate-pulse">Copied!</span>
                        )}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    onClick={() => {
                      navigator.clipboard.writeText(c.location);
                      alert('Location copied to clipboard!');
                    }}
                    className="group relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-transparent border border-gray-500/20 hover:border-gray-500/40 transition-all backdrop-blur-sm overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 shadow-lg group-hover:shadow-purple-500/20 transition-shadow">
                      <MapPin size={22} className="text-purple-300" />
                    </div>
                    <div className="relative flex-1">
                      <p className="text-xs text-purple-400/80 font-semibold mb-1 uppercase tracking-wider">Location</p>
                      <p className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">{c.location}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-6"
                >
                  <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Connect on Social</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {c.github && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={c.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 hover:border-gray-500 transition-all group shadow-lg hover:shadow-gray-700/50"
                      >
                        <Github size={18} className="text-gray-300 group-hover:text-white transition-colors" />
                        <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">GitHub</span>
                      </motion.a>
                    )}

                    {c.linkedin && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={c.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-blue-700/80 to-blue-800/80 border border-blue-600/50 hover:border-blue-400 transition-all group shadow-lg hover:shadow-blue-600/50"
                      >
                        <Linkedin size={18} className="text-blue-300 group-hover:text-white transition-colors" />
                        <span className="text-sm font-semibold text-blue-300 group-hover:text-white transition-colors">LinkedIn</span>
                      </motion.a>
                    )}

                    {c.facebook && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={c.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-blue-600/80 to-blue-700/80 border border-blue-500/50 hover:border-blue-300 transition-all group shadow-lg hover:shadow-blue-500/50"
                      >
                        <Facebook size={18} className="text-blue-300 group-hover:text-white transition-colors" />
                        <span className="text-sm font-semibold text-blue-300 group-hover:text-white transition-colors">Facebook</span>
                      </motion.a>
                    )}

                    {c.instagram && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={c.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-pink-600/80 to-rose-700/80 border border-pink-500/50 hover:border-pink-300 transition-all group shadow-lg hover:shadow-pink-500/50"
                      >
                        <Instagram size={18} className="text-pink-300 group-hover:text-white transition-colors" />
                        <span className="text-sm font-semibold text-pink-300 group-hover:text-white transition-colors">Instagram</span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right - Message Form */}
              <form onSubmit={handleSubmit} className="space-y-5">

              {/* 1. Email Address */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border-2 border-slate-700/50 bg-slate-900/80 px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all backdrop-blur-sm"
                />
              </motion.div>

              {/* 2. Subject */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project inquiry"
                  required
                  className="w-full rounded-xl border-2 border-slate-700/50 bg-slate-900/80 px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all backdrop-blur-sm"
                />
              </motion.div>

              {/* 3. Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows={5}
                  required
                  className="w-full rounded-xl border-2 border-slate-700/50 bg-slate-900/80 px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none backdrop-blur-sm"
                />
              </motion.div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              {/* Success */}
              {submitted && !error && (
                <p className="text-sm text-green-400">
                  Email client opened successfully.
                </p>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 shadow-lg transition-all disabled:opacity-60"
              >
                {submitting ? "Opening Mail..." : "Send Message"}
              </motion.button>

            </form>

            </div>
          );
        })()}
      </motion.div>
    </motion.section>
  );
};

export default ContactPage;