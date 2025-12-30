"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { id: "introduction", label: "Introduction" },
  { id: "installation", label: "Installation" },
  { id: "quick-start", label: "Quick Start" },
  { id: "syntax-analysis", label: "Syntax Analysis" },
  { id: "unggah-ungguh", label: "Unggah-Ungguh" },
  { id: "fuzzy-matching", label: "Fuzzy Matching" },
  { id: "analyze-endpoint", label: "Analyze Endpoint" },
  { id: "response-objects", label: "Response Objects" },
  { id: "error-codes", label: "Error Codes" },
];

export default function OnThisPage() {
  const [activeId, setActiveId] = useState("introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden lg:block space-y-4 sticky top-32 h-fit">
      <p className="font-bold text-sm text-white uppercase tracking-wider pl-4">
        On This Page
      </p>
      <ul className="space-y-2 border-l border-white/10 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block pl-4 transition-all duration-300 border-l-2 -ml-[2px]",
                activeId === item.id
                  ? "text-indigo-400 border-indigo-500 font-medium"
                  : "text-white/50 border-transparent hover:text-white"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                });
                setActiveId(item.id);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
