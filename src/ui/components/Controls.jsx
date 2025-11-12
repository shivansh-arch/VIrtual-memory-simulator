import React, { useState } from "react";
import { Play, StepForward, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function Controls({ onStart, onStep, done, onExport, onPresetChange }) {
  const [frames, setFrames] = useState(4);
  const [algo, setAlgo] = useState("LRU");
  const [preset, setPreset] = useState("random");

  const handleStart = () => onStart(frames, algo, preset);

  return (
    <motion.div
      className="flex flex-wrap items-center gap-3 bg-white/10 backdrop-blur-md border border-slate-700 rounded-2xl px-4 py-3 shadow-lg hover:shadow-sky-700/40 transition-all"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2">
        <label className="text-slate-300 text-sm">Frames:</label>
        <input
          type="number"
          min="1"
          value={frames}
          onChange={(e) => setFrames(parseInt(e.target.value))}
          className="w-16 text-center bg-slate-900/60 border border-slate-700 rounded-md text-white p-1 text-sm focus:ring-2 focus:ring-sky-400 outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-slate-300 text-sm">Algo:</label>
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
          className="bg-slate-900/60 border border-slate-700 rounded-md text-white p-1 text-sm focus:ring-2 focus:ring-sky-400 outline-none"
        >
          <option value="LRU">LRU</option>
          <option value="Optimal">Optimal</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-slate-300 text-sm">Preset:</label>
        <select
          value={preset}
          onChange={(e) => {
            setPreset(e.target.value);
            onPresetChange(e.target.value);
          }}
          className="bg-slate-900/60 border border-slate-700 rounded-md text-white p-1 text-sm focus:ring-2 focus:ring-sky-400 outline-none"
        >
          <option value="random">Random</option>
          <option value="simpleLRU">Simple</option>
          <option value="locality">Locality</option>
        </select>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-black font-semibold px-4 py-1.5 rounded-lg shadow-md transition-all"
        >
          <Play size={16} /> Start
        </motion.button>

        <motion.button
          onClick={onStep}
          disabled={done}
          whileHover={{ scale: done ? 1 : 1.05 }}
          whileTap={{ scale: done ? 1 : 0.95 }}
          className={`flex items-center gap-2 ${
            done
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-400"
          } text-black font-semibold px-4 py-1.5 rounded-lg shadow-md transition-all`}
        >
          <StepForward size={16} /> {done ? "Done" : "Step"}
        </motion.button>

        <motion.button
          onClick={onExport}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-1.5 rounded-lg shadow-md transition-all"
        >
          <Download size={16} /> Export
        </motion.button>
      </div>
    </motion.div>
  );
}
