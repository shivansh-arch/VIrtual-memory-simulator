// src/scenarios/results.js
export function exportStatsCSV(stats, filename = "results.csv") {
  const csv =
    "Accesses,PageFaults,SwapsIn,SwapsOut\n" +
    `${stats.accesses},${stats.pageFaults},${stats.swapsIn},${stats.swapsOut}\n`;

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// Compare two runs (e.g., LRU vs Optimal)
export function compareStats(statsA, statsB) {
  return {
    betterAlgorithm:
      statsA.pageFaults < statsB.pageFaults ? "A" : statsA.pageFaults > statsB.pageFaults ? "B" : "Equal",
    deltaFaults: statsA.pageFaults - statsB.pageFaults,
  };
}
