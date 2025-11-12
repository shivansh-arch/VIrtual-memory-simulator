import React from "react";
// eslint-disable-next-line
import { motion } from "framer-motion";

export default function StatsPanel({ stats, step }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-sky-700/40 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-sky-400 mb-4">Statistics</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-slate-200 text-sm">
        <div className="bg-slate-900/70 rounded-lg p-3 text-center">
          <div className="text-slate-400">Step</div>
          <div className="text-lg font-bold text-sky-300">{step}</div>
        </div>
        <div className="bg-slate-900/70 rounded-lg p-3 text-center">
          <div className="text-slate-400">Accesses</div>
          <div className="text-lg font-bold text-sky-300">
            {stats.accesses || 0}
          </div>
        </div>
        <div className="bg-slate-900/70 rounded-lg p-3 text-center">
          <div className="text-slate-400">Page Faults</div>
          <div className="text-lg font-bold text-red-400">
            {stats.pageFaults || 0}
          </div>
        </div>
        <div className="bg-slate-900/70 rounded-lg p-3 text-center">
          <div className="text-slate-400">Swaps In</div>
          <div className="text-lg font-bold text-green-400">
            {stats.swapsIn || 0}
          </div>
        </div>
        <div className="bg-slate-900/70 rounded-lg p-3 text-center">
          <div className="text-slate-400">Swaps Out</div>
          <div className="text-lg font-bold text-yellow-400">
            {stats.swapsOut || 0}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
