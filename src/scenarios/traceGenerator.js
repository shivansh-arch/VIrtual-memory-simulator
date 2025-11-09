// src/scenarios/traceGenerator.js
// Utility functions for building test traces (reference strings)

export function generateRandomTrace(length = 20, maxPage = 10, pid = 1) {
  const trace = [];
  for (let i = 0; i < length; i++) {
    const address = Math.floor(Math.random() * maxPage * 4);
    trace.push({ pid, address });
  }
  return trace;
}

// Example: locality-based pattern (more realistic)
export function generateLocalityTrace(length = 30, localityWindow = 3, pid = 1) {
  const trace = [];
  let currentPage = Math.floor(Math.random() * 10);
  for (let i = 0; i < length; i++) {
    // bias toward recently used pages
    if (Math.random() < 0.7) {
      const offset = Math.floor(Math.random() * localityWindow) - Math.floor(localityWindow / 2);
      currentPage = Math.max(0, currentPage + offset);
    } else {
      currentPage = Math.floor(Math.random() * 10);
    }
    trace.push({ pid, address: currentPage * 4 });
  }
  return trace;
}

// Manual helper: convert simple page sequence [0,1,2,0,3,...] to addresses
export function pagesToTrace(pages, pid = 1, pageSize = 4) {
  return pages.map(p => ({ pid, address: p * pageSize }));
}
