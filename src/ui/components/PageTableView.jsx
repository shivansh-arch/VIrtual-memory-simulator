import React from "react";
import { motion } from "framer-motion";

export default function PageTableView({ table }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-sky-700/40 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className="text-xl font-semibold text-sky-400 mb-4">Page Table</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-slate-300 border-collapse">
          <thead>
            <tr className="border-b border-slate-700 text-sky-300">
              <th className="p-2 text-left">VPN</th>
              <th className="p-2 text-left">Present</th>
              <th className="p-2 text-left">Frame</th>
              <th className="p-2 text-left">Dirty</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(table || {}).map((vpn) => {
              const entry = table[vpn];
              return (
                <tr
                  key={vpn}
                  className="border-b border-slate-800 hover:bg-sky-900/30 transition"
                >
                  <td className="p-2">{vpn}</td>
                  <td className="p-2">
                    {entry.present ? "✅" : "❌"}
                  </td>
                  <td className="p-2">{entry.frame ?? "-"}</td>
                  <td className="p-2">{entry.dirty ? "🟡" : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
