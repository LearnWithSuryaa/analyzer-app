"use client";

import { motion } from "framer-motion";
import { Book, Code, Shield, Zap, Layout, Terminal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    title: "Getting Started",
    icon: <Book size={18} />,
    items: [
      { label: "Introduction", href: "#introduction" },
      { label: "Installation", href: "#installation" },
      { label: "Quick Start", href: "#quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    icon: <Zap size={18} />,
    items: [
      { label: "Syntax Analysis", href: "#syntax-analysis" },
      { label: "Unggah-Ungguh", href: "#unggah-ungguh" },
      { label: "Fuzzy Matching", href: "#fuzzy-matching" },
    ],
  },
  {
    title: "API Reference",
    icon: <Terminal size={18} />,
    items: [
      { label: "Analyze Endpoint", href: "#analyze-endpoint" },
      { label: "Response Objects", href: "#response-objects" },
      { label: "Error Codes", href: "#error-codes" },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-6 space-y-8 hidden md:block">
      {sidebarItems.map((section, idx) => (
        <div key={idx} className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold tracking-wide text-sm uppercase">
            {section.icon}
            {section.title}
          </div>
          <ul className="space-y-1.5 border-l border-white/10 ml-2">
            {section.items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <Link
                  href={item.href}
                  className="block pl-4 py-1.5 text-sm text-white/60 hover:text-white hover:border-l border-l border-transparent hover:border-indigo-400 -ml-px transition-all"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
