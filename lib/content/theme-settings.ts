import type { CSSProperties } from "react";

export interface ThemePreset {
  light: Record<string, string>;
  dark: Record<string, string>;
}

const PRESETS: Record<string, ThemePreset> = {
  default: {
    light: {},
    dark: {}
  },
  "emerald-pro": {
    light: {
      "--theme-light-background": "152 60% 94%",
      "--theme-light-foreground": "155 70% 15%",
      "--theme-light-primary": "160 84% 39%",
      "--theme-light-ring": "160 84% 39%",
      "--theme-light-card": "0 0% 100%"
    },
    dark: {
      "--theme-dark-background": "160 50% 7%",
      "--theme-dark-foreground": "155 60% 90%",
      "--theme-dark-primary": "158 64% 52%",
      "--theme-dark-ring": "158 64% 52%",
      "--theme-dark-card": "160 45% 11%"
    }
  },
  "blue-tech": {
    light: {
      "--theme-light-background": "220 70% 94%",
      "--theme-light-foreground": "222 80% 18%",
      "--theme-light-primary": "221 83% 48%",
      "--theme-light-ring": "221 83% 48%",
      "--theme-light-card": "0 0% 100%"
    },
    dark: {
      "--theme-dark-background": "222 55% 7%",
      "--theme-dark-foreground": "220 60% 92%",
      "--theme-dark-primary": "217 91% 62%",
      "--theme-dark-ring": "217 91% 62%",
      "--theme-dark-card": "222 45% 11%"
    }
  },
  "purple-ai": {
    light: {
      "--theme-light-background": "260 70% 95%",
      "--theme-light-foreground": "262 70% 16%",
      "--theme-light-primary": "262 83% 55%",
      "--theme-light-ring": "262 83% 55%",
      "--theme-light-card": "0 0% 100%"
    },
    dark: {
      "--theme-dark-background": "262 55% 8%",
      "--theme-dark-foreground": "260 60% 93%",
      "--theme-dark-primary": "263 84% 75%",
      "--theme-dark-ring": "263 84% 75%",
      "--theme-dark-card": "262 45% 12%"
    }
  },
  "cyan-data": {
    light: {
      "--theme-light-background": "190 75% 94%",
      "--theme-light-foreground": "195 80% 16%",
      "--theme-light-primary": "189 94% 40%",
      "--theme-light-ring": "189 94% 40%",
      "--theme-light-card": "0 0% 100%"
    },
    dark: {
      "--theme-dark-background": "190 55% 8%",
      "--theme-dark-foreground": "190 60% 92%",
      "--theme-dark-primary": "190 90% 62%",
      "--theme-dark-ring": "190 90% 62%",
      "--theme-dark-card": "190 45% 12%"
    }
  },
  "amber-minimal": {
    light: {
      "--theme-light-background": "42 80% 93%",
      "--theme-light-foreground": "38 70% 12%",
      "--theme-light-primary": "38 92% 50%",
      "--theme-light-ring": "38 92% 50%",
      "--theme-light-card": "0 0% 100%"
    },
    dark: {
      "--theme-dark-background": "38 55% 8%",
      "--theme-dark-foreground": "40 50% 90%",
      "--theme-dark-primary": "40 90% 58%",
      "--theme-dark-ring": "40 90% 58%",
      "--theme-dark-card": "38 45% 12%"
    }
  },
  monochrome: {
    light: {
      "--theme-light-background": "0 0% 94%",
      "--theme-light-foreground": "0 0% 10%",
      "--theme-light-primary": "0 0% 22%",
      "--theme-light-ring": "0 0% 22%",
      "--theme-light-card": "0 0% 100%"
    },
    dark: {
      "--theme-dark-background": "0 0% 7%",
      "--theme-dark-foreground": "0 0% 88%",
      "--theme-dark-primary": "0 0% 82%",
      "--theme-dark-ring": "0 0% 82%",
      "--theme-dark-card": "0 0% 11%"
    }
  },
  "neon-dark": {
    light: {
      "--theme-light-background": "140 60% 92%",
      "--theme-light-foreground": "145 80% 12%",
      "--theme-light-primary": "142 100% 32%",
      "--theme-light-ring": "142 100% 32%",
      "--theme-light-card": "0 0% 100%"
    },
    dark: {
      "--theme-dark-background": "220 40% 5%",
      "--theme-dark-foreground": "142 70% 88%",
      "--theme-dark-primary": "142 100% 55%",
      "--theme-dark-ring": "142 100% 55%",
      "--theme-dark-card": "220 40% 9%"
    }
  }
};

export function buildThemeStyle(theme: string): CSSProperties {
  const preset = PRESETS[theme] || PRESETS.default;
  return { ...preset.light, ...preset.dark } as CSSProperties;
}
