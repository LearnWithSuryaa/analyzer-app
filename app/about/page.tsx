"use client";

import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Zap,
  Globe,
  Code,
  Heart,
  Cpu,
  Instagram,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Parsing Speed", value: "< 15ms", icon: <Zap size={16} /> },
  { label: "Accuracy", value: "99.8%", icon: <Code size={16} /> },
  { label: "Processing", value: "Local", icon: <Cpu size={16} /> },
  { label: "Open Source", value: "100%", icon: <Github size={16} /> },
];

const techStack = [
  {
    name: "Next.js",
    icon: "/NextJs.svg",
  },
  {
    name: "TypeScript",
    icon: "/TypeScript.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "/Tailwind CSS.svg",
  },
];

// ... rest of imports ...

// ... inside the component ...

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto text-white">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-8 mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Preserving Heritage via AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-1 text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40"
        >
          Bridging Tradition & <br /> Digital Innovation.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto"
        >
          We build advanced linguistic engines to ensure the Javanese language
          thrives in the digital age, making complex grammatical structures
          accessible to everyone.
        </motion.p>
      </section>

      {/* Stats Grid */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32"
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors group"
          >
            <div className="flex items-center gap-3 text-white/40 mb-2 group-hover:text-indigo-400 transition-colors">
              {stat.icon}
              <span className="text-xs font-bold uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white group-hover:scale-105 transition-transform origin-left">
              {stat.value}
            </div>
          </div>
        ))}
      </motion.section>

      {/* The Story & Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-32 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-cyan-300">
            Why We Built This
          </h2>
          <div className="space-y-6 text-lg text-white/70 leading-relaxed">
            <p>
              The Javanese language is known for its intricate "Unggah-Ungguh" —
              a multilayered system of politeness that changes based on who you
              are speaking to. In a rapidly globalizing world, these nuances are
              fading.
            </p>
            <p>
              Traditional translation tools often miss context. A sentence
              correct in Ngoko (informal) can be thoroughly disrespectful when
              speaking to an elder. We saw a need for a tool that understands
              not just the
              <em> words</em>, but the <em>social context</em> behind them.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                  <span className="text-xs font-bold uppercase">Before</span>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-red-200">Kula sare</p>
                  <p className="text-sm text-white/40">
                    "I sleep" (Incorrect: uses Honorific for self)
                  </p>
                </div>
              </div>

              <div className="w-px h-8 bg-white/10 mx-6" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="text-xs font-bold uppercase">After</span>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-emerald-200">Kula tilem</p>
                  <p className="text-sm text-white/40">
                    Correct Humble Krama form
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Creator */}
      <section className="max-w-3xl mx-auto text-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold">Meet the Creator</h2>

        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-md relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
              <img
                src="/avatar.jpeg"
                alt="Surya"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Surya</h3>
                <p className="text-indigo-300">@LearnWithSuryaa</p>
              </div>
              <p className="text-white/60 leading-relaxed">
                Full-stack developer passionate about linguistic anthropology
                and AI. Building tools to help heritage languages survive the
                internet age.
              </p>

              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                <Link
                  href="https://github.com/LearnWithSuryaa"
                  target="_blank"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors text-white/60"
                >
                  <Github size={20} />
                </Link>
                <Link
                  href="https://www.instagram.com/suryahipersomniaa"
                  target="_blank"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors text-white/60"
                >
                  <Instagram size={20} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer Quote */}
      <div className="mt-32 text-center">
        <p className="text-sm text-white/30 uppercase tracking-widest mb-8">
          Powered By
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center gap-3 group cursor-default"
            >
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all text-white/80 group-hover:text-white shadow-lg">
                <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold text-white/40 group-hover:text-white/80 transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
