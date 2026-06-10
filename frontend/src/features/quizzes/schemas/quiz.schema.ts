import * as z from "zod";

export const quizSchema = z.object({
  question: z.string().min(5, "Pertanyaan minimal 5 karakter"),
  optionA: z.string().min(1, "Wajib diisi"),
  optionB: z.string().min(1, "Wajib diisi"),
  optionC: z.string().min(1, "Wajib diisi"),
  optionD: z.string().optional(),
  correctAnswer: z
    .string()
    .refine((val) => ["A", "B", "C", "D"].includes(val), {
      message: "Pilih jawaban yang benar",
    }),
});

export type QuizFormValues = z.infer<typeof quizSchema>;
