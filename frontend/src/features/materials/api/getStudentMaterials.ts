import api from "@/lib/axios";

export interface Material {
  id: number;
  chapter: number;
  gradeLevel: number;
  skillCategory: "READING" | "LISTENING" | "SPEAKING" | "WRITING";
  content: string | null;
  mediaUrl: string | null;
  created_at: string;
}

export interface MaterialsResponse {
  status: string;
  data: Material[];
}

export const getStudentMaterials = async (gradeLevel?: number): Promise<Material[]> => {
  const url = gradeLevel ? `/api/v1/materials?gradeLevel=${gradeLevel}` : '/api/v1/materials';
  const response = await api.get<MaterialsResponse>(url);
  return response.data.data;
};
