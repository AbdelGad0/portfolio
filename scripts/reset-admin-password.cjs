const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("Usage: node --env-file=.env scripts/reset-admin-password.cjs <password>");
  process.exit(1);
}
if (String(password).length < 8) {
  console.error("Password must be at least 8 characters");
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  const coll = mongoose.connection.collection("admincredentials");
  const hash = bcrypt.hashSync(String(password), 12);
  const existing = await coll.findOne({ username: "admin" });
  if (existing) {
    await coll.updateOne(
      { _id: existing._id },
      {
        $set: {
          passwordHash: hash,
          mustChangePassword: false,
          failedLoginAttempts: 0,
          lockUntil: null
        }
      }
    );
  } else {
    await coll.insertOne({
      username: "admin",
      passwordHash: hash,
      mustChangePassword: false,
      failedLoginAttempts: 0,
      lastFailedLoginAt: null,
      lockUntil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  console.log("OK: admin password updated");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});