"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ChatInput from "@/components/ChatInput";
import ResultSection from "@/components/ResultSection";
import { analyzeSentence } from "@/lib/analyzer";
import { AnalysisResult, ChatMessage } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

function AnalyzeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize from URL if present
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && messages.length === 0) {
      handleAnalyze(q, false); // Don't push to URL again to avoid loop
    }
  }, [searchParams]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const performAnalysis = async (
    text: string
  ): Promise<AnalysisResult | null> => {
    // Simulate slight delay for UX
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const res = analyzeSentence(text);
          resolve(res);
        } catch (e) {
          console.error(e);
          resolve(null);
        }
      }, 600);
    });
  };

  const handleAnalyze = async (text: string, updateUrl = true) => {
    if (!text.trim()) return;

    if (updateUrl) {
      // We typically don't update URL for every message in a chat history model
      // BUT for shareability of the *latest* context, we might?
      // Let's stick to "Session" model where URL only opens the *initial* one.
      // Or we update URL to the latest query so refreshing shows the last one.
      // Let's go with updating URL for shareability of the LATEST analysis.
      const params = new URLSearchParams(searchParams);
      params.set("q", text);
      router.push(`/analyze?${params.toString()}`);
    }

    const newMessageId = Date.now().toString();

    // Add User Message
    const userMsg: ChatMessage = {
      id: newMessageId + "-user",
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const result = await performAnalysis(text);

    if (result) {
      const assistantMsg: ChatMessage = {
        id: newMessageId + "-assistant",
        role: "assistant",
        result: result,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] relative">
      {/* Header handled by Global Navbar component (Contextual) */}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto scroll-smooth pt-20 pb-32">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "user" ? (
                  <div className="max-w-[80%] md:max-w-[70%]">
                    <div className="bg-[#2d2b52] text-white px-5 py-3 rounded-2xl rounded-tr-sm shadow-md border border-white/10">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex gap-4">
                      <div className="flex-none w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/10 mt-1">
                        AI
                      </div>
                      <div className="flex-1 min-w-0">
                        {msg.result && (
                          <ResultSection
                            result={msg.result}
                            onApplyCorrection={(original, fixed) => {
                              // Identify the user message that this response is for
                              // Typically the message immediately preceding this one
                              const userMsg =
                                index > 0 ? messages[index - 1] : null;

                              if (userMsg && userMsg.content) {
                                // Escape special regex chars
                                const escapedOriginal = original.replace(
                                  /[.*+?^${}()|[\]\\]/g,
                                  "\\$&"
                                );
                                // Case-insensitive match with word boundary
                                const regex = new RegExp(
                                  `\\b${escapedOriginal}\\b`,
                                  "ui"
                                );
                                let newSentence = userMsg.content.replace(
                                  regex,
                                  fixed
                                );

                                // Fallback if word boundary fails (e.g. punctuation, or string replace didn't work)
                                if (newSentence === userMsg.content) {
                                  // Try simple replacement (first occurrence, case-insensitive)
                                  const fallbackRegex = new RegExp(
                                    escapedOriginal,
                                    "i"
                                  );
                                  newSentence = userMsg.content.replace(
                                    fallbackRegex,
                                    fixed
                                  );
                                }

                                if (newSentence !== userMsg.content) {
                                  handleAnalyze(newSentence);
                                }
                              }
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="flex-none w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/10 mt-1">
                AI
              </div>
              <div className="glass-panel px-4 py-3 rounded-2xl animate-pulse">
                <span className="bg-white/20 w-2 h-2 rounded-full inline-block mr-1"></span>
                <span className="bg-white/20 w-2 h-2 rounded-full inline-block mr-1 delay-100"></span>
                <span className="bg-white/20 w-2 h-2 rounded-full inline-block delay-200"></span>
              </div>
            </motion.div>
          )}

          {/* Scroll Anchor */}
          <div ref={scrollRef} className="h-1" />
        </div>
      </div>

      {/* Input Area */}
      <motion.div
        layout
        initial={false}
        className={`absolute z-20 w-full transition-all duration-500 ease-in-out ${
          messages.length === 0
            ? "top-1/2 -translate-y-1/2"
            : "bottom-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent pt-12 pb-2"
        }`}
      >
        <div className="w-full max-w-3xl mx-auto p-4">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center mb-8"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl">
                    <span className="text-4xl">ꦗ</span>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Sugeng Rawuh
                </h2>
                <p className="text-white/50">
                  Kula saged ngrencangi panjenengan nganalisis basa Jawi.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <ChatInput onSend={handleAnalyze} isLoading={isLoading} />
        </div>
      </motion.div>
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <main className="h-screen bg-[#0f172a]">
      <Suspense
        fallback={
          <div className="text-white text-center mt-20">Loading...</div>
        }
      >
        <AnalyzeContent />
      </Suspense>
    </main>
  );
}
