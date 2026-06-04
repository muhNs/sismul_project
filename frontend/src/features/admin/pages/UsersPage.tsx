"use client";

import React, { useState } from "react";
import { UsersTable } from "../components/users/UsersTable";
import { dummyUsers } from "../data/users";
import { Button } from "@/components/ui/Button";

export const UsersPage = () => {
  // In the future, you can use useEffect to fetch real data here
  const [users, setUsers] = useState(dummyUsers);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Manajemen User</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Kelola data pengguna, peran, dan status akun.
          </p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Tambah User
        </Button>
      </div>

      <UsersTable users={users} />
    </div>
  );
};
