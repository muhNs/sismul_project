// // import { PrismaClient } from "./generated/prisma/client.js";
// // const prisma = new PrismaClient();

// // async function check() {
// //   const users = await prisma.user.findMany();
// //   console.log("USERS IN DB:", JSON.stringify(users, null, 2));
// // }
// // check().finally(() => prisma.$disconnect());

// import dotenv from "dotenv";
// dotenv.config();

// import { PrismaClient } from "./generated/prisma/client.js";
// import { PrismaPg } from "@prisma/adapter-pg";

// const prisma = new PrismaClient({
//   adapter: new PrismaPg({
//     connectionString: process.env.DATABASE_URL!,
//   }),
// });

// async function check() {
//   const users = await prisma.user.findMany();
//   console.log("USERS IN DB:", JSON.stringify(users, null, 2));
// }

// check()
//   .catch((err) => {
//     console.error(err);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });