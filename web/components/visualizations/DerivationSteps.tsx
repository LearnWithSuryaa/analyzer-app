"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import clsx from "clsx";

export default function DerivationSteps({ steps }: { steps: string[] }) {
  // Helper to parse a step string into tokens
  const parseStep = (stepStr: string) => {
    // Remove arrow if present
    const cleanStr = stepStr.replace(/^⇒\s+/, "");
    return cleanStr.split(" ");
  };

  const NON_TERMINALS = new Set([
    "S",
    "CLAUSE",
    "NP",
    "VP",
    "PP",
    "SUBJEK",
    "PREDIKAT",
    "OBJEK_NOUN",
    "WAKTU",
    "KONJUNGTIF",
    "AUX",
    "ADJEKTIVA",
    "BILANGAN",
    "PRANATACARA",
    "P", // Preposisi
    "V", // Verba
    "ADJ", // Adjektiva (Short)
    "NUM", // Numeralia (Short)
  ]);

  const isTerminal = (token: string) => {
    // If it's a known Non-Terminal symbol, it's not a terminal.
    // Also check if it's the arrow symbol.
    if (token === "⇒") return false;
    return !NON_TERMINALS.has(token);
  };

  return (
    <div className="glass-card p-0 h-full flex flex-col overflow-hidden bg-slate-900/40">
      <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-20 flex justify-between items-center min-h-[64px]">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded bg-indigo-500/20 text-indigo-300 text-xs font-mono">
            LM
          </span>
          Derivation Trace
        </h3>
        <span className="text-xs text-white/40 font-mono">
          {steps.length} Steps
        </span>
      </div>

      <div className="overflow-y-auto p-6 relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[2.25rem] top-6 bottom-0 w-px bg-white/10" />

        <div className="space-y-6">
          {steps.map((step, index) => {
            const tokens = parseStep(step);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute left-9 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

                {/* Content */}
                <div className="glass-panel p-3 flex flex-wrap gap-2 items-center min-h-[3rem]">
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-px bg-indigo-500/50" />

                  {/* Step Number Badge */}
                  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-white/10 text-[10px] text-white/60 font-mono border border-white/5">
                    {index + 1}
                  </span>

                  {tokens.map((token, tIdx) => {
                    const isT = isTerminal(token);
                    return (
                      <span
                        key={tIdx}
                        className={clsx(
                          "px-3 py-1.5 rounded-md text-base font-medium border transition-colors shadow-sm",
                          isT
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                            : "bg-indigo-500/10 border-indigo-500/20 text-indigo-200"
                        )}
                      >
                        {token}
                      </span>
                    );
                  })}
                </div>

                {/* Arrow for next step (except last) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[2.25rem] -bottom-4 -translate-x-1/2 text-white/20">
                    <ArrowDown size={12} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
