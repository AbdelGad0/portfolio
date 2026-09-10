# Portfolio Website - Complete Project Documentation

## Owner: Abdelrahman Ahmed (ML & Data Analyst)

---

## 1. Project Overview

A full-stack personal portfolio website with a built-in headless CMS (Content Management System) for Abdelrahman Ahmed, an ML & Data Analyst. The site features a public-facing portfolio with bilingual support (English/Arabic), a complete admin panel for content management, and is deployed on Vercel with MongoDB Atlas as the database.

- **Live URL**: https://portfolio.vercel.app
- **Admin Panel**: `/admin`
- **Admin Credentials**: `admin` / `changeme123`

---

## 2. Tech Stack

### Core Framework
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15.1+ | Full-stack React framework (App Router) |
| **React** | 19.0 | UI library |
| **TypeScript** | 5.7+ | Type-safe JavaScript |
| **Node.js** | Runtime | Server-side execution |

### Styling & UI
| Technology | Version | Purpose |
|---|---|---|
| **Tailwind CSS** | 3.4+ | Utility-first CSS framework |
| **shadcn/ui (Radix UI)** | Various | Headless UI primitives |
| **Framer Motion** | 11.11+ | Animation library |
| **tailwindcss-animate** | 1.0.7 | Tailwind animation plugin |
| **class-variance-authority** | 0.7.1 | Component variant utility |
| **clsx + tailwind-merge** | Latest | Conditional class merging |
| **lucide-react** | 0.453+ | Icon library |

### Database & ORM
| Technology | Version | Purpose |
|---|---|---|
| **MongoDB Atlas** | Cloud-hosted | NoSQL database |
| **Mongoose** | 8.8+ | MongoDB ODM/schema layer |

### Authentication & Security
| Technology | Version | Purpose |
|---|---|---|
| **jose** | 5.9+ | JWT creation/verification (Edge-compatible, HS256) |
| **bcryptjs** | 2.4+ | Password hashing (cost factor 12) |
| **Zod** | 3.23+ | Schema validation |

### File Storage
| Technology | Version | Purpose |
|---|---|---|
| **@vercel/blob** | 0.26+ | Cloud file storage (production on Vercel) |
| **fs/promises** | Node built-in | Local file storage (development) |

### Other Libraries
| Technology | Version | Purpose |
|---|---|---|
| **next-themes** | 0.4.4 | Dark/light theme management |
| **@dnd-kit** (core, sortable, utilities) | 6.1/10.0/3.2 | Drag-and-drop reordering in admin |

### Dev Tools
| Technology | Version | Purpose |
|---|---|---|
| **ESLint** | 9.17+ | Linting |
| **eslint-config-next** | 15.1+ | Next.js ESLint rules |
| **PostCSS** | 8.4+ | CSS processing |
| **Autoprefixer** | 10.4+ | CSS vendor prefixing |

---

## 3. Project Structure

