// src/scenarios/presets.js

export const presets = {
  simpleLRU: {
    description: "Sequential access with occasional repeats",
    trace: [0, 1, 2, 3, 0, 1, 4, 0, 1, 2, 3, 4].map(p => ({ pid: 1, address: p * 4 })),
  },
  locality: {
    description: "Strong locality of reference",
    trace: [1, 2, 3, 2, 1, 4, 5, 4, 1, 2, 1, 3].map(p => ({ pid: 1, address: p * 4 })),
  },
  random: {
    description: "Completely random access pattern",
    trace: Array.from({ length: 20 }, () => ({
      pid: 1,
      address: Math.floor(Math.random() * 10) * 4,
    })),
  },
};
