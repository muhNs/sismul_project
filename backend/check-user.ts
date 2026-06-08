import { PrismaClient } from "./generated/prisma/client/index.js";
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log("USERS IN DB:", JSON.stringify(users, null, 2));
}
check().finally(() => prisma.$disconnect());
