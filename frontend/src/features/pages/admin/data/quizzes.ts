import { AdminQuiz } from "../types";

export const dummyQuizzes: AdminQuiz[] = [
  {
    id: "QZ-001",
    materialId: "MAT-001",
    questionText: "Who is the father of my father?",
    type: "Reading MCQ",
    options: {
      A: "Uncle",
      B: "Grandfather",
      C: "Brother"
    },
    answerKey: "B"
  },
  {
    id: "QZ-002",
    materialId: "MAT-001",
    questionText: "My mother has a daughter. She is my...",
    type: "Reading MCQ",
    options: {
      A: "Sister",
      B: "Aunt",
      C: "Cousin"
    },
    answerKey: "A"
  },
  {
    id: "QZ-003",
    materialId: "MAT-004",
    questionText: "The cat is sleeping under the table.",
    type: "Writing Fill Blank",
    fullSentence: "The cat is sleeping under the table.",
    blankWord: "sleeping",
    blankIndex: 3
  },
  {
    id: "QZ-004",
    materialId: "MAT-003",
    questionText: "Please read this sentence clearly.",
    type: "Speaking Pronunciation",
    instruction: "Please read this sentence clearly.",
    readingText: "I wake up at six o'clock every morning."
  }
];
