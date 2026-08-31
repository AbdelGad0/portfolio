"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SectionDef {
  key: string;
  label: string;
  order: number;
  visible: boolean;
}

interface SectionOrderEditorProps {
  sections: SectionDef[];
  onChange: (sections: SectionDef[]) => void;
}

export function SectionOrderEditor({ sections, onChange }: SectionOrderEditorProps) {
  const [list, setList] = useState<SectionDef[]>(sections);

  const update = (next: SectionDef[]) => {
    setList(next);
    onChange([...next].sort((a, b) => a.order - b.order));
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...list];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    next.forEach((s, i) => (s.order = i + 1));
    update(next);
  };

  const toggle = (index: number) => {
    const next = [...list];
    next[index] = { ...next[index], visible: !next[index].visible };
    update(next);
  };

  if (!list.length) return <p className="text-sm text-muted-foreground">No sections configured.</p>;

  return (
    <div className="space-y-2">
      {list.map((section, i) => (
        <div key={section.key} className="flex items-center justify-between rounded-lg border bg-card px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">{section.order}</span>
            <span className="text-sm font-medium">{section.label}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" disabled={i === list.length - 1} onClick={() => move(i, 1)} aria-label="Move down">
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => toggle(i)} aria-label="Toggle visibility">
              {section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
