import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  case?: string;
}

interface QuizProps {
  questions: Question[];
  title: string;
  description?: string;
}

export default function Quiz({ questions, title, description }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl max-w-2xl mx-auto border-4 border-orange-300">
        <h2 className="text-3xl font-bold text-orange-600 mb-4 font-sans">
          ¡Exploración Completada! 🌟
        </h2>
        <p className="text-xl text-slate-700 mb-6 font-medium">
          Tu puntuación:{" "}
          <span className="text-2xl font-bold text-emerald-500">{score}</span>{" "}
          de {questions.length}
        </p>
        <div className="w-full bg-slate-200 rounded-full h-4 mb-8">
          <div
            className="bg-emerald-500 h-4 rounded-full transition-all duration-1000"
            style={{ width: `${(score / questions.length) * 100}%` }}
          ></div>
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-colors shadow-md"
        >
          <RotateCcw className="w-5 h-5" />
          Volver a intentarlo
        </button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-2">{title}</h2>
        {description && (
          <p className="text-slate-600 font-medium">{description}</p>
        )}
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border-4 border-orange-200">
        <div className="flex justify-between items-center mb-6 text-sm font-bold text-slate-500">
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
          <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full">
            Puntos: {score}
          </span>
        </div>

        {q.case && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl">
            <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <span className="text-xl">🗺️</span> Caso de Estudio:
            </h3>
            <p className="text-slate-700 leading-relaxed">{q.case}</p>
          </div>
        )}

        <h3 className="text-xl font-bold text-slate-800 mb-6 leading-relaxed">
          {q.question}
        </h3>

        <div className="space-y-3">
          {q.options.map((option, index) => {
            let buttonClass =
              "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 font-medium ";

            if (!isAnswered) {
              buttonClass +=
                "border-slate-200 hover:border-orange-400 hover:bg-orange-50 text-slate-700";
            } else {
              if (index === q.correctAnswer) {
                buttonClass +=
                  "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm";
              } else if (index === selectedOption) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass +=
                  "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {isAnswered && index === q.correctAnswer && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 ml-2" />
                  )}
                  {isAnswered &&
                    index === selectedOption &&
                    index !== q.correctAnswer && (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 ml-2" />
                    )}
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm border-2 border-slate-100">
              {selectedOption === q.correctAnswer ? (
                <>
                  <img src="https://upload.wikimedia.org/wikipedia/en/4/4b/Boots_the_Monkey.png" alt="Botas" className="w-12 h-auto drop-shadow-md animate-bounce" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.outerHTML = '<span class="text-3xl">🐒</span>' }} />
                  <span className="text-emerald-600 font-bold text-lg">¡Excelente! ¡Lo logramos!</span>
                </>
              ) : (
                <>
                  <img src="https://upload.wikimedia.org/wikipedia/en/f/f6/Swiper_the_Fox.png" alt="Zorro" className="w-12 h-auto drop-shadow-md" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.outerHTML = '<span class="text-3xl">🦊</span>' }} />
                  <span className="text-red-500 font-bold text-lg">¡Oh no! Zorro, no te lo lleves.</span>
                </>
              )}
            </div>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-colors shadow-md w-full md:w-auto justify-center"
            >
              {currentQuestion < questions.length - 1
                ? "Siguiente"
                : "Ver Resultados"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
