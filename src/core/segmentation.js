// src/core/segmentation.js

export class SegmentationManager {
  /**
   * memorySize in bytes (or units)
   */
  constructor(memorySize) {
    this.memorySize = memorySize;
    // segments: { pid, segId, base, size }
    this.segments = [];
    // holes tracked as { start, size }
    this.holes = [{ start: 0, size: memorySize }];
  }

  /**
   * allocate(pid, segId, size) -> returns { base, size } or null if fail
   * First-fit strategy
   */
  allocate(pid, segId, size) {
    const holeIdx = this.holes.findIndex(h => h.size >= size);
    if (holeIdx === -1) return null;
    const hole = this.holes[holeIdx];
    const base = hole.start;
    this.segments.push({ pid, segId, base, size });
    // shrink or remove hole
    if (hole.size === size) {
      this.holes.splice(holeIdx, 1);
    } else {
      this.holes[holeIdx] = { start: hole.start + size, size: hole.size - size };
    }
    // keep segments sorted by base (useful for visualization)
    this.segments.sort((a, b) => a.base - b.base);
    return { base, size };
  }

  /**
   * free(pid, segId)
   */
  free(pid, segId) {
    const idx = this.segments.findIndex(s => s.pid === pid && s.segId === segId);
    if (idx === -1) return false;
    const seg = this.segments.splice(idx, 1)[0];
    // add hole and coalesce
    this._addHole(seg.base, seg.size);
    return true;
  }

  _addHole(start, size) {
    this.holes.push({ start, size });
    this._coalesceHoles();
  }

  _coalesceHoles() {
    this.holes.sort((a, b) => a.start - b.start);
    const res = [];
    for (const h of this.holes) {
      if (res.length === 0) res.push({ ...h });
      else {
        const last = res[res.length - 1];
        if (last.start + last.size >= h.start) {
          // merge
          const end = Math.max(last.start + last.size, h.start + h.size);
          last.size = end - last.start;
        } else res.push({ ...h });
      }
    }
    this.holes = res;
  }

  /**
   * compact() - move segments left to remove holes
   */
  compact() {
    let offset = 0;
    this.segments.sort((a, b) => a.base - b.base);
    for (const seg of this.segments) {
      seg.base = offset;
      offset += seg.size;
    }
    this.holes = [{ start: offset, size: this.memorySize - offset }];
  }

  getState() {
    return { segments: [...this.segments], holes: [...this.holes] };
  }
}
