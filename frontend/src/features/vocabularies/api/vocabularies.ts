import api from "@/lib/axios";

export interface Vocabulary {
  id: number;
  english: string;
  indonesian: string;
  gradeLevel: number;
  image_path?: string | null;
  voice_path?: string | null;
}

export const getVocabularies = async (gradeLevel?: number): Promise<Vocabulary[]> => {
  const url = gradeLevel ? `/api/v1/vocabularies?gradeLevel=${gradeLevel}` : "/api/v1/vocabularies";
  const response = await api.get<{ status: string; data: Vocabulary[] }>(url);
  return response.data.data;
};

export const createVocabulary = async (formData: FormData): Promise<Vocabulary> => {
  const response = await api.post<{ status: string; data: Vocabulary }>("/api/v1/vocabularies", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const updateVocabulary = async (id: number, formData: FormData): Promise<Vocabulary> => {
  const response = await api.put<{ status: string; data: Vocabulary }>(`/api/v1/vocabularies/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const deleteVocabulary = async (id: number): Promise<void> => {
  await api.delete(`/api/v1/vocabularies/${id}`);
};
