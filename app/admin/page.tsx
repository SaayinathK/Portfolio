"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Sparkles,
  Pencil,
  RefreshCw,
  Mail,
  Phone,
  Image as ImageIcon,
  Briefcase,
  GraduationCap,
  Trophy,
  FolderGit2,
  ListChecks,
  Link2,
} from "lucide-react";

type About = {
  _id?: string;
  title?: string;
  shortBio?: string;
  longBio?: string;
  email?: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
  profileImageUrl?: string;
  highlights?: string[];
};

type Skill = { _id?: string; name?: string; level?: string; category?: string };
type Project = { _id?: string; title?: string; description?: string; tags?: string[]; githubLink?: string; liveLink?: string; imageUrl?: string };
type Education = { _id?: string; title?: string; institution?: string; year?: string; period?: string; description?: string; logo?: string; field?: string; gpa?: string };
type Experience = { _id?: string; title?: string; role?: string; company?: string; organization?: string; year?: string; period?: string; description?: string; logo?: string };
type Achievement = { _id?: string; title?: string; name?: string; year?: string; date?: string; description?: string; imageUrl?: string };
type Gallery = { _id?: string; title?: string; caption?: string; image?: string; imageUrl?: string; url?: string; src?: string };
type Contact = {
  _id?: string;
  email?: string;
  phone?: string;
  address?: string;
  socials?: Record<string, string>;
  github?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
};

