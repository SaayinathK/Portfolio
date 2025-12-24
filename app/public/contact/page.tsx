"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";

async function getData<T = any>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default function ContactPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContacts = async () => {
      const data = await getData<any[]>("/api/contact");
      setContacts(data ?? []);
    };

    loadContacts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setSubmitting(true);

      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, status: "new" }),
      });

      const subject = encodeURIComponent(`New message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:k.saayinath@gmail.com?subject=${subject}&body=${body}`;

      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="top" className="max-w-5xl mx-auto px-6 py-16 space-y-10">
      <div className="text-center mb-6">
        <p className="text-sm text-cyan-300/80 font-mono">{/* contact page */}</p>
        <h1 className="text-4xl font-bold text-white mb-2">Contact</h1>
        <p className="text-gray-400 text-sm">All the ways to reach me, plus a quick compose box.</p>
      </div>

      <div className="rounded-3xl border-2 border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute h-64 w-64 bg-gradient-to-r from-cyan-600/10 to-teal-600/10 rounded-full blur-3xl"
          />
        </div>

        {contacts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">Loading contact information...</div>
        ) : (
          (() => {
            const c = contacts[0];
            return (
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                    Get In Touch
                  </h3>

                  <div className="space-y-4">
                    <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-all">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20">
                        <Mail size={20} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="font-semibold text-white">{c.email}</p>
                      </div>
                    </motion.div>

                    {c.studentEmail && (
                      <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-all">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20">
                          <Mail size={20} className="text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Student Email</p>
                          <p className="font-semibold text-white">{c.studentEmail}</p>
                        </div>
                      </motion.div>
                    )}

                    <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-all">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20">
                        <Phone size={20} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="font-semibold text-white">{c.phone}</p>
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-all">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20">
                        <MapPin size={20} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="font-semibold text-white">{c.location}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                    Connect & Message
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {c.github && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={c.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/50 hover:border-gray-600 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900">
                          <Github size={20} className="text-white" />
                        </div>
                        <span className="text-white font-medium">GitHub</span>
                        <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-white transition-colors" />
                      </motion.a>
                    )}

                    {c.linkedin && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={c.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-700/50 hover:border-blue-600 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-800 to-blue-900">
                          <Linkedin size={20} className="text-white" />
                        </div>
                        <span className="text-white font-medium">LinkedIn</span>
                        <ChevronRight size={16} className="ml-auto text-blue-400 group-hover:text-white transition-colors" />
                      </motion.a>
                    )}

                    {c.facebook && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={c.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-700/50 to-blue-600/50 border border-blue-500/50 hover:border-blue-400 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700">
                          <Facebook size={20} className="text-white" />
                        </div>
                        <span className="text-white font-medium">Facebook</span>
                        <ChevronRight size={16} className="ml-auto text-blue-300 group-hover:text-white transition-colors" />
                      </motion.a>
                    )}

                    {c.instagram && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={c.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-pink-700/50 to-rose-600/50 border border-pink-500/50 hover:border-pink-400 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-r from-pink-600 to-rose-700">
                          <Instagram size={20} className="text-white" />
                        </div>
                        <span className="text-white font-medium">Instagram</span>
                        <ChevronRight size={16} className="ml-auto text-pink-300 group-hover:text-white transition-colors" />
                      </motion.a>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur">
                    <p className="text-sm text-gray-300">Send a quick message</p>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message"
                      rows={4}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />

                    {error && <p className="text-sm text-red-400">{error}</p>}
                    {submitted && !error && <p className="text-sm text-green-400">Thanks! Your message is on its way.</p>}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-white font-semibold py-3 shadow-[0_10px_30px_rgba(59,130,246,0.35)] disabled:opacity-60"
                    >
                      <Send size={16} />
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}