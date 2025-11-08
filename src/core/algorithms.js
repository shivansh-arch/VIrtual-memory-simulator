// src/core/algorithms.js

/**
 * chooseLRU(frames)
 * frames: array of frame objects or null
 * each frame: { pid, vpn, lastAccess, dirty }
 * returns index of victim frame
 */
export function chooseLRU(frames) {
  let minAccess = Infinity;
  let victimIndex = -1;
  frames.forEach((f, i) => {
    if (!f) return; // skip free frames
    const la = f.lastAccess ?? -Infinity;
    if (la < minAccess) {
      minAccess = la;
      victimIndex = i;
    }
  });
  return victimIndex;
}

/**
 * chooseOptimal(frames, futureAccesses)
 * futureAccesses: array of future accesses as { pid, vpn } in order from next step -> end
 * For each resident page, find next index in futureAccesses. If not found -> candidate victim (never used).
 * Evict the resident page with farthest next use (or not used at all).
 */
export function chooseOptimal(frames, futureAccesses = []) {
  let victimIndex = -1;
  let farthest = -1;

  for (let i = 0; i < frames.length; i++) {
    const f = frames[i];
    if (!f) continue;
    // find next use index
    let nextIdx = -1;
    for (let j = 0; j < futureAccesses.length; j++) {
      if (futureAccesses[j].pid === f.pid && futureAccesses[j].vpn === f.vpn) {
        nextIdx = j;
        break;
      }
    }
    if (nextIdx === -1) {
      // not used in future -> best candidate
      return i;
    }
    if (nextIdx > farthest) {
      farthest = nextIdx;
      victimIndex = i;
    }
  }

  // If none found (should not happen), fallback to first occupied frame
  if (victimIndex === -1) {
    for (let i = 0; i < frames.length; i++) if (frames[i]) return i;
  }
  return victimIndex;
}
