"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Tags,
  Briefcase,
  GraduationCap,
  Award,
  Settings as SettingsIcon,
  Palette,
  Github,
  MessageSquare,
  Images,
  BarChart3,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const groups: { title: string; items: { href: string; label: string; icon: any }[] }[] = [
    {
      title: "Overview",
      items: [{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard }]
    },
    {
      title: "Content",
      items: [
        { href: "/admin/profile", label: "Profile", icon: User },
        { href: "/admin/projects", label: "Projects", icon: FolderKanban },
        { href: "/admin/categories", label: "Category Groups", icon: Tags },
        { href: "/admin/experience", label: "Experience", icon: Briefcase },
        { href: "/admin/skills", label: "Skills", icon: Layers },
        { href: "/admin/skillcategories", label: "Skill Categories", icon: Layers },
        { href: "/admin/certifications", label: "Certifications", icon: Award },
        { href: "/admin/education", label: "Education", icon: GraduationCap }
      ]
    },
    {
      title: "Integrations",
      items: [
        { href: "/admin/github", label: "GitHub Import", icon: Github },
        { href: "/admin/messages", label: "Messages", icon: MessageSquare },
        { href: "/admin/media", label: "Media Library", icon: Images }
      ]
    },
    {
      title: "Configuration",
      items: [
        { href: "/admin/theme", label: "Theme & Branding", icon: Palette },
        { href: "/admin/settings", label: "Settings", icon: SettingsIcon }
      ]
    }
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <aside className="hidden w-60 shrink-0 border-r bg-card/50 lg:block">
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
        <a href="/" className="mb-2 block rounded-md px-2 py-1.5 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-foreground">
          ← View website
        </a>
        <nav className="space-y-4">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
