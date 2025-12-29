"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Github } from "lucide-react";

import { usePathname } from "next/navigation";
import { Plus, Settings, History } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isAnalyzePage = pathname === "/analyze";
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (isAnalyzePage) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-xl transition-all duration-300">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-xs">
                ꦗ
              </div>
            </a>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-none">
                Javanese AI
              </span>
              <span className="text-[10px] text-white/40 font-medium tracking-wide uppercase mt-1">
                Analyzer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-xs text-white/70 transition-all">
              <History size={14} />
              <span>History</span>
            </button>
            <button
              className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors border border-indigo-500/20"
              title="New Analysis"
              onClick={() => window.location.reload()}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/20 text-indigo-300 backdrop-blur-md shadow-lg shadow-indigo-500/10">
              <span className="text-xl font-bold">ꦗ</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Javanese AI
            </span>
          </a>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          {["Features", "Technology"].map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 transition-all group-hover:w-full" />
            </a>
          ))}
          <a
            href="https://github.com/LearnWithSuryaa"
            target="_blank"
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-indigo-500 origin-left"
        style={{ scaleX }}
      />
    </nav>
  );
}
