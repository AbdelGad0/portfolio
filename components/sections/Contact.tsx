"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Profile } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactSection({ profile }: { profile: Profile }) {
  const { t } = useLanguage();
  const d = profile || ({} as Profile);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="themed-section py-10 lg:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
            {t("Contact", "تواصل")}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {t("Let&apos;s work together", "لنعمل معاً")}
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              {d.email && (
                <a href={`mailto:${d.email}`} className="flex items-center gap-3 rounded-lg border bg-card p-4 text-sm transition-colors hover:border-primary/40">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="overflow-hidden text-ellipsis text-muted-foreground">{d.email}</span>
                </a>
              )}
              {d.phone && (
                <a href={`tel:${d.phone}`} className="flex items-center gap-3 rounded-lg border bg-card p-4 text-sm transition-colors hover:border-primary/40">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{d.phone}</span>
                </a>
              )}
              {d.locationEn && (
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">
                    {t(d.locationEn, d.locationAr)}
                  </span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-5 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">{t("Name", "الاسم")}</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t("Your name", "اسمك")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">{t("Email", "البريد")}</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t("Your email", "بريدك")}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">{t("Subject", "الموضوع")}</Label>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder={t("Subject", "الموضوع")}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">{t("Message", "الرسالة")}</Label>
                <Textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t("Your message", "رسالتك")}
                />
              </div>
              <Button type="submit" disabled={status === "loading"}>
                <Send className="h-4 w-4" />
                {status === "loading" ? t("Sending...", "جارٍ الإرسال...") : t("Send message", "إرسال الرسالة")}
              </Button>
              {status === "success" && (
                <p className="text-sm font-medium text-green-600">
                  {t("Message sent successfully!", "تم إرسال الرسالة بنجاح!")}
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-red-600">
                  {t("Something went wrong. Try again.", "حدث خطأ. حاول مرة أخرى.")}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
