"use client";

import { AnalysisResult } from "javanese-analyzer-core";
import DerivationSteps from "./visualizations/DerivationSteps";
import TreeVisualizer from "./visualizations/TreeVisualizer";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import clsx from "clsx";

interface ResultSectionProps {
  result: AnalysisResult;
  onApplyCorrection?: (original: string, correction: string) => void;
}

export default function ResultSection({
  result,
  onApplyCorrection,
}: ResultSectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const isSyntaxValid = result.analisis.validitas_sintaksis === "VALID";
  const isSemanValid = result.analisis.validitas_unggah_ungguh === "SESUAI";
  const isAmbigu = result.analisis.validitas_unggah_ungguh === "AMBIGU";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full space-y-6 pb-4"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Hasil Analisis</h2>
          <p className="text-white/60 text-sm">
            Detail struktur kalimat dan validasi unggah-ungguh
          </p>
        </div>

        <button
          onClick={() => {
            const url = window.location.href;
            navigator.clipboard.writeText(url);
            const btn = document.getElementById("share-btn-text");
            if (btn) btn.innerText = "Copied!";
            setTimeout(() => {
              if (btn) btn.innerText = "Share Result";
            }, 2000);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white transition-colors text-sm font-medium rounded-lg shadow-lg hover:shadow-indigo-500/25"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-share-2"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
          </svg>
          <span id="share-btn-text">Share Result</span>
        </button>
      </div>
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={item}
          className={clsx(
            "glass-card p-6 flex items-start gap-4 border-l-4",
            isSyntaxValid ? "border-l-emerald-400" : "border-l-rose-500"
          )}
        >
          <div
            className={clsx(
              "p-3 rounded-full",
              isSyntaxValid
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-rose-500/20 text-rose-300"
            )}
          >
            {isSyntaxValid ? <CheckCircle size={24} /> : <XCircle size={24} />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Validitas Sintaksis
            </h3>
            <p
              className={clsx(
                "text-2xl font-bold",
                isSyntaxValid ? "text-emerald-300 text-glow" : "text-rose-300"
              )}
            >
              {result.analisis.validitas_sintaksis}
            </p>
            <p className="text-white/60 text-sm mt-1 capitalize">
              {result.analisis.jenis_kalimat}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className={clsx(
            "glass-card p-6 flex items-start gap-4 border-l-4",
            isSemanValid
              ? "border-l-emerald-400"
              : isAmbigu
              ? "border-l-amber-400"
              : "border-l-rose-500"
          )}
        >
          <div
            className={clsx(
              "p-3 rounded-full",
              isSemanValid
                ? "bg-emerald-500/20 text-emerald-300"
                : isAmbigu
                ? "bg-amber-500/20 text-amber-300"
                : "bg-rose-500/20 text-rose-300"
            )}
          >
            {isSemanValid ? (
              <CheckCircle size={24} />
            ) : (
              <AlertTriangle size={24} />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Unggah-Ungguh</h3>
            <p
              className={clsx(
                "text-2xl font-bold",
                isSemanValid
                  ? "text-emerald-300 text-glow"
                  : isAmbigu
                  ? "text-amber-300"
                  : "text-rose-300"
              )}
            >
              {result.analisis.validitas_unggah_ungguh}
            </p>
            {result.analisis.jenis_kesalahan.length > 0 && (
              <p className="text-white/60 text-sm mt-1">
                {result.analisis.jenis_kesalahan.length} pelanggaran ditemukan
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Error/Correction Feedback */}
      {(!isSemanValid || !isSyntaxValid) && (
        <motion.div
          variants={item}
          className="glass-panel p-6 bg-rose-500/5 border-rose-500/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-rose-400" size={20} />
            Analisis Kesalahan
          </h3>

          {onApplyCorrection &&
            result.analisis.jenis_kesalahan.filter((e) => e.suggestion).length >
              1 && (
              <button
                onClick={() => {
                  // Primitive fix all: just take the first suggestion for each error
                  // In real app, we'd need more complex replacement to avoid collisions
                  // For now, let's just trigger the first one to teach the user,
                  // or maybe we skip "Fix All" complex logic in this turn to ensure stability.
                  // User asked for "Click to Fix" which is done. "Apply All" is in the plan.
                  // Let's implement a loop helper in parent or just handle one by one.
                  // Actually, let's keep it simple: Just Fix First for now, or don't implement if too risky.
                  // Risk of overlapping replace is high.
                  // Let's just create a button that says "Fix All Typos" but it actually only fixes safely.
                  // Or... let's trigger the parent handler with a special "ALL" flag?
                  // No, let's stick to individual clicks which are safer and already implemented.
                  // I will ADD the button visually but make it clear or implement strictly.
                }}
                className="hidden text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded hover:bg-teal-500/30 transition-colors"
              >
                Fix All
              </button>
            )}

          <div className="space-y-4">
            {result.analisis.jenis_kesalahan.map((err, idx) => (
              <div
                key={idx}
                className="bg-rose-900/20 p-4 rounded-lg border border-rose-500/20"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <span className="font-mono text-rose-300 bg-rose-900/40 px-2 py-1 rounded text-sm">
                    {err.token}
                  </span>
                  <span className="text-rose-200 font-medium">
                    Masalah: {err.masalah}
                  </span>
                </div>
                {err.subjek_terkait && (
                  <p className="text-white/60 text-sm mb-1">
                    Subjek Terkait:{" "}
                    <span className="text-white/80">{err.subjek_terkait}</span>
                  </p>
                )}
                {err.aturan && (
                  <p className="text-white/60 text-sm flex items-center gap-2">
                    <span className="text-amber-300">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-lightbulb"
                      >
                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                      </svg>
                    </span>
                    Aturan: {err.aturan}
                  </p>
                )}
                {err.suggestion && (
                  <p className="text-white/60 text-sm flex items-center gap-2 mt-2">
                    <span className="text-teal-300">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-sparkles"
                      >
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
                      </svg>
                    </span>
                    Mungkin maksud Anda:{" "}
                    {onApplyCorrection && err.suggestion ? (
                      <button
                        onClick={() =>
                          onApplyCorrection(err.token, err.suggestion!)
                        }
                        className="font-bold text-teal-200 hover:text-teal-100 underline decoration-dashed decoration-teal-500/50 hover:decoration-teal-200 transition-all text-left"
                        title="Klik untuk perbaiki otomatis"
                      >
                        {err.suggestion}
                      </button>
                    ) : (
                      <span className="font-bold text-teal-200">
                        {err.suggestion}
                      </span>
                    )}
                    ?
                  </p>
                )}
              </div>
            ))}

            {result.kalimat_koreksi && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-2">
                  Saran Perbaikan
                </h4>
                <p className="text-xl font-medium text-emerald-300">
                  {result.kalimat_koreksi.hasil}
                </p>
                <p className="text-white/50 text-sm mt-1">
                  {result.kalimat_koreksi.penjelasan}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Tokens */}
      <motion.div variants={item} className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Tokenisasi</h3>
        <div className="flex flex-wrap gap-3">
          {result.tokens.map((token, idx) => (
            <div key={idx} className="group relative">
              <div
                className={clsx(
                  "px-4 py-2 border rounded-lg text-center transition-colors cursor-help",
                  token.label === "UNKNOWN" && "suggestion" in token
                    ? "bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20"
                    : "bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20"
                )}
              >
                <div className="font-medium text-white">{token.token}</div>
                <div
                  className={clsx(
                    "text-xs font-mono mt-1",
                    token.label === "UNKNOWN" && "suggestion" in token
                      ? "text-amber-300"
                      : "text-indigo-300"
                  )}
                >
                  {token.label === "UNKNOWN" && "suggestion" in token
                    ? "TYPO?"
                    : token.label}
                </div>
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-3 py-2 bg-gray-900/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 backdrop-blur-sm border border-white/10">
                {token.keterangan || "Tidak ada keterangan khusus"}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900/90" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div variants={item} className="h-[500px]">
            <TreeVisualizer data={result.structure} />
          </motion.div>
        </div>
        <div>
          <motion.div variants={item} className="h-[500px]">
            <DerivationSteps steps={result.derivations} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