```
Portofolio/
├── .env                          # Local environment variables
├── .env.vercel                   # Vercel production environment
├── .gitignore                    # Git ignore rules
├── atlas-credentials.env         # MongoDB Atlas credentials
├── middleware.ts                  # Next.js Edge middleware (admin route guard)
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Lock file
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── next-env.d.ts                 # Next.js TypeScript declarations
├── README.md                     # Documentation
├── prom.md                       # Project specification/blueprint
│
├── app/                          # Next.js App Router
│   ├── globals.css               # Global CSS (Tailwind + custom properties)
│   ├── layout.tsx                # Root layout (theme, fonts, providers)
│   ├── page.tsx                  # Public homepage (server component)
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── robots.ts                 # robots.txt generation
│   ├── opengraph-image.tsx       # OG image generation
│   │
│   ├── admin/                    # Admin panel pages (14 pages)
│   │   ├── layout.tsx            # Admin layout wrapper
│   │   ├── page.tsx              # Redirects to /admin/dashboard
│   │   ├── login/page.tsx        # Admin login page
│   │   ├── dashboard/page.tsx    # Admin dashboard (stats + recent messages)
│   │   ├── profile/page.tsx      # Profile editor
│   │   ├── projects/page.tsx     # Projects manager
│   │   ├── categories/page.tsx   # Category groups manager
│   │   ├── experience/page.tsx   # Experience manager
│   │   ├── skills/page.tsx       # Skills manager
│   │   ├── skillcategories/page.tsx  # Skill categories manager
│   │   ├── certifications/page.tsx   # Certifications manager
│   │   ├── education/page.tsx    # Education manager
│   │   ├── github/page.tsx       # GitHub repo import
│   │   ├── messages/page.tsx     # Contact messages inbox
│   │   ├── media/page.tsx        # Media library (upload/list/delete)
│   │   ├── theme/page.tsx        # Theme & branding settings
│   │   └── settings/page.tsx     # Site settings (SEO, sections, analytics)
│   │
│   └── api/                      # API routes (28 route files)
│       ├── auth/                 # Authentication (login, logout, me, credentials)
│       ├── profile/route.ts      # Profile CRUD
│       ├── projects/             # Projects CRUD + reorder
│       ├── categories/           # Category groups CRUD + reorder
│       ├── skills/               # Skills CRUD + reorder
│       ├── skillcategories/      # Skill categories CRUD + reorder
│       ├── experience/           # Experience CRUD + reorder
│       ├── education/            # Education CRUD + reorder
│       ├── certifications/       # Certifications CRUD + reorder
│       ├── messages/route.ts     # Contact messages
│       ├── contact/route.ts      # Public contact form
│       ├── settings/route.ts     # Site settings
│       ├── theme-settings/route.ts  # Theme settings
│       ├── upload/route.ts       # File upload
│       ├── media/route.ts        # Media library
│       ├── github/route.ts       # GitHub repos proxy
│       ├── download-cv/route.ts  # CV download redirect
│       └── seed/route.ts         # Database seeding (dev only)
│
├── components/
│   ├── providers.tsx              # Theme + motion + language providers
│   │
│   ├── ui/                        # shadcn/ui primitives (8 files)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── textarea.tsx
│   │
│   ├── sections/                  # Public portfolio section components (10 files)
│   │   ├── Hero.tsx               # Landing hero section
│   │   ├── About.tsx              # About section
│   │   ├── Skills.tsx             # Skills display
│   │   ├── Experience.tsx         # Work experience timeline
│   │   ├── Education.tsx          # Education section
│   │   ├── Projects.tsx           # Projects showcase
│   │   ├── Certifications.tsx     # Certifications display
│   │   ├── Contact.tsx            # Contact form/section
│   │   ├── Navbar.tsx             # Navigation bar (sticky)
│   │   ├── Footer.tsx             # Footer
│   │   └── ScrollToTop.tsx        # Scroll-to-top button
│   │
│   └── admin/                     # Admin panel components (7 files)
│       ├── AdminShell.tsx          # Admin layout (sidebar + main content)
│       ├── Sidebar.tsx             # Admin navigation sidebar
│       ├── SingleForm.tsx          # Reusable singleton editor form
│       ├── ItemsManager.tsx        # Reusable CRUD list manager with modal
│       ├── BilingualField.tsx      # EN/AR side-by-side input
│       ├── ImageUpload.tsx         # File upload component
│       └── SectionOrderEditor.tsx  # Section drag-and-drop reordering
│
├── contexts/
│   └── LanguageContext.tsx         # Bilingual context (EN/AR toggle)
│
├── lib/                           # Utility and business logic (13 files)
│   ├── mongodb.ts                 # Mongoose connection with caching
│   ├── auth.ts                    # JWT token create/verify (jose)
│   ├── apiAuth.ts                 # API auth guard (cookie-based)
│   ├── admin-credentials.ts       # Admin auth logic with lockout
│   ├── security.ts                # Input sanitization utilities
│   ├── audit-log.ts               # Audit event logging
│   ├── constants.ts               # Default section definitions
│   ├── storage.ts                 # File upload (Vercel Blob + local)
│   ├── utils.ts                   # cn(), slugify(), siteUrl(), etc.
│   ├── seo.ts                     # SEO metadata builder
│   ├── revalidate.ts              # ISR cache revalidation
│   ├── dns.ts                     # DNS resolution fix (Windows dev)
│   └── content/
│       └── theme-settings.ts      # Theme preset definitions (7 color themes)
│
├── models/                        # Mongoose schemas (13 models)
│   ├── Profile.ts                 # Personal profile (singleton)
│   ├── SiteSettings.ts            # Site-wide settings (singleton)
│   ├── ThemeSettings.ts           # Theme configuration (singleton)
│   ├── Project.ts                 # Portfolio projects
│   ├── CategoryGroup.ts           # Project category groups
│   ├── SkillCategory.ts           # Skill categories
│   ├── Skill.ts                   # Individual skills
│   ├── Experience.ts              # Work experience entries
│   ├── Education.ts               # Education entries
│   ├── Certification.ts           # Certifications
│   ├── Message.ts                 # Contact form messages
│   ├── AdminCredential.ts         # Admin user credentials
│   └── AuditLog.ts                # Audit trail
│
├── types/
│   └── content.ts                 # TypeScript interfaces for all content types
│
└── public/
    └── assets/
        └── Me.jpeg                # Profile photo
```

**Total source files: ~113** (excluding node_modules, .next, and binary files)

---

## 4. Design System

### 4.1 Color Themes (7 Presets)

The site supports 7 color themes that can be switched from the admin panel:

