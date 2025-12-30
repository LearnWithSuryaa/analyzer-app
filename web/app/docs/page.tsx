"use client";

import { motion } from "framer-motion";
import DocsSidebar from "../components/DocsSidebar";
import OnThisPage from "../components/OnThisPage";
import { Copy, Check, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function DocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto text-white">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_200px] gap-12">
        {/* Left Sidebar */}
        <DocsSidebar />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16 max-w-3xl"
        >
          {/* Introduction */}
          <section id="introduction" className="space-y-6 scroll-mt-32">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-cyan-300">
              Introduction
            </h1>
            <p className="text-xl text-white/70 leading-relaxed font-light">
              Welcome to the <strong className="text-white">Javanese AI</strong>{" "}
              documentation. Our engine provides advanced syntax analysis
              (S-P-O-K) and Unggah-Ungguh (politeness) validation for the
              Javanese language, serving as a bridge between traditional
              linguistics and modern NLP.
            </p>

            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex gap-4 items-start">
              <span className="text-xl">💡</span>
              <div className="space-y-1">
                <p className="font-bold text-indigo-300 text-sm uppercase tracking-wide">
                  Pro Tip
                </p>
                <p className="text-sm text-white/80">
                  This analyzer is optimized for{" "}
                  <span className="font-mono text-indigo-200">
                    Krama Inggil
                  </span>{" "}
                  formal scripts but handles Ngoko with basic validation.
                </p>
              </div>
            </div>
          </section>

          {/* Installation */}
          <section
            id="installation"
            className="space-y-6 pt-10 border-t border-white/5 scroll-mt-32"
          >
            <h2 className="text-3xl font-semibold text-white">Installation</h2>
            <p className="text-white/60 leading-relaxed">
              Choose the installation method that best fits your needs. You can
              install the core library, scaffold a complete application, or
              clone the full repository.
            </p>

            {/* Option 1: NPM Package */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-indigo-300">
                Option 1: Install Package (Library Usage)
              </h3>
              <p className="text-sm text-white/50">
                Install the core analyzer as a dependency in your project.
              </p>
              <div className="bg-[#1e1e1e] border border-white/10 rounded-xl p-4 group relative">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={() =>
                      copyCode(
                        "npm install javanese-analyzer-core",
                        "install-npm"
                      )
                    }
                    className="p-2 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                  >
                    {copiedId === "install-npm" ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">npm</span>
                    <span className="text-yellow-300">install</span>
                    <span className="text-white/80">
                      javanese-analyzer-core
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Option 2: CLI Tool */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-purple-300">
                Option 2: CLI Tool (Recommended - Full App)
              </h3>
              <p className="text-sm text-white/50">
                Scaffold a complete Next.js application with the analyzer
                pre-configured.
              </p>
              <div className="bg-[#1e1e1e] border border-white/10 rounded-xl p-4 group relative">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={() =>
                      copyCode(
                        "npx create-javanese-analyzer my-app\ncd my-app\nnpm run dev",
                        "install-cli"
                      )
                    }
                    className="p-2 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                  >
                    {copiedId === "install-cli" ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">npx</span>
                    <span className="text-purple-300">
                      create-javanese-analyzer
                    </span>
                    <span className="text-white/80">my-app</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">cd</span>
                    <span className="text-white/80">my-app</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">npm</span>
                    <span className="text-emerald-300">run dev</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Option 3: Template */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-cyan-300">
                Option 3: Template Repository
              </h3>
              <p className="text-sm text-white/50">
                Use the template without git history.
              </p>
              <div className="bg-[#1e1e1e] border border-white/10 rounded-xl p-4 group relative">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={() =>
                      copyCode(
                        "npx degit LearnWithSuryaa/analyzer-app my-app\ncd my-app\nnpm install\nnpm run dev",
                        "install-template"
                      )
                    }
                    className="p-2 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                  >
                    {copiedId === "install-template" ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">npx</span>
                    <span className="text-cyan-300">degit</span>
                    <span className="text-white/80">
                      LearnWithSuryaa/analyzer-app my-app
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">cd</span>
                    <span className="text-white/80">my-app</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">npm</span>
                    <span className="text-yellow-300">install</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">npm</span>
                    <span className="text-emerald-300">run dev</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Option 4: Clone */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-emerald-300">
                Option 4: Clone Repository (Development)
              </h3>
              <p className="text-sm text-white/50">
                Clone with full git history for development and contributions.
              </p>
              <div className="bg-[#1e1e1e] border border-white/10 rounded-xl p-4 group relative">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={() =>
                      copyCode(
                        "git clone https://github.com/LearnWithSuryaa/analyzer-app.git\ncd analyzer-app\nnpm install\nnpm run dev",
                        "install-clone"
                      )
                    }
                    className="p-2 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                  >
                    {copiedId === "install-clone" ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">git clone</span>
                    <span className="text-white/80">
                      https://github.com/LearnWithSuryaa/analyzer-app.git
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">cd</span>
                    <span className="text-white/80">analyzer-app</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">npm</span>
                    <span className="text-yellow-300">install</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/30">$</span>
                    <span className="text-blue-300">npm</span>
                    <span className="text-emerald-300">run dev</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section
            id="quick-start"
            className="space-y-6 pt-10 border-t border-white/5 scroll-mt-32"
          >
            <h2 className="text-3xl font-semibold text-white">Quick Start</h2>
            <p className="text-white/60 leading-relaxed">
              To analyze your first sentence, you can use our CLI tool or the
              web interface. Here is how to analyze a simple sentence structure.
            </p>

            <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <button
                  onClick={() =>
                    copyCode(
                      "import { analyze } from 'javanese-analyzer-core';\n\nconst result = analyze('Kula nedha sekul');\nconsole.log(result);",
                      "quickstart"
                    )
                  }
                  className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                >
                  {copiedId === "quickstart" ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-blue-100 bg-black/50">
                <code>
                  <span className="text-purple-400">import</span> {"{"} analyze{" "}
                  {"}"} <span className="text-purple-400">from</span>{" "}
                  <span className="text-emerald-300">
                    'javanese-analyzer-core'
                  </span>
                  ;{"\n\n"}
                  <span className="text-purple-400">const</span> result =
                  analyze(
                  <span className="text-emerald-300">'Kula nedha sekul'</span>);
                  {"\n"}
                  <span className="text-blue-300">console</span>.log(result);
                </code>
              </pre>
            </div>
          </section>

          {/* Syntax Analysis */}
          <section
            id="syntax-analysis"
            className="space-y-6 pt-10 border-t border-white/5 scroll-mt-32"
          >
            <h2 className="text-3xl font-semibold text-white">
              Syntax Analysis
            </h2>
            <p className="text-white/60 leading-relaxed">
              Our engine uses a bespoke Context-Free Grammar (CFG) to parse
              sentences into their constituent parts. The analysis returns a
              hierarchical tree structure identifying the function of each word.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-colors">
                <div className="text-indigo-400 font-bold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>{" "}
                  Subject (Jejer)
                </div>
                <p className="text-sm text-white/60">
                  The actor or topic performing the action in the clause.
                </p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                <div className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>{" "}
                  Predicate (Wasesa)
                </div>
                <p className="text-sm text-white/60">
                  The core action or state being performed by the subject.
                </p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>{" "}
                  Object (Lesan)
                </div>
                <p className="text-sm text-white/60">
                  The entity acted upon by the verb.
                </p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                <div className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                  Description (Katrangan)
                </div>
                <p className="text-sm text-white/60">
                  Additional context like time, place, or manner.
                </p>
              </div>
            </div>
          </section>

          {/* Unggah-Ungguh */}
          <section
            id="unggah-ungguh"
            className="space-y-6 pt-10 border-t border-white/5 scroll-mt-32"
          >
            <h2 className="text-3xl font-semibold text-white">Unggah-Ungguh</h2>
            <p className="text-white/60 leading-relaxed">
              Politeness is paramount in Javanese. The engine checks for
              subject-verb agreement not just in number, but in social status.
            </p>
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-4 items-start">
              <AlertCircle className="text-red-400 shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="font-bold text-red-300 text-sm uppercase tracking-wide">
                  Common Violation Example
                </p>
                <p className="text-sm text-white/80">
                  Using Krama Inggil verbs for oneself.
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs mt-2">
                  <div className="bg-red-500/20 p-2 rounded text-red-200 border border-red-500/20">
                    ❌{" "}
                    <span className="line-through opacity-70">Kula sare</span>{" "}
                    (I sleep)
                  </div>
                  <div className="bg-emerald-500/20 p-2 rounded text-emerald-200 border border-emerald-500/20">
                    ✅ Kula tilem (I sleep)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fuzzy Matching */}
          <section
            id="fuzzy-matching"
            className="space-y-6 pt-10 border-t border-white/5 scroll-mt-32"
          >
            <h2 className="text-3xl font-semibold text-white">
              Fuzzy Matching
            </h2>
            <p className="text-white/60 leading-relaxed">
              The engine employs a Levenshtein distance algorithm to correct
              typos up to a specific threshold, ensuring robust analysis even
              with imperfect input.
            </p>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-white/40 font-medium">
                  <tr>
                    <th className="px-4 py-3">Input</th>
                    <th className="px-4 py-3">Detected</th>
                    <th className="px-4 py-3">Distance</th>
                    <th className="px-4 py-3">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-red-300">kulo</td>
                    <td className="px-4 py-3 font-mono text-emerald-300">
                      kula
                    </td>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">High</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-red-300">mngan</td>
                    <td className="px-4 py-3 font-mono text-emerald-300">
                      mangan
                    </td>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* API Reference */}
          <section
            id="analyze-endpoint"
            className="space-y-6 pt-10 border-t border-white/5 scroll-mt-32"
          >
            <h2 className="text-3xl font-semibold text-white">
              Analyze Endpoint
            </h2>
            <p className="text-white/60 leading-relaxed">
              The primary endpoint for analyzing text.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold border border-emerald-500/20">
                  POST
                </span>
                <code className="text-white font-mono">/v1/analyze</code>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest">
                  Parameters
                </h4>
                <div className="grid grid-cols-[150px_1fr] gap-4 text-sm border-b border-white/5 pb-4">
                  <div className="font-mono text-indigo-300">text</div>
                  <div className="text-white/60">
                    string. The Javanese sentence to analyze.
                  </div>
                </div>
                <div className="grid grid-cols-[150px_1fr] gap-4 text-sm border-b border-white/5 pb-4">
                  <div className="font-mono text-indigo-300">mode</div>
                  <div className="text-white/60">
                    enum('fast', 'detailed'). extraction level.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Response Objects */}
          <section
            id="response-objects"
            className="space-y-6 pt-10 border-t border-white/5 scroll-mt-32"
          >
            <h2 className="text-3xl font-semibold text-white">
              Response Objects
            </h2>
            <p className="text-white/60">Success response structure.</p>
            <div className="bg-[#1e1e1e] border border-white/10 rounded-xl p-4">
              <pre className="text-xs text-white/70 font-mono overflow-x-auto">
                {`{
  "status": "success",
  "data": {
    "sentence": "Kula nedha sekul",
    "structure": {
      "S": "Kula",
      "P": "nedha",
      "O": "sekul"
    },
    "valid": true,
    "confidence": 0.98
  }
}`}
              </pre>
            </div>
          </section>

          {/* Error Codes */}
          <section
            id="error-codes"
            className="space-y-6 pt-10 border-t border-white/5 scroll-mt-32"
          >
            <h2 className="text-3xl font-semibold text-white">Error Codes</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-white/40 font-medium">
                  <tr>
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-indigo-300">400</td>
                    <td className="px-4 py-3">Bad Request (Invalid Input)</td>
                    <td className="px-4 py-3 text-yellow-400">User Error</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-indigo-300">422</td>
                    <td className="px-4 py-3">
                      Validation Error (Unggah-Ungguh)
                    </td>
                    <td className="px-4 py-3 text-yellow-400">Logic Error</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-indigo-300">500</td>
                    <td className="px-4 py-3">Internal Server Error</td>
                    <td className="px-4 py-3 text-red-400">Server Error</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </motion.div>

        {/* Right Table of Contents (Sticky) */}
        <OnThisPage />
      </div>
    </main>
  );
}
