import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { Send, Loader2, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "¡Hola, soy Dora! 🎒 ¡Vamos a explorar juntos la teoría de Jean Piaget! ¿Qué te gustaría aprender hoy? ¡Podemos repasar conceptos o resolver dudas!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      
      const systemInstruction = `Eres un asistente educativo interactivo con la temática de Dora la Exploradora. Tu objetivo es ayudar a los estudiantes a repasar la teoría del desarrollo cognoscitivo de Jean Piaget, basada en el compendio de Judith Meece.
      
      Usa un tono alegre, entusiasta y motivador, como Dora. Usa frases típicas como "¡Excelente!", "¡Lo logramos!", "¡Zorro, no te lo lleves!" (si se equivocan o se distraen), y haz preguntas para mantenerlos participando.
      
      Aquí está la información base que debes usar para responder:
      - Constructivismo: El niño construye activamente su conocimiento.
      - Esquemas: Conjuntos de acciones físicas o mentales para organizar información.
      - Asimilación y Acomodación: Moldear información nueva (asimilación) o modificar esquemas (acomodación).
      - Equilibrio: Tendencia a mantener estables las estructuras cognoscitivas.
      - Etapas:
        1. Sensoriomotora (0-2 años): Conducta orientada a metas, permanencia de objetos.
        2. Preoperacional (2-7 años): Pensamiento representacional, animismo, realismo, egocentrismo, centralización.
        3. Operaciones Concretas (7-11 años): Lógica, reversibilidad, seriación, clasificación, conservación.
        4. Operaciones Formales (11+ años): Pensamiento abstracto, lógica proposicional, razonamiento hipotético-deductivo.
        
      Responde de manera clara, breve y enfocada en los conceptos más importantes. Si te piden un caso de estudio, plantéalo como una pregunta de opción múltiple.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map((m) => ({
            role: m.role,
            parts: [{ text: m.content }],
          })),
          { role: "user", parts: [{ text: userMessage }] },
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      if (response.text) {
        setMessages((prev) => [
          ...prev,
          { role: "model", content: response.text! },
        ]);
      }
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            "¡Oh no! Parece que Zorro se llevó nuestra conexión. ¿Podemos intentarlo de nuevo?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-orange-300 overflow-hidden flex flex-col h-[70vh]">
      <div className="bg-orange-400 p-4 text-white flex items-center gap-3 shadow-md z-10">
        <div className="bg-white p-1 rounded-full shadow-inner">
          <img src="https://upload.wikimedia.org/wikipedia/en/8/81/Dora_the_Explorer_character.png" alt="Dora" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.outerHTML = '<span class="text-2xl p-2">👧🏽</span>' }} />
        </div>
        <div>
          <h2 className="text-xl font-bold font-sans">Dora la Exploradora</h2>
          <p className="text-orange-100 text-sm font-medium">
            Asistente de Estudio Piaget
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-orange-100 border-2 border-orange-300"}`}
              >
                {msg.role === "user" ? (
                  <User className="w-6 h-6" />
                ) : (
                  <img src="https://upload.wikimedia.org/wikipedia/en/8/81/Dora_the_Explorer_character.png" alt="Dora" className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.outerHTML = '<span class="text-xl">🎒</span>' }} />
                )}
              </div>
              <div
                className={`p-4 rounded-2xl shadow-sm ${msg.role === "user" ? "bg-blue-500 text-white rounded-tr-none" : "bg-white border-2 border-orange-100 text-slate-700 rounded-tl-none"}`}
              >
                <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-a:text-orange-500">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-xl">🎒</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border-2 border-orange-100 text-slate-500 rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-orange-400" />
                <span className="font-medium">Dora está pensando...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t-2 border-orange-100 z-10">
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="¡Pregúntame algo sobre Piaget!"
            className="flex-1 p-4 pr-14 rounded-full border-2 border-orange-200 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all font-medium text-slate-700 bg-orange-50/30"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white rounded-full flex items-center justify-center transition-colors shadow-md"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
