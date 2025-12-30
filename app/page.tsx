"use client";

import { useRouter } from "next/navigation";
import { motion, Variants, useScroll, useSpring } from "framer-motion";
import {
  Sparkles,
  GitBranch,
  ShieldCheck,
  Zap,
  ArrowRight,
  Cpu,
  Search,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0f172a] relative overflow-hidden text-white selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <HeroSection router={router} />
        <BentoGrid />
      </div>
    </main>
  );
}

function HeroSection({ router }: { router: any }) {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative pt-32 pb-40 flex flex-col items-center text-center">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-[80px] mix-blend-screen"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12 relative z-10 max-w-5xl mx-auto"
      >
        <motion.div variants={textVariants} className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-sm font-medium backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Sparkles
              size={14}
              className="text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]"
            />
            <span className="tracking-wide">v2.0 Parser Available</span>
          </div>
        </motion.div>

        <motion.div variants={textVariants} className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight pb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-300 animate-gradient-x drop-shadow-[0_0_25px_rgba(99,102,241,0.4)]">
              Javanese AI
            </span>
          </h1>
          <motion.p
            variants={textVariants}
            className="text-xl md:text-2xl text-indigo-100/60 font-light max-w-2xl mx-auto leading-relaxed"
          >
            The most advanced syntax analyzer for Javanese language.
            <span className="block mt-2 text-indigo-200/40 text-lg">
              Precision Unggah-Ungguh detection & Semantic analysis.
            </span>
          </motion.p>
        </motion.div>

        <motion.div
          variants={textVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8"
        >
          <button
            onClick={() => router.push("/analyze")}
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_50px_-10px_rgba(99,102,241,0.7)] hover:shadow-[0_0_70px_-10px_rgba(99,102,241,0.9)] ring-2 ring-white/50"
          >
            Start Analyzing
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button
            onClick={() => router.push("/analyze?q=kula%20nedha%20sekul")}
            className="px-8 py-4 rounded-full bg-indigo-950/30 border border-indigo-500/30 text-indigo-200 font-medium backdrop-blur-md hover:bg-indigo-900/40 hover:border-indigo-400/50 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300"
          >
            Try a Sample
          </button>
        </motion.div>

        {/* Tech Stack Strip */}
        <motion.div
          id="technology"
          variants={textVariants}
          className="pt-24 flex justify-center items-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0 scroll-mt-32"
        >
          {["Next.js", "TypeScript", "Tailwind", "Framer Motion"].map(
            (tech) => (
              <span
                key={tech}
                className="text-sm font-bold tracking-[0.2em] uppercase text-white/80"
              >
                {tech}
              </span>
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

function BentoGrid() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <section id="features" className="py-20 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-purple-200">
          Comprehensive Analysis
        </h2>
        <p className="text-white/50 max-w-xl mx-auto text-lg">
          Our engine breaks down Javanese language complexities into
          understandable visualizations.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]"
      >
        {/* Syntax Card - Large */}
        <motion.div
          variants={item}
          className="md:col-span-2 glass-card p-10 overflow-hidden relative group"
        >
          <div className="absolute top-0 right-0 p-32 bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/30 transition-colors duration-500" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner ring-1 ring-white/10">
                  <GitBranch size={28} />
                </div>
                <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                  v2.0 Parser
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                Visual Parse Trees
              </h3>
              <p className="text-white/50 max-w-md group-hover:text-white/70 transition-colors text-lg">
                Visualize sentence structure with detailed S-P-O-K
                classification. See exactly how each word functions within the
                clause.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Subject",
                  "Predicate",
                  "Object",
                  "Description",
                  "Pelengkap",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Mock Visualization (MacBook Window Style) */}
            <div className="mt-8 relative rounded-xl border border-white/10 bg-[#1e1e1e] shadow-2xl overflow-hidden group-hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500">
              {/* Window Header */}
              <div className="h-9 bg-[#2a2a2a] border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm" />
              </div>

              {/* Window Content */}
              <div className="h-64 md:h-80 relative bg-[#0e0e0e] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:24px_24px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="tree-view scale-[0.6] md:scale-75 origin-center w-full flex justify-center pt-0">
                  <ul>
                    <li>
                      <div className="inline-block px-4 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/60 text-indigo-100 text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)] backdrop-blur-md relative z-10 min-w-[3rem]">
                        S
                      </div>
                      <ul>
                        <li>
                          <div className="inline-block px-4 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/60 text-indigo-100 text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)] backdrop-blur-md relative z-10 min-w-[3rem]">
                            CLAUSE
                          </div>
                          <ul>
                            <li>
                              <div className="inline-block px-4 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/60 text-indigo-100 text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)] backdrop-blur-md relative z-10 min-w-[3rem]">
                                NP
                              </div>
                              <ul>
                                <li>
                                  <div className="inline-block px-4 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/60 text-indigo-100 text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)] backdrop-blur-md relative z-10 min-w-[3rem]">
                                    SUBJEK
                                  </div>
                                  <ul>
                                    <li>
                                      <div className="inline-block px-3 py-1 rounded-full bg-black/40 border border-indigo-500/30 text-indigo-300 font-mono text-[11px] shadow-inner mt-2">
                                        kula
                                      </div>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <div className="inline-block px-4 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/60 text-indigo-100 text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)] backdrop-blur-md relative z-10 min-w-[3rem]">
                                VP
                              </div>
                              <ul>
                                <li>
                                  <div className="inline-block px-4 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/60 text-indigo-100 text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)] backdrop-blur-md relative z-10 min-w-[3rem]">
                                    V
                                  </div>
                                  <ul>
                                    <li>
                                      <div className="inline-block px-3 py-1 rounded-full bg-black/40 border border-indigo-500/30 text-indigo-300 font-mono text-[11px] shadow-inner mt-2">
                                        nedha
                                      </div>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <div className="inline-block px-4 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/60 text-indigo-100 text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)] backdrop-blur-md relative z-10 min-w-[3rem]">
                                    NP
                                  </div>
                                  <ul>
                                    <li>
                                      <div className="inline-block px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-[10px] font-bold shadow-[0_0_10px_rgba(99,102,241,0.2)] backdrop-blur-md relative z-10 min-w-[3rem]">
                                        OBJEK
                                      </div>
                                      <ul>
                                        <li>
                                          <div className="inline-block px-3 py-1 rounded-full bg-black/40 border border-indigo-500/30 text-indigo-300 font-mono text-[11px] shadow-inner mt-2">
                                            sekul
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <div className="inline-block px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-[10px] font-bold shadow-[0_0_10px_rgba(99,102,241,0.2)] backdrop-blur-md relative z-10 min-w-[3rem]">
                                        ADJ
                                      </div>
                                      <ul>
                                        <li>
                                          <div className="inline-block px-3 py-1 rounded-full bg-black/40 border border-indigo-500/30 text-indigo-300 font-mono text-[11px] shadow-inner mt-2">
                                            panas
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Unggah-Ungguh Card */}
        {/* Unggah-Ungguh Card */}
        <motion.div
          variants={item}
          className="glass-card p-8 flex flex-col justify-between group relative overflow-hidden"
        >
          {/* Watermark */}
          <div className="absolute -right-4 -top-4 text-9xl font-serif text-white/[0.03] rotate-12 select-none pointer-events-none">
            ꦏ
          </div>

          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner ring-1 ring-white/10">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-emerald-200 transition-colors">
                Unggah-Ungguh Validator
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-[90%]">
                Ensure cultural respect. Our engine detects subtle politeness
                violations in real-time.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/60">
                Ngoko
              </div>
              <div className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/60">
                Krama Lugu
              </div>
              <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
                Krama Alus
              </div>
            </div>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-black/20 border border-white/5 relative group-hover:border-emerald-500/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-red-400">
                  Violation Detected
                </span>
              </div>
              <span className="text-[10px] text-white/30 font-mono">
                CODE: E-201
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between group/item">
                <span className="text-lg font-medium text-white/50 line-through decoration-red-500/50 decoration-2">
                  Kula sare
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                  Self-Honorific
                </span>
              </div>

              <div className="text-xs text-white/40 italic pl-2 border-l-2 border-white/10">
                "One cannot use 'sare' (sleep) for oneself; it is reserved for
                elders."
              </div>

              <div className="flex items-center gap-3 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 shadow-sm">
                <span className="bg-emerald-500 text-black text-[10px] font-bold px-1.5 rounded-sm">
                  FIX
                </span>
                <span className="text-emerald-300 font-semibold tracking-wide">
                  Kula tilem
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fuzzy Match Card */}
        <motion.div
          variants={item}
          className="glass-card p-8 flex flex-col justify-between group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner ring-1 ring-white/10">
              <Search size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-amber-200 transition-colors">
                Smart Fuzzy Match
              </h3>
              <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors leading-relaxed">
                Advanced typo tolerance using Levenshtein distance to understand
                what you meant.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Typo Safe
              </span>
              <span className="text-[10px] text-white/30">Max Distance: 2</span>
            </div>
          </div>

          <div className="mt-8 space-y-3 relative z-10">
            <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-widest font-bold">
              <span>Input</span>
              <span>Suggestion</span>
            </div>

            <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity bg-black/20 p-3 rounded-lg border border-white/5">
              <span className="text-white/40 line-through decoration-amber-500/50">
                kulo
              </span>
              <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/50 w-full -translate-x-full group-hover:translate-x-0 transition-transform duration-700 delay-100" />
              </div>
              <ArrowRight size={14} className="text-white/40" />
              <span className="text-amber-300 font-bold font-mono bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 shadow-[0_0_15px_-5px_orange] flex items-center gap-2">
                kula
                <span className="text-[9px] bg-amber-500 text-black px-1 rounded-sm font-sans">
                  98%
                </span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Speed Card - Large */}
        <motion.div
          variants={item}
          className="md:col-span-2 glass-card p-10 flex flex-col md:flex-row items-center gap-10 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex-1 space-y-6 relative z-10">
            <div className="nav-blur p-4 rounded-2xl inline-block bg-blue-500/10 border border-blue-500/20">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner">
                <Zap size={24} />
              </div>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold group-hover:text-blue-200 transition-colors mb-2">
                Real-time Analysis Engine
              </h3>
              <p className="text-white/50 text-base md:text-lg max-w-2xl group-hover:text-white/80 transition-colors leading-relaxed">
                Built on a high-performance CFG parser converted to TypeScript.
                Experience instant feedback as you type or submit. No server
                round-trips for basic validation.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg">
              <div className="bg-white/5 p-3 rounded-lg border border-white/5 group-hover:border-blue-500/20 transition-colors">
                <div className="text-xs text-white/40 mb-1">Parse Time</div>
                <div className="text-xl font-bold text-blue-300 flex items-baseline gap-1">
                  {"<"}5<span className="text-xs text-blue-400/70">ms</span>
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/5 group-hover:border-blue-500/20 transition-colors">
                <div className="text-xs text-white/40 mb-1">Bundle Size</div>
                <div className="text-xl font-bold text-blue-300 flex items-baseline gap-1">
                  45<span className="text-xs text-blue-400/70">kb</span>
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/5 group-hover:border-blue-500/20 transition-colors">
                <div className="text-xs text-white/40 mb-1">Accuracy</div>
                <div className="text-xl font-bold text-blue-300 flex items-baseline gap-1">
                  99.9<span className="text-xs text-blue-400/70">%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full md:w-auto relative p-10">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Cpu
              size={120}
              strokeWidth={1}
              className="text-white/5 group-hover:text-blue-400 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12 relative z-10"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
