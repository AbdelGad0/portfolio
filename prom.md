You are building a full-stack portfolio website with a built-in headless CMS from scratch.

The target is a Next.js 15 App Router project (TypeScript) deployed to Vercel, with MongoDB

as the database. Follow the spec below exactly. Do not skip steps or add features not listed.



─── STACK ───────────────────────────────────────────────────────────────────────

\- Next.js 15 App Router, React 19, TypeScript 5.7

\- Tailwind CSS 3 with darkMode: \['class']

\- shadcn/ui primitives (Radix UI) manually placed in components/ui/ — no CLI

\- Framer Motion 11 (MotionConfig reducedMotion="user")

\- next-themes 0.4 (attribute="class")

\- MongoDB + Mongoose 8

\- bcryptjs for password hashing (cost 12)

\- jose for JWT (HS256, Edge-compatible, 7-day expiry)

\- @vercel/blob for file storage in production (public/uploads/ in dev)

\- @dnd-kit/sortable for drag-and-drop reordering

\- lucide-react for icons



─── ENVIRONMENT VARIABLES ───────────────────────────────────────────────────────

Required: MONGODB\_URI, JWT\_SECRET

Recommended: NEXT\_PUBLIC\_APP\_URL (canonical site URL)

Optional: GITHUB\_USERNAME, GITHUB\_TOKEN, BLOB\_READ\_WRITE\_TOKEN (auto in Vercel)

JWT\_SECRET falls back to a hardcoded dev string in non-production only.



─── DATABASE MODELS (13 total) ──────────────────────────────────────────────────

All models use the (models.Name || model('Name', Schema)) guard for HMR safety.

All server-only models import 'server-only'.



1\. Profile (singleton) — nameEn/Ar, headlineEn/Ar, titleEn/Ar, subtitleEn/Ar,

&#x20;  profileImage, showProfilePhoto, profilePhotoPosition, cvFile, summaryEn/Ar,

&#x20;  aboutEn/Ar, aboutImage, email, phone, locationEn/Ar, github, linkedin, kaggle,

&#x20;  whatsapp, twitter, ctaHireMeEn/Ar, ctaDownloadCvEn/Ar, availableForWork,

&#x20;  availabilityLabelEn/Ar, highlightsEn\[]/Ar\[]



2\. SiteSettings (singleton) — siteTitleEn/Ar, defaultMetaTitleEn/Ar, siteNameEn/Ar,

&#x20;  defaultMetaDescriptionEn/Ar, siteDescriptionEn/Ar, siteKeywords\[], ogTitleEn/Ar,

&#x20;  ogDescriptionEn/Ar, ogImage, favicon, defaultTheme ('dark'|'light'),

&#x20;  defaultLanguage ('en'|'ar'), sections\[{key,labelEn,labelAr,visible,order}],

&#x20;  analytics{googleAnalyticsId,enabled}, maintenanceMode, projectsDisplayMode

&#x20;  ('selected'|'grouped'), footerTextEn/Ar



