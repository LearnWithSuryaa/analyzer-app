"use client";

import { ParseNode } from "@/lib/types";
import { motion } from "framer-motion";

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
  return (
    <div className="w-full h-full flex flex-col glass-card bg-slate-900/40 p-0 overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-20 flex items-center h-[4.5rem] md:h-auto min-h-[64px]">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center">
            <span className="w-2 h-6 bg-indigo-500 rounded-full inline-block"></span>
          </span>
          Parse Tree Structure
        </h3>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="tree-view min-w-max mx-auto">
          <ul>
            <TreeNode node={data} />
          </ul>
        </div>
      </div>
    </div>
  );
}
