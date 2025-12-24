"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Pencil,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Image as ImageIcon,
  Briefcase,
  GraduationCap,
  Trophy,
  FolderGit2,
  ListChecks,
  Link2
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
  const router = useRouter();

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
      contactData
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
  }, []);

  const Stat = ({ label, value }: { label: string; value: number | string }) => (
    <div className="rounded-xl bg-white p-5 shadow border border-gray-200">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );

  const Section = ({
    id,
    title,
    editHref,
    children,
    icon,
  }: {
    id: string;
    title: string;
    editHref: string;
    children: React.ReactNode;
    icon: React.ReactNode;
  }) => (
    <section id={id} className="rounded-2xl bg-white p-6 shadow border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gray-100 p-2">{icon}</div>
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        </div>
        <Link
          href={editHref}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700"
        >
          <Pencil size={16} />
          Edit
        </Link>
      </div>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3">
                <LayoutDashboard size={28} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                  Admin Overview
                  <Sparkles size={20} className="text-yellow-400" />
                </h1>
                <p className="text-gray-300 mt-1">Single-page resume-style summary of your content</p>
              </div>
            </div>
            <button
              onClick={loadAll}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium hover:bg-white/20"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              <span className="text-lg text-gray-600">Loading overview…</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* About */}
            <Section id="about" title="About" editHref="/admin/about" icon={<ListChecks className="text-gray-700" size={18} />}>
              {about ? (
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-gray-900">{about.title || "—"}</h3>
                    <p className="text-gray-600 mt-2 line-clamp-3">{about.longBio || about.shortBio || "—"}</p>
                    {about.highlights?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {about.highlights.slice(0, 6).map((h, i) => (
                          <span key={i} className="text-xs rounded-full bg-gray-100 px-2 py-1 text-gray-700 border border-gray-200">
                            {h}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-2 text-sm">
                    {about.profileImageUrl && (
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={about.profileImageUrl}
                          alt={about.title || "Profile image"}
                          className="w-16 h-16 rounded-full object-cover border border-gray-200"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {about.title || "Profile"}
                          </p>
                          {(about.location || about.email) && (
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {about.location || about.email}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {about.email && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail size={14} /> <span className="break-all">{about.email}</span>
                      </div>
                    )}
                    {about.phone && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone size={14} /> <span>{about.phone}</span>
                      </div>
                    )}
                    {about.location && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={14} /> <span>{about.location}</span>
                      </div>
                    )}
                    {about.resumeUrl && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Link2 size={14} /> <a href={about.resumeUrl} target="_blank" className="text-blue-600 underline">Resume</a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No about info. Click Edit to add one.</p>
              )}
            </Section>

            {/* Skills */}
            <Section id="skills" title="Skills" editHref="/admin/skills" icon={<ListChecks className="text-gray-700" size={18} />}>
              {skills.length ? (
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 20).map((s) => (
                    <span key={s._id || s.name} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 border border-gray-200">
                      {s.name}{s.level ? ` • ${s.level}` : ""}{s.category ? ` • ${s.category}` : ""}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No skills added.</p>
              )}
            </Section>

            {/* Projects */}
            <Section id="projects" title="Projects" editHref="/admin/projects" icon={<FolderGit2 className="text-gray-700" size={18} />}>
              {projects.length ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {projects.slice(0, 4).map((p) => (
                    <div key={p._id} className="rounded-xl border border-gray-200 p-4 flex gap-4">
                      {p.imageUrl && (
                        <img src={p.imageUrl} alt={p.title} className="w-20 h-20 object-cover rounded-lg border border-gray-100" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900">{p.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.description}</p>
                        {p.tags?.length ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {p.tags.slice(0, 5).map((t) => (
                              <span key={t} className="text-xs rounded-full bg-gray-100 px-2 py-1 border border-gray-200 text-gray-700">
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        {p.githubLink && (
                          <a href={p.githubLink} target="_blank" className="text-xs text-blue-600 underline mr-2">GitHub</a>
                        )}
                        {p.liveLink && (
                          <a href={p.liveLink} target="_blank" className="text-xs text-green-600 underline">Live</a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No projects yet.</p>
              )}
            </Section>

            {/* Achievements */}
            <Section id="achievements" title="Achievements" editHref="/admin/achievements" icon={<Trophy className="text-gray-700" size={18} />}>
              {achievements.length ? (
                <ul className="space-y-2">
                  {achievements.slice(0, 6).map((a) => (
                    <li key={a._id} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                      {a.imageUrl && (
                        <img src={a.imageUrl} alt={a.title} className="w-12 h-12 object-cover rounded-md border border-gray-100" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-gray-800 font-semibold">{a.title || a.name}</span>
                        {a.year || a.date ? (
                          <span className="ml-2 text-xs text-gray-500">{a.year || a.date}</span>
                        ) : null}
                        {a.description && (
                          <div className="text-xs text-gray-500 mt-1 line-clamp-1">{a.description}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No achievements yet.</p>
              )}
            </Section>

            {/* Education */}
            <Section id="education" title="Education" editHref="/admin/education" icon={<GraduationCap className="text-gray-700" size={18} />}>
              {education.length ? (
                <ul className="space-y-2">
                  {education.slice(0, 4).map((e) => (
                    <li key={e._id} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                      {e.logo && (
                        <img src={e.logo} alt={e.institution} className="w-10 h-10 object-cover rounded-full border border-gray-100" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-gray-900">{e.institution}</span>
                        <span className="ml-2 text-xs text-gray-500">{e.year || e.period}</span>
                        {e.field && (
                          <div className="text-xs text-gray-500">{e.field}</div>
                        )}
                        {e.gpa && (
                          <div className="text-xs text-gray-500">GPA: {e.gpa}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No education records.</p>
              )}
            </Section>

            {/* Experience */}
            <Section id="experience" title="Experience" editHref="/admin/experience" icon={<Briefcase className="text-gray-700" size={18} />}>
              {experience.length ? (
                <ul className="space-y-2">
                  {experience.slice(0, 4).map((x) => (
                    <li key={x._id} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                      {x.logo && (
                        <img src={x.logo} alt={x.company} className="w-10 h-10 object-cover rounded-full border border-gray-100" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-gray-900">{x.title || x.role}</span>
                        <span className="ml-2 text-xs text-gray-500">{x.year || x.period}</span>
                        <div className="text-xs text-gray-500">{x.company || x.organization}</div>
                        {x.description && (
                          <div className="text-xs text-gray-500 mt-1 line-clamp-1">{x.description}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No experience records.</p>
              )}
            </Section>

            {/* Gallery */}
            <Section id="gallery" title="Gallery" editHref="/admin/gallery" icon={<ImageIcon className="text-gray-700" size={18} />}>
              {gallery.length ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gallery.slice(0, 8).map((g) => {
                    const src = g.image || g.imageUrl || g.url || g.src;
                    return (
                      <div key={g._id || src} className="aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                        {src ? <img src={src} alt={g.title || g.caption || "Gallery"} className="w-full h-full object-cover" /> : null}
                        <div className="text-xs text-gray-700 p-1 truncate">{g.title || g.caption}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No gallery items.</p>
              )}
            </Section>

            {/* Contact */}
            <Section id="contact" title="Contact" editHref="/admin/contact" icon={<Mail className="text-gray-700" size={18} />}>
              {contact ? (
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="text-gray-700"><span className="font-medium">Email:</span> {contact.email || about?.email || "—"}</div>
                  <div className="text-gray-700"><span className="font-medium">Phone:</span> {contact.phone || about?.phone || "—"}</div>
                  <div className="sm:col-span-2 text-gray-700"><span className="font-medium">Address:</span> {contact.address || about?.location || "—"}</div>
                  {contact.github && <div className="text-gray-700"><span className="font-medium">GitHub:</span> {contact.github}</div>}
                  {contact.linkedin && <div className="text-gray-700"><span className="font-medium">LinkedIn:</span> {contact.linkedin}</div>}
                  {contact.instagram && <div className="text-gray-700"><span className="font-medium">Instagram:</span> {contact.instagram}</div>}
                  {contact.facebook && <div className="text-gray-700"><span className="font-medium">Facebook:</span> {contact.facebook}</div>}
                </div>
              ) : (
                <p className="text-gray-500">No contact details configured.</p>
              )}
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}