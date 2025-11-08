// src/core/pageTable.js
export function createPageTable(numPages) {
  // Returns an array of page table entries (PTEs)
  // PTE = { present: boolean, frame: number|null, dirty: boolean, lastAccess: number|null }
  const table = new Array(numPages);
  for (let i = 0; i < numPages; i++) {
    table[i] = { present: false, frame: null, dirty: false, lastAccess: null };
  }
  return table;
}

export function resetPageTable(table) {
  for (let i = 0; i < table.length; i++) {
    table[i].present = false;
    table[i].frame = null;
    table[i].dirty = false;
    table[i].lastAccess = null;
  }
}
