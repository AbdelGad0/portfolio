import bcrypt from "bcryptjs";
import AdminCredential from "@/models/AdminCredential";

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_WINDOW_MS = 10 * 60 * 1000;
const LOCK_DURATION_MS = 15 * 60 * 1000;

export async function authenticateAdminCredential(
  username: string,
  password: string
): Promise<{ ok: boolean; locked?: boolean; message?: string }> {
  const credential = await AdminCredential.findOne({ username }).lean<{
    _id?: unknown;
    lockUntil?: Date | null;
    passwordHash?: string;
    failedLoginAttempts?: number;
  }>();
  if (!credential) {
    return { ok: false, message: "Invalid credentials" };
  }

  const now = Date.now();

  if (credential.lockUntil && new Date(credential.lockUntil).getTime() > now) {
    return { ok: false, locked: true, message: "Account locked. Try again later." };
  }

  if (!credential.passwordHash) {
    return { ok: false, message: "Invalid credentials" };
  }

  const passwordMatches = await bcrypt.compare(password, credential.passwordHash);
  if (!passwordMatches) {
    const update: Record<string, unknown> = {
      failedLoginAttempts: (credential.failedLoginAttempts || 0) + 1,
      lastFailedLoginAt: new Date()
    };

    if ((credential.failedLoginAttempts || 0) + 1 >= MAX_FAILED_ATTEMPTS) {
      update.lockUntil = new Date(now + LOCK_DURATION_MS);
      update.failedLoginAttempts = 0;
    }

    await AdminCredential.updateOne({ _id: credential._id }, { $set: update });
    return { ok: false, message: "Invalid credentials" };
  }

  await AdminCredential.updateOne(
    { _id: credential._id },
    { $set: { failedLoginAttempts: 0, lastFailedLoginAt: null, lockUntil: null } }
  );

  return { ok: true, message: "Authenticated" };
}

export async function verifyAdminCredentialPassword(
  password: string
): Promise<boolean> {
  const credential = await AdminCredential.findOne()
    .select("passwordHash")
    .lean<{ passwordHash?: string }>();
  if (!credential?.passwordHash || !password) return false;
  return bcrypt.compare(password, credential.passwordHash);
}

export async function updateAdminCredential(
  username: string,
  password: string
): Promise<{ ok: boolean; message?: string }> {
  const passwordHash = await bcrypt.hash(password, 12);
  await AdminCredential.updateOne(
    { username },
    { $set: { passwordHash, mustChangePassword: false } }
  );
  return { ok: true };
}

export async function ensureAdminCredential(): Promise<void> {
  if (process.env.NODE_ENV === "production") return;
  const existing = await AdminCredential.countDocuments();
  if (existing === 0) {
    const passwordHash = await bcrypt.hash("changeme123", 12);
    await AdminCredential.create({
      username: "admin",
      passwordHash,
      mustChangePassword: true
    });
  }
}
