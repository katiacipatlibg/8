import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface Flashcard {
  id: number;
  concept: string;
  definition: string;
}

interface FlashcardsProps {
  cards: Flashcard[];
}

export default function Flashcards({ cards }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 relative">
      {/* Decorative Boots */}
      <div className="absolute top-0 left-0 md:left-10 opacity-90 animate-bounce z-0" style={{ animationDuration: '3s' }}>
        <img src="https://upload.wikimedia.org/wikipedia/en/4/4b/Boots_the_Monkey.png" alt="Botas" className="w-24 md:w-32 h-auto drop-shadow-lg" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.outerHTML = '<span class="text-6xl">🐒</span>' }} />
      </div>

      <div className="mb-8 text-center z-10">
        <h2 className="text-3xl font-bold text-orange-600 mb-2 font-sans">
          Tarjetas de Estudio
        </h2>
        <p className="text-slate-600 font-medium">
          Lee el concepto y mentalmente define su significado antes de voltear
          la tarjeta.
        </p>
      </div>

      <div className="relative w-full max-w-lg aspect-[4/3] z-10" style={{ perspective: 1000 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-full h-full cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onClick={handleFlip}
            >
              {/* Front Face (Concept) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl border-4 bg-white border-orange-300 flex flex-col items-center justify-center p-8 text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-4">
                  Concepto
                </span>
                <h3 className="text-3xl font-bold text-slate-800 leading-tight">
                  {cards[currentIndex].concept}
                </h3>
                <div className="mt-8 text-slate-400 flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Toca para voltear
                  </span>
                </div>
              </div>

              {/* Back Face (Definition) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl border-4 bg-emerald-50 border-emerald-300 flex flex-col items-center justify-center p-8 text-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">
                  Definición
                </span>
                <p className="text-xl font-medium text-slate-700 leading-relaxed">
                  {cards[currentIndex].definition}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6 mt-12 z-10">
        <button
          onClick={handlePrev}
          className="p-4 rounded-full bg-white shadow-md hover:bg-orange-50 text-orange-500 transition-colors border-2 border-orange-200"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <span className="text-lg font-bold text-slate-500 bg-white px-6 py-2 rounded-full shadow-sm border-2 border-slate-100">
          {currentIndex + 1} / {cards.length}
        </span>
        <button
          onClick={handleNext}
          className="p-4 rounded-full bg-white shadow-md hover:bg-orange-50 text-orange-500 transition-colors border-2 border-orange-200"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
