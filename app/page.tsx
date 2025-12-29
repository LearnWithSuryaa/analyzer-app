"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  GitBranch,
  ShieldCheck,
  Zap,
  ArrowRight,
  Globe,
  Github,
  Twitter,
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

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <HeroSection router={router} />
        <BentoGrid />
        <Footer />
      </div>
    </main>
  );
}

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-md">
          <span className="text-xl">ꦗ</span>
        </div>
        <span className="font-bold text-lg tracking-tight">Javanese AI</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
        <a href="#features" className="hover:text-white transition-colors">
          Features
        </a>
        <a href="#tech" className="hover:text-white transition-colors">
          Technology
        </a>
        <a
          href="https://github.com/LearnWithSuryaa"
          target="_blank"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}

function HeroSection({ router }: { router: any }) {
  return (
    <section className="pt-24 pb-32 flex flex-col items-center text-center space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium backdrop-blur-md"
      >
        <Sparkles size={14} className="text-indigo-400" />
        <span>Now with Advanced Fuzzy Matching</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
          Javanese AI
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed"
      >
        The most advanced Javanese Krama Syntax & Unggah-Ungguh Analyzer.
        <br className="hidden md:block" />
        Analyze sentence structure, politeness levels, and semantics instantly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 pt-4"
      >
        <button
          onClick={() => router.push("/analyze")}
          className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full text-lg hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)]"
        >
          Start Analyzing
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
        <button
          onClick={() => router.push("/analyze?q=kula%20nedha%20sekul")}
          className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium backdrop-blur-sm"
        >
          Try Sample
        </button>
      </motion.div>

      {/* Tech Stack Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="pt-20 flex justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500"
      >
        {["Next.js", "TypeScript", "Tailwind", "Framer Motion"].map((tech) => (
          <span
            key={tech}
            className="text-sm font-semibold tracking-widest uppercase"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function BentoGrid() {
  return (
    <section id="features" className="py-20 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          Comprehensive Analysis
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          Our engine breaks down Javanese language complexities into
          understandable visualizations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
        {/* Syntax Card - Large */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 glass-card p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors flex flex-col justify-between overflow-hidden relative group"
        >
          <div className="absolute top-0 right-0 p-20 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors" />

          <div className="space-y-2 z-10">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <GitBranch size={24} />
            </div>
            <h3 className="text-2xl font-bold">Visual Parse Trees</h3>
            <p className="text-white/50 max-w-md">
              Visualize sentence structure with detailed S-P-O-K classification.
              See exactly how each word functions within the clause.
            </p>
          </div>

          {/* Mock Visualization */}
          <div className="mt-8 relative h-32 md:h-48 rounded-xl border border-white/5 bg-black/20 overflow-hidden flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 opacity-50 group-hover:opacity-80 transition-opacity">
              <div className="flex gap-8">
                <div className="w-16 h-8 rounded bg-indigo-500/30"></div>
                <div className="w-16 h-8 rounded bg-purple-500/30"></div>
              </div>
              <div className="w-32 h-1 bg-white/10 rounded-full"></div>
              <div className="w-24 h-8 rounded bg-blue-500/30"></div>
            </div>
          </div>
        </motion.div>

        {/* Unggah-Ungguh Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors flex flex-col justify-between group"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                Unggah-Ungguh Validator
              </h3>
              <p className="text-white/50 text-sm">
                Detects politeness violations (e.g., using "Other" verbs for
                "Self").
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs">
            <div className="flex items-center gap-2 text-red-300 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              Correction Needed
            </div>
            <p className="text-white/70">"Kula sare" → "Kula tilem"</p>
          </div>
        </motion.div>

        {/* Fuzzy Match Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors flex flex-col justify-between group"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Search size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Smart Fuzzy Matching</h3>
              <p className="text-white/50 text-sm">
                Typos? No problem. We intelligently suggest corrections for
                misspelled words.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 opacity-60">
            <span className="line-through text-white/40">kulo</span>
            <ArrowRight size={12} className="text-white/40" />
            <span className="text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded">
              kula
            </span>
          </div>
        </motion.div>

        {/* Speed Card - Large */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 glass-card p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors flex items-center gap-8 group"
        >
          <div className="flex-1 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-bold">Real-time Analysis</h3>
            <p className="text-white/50">
              Built on a high-performance CFG parser converted to TypeScript.
              Experience instant feedback as you type or submit.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center w-1/3">
            <Cpu
              size={64}
              className="text-white/10 group-hover:text-blue-500/20 transition-colors duration-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 mt-20">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center border border-white/10 text-xs">
              ꦗ
            </div>
            <span className="font-bold">Javanese AI</span>
          </div>
          <p className="text-sm text-white/40 max-w-xs">
            Preserving Javanese language heritage through modern technology.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 text-sm">
          <div className="space-y-4">
            <h4 className="font-bold text-white">Project</h4>
            <ul className="space-y-2 text-white/40">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-white">Social</h4>
            <ul className="space-y-2 text-white/40">
              <li>
                <a
                  href="https://github.com/LearnWithSuryaa"
                  target="_blank"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pt-10 mt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
        <p>© {new Date().getFullYear()} Javanese AI. All rights reserved.</p>
        <p>Crafted by LearnWithSuryaa</p>
      </div>
    </footer>
  );
}
