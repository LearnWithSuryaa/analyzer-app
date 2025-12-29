"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Github } from "lucide-react";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
