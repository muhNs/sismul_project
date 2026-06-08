import "dotenv/config";
import { prisma } from "./src/shared/prisma";
import bcrypt from "bcrypt";

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@learnly.com" },
    update: { role: "ADMIN" },
    create: {
      name: "Admin Utama",
      email: "admin@learnly.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("ADMIN CREATED:", admin);
}

createAdmin()
  .catch((err) => {
    console.error("Gagal membuat admin:", err);
  })
  .finally(() => prisma.$disconnect());
