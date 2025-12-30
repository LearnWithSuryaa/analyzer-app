"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Mic } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading?: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || isLoading) return;
    onSend(text.trim());
    setText("");
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [text]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="relative group rounded-[26px] bg-slate-900/80 backdrop-blur-xl border border-white/10 flex items-end gap-3 p-2 shadow-2xl transition-all duration-300 focus-within:bg-slate-900 focus-within:border-indigo-500/30">
        {/* Decoration Icon */}
        <div className="p-2 mb-1.5 rounded-full text-indigo-400/50">
          <Sparkles size={20} />
        </div>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik kalimat Bahasa Jawa (Krama/Ngoko)..."
          className="w-full bg-transparent border-none text-white placeholder-white/40 resize-none focus:ring-0 focus:outline-none outline-none max-h-[200px] py-3 px-0 leading-6 selection:bg-indigo-500/30 font-medium"
          rows={1}
          disabled={isLoading}
        />

        <button
          onClick={() => handleSubmit()}
          disabled={!text.trim() || isLoading}
          className={`p-2 mb-1.5 rounded-full transition-all duration-200 ${
            text.trim()
              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send size={18} className="ml-0.5" />
          )}
        </button>
      </div>
      <p className="text-center text-xs text-white/30 mt-3">
        Javanese AI Analyzer can make mistakes. Consider checking important
        information.
      </p>
    </div>
  );
}