| Theme Name | Light Primary | Dark Primary | Description |
|---|---|---|---|
| **default** | Purple (262 83% 58%) | Purple (263 84% 73%) | Default purple theme |
| **emerald-pro** | Emerald (160 84% 39%) | Emerald (158 64% 52%) | Professional green |
| **blue-tech** | Blue (221 83% 48%) | Blue (217 91% 62%) | Tech-focused blue |
| **purple-ai** | Purple (262 83% 55%) | Purple (263 84% 75%) | AI-themed purple |
| **cyan-data** | Cyan (189 94% 40%) | Cyan (190 90% 62%) | Data-focused cyan |
| **amber-minimal** | Amber (38 92% 50%) | Amber (40 90% 58%) | Minimal amber |
| **monochrome** | Gray (0 0% 22%) | Gray (0 0% 82%) | Black & white |
| **neon-dark** | Neon Green (142 100% 32%) | Neon Green (142 100% 55%) | Dark neon aesthetic |

### 4.2 Typography
- **Primary Font**: Geist Sans (via `next/font/google`)
- **Monospace Font**: Geist Mono
- **Arabic Font**: Cairo (configured in tailwind config)
- **Typography Scale**: Configurable (balanced, compact, spacious)

### 4.3 Border Radius Styles
| Style | Value | Description |
|---|---|---|
| **soft** | 0.75rem | Default rounded corners |
| **rounded** | 1rem | More rounded |
| **sharp** | 0rem | No rounding (sharp edges) |

### 4.4 Card Styles
| Style | Description |
|---|---|
| **premium** | Default solid card with border and shadow |
| **glass** | Glassmorphism effect (blur + transparency) |
| **minimal** | Transparent background, no border |

### 4.5 Spacing
- **Section spacing**: Configurable (compact, normal, spacious)
- **Container max-width**: 1400px (2xl breakpoint)
- **Content max-width**: 5xl (1024px) for sections

### 4.6 Dark/Light Mode
- Managed via `next-themes` library
- Default theme: **dark**
- Toggle button in navbar
- Class-based dark mode (`darkMode: ["class"]`)
- Theme preference persisted in localStorage

### 4.7 Complete CSS Color Variables

#### Light Mode (`:root`)
| Variable | Default Value (HSL) | Description |
|---|---|---|
| `--background` | `0 0% 100%` | Page background (white) |
| `--foreground` | `224 71% 4%` | Main text (near-black) |
| `--card` | `0 0% 100%` | Card background (white) |
| `--card-foreground` | `224 71% 4%` | Card text |
| `--primary` | `262 83% 58%` | Primary actions (purple) |
| `--primary-foreground` | `210 40% 98%` | Text on primary (white) |
| `--secondary` | `240 5% 96%` | Secondary backgrounds |
| `--secondary-foreground` | `240 6% 10%` | Secondary text |
| `--muted` | `240 5% 96%` | Muted backgrounds |
| `--muted-foreground` | `240 4% 40%` | Muted text (gray) |
| `--accent` | `240 5% 96%` | Accent backgrounds |
| `--accent-foreground` | `240 6% 10%` | Accent text |
| `--destructive` | `0 84% 60%` | Destructive actions (red) |
| `--destructive-foreground` | `210 40% 98%` | Text on destructive |
| `--border` | `240 6% 90%` | Border color |
| `--input` | `240 6% 90%` | Input border |
| `--ring` | `262 83% 58%` | Focus ring (purple) |
| `--radius` | `0.75rem` | Border radius |

#### Dark Mode (`.dark`)
| Variable | Default Value (HSL) | Description |
|---|---|---|
| `--background` | `224 71% 4%` | Page background (near-black) |
| `--foreground` | `213 31% 91%` | Main text (light gray) |
| `--card` | `224 71% 4%` | Card background |
| `--card-foreground` | `213 31% 91%` | Card text |
| `--primary` | `263 84% 73%` | Primary actions (lighter purple) |
| `--primary-foreground` | `224 71% 4%` | Text on primary (dark) |
| `--secondary` | `222 47% 11%` | Secondary backgrounds |
| `--secondary-foreground` | `213 31% 91%` | Secondary text |
| `--muted` | `222 47% 11%` | Muted backgrounds |
| `--muted-foreground` | `215 20% 65%` | Muted text |
| `--accent` | `222 47% 11%` | Accent backgrounds |
| `--accent-foreground` | `213 31% 91%` | Accent text |
| `--destructive` | `0 63% 31%` | Destructive actions (dark red) |
| `--destructive-foreground` | `210 40% 98%` | Text on destructive |
| `--border` | `222 47% 14%` | Border color |
| `--input` | `222 47% 14%` | Input border |
| `--ring` | `263 84% 73%` | Focus ring |

### 4.8 Skill Level Colors
| Level | Background | Text Color | CSS Classes |
|---|---|---|---|
| **Beginner** | `blue-500/15` | `blue-500` | `bg-blue-500/15 text-blue-500` |
| **Intermediate** | `yellow-500/15` | `yellow-600` | `bg-yellow-500/15 text-yellow-600` |
| **Advanced** | `purple-500/15` | `purple-600` | `bg-purple-500/15 text-purple-600` |
| **Expert** | `green-500/15` | `green-600` | `bg-green-500/15 text-green-600` |

