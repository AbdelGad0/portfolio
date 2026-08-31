"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background/80 px-4 backdrop-blur lg:hidden">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="mr-3 rounded-md p-1.5 text-muted-foreground hover:bg-accent"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-semibold">Admin</span>
        </header>
        {mobileOpen && (
          <div className="border-b bg-card p-2 lg:hidden">
            <Sidebar />
          </div>
        )}
        <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
