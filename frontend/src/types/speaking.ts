export interface SpeakingQuestion {
  id: number;
  kelas: number;
  instruction: string;
  targetSentence: string;
  imageUrl?: string;
  audioUrl?: string;
  keywords: string[];
  acceptableVariations: string[];
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isCorrect: boolean;
  matchedKeywords: string[];
  score: number;
}
