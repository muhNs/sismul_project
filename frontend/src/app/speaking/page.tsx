'use client';

import { useState, useEffect, useRef } from 'react';
import SpeakingArena from '@/components/speaking/SpeakingArena';
import { SpeakingQuestion } from '@/types/speaking';

export default function SpeakingPage() {
  const [questions, setQuestions] = useState<SpeakingQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [kelas, setKelas] = useState('3'); // Default kelas 3

  useEffect(() => {
    // Fetch speaking questions from backend
    fetchQuestions();
  }, [kelas]);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API endpoint
      const response = await fetch(`http://localhost:5000/api/speaking/questions?kelas=${kelas}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Fallback to mock data for development
      setQuestions(getMockQuestions());
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChecked = (isCorrect: boolean, points: number) => {
    setScore((prevScore: number) => prevScore + points);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex: number) => prevIndex + 1);
    } else {
      // Quiz completed - navigate to results
      handleQuizComplete();
    }
  };

  const handleQuizComplete = async () => {
    try {
      // Save highest score to backend
      await fetch('http://localhost:5000/api/speaking/save-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add JWT token here
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          kelas,
          chapter: 'speaking',
          score,
        }),
      });
      
      // Navigate to results page
      window.location.href = `/results?score=${score}&total=100`;
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
        <div className="text-white text-2xl">No questions available</div>
      </div>
    );
  }

  return (
    <SpeakingArena
      question={questions[currentIndex]}
      currentIndex={currentIndex}
      totalQuestions={questions.length}
      score={score}
      onAnswerChecked={handleAnswerChecked}
      onNext={handleNext}
    />
  );
}

// Mock data for development
function getMockQuestions(): SpeakingQuestion[] {
  return [
    {
      id: 1,
      kelas: 3,
      instruction: 'Look at the picture and describe what you see.',
      targetSentence: 'The cat is sleeping on the sofa.',
      imageUrl: '', // Removed for testing
      audioUrl: '', // Removed for testing
      keywords: ['cat', 'sleeping', 'sofa'],
      acceptableVariations: [
        'The cat is sleeping on the couch',
        'A cat is sleeping on the sofa',
        'The cat sleeps on the sofa',
      ],
    },
    {
      id: 2,
      kelas: 3,
      instruction: 'Say what the boy is doing.',
      targetSentence: 'The boy is playing football.',
      imageUrl: '', // Removed for testing
      audioUrl: '', // Removed for testing
      keywords: ['boy', 'playing', 'football'],
      acceptableVariations: [
        'The boy is playing soccer',
        'A boy is playing football',
        'The boy plays football',
      ],
    },
    // Add more mock questions as needed
  ];
}
