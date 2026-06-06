export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  createdAt: string;
}

export interface AdminVocabulary {
  id: string;
  english: string;
  indonesian: string;
  grade: "Grade 3" | "Grade 4" | "Grade 5" | "Grade 6";
  image?: string;
  audio?: string;
}

export interface AdminMaterial {
  id: string;
  title: string;
  grade: "Grade 3" | "Grade 4" | "Grade 5" | "Grade 6";
  skill: "Reading" | "Listening" | "Writing" | "Speaking";
}

export type QuizType = "Reading MCQ" | "Listening MCQ" | "Writing Fill Blank" | "Speaking Pronunciation";

export interface AdminQuiz {
  id: string;
  materialId: string;
  questionText: string;
  type: QuizType;
  
  // MCQ fields
  options?: { A: string; B: string; C: string };
  answerKey?: "A" | "B" | "C";

  // Fill in the blank fields
  fullSentence?: string;
  blankWord?: string;
  blankIndex?: number;

  // Speaking fields
  instruction?: string;
  readingText?: string;
}

export interface AdminScore {
  id: string;
  studentName: string;
  materialId: string; // References AdminMaterial
  highestScore: number;
  completedAt: string; // ISO date or formatted string
}
