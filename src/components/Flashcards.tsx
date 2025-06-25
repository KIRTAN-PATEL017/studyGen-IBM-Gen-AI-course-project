import React, { useState } from 'react';
import { Brain, RotateCcw, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardsProps {
  flashcards: Flashcard[];
}

const Flashcards: React.FC<FlashcardsProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcards[currentIndex];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const downloadFlashcards = () => {
    const flashcardsText = flashcards
      .map((card, index) => `Card ${index + 1}:\nQ: ${card.question}\nA: ${card.answer}\n`)
      .join('\n');
    
    const blob = new Blob([flashcardsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!flashcards.length) {
    return null;
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold">Flashcards</h3>
        </div>
        <button
          onClick={downloadFlashcards}
          className="p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          title="Download flashcards"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      <div className="text-center mb-4">
        <span className="text-sm text-gray-400">
          {currentIndex + 1} of {flashcards.length}
        </span>
      </div>

      <div className="relative">
        <div
          className={`bg-gradient-to-br ${
            isFlipped 
              ? 'from-green-600 to-green-700' 
              : 'from-purple-600 to-purple-700'
          } rounded-lg p-8 min-h-[300px] flex items-center justify-center cursor-pointer transform transition-all duration-300 hover:scale-105`}
          onClick={flipCard}
        >
          <div className="text-center">
            <div className="mb-4">
              <span className="text-sm text-white/80 uppercase tracking-wide">
                {isFlipped ? 'Answer' : 'Question'}
              </span>
            </div>
            <p className="text-xl text-white font-medium leading-relaxed">
              {isFlipped ? currentCard.answer : currentCard.question}
            </p>
            <div className="mt-6">
              <RotateCcw className="w-5 h-5 text-white/60 mx-auto" />
              <span className="text-sm text-white/60 mt-1 block">
                Click to flip
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevCard}
            disabled={flashcards.length <= 1}
            className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {flashcards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsFlipped(false);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-purple-400' : 'bg-zinc-600 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            disabled={flashcards.length <= 1}
            className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;