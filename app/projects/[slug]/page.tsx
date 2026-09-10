import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import SiteSettings from "@/models/SiteSettings";
import Project from "@/models/Project";
import { DEFAULT_SECTIONS } from "@/lib/constants";
import { toPlainObject, siteUrl } from "@/lib/utils";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ScrollToTop } from "@/components/sections/ScrollToTop";
import { ProjectDetail } from "@/components/sections/ProjectDetail";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const projects = await Project.find({ visible: true }).select("slug").lean();
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    await connectToDatabase();
    const project = await Project.findOne({ slug }).lean();
    if (!project) return {};
    return {
      metadataBase: new URL(siteUrl()),
      title: project.titleEn || project.slug,
      description: project.shortSummaryEn || project.executiveSummaryEn || "",
      keywords: Array.isArray(project.tools) ? project.tools : []
    };
  } catch {
    return {};
  }
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let project = null as any;
  let profile = null as any;
  let settings = null as any;

  try {
    await connectToDatabase();
    const [projectResult, profileResult, settingsResult] = await Promise.all([
      Project.findOne({ slug, visible: true }).lean(),
      Profile.findOne().lean(),
      SiteSettings.findOne().lean()
    ]);
    project = toPlainObject(projectResult);
    profile = toPlainObject(profileResult);
    settings = toPlainObject(settingsResult);
  } catch {
    // fall back to empty state
  }

  if (!project) {
    notFound();
  }

  const sections = settings?.sections?.length
    ? [...settings.sections].sort((a: any, b: any) => a.order - b.order)
    : DEFAULT_SECTIONS.map((s, i) => ({ ...s, order: i + 1 }));

  const navSections = sections.filter((s: any) => s.key !== "hero");

  return (
    <>
      <Navbar sections={navSections} logo={settings?.favicon || ""} />
      <main id="main-content" className="pt-14">
        <ProjectDetail project={project} />
      </main>
      <Footer
        profile={profile}
        footerText={{
          en: settings?.footerTextEn,
          ar: settings?.footerTextAr
        }}
      />
      <ScrollToTop />
    </>
  );
}