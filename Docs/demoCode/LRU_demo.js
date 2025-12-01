// Simple demo showing how LRU replacement works

function simulateLRU(pages, framesCount) {
  let frames = [];
  let recent = new Map();
  let pageFaults = 0;

  for (let i = 0; i < pages.length; i++) {
    let page = pages[i];
    if (!frames.includes(page)) {
      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        // Find least recently used page
        let lruPage = [...recent.entries()].sort((a, b) => a[1] - b[1])[0][0];
        frames[frames.indexOf(lruPage)] = page;
        recent.delete(lruPage);
      }
      pageFaults++;
    }
    recent.set(page, i);
    console.log(`Step ${i + 1}:`, frames.join(" | "));
  }

  console.log(`Total Page Faults = ${pageFaults}`);
}

// Example run
simulateLRU([1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], 3);

