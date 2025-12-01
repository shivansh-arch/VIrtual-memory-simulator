# Virtual Memory Management Simulator Documentation

## 1. Objective

To simulate and visualize how an Operating System manages virtual memory using **paging**, **page faults**, and **page replacement algorithms (LRU & Optimal)** through an interactive web-based tool.

---

## 2. Overview of Project

This project demonstrates key OS concepts:

* **Paging:** Dividing memory into fixed-size pages.
* **Segmentation:** Dividing memory logically (optional).
* **Page Faults:** When a page is not found in memory.
* **Replacement Algorithms:** Managing which pages to evict when memory is full.

The simulator lets users input memory configurations and visualize memory behavior over time using charts and tables.

---

## 3. Modules Overview

| Module                                   | Description                                                                          | Key Components                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| **Core Simulation Module**               | Handles paging logic, page table management, page faults, and replacement algorithms | `memoryManager.js`, `pageTable.js`, `algorithms.js`, `utils.js` |
| **Visualization/UI Module**              | Displays the memory simulation visually (frames, hits, faults, swaps, graphs)        | `App.jsx`, `ChartView.jsx`, Tailwind CSS                        |
| **Documentation & Code Analysis Module** | Provides detailed documentation and example code for each algorithm                  | `/docs/report.md`, `/docs/demoCode/`, `/docs/screenshots/`      |

---

## 4. Core Algorithms Explained

### a) **Least Recently Used (LRU)**

Replaces the page that hasn’t been used for the longest time.

```js
function simulateLRU(pages, framesCount) {
  let frames = [];
  let recent = new Map();
  let faults = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (!frames.includes(page)) {
      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        const lruPage = [...recent.entries()].sort((a, b) => a[1] - b[1])[0][0];
        frames[frames.indexOf(lruPage)] = page;
        recent.delete(lruPage);
      }
      faults++;
    }
    recent.set(page, i);
  }
  return faults;
}
```

### b) **Optimal Replacement Algorithm**

Replaces the page that will not be used for the longest period in the future.

```js
function simulateOptimal(pages, framesCount) {
  let frames = [];
  let faults = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (!frames.includes(page)) {
      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        const future = frames.map(f => pages.slice(i + 1).indexOf(f));
        let replaceIndex = future.indexOf(-1);
        if (replaceIndex === -1) replaceIndex = future.indexOf(Math.max(...future));
        frames[replaceIndex] = page;
      }
      faults++;
    }
  }
  return faults;
}
```

---

## 5. Code Architecture

```plaintext
src/
├── core/
│   ├── memoryManager.js      # Core paging simulation engine
│   ├── algorithms.js         # Replacement algorithms
│   ├── pageTable.js          # Page table entries
│   └── utils.js              # Helper functions
│
├── scenarios/
│   ├── traceGenerator.js     # Generates test traces
│   ├── present.js            # Tracks current memory state
│   └── result.js             # Records access results
│
├── ui/
│   ├── components/           # React UI components
│   └── styles.css            # Tailwind styles
│
├── App.jsx                   # Main UI controller
└── ChartView.jsx             # Chart.js visualization
```

---

## 6. Graph Analysis

### **Chart Visualization Logic**

The chart uses **Chart.js** to plot simulation metrics.

| Metric          | Description                        | Color |
| --------------- | ---------------------------------- | ----- |
| **Page Faults** | Number of page faults at each step | Blue  |
| **Swaps In**    | Pages loaded into memory           | Green |
| **Swaps Out**   | Pages removed from memory          | Red   |

**X-Axis:** Simulation steps (each memory access)
**Y-Axis:** Count of events (faults/swaps)

This helps visualize memory performance over time.

---

## 7. Output Demonstration

### Example Frame Table:

| Frame | PID | VPN | Present |
| ----- | --- | --- | ------- |
| 0     | 1   | 0   | ✅       |
| 1     | 1   | 1   | ✅       |
| 2     | 1   | 3   | ❌       |

### Example Simulation Output:

```
Access: PID 1, Address 8
→ Page Fault: Page 2 loaded into Frame 1
→ Swaps In: 3
→ Swaps Out: 1
→ Present Frames: [Page 0, Page 2, Page 3]
```

### Example Chart:

```
Step 1  █ Page Fault
Step 2  ██ Page Faults
Step 3  ██ Hit
Step 4  ███ Page Faults
```

---

## 8. Observations

* LRU performs better in repetitive access patterns.
* Optimal achieves the lowest faults but requires future knowledge.
* Memory fragmentation can be observed when fewer frames are available.

---

## 9. Conclusion

This Virtual Memory Simulator successfully demonstrates how operating systems handle memory efficiently. It connects theoretical OS concepts with practical simulation and data visualization.

**Keywords:** Virtual Memory, Page Fault, Paging, LRU, Optimal Algorithm, Visualization.

---

## 10. Future Enhancements

* Add FIFO algorithm comparison.
* Visualize segmentation along with paging.
* Support real-time user input for dynamic memory access patterns.
* Export reports directly from UI.

---

## 11. References

* Tanenbaum, A. S. *Modern Operating Systems*
* Silberschatz, Galvin. *Operating System Concepts*
