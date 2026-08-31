import dns from "node:dns";
import { execSync } from "node:child_process";

let ensured = false;

const IP_RE = /^\d{1,3}(\.\d{1,3}){3}$/;

function looksBroken(servers: string[]): boolean {
  return (
    servers.length === 0 ||
    servers.some((s) => s === "127.0.0.1" || s === "127.0.0.53" || s === "::1")
  );
}

function readWindowsDnsServers(): string[] {
  try {
    const out = execSync(
      'powershell -NoProfile -Command "(Get-DnsClientServerAddress -AddressFamily IPv4 | Where-Object { $_.ServerAddresses }).ServerAddresses"',
      { encoding: "utf8", timeout: 8000, windowsHide: true }
    );
    const list = (out || "")
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter((s) => IP_RE.test(s));
    return [...new Set(list)];
  } catch {
    return [];
  }
}

export function ensureResolvableDns(): void {
  if (ensured || process.env.VERCEL) return;
  try {
    const current = dns.getServers();
    if (!looksBroken(current)) return;

    const real = readWindowsDnsServers();
    if (real.length > 0 && JSON.stringify(real) !== JSON.stringify(current)) {
      dns.setServers(real);
    }
    ensured = true;
  } catch {
    // ignore; leave default resolver
  }
}
