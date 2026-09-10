import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "production"
    ? ""
    : "dev_fallback_jwt_secret_portfolio");

function getSecret(): Uint8Array {
  const secret = JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured. Set JWT_SECRET in production.");
  }
  return new TextEncoder().encode(secret);
}

export async function createToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as Record<string, unknown>;
  } catch {
    return null;
  }
}
