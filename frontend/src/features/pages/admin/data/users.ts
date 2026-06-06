import { AdminUser } from "../types";

export const dummyUsers: AdminUser[] = [
  {
    id: "USR-001",
    name: "Budi Santoso",
    email: "budi@email.com",
    role: "user",
    status: "active",
    createdAt: "2023-10-01",
  },
  {
    id: "USR-002",
    name: "Andi Wijaya",
    email: "andi.w@email.com",
    role: "admin",
    status: "active",
    createdAt: "2023-09-15",
  },
  {
    id: "USR-003",
    name: "Siti Aminah",
    email: "siti.aminah@email.com",
    role: "user",
    status: "inactive",
    createdAt: "2023-11-20",
  },
  {
    id: "USR-004",
    name: "Ahmad Fauzi",
    email: "ahmad.f@email.com",
    role: "user",
    status: "active",
    createdAt: "2023-12-05",
  },
];