### 4.9 Scrollbar Styling
```css
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: hsl(var(--muted-foreground) / 0.3); border-radius: 8px; }
::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted-foreground) / 0.5); }
```

### 4.10 Glass Card Styles
```css
/* Premium (default) - solid card with border */
/* No special CSS needed - uses bg-card + border + shadow-sm */

/* Glass - blur + transparency */
html[data-card-style="glass"] .glass-card {
  background: hsl(var(--card) / 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid hsl(var(--border) / 0.5);
}

/* Minimal - transparent, no border */
html[data-card-style="minimal"] .glass-card {
  background: transparent;
  border: none;
}
```

### 4.11 Section Scroll Offset
```css
.themed-section {
  scroll-margin-top: 72px; /* Fixed navbar height offset */
}
```

### 4.12 Navbar Glass Effect on Scroll
```css
/* Transparent by default */
/* On scroll: bg-background/80 backdrop-blur-md shadow-sm */
```

### 4.13 Complete Font Stack
```css
font-family: var(--font-sans), system-ui, sans-serif;          /* Main text */
font-family: var(--font-cairo), var(--font-sans), system-ui;    /* Arabic text */
font-family: var(--font-mono), monospace;                        /* Code/mono */
```

### 4.14 Tailwind Container Config
```ts
container: {
  center: true,
  padding: "2rem",
  screens: { "2xl": "1400px" }
}
```

---

## 5. Public Website Sections

### 5.1 Navigation Bar (Navbar)
- Fixed/sticky header with glass blur effect on scroll
- Logo text: "AA" (Abdelrahman Ahmed initials)
- Desktop: Horizontal nav links for each section
- Mobile: Hamburger menu with slide-down navigation
- Buttons: Language toggle (EN/AR), Theme toggle (Sun/Moon), Mobile menu
- Sections are configurable from admin (show/hide, reorder)

### 5.2 Hero Section
- Full viewport height section
- Optional availability badge ("Available for work")
- Profile photo (176x176px rounded circle with ring effect)
- Name, Headline (large bold), Title, Subtitle
- CTA buttons: "Hire Me" (links to contact) + "Download CV"
- Social links: GitHub, LinkedIn, WhatsApp (rounded icon buttons)
- Background: Subtle gradient blur effect (primary color)
- All text animated with Framer Motion (stagger children)

### 5.3 About Section
- Two-column layout (1.45fr : 0.85fr)
- Section label: "ABOUT" (uppercase, tracked, primary color)
- Multi-paragraph about text
- Highlight badges (flexible wrap)
- Fade-in animation on scroll

### 5.4 Skills Section
- Grid layout (1-3 columns responsive)
- Skill categories as cards with glass-card styling
- Skills displayed as tagged badges within each category
- Each skill shows its name in current language

### 5.5 Experience Section
- Timeline layout with vertical line (border-l)
- Briefcase icon markers on timeline
- Card-based experience entries
- Company name, duration badge, bullet points
- Tools/tech tags for each experience
- Fade-in animation on scroll

### 5.6 Education Section
- Card-based layout
- Graduation cap icon per entry
- Degree, institution, field of study, date range
- Consistent card styling with glass-card

### 5.7 Projects Section
- Grid layout (2 columns on desktop)
- Two display modes: "selected" (flat) or "grouped" (by category)
- Each project card includes:
  - Folder icon
  - GitHub and Live Demo link buttons
  - Project title and short summary
  - Tools/tech tags (max 4 shown)
  - Model used (if applicable)
- Category-based grouping with headers

### 5.8 Certifications Section
- Grid layout (1-3 columns responsive)
- Medal icon per certification
- Certificate name, issuer, credential link
- View credential button with external link icon

### 5.9 Contact Section
- Two-column layout (0.9fr : 1.1fr)
- Left: Contact info cards (Email, Phone, Location)
- Right: Contact form with fields:
  - Name, Email (side by side)
  - Subject
  - Message (textarea)
  - Submit button with loading state
- Success/error feedback messages
- Form submits to `/api/contact` -> saves to MongoDB

### 5.10 Footer
- Border-top separator
- Dynamic copyright text with year replacement
- Social links: GitHub, LinkedIn, WhatsApp
- Configurable footer text from admin

### 5.11 Scroll-to-Top Button
- Appears when user scrolls down
- Smooth scroll back to top

---

## 6. Admin Panel (CMS)

### 6.1 Authentication
- **Login page**: `/admin/login`
- **Credentials**: `admin` / `changeme123`
- **JWT Token**: HS256, 7-day expiration, stored in httpOnly cookie
- **Cookie name**: `portfolio_admin_token`
- **Security features**:
  - Account lockout: 5 failed attempts in 10 minutes = 15-minute lock
  - Audit logging for all login attempts
  - Input sanitization on all endpoints
  - Edge middleware protects all `/admin/*` routes

