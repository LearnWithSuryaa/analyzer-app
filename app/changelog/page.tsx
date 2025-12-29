"use client";

import { motion } from "framer-motion";
import { Star, Zap, Bug, Hammer, Calendar, Clock, Rocket } from "lucide-react";

type ChangeType = "new" | "improved" | "fixed" | "deprecated";

interface ChangeItem {
  type: ChangeType;
  content: string;
}

interface Release {
  version: string;
  date: string;
  description: string;
  changes: ChangeItem[];
}

const releases: Release[] = [
  {
    version: "v2.0.0",
    date: "December 29, 2025",
    description:
      "A complete overhaul of the UI/UX and parsing engine reliability.",
    changes: [
      {
        type: "new",
        content: "Premium Glassmorphism UI using Tailwind CSS & Framer Motion.",
      },
      {
        type: "new",
        content:
          "Visual Parse Tree: Interactive MacBook-style window for syntax visualization.",
      },
      {
        type: "new",
        content:
          "Docs Portal: Comprehensive documentation with sticky navigation.",
      },
      {
        type: "improved",
        content:
          "Parsing Engine: Enhanced CFG algorithm for complex sentence structures.",
      },
      {
        type: "improved",
        content:
          "Performance: Reduced client-side main thread blocking by 40%.",
      },
      {
        type: "fixed",
        content: "Fixed mobile responsiveness issues on the Hero section.",
      },
    ],
  },
  {
    version: "v1.5.0",
    date: "November 15, 2025",
    description:
      "Introducing Unggah-Ungguh validation and better error messages.",
    changes: [
      {
        type: "new",
        content:
          "Unggah-Ungguh Validator: Real-time checks for politeness level violations.",
      },
      {
        type: "improved",
        content:
          "Error Messages: More descriptive hints when syntax analysis fails.",
      },
      {
        type: "fixed",
        content: "Corrected dictionary definitions for 'dhateng' and 'saking'.",
      },
    ],
  },
  {
    version: "v1.0.0",
    date: "October 1, 2025",
    description: "The initial release of Javanese AI.",
    changes: [
      { type: "new", content: "Basic S-P-O-K syntax analysis." },
      { type: "new", content: "Simple dictionary lookup." },
    ],
  },
];

const roadmap = [
  { title: "Voice Input", status: "In Progress", date: "Q1 2025" },
  { title: "Ancient Script (Aksara) OCR", status: "Planned", date: "Q2 2025" },
];

const Badge = ({ type }: { type: ChangeType }) => {
  const styles = {
    new: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    improved: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    fixed: "bg-red-500/10 text-red-400 border-red-500/20",
    deprecated: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  const icons = {
    new: <Star size={12} className="fill-current" />,
    improved: <Zap size={12} className="fill-current" />,
    fixed: <Bug size={12} className="fill-current" />,
    deprecated: <Hammer size={12} className="fill-current" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${styles[type]}`}
    >
      {icons[type]}
      {type}
    </span>
  );
};

export default function ChangelogPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto text-white">
      {/* Header */}
      <div className="text-center mb-24 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-cyan-300"
        >
          Product Updates
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-lg max-w-2xl mx-auto"
        >
          Follow our journey as we refine the future of Javanese linguistic
          technology.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-16 relative">
        {/* Timeline Feed */}
        <div className="space-y-16 relative">
          <div className="absolute top-0 bottom-0 left-[21px] w-px bg-white/10 md:hidden" />{" "}
          {/* Mobile guideline */}
          {releases.map((release, idx) => (
            <motion.div
              key={release.version}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-12 md:pl-0 group"
            >
              {/* Mobile Dot */}
              <div className="absolute left-[16px] top-2 w-3 h-3 rounded-full bg-indigo-500 border-4 border-[#0f172a] md:hidden z-10" />

              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                {/* Sticky Date (Desktop) */}
                <div className="hidden md:block w-32 shrink-0 text-right pt-2 sticky top-32 self-start opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="font-mono text-sm text-indigo-300 mb-1">
                    {release.version}
                  </div>
                  <div className="text-sm">{release.date}</div>
                </div>

                {/* Content Card */}
                <div className="flex-1 relative">
                  {/* Desktop Dot */}
                  <div className="hidden md:block absolute -left-[45px] top-3 w-3 h-3 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(99,102,241,0.5)] z-10" />
                  <div className="hidden md:block absolute -left-[40px] top-0 bottom-0 w-px bg-white/5 group-hover:bg-white/10 transition-colors" />

                  <div className="space-y-6 pb-12 border-b border-white/5 last:border-0">
                    <div className="md:hidden space-y-1 mb-4">
                      <span className="font-mono text-indigo-300 text-sm">
                        {release.version}
                      </span>
                      <div className="text-sm text-white/50">
                        {release.date}
                      </div>
                    </div>

                    <p className="text-xl text-white font-light leading-relaxed">
                      {release.description}
                    </p>

                    <ul className="space-y-4">
                      {release.changes.map((change, cIdx) => (
                        <li
                          key={cIdx}
                          className="flex items-start gap-4 text-sm text-white/70"
                        >
                          <Badge type={change.type} />
                          <span className="pt-0.5">{change.content}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar: Roadmap */}
        <div className="hidden md:block h-fit sticky top-32 space-y-8">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <Rocket size={18} className="text-indigo-400" />
              <h3 className="font-bold text-white uppercase tracking-wider text-sm">
                Roadmap
              </h3>
            </div>
            <div className="space-y-6">
              {roadmap.map((item, idx) => (
                <div
                  key={idx}
                  className="relative pl-4 border-l border-white/10"
                >
                  <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-white/20" />
                  <h4 className="font-medium text-white text-sm">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-white/40">
                    <Clock size={10} />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span
                      className={
                        item.status === "In Progress"
                          ? "text-indigo-400"
                          : "text-white/30"
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 text-center space-y-4">
            <h3 className="text-indigo-300 font-bold">Have a suggestion?</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              We build based on community feedback. Join our Discord to shape
              the next release.
            </p>
            <button className="w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold transition-colors">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
