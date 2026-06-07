"use client";

import { useState, useEffect } from "react";
import { Material, getStudentMaterials } from "../api/getStudentMaterials";

export function useMaterials(gradeLevel?: number) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchMaterials = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStudentMaterials(gradeLevel);
        if (mounted) {
          setMaterials(data);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err?.response?.data?.message || "Gagal mengambil data materi");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (gradeLevel !== undefined) {
      fetchMaterials();
    } else {
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [gradeLevel]);

  return { materials, loading, error };
}
