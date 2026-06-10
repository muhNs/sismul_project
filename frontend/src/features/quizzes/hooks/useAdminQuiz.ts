import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from "../api/adminQuizApi";

export const useAdminQuiz = () => {
  const queryClient = useQueryClient();

  // 1. Fetch semua kuis
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-quizzes"],
    queryFn: getQuizzes,
  });

  // 2. Mutation: Buat Kuis
  const createMutation = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] });
    },
  });

  // 3. Mutation: Update Kuis
  const updateMutation = useMutation({
    mutationFn: updateQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] });
    },
  });

  // 4. Mutation: Hapus Kuis
  const deleteMutation = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] });
    },
  });

  return {
    quizzes: data?.data || [], // Asumsi backend membungkus data di properti 'data'
    isLoading,
    error,
    createQuiz: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateQuiz: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteQuiz: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};