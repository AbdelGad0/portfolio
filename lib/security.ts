import "server-only";

export function sanitizeString(value: unknown, maxLength = 5000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function sanitizeStringArray(value: unknown, maxItems = 50, maxLength = 200): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function sanitizeObject(
  value: unknown,
  maxDepth = 5
): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  if (maxDepth <= 0) return {};
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(value)) {
    if (typeof val === "string") {
      result[key] = sanitizeString(val);
    } else if (typeof val === "number" || typeof val === "boolean") {
      result[key] = val;
    } else if (val === null || val === undefined) {
      result[key] = val;
    } else if (Array.isArray(val)) {
      result[key] = val.slice(0, 100);
    } else if (typeof val === "object") {
      result[key] = sanitizeObject(val, maxDepth - 1);
    }
  }
  return result;
}

export async function readSanitizedJsonObject(req: Request): Promise<Record<string, unknown>> {
  try {
    const body = await req.json();
    return sanitizeObject(body);
  } catch {
    return {};
  }
}

export function getRequestIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export function getUserAgent(req: Request): string {
  return req.headers.get("user-agent") || "unknown";
}
