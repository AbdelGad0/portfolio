# Abdelrahman Ahmed — Portfolio

A modern, SEO-friendly portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, powered by **MongoDB** and an integrated **Admin CMS**.

## Features

- Multilingual content (Arabic / English) with RTL support
- Admin dashboard to manage profile, projects, skills, certifications, education, experience, and theme settings
- Public contact form with rate limiting and email notifications
- Image uploads, document (CV) download, social links (GitHub, LinkedIn, WhatsApp)
- SEO: sitemap, robots, OpenGraph image, per-project pages
- Security hardening: strict CSP and security headers, CSRF protection on auth, hashed admin credentials, audit logging, JWT-based sessions (fail-closed in production)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn-style UI components
- **Database:** MongoDB (Mongoose)
- **Email:** SMTP via nodemailer
- **Auth:** JWT (httpOnly cookie) + bcrypt password hashing

## Getting Started

```bash
npm install
npm run dev
```

Open https://portfolio-abdelrahman-ten.vercel.app

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign session tokens |
| `NEXT_PUBLIC_APP_URL` | Public base URL of the site |
| `GITHUB_USERNAME` | GitHub username for profile link |
| `EMAIL_HOST` / `EMAIL_PORT` | SMTP host and port |
| `EMAIL_USER` / `EMAIL_APP_PASSWORD` | SMTP credentials |
| `EMAIL_TO` | Recipient address for contact form submissions |

> Never commit real values. The repository ignores `.env` files via `.gitignore`.

## Useful Scripts

```bash
npm run build      # production build
npm run dev        # development server
npm run lint       # code linting (if configured)
node scripts/reset-admin-password.cjs "NewPassword"  # reset admin password
```

## Project Structure

```
app/          # Next.js routes and API endpoints
components/   # UI components (sections, admin, ui)
lib/          # utilities (db, auth, security, storage, mail)
models/       # Mongoose schemas
public/       # static assets (images, CV, certifications)
scripts/      # CLI helper scripts
contexts/     # React contexts (language, data)
```

## Deployment

Deploy on [Vercel](https://vercel.com) by importing this repository and setting the required environment variables in the dashboard.

## License

All rights reserved. This project and its content belong to the owner.