### 6.2 Admin Layout
- Sidebar navigation (hidden on mobile, hamburger toggle)
- "View website" link back to public site
- Grouped navigation sections:
  - **Overview**: Dashboard
  - **Content**: Profile, Projects, Category Groups, Experience, Skills, Skill Categories, Certifications, Education
  - **Integrations**: GitHub Import, Messages, Media Library
  - **Configuration**: Theme & Branding, Settings

### 6.3 Dashboard
- Statistics cards: Projects, Skills, Certifications, Unread Messages
- Recent messages list with read/unread indicators
- Quick links to each section

### 6.4 Content Management Pages

#### Profile Editor (SingleForm pattern)
- All bilingual fields (EN/AR side by side)
- Profile image upload
- Social links (GitHub, LinkedIn, Kaggle, WhatsApp, Twitter)
- CV file upload
- Availability toggle and label
- Highlights (array fields)

#### Projects Manager (ItemsManager pattern)
- List view with drag handle, edit, delete buttons
- Modal form for create/edit with fields:
  - Title (EN/AR), Slug, Short Summary, Executive Summary
  - Category, Problem Statement, Business Objective
  - Dataset Overview, Technical Approach, Results
  - Model Used, Evaluation Metrics, Tools
  - GitHub Link, Live Demo Link, Kaggle Link
  - Thumbnail, OG Image, Screenshots
  - Featured, Featured on Homepage, Visible toggles
  - Display Order, Homepage Category Order

#### Experience Manager
- List view with reorder support
- Fields: Title (EN/AR), Company, Duration, Bullets (array), Tools (array)

#### Skills Manager
- List view with category filter
- Fields: Name (EN/AR), Category, Level (Beginner/Intermediate/Advanced/Expert), Icon

#### Skill Categories Manager
- Fields: Name (EN/AR), Slug, Description, Icon, Visible, Sort Order

#### Certifications Manager
- Fields: Name (EN/AR), Issuer, Date, Description, Credential URL, Badge, Featured, Visible

#### Education Manager
- Fields: Degree (EN/AR), Institution, Field of Study, Start/End Date, Description, Grade, Logo

#### Category Groups Manager
- For organizing projects into display categories

### 6.5 Integrations

#### GitHub Import
- Fetches repositories from GitHub API
- Import repos as portfolio projects

#### Messages Inbox
- Lists all contact form submissions
- Read/unread status
- Delete capability

#### Media Library
- File upload (images + PDF, max 10MB)
- Grid/list view of uploaded files
- Delete capability
- Vercel Blob storage (production) / local filesystem (development)

### 6.6 Configuration

#### Theme & Branding
- Color theme selection (7 presets)
- Border radius style (soft/rounded/sharp)
- Card style (premium/glass/minimal)
- Typography scale
- Section spacing
- Live preview of changes

#### Site Settings
- SEO: Meta title, description, keywords (EN/AR)
- Open Graph: Title, description, image
- Favicon
- Default language (EN/AR)
- Default theme (dark/light)
- Section visibility and ordering (drag-and-drop)
- Google Analytics ID
- Maintenance mode toggle
- Projects display mode (selected/grouped)
- Footer text (EN/AR)

---

## 7. API Architecture

### 7.1 RESTful API Routes (28 files)

All collection resources follow this pattern:
| Method | Path | Purpose | Auth |
|---|---|---|---|
| `GET` | `/api/{resource}` | List all (public/admin) | No/Yes |
| `POST` | `/api/{resource}` | Create new item | Yes |
| `PUT` | `/api/{resource}/[id]` | Update item | Yes |
| `DELETE` | `/api/{resource}/[id]` | Delete item | Yes |
| `PUT` | `/api/{resource}/reorder` | Reorder items | Yes |

Singleton resources (Profile, Settings, Theme):
| Method | Path | Purpose | Auth |
|---|---|---|---|
| `GET` | `/api/{resource}` | Get current data | No |
| `PUT` | `/api/{resource}` | Update data | Yes |

