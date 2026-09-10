"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Layers, Folder, Target, Database, Cog, LineChart, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project } from "@/types/content";

export function ProjectDetail({
  project,
  backHref = "/#projects"
}: {
  project: Project;
  backHref?: string;
}) {
  const { language, t } = useLanguage();
  const isAr = language === "ar";
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  const renderText = (en?: string, ar?: string) =>
    isAr ? ar || en || "" : en || ar || "";

  const sections: { label: string; icon: React.ReactNode; body: string }[] = [
    {
      label: t("Executive Summary", "الملخص التنفيذي"),
      icon: <Layers className="h-4 w-4" />,
      body: renderText(project.executiveSummaryEn, project.executiveSummaryAr)
    },
    {
      label: t("Problem Statement", "وصف المشكلة"),
      icon: <Target className="h-4 w-4" />,
      body: renderText(project.problemStatementEn, project.problemStatementAr)
    },
    {
      label: t("Business Objective", "الهدف التجاري"),
      icon: <Folder className="h-4 w-4" />,
      body: renderText(project.businessObjectiveEn, project.businessObjectiveAr)
    },
    {
      label: t("Dataset Overview", "نظرة عامة على البيانات"),
      icon: <Database className="h-4 w-4" />,
      body: renderText(project.datasetOverviewEn, project.datasetOverviewAr)
    },
    {
      label: t("Technical Approach", "المنهج التقني"),
      icon: <Cog className="h-4 w-4" />,
      body: renderText(project.technicalApproachEn, project.technicalApproachAr)
    },
    {
      label: t("Results", "النتائج"),
      icon: <LineChart className="h-4 w-4" />,
      body: renderText(project.resultsEn, project.resultsAr)
    }
  ].filter((s) => s.body);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between gap-3">
          <a
            href={backHref}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <BackIcon className="h-3.5 w-3.5" />
            {t("Back to projects", "العودة للمشاريع")}
          </a>
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

        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="rounded-md bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
                {project.category}
              </span>
            )}
            {project.modelUsed && (
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                <Cpu className="h-3 w-3" />
                {project.modelUsed}
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {isAr ? project.titleAr || project.titleEn : project.titleEn}
          </h1>
          <p className="mt-3 max-w-3xl text-base text-muted-foreground">
            {isAr ? project.shortSummaryAr || project.shortSummaryEn : project.shortSummaryEn}
          </p>
        </div>

        {project.thumbnail && (
          <div className="mt-6 overflow-hidden rounded-xl border bg-card shadow-sm">
            <Image
              src={project.thumbnail}
              alt={project.titleEn || "Project"}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 896px"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-8 grid gap-4">
          {sections.map((section, i) => (
            <m.div
              key={section.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="glass-card rounded-lg border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  {section.icon}
                </span>
                <h2 className="text-sm font-semibold">{section.label}</h2>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </m.div>
          ))}
        </div>

        {Array.isArray(project.tools) && project.tools.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold">{t("Tools & Technologies", "الأدوات والتقنيات")}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {Array.isArray(project.evaluationMetrics) && project.evaluationMetrics.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold">{t("Evaluation Metrics", "مقاييس التقييم")}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.evaluationMetrics.map((m) => (
                <span
                  key={m}
                  className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground/80"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}

        {Array.isArray(project.screenshots) && project.screenshots.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold">{t("Project Screenshots", "لقطات من المشروع")}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {project.screenshots.map((src, i) => (
                <m.div
                  key={src + i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="overflow-hidden rounded-lg border bg-card shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`${project.titleEn || "Project"} screenshot ${i + 1}`}
                    width={800}
                    height={500}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="h-auto w-full object-cover"
                  />
                </m.div>
              ))}
            </div>
          </div>
        )}
      </m.div>
    </div>
  );
}