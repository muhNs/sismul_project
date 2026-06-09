import "dotenv/config";
import path from "node:path";
import { pathToFileURL } from "node:url";
import bcrypt from "bcrypt";
import { prisma } from "./src/shared/prisma";

export async function seedDefaultAdmin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@learnly.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: "ADMIN",
      password: hashedPassword,
    },
    create: {
      name: "Admin Utama",
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("ADMIN READY:", admin.email);
  return admin;
}

async function main() {
  try {
    await seedDefaultAdmin();
  } finally {
    await prisma.$disconnect();
  }
}

const isDirectRun = process.argv[1]
  ? import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
  : false;

if (isDirectRun) {
  main().catch((err) => {
    console.error("Gagal membuat admin:", err);
    process.exitCode = 1;
  });
}
