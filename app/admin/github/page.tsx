"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, RefreshCw, Import, Github, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export default function GithubAdminPage() {
  const [repos, setRepos] = useState<any[]>([]);
  const [existingProjects, setExistingProjects] = useState<{ _id: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const loadedRef = useRef(false);

  const load = async () => {
    setLoading(true);
    try {
      const [gh, proj] = await Promise.all([
        fetch("/api/github").then((r) => r.json()),
        fetch("/api/projects?admin=true").then((r) => r.json())
      ]);
      setRepos(gh.repos || []);
      setExistingProjects(
        (proj.projects || [])
          .filter((p: any) => p.slug)
          .map((p: any) => ({ _id: p._id, slug: p.slug }))
      );
    } catch {
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    load();
  }, []);

  const alreadyImported = (name: string) =>
    existingProjects.some((p) => p.slug === name);

  const doImport = async (repo: any) => {
    setImporting(repo.name);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleEn: repo.name,
          titleAr: repo.name,
          slug: repo.name,
          shortSummaryEn: repo.description || "",
          category: "",
          githubLink: repo.html_url,
          liveDemoLink: repo.homepage || "",
          tags: (repo.topics || []),
          tools: (repo.topics || []),
          visible: true
        })
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        const created = data.project;
        if (created?._id && created?.slug) {
          setExistingProjects((prev) => [...prev, { _id: created._id, slug: created.slug }]);
        } else {
          load();
        }
      }
    } finally {
      setImporting(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const target = existingProjects.find((p) => p.slug === pendingDelete);
    if (!target) return;
    setDeleting(pendingDelete);
    try {
      const res = await fetch(`/api/projects/${target._id}`, { method: "DELETE" });
      if (res.ok) {
        setExistingProjects((prev) => prev.filter((p) => p.slug !== pendingDelete));
      }
    } finally {
      setDeleting(null);
      setPendingDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          <h1 className="text-xl font-bold">GitHub Import</h1>
        </div>
        <Button variant="outline" onClick={load} disabled={loading}>
          <RefreshCw className={"h-4 w-4 " + (loading ? "animate-spin" : "")} />
          Refresh
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Import public repositories from GitHub into your portfolio. Already-imported repos are skipped.
      </p>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading repositories...</p>
      ) : repos.length === 0 ? (
        <p className="text-sm text-muted-foreground">No repositories found.</p>
      ) : (
        <div className="space-y-2">
          {repos.map((repo) => {
            const imported = alreadyImported(repo.name);
            return (
              <div key={repo.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{repo.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {repo.description || "No description"} • ⭐ {repo.stargazers_count}
                  </p>
                </div>
                {imported ? (
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-xs font-medium text-green-600">Imported</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setPendingDelete(repo.name)}
                      disabled={deleting === repo.name}
                    >
                      {deleting === repo.name ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      Delete
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" onClick={() => doImport(repo)} disabled={importing === repo.name}>
                    {importing === repo.name ? <Loader2 className="h-4 w-4 animate-spin" /> : <Import className="h-4 w-4" />}
                    Import
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-medium">{pendingDelete}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPendingDelete(null)} disabled={!!deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={!!deleting}>
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
