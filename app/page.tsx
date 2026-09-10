import { connectToDatabase } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import SiteSettings from "@/models/SiteSettings";
import Project from "@/models/Project";
import SkillCategory from "@/models/SkillCategory";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Certification from "@/models/Certification";
import { DEFAULT_SECTIONS } from "@/lib/constants";
import { toPlainObject } from "@/lib/utils";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ScrollToTop } from "@/components/sections/ScrollToTop";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { ExperienceSection } from "@/components/sections/Experience";
import { EducationSection } from "@/components/sections/Education";
import { ProjectsSection } from "@/components/sections/Projects";
import { CertificationsSection } from "@/components/sections/Certifications";
import { ContactSection } from "@/components/sections/Contact";

export const revalidate = 3600;

export default async function Home() {
  let profile = null as any;
  let settings = null as any;
  let projects: any[] = [];
  let skillCategories: any[] = [];
  let skills: any[] = [];
  let experiences: any[] = [];
  let educations: any[] = [];
  let certifications: any[] = [];

  try {
    await connectToDatabase();
    const [
      profileResult,
      settingsResult,
      projectResult,
      categoryResult,
      skillResult,
      experienceResult,
      educationResult,
      certificationResult
    ] = await Promise.all([
      Profile.findOne().lean(),
      SiteSettings.findOne().lean(),
      Project.find({ visible: true }).sort({ displayOrder: 1 }).lean(),
      SkillCategory.find({ visible: true }).sort({ sortOrder: 1 }).lean(),
      Skill.find({ visible: true }).sort({ order: 1 }).lean(),
      Experience.find({ visible: true }).sort({ order: 1 }).lean(),
      Education.find({ visible: true }).sort({ order: 1 }).lean(),
      Certification.find({ visible: true }).sort({ order: 1 }).lean()
    ]);

    profile = toPlainObject(profileResult);
    settings = toPlainObject(settingsResult);
    projects = toPlainObject(projectResult);
    skillCategories = toPlainObject(categoryResult);
    skills = toPlainObject(skillResult);
    experiences = toPlainObject(experienceResult);
    educations = toPlainObject(educationResult);
    certifications = toPlainObject(certificationResult);
  } catch {
    // fall back to empty state
  }

  const sections = settings?.sections?.length
    ? [...settings.sections].sort((a: any, b: any) => a.order - b.order)
    : DEFAULT_SECTIONS.map((s, i) => ({ ...s, order: i + 1 }));

  const navSections = sections.filter((s: any) => s.key !== "hero");

  if (settings?.maintenanceMode) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="glass-card max-w-md rounded-lg border bg-card p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold">Under Maintenance</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This site is currently under maintenance. Please check back soon.
          </p>
        </div>
      </div>
    );
  }

  const sectionMap: Record<string, React.ReactNode> = {
    hero: <Hero profile={profile} />,
    about: <About profile={profile} />,
    skills: <Skills categories={skillCategories} skills={skills} />,
    experience: <ExperienceSection items={experiences} />,
    education: <EducationSection items={educations} />,
    projects: <ProjectsSection projects={projects} mode={settings?.projectsDisplayMode || "grouped"} />,
    certifications: <CertificationsSection items={certifications} />,
    contact: <ContactSection profile={profile} />
  };

  return (
    <>
      <Navbar sections={navSections} logo={settings?.favicon || ""} />
      <main id="main-content">
        <div>
          {sections
            .filter((s: any) => s.visible)
            .map((s: any) => (
              <div key={s.key}>{sectionMap[s.key]}</div>
            ))}
        </div>
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
