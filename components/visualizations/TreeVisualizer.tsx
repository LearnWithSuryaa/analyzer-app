"use client";

import { ParseNode } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

interface TreeVisualizerProps {
  data: ParseNode;
}

const TreeNode = ({ node }: { node: ParseNode }) => {
  return (
    <li>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="inline-block px-4 py-2 rounded-lg bg-indigo-900/60 border border-indigo-400/50 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)] backdrop-blur-md min-w-[4rem] text-center relative z-10 hover:bg-indigo-800/80 transition-colors"
      >
        <div className="font-bold text-sm text-indigo-200">{node.type}</div>
        {node.value && (
          <div className="text-white font-medium mt-1 text-xs border-t border-white/10 pt-1">
            {node.value}
          </div>
        )}
      </motion.div>

      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child, index) => (
            <TreeNode key={`${child.type}-${index}`} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default function TreeVisualizer({ data }: TreeVisualizerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Common content for both normal and fullscreen views
  const TreeContent = () => (
    <div className="flex-1 overflow-auto p-4 md:p-8 w-full h-full custom-scrollbar">
      <div className="tree-view min-w-max mx-auto">
        <ul>
          <TreeNode node={data} />
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Normal Card View */}
      {/* Normal Card View */}
      <div className="w-full h-full flex flex-col glass-card bg-slate-900/40 p-0 overflow-hidden relative group transition-all duration-300 hover:bg-slate-900/50">
        <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-20 flex justify-between items-center min-h-[64px]">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-6 h-6 flex items-center justify-center">
              <span className="w-2 h-6 bg-indigo-500 rounded-full inline-block"></span>
            </span>
            Parse Tree Structure
          </h3>
          <button
            onClick={() => setIsFullscreen(true)}
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            title="View Fullscreen"
          >
            <Maximize2 size={20} />
          </button>
        </div>

        <TreeContent />
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full h-full flex flex-col glass-card bg-[#0f172a] border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="p-4 md:p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-indigo-500/20 rounded-lg">
                    <span className="lucide lucide-git-branch w-5 h-5 text-indigo-400"></span>
                  </span>
                  Parse Tree Structure (Fullscreen)
                </h3>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Close Fullscreen"
                >
                  <Minimize2 size={24} />
                </button>
              </div>

              <TreeContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
