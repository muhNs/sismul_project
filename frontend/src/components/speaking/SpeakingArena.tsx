'use client';

import { useState, useEffect, useRef } from 'react';
import { SpeakingQuestion, SpeechRecognitionResult } from '@/types/speaking';
import AudioVisualizer from './AudioVisualizer';
import FeedbackModal from './FeedbackModal';

interface SpeakingArenaProps {
  question: SpeakingQuestion;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  onAnswerChecked: (isCorrect: boolean, points: number) => void;
  onNext: () => void;
}

// Extend Window interface for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function SpeakingArena({
  question,
  currentIndex,
  totalQuestions,
  score,
  onAnswerChecked,
  onNext,
}: SpeakingArenaProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [result, setResult] = useState<SpeechRecognitionResult | null>(null);
  const [recordingStatus, setRecordingStatus] = useState('Tekan tombol mikrofon untuk mulai');
  
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true; // Changed to true for better responsiveness
        recognitionRef.current.lang = 'en-US';
        recognitionRef.current.maxAlternatives = 1;

        recognitionRef.current.onresult = (event: any) => {
          // Check for final results
          const lastResultIndex = event.results.length - 1;
          const result = event.results[lastResultIndex];
          
          if (result.isFinal) {
            const speechResult = result[0];
            const recognizedText = speechResult.transcript;
            const confidence = speechResult.confidence;
            
            setTranscript(recognizedText);
            setIsRecording(false);
            setRecordingStatus('✅ Rekaman selesai! Silakan cek jawaban.');
            
            console.log('Recognized:', recognizedText, 'Confidence:', confidence);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
          
          // Handle specific errors with better UX
          if (event.error === 'no-speech') {
            // Don't show alert, just update status - user can try again
            console.warn('No speech detected - user can try again');
            // Optionally set a message in UI instead of alert
          } else if (event.error === 'not-allowed') {
            alert('⚠️ Akses mikrofon ditolak.\n\nSolusi:\n1. Klik ikon gembok di address bar\n2. Izinkan akses mikrofon\n3. Refresh halaman');
          } else if (event.error === 'network') {
            alert('⚠️ Web Speech API membutuhkan koneksi internet.\n\nPastikan:\n1. Internet Anda aktif\n2. Tidak ada firewall/proxy yang memblokir\n3. Gunakan Chrome atau Edge terbaru');
          } else if (event.error === 'aborted') {
            // Recording was aborted, user can try again
            console.warn('Recording aborted');
          }
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };
      } else {
        alert('Browser Anda tidak mendukung Web Speech API. Gunakan Chrome atau Edge terbaru.');
      }
    }

    // Reset state when question changes
    return () => {
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop();
      }
      setTranscript('');
      setIsChecked(false);
      setShowFeedback(false);
      setResult(null);
    };
  }, [question]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setRecordingStatus('Recording dihentikan. Klik lagi untuk merekam ulang.');
    } else {
      setTranscript('');
      setIsChecked(false);
      setRecordingStatus('🎤 Mendengarkan... Silakan berbicara sekarang!');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const playTargetAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const checkAnswer = () => {
    if (!transcript) return;

    // Analyze the transcript
    const analysis = analyzeTranscript(transcript, question);
    setResult(analysis);
    setIsChecked(true);
    setShowFeedback(true);
    
    // Notify parent component
    onAnswerChecked(analysis.isCorrect, analysis.score);
  };

  const analyzeTranscript = (
    transcript: string,
    question: SpeakingQuestion
  ): SpeechRecognitionResult => {
    const normalizedTranscript = transcript.toLowerCase().trim();
    const targetSentence = question.targetSentence.toLowerCase();
    
    // Check if transcript matches target sentence exactly
    if (normalizedTranscript === targetSentence) {
      return {
        transcript,
        confidence: 1.0,
        isCorrect: true,
        matchedKeywords: question.keywords,
        score: 10,
      };
    }

    // Check acceptable variations
    const matchesVariation = question.acceptableVariations.some(
      variation => normalizedTranscript === variation.toLowerCase()
    );

    if (matchesVariation) {
      return {
        transcript,
        confidence: 0.95,
        isCorrect: true,
        matchedKeywords: question.keywords,
        score: 10,
      };
    }

    // Check keyword matching (partial credit)
    const matchedKeywords = question.keywords.filter(keyword =>
      normalizedTranscript.includes(keyword.toLowerCase())
    );

    const keywordMatchRatio = matchedKeywords.length / question.keywords.length;

    // If 70% or more keywords matched, consider it correct
    if (keywordMatchRatio >= 0.7) {
      return {
        transcript,
        confidence: keywordMatchRatio,
        isCorrect: true,
        matchedKeywords,
        score: 10,
      };
    }

    // Otherwise, it's incorrect
    return {
      transcript,
      confidence: keywordMatchRatio,
      isCorrect: false,
      matchedKeywords,
      score: 0,
    };
  };

  const handleNextClick = () => {
    setShowFeedback(false);
    setTimeout(() => {
      onNext();
    }, 300);
  };

  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 flex justify-between items-center">
          <button
            onClick={() => window.history.back()}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all"
          >
            ← Kembali
          </button>
          
          <h1 className="text-2xl font-bold">Speaking Practice</h1>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">Skor:</span>
            <span className="text-2xl font-bold text-yellow-300">{score}</span>
            <span className="text-sm">/100</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 p-4 relative">
          <div
            className="h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-600 font-semibold">
            Soal {currentIndex + 1}/{totalQuestions}
          </span>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-6">
          {/* Material Section */}
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            {question.imageUrl && (
              <img
                src={question.imageUrl}
                alt="Visual prompt"
                className="w-full max-h-64 object-cover rounded-lg mb-4"
              />
            )}
            
            <p className="text-gray-600 mb-6 text-center">{question.instruction}</p>
            
            <div className="bg-white p-5 rounded-lg border-2 border-purple-500">
              <p className="text-sm text-gray-500 mb-2">Ucapkan kalimat ini:</p>
              <p className="text-xl font-bold text-gray-800 mb-4 text-center">
                {question.targetSentence}
              </p>
              
              {question.audioUrl && (
                <>
                  <audio ref={audioRef} src={question.audioUrl} />
                  <button
                    onClick={playTargetAudio}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all"
                  >
                    🔊 Dengar Contoh
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Speaking Section */}
          <div className="space-y-6">
            {/* Audio Visualizer */}
            <AudioVisualizer
              isRecording={isRecording}
              statusText={recordingStatus}
            />

            {/* Microphone Button */}
            <div className="flex justify-center">
              <button
                onClick={toggleRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-5xl transition-all transform hover:scale-110 active:scale-95 shadow-lg ${
                  isRecording
                    ? 'bg-gradient-to-br from-green-500 to-green-600 animate-pulse'
                    : 'bg-gradient-to-br from-red-500 to-red-600'
                }`}
              >
                🎤
              </button>
            </div>

            {/* Recognition Result */}
            <div className="bg-gray-100 p-5 rounded-lg text-center border-2 border-gray-300">
              <p className="text-sm text-gray-500 mb-2">Anda mengatakan:</p>
              <p className="text-lg font-semibold text-gray-800 min-h-[30px]">
                {transcript || '-'}
              </p>
            </div>

            {/* Check Answer Button */}
            <button
              onClick={checkAnswer}
              disabled={!transcript || isChecked}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-lg text-lg font-bold transition-all"
            >
              Cek Jawaban
            </button>
          </div>
        </div>

        {/* Feedback Modal */}
        {showFeedback && result && (
          <FeedbackModal
            isCorrect={result.isCorrect}
            score={result.score}
            userAnswer={result.transcript}
            correctAnswer={question.targetSentence}
            onNext={handleNextClick}
          />
        )}
      </div>
    </div>
  );
}