3\. ThemeSettings (singleton, singletonKey:'theme') — colorTheme (enum: default,

&#x20;  emerald-pro, blue-tech, purple-ai, cyan-data, amber-minimal, monochrome, neon-dark),

&#x20;  radius (soft|rounded|sharp), cardStyle (premium|glass|minimal),

&#x20;  typographyScale (compact|balanced|large), sectionSpacing (tight|normal|relaxed)



4\. AdminCredential — username (unique), passwordHash (bcrypt), failedLoginAttempts,

&#x20;  lastFailedLoginAt, lockUntil. Lockout: 5 failures in 10 min → locked 15 min.



5\. AuditLog — action, entityType, entityId, actorUsername, ipAddress, userAgent,

&#x20;  success, details (Mixed). Written on every auth event and mutation.



6\. Project — titleEn/Ar, slug (unique, auto-generated), shortSummaryEn/Ar,

&#x20;  executiveSummaryEn/Ar, category (string), problemStatementEn/Ar,

&#x20;  businessObjectiveEn/Ar, datasetOverviewEn/Ar, technicalApproachEn/Ar,

&#x20;  resultsEn/Ar, modelUsed, evaluationMetrics, tools\[], githubLink, liveDemoLink,

&#x20;  kaggleLink (validated absolute URLs), thumbnail, ogImage, screenshots\[]

&#x20;  (absolute URL or /uploads/ path), metaTitle, metaDescription, metaKeywords\[],

&#x20;  featured, featuredOnHomepage, homepageCategoryOrder, visible, displayOrder



7\. CategoryGroup — name, slug (unique lowercase), description, visible, sortOrder.

&#x20;  Links to Project.category by string match.



8\. SkillCategory — nameEn/Ar, slug (unique lowercase), descriptionEn/Ar, icon

&#x20;  (Lucide name), visible, sortOrder. Index: {visible:1, sortOrder:1}



9\. Skill — nameEn/Ar, category (= SkillCategory.slug), level (Beginner|Intermediate|

&#x20;  Advanced|Expert), icon, visible, order



10\. Experience — titleEn/Ar, companyEn/Ar, durationEn/Ar, bulletsEn\[]/Ar\[], tools\[],

&#x20;   metaTitle, metaDescription, metaKeywords\[], ogImage, current, visible, order



11\. Education — degreeEn/Ar, institutionEn/Ar, fieldOfStudyEn/Ar, startDate, endDate,

&#x20;   descriptionEn/Ar, grade, logo, visible, order



12\. Certification — nameEn/Ar, issuer, date, descriptionEn/Ar, credentialUrl, badge,

&#x20;   featured, visible, order



13\. Message — name (max 100), email (lowercase, max 254), subject (max 200),

&#x20;   message (max 5000), read (default false). Indexes: createdAt:-1 and read+createdAt.



─── AUTHENTICATION ───────────────────────────────────────────────────────────────

\- lib/auth.ts: createToken(payload), verifyToken(token) using jose SignJWT/jwtVerify

\- Cookie: portfolio\_admin\_token, httpOnly, sameSite:strict, secure in production

\- lib/apiAuth.ts: requireAuth(req) returns 401 NextResponse or null

\- middleware.ts (Edge): guard /admin/\*\*, skip /admin/login, clear invalid cookie

\- lib/admin-credentials.ts: authenticateAdminCredential with lockout,

&#x20; updateAdminCredential for password/username change

\- lib/security.ts: sanitizeString, sanitizeInput (recursive), readSanitizedJsonObject,

&#x20; sanitizeStringArray, getRequestIp, getUserAgent

\- All mutating API handlers call requireAuth first; use readSanitizedJsonObject for body



─── API ROUTES ───────────────────────────────────────────────────────────────────

Every collection-based resource follows this pattern:

&#x20; GET    /api/<resource>              → public, visible:true filter

&#x20; GET    /api/<resource>?admin=true   → all docs, requireAuth

&#x20; POST   /api/<resource>              → create, requireAuth

&#x20; PUT    /api/<resource>/\[id]         → update, requireAuth

&#x20; DELETE /api/<resource>/\[id]         → delete, requireAuth

&#x20; PUT    /api/<resource>/reorder      → { ids: string\[] } → sets order=index, requireAuth



Singleton routes (profile, settings, theme-settings): GET (requireAuth) + PUT (requireAuth)

Special routes:

&#x20; POST /api/auth/login        → public (rate-limited by lockout)

&#x20; POST /api/auth/logout       → clears cookie

&#x20; GET  /api/auth/me           → returns username if authenticated

&#x20; GET/PUT /api/auth/credentials → manage admin username/password

&#x20; POST /api/upload            → multipart, 10MB max, jpg/png/webp/gif/pdf

&#x20; GET/DELETE /api/media       → list and delete uploaded files

&#x20; POST /api/contact           → public, field length validation

&#x20; GET/PUT/DELETE /api/messages → admin inbox management

&#x20; GET  /api/github            → proxy GitHub user repos API

&#x20; POST /api/seed              → dev only (NODE\_ENV check), clears+reseeds all data



After every mutation: revalidatePath('/') + revalidatePath('/', 'layout')

Log every mutation with logAuditEvent() from lib/audit-log.ts



─── ADMIN SHELL ──────────────────────────────────────────────────────────────────

app/admin/layout.tsx → renders AdminShell.tsx (client component)

AdminShell: shows Sidebar + mobile header except on /admin/login

Sidebar groups: Overview (Dashboard), Content (Profile/Projects/CategoryGroups/

Experience/Skills/SkillCategories/Certifications/Education), Integrations

(GitHub Import/Messages/Media Library), Configuration (Theme \& Branding/Settings)

All admin content pages are client components. Pattern:

&#x20; useEffect → fetch('/api/resource?admin=true') → setState

&#x20; Add button → modal with admin-control form fields

&#x20; Submit → POST or PUT → close modal + update local state

&#x20; Delete → DELETE with window.confirm



─── BILINGUAL PATTERN ────────────────────────────────────────────────────────────

contexts/LanguageContext.tsx: LanguageProvider wraps children in <div dir="rtl|ltr">

useLanguage() returns { language, toggleLanguage, isRTL, t(en, ar) }

t(en, ar) returns ar when language === 'ar', else en

Admin forms show both language inputs. Public components call t().

\[dir="rtl"] \* uses --font-cairo. Language persisted in localStorage 'portfolio-lang'.

Initial language from SiteSettings.defaultLanguage → prop to <Providers>.



─── THEME SYSTEM ─────────────────────────────────────────────────────────────────

lib/content/theme-settings.ts: buildThemeStyle(theme) returns CSSProperties with

\--theme-light-\* and --theme-dark-\* CSS custom property overrides per preset.

Applied as inline style on <html> in app/layout.tsx.

CSS in globals.css reads --theme-light-background (etc.) via var() fallback chain.

HTML data attributes: data-color-theme, data-card-style, data-radius-style,

data-typography-scale, data-section-spacing.

CSS uses attribute selectors: html\[data-radius-style="soft"] { --radius: 0.75rem }



─── PUBLIC PAGE ──────────────────────────────────────────────────────────────────

app/page.tsx: server component, export const revalidate = 3600

Fetches all data in parallel with Promise.all from Mongoose directly.

Serializes with JSON.parse(JSON.stringify(result.lean())).

Renders sections in order from SiteSettings.sections\[].order.

Falls back to DEFAULT\_SECTIONS if settings empty.

Maintenance mode: render a single glass panel instead of portfolio.

Passes data as props to each section component.



─── SEO ──────────────────────────────────────────────────────────────────────────

lib/seo.ts: buildMetadata(settings, pageSeo?) builds full Next.js Metadata.

Sets metadataBase to siteUrl() (NEXT\_PUBLIC\_APP\_URL or hardcoded fallback).

Falls back: page-level → settings global → hardcoded defaults.

OG images: custom ogImage URL or /opengraph-image route fallback.

app/opengraph-image.tsx: ImageResponse 1200×630, brand gradient background.

app/sitemap.ts: single homepage entry.

app/robots.ts: allow /, disallow /admin + /api.

Favicon from SiteSettings.favicon → icons.icon + shortcut + apple.

GA: inject Script tags in layout when analytics.enabled + googleAnalyticsId set.



─── ACCESSIBILITY ────────────────────────────────────────────────────────────────

Skip-to-content link at top of layout: sr-only, visible on focus.

<main id="main-content"> wraps all public sections.

MotionConfig reducedMotion="user" on all animations.

suppressHydrationWarning on <html> and <body>.



─── SECTIONS ORDERING ────────────────────────────────────────────────────────────

Default section keys and order: hero(1) about(2) skills(3) experience(4)

education(5) projects(6) certifications(7) contact(8).

Each section has a scroll-margin-top: 72px for navbar offset.

Navbar receives sections array without 'hero'.



─── FILE UPLOAD DUAL MODE ────────────────────────────────────────────────────────

if (process.env.VERCEL) → use @vercel/blob put(), list(), del()

else → fs/promises writeFile to public/uploads/<subdir>/

Both modes return { url, filename }.

Media library opens as modal in every form that has an image field.



─── SEED ROUTE ───────────────────────────────────────────────────────────────────

POST /api/seed: blocked in production. Requires auth.

Deletes all content collections. Re-creates with empty placeholder documents

(or sample data for demo). Returns { success, seeded: { counts } }.

Use this to bootstrap a fresh installation.



─── BUILD ORDER ──────────────────────────────────────────────────────────────────

Phase 1: Bootstrap (create-next-app, install deps, tailwind config, globals.css, .env)

Phase 2: Database layer (mongodb.ts, all 13 models, lib/utils, lib/security, lib/auth,

&#x20;        lib/apiAuth, lib/admin-credentials, lib/audit-log)

Phase 3: API routes (auth, middleware, all content routes, upload, media, contact,

&#x20;        messages, github, seed)

Phase 4: Admin shell (layout, AdminShell, Sidebar, login, dashboard, all content pages)

Phase 5: Public portfolio (LanguageContext, Providers, layout, seo, theme-settings,

&#x20;        all section components, page.tsx, Navbar, Footer, ScrollToTop)

Phase 6: SEO \& integrations (opengraph-image, sitemap, robots, reset-password script)

Phase 7: Deploy to Vercel (env vars, Blob store, seed via dashboard)



─── CONTENT PLACEHOLDERS ────────────────────────────────────────────────────────

Replace all personal data with generic placeholders:

\- Name: "Your Name"

\- Title: "Your Professional Title"

\- About: "Write your about text here."

\- Skills: create 3 categories (Technical, Tools, Soft Skills) with 2 placeholder skills each

\- Projects: create 2 placeholder projects with slug "project-one" and "project-two"

\- Experience: 1 placeholder entry

\- Education: 1 placeholder entry

\- Certifications: 1 placeholder entry

\- SiteSettings: siteNameEn="Portfolio", defaultTheme="dark", defaultLanguage="en"

\- Admin credential: username="admin", password="changeme123" (force change on first login)



Build the entire system now, following the phases in order. Ask no clarifying questions —

all decisions are specified above. When a detail is unspecified (e.g. exact UI layout of

a specific admin form), use the patterns described (admin-control classes, modal pattern,

bilingual inputs side-by-side) and good judgment.

```



\---



\*Blueprint generated from reading the actual source code of the reference implementation.\*



