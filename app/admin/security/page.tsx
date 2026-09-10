"use client";

import { useEffect, useState } from "react";
import { KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SecurityAdminPage() {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/credentials")
      .then((r) => r.json())
      .then((d) => {
        if (d.username) setUsername(d.username);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!currentPassword) {
      setError("Current password is required.");
      return;
    }
    if (String(password).length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, currentPassword, password })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSuccess(true);
        setCurrentPassword("");
        setPassword("");
        setConfirm("");
      } else {
        setError(data.error || "Update failed");
      }
    } catch {
      setError("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Security</h1>
        <p className="text-sm text-muted-foreground">Update your admin login credentials. Your current password is required.</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4 rounded-lg border bg-card p-5 shadow-sm">
        <div className="space-y-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="currentPassword">Current password</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm new password</Label>
          <Input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        {success && (
          <p className="flex items-center gap-1.5 text-sm font-medium text-green-600">
            <ShieldCheck className="h-4 w-4" /> Credentials updated successfully.
          </p>
        )}
        <Button type="submit" disabled={saving} className="w-full">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
          {saving ? "Saving..." : "Update credentials"}
        </Button>
      </form>
    </div>
  );
}