export default function AdminOverview() {
  const [about, setAbout] = useState<About | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchJson = async <T,>(url: string, def: T): Promise<T> => {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return def;
      return res.json();
    } catch {
      return def;
    }
  };

  const loadAll = async () => {
    setLoading(true);
    const [
      aboutData,
      skillsData,
      projectsData,
      educationData,
      experienceData,
      achievementsData,
      galleryData,
      contactData,
    ] = await Promise.all([
      fetchJson<About | null>("/api/about", null),
      fetchJson<Skill[]>("/api/skills", []),
      fetchJson<Project[]>("/api/projects", []),
      fetchJson<Education[]>("/api/education", []),
      fetchJson<Experience[]>("/api/experience", []),
      fetchJson<Achievement[]>("/api/achievements", []),
      fetchJson<Gallery[]>("/api/gallery", []),
      fetchJson<Contact | null>("/api/contact", null),
    ]);
    setAbout(aboutData);
    setSkills(skillsData);
    setProjects(projectsData);
    setEducation(educationData);
    setExperience(experienceData);
    setAchievements(achievementsData);
    setGallery(galleryData);
    setContact(contactData);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10  bg-gradient-to-br from-black via-black opacity-80" />
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-400/30 via-purple-300/20 to-pink-300/20 blur-2xl pointer-events-none -z-10" />
      <div className="space-y-10 max-w-7xl mx-auto p-4 md:p-3">
        {/* Header */}
<div className="flex items-center justify-between gap-4 mb-6 rounded-2xl bg-gradient-to-r from-blue-950 to-black p-6 shadow-lg">
  <div className="flex items-center gap-3">
    <div className="p-3 rounded-2xl bg-white shadow">
      <LayoutDashboard size={32} className="text-black" />
    </div>
    <div>
      <h1 className="text-4xl font-extrabold text-white flex items-center gap-2 tracking-tight">
        Admin Overview <Sparkles size={24} className="text-yellow-400" />
      </h1>
      <p className="text-blue-100 mt-1 text-base font-medium">
        Single-page resume-style summary of your content
      </p>
    </div>
  </div>
  <button
    onClick={loadAll}
    className="inline-flex items-center gap-2 rounded-xl bg-blue-800 px-5 py-3 text-base font-semibold text-white hover:bg-blue-700 transition shadow"
  >
    <RefreshCw size={18} />
    Refresh
  </button>
</div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <Stat label="Projects" value={projects.length} />
          <Stat label="Skills" value={skills.length} />
          <Stat label="Education" value={education.length} />
          <Stat label="Experience" value={experience.length} />
          <Stat label="Achievements" value={achievements.length} />
          <Stat label="Gallery Items" value={gallery.length} />
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-flex items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-blue-600"></div>
              <span className="text-lg text-black">Loading overview…</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
            {/* About Section */}
            <AdminSection
              title="About"
              icon={<ListChecks className="text-white" size={20} />}
              editHref="/admin/about"
            >
              {about ? (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {about.profileImageUrl && (
                      <Image
                        src={about.profileImageUrl}
                        alt={about.title || "Profile image"}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 shadow"
                        unoptimized={about.profileImageUrl?.startsWith("/uploads/")}
                      />
                    )}
                    <div>
                      <div className="font-semibold text-black">{about.title || "—"}</div>
                      <div className="text-xs text-blue-500">{about.location || about.email}</div>
                    </div>
                  </div>
                  <div className="text-black text-sm line-clamp-3">{about.longBio || about.shortBio || "—"}</div>
                  {about.highlights?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {about.highlights.slice(0, 6).map((h, i) => (
                        <span key={i} className="text-xs rounded-full bg-blue-100 px-2 py-1 text-black border border-blue-200 shadow">
                          {h}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-black">
                    {about.email && (
                      <span className="flex items-center gap-1"><Mail size={14} /> {about.email}</span>
                    )}
                    {about.phone && (
                      <span className="flex items-center gap-1"><Phone size={14} /> {about.phone}</span>
                    )}
                    {about.resumeUrl && (
                      <span className="flex items-center gap-1"><Link2 size={14} /><a href={about.resumeUrl} target="_blank" className="text-black underline">Resume</a></span>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-black">No about info. Click Edit to add one.</p>
              )}
            </AdminSection>

            {/* Skills Section */}
            <AdminSection
              title="Skills"
              icon={<ListChecks className="text-white" size={20} />}
              editHref="/admin/skills"
            >
              {skills.length ? (
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 20).map((s) => (
                    <span key={s._id || s.name} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-black border border-blue-200 shadow">
                      {s.name}{s.level ? ` • ${s.level}` : ""}{s.category ? ` • ${s.category}` : ""}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-black">No skills added.</p>
              )}
            </AdminSection>

            {/* Projects Section */}
            <AdminSection
              title="Projects"
              icon={<FolderGit2 className="text-white" size={20} />}
              editHref="/admin/projects"
            >
              {projects.length ? (
                <div className="space-y-2">
                  {projects.slice(0, 4).map((p) => (
                    <div key={p._id} className="flex items-center gap-3">
                      {p.imageUrl && (
                        <Image
                          src={p.imageUrl}
                          alt={p.title || "Project image"}
                          width={44}
                          height={44}
                          className="w-11 h-11 object-cover rounded-lg border-2 border-indigo-100 shadow"
                          unoptimized={p.imageUrl?.startsWith("/uploads/")}
                        />
                      )}
                      <div>
                        <div className="font-semibold text-black">{p.title}</div>
                        <div className="text-xs text-black line-clamp-1">{p.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-black">No projects yet.</p>
              )}
            </AdminSection>

            {/* Achievements Section */}
            <AdminSection
              title="Achievements"
              icon={<Trophy className="text-white" size={20} />}
              editHref="/admin/achievements"
            >
              {achievements.length ? (
                <ul className="space-y-1">
                  {achievements.slice(0, 6).map((a) => (
                    <li key={a._id} className="flex items-center gap-2">
                      {a.imageUrl && (
                        <Image
                          src={a.imageUrl}
                          alt={a.title || "Achievement image"}
                          width={36}
                          height={36}
                          className="w-9 h-9 object-cover rounded-md border-2 border-yellow-100 shadow"
                          unoptimized={a.imageUrl?.startsWith("/uploads/")}
                        />
                      )}
                      <span className="text-xs text-black font-semibold">{a.title || a.name}</span>
                      {(a.year || a.date) && (
                        <span className="ml-2 text-xs text-black">{a.year || a.date}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-black">No achievements yet.</p>
              )}
            </AdminSection>

            {/* Education Section */}
            <AdminSection
              title="Education"
              icon={<GraduationCap className="text-white" size={20} />}
              editHref="/admin/education"
            >
              {education.length ? (
                <ul className="space-y-1">
                  {education.slice(0, 4).map((e) => (
                    <li key={e._id} className="flex items-center gap-2">
                      {e.logo && (
                        <Image
                          src={e.logo}
                          alt={e.institution || "Education logo"}
                          width={32}
                          height={32}
                          className="w-10 h-10 object-cover rounded-full border-2 border-gray-300 shadow"
                          unoptimized={e.logo?.startsWith("/uploads/")}
                        />
                      )}
                      <span className="font-medium text-black text-xs">{e.institution}</span>
                      <span className="ml-2 text-xs text-black">{e.year || e.period}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-black">No education records.</p>
              )}
            </AdminSection>

            {/* Experience Section */}
            <AdminSection
              title="Experience"
              icon={<Briefcase className="text-white" size={20} />}
              editHref="/admin/experience"
            >
              {experience.length ? (
                <ul className="space-y-1">
                  {experience.slice(0, 4).map((x) => (
                    <li key={x._id} className="flex items-center gap-2">
                      {x.logo && (
                        <Image
                          src={x.logo}
                          alt={x.company || "Experience logo"}
                          width={32}
                          height={32}
                          className="w-10 h-10 object-cover rounded-full border-2 border-pink-100 shadow"
                          unoptimized={x.logo?.startsWith("/uploads/")}
                        />
                      )}
                      <span className="font-medium text-black text-xs">{x.title || x.role}</span>
                      <span className="ml-2 text-xs text-black">{x.year || x.period}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-black">No experience records.</p>
              )}
            </AdminSection>

            {/* Gallery Section */}
            <AdminSection
              title="Gallery"
              icon={<ImageIcon className="text-white" size={20} />}
              editHref="/admin/gallery"
            >
              {gallery.length ? (
                <div className="flex gap-2">
                  {gallery.slice(0, 4).map((g, idx) => {
                    const src = g.image || g.imageUrl || g.url || g.src;
                    return src ? (
                      <Image
                        key={g._id || idx}
                        src={src}
                        alt={g.title || g.caption || "Gallery"}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover border"
                      />
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-black">No gallery items.</p>
              )}
            </AdminSection>

            {/* Contact Section */}
            <AdminSection
              title="Contact"
              icon={<Mail className="text-white" size={20} />}
              editHref="/admin/contact"
            >
              {contact ? (
                <div className="space-y-1 text-xs text-black">
                  <div><span className="font-medium">Email:</span> {contact.email || about?.email || "—"}</div>
                  <div><span className="font-medium">Phone:</span> {contact.phone || about?.phone || "—"}</div>
                  <div><span className="font-medium">Address:</span> {contact.address || about?.location || "—"}</div>
                  {contact.github && <div><span className="font-medium">GitHub:</span> {contact.github}</div>}
                  {contact.linkedin && <div><span className="font-medium">LinkedIn:</span> {contact.linkedin}</div>}
                  {contact.instagram && <div><span className="font-medium">Instagram:</span> {contact.instagram}</div>}
                  {contact.facebook && <div><span className="font-medium">Facebook:</span> {contact.facebook}</div>}
                </div>
              ) : (
                <p className="text-black">No contact details configured.</p>
              )}
            </AdminSection>
          </div>
        )}
      </div>
      {/* Animations and Glow */}
      <style jsx global>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 12px #60a5fa88);
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 12s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Section Card Component
function AdminSection({
  title,
  icon,
  editHref,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  editHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur-md p-7 shadow-xl border-l-4 border-blue-300 border border-gray-100 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl hover:bg-white/90">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-gradient-to-br from-blue-100 to-blue-900 p-2 shadow">{icon}</span>
          <span className="text-xl font-bold text-black">{title}</span>
        </div>
        <Link
          href={editHref}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:from-blue-700 hover:to-indigo-700 shadow"
        >
          <Pencil size={16} />
          Edit
        </Link>
      </div>
      {children}
    </div>
  );
}

// Stat Card Component
function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6 shadow-lg border border-gray-200 text-center flex flex-col items-center hover:scale-105 transition-transform duration-200">
      <div className="text-3xl font-extrabold text-blue-700 drop-shadow">{value}</div>
      <div className="text-base text-black mt-1 font-medium">{label}</div>
    </div>
  );
}