"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project } from "@/types/content";

export function ProjectsSection({
  projects,
  mode
}: {
  projects: Project[];
  mode: string;
}) {
  const { language, t } = useLanguage();

  if (!Array.isArray(projects) || projects.length === 0) return null;

  const groups: [string, Project[]][] =
    mode === "grouped"
      ? Object.entries(
          projects.reduce<Record<string, Project[]>>((acc, p) => {
            const cat = p.category || "Other";
            (acc[cat] = acc[cat] || []).push(p);
            return acc;
          }, {})
        )
      : [["All", projects] as [string, Project[]]];

  return (
    <section id="projects" className="themed-section py-10 lg:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
            {t("Projects", "المشاريع")}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {t("Featured Projects", "مشاريع مميزة")}
          </h2>

          <div className="mt-8 space-y-10">
            {groups.map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-muted-foreground">{category}</h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {items.map((project) => (
                    <div
                      key={project.slug}
                      className="glass-card group flex flex-col rounded-lg border bg-card p-5 shadow-sm transition-colors hover:border-primary/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                          <Folder className="h-4 w-4" />
                        </span>
                        <div className="flex gap-1.5">
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="GitHub"
                              className="flex h-8 w-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                          {project.liveDemoLink && (
                            <a
                              href={project.liveDemoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Live demo"
                              className="flex h-8 w-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      <h4 className="mt-3 font-semibold">
                        {language === "ar" ? project.titleAr || project.titleEn : project.titleEn}
                      </h4>
                      <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
                        {language === "ar"
                          ? project.shortSummaryAr || project.shortSummaryEn
                          : project.shortSummaryEn}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {Array.isArray(project.tools) &&
                          project.tools.slice(0, 4).map((tool) => (
                            <span
                              key={tool}
                              className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground"
                            >
                              {tool}
                            </span>
                          ))}
                      </div>
                      {project.modelUsed && (
                        <p className="mt-2 text-xs font-medium text-primary">
                          {project.modelUsed}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
