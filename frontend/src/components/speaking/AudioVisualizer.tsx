"use client";

import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isRecording: boolean;
  statusText: string;
}

export default function AudioVisualizer({
  isRecording,
  statusText,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const startVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const AudioConstructor =
        window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioConstructor();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);

      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      draw();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopVisualization = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  useEffect(() => {
    if (isRecording) {
      startVisualization();
    } else {
      stopVisualization();
    }

    return () => {
      stopVisualization();
    };
  }, [isRecording]);

  const draw = () => {
    if (!analyserRef.current || !dataArrayRef.current || !canvasRef.current)
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const bufferLength = dataArrayRef.current.length;

    animationRef.current = requestAnimationFrame(draw);

    analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);

    // Clear canvas
    ctx.fillStyle = "rgb(31, 41, 55)"; // Gray-800
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = (dataArrayRef.current[i] / 255) * HEIGHT * 0.8;

      // Gradient color from purple to pink
      const gradient = ctx.createLinearGradient(
        0,
        HEIGHT - barHeight,
        0,
        HEIGHT,
      );
      gradient.addColorStop(0, "rgb(147, 51, 234)"); // Purple
      gradient.addColorStop(1, "rgb(236, 72, 153)"); // Pink

      ctx.fillStyle = gradient;
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={120}
        className="w-full max-w-2xl h-30 rounded-lg"
      />
      <p className="text-gray-300 text-sm text-center">{statusText}</p>
    </div>
  );
}
