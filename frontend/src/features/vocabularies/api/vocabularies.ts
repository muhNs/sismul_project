import {privateApi} from "@/lib/axios";

export interface Vocabulary {
  id: number;
  english: string;
  indonesian: string;
  gradeLevel: number;
  image_path?: string | null;
  voice_path?: string | null;
}

export const getVocabularies = async (gradeLevel?: number): Promise<Vocabulary[]> => {
  const url = gradeLevel ? `/vocabularies?gradeLevel=${gradeLevel}` : "/vocabularies";
  const response = await privateApi.get<{ status: string; data: Vocabulary[] }>(url);
  return response.data.data;
};

export const createVocabulary = async (formData: FormData): Promise<Vocabulary> => {
  const response = await privateApi.post<{ status: string; data: Vocabulary }>("/vocabularies", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const updateVocabulary = async (id: number, formData: FormData): Promise<Vocabulary> => {
  const response = await privateApi.put<{ status: string; data: Vocabulary }>(`/vocabularies/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const deleteVocabulary = async (id: number): Promise<void> => {
  await privateApi.delete(`/vocabularies/${id}`);
};
