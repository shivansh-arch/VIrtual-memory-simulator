import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { motion } from "framer-motion";

export default function ChartView({ history }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();
    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: history.map((_, i) => i + 1),
        datasets: [
          {
            label: "Cumulative Page Faults",
            data: history,
            borderColor: "#38bdf8",
            borderWidth: 2,
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        scales: {
          x: { ticks: { color: "#cbd5e1" } },
          y: { ticks: { color: "#cbd5e1" } },
        },
        plugins: {
          legend: { labels: { color: "#cbd5e1" } },
        },
      },
    });
  }, [history]);

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-sky-700/40 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-sky-400 mb-4">
        Page Fault Chart
      </h2>
      <canvas ref={chartRef} height="120"></canvas>
    </motion.div>
  );
}
