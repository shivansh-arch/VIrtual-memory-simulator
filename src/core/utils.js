// src/core/utils.js

export function addressToVPN(address, pageSize) {
  const vpn = Math.floor(address / pageSize);
  const offset = address % pageSize;
  return { vpn, offset };
}

/**
 * Build a "future accesses" array suitable for chooseOptimal.
 * trace: array of { pid, address } in absolute addresses
 * startIndex: index of next access (build future from startIndex)
 * pageSize: pageSize used by MemoryManager
 * returns array of { pid, vpn } in order
 */
export function buildFutureAccesses(trace, startIndex, pageSize) {
  const out = [];
  for (let i = startIndex; i < trace.length; i++) {
    const { pid, address } = trace[i];
    const vpn = Math.floor(address / pageSize);
    out.push({ pid, vpn });
  }
  return out;
}
