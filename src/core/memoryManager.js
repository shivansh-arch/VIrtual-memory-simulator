// src/core/memoryManager.js
import { createPageTable } from './pageTable.js';
import { chooseLRU, chooseOptimal } from './algorithms.js';
import { addressToVPN, buildFutureAccesses } from './utils.js';

export class MemoryManager {
  /**
   * numFrames - number of physical frames
   * pageSize - in same unit as addresses (e.g., bytes or words)
   * options - { algorithm: "LRU"|"Optimal", debug: boolean }
   */
  constructor(numFrames = 4, pageSize = 4, options = {}) {
    this.numFrames = numFrames;
    this.pageSize = pageSize;
    this.algorithm = options.algorithm || 'LRU';
    this.debug = !!options.debug;

    // frames: index -> { pid, vpn, dirty, lastAccess }
    this.frames = new Array(numFrames).fill(null);

    // pageTables: pid -> array of PTE objects
    this.pageTables = {};

    // stats
    this.stats = {
      accesses: 0,
      pageFaults: 0,
      swapsOut: 0, // evicted pages written back (now counts all evictions)
      swapsIn: 0, // pages loaded from disk
      lastEvicted: null, // track most recent eviction for UI
    };

    this.time = 0; // logical time for LRU timestamps
  }

  debugLog(...args) {
    if (this.debug) console.log('[MM]', ...args);
  }

  addProcess(pid, numPages) {
    if (this.pageTables[pid]) throw new Error(`Process ${pid} already exists`);
    this.pageTables[pid] = createPageTable(numPages);
  }

  /**
   * Access simulation
   * pid, address = process and virtual address
   * trace = future reference string for Optimal algorithm
   */
  access(pid, address, trace = null, traceIndex = null, isWrite = false) {
    this.time++;
    this.stats.accesses++;

    if (!this.pageTables[pid]) throw new Error(`Unknown pid ${pid}`);
    const { vpn, offset } = addressToVPN(address, this.pageSize);
    const pte = this.pageTables[pid][vpn];
    this.debugLog(`Access pid=${pid}, address=${address} -> vpn=${vpn}`);

    // ✅ Case 1: Page Hit
    if (pte.present) {
      const frameIdx = pte.frame;
      const frame = this.frames[frameIdx];
      frame.lastAccess = this.time;

      if (isWrite) {
        pte.dirty = true;
        frame.dirty = true;
      }

      pte.lastAccess = this.time;
      return {
        hit: true,
        frameIndex: frameIdx,
        pid,
        vpn,
        offset,
        info: 'hit',
        stats: { ...this.stats },
      };
    }

    // ❌ Case 2: Page Fault
    this.stats.pageFaults++;

    // find free frame
    let freeIdx = this.frames.findIndex(f => f === null);
    let victimInfo = null;

    if (freeIdx === -1) {
      // Replacement needed
      let victimIdx;
      if (this.algorithm === 'LRU') {
        victimIdx = chooseLRU(this.frames);
      } else if (this.algorithm === 'Optimal') {
        const future = buildFutureAccesses(trace || [], (traceIndex || 0) + 1, this.pageSize);
        victimIdx = chooseOptimal(this.frames, future);
      } else {
        victimIdx = chooseLRU(this.frames);
      }

      const victim = this.frames[victimIdx];
      this.debugLog(`Evicting frame ${victimIdx} (pid=${victim.pid} vpn=${victim.vpn})`);

      // ✅ Always count a swap-out (whether dirty or clean)
      this.stats.swapsOut++;

      // Log dirty pages separately (optional)
      if (victim.dirty) {
        this.debugLog(`Writing dirty page pid=${victim.pid}, vpn=${victim.vpn} to swap`);
      }

      // Update victim’s page table
      const victimPTE = this.pageTables[victim.pid][victim.vpn];
      victimPTE.present = false;
      victimPTE.frame = null;
      victimPTE.lastAccess = victim.lastAccess;

      // Store for visualization
      victimInfo = {
        victimIdx,
        victimPid: victim.pid,
        victimVpn: victim.vpn,
        victimDirty: victim.dirty,
      };
      this.stats.lastEvicted = {
        pid: victim.pid,
        vpn: victim.vpn,
        frame: victimIdx,
      };

      // Free the frame
      freeIdx = victimIdx;
    }

    // Load new page into free frame
    const loadFrame = { pid, vpn, dirty: !!isWrite, lastAccess: this.time };
    this.frames[freeIdx] = loadFrame;

    // Update page table
    pte.present = true;
    pte.frame = freeIdx;
    pte.dirty = !!isWrite;
    pte.lastAccess = this.time;

    // Swap in increment
    this.stats.swapsIn++;

    return {
      hit: false,
      frameIndex: freeIdx,
      pid,
      vpn,
      offset,
      info: 'page_fault',
      victim: victimInfo,
      stats: { ...this.stats },
    };
  }

  /**
   * Reset simulation state
   */
  reset() {
    this.frames = new Array(this.numFrames).fill(null);
    Object.keys(this.pageTables).forEach(pid => {
      const table = this.pageTables[pid];
      for (let i = 0; i < table.length; i++) {
        table[i].present = false;
        table[i].frame = null;
        table[i].dirty = false;
        table[i].lastAccess = null;
      }
    });
    this.stats = {
      accesses: 0,
      pageFaults: 0,
      swapsOut: 0,
      swapsIn: 0,
      lastEvicted: null,
    };
    this.time = 0;
  }

  /**
   * Return safe state copy for visualization
   */
  getState() {
    return {
      frames: this.frames.map(f => (f ? { ...f } : null)),
      pageTables: Object.keys(this.pageTables).reduce((acc, pid) => {
        acc[pid] = this.pageTables[pid].map(e => ({ ...e }));
        return acc;
      }, {}),
      stats: { ...this.stats },
      time: this.time,
      config: {
        numFrames: this.numFrames,
        pageSize: this.pageSize,
        algorithm: this.algorithm,
      },
    };
  }
}