Special endpoints:
| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login |
| `POST` | `/api/auth/logout` | Admin logout |
| `GET` | `/api/auth/me` | Check auth status |
| `GET/PUT` | `/api/auth/credentials` | Manage admin credentials |
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/messages` | List messages (admin) |
| `POST` | `/api/upload` | Upload file |
| `GET` | `/api/media` | List media files |
| `DELETE` | `/api/media` | Delete media file |
| `GET` | `/api/github` | Proxy GitHub repos |
| `GET` | `/api/download-cv` | CV download redirect |
| `POST` | `/api/seed` | Database seeding (dev) |

### 7.2 Authentication Flow
1. User submits credentials to `POST /api/auth/login`
2. Server verifies bcrypt hash against stored credential
3. On success: Creates JWT token (HS256, 7-day expiry)
4. Token set as httpOnly cookie (`portfolio_admin_token`)
5. Edge middleware validates JWT on all `/admin/*` routes
6. Failed attempts tracked with lockout mechanism

### 7.3 Security Features
- **Input Sanitization**: All API inputs sanitized (string truncation, array limits, object depth limits)
- **JWT Authentication**: Edge-compatible with `jose` library
- **Password Hashing**: bcrypt with cost factor 12
- **Account Lockout**: 5 failed attempts in 10 minutes = 15-minute lock
- **Audit Logging**: All mutations and auth events logged
- **CORS**: Configured for production domain
- **Cookie Security**: httpOnly, secure (production), sameSite strict

---

## 8. Database

### 8.0 Database Connection
- **Database Type**: MongoDB Atlas (cloud-hosted NoSQL)
- **ODM**: Mongoose 8.8+
- **Connection**: Cached singleton pattern (`lib/mongodb.ts`)
- **Connection String**: `MONGODB_URI` environment variable
- **Production**: MongoDB Atlas cluster on Vercel
- **Development**: Same Atlas cluster or local MongoDB

### 8.0.1 Mongoose Connection Pattern
```typescript
// lib/mongodb.ts - Cached connection
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
```

### 8.0.2 Database Collections (13 Models)
| Model | Collection Name | Type | Count |
|---|---|---|---|
| Profile | `profiles` | Singleton (1 doc) | 1 |
| SiteSettings | `sitesettings` | Singleton (1 doc) | 1 |
| ThemeSettings | `themesettings` | Singleton (1 doc) | 1 |
| Project | `projects` | Collection | Many |
| CategoryGroup | `categorygroups` | Collection | Many |
| SkillCategory | `skillcategories` | Collection | Many |
| Skill | `skills` | Collection | Many |
| Experience | `experiences` | Collection | Many |
| Education | `educations` | Collection | Many |
| Certification | `certifications` | Collection | Many |
| Message | `messages` | Collection | Many |
| AdminCredential | `admincredentials` | Collection | Few |
| AuditLog | `auditlogs` | Collection | Many |

---

## 8. Database Models (13 Models)

### 8.1 Profile (Singleton)
Personal information with bilingual support.
| Field | Type | Description |
|---|---|---|
| nameEn/Ar | String | Full name |
| headlineEn/Ar | String | Main headline |
| titleEn/Ar | String | Job title |
| subtitleEn/Ar | String | Short description |
| profileImage | String | Profile photo URL |
| showProfilePhoto | Boolean | Toggle photo visibility |
| profilePhotoPosition | String | CSS object-position |
| cvFile | String | CV file URL |
| summaryEn/Ar | String | Short summary |
| aboutEn/Ar | String | About text (multiline) |
| email | String | Email address |
| phone | String | Phone number |
| locationEn/Ar | String | Location |
| github/linkedin/kaggle/whatsapp/twitter | String | Social links |
| ctaHireMeEn/Ar | String | CTA button text |
| ctaDownloadCvEn/Ar | String | CV download button text |
| availableForWork | Boolean | Availability status |
| availabilityLabelEn/Ar | String | Availability badge text |
| highlightsEn/Ar | String[] | Highlight tags |

### 8.2 Project
Portfolio projects with full case study fields.
| Field | Type | Description |
|---|---|---|
| titleEn/Ar | String | Project title |
| slug | String (unique) | URL slug |
| shortSummaryEn/Ar | String | Brief description |
| executiveSummaryEn/Ar | String | Full summary |
| category | String | Category group |
| problemStatementEn/Ar | String | Problem description |
| businessObjectiveEn/Ar | String | Business goals |
| datasetOverviewEn/Ar | String | Dataset info |
| technicalApproachEn/Ar | String | Technical details |
| resultsEn/Ar | String | Results/outcomes |
| modelUsed | String | ML model name |
| evaluationMetrics | String[] | Metrics used |
| tools | String[] | Technologies used |
| githubLink | String | GitHub repo URL |
| liveDemoLink | String | Live demo URL |
| kaggleLink | String | Kaggle notebook URL |
| thumbnail | String | Thumbnail image URL |
| ogImage | String | OpenGraph image URL |
| screenshots | String[] | Screenshot URLs |
| featured | Boolean | Featured flag |
| featuredOnHomepage | Boolean | Show on homepage |
| visible | Boolean | Visibility toggle |
| displayOrder | Number | Sort order |

### 8.3 SkillCategory
Groups for organizing skills.
| Field | Type | Description |
|---|---|---|
| nameEn/Ar | String | Category name |
| slug | String (unique) | URL slug |
| descriptionEn/Ar | String | Description |
| icon | String | Icon identifier |
| visible | Boolean | Visibility toggle |
| sortOrder | Number | Sort order |

### 8.4 Skill
Individual technical skills.
| Field | Type | Description |
|---|---|---|
| nameEn/Ar | String | Skill name |
| category | String | Category slug reference |
| level | Enum | Beginner/Intermediate/Advanced/Expert |
| icon | String | Icon identifier |
| visible | Boolean | Visibility toggle |
| order | Number | Sort order |

### 8.5 Experience
Work experience entries.
| Field | Type | Description |
|---|---|---|
| titleEn/Ar | String | Job title |
| companyEn/Ar | String | Company name |
| durationEn/Ar | String | Duration text |
| bulletsEn/Ar | String[] | Achievement bullets |
| tools | String[] | Technologies used |
| current | Boolean | Currently working here |
| visible | Boolean | Visibility toggle |
| order | Number | Sort order |

### 8.6 Education
Academic background.
| Field | Type | Description |
|---|---|---|
| degreeEn/Ar | String | Degree name |
| institutionEn/Ar | String | Institution name |
| fieldOfStudyEn/Ar | String | Field of study |
| startDate | String | Start date |
| endDate | String | End date |
| descriptionEn/Ar | String | Description |
| grade | String | Grade/GPA |
| logo | String | Institution logo URL |
| visible | Boolean | Visibility toggle |
| order | Number | Sort order |

### 8.7 Certification
Professional certifications.
| Field | Type | Description |
|---|---|---|
| nameEn/Ar | String | Certificate name |
| issuer | String | Issuing organization |
| date | String | Issue date |
| descriptionEn/Ar | String | Description |
| credentialUrl | String | Verification URL |
| badge | String | Badge image URL |
| featured | Boolean | Featured flag |
| visible | Boolean | Visibility toggle |
| order | Number | Sort order |

### 8.8 Message
Contact form submissions.
| Field | Type | Description |
|---|---|---|
| name | String | Sender name |
| email | String | Sender email |
| subject | String | Message subject |
| message | String | Message body |
| read | Boolean | Read status |
| createdAt | Date | Submission timestamp |

### 8.9 AdminCredential
Admin user accounts.
| Field | Type | Description |
|---|---|---|
| username | String (unique) | Login username |
| passwordHash | String | bcrypt hashed password |
| failedAttempts | Number | Failed login count |
| lockoutUntil | Date | Lockout expiration |

### 8.10 AuditLog
Audit trail for all actions.
| Field | Type | Description |
|---|---|---|
| action | String | Action type |
| entityType | String | Target entity |
| entityId | String | Target entity ID |
| actorUsername | String | Actor identifier |
| ipAddress | String | Request IP |
| userAgent | String | Browser user agent |
| success | Boolean | Action success |
| timestamp | Date | Action timestamp |

### 8.11 SiteSettings (Singleton)
Global site configuration.
| Field | Type | Description |
|---|---|---|
| siteTitleEn/Ar | String | Site title |
| defaultMetaTitleEn/Ar | String | Default meta title |
| siteNameEn/Ar | String | Site name |
| defaultMetaDescriptionEn/Ar | String | Meta description |
| siteDescriptionEn/Ar | String | Site description |
| siteKeywords | String[] | SEO keywords |
| ogTitleEn/Ar | String | OpenGraph title |
| ogDescriptionEn/Ar | String | OpenGraph description |
| ogImage | String | OpenGraph image URL |
| favicon | String | Favicon URL |
| defaultTheme | Enum | dark/light |
| defaultLanguage | Enum | en/ar |
| sections | SectionConfig[] | Section visibility/order |
| analytics | Object | Google Analytics config |
| maintenanceMode | Boolean | Maintenance toggle |
| projectsDisplayMode | Enum | selected/grouped |
| footerTextEn/Ar | String | Footer text |

### 8.12 ThemeSettings (Singleton)
Visual theme configuration.
| Field | Type | Description |
|---|---|---|
| colorTheme | String | Theme preset name |
| radius | String | Border radius style |
| cardStyle | String | Card display style |
| typographyScale | String | Typography scale |
| sectionSpacing | String | Section spacing |

### 8.13 CategoryGroup
Project category organization.
| Field | Type | Description |
|---|---|---|
| nameEn/Ar | String | Category name |
| slug | String (unique) | URL slug |
| descriptionEn/Ar | String | Description |
| visible | Boolean | Visibility toggle |
| order | Number | Sort order |

---

## 9. Bilingual System (EN/AR)

### 9.1 Implementation
- **Language Context**: `LanguageContext.tsx` provides `language`, `toggleLanguage()`, `t(en, ar)` function
- **Persistence**: Language preference saved in `localStorage` (`portfolio-lang`)
- **RTL Support**: `dir="rtl"` attribute set on `<html>` when Arabic is selected
- **Default Language**: Configurable from admin settings

### 9.2 Translation Pattern
All user-facing text uses the `t()` function:
```tsx
const { t } = useLanguage();
// Returns English or Arabic based on current language
<p>{t("Hello", "مرحبا")}</p>
```

### 9.3 Bilingual Fields
Every content model has `*En` and `*Ar` field pairs:
- Profile: name, headline, title, subtitle, about, location, etc.
- Projects: title, summary, description sections
- Experience: title, company, duration, bullets
- Education: degree, institution, field of study
- Certifications: name, description
- Skill Categories: name, description
- Skills: name

---

## 10. Animation System

### 10.1 Framer Motion Configuration
- **Reduced Motion**: Respects user preference (`reducedMotion="user"`)
- **Stagger Children**: Hero section uses staggered entrance animations
- **Scroll Animations**: All sections use `whileInView` with viewport margin
- **Default Transition**: 0.5s duration, ease-out

### 10.2 Animation Patterns
```tsx
// Fade-in on scroll
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.5 }}

// Stagger children (Hero)
variants={{
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}}
```

---

## 11. SEO Features

### 11.1 Dynamic Metadata
- **Title**: "Abdelrahman Ahmed — ML & Data Analyst"
- **Description**: Configurable from admin
- **Keywords**: data analyst, AI, machine learning, deep learning, NLP, RAG, Python, Power BI
- **OpenGraph**: 1200x630 image, site name, locale
- **Twitter Card**: summary_large_image

### 11.2 Dynamic Sitemap
- Auto-generated from projects, categories
- Includes base URL and all public pages

### 11.3 robots.txt
- Generated dynamically
- Allows all crawlers by default

### 11.4 OpenGraph Image
- Dynamically generated using `opengraph-image.tsx`
- Custom OG images per project

---

## 12. Deployment

### 12.1 Platform
- **Hosting**: Vercel (serverless)
- **Database**: MongoDB Atlas (cloud)
- **File Storage**: Vercel Blob (production), local filesystem (development)

### 12.2 Environment Variables
| Variable | Required | Purpose |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | JWT signing secret |
| `NEXT_PUBLIC_APP_URL` | Recommended | Canonical site URL |
| `GITHUB_USERNAME` | Optional | GitHub username (default: AbdelGad0) |
| `GITHUB_TOKEN` | Optional | GitHub API token |
| `BLOB_READ_WRITE_TOKEN` | Optional | Vercel Blob token |

### 12.3 Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

### 12.4 Build Configuration
- React Strict Mode enabled
- ISR revalidation: 3600 seconds (1 hour)
- Remote image patterns: Vercel Blob, GitHub avatars

---

## 13. Accessibility

### 13.1 Features
- **Skip to Content**: Hidden link appears on focus for keyboard navigation
- **ARIA Labels**: All interactive elements have proper labels
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Keyboard Navigation**: All interactive elements focusable
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Color Contrast**: Theme-aware color tokens ensure sufficient contrast

### 13.2 Responsive Design
| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 640px | Single column, hamburger nav |
| Tablet | 640px - 1024px | 2-column grids |
| Desktop | > 1024px | Full layout, sidebar admin |

---

## 14. File Upload System

### 14.1 Supported Formats
- Images: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- Documents: `.pdf`
- Maximum size: **10MB**

### 14.2 Storage Strategy
- **Production (Vercel)**: `@vercel/blob` cloud storage
- **Development**: Local `public/uploads/` directory
- Automatic filename sanitization and timestamping

### 14.3 Media Library
- Grid/list view of all uploaded files
- Delete capability
- Used for: profile images, project thumbnails, CV files, certification badges

---

## 15. Admin Component Architecture

### 15.1 SingleForm Pattern
Used for singleton data (Profile, Settings, Theme):
- Loads data from API on mount
- Provides `data`, `setValue()`, `setData()` to children
- Save button sends PUT request
- Success feedback with auto-dismiss

### 15.2 ItemsManager Pattern
Used for collection data (Projects, Skills, Experience, etc.):
- List view with drag handles, edit, delete buttons
- Modal dialog for create/edit forms
- Dynamic field rendering based on `FieldDef` configuration
- Supports: text, textarea, number, boolean, select, array, image field types
- Auto-refresh after mutations

### 15.3 AdminShell Layout
- Sidebar (240px, hidden on mobile)
- Main content area with responsive padding
- Mobile hamburger menu for sidebar toggle
- Login page renders without sidebar

---

## 16. Key Configuration Files

| File | Purpose |
|---|---|
| `next.config.mjs` | React strict mode, remote image patterns |
| `tailwind.config.ts` | Dark mode, shadcn/ui tokens, custom fonts, animations |
| `postcss.config.mjs` | Tailwind CSS + Autoprefixer |
| `tsconfig.json` | ES2017 target, strict mode, `@/*` path alias |
| `.env` | MONGODB_URI, JWT_SECRET, NEXT_PUBLIC_APP_URL |
| `middleware.ts` | Edge middleware for admin route protection |

---

## 17. Development Notes

### 17.1 Getting Started
```bash
npm install
npm run dev
```

### 17.2 Database Setup
1. Create MongoDB Atlas cluster
2. Set `MONGODB_URI` in `.env`
3. Admin credentials auto-seeded on first login
4. Use `/api/seed` endpoint for development data

### 17.3 Linting
```bash
npm run lint
```

### 17.4 Production Build
```bash
npm run build
npm start
```

---

*Documentation generated from source code analysis of the Portfolio project.*
*Total files analyzed: 113 source files*
*Last updated: September 2026*
