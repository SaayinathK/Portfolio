"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Users, Shield, Music } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  category: "athletics" | "leadership" | "academic" | "other";
  icon: React.ReactNode;
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "President - SLIIT Athletics",
    description: "Leading the athletics team and organizing sports events",
    year: "Present",
    category: "leadership",
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    id: "2",
    title: "SLIIT Colors Men Award",
    description: "Recognition for outstanding performance in Athletics",
    year: "2024",
    category: "athletics",
    icon: <Medal className="w-5 h-5" />,
  },
  {
    id: "3",
    title: "Vice President - SLIIT Athletics",
    description: "Supporting leadership in athletics department",
    year: "2024",
    category: "leadership",
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: "4",
    title: "Best Performance Award",
    description: "Sports and Education at School Annual Prize Day",
    year: "2020",
    category: "academic",
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    id: "5",
    title: "Deputy Head Prefect",
    description: "Hindu College Colombo",
    year: "2019-2020",
    category: "leadership",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: "6",
    title: "Athletic Captain",
    description: "Hindu College Colombo - Leading school athletics",
    year: "2019-2020",
    category: "athletics",
    icon: <Medal className="w-5 h-5" />,
  },
  {
    id: "7",
    title: "2nd Place - 5000m",
    description: "Zonal & Divisional Meets",
    year: "2020",
    category: "athletics",
    icon: <Medal className="w-5 h-5" />,
  },
  {
    id: "8",
    title: "3rd Place - 400m Hurdles",
    description: "Divisional Meet",
    year: "2020",
    category: "athletics",
    icon: <Medal className="w-5 h-5" />,
  },
];

const extracurricular = [
  "Provincial Level Athletics",
  "School Hockey Team",
  "Western Band Member",
  "SHOTOKAN RYU KARATE",
  "Miruthangam - Aradena College of Music",
];

const categoryColors = {
  athletics: "bg-primary/20 text-primary border-primary/30",
  leadership: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  academic: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  other: "bg-secondary text-secondary-foreground border-border",
};

export default function AchievementsPage() {
  return (
    <section id="achievements" className="py-24 px-6 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient">Achievements</span> & Activities
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Recognition and leadership roles that have shaped my journey.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="glass rounded-xl p-5 glass-hover group"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg border ${categoryColors[achievement.category]}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-muted-foreground">{achievement.year}</span>
                  <h4 className="font-semibold text-sm mt-1 group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extracurricular */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Music className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Extracurricular Activities</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {extracurricular.map((activity, index) => (
              <motion.span
                key={activity}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 bg-secondary rounded-full text-sm text-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
              >
                {activity}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Languages</h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { lang: "Tamil", level: "Fluent", percentage: 100 },
              { lang: "English", level: "Professional Proficiency", percentage: 85 },
              { lang: "Sinhala", level: "Conversational", percentage: 60 },
            ].map((item) => (
              <div key={item.lang} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.lang}</span>
                  <span className="text-muted-foreground text-xs">{item.level}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
