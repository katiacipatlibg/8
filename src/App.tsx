import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  Map,
  Backpack,
  Star,
} from "lucide-react";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";
import Assistant from "./components/Assistant";
import {
  flashcards,
  theoreticalQuestions,
  practicalCases,
} from "./data/piagetData";

type Tab = "flashcards" | "quiz" | "cases" | "assistant";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("flashcards");

  const tabs = [
    {
      id: "flashcards",
      label: "Tarjetas",
      icon: <BookOpen className="w-5 h-5" />,
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      id: "quiz",
      label: "Examen",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "cases",
      label: "Casos",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "bg-yellow-500 hover:bg-yellow-600 text-slate-800",
    },
    {
      id: "assistant",
      label: "Asistente",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-orange-50 to-emerald-50 font-sans text-slate-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div
        className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce"
        style={{ animationDuration: "3s" }}
      >
        ☁️
      </div>
      <div
        className="absolute top-20 right-20 text-6xl opacity-20 animate-bounce"
        style={{ animationDuration: "4s" }}
      >
        ☁️
      </div>
      <div className="absolute bottom-10 left-20 text-6xl opacity-20">🌴</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-20">🌺</div>

      {/* Dora Characters */}
      <div className="absolute bottom-0 left-4 md:left-20 opacity-90 z-0 pointer-events-none">
        <img src="https://upload.wikimedia.org/wikipedia/en/8/81/Dora_the_Explorer_character.png" alt="Dora" className="w-32 md:w-48 h-auto drop-shadow-2xl" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>
      <div className="absolute bottom-0 right-4 md:right-20 opacity-90 z-0 pointer-events-none">
        <img src="https://upload.wikimedia.org/wikipedia/en/f/f6/Swiper_the_Fox.png" alt="Swiper" className="w-32 md:w-48 h-auto drop-shadow-2xl" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>

      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b-4 border-orange-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-400 p-2 rounded-full shadow-md text-2xl">
                🎒
              </div>
              <div>
                <h1 className="text-2xl font-black text-orange-600 tracking-tight flex items-center gap-2">
                  ¡Aventura con Piaget!{" "}
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                </h1>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Desarrollo Cognoscitivo
                </p>
              </div>
            </div>

            <nav className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all whitespace-nowrap shadow-sm border-2 ${
                    activeTab === tab.id
                      ? `${tab.color} text-white border-transparent scale-105`
                      : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "flashcards" && <Flashcards cards={flashcards} />}
            {activeTab === "quiz" && (
              <Quiz
                questions={theoreticalQuestions}
                title="¡Hora del Examen!"
                description="Demuestra lo que has aprendido sobre la teoría de Piaget. ¡Tú puedes hacerlo!"
              />
            )}
            {activeTab === "cases" && (
              <Quiz
                questions={practicalCases}
                title="¡Casos de Estudio!"
                description="Ayuda a resolver estas situaciones prácticas. ¡Usa tu mapa mental!"
              />
            )}
            {activeTab === "assistant" && <Assistant />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t-4 border-orange-300 py-6 mt-auto relative z-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
          <div className="flex gap-4 text-2xl">
            <span>🐒</span>
            <span>🦊</span>
            <span>🗺️</span>
          </div>
          <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">
            Miss Karu
          </p>
        </div>
      </footer>
    </div>
  );
}
