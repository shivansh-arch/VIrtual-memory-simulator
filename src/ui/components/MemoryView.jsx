import React from "react";
import { motion } from "framer-motion";

export default function MemoryView({ frames }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-sky-700/40 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-sky-400 mb-4">
        Physical Memory
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {frames.length === 0 ? (
          <p className="text-slate-400">No frames yet</p>
        ) : (
          frames.map((f, i) => (
            <div
              key={i}
              className="bg-slate-900/70 border border-slate-700 rounded-lg text-center p-3 text-sm text-white hover:bg-sky-900/40 hover:border-sky-600 transition"
            >
              {f ? (
                <>
                  <div className="text-sky-300 font-semibold">
                    PID {f.pid}
                  </div>
                  <div className="text-slate-300">Page {f.vpn}</div>
                </>
              ) : (
                <div className="text-slate-500">Free</div>
              )}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
