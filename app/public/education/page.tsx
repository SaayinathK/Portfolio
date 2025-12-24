"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";

interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  isCurrentlyEnrolled: boolean;
  description?: string;
  gpa?: string;
  activities?: string[];
  logo?: string;
}

export default function EducationPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEducations();
  }, []);

  const loadEducations = async () => {
    try {
      const res = await fetch("/api/education");
      const data = await res.json();
      setEducations(data);
    } catch (error) {
      console.error("Failed to load education:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div id="top" className="space-y-6 max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold">Education</h1>

      <section id="education" className="py-24 px-6 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
            <p className="text-muted-foreground max-w-2xl">
              My educational background and academic achievements
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Loading education records...
              </p>
            </div>
          ) : educations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No education records available yet.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {educations.map((edu, index) => (
                <motion.div
                  key={edu._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-slate-900 shadow-md" />

                  {/* Timeline line */}
                  {index !== educations.length - 1 && (
                    <div className="absolute -left-5 top-12 w-0.5 h-32 bg-gradient-to-b from-primary to-gray-300" />
                  )}

                  {/* Content */}
                  <div className="glass rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex gap-4 flex-1">
                        {edu.logo && (
                          <div className="flex-shrink-0">
                            <img
                              src={edu.logo}
                              alt={edu.institution}
                              className="w-16 h-16 object-contain rounded-lg bg-white/5 p-2"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            {edu.degree}
                          </h3>
                          <p className="text-lg font-semibold text-primary">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {edu.field}
                          </p>
                        </div>
                      </div>

                      {edu.isCurrentlyEnrolled && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Currently Enrolled
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>
                          {formatDate(edu.startDate)} -{" "}
                          {edu.isCurrentlyEnrolled
                            ? "Present"
                            : edu.endDate
                            ? formatDate(edu.endDate)
                            : "N/A"}
                        </span>
                      </div>

                      {edu.gpa && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" />
                          <span>GPA: {edu.gpa}</span>
                        </div>
                      )}
                    </div>

                    {edu.description && (
                      <p className="text-sm text-foreground mb-4 leading-relaxed">
                        {edu.description}
                      </p>
                    )}

                    {edu.activities && edu.activities.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" />
                          Activities & Achievements
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {edu.activities.map((activity, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                              <span className="text-foreground">{activity}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}