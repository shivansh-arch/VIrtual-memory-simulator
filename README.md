# Virtual Memory Management Simulator

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Course](https://img.shields.io/badge/Course-CSE316_Operating_Systems-blue)
![University](https://img.shields.io/badge/University-Lovely_Professional_University-orange)

## 📌 Project Overview
The **Virtual Memory Management Simulator** is an interactive web-based tool designed to visualize how modern operating systems manage memory. [cite_start]It simulates core concepts such as paging, segmentation, page replacement algorithms, and demand paging[cite: 21].

[cite_start]In real operating systems, memory management occurs in the background, making it difficult for students to understand concepts like address translation and page faults[cite: 22]. [cite_start]This project solves that problem by visualizing these operations step-by-step[cite: 23].

### 🎯 Purpose
[cite_start]Designed primarily for undergraduate OS courses and students preparing for OS-related interviews to understand dynamic memory behavior[cite: 29].

---

## ✨ Key Features

* [cite_start]**Step-by-Step Simulation:** Visualize how logical addresses are translated into physical addresses and how pages are loaded into frames[cite: 23, 24].
* [cite_start]**Page Replacement Algorithms:** Implementation of **FIFO**, **LRU**, and **Optimal** algorithms to evict pages[cite: 26].
* [cite_start]**Real-Time Statistics:** Track Hit Ratio, Miss Ratio, Swap-ins, Swap-outs, and Total Accesses live[cite: 27, 43].
* **Interactive Visualizations:**
    * [cite_start]**Memory Frames:** Color-coded frames highlighting hits (green), faults (red), and victim frames (yellow)[cite: 134, 135].
    * [cite_start]**Page Table:** Live updates of Present bit, Frame number, Dirty bit, and Last accessed time[cite: 87, 138].
    * [cite_start]**Charts:** Real-time graphs showing page fault trends using Chart.js[cite: 142, 143].
* [cite_start]**Scenario Builder:** Generate random traces, use presets (locality, loops), and export results to CSV[cite: 154, 157].

---

## 🛠️ Technology Stack

**Frontend & Visualization:**
* [cite_start]![React](https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React.js** [cite: 194]
* [cite_start]![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) **Vite** [cite: 195]
* [cite_start]![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS** (Dark-themed UI) [cite: 196, 126]
* [cite_start]**Framer Motion** (Animations) [cite: 198]
* [cite_start]**Chart.js** (Analytics) [cite: 197]

**Logic & Tools:**
* [cite_start]**JavaScript (ES6+)** [cite: 189]
* [cite_start]**Node.js & npm** [cite: 199]

---

## 📂 Project Architecture

[cite_start]The project is divided into three distinct modules[cite: 32]:

### [cite_start]Module 1: Core Simulation Engine (Backend Logic) [cite: 34]
Handles the math and OS logic.
* [cite_start]`memoryManager.js`: Central class for access, faults, and frame updates[cite: 47].
* [cite_start]`pageTable.js`: Manages page entries[cite: 49].
* [cite_start]`algorithms.js`: Contains logic for FIFO, LRU, and Optimal[cite: 50].

### [cite_start]Module 2: UI Visualization Layer [cite: 96]
Renders the state to the user.
* [cite_start]`MemoryView.jsx`: Renders physical frames and animations[cite: 108].
* [cite_start]`PageTableView.jsx`: Displays the page status[cite: 111].
* [cite_start]`StatsPanel.jsx` & `ChartView.jsx`: Shows metrics and graphs[cite: 113, 116].

### [cite_start]Module 3: Scenario Builder [cite: 151]
Manages test cases and data.
* [cite_start]`traceGenerator.js`: Creates random or custom access patterns[cite: 164].
* [cite_start]`results.js`: Exports simulation stats to CSV[cite: 162].

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
* Node.js installed on your machine.

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/REPO_NAME.git](https://github.com/YOUR_USERNAME/REPO_NAME.git)
    ```
2.  **Navigate to the project directory**
    ```bash
    cd REPO_NAME
    ```
3.  **Install dependencies**
    ```bash
    npm install
    ```
4.  **Run the development server**
    ```bash
    npm run dev
    ```

---

## 🔮 Future Scope
[cite_start]Planned enhancements for the simulator[cite: 226]:
* [cite_start]**Segmentation Support:** Visualizing segment tables and faults[cite: 227].
* [cite_start]**Multi-Level Paging:** Support for two/three-level page tables[cite: 232].
* [cite_start]**TLB Simulation:** Visualizing Translation Lookaside Buffer hits/misses[cite: 234].
* [cite_start]**Multi-Process Support:** Context switching and memory isolation[cite: 237].
* [cite_start]**Cloud Deployment:** Hosting the simulator for collaborative use[cite: 253].

---

## 👥 Contributors

This project was submitted for **Academic Task-2** under **Dr. [cite_start]Navjot Kaur**[cite: 1, 7].

* **Shivansh Gupta** (Reg: 12412482) [cite: 9]
* [cite_start]**Gambhir Yadav** (Reg: 12415415) [cite: 10]
* [cite_start]**Harshita Singh** (Reg: 12407151) [cite: 11]



---

[cite_start]**Lovely Professional University, Punjab, India** [cite: 12, 13]'
