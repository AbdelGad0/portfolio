import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "dev_fallback_jwt_secret_portfolio";

function getSecret(): Uint8Array {
  return new TextEncoder().encode(JWT_SECRET);
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
