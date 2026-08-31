"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SkillCategory, Skill } from "@/types/content";

const levelStyles: Record<string, string> = {
  Beginner: "bg-blue-500/15 text-blue-500",
  Intermediate: "bg-yellow-500/15 text-yellow-600",
  Advanced: "bg-purple-500/15 text-purple-600",
  Expert: "bg-green-500/15 text-green-600"
};

export function Skills({
  categories,
  skills
}: {
  categories: SkillCategory[];
  skills: Skill[];
}) {
  const { language, t } = useLanguage();

  return (
    <section id="skills" className="themed-section py-10 lg:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
            {t("Skills", "المهارات")}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {t("My Technical Skills", "مهاراتي التقنية")}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const catSkills = skills.filter((s) => s.category === category.slug);
              if (catSkills.length === 0) return null;
              return (
                <div
                  key={category.slug}
                  className="glass-card rounded-lg border bg-card p-5 shadow-sm"
                >
                  <h3 className="text-sm font-semibold">
                    {language === "ar" ? category.nameAr || category.nameEn : category.nameEn}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {catSkills.map((skill) => (
                      <span
                        key={skill._id || skill.nameEn}
                        className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2 py-1 text-xs font-medium text-foreground/90"
                      >
                        {(language === "ar" ? skill.nameAr || skill.nameEn : skill.nameEn)}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
