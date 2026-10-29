/**
 * OS Workstation: Systems Benchmark & Algorithmic Analysis Suite
 * Swiss Editorial Engineering Design — Zero Emojis, Clean Architectural Light
 *
 * Core Modules:
 * 1. Virtual Memory Page Replacement & Belady's Anomaly Verification
 * 2. Multi-Algorithm CPU Scheduling & Gantt Timeline Dispatcher
 * 3. Linux Systems Administration & POSIX Terminal Simulator
 * 4. Academic Technical Documentation & CSV Data Exporter
 */

// ==============================================================================
// GLOBAL STATE
// ==============================================================================

const state = {
  currentTab: 'page-replacement',

  // Page Replacement Module State
  pageReplacement: {
    referenceString: [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1],
    frameCount: 3,
    activeAlgoKey: 'FIFO',
    results: {},
    playback: {
      currentStep: 0,
      isPlaying: false,
      speed: 1,
      timerId: null
    },
  },

  // CPU Scheduling Module State
  cpuScheduling: {
    processes: [
      { id: 'P1', at: 0, bt: 5, priority: 2 },
      { id: 'P2', at: 1, bt: 3, priority: 1 },
      { id: 'P3', at: 2, bt: 8, priority: 4 },
      { id: 'P4', at: 3, bt: 6, priority: 3 }
    ],
    priorityRule: 'lower-is-higher',
    timeQuantum: 2,
    activeAlgoKey: 'SRTF',
    results: {},
    playback: {
      currentTime: 0,
      isPlaying: false,
      speed: 1,
      timerId: null
    }
  },

  // Linux Virtual Terminal State
  terminal: {
    currentDir: '/home/sysadmin',
    history: [],
    historyIndex: -1,
    files: {
      '/home/sysadmin': ['kernel_bench.c', 'system.log', 'benchmark.csv', 'scripts', 'deploy.sh'],
      '/home/sysadmin/scripts': ['monitor_ram.sh', 'kill_stale.sh']
    },
    fileContents: {
      '/home/sysadmin/kernel_bench.c': '#include <stdio.h>\nint main() {\n    printf("OS Workstation Engine: Active\\n");\n    return 0;\n}',
      '/home/sysadmin/system.log': 'Oct 27 19:40:00 kernel: CPU[0] Scheduler: SRTF Dispatcher loaded.\nOct 27 19:40:01 kernel: MMU: 4 Frames mapped, Page fault handler active.',
      '/home/sysadmin/benchmark.csv': 'Algorithm,Metric,Score\nSRTF,AvgWaitTime,3.25ms\nOptimal,PageFaults,9',
      '/home/sysadmin/deploy.sh': '#!/bin/bash\necho "Running OS test suite..."\ngcc -O3 kernel_bench.c -o bench'
    }
  }
};

// ==============================================================================
// INITIALIZATION
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initPageReplacement();
  initCpuScheduling();
  initLinuxHub();
  initTerminal();
  initKeyboardShortcuts();
  initAlgorithmRace();
  initCpuRace();
});

function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

    if (e.code === 'Space') {
      e.preventDefault();
      if (state.currentTab === 'page-replacement') togglePrPlayback();
      else if (state.currentTab === 'cpu-scheduling') toggleCpuPlayback();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (state.currentTab === 'page-replacement') prStepForward();
      else if (state.currentTab === 'cpu-scheduling') cpuStepForward();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (state.currentTab === 'page-replacement') prStepBackward();
      else if (state.currentTab === 'cpu-scheduling') cpuStepBackward();
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      if (state.currentTab === 'page-replacement') runPrSimulation();
      else if (state.currentTab === 'cpu-scheduling') runCpuSimulation();
    }
  });
}

function initTabs() {
  const tabs = document.querySelectorAll('.tab-nav-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  state.currentTab = tabId;
  document.querySelectorAll('.tab-nav-btn').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.workstation-view').forEach(p => {
    p.classList.toggle('active', p.id === `tab-${tabId}`);
  });

  if (tabId === 'page-replacement') {
    renderPrCharts();
  }
  if (tabId === 'cpu-scheduling') {
    renderCpuCharts();
  }
}

// ==============================================================================
// ALGORITHM CORRECTNESS VERIFICATION
// Runs known test cases on load to validate all scheduling and page replacement logic.
// ==============================================================================

function verifyAlgorithms() {
  // --- Page Replacement: Belady's Anomaly sequence ---
  const beladyRef = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];
  const f3 = calcFIFO(beladyRef, 3).faults;
  const f4 = calcFIFO(beladyRef, 4).faults;
  console.assert(f3 === 9, `FIFO Belady 3 frames: expected 9 faults, got ${f3}`);
  console.assert(f4 === 10, `FIFO Belady 4 frames: expected 10 faults, got ${f4}`);

  const lru3 = calcLRU(beladyRef, 3).faults;
  const lru4 = calcLRU(beladyRef, 4).faults;
  console.assert(lru4 <= lru3, `LRU stack property: 4 frames <= 3 frames faults (${lru4} <= ${lru3})`);

  const opt3 = calcOptimal(beladyRef, 3).faults;
  console.assert(opt3 === 9, `Optimal 3 frames: expected 9 faults, got ${opt3}`);

  // --- Page Replacement: Textbook string ---
  const textbook = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
  const optT = calcOptimal(textbook, 3);
  console.assert(optT.faults === 9, `Optimal textbook: expected 9 faults, got ${optT.faults}`);
  console.assert(optT.hitRatio === '55.0', `Optimal hit ratio: expected 55.0, got ${optT.hitRatio}`);

  const fifoT = calcFIFO(textbook, 3);
  console.assert(fifoT.faults === 15, `FIFO textbook: expected 15 faults, got ${fifoT.faults}`);

  const lruT = calcLRU(textbook, 3);
  console.assert(lruT.faults === 12, `LRU textbook: expected 12 faults, got ${lruT.faults}`);

  // --- CPU Scheduling: Standard workload ---
  const procs = [
    { id: 'P1', at: 0, bt: 5, priority: 2 },
    { id: 'P2', at: 1, bt: 3, priority: 1 },
    { id: 'P3', at: 2, bt: 8, priority: 4 },
    { id: 'P4', at: 3, bt: 6, priority: 3 }
  ];

  const srtf = simSRTF(procs);
  console.assert(Math.abs(srtf.avgWT - 3.25) < 0.01, `SRTF AWT: expected 3.25, got ${srtf.avgWT}`);
  console.assert(Math.abs(srtf.avgTAT - 8.75) < 0.01, `SRTF ATAT: expected 8.75, got ${srtf.avgTAT}`);

  const fcfs = simFCFS(procs);
  console.assert(Math.abs(fcfs.avgWT - 7.0) < 0.01, `FCFS AWT: expected 7.0, got ${fcfs.avgWT}`);

  const sjf = simSJF(procs);
  console.assert(Math.abs(sjf.avgWT - 4.0) < 0.01, `SJF AWT: expected 4.0, got ${sjf.avgWT}`);

  console.log('Algorithm verification complete. Check console for any assertion failures.');
}

verifyAlgorithms();

// ==============================================================================
// MODULE 1: PAGE REPLACEMENT & STEP CONTROLLER
// ==============================================================================

function initPageReplacement() {
  const refInput = document.getElementById('pr-reference-input');
  const frameInput = document.getElementById('pr-frames-input');
  const runBtn = document.getElementById('pr-run-btn');

  // Playback Buttons
  const playBtn = document.getElementById('pr-play-btn');
  const stepFwdBtn = document.getElementById('pr-step-fwd-btn');
  const stepBackBtn = document.getElementById('pr-step-back-btn');
  const resetBtn = document.getElementById('pr-reset-btn');
  const jumpEndBtn = document.getElementById('pr-jump-end-btn');
  const scrubberTrack = document.getElementById('pr-scrubber-track');

  if (refInput) {
    refInput.value = state.pageReplacement.referenceString.join(', ');
    refInput.addEventListener('change', updatePrInputs);
  }
  if (frameInput) {
    frameInput.value = state.pageReplacement.frameCount;
    frameInput.addEventListener('change', updatePrInputs);
  }
  if (runBtn) runBtn.addEventListener('click', runPrSimulation);
  // Initialize algorithm dropdown from state
  const prAlgoEl = document.getElementById('pr-algo-select');
  if (prAlgoEl) prAlgoEl.value = state.pageReplacement.activeAlgoKey;

  // Playback Controller Listeners
  playBtn?.addEventListener('click', togglePrPlayback);
  stepFwdBtn?.addEventListener('click', prStepForward);
  stepBackBtn?.addEventListener('click', prStepBackward);
  resetBtn?.addEventListener('click', prResetPlayback);
  jumpEndBtn?.addEventListener('click', prJumpEnd);

  scrubberTrack?.addEventListener('click', e => {
    const rect = scrubberTrack.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const totalSteps = state.pageReplacement.referenceString.length;
    state.pageReplacement.playback.currentStep = Math.round(pct * (totalSteps - 1));
    updatePrPlaybackFrame();
  });

  // Speed Buttons
  document.querySelectorAll('.pr-speed-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pr-speed-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.pageReplacement.playback.speed = parseFloat(pill.getAttribute('data-speed'));
      if (state.pageReplacement.playback.isPlaying) restartPrTimer();
    });
  });

  // Algorithm Selection Dropdown
  const algoSelect = document.getElementById('pr-algo-select');
  if (algoSelect) {
    algoSelect.addEventListener('change', () => {
      state.pageReplacement.activeAlgoKey = algoSelect.value;
      prResetPlayback();
      updatePrPlaybackFrame();
      renderPrComparisonTable();
    });
  }

  runPrSimulation();
}

function updatePrInputs() {
  const refStr = document.getElementById('pr-reference-input').value;
  const framesEl = document.getElementById('pr-frames-input');
  let framesVal = parseInt(framesEl.value, 10);
  if (isNaN(framesVal) || framesVal < 1) framesVal = 1;
  if (framesVal > 10) framesVal = 10;
  framesEl.value = framesVal;
  const parsed = refStr.split(/[\s,]+/).map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x));

  if (parsed.length > 0) state.pageReplacement.referenceString = parsed;
  state.pageReplacement.frameCount = framesVal;
}

function runPrSimulation() {
  try {
    updatePrInputs();
    const pages = state.pageReplacement.referenceString;
    const frames = state.pageReplacement.frameCount;

    state.pageReplacement.results = {
      Optimal: calcOptimal(pages, frames),
      LRU: calcLRU(pages, frames),
      FIFO: calcFIFO(pages, frames),
      LFU: calcLFU(pages, frames)
    };

    prResetPlayback();
    renderPrComparisonTable();
    renderPrCharts();
    renderPrMatrixTable();
    updatePrPlaybackFrame();

    const res = state.pageReplacement.results[getPrPlaybackKey()];
    animateNumber('pr-stat-faults', 0, res.faults, 600, 0);
    animateNumber('pr-stat-hits', 0, res.hits, 600, 0);
    animateNumber('pr-stat-hit-ratio', 0, parseFloat(res.hitRatio), 600, 1, '%');
    animateNumber('pr-stat-fault-ratio', 0, parseFloat(res.faultRatio), 600, 1, '%');

    // Auto-scroll to results
    const resultsSection = document.getElementById('pr-comparison-tbody')?.closest('.frosted-card');
    if (resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (err) {
    console.error('runPrSimulation error:', err);
    alert('Simulation error: ' + err.message);
  }
}

// ------------------------------------------------------------------------------
// PLAYBACK CONTROLLER: PAGE REPLACEMENT
// ------------------------------------------------------------------------------

function togglePrPlayback() {
  const pb = state.pageReplacement.playback;
  pb.isPlaying ? pausePrPlayback() : playPrPlayback();
}

function playPrPlayback() {
  const pb = state.pageReplacement.playback;
  pb.isPlaying = true;
  const btn = document.getElementById('pr-play-btn');
  if (btn) btn.textContent = 'Pause';

  if (pb.currentStep >= state.pageReplacement.referenceString.length - 1) {
    pb.currentStep = 0;
  }
  restartPrTimer();
}

function pausePrPlayback() {
  const pb = state.pageReplacement.playback;
  pb.isPlaying = false;
  if (pb.timerId) clearInterval(pb.timerId);
  const btn = document.getElementById('pr-play-btn');
  if (btn) btn.textContent = 'Play';
}

function restartPrTimer() {
  const pb = state.pageReplacement.playback;
  if (pb.timerId) clearInterval(pb.timerId);
  const interval = Math.max(120, 600 / pb.speed);
  pb.timerId = setInterval(() => {
    if (pb.currentStep < state.pageReplacement.referenceString.length - 1) {
      pb.currentStep++;
      updatePrPlaybackFrame();
    } else {
      pausePrPlayback();
    }
  }, interval);
}

function prStepForward() {
  pausePrPlayback();
  if (state.pageReplacement.playback.currentStep < state.pageReplacement.referenceString.length - 1) {
    state.pageReplacement.playback.currentStep++;
    updatePrPlaybackFrame();
  }
}

function prStepBackward() {
  pausePrPlayback();
  if (state.pageReplacement.playback.currentStep > 0) {
    state.pageReplacement.playback.currentStep--;
    updatePrPlaybackFrame();
  }
}

function prResetPlayback() {
  pausePrPlayback();
  state.pageReplacement.playback.currentStep = 0;
  updatePrPlaybackFrame();
}

function prJumpEnd() {
  pausePrPlayback();
  state.pageReplacement.playback.currentStep = state.pageReplacement.referenceString.length - 1;
  updatePrPlaybackFrame();
}

function updatePrPlaybackFrame() {
  const pb = state.pageReplacement.playback;
  const step = pb.currentStep;
  const algo = state.pageReplacement.results[getPrPlaybackKey()];
  if (!algo) return;

  const totalSteps = state.pageReplacement.referenceString.length;
  const progressPct = ((step + 1) / totalSteps) * 100;

  const scrubBar = document.getElementById('pr-scrubber-progress');
  if (scrubBar) scrubBar.style.width = `${progressPct}%`;

  const stepLabel = document.getElementById('pr-step-indicator');
  if (stepLabel) stepLabel.textContent = `Step ${step + 1} of ${totalSteps} (Page ${algo.pages[step]})`;

  const curStatus = algo.statuses[step];
  const ticker = document.getElementById('pr-action-ticker');
  if (ticker) {
    if (curStatus.isHit) {
      ticker.innerHTML = `Page [${curStatus.page}] resident in memory &bull; Status: CACHE HIT`;
    } else {
      if (curStatus.replaced !== null) {
        ticker.innerHTML = `Page [${curStatus.page}] requested &bull; Replaced victim Page [${curStatus.replaced}] &bull; Status: PAGE FAULT`;
      } else {
        ticker.innerHTML = `Page [${curStatus.page}] loaded into available frame &bull; Status: PAGE FAULT`;
      }
    }
  }

  // Update RAM Register Blocks
  const rack = document.getElementById('hardware-ram-rack');
  if (rack) {
    const curFrames = algo.matrix[step] || [];
    let slotsHtml = '';

    for (let f = 0; f < algo.numFrames; f++) {
      const pageVal = curFrames[f] !== undefined ? curFrames[f] : '—';
      const isTarget = pageVal === curStatus.page;
      const isHitSlot = isTarget && curStatus.isHit;
      const isFaultSlot = isTarget && !curStatus.isHit;

      const frameColorClass = `frame-color-${f % 8}`;
      slotsHtml += `
        <div class="ram-register-box ${frameColorClass} ${isHitSlot ? 'hit' : isFaultSlot ? 'fault' : ''}">
          <div class="register-id-label">Frame ${f + 1}</div>
          <div class="register-data-num">${pageVal}</div>
          <div class="register-state-badge ${isHitSlot ? 'hit-tag' : isFaultSlot ? 'fault-tag' : ''}" style="${!isTarget ? 'visibility:hidden;' : ''}">
            ${isHitSlot ? 'HIT' : 'FAULT'}
          </div>
        </div>
      `;
    }
    rack.innerHTML = slotsHtml;
  }

  // Highlight Active Column in Trace Table
  document.querySelectorAll('.matrix-col-step').forEach(c => {
    const cStep = parseInt(c.getAttribute('data-step'), 10);
    c.classList.toggle('active-col', cStep === step);
  });
}

// ------------------------------------------------------------------------------
// ALGORITHM LOGIC: FIFO, LRU, OPTIMAL, LFU
// ------------------------------------------------------------------------------

function getPrPlaybackKey() {
  return state.pageReplacement.activeAlgoKey === 'ALL' ? 'FIFO' : state.pageReplacement.activeAlgoKey;
}

function calcFIFO(pages, numFrames) {
  const frames = [];
  const matrix = [];
  const statuses = [];
  let faults = 0, hits = 0;
  const queue = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (frames.includes(page)) {
      hits++;
      statuses.push({ isHit: true, replaced: null, page });
    } else {
      faults++;
      let replaced = null;
      if (frames.length < numFrames) {
        frames.push(page);
        queue.push(page);
      } else {
        replaced = queue.shift();
        const idx = frames.indexOf(replaced);
        frames[idx] = page;
        queue.push(page);
      }
      statuses.push({ isHit: false, replaced, page });
    }
    matrix.push([...frames]);
  }

  return { name: 'FIFO (First-In, First-Out)', key: 'FIFO', pages, numFrames, matrix, statuses, faults, hits, hitRatio: ((hits / pages.length) * 100).toFixed(1), faultRatio: ((faults / pages.length) * 100).toFixed(1) };
}

function calcLRU(pages, numFrames) {
  const frames = [];
  const matrix = [];
  const statuses = [];
  let faults = 0, hits = 0;
  const lastUsed = new Map();

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    lastUsed.set(page, i);

    if (frames.includes(page)) {
      hits++;
      statuses.push({ isHit: true, replaced: null, page });
    } else {
      faults++;
      let replaced = null;
      if (frames.length < numFrames) {
        frames.push(page);
      } else {
        let lruPage = frames[0];
        let minTime = lastUsed.get(lruPage);
        for (let f of frames) {
          if (lastUsed.get(f) < minTime) {
            minTime = lastUsed.get(f);
            lruPage = f;
          }
        }
        replaced = lruPage;
        const idx = frames.indexOf(replaced);
        frames[idx] = page;
      }
      statuses.push({ isHit: false, replaced, page });
    }
    matrix.push([...frames]);
  }

  return { name: 'LRU (Least Recently Used)', key: 'LRU', pages, numFrames, matrix, statuses, faults, hits, hitRatio: ((hits / pages.length) * 100).toFixed(1), faultRatio: ((faults / pages.length) * 100).toFixed(1) };
}

function calcOptimal(pages, numFrames) {
  const frames = [];
  const matrix = [];
  const statuses = [];
  let faults = 0, hits = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (frames.includes(page)) {
      hits++;
      statuses.push({ isHit: true, replaced: null, page });
    } else {
      faults++;
      let replaced = null;
      if (frames.length < numFrames) {
        frames.push(page);
      } else {
        let farthest = -1;
        let victim = frames[0];
        for (let f of frames) {
          let nextUse = -1;
          for (let j = i + 1; j < pages.length; j++) {
            if (pages[j] === f) { nextUse = j; break; }
          }
          if (nextUse === -1) { victim = f; break; }
          else if (nextUse > farthest) { farthest = nextUse; victim = f; }
        }
        replaced = victim;
        const idx = frames.indexOf(replaced);
        frames[idx] = page;
      }
      statuses.push({ isHit: false, replaced, page });
    }
    matrix.push([...frames]);
  }

  return { name: 'Optimal (Belady Benchmark)', key: 'Optimal', pages, numFrames, matrix, statuses, faults, hits, hitRatio: ((hits / pages.length) * 100).toFixed(1), faultRatio: ((faults / pages.length) * 100).toFixed(1) };
}

function calcLFU(pages, numFrames) {
  const frames = [];
  const matrix = [];
  const statuses = [];
  let faults = 0, hits = 0;
  const freq = new Map();
  const arrival = new Map();

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    freq.set(page, (freq.get(page) || 0) + 1);

    if (frames.includes(page)) {
      hits++;
      statuses.push({ isHit: true, replaced: null, page });
    } else {
      faults++;
      let replaced = null;
      if (frames.length < numFrames) {
        frames.push(page);
        arrival.set(page, i);
      } else {
        let victim = frames[0];
        let minFreq = freq.get(victim);
        let minArr = arrival.get(victim);
        for (let f of frames) {
          const fFreq = freq.get(f);
          const fArr = arrival.get(f);
          if (fFreq < minFreq || (fFreq === minFreq && fArr < minArr)) {
            victim = f;
            minFreq = fFreq;
            minArr = fArr;
          }
        }
        replaced = victim;
        const idx = frames.indexOf(replaced);
        frames[idx] = page;
        arrival.set(page, i);
      }
      statuses.push({ isHit: false, replaced, page });
    }
    matrix.push([...frames]);
  }

  return { name: 'LFU (Least Frequently Used)', key: 'LFU', pages, numFrames, matrix, statuses, faults, hits, hitRatio: ((hits / pages.length) * 100).toFixed(1), faultRatio: ((faults / pages.length) * 100).toFixed(1) };
}

// ------------------------------------------------------------------------------
// RENDER VIEWS & CHARTS
// ------------------------------------------------------------------------------

function renderPrComparisonTable() {
  const tbody = document.getElementById('pr-comparison-tbody');
  const statementBox = document.getElementById('pr-statement-text');
  if (!tbody || !statementBox) return;

  const res = state.pageReplacement.results;
  const keys = ['Optimal', 'LRU', 'FIFO', 'LFU'];
  const sorted = [...keys].sort((a, b) => res[a].faults - res[b].faults);

  let html = '';
  keys.forEach(k => {
    const r = res[k];
    const isBest = r.faults === res[sorted[0]].faults;
    html += `
      <tr>
        <td><strong>${r.name}</strong> ${isBest ? '<span class="cell-hit-tag">[Optimal]</span>' : ''}</td>
        <td class="cell-mono">${r.pages.length}</td>
        <td class="cell-mono">${r.numFrames}</td>
        <td class="cell-mono" style="color:var(--accent-rose); font-weight:700;">${r.faults}</td>
        <td class="cell-mono" style="color:var(--accent-emerald); font-weight:700;">${r.hits}</td>
        <td class="cell-mono"><strong>${r.hitRatio}%</strong></td>
        <td class="cell-mono">${r.faultRatio}%</td>
      </tr>
    `;
  });
  tbody.innerHTML = html;

  const best = res[sorted[0]];
  statementBox.innerHTML = `
    Comparative Analysis: For the test reference sequence of ${state.pageReplacement.referenceString.length} accesses allocated across ${state.pageReplacement.frameCount} frames:
    <ul style="margin: 0.4rem 0 0.4rem 1.25rem;">
      <li><strong>${best.name}</strong> achieved the theoretical optimum with <strong>${best.faults} faults</strong> (${best.hitRatio}% hit ratio).</li>
      <li><strong>LRU</strong> recorded <strong>${res['LRU'].faults} faults</strong> (${res['LRU'].hitRatio}% hit ratio), exploiting temporal locality effectively.</li>
      <li><strong>FIFO</strong> recorded <strong>${res['FIFO'].faults} faults</strong> (${res['FIFO'].hitRatio}% hit ratio) due to chronological eviction disregarding access frequency.</li>
    </ul>
    <em>Theoretical Takeaway:</em> While Optimal requires future reference foresight and serves as an upper bound, LRU is the practical standard for modern virtual memory architectures.
  `;
}

function renderPrMatrixTable() {
  const wrap = document.getElementById('pr-matrix-wrap');
  if (!wrap) return;

  const algo = state.pageReplacement.results[getPrPlaybackKey()];
  if (!algo) return;

  let html = `
    <div class="matrix-trace-container">
      <table class="matrix-trace-table">
        <thead>
          <tr>
            <th style="min-width: 70px; text-align: left; background: var(--bg-glass-subtle);">Step</th>
            ${algo.pages.map((_, i) => `<th class="matrix-col-step" data-step="${i}">t${i + 1}</th>`).join('')}
          </tr>
          <tr>
            <th style="min-width: 70px; text-align: left; background: var(--bg-glass-subtle);">Access</th>
            ${algo.pages.map((p, i) => `<th class="head-col matrix-col-step" data-step="${i}">${p}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${Array.from({ length: algo.numFrames }, (_, f) => `
            <tr>
              <td style="font-weight:700; background: var(--bg-glass-subtle); text-align:left;">Frame ${f + 1}</td>
              ${algo.matrix.map((col, c) => {
                const val = col[f] !== undefined ? col[f] : '—';
                return `<td class="matrix-trace-cell matrix-col-step" data-step="${c}">${val}</td>`;
              }).join('')}
            </tr>
          `).join('')}
          <tr>
            <td style="font-weight:700; background: var(--bg-glass-subtle); text-align:left;">State</td>
            ${algo.statuses.map((st, i) => `
              <td class="matrix-col-step" data-step="${i}">
                <span class="${st.isHit ? 'cell-hit-tag' : 'cell-miss-tag'}" style="font-size:0.75rem;">
                  ${st.isHit ? 'HIT' : 'MISS'}
                </span>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;
  wrap.innerHTML = html;
}

function renderPrCharts() {
  const box = document.getElementById('pr-chart-box');
  if (!box || !state.pageReplacement.results.FIFO) return;

  const res = state.pageReplacement.results;
  const labels = ['Optimal', 'LRU', 'FIFO', 'LFU'];
  const faults = labels.map(l => res[l].faults);
  const hits = labels.map(l => res[l].hits);

  const w = 700, h = 260;
  const maxVal = Math.max(...faults, ...hits, 1) * 1.25;
  const startX = 75, groupW = 145;

  let bars = '';
  labels.forEach((l, i) => {
    const gx = startX + i * groupW;
    const fH = (faults[i] / maxVal) * 160;
    const hH = (hits[i] / maxVal) * 160;
    const fy = 200 - fH;
    const hy = 200 - hH;

    bars += `
      <rect x="${gx}" y="${fy}" width="34" height="${fH}" fill="#991b1b" />
      <text x="${gx + 17}" y="${fy - 5}" font-size="11" font-weight="700" fill="#991b1b" text-anchor="middle" font-family="monospace">${faults[i]}</text>

      <rect x="${gx + 38}" y="${hy}" width="34" height="${hH}" fill="#166534" />
      <text x="${gx + 55}" y="${hy - 5}" font-size="11" font-weight="700" fill="#166534" text-anchor="middle" font-family="monospace">${hits[i]}</text>

      <text x="${gx + 36}" y="224" font-size="11" font-weight="600" fill="#141413" text-anchor="middle">${l}</text>
    `;
  });

  box.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" style="width:100%; height:100%;">
      <line x1="50" y1="40" x2="660" y2="40" stroke="#e3e3de" stroke-dasharray="3" />
      <line x1="50" y1="120" x2="660" y2="120" stroke="#e3e3de" stroke-dasharray="3" />
      <line x1="50" y1="200" x2="660" y2="200" stroke="#141413" stroke-width="1.5" />

      <g transform="translate(480, 15)">
        <rect x="0" y="0" width="12" height="12" fill="#991b1b" />
        <text x="18" y="10" font-size="11" fill="#4a4a46">Faults</text>
        <rect x="80" y="0" width="12" height="12" fill="#166534" />
        <text x="98" y="10" font-size="11" fill="#4a4a46">Hits</text>
      </g>
      ${bars}
    </svg>
  `;
}

// ------------------------------------------------------------------------------
// CSV EXPORT: PAGE REPLACEMENT
// ------------------------------------------------------------------------------

function exportPrCsv() {
  const res = state.pageReplacement.results;
  let csv = 'Algorithm,References,Frames,Faults,Hits,HitRatioPct,FaultRatioPct\n';
  ['Optimal', 'LRU', 'FIFO', 'LFU'].forEach(k => {
    const r = res[k];
    csv += `"${r.name}",${r.pages.length},${r.numFrames},${r.faults},${r.hits},${r.hitRatio},${r.faultRatio}\n`;
  });
  downloadBlob(csv, 'page_replacement_benchmark.csv', 'text/csv');
}

// ==============================================================================
// ALGORITHM RACE: SIDE-BY-SIDE COMPARISON
// ==============================================================================

state.algorithmRace = {
  currentStep: 0,
  totalSteps: 0,
  algoA: null,
  algoB: null,
  referenceString: []
};

function initAlgorithmRace() {
  const btnRun = document.getElementById('race-run-btn');
  const btnStep = document.getElementById('race-step-btn');
  const selectA = document.getElementById('race-algo-a');
  const selectB = document.getElementById('race-algo-b');

  if (btnRun) btnRun.addEventListener('click', startRace);
  if (btnStep) btnStep.addEventListener('click', stepRace);
  if (selectA) selectA.addEventListener('change', () => {
    document.getElementById('race-name-a').textContent = selectA.value;
  });
  if (selectB) selectB.addEventListener('change', () => {
    document.getElementById('race-name-b').textContent = selectB.value;
  });
}

function startRace() {
  const refStr = state.pageReplacement.referenceString;
  const frames = state.pageReplacement.frameCount;
  const algoA = document.getElementById('race-algo-a').value;
  const algoB = document.getElementById('race-algo-b').value;

  state.algorithmRace.referenceString = [...refStr];
  state.algorithmRace.totalSteps = refStr.length;
  state.algorithmRace.currentStep = 0;
  state.algorithmRace.algoA = runSingleAlgo(algoA, refStr, frames);
  state.algorithmRace.algoB = runSingleAlgo(algoB, refStr, frames);

  document.getElementById('race-step-indicator').textContent = `Step 1 of ${refStr.length}`;
  renderRaceFrame();
}

function runSingleAlgo(algoName, pages, numFrames) {
  switch (algoName) {
    case 'FIFO': return calcFIFO(pages, numFrames);
    case 'LRU': return calcLRU(pages, numFrames);
    case 'Optimal': return calcOptimal(pages, numFrames);
    case 'LFU': return calcLFU(pages, numFrames);
    default: return calcFIFO(pages, numFrames);
  }
}

function stepRace() {
  if (state.algorithmRace.currentStep < state.algorithmRace.totalSteps - 1) {
    state.algorithmRace.currentStep++;
    document.getElementById('race-step-indicator').textContent = `Step ${state.algorithmRace.currentStep + 1} of ${state.algorithmRace.totalSteps}`;
    renderRaceFrame();
  }
}

function renderRaceFrame() {
  const step = state.algorithmRace.currentStep;
  const algoA = state.algorithmRace.algoA;
  const algoB = state.algorithmRace.algoB;

  if (!algoA || !algoB) return;

  const rackA = document.getElementById('race-rack-a');
  const rackB = document.getElementById('race-rack-b');

  if (!rackA || !rackB) return;

  const statusA = algoA.statuses[step];
  const statusB = algoB.statuses[step];
  const framesA = algoA.matrix[step] || [];
  const framesB = algoB.matrix[step] || [];

  rackA.innerHTML = framesA.map((f, idx) => {
    const pageVal = f !== undefined ? f : '—';
    const isTarget = pageVal === statusA.page;
    const isHit = isTarget && statusA.isHit;
    const isFault = isTarget && !statusA.isHit;
    return `
      <div class="ram-register-box frame-color-${idx % 8} ${isHit ? 'hit' : isFault ? 'fault' : ''}" style="min-width:90px; padding:0.8rem;">
        <div class="register-id-label" style="font-size:0.65rem;">A-F${idx + 1}</div>
        <div class="register-data-num" style="font-size:1.8rem;">${pageVal}</div>
        <div class="register-state-badge ${isHit ? 'hit-tag' : isFault ? 'fault-tag' : ''}" style="${!isTarget ? 'visibility:hidden;' : ''}">${isHit ? 'HIT' : 'FAULT'}</div>
      </div>
    `;
  }).join('');

  rackB.innerHTML = framesB.map((f, idx) => {
    const pageVal = f !== undefined ? f : '—';
    const isTarget = pageVal === statusB.page;
    const isHit = isTarget && statusB.isHit;
    const isFault = isTarget && !statusB.isHit;
    return `
      <div class="ram-register-box frame-color-${idx % 8} ${isHit ? 'hit' : isFault ? 'fault' : ''}" style="min-width:90px; padding:0.8rem;">
        <div class="register-id-label" style="font-size:0.65rem;">B-F${idx + 1}</div>
        <div class="register-data-num" style="font-size:1.8rem;">${pageVal}</div>
        <div class="register-state-badge ${isHit ? 'hit-tag' : isFault ? 'fault-tag' : ''}" style="${!isTarget ? 'visibility:hidden;' : ''}">${isHit ? 'HIT' : 'FAULT'}</div>
      </div>
    `;
  }).join('');
}


// ==============================================================================
// CPU ALGORITHM RACE: SIDE-BY-SIDE COMPARISON
// ==============================================================================

function initCpuRace() {
  const btnRun = document.getElementById('race-cpu-run-btn');
  const selectA = document.getElementById('race-cpu-algo-a');
  const selectB = document.getElementById('race-cpu-algo-b');

  if (btnRun) btnRun.addEventListener('click', runCpuRace);
  if (selectA) selectA.addEventListener('change', () => {
    document.getElementById('race-cpu-name-a').textContent = selectA.value;
  });
  if (selectB) selectB.addEventListener('change', () => {
    document.getElementById('race-cpu-name-b').textContent = selectB.value;
  });
}

function runCpuRace() {
  const procs = state.cpuScheduling.processes.map(p => ({ ...p }));
  const q = state.cpuScheduling.timeQuantum;
  const isLowerHigher = state.cpuScheduling.priorityRule === 'lower-is-higher';
  const algoA = document.getElementById('race-cpu-algo-a').value;
  const algoB = document.getElementById('race-cpu-algo-b').value;

  const resA = runSingleCpuAlgo(algoA, procs, q, isLowerHigher);
  const resB = runSingleCpuAlgo(algoB, procs, q, isLowerHigher);

  renderCpuRaceGantt('race-cpu-gantt-a', resA);
  renderCpuRaceGantt('race-cpu-gantt-b', resB);
  renderCpuRaceMetrics('race-cpu-metrics-a', resA);
  renderCpuRaceMetrics('race-cpu-metrics-b', resB);
}

function runSingleCpuAlgo(algoName, procs, q, isLowerHigher) {
  switch (algoName) {
    case 'SRTF': return simSRTF(procs);
    case 'SJF': return simSJF(procs);
    case 'FCFS': return simFCFS(procs);
    case 'RoundRobin': return simRoundRobin(procs, q);
    case 'PriorityP': return simPriorityP(procs, isLowerHigher);
    case 'PriorityNP': return simPriorityNP(procs, isLowerHigher);
    default: return simFCFS(procs);
  }
}

function renderCpuRaceGantt(containerId, res) {
  const container = document.getElementById(containerId);
  if (!container || !res) return;

  const total = res.totalTime || 1;
  const colors = {};
  let hueIdx = 0;

  let slices = '';
  let ticks = `<span class="axis-tick-text" style="left: 0%;">0</span>`;

  res.gantt.forEach(blk => {
    if (!colors[blk.id]) {
      if (blk.id === 'IDLE') colors[blk.id] = '#e2e2dd';
      else {
        const hue = (hueIdx * 137.508) % 360;
        colors[blk.id] = `hsl(${hue}, 70%, 50%)`;
        hueIdx++;
      }
    }
    const dur = blk.end - blk.start;
    const pct = (dur / total) * 100;
    const isIdle = blk.id === 'IDLE';
    const bg = colors[blk.id];

    slices += `
      <div class="gantt-unit-block ${isIdle ? 'idle' : ''}" style="width: ${pct}%; background-color: ${isIdle ? '' : bg};">
        <span>${blk.id}</span>
        <span style="font-size:0.68rem; opacity:0.85;">(${dur})</span>
      </div>
    `;
    ticks += `<span class="axis-tick-text" style="left: ${(blk.end / total) * 100}%;">${blk.end}</span>`;
  });

  container.innerHTML = `
    <div style="font-size:0.75rem; font-family:var(--font-mono); color:var(--ink-muted); margin-bottom:0.4rem;">
      Makespan: ${res.totalTime} ms &bull; ${res.name}
    </div>
    <div class="gantt-horizontal-bar">${slices}</div>
    <div class="gantt-axis-ticks">${ticks}</div>
  `;
}

function renderCpuRaceMetrics(containerId, res) {
  const container = document.getElementById(containerId);
  if (!container || !res) return;

  container.innerHTML = `
    <div style="margin-bottom:0.5rem;"><strong>Avg WT:</strong> ${res.avgWT} ms</div>
    <div style="margin-bottom:0.5rem;"><strong>Avg TAT:</strong> ${res.avgTAT} ms</div>
    <div style="margin-bottom:0.5rem;"><strong>Avg RT:</strong> ${res.avgRT} ms</div>
    <div style="margin-bottom:0.5rem;"><strong>CPU Util:</strong> ${res.cpuUtil}%</div>
    <div style="margin-bottom:0.5rem;"><strong>Makespan:</strong> ${res.totalTime} ms</div>
  `;
}


// ==============================================================================
// MODULE 2: CPU SCHEDULING BENCHMARK & DISPATCHER
// ==============================================================================

function initCpuScheduling() {
  const addBtn = document.getElementById('cpu-add-proc-btn');
  const runBtn = document.getElementById('cpu-run-btn');
  const qInput = document.getElementById('cpu-quantum-input');
  const prSelect = document.getElementById('cpu-priority-rule');

  // Playback Buttons
  const playBtn = document.getElementById('cpu-play-btn');
  const stepFwdBtn = document.getElementById('cpu-step-fwd-btn');
  const stepBackBtn = document.getElementById('cpu-step-back-btn');
  const resetBtn = document.getElementById('cpu-reset-btn');
  const jumpEndBtn = document.getElementById('cpu-jump-end-btn');
  const scrubberTrack = document.getElementById('cpu-scrubber-track');

  if (addBtn) addBtn.addEventListener('click', addProcessRow);
  if (runBtn) runBtn.addEventListener('click', runCpuSimulation);

  if (qInput) {
    qInput.value = state.cpuScheduling.timeQuantum;
    qInput.addEventListener('change', () => {
      const q = parseInt(qInput.value, 10);
      if (!isNaN(q) && q >= 1) state.cpuScheduling.timeQuantum = q;
    });
  }

  if (prSelect) {
    prSelect.value = state.cpuScheduling.priorityRule;
    prSelect.addEventListener('change', () => {
      state.cpuScheduling.priorityRule = prSelect.value;
      runCpuSimulation();
    });
  }

  // Initialize algorithm dropdown from state
  const cpuAlgoEl = document.getElementById('cpu-algo-select');
  if (cpuAlgoEl) cpuAlgoEl.value = state.cpuScheduling.activeAlgoKey;

  // Playback Listeners
  playBtn?.addEventListener('click', toggleCpuPlayback);
  stepFwdBtn?.addEventListener('click', cpuStepForward);
  stepBackBtn?.addEventListener('click', cpuStepBackward);
  resetBtn?.addEventListener('click', cpuResetPlayback);
  jumpEndBtn?.addEventListener('click', cpuJumpEnd);

  scrubberTrack?.addEventListener('click', e => {
    const rect = scrubberTrack.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const algo = state.cpuScheduling.results[getCpuPlaybackKey()];
    if (algo) {
      state.cpuScheduling.playback.currentTime = Math.round(pct * algo.totalTime);
      updateCpuPlaybackFrame();
    }
  });

  // Speed Buttons
  document.querySelectorAll('.cpu-speed-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cpu-speed-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.cpuScheduling.playback.speed = parseFloat(pill.getAttribute('data-speed'));
      if (state.cpuScheduling.playback.isPlaying) restartCpuTimer();
    });
  });

  // Presets
  document.querySelectorAll('.cpu-preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const p = chip.getAttribute('data-preset');
      if (p === 'standard') {
        state.cpuScheduling.processes = [
          { id: 'P1', at: 0, bt: 5, priority: 2 },
          { id: 'P2', at: 1, bt: 3, priority: 1 },
          { id: 'P3', at: 2, bt: 8, priority: 4 },
          { id: 'P4', at: 3, bt: 6, priority: 3 }
        ];
      } else if (p === 'convoy') {
        state.cpuScheduling.processes = [
          { id: 'P1', at: 0, bt: 24, priority: 3 },
          { id: 'P2', at: 0, bt: 3, priority: 2 },
          { id: 'P3', at: 0, bt: 3, priority: 1 }
        ];
      } else if (p === 'preemption') {
        state.cpuScheduling.processes = [
          { id: 'P1', at: 0, bt: 8, priority: 3 },
          { id: 'P2', at: 1, bt: 4, priority: 1 },
          { id: 'P3', at: 2, bt: 9, priority: 4 },
          { id: 'P4', at: 3, bt: 5, priority: 2 }
        ];
      }
      renderProcessInputs();
      runCpuSimulation();
    });
  });

  // Algorithm Selection Dropdown
  const cpuAlgoSelect = document.getElementById('cpu-algo-select');
  if (cpuAlgoSelect) {
    cpuAlgoSelect.addEventListener('change', () => {
      state.cpuScheduling.activeAlgoKey = cpuAlgoSelect.value;
      cpuResetPlayback();
      updateCpuPlaybackFrame();
      renderCpuComparisonTable();
    });
  }

  renderProcessInputs();
  runCpuSimulation();
}

function renderProcessInputs() {
  const tbody = document.getElementById('cpu-process-input-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  state.cpuScheduling.processes.forEach((proc, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${proc.id}</strong></td>
      <td><input type="number" min="0" value="${proc.at}" class="editorial-input editorial-input-mono proc-at" data-index="${idx}" style="width: 80px;" /></td>
      <td><input type="number" min="1" value="${proc.bt}" class="editorial-input editorial-input-mono proc-bt" data-index="${idx}" style="width: 80px;" /></td>
      <td><input type="number" min="0" value="${proc.priority}" class="editorial-input editorial-input-mono proc-pr" data-index="${idx}" style="width: 80px;" /></td>
      <td><button class="btn-delete-proc" onclick="removeProcessRow(${idx})">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.proc-at').forEach(i => {
    i.addEventListener('change', e => state.cpuScheduling.processes[e.target.dataset.index].at = Math.max(0, parseInt(e.target.value, 10) || 0));
  });
  document.querySelectorAll('.proc-bt').forEach(i => {
    i.addEventListener('change', e => state.cpuScheduling.processes[e.target.dataset.index].bt = Math.max(1, parseInt(e.target.value, 10) || 1));
  });
  document.querySelectorAll('.proc-pr').forEach(i => {
    i.addEventListener('change', e => state.cpuScheduling.processes[e.target.dataset.index].priority = parseInt(e.target.value, 10) || 0);
  });
}

function addProcessRow() {
  const n = state.cpuScheduling.processes.length + 1;
  state.cpuScheduling.processes.push({ id: `P${n}`, at: n - 1, bt: Math.floor(Math.random() * 6) + 2, priority: n });
  renderProcessInputs();
}

function removeProcessRow(idx) {
  if (state.cpuScheduling.processes.length <= 1) {
    alert('At least one process is required.');
    return;
  }
  state.cpuScheduling.processes.splice(idx, 1);
  renderProcessInputs();
  runCpuSimulation();
}
window.removeProcessRow = removeProcessRow;

function runCpuSimulation() {
  try {
    const procs = state.cpuScheduling.processes.map(p => ({ ...p }));
    const q = state.cpuScheduling.timeQuantum;
    const isLowerHigher = state.cpuScheduling.priorityRule === 'lower-is-higher';

    state.cpuScheduling.results = {
      SRTF: simSRTF(procs),
      SJF: simSJF(procs),
      RoundRobin: simRoundRobin(procs, q),
      PriorityP: simPriorityP(procs, isLowerHigher),
      PriorityNP: simPriorityNP(procs, isLowerHigher),
      FCFS: simFCFS(procs)
    };

    cpuResetPlayback();
    renderCpuComparisonTable();
    renderCpuCharts();
    renderCpuDetails();
    updateCpuPlaybackFrame();

    const activeRes = state.cpuScheduling.results[getCpuPlaybackKey()];
    animateNumber('cpu-stat-awt', 0, activeRes.avgWT, 600, 2, ' ms');
    animateNumber('cpu-stat-atat', 0, activeRes.avgTAT, 600, 2, ' ms');
    animateNumber('cpu-stat-art', 0, activeRes.avgRT, 600, 2, ' ms');
    animateNumber('cpu-stat-util', 0, parseFloat(activeRes.cpuUtil), 600, 1, '%');

    // Auto-scroll to results
    const resultsSection = document.getElementById('cpu-comparison-tbody')?.closest('.frosted-card');
    if (resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (err) {
    console.error('runCpuSimulation error:', err);
    alert('Simulation error: ' + err.message);
  }
}

// ------------------------------------------------------------------------------
// PLAYBACK CONTROLLER: CPU SCHEDULING
// ------------------------------------------------------------------------------

function toggleCpuPlayback() {
  const pb = state.cpuScheduling.playback;
  pb.isPlaying ? pauseCpuPlayback() : playCpuPlayback();
}

function playCpuPlayback() {
  const pb = state.cpuScheduling.playback;
  const algo = state.cpuScheduling.results[getCpuPlaybackKey()];
  pb.isPlaying = true;
  const btn = document.getElementById('cpu-play-btn');
  if (btn) btn.textContent = 'Pause';

  if (pb.currentTime >= algo.totalTime) pb.currentTime = 0;
  restartCpuTimer();
}

function pauseCpuPlayback() {
  const pb = state.cpuScheduling.playback;
  pb.isPlaying = false;
  if (pb.timerId) clearInterval(pb.timerId);
  const btn = document.getElementById('cpu-play-btn');
  if (btn) btn.textContent = 'Play';
}

function restartCpuTimer() {
  const pb = state.cpuScheduling.playback;
  if (pb.timerId) clearInterval(pb.timerId);
  const algo = state.cpuScheduling.results[getCpuPlaybackKey()];
  const interval = Math.max(120, 600 / pb.speed);

  pb.timerId = setInterval(() => {
    if (pb.currentTime < algo.totalTime) {
      pb.currentTime++;
      updateCpuPlaybackFrame();
    } else {
      pauseCpuPlayback();
    }
  }, interval);
}

function cpuStepForward() {
  pauseCpuPlayback();
  const algo = state.cpuScheduling.results[getCpuPlaybackKey()];
  if (state.cpuScheduling.playback.currentTime < algo.totalTime) {
    state.cpuScheduling.playback.currentTime++;
    updateCpuPlaybackFrame();
  }
}

function cpuStepBackward() {
  pauseCpuPlayback();
  if (state.cpuScheduling.playback.currentTime > 0) {
    state.cpuScheduling.playback.currentTime--;
    updateCpuPlaybackFrame();
  }
}

function cpuResetPlayback() {
  pauseCpuPlayback();
  state.cpuScheduling.playback.currentTime = 0;
  updateCpuPlaybackFrame();
}

function cpuJumpEnd() {
  pauseCpuPlayback();
  const algo = state.cpuScheduling.results[getCpuPlaybackKey()];
  state.cpuScheduling.playback.currentTime = algo.totalTime;
  updateCpuPlaybackFrame();
}

function updateCpuPlaybackFrame() {
  const pb = state.cpuScheduling.playback;
  const t = pb.currentTime;
  const algo = state.cpuScheduling.results[getCpuPlaybackKey()];
  if (!algo) return;

  const total = algo.totalTime || 1;
  const pct = (t / total) * 100;

  const bar = document.getElementById('cpu-scrubber-progress');
  if (bar) bar.style.width = `${pct}%`;

  const timeLabel = document.getElementById('cpu-time-indicator');
  if (timeLabel) timeLabel.textContent = `Time: ${t} ms / ${total} ms`;

  const curSlice = algo.gantt.find(s => t >= s.start && t < s.end) || algo.gantt[algo.gantt.length - 1];
  const curProcId = curSlice ? curSlice.id : 'IDLE';

  const runningElem = document.getElementById('cpu-running-proc');
  if (runningElem) runningElem.textContent = curProcId;

  const ticker = document.getElementById('cpu-action-ticker');
  if (ticker) {
    if (curProcId === 'IDLE') {
      ticker.textContent = 'CPU state: IDLE (No processes in ready state)';
    } else {
      ticker.innerHTML = `Process [${curProcId}] active &bull; Slice: ${curSlice.start} ms to ${curSlice.end} ms`;
    }
  }

  const readyList = document.getElementById('cpu-ready-queue-list');
  if (readyList) {
    const readyProcs = state.cpuScheduling.processes.filter(p => p.id !== curProcId && p.at <= t && (!p.ct || p.ct > t));
    if (readyProcs.length === 0) {
      readyList.innerHTML = `<span style="font-size:0.75rem; color:var(--ink-muted);">[Queue Empty]</span>`;
    } else {
      readyList.innerHTML = readyProcs.map(p => `<span class="queue-process-chip">${p.id}</span>`).join('');
    }
  }

  document.querySelectorAll('.gantt-unit-block').forEach(el => {
    const s = parseInt(el.getAttribute('data-start'), 10);
    const e = parseInt(el.getAttribute('data-end'), 10);
    el.classList.toggle('active', t >= s && t < e);
  });
}

// ------------------------------------------------------------------------------
// CPU SCHEDULING ALGORITHM IMPLEMENTATIONS
// ------------------------------------------------------------------------------

function simFCFS(raw) {
  const procs = raw.map(p => ({ ...p })).sort((a, b) => a.at - b.at);
  let cur = 0;
  const gantt = [];
  const metrics = [];

  procs.forEach(p => {
    if (cur < p.at) {
      gantt.push({ id: 'IDLE', start: cur, end: p.at });
      cur = p.at;
    }
    const start = cur;
    const end = cur + p.bt;
    gantt.push({ id: p.id, start, end });
    cur = end;

    const ct = end;
    const tat = ct - p.at;
    const wt = tat - p.bt;
    const rt = start - p.at;
    metrics.push({ id: p.id, at: p.at, bt: p.bt, priority: p.priority, ct, tat, wt, rt });
  });

  return finalizeCpuStats('FCFS', gantt, metrics);
}

function simSJF(raw) {
  let procs = raw.map(p => ({ ...p, done: false }));
  let cur = 0, doneCount = 0;
  const gantt = [];
  const metrics = [];

  while (doneCount < procs.length) {
    const ready = procs.filter(p => !p.done && p.at <= cur);
    if (ready.length === 0) {
      const nextArr = Math.min(...procs.filter(p => !p.done).map(p => p.at));
      gantt.push({ id: 'IDLE', start: cur, end: nextArr });
      cur = nextArr;
      continue;
    }
    ready.sort((a, b) => a.bt - b.bt || a.at - b.at);
    const p = ready[0];

    const start = cur;
    const end = cur + p.bt;
    gantt.push({ id: p.id, start, end });
    cur = end;
    p.done = true;
    doneCount++;

    const ct = end;
    const tat = ct - p.at;
    const wt = tat - p.bt;
    const rt = start - p.at;
    metrics.push({ id: p.id, at: p.at, bt: p.bt, priority: p.priority, ct, tat, wt, rt });
  }

  metrics.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
  return finalizeCpuStats('SJF (Non-Preemptive)', gantt, metrics);
}

function simSRTF(raw) {
  const procs = raw.map(p => ({ ...p, remBt: p.bt, firstTime: -1, ct: 0 }));
  let cur = 0, doneCount = 0;
  const rawGantt = [];

  while (doneCount < procs.length) {
    const ready = procs.filter(p => p.remBt > 0 && p.at <= cur);
    if (ready.length === 0) {
      const nextArr = Math.min(...procs.filter(p => p.remBt > 0).map(p => p.at));
      rawGantt.push({ id: 'IDLE', time: cur });
      cur = nextArr;
      continue;
    }
    ready.sort((a, b) => a.remBt - b.remBt || a.at - b.at);
    const p = ready[0];
    if (p.firstTime === -1) p.firstTime = cur;

    rawGantt.push({ id: p.id, time: cur });
    p.remBt--;
    cur++;

    if (p.remBt === 0) {
      p.ct = cur;
      doneCount++;
    }
  }

  const gantt = compressGantt(rawGantt, cur);
  const metrics = procs.map(p => {
    const tat = p.ct - p.at;
    const wt = tat - p.bt;
    const rt = p.firstTime - p.at;
    return { id: p.id, at: p.at, bt: p.bt, priority: p.priority, ct: p.ct, tat, wt, rt };
  }).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

  return finalizeCpuStats('SRTF (Preemptive SJF)', gantt, metrics);
}

function simPriorityNP(raw, isLowerHigher) {
  let procs = raw.map(p => ({ ...p, done: false }));
  let cur = 0, doneCount = 0;
  const gantt = [];
  const metrics = [];

  while (doneCount < procs.length) {
    const ready = procs.filter(p => !p.done && p.at <= cur);
    if (ready.length === 0) {
      const nextArr = Math.min(...procs.filter(p => !p.done).map(p => p.at));
      gantt.push({ id: 'IDLE', start: cur, end: nextArr });
      cur = nextArr;
      continue;
    }
    ready.sort((a, b) => isLowerHigher ? (a.priority - b.priority || a.at - b.at) : (b.priority - a.priority || a.at - b.at));
    const p = ready[0];

    const start = cur;
    const end = cur + p.bt;
    gantt.push({ id: p.id, start, end });
    cur = end;
    p.done = true;
    doneCount++;

    const ct = end;
    const tat = ct - p.at;
    const wt = tat - p.bt;
    const rt = start - p.at;
    metrics.push({ id: p.id, at: p.at, bt: p.bt, priority: p.priority, ct, tat, wt, rt });
  }

  metrics.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
  return finalizeCpuStats('Priority (Non-Preemptive)', gantt, metrics);
}

function simPriorityP(raw, isLowerHigher) {
  const procs = raw.map(p => ({ ...p, remBt: p.bt, firstTime: -1, ct: 0 }));
  let cur = 0, doneCount = 0;
  const rawGantt = [];

  while (doneCount < procs.length) {
    const ready = procs.filter(p => p.remBt > 0 && p.at <= cur);
    if (ready.length === 0) {
      const nextArr = Math.min(...procs.filter(p => p.remBt > 0).map(p => p.at));
      rawGantt.push({ id: 'IDLE', time: cur });
      cur = nextArr;
      continue;
    }
    ready.sort((a, b) => isLowerHigher ? (a.priority - b.priority || a.at - b.at) : (b.priority - a.priority || a.at - b.at));
    const p = ready[0];
    if (p.firstTime === -1) p.firstTime = cur;

    rawGantt.push({ id: p.id, time: cur });
    p.remBt--;
    cur++;

    if (p.remBt === 0) {
      p.ct = cur;
      doneCount++;
    }
  }

  const gantt = compressGantt(rawGantt, cur);
  const metrics = procs.map(p => {
    const tat = p.ct - p.at;
    const wt = tat - p.bt;
    const rt = p.firstTime - p.at;
    return { id: p.id, at: p.at, bt: p.bt, priority: p.priority, ct: p.ct, tat, wt, rt };
  }).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

  return finalizeCpuStats('Priority (Preemptive)', gantt, metrics);
}

function simRoundRobin(raw, quantum) {
  const procs = raw.map(p => ({ ...p, remBt: p.bt, firstTime: -1, ct: 0 })).sort((a, b) => a.at - b.at);
  let cur = 0, doneCount = 0;
  const queue = [];
  const gantt = [];
  let pIdx = 0;

  while (pIdx < procs.length && procs[pIdx].at <= cur) {
    queue.push(procs[pIdx]);
    pIdx++;
  }

  while (doneCount < procs.length) {
    if (queue.length === 0) {
      if (pIdx < procs.length) {
        gantt.push({ id: 'IDLE', start: cur, end: procs[pIdx].at });
        cur = procs[pIdx].at;
        while (pIdx < procs.length && procs[pIdx].at <= cur) {
          queue.push(procs[pIdx]);
          pIdx++;
        }
      }
      continue;
    }

    const current = queue.shift();
    if (current.firstTime === -1) current.firstTime = cur;

    const slice = Math.min(current.remBt, quantum);
    gantt.push({ id: current.id, start: cur, end: cur + slice });
    cur += slice;
    current.remBt -= slice;

    while (pIdx < procs.length && procs[pIdx].at <= cur) {
      queue.push(procs[pIdx]);
      pIdx++;
    }

    if (current.remBt > 0) {
      queue.push(current);
    } else {
      current.ct = cur;
      doneCount++;
    }
  }

  const metrics = procs.map(p => {
    const tat = p.ct - p.at;
    const wt = tat - p.bt;
    const rt = p.firstTime - p.at;
    return { id: p.id, at: p.at, bt: p.bt, priority: p.priority, ct: p.ct, tat, wt, rt };
  }).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

  return finalizeCpuStats(`Round Robin (q = ${quantum})`, gantt, metrics);
}

function getCpuPlaybackKey() {
  return state.cpuScheduling.activeAlgoKey === 'ALL' ? 'SRTF' : state.cpuScheduling.activeAlgoKey;
}

function compressGantt(slots, total) {
  if (slots.length === 0) return [];
  const comp = [];
  let curId = slots[0].id, curStart = slots[0].time;
  for (let i = 1; i < slots.length; i++) {
    if (slots[i].id !== curId) {
      comp.push({ id: curId, start: curStart, end: slots[i].time });
      curId = slots[i].id;
      curStart = slots[i].time;
    }
  }
  comp.push({ id: curId, start: curStart, end: total });
  return comp;
}

function finalizeCpuStats(name, gantt, metrics) {
  const n = metrics.length;
  const totalTAT = metrics.reduce((acc, m) => acc + m.tat, 0);
  const totalWT = metrics.reduce((acc, m) => acc + m.wt, 0);
  const totalRT = metrics.reduce((acc, m) => acc + m.rt, 0);

  const avgTAT = parseFloat((totalTAT / n).toFixed(2));
  const avgWT = parseFloat((totalWT / n).toFixed(2));
  const avgRT = parseFloat((totalRT / n).toFixed(2));

  const totalTime = gantt.length > 0 ? gantt[gantt.length - 1].end : 0;
  const busy = gantt.filter(g => g.id !== 'IDLE').reduce((acc, g) => acc + (g.end - g.start), 0);
  const cpuUtil = totalTime > 0 ? ((busy / totalTime) * 100).toFixed(1) : '100.0';

  return { name, gantt, metrics, totalTAT, avgTAT, totalWT, avgWT, avgRT, cpuUtil, totalTime };
}

// ------------------------------------------------------------------------------
// RENDER CPU SCHEDULING TABLES & CHARTS
// ------------------------------------------------------------------------------

function renderCpuComparisonTable() {
  const tbody = document.getElementById('cpu-comparison-tbody');
  const statementBox = document.getElementById('cpu-statement-text');
  if (!tbody || !statementBox) return;

  const res = state.cpuScheduling.results;
  const keys = ['SRTF', 'SJF', 'RoundRobin', 'PriorityP', 'PriorityNP', 'FCFS'];
  const sorted = [...keys].sort((a, b) => res[a].avgWT - res[b].avgWT);

  let html = '';
  keys.forEach(k => {
    const r = res[k];
    const isMin = r.avgWT === res[sorted[0]].avgWT;
    html += `
      <tr>
        <td><strong>${r.name}</strong> ${isMin ? '<span class="cell-hit-tag">[Lowest AWT]</span>' : ''}</td>
        <td class="cell-mono">${r.totalWT}</td>
        <td class="cell-mono" style="color:var(--accent-blue); font-weight:700;">${r.avgWT} ms</td>
        <td class="cell-mono">${r.totalTAT}</td>
        <td class="cell-mono"><strong>${r.avgTAT} ms</strong></td>
        <td class="cell-mono">${r.avgRT} ms</td>
        <td class="cell-mono">${r.cpuUtil}%</td>
      </tr>
    `;
  });
  tbody.innerHTML = html;

  const best = res[sorted[0]];
  statementBox.innerHTML = `
    Comparative Scheduling Statement: Evaluated across 6 core scheduling disciplines:
    <ul style="margin: 0.4rem 0 0.4rem 1.25rem;">
      <li><strong>${best.name}</strong> attained the minimum <strong>Average Waiting Time (${best.avgWT} ms)</strong> and <strong>Average Turnaround Time (${best.avgTAT} ms)</strong>.</li>
      <li><strong>Round Robin</strong> minimized process starvation and provided uniform response latency (<strong>${res['RoundRobin'].avgRT} ms</strong>).</li>
      <li><strong>FCFS</strong> registered convoy latency inflation (<strong>${res['FCFS'].avgWT} ms AWT</strong>).</li>
    </ul>
  `;
}

function renderCpuDetails() {
  const wrap = document.getElementById('cpu-details-wrap');
  if (!wrap) return;

  const res = state.cpuScheduling.results[getCpuPlaybackKey()];
  if (!res) return;

  // Dynamic HSL colors for unlimited process count
  const getProcessColor = (id, index) => {
    if (id === 'IDLE') return '#e2e2dd';
    const hue = (index * 137.508) % 360; // Golden angle approximation for even distribution
    return `hsl(${hue}, 70%, 50%)`;
  };

  const total = res.totalTime || 1;

  let slices = '';
  let ticks = `<span class="axis-tick-text" style="left: 0%;">0</span>`;

  res.gantt.forEach((blk, bi) => {
    const dur = blk.end - blk.start;
    const pct = (dur / total) * 100;
    const isIdle = blk.id === 'IDLE';
    const bg = isIdle ? '#e2e2dd' : getProcessColor(blk.id, bi);

    slices += `
      <div class="gantt-unit-block ${isIdle ? 'idle' : ''}" 
           data-start="${blk.start}" 
           data-end="${blk.end}" 
           style="width: ${pct}%; background-color: ${isIdle ? '' : bg};">
        <span>${blk.id}</span>
        <span style="font-size:0.68rem; opacity:0.85;">(${dur})</span>
      </div>
    `;
    ticks += `<span class="axis-tick-text" style="left: ${(blk.end / total) * 100}%;">${blk.end}</span>`;
  });

  wrap.innerHTML = `
    <div class="gantt-chassis">
      <div style="font-size:0.75rem; font-family:var(--font-mono); color:var(--ink-muted); margin-bottom:0.4rem;">
        Makespan: ${res.totalTime} ms &bull; Active Policy: ${res.name}
      </div>
      <div class="gantt-horizontal-bar">${slices}</div>
      <div class="gantt-axis-ticks">${ticks}</div>
    </div>

    <div class="table-scroll-frame">
      <table class="editorial-table">
        <thead>
          <tr>
            <th>Process</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Priority</th>
            <th>Completion (CT)</th>
            <th>Turnaround (TAT)</th>
            <th>Waiting (WT)</th>
            <th>Response (RT)</th>
          </tr>
        </thead>
        <tbody>
          ${res.metrics.map(m => `
            <tr>
              <td><strong>${m.id}</strong></td>
              <td class="cell-mono">${m.at}</td>
              <td class="cell-mono">${m.bt}</td>
              <td class="cell-mono">${m.priority}</td>
              <td class="cell-mono">${m.ct}</td>
              <td class="cell-mono"><strong>${m.tat}</strong></td>
              <td class="cell-mono"><strong>${m.wt}</strong></td>
              <td class="cell-mono">${m.rt}</td>
            </tr>
          `).join('')}
          <tr style="background:var(--bg-glass-subtle); font-weight:700;">
            <td colspan="5" style="text-align:right;">Averages:</td>
            <td class="cell-mono" style="color:var(--accent-emerald);">${res.avgTAT} ms</td>
            <td class="cell-mono" style="color:var(--accent-blue);">${res.avgWT} ms</td>
            <td class="cell-mono">${res.avgRT} ms</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderCpuCharts() {
  const box = document.getElementById('cpu-chart-box');
  if (!box || !state.cpuScheduling.results.FCFS) return;

  const res = state.cpuScheduling.results;
  const keys = ['SRTF', 'SJF', 'RoundRobin', 'PriorityP', 'PriorityNP', 'FCFS'];
  const labels = ['SRTF', 'SJF', 'RR', 'P-Pre', 'P-NP', 'FCFS'];
  const wt = keys.map(k => res[k].avgWT);
  const tat = keys.map(k => res[k].avgTAT);

  const w = 700, h = 260;
  const maxVal = Math.max(...wt, ...tat, 1) * 1.25;
  const startX = 70, groupW = 100;

  let bars = '';
  labels.forEach((l, i) => {
    const gx = startX + i * groupW;
    const wtH = (wt[i] / maxVal) * 160;
    const tatH = (tat[i] / maxVal) * 160;
    const wty = 200 - wtH;
    const taty = 200 - tatH;

    bars += `
      <rect x="${gx}" y="${wty}" width="26" height="${wtH}" fill="#1d4ed8" />
      <text x="${gx + 13}" y="${wty - 5}" font-size="10" font-weight="700" fill="#1d4ed8" text-anchor="middle" font-family="monospace">${wt[i]}</text>

      <rect x="${gx + 30}" y="${taty}" width="26" height="${tatH}" fill="#166534" />
      <text x="${gx + 43}" y="${taty - 5}" font-size="10" font-weight="700" fill="#166534" text-anchor="middle" font-family="monospace">${tat[i]}</text>

      <text x="${gx + 28}" y="222" font-size="11" font-weight="600" fill="#141413" text-anchor="middle">${l}</text>
    `;
  });

  box.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" style="width:100%; height:100%;">
      <line x1="50" y1="40" x2="660" y2="40" stroke="#e3e3de" stroke-dasharray="3" />
      <line x1="50" y1="120" x2="660" y2="120" stroke="#e3e3de" stroke-dasharray="3" />
      <line x1="50" y1="200" x2="660" y2="200" stroke="#141413" stroke-width="1.5" />

      <g transform="translate(480, 15)">
        <rect x="0" y="0" width="12" height="12" fill="#1d4ed8" />
        <text x="18" y="10" font-size="11" fill="#4a4a46">Avg WT</text>
        <rect x="80" y="0" width="12" height="12" fill="#166534" />
        <text x="98" y="10" font-size="11" fill="#4a4a46">Avg TAT</text>
      </g>
      ${bars}
    </svg>
  `;
}

function exportCpuCsv() {
  const res = state.cpuScheduling.results;
  let csv = 'Algorithm,TotalWT,AvgWT,TotalTAT,AvgTAT,AvgRT,CPUUtilization\n';
  ['SRTF', 'SJF', 'RoundRobin', 'PriorityP', 'PriorityNP', 'FCFS'].forEach(k => {
    const r = res[k];
    csv += `"${r.name}",${r.totalWT},${r.avgWT},${r.totalTAT},${r.avgTAT},${r.avgRT},${r.cpuUtil}\n`;
  });
  downloadBlob(csv, 'cpu_scheduling_benchmark.csv', 'text/csv');
}

// MODULE 3: LINUX SYSTEMS ADMINISTRATION & TERMINAL
// ==============================================================================

const LINUX_COMMANDS = [
  { cat: 'files', name: 'ls', desc: 'List directory contents with extended attributes (inode, permissions, size, modification).', syntax: 'ls [OPTIONS] [FILE/DIR]', options: '<code>-l</code> Long listing; <code>-a</code> Include hidden files; <code>-h</code> Human-readable size', example: 'ls -lah' },
  { cat: 'files', name: 'pwd', desc: 'Print physical or logical path of current working directory from root.', syntax: 'pwd [-LP]', options: '<code>-P</code> Resolve physical directory path (avoid symlinks)', example: 'pwd' },
  { cat: 'files', name: 'cd', desc: 'Change working directory across virtual filesystem.', syntax: 'cd [DIR]', options: '<code>cd ~</code> Home; <code>cd ..</code> Parent; <code>cd -</code> Previous directory', example: 'cd scripts' },
  { cat: 'files', name: 'mkdir', desc: 'Create nested directories with parent path resolution.', syntax: 'mkdir [OPTIONS] DIRECTORY...', options: '<code>-p</code> Create parent paths as needed without error', example: 'mkdir -p /tmp/build/artifacts' },
  { cat: 'files', name: 'cp & mv', desc: 'Copy or move/rename files and directory trees.', syntax: 'cp -r SRC DEST | mv SRC DEST', options: '<code>-r</code> Recursive; <code>-u</code> Update if newer; <code>-i</code> Interactive prompt', example: 'cp -r scripts /tmp/backup_scripts' },
  { cat: 'files', name: 'rm', desc: 'Unlink and remove files or directory trees.', syntax: 'rm [OPTIONS] FILE...', options: '<code>-r</code> Recursive removal; <code>-f</code> Force without warning', example: 'rm -f system.log' },
  { cat: 'process', name: 'ps', desc: 'Report process status snapshots running on the Linux kernel.', syntax: 'ps [OPTIONS]', options: '<code>-ef</code> Full listing; <code>aux</code> BSD format with CPU/MEM percentage', example: 'ps aux' },
  { cat: 'process', name: 'top', desc: 'Real-time interactive dashboard of kernel tasks, memory, and CPU usage.', syntax: 'top', options: 'Press <code>q</code> to quit; <code>M</code> sort by RAM; <code>P</code> sort by CPU load', example: 'top' },
  { cat: 'process', name: 'kill & pkill', desc: 'Send POSIX termination signals to processes by PID or name pattern.', syntax: 'kill [-SIGNAL] PID | pkill [OPTIONS] PATTERN', options: '<code>-15</code> SIGTERM (graceful); <code>-9</code> SIGKILL (immediate kernel purge)', example: 'kill -9 2048' },
  { cat: 'permissions', name: 'chmod', desc: 'Modify file access mode bits (Read=4, Write=2, Execute=1).', syntax: 'chmod [PERMISSIONS] FILE...', options: '<code>755</code> rwxr-xr-x; <code>644</code> rw-r--r--; <code>+x</code> Add execution flag', example: 'chmod 755 deploy.sh' },
  { cat: 'permissions', name: 'chown', desc: 'Change user and group attribution of files and directories.', syntax: 'chown USER[:GROUP] FILE...', options: '<code>-R</code> Recursively update directory subtree ownership', example: 'chown sysadmin:developers deploy.sh' },
  { cat: 'system', name: 'df', desc: 'Report filesystem storage space usage across mounted blocks.', syntax: 'df [OPTIONS]', options: '<code>-h</code> Human-readable; <code>-T</code> Display filesystem type (ext4/xfs)', example: 'df -h' },
  { cat: 'system', name: 'free', desc: 'Display total amount of free and used physical memory (RAM) and Swap.', syntax: 'free [OPTIONS]', options: '<code>-h</code> Human-readable; <code>-m</code> Display in Megabytes', example: 'free -h' },
  { cat: 'system', name: 'uname', desc: 'Print kernel name, release version, and hardware architecture.', syntax: 'uname [OPTIONS]', options: '<code>-a</code> All system details; <code>-r</code> Kernel release; <code>-m</code> Machine architecture', example: 'uname -a' },
  { cat: 'text', name: 'grep', desc: 'Search text streams and files for patterns matching regular expressions.', syntax: 'grep [OPTIONS] PATTERN [FILE...]', options: '<code>-i</code> Case insensitive; <code>-n</code> Line numbers; <code>-r</code> Recursive search', example: 'grep -i "scheduler" system.log' },
  { cat: 'text', name: 'cat', desc: 'Concatenate and display file content chunks.', syntax: 'cat FILE', options: '<code>-n</code> Number all output lines', example: 'cat system.log' },
  { cat: 'network', name: 'ping', desc: 'Transmit ICMP ECHO_REQUEST packets to diagnose network reachability and latency.', syntax: 'ping [OPTIONS] DEST', options: '<code>-c 4</code> Terminate after 4 packets; <code>-i 1</code> 1-second interval', example: 'ping -c 4 8.8.8.8' }
];

function initLinuxHub() {
  const catBtns = document.querySelectorAll('.rail-menu-btn');
  const searchInput = document.getElementById('linux-search-input');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderLinuxCards(btn.getAttribute('data-cat'), searchInput ? searchInput.value : '');
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const activeCat = document.querySelector('.rail-menu-btn.active')?.getAttribute('data-cat') || 'all';
      renderLinuxCards(activeCat, searchInput.value);
    });
  }

  renderLinuxCards('all', '');
}

function renderLinuxCards(cat, query) {
  const container = document.getElementById('linux-cards-container');
  if (!container) return;

  const q = query.toLowerCase().trim();
  const filtered = LINUX_COMMANDS.filter(c => {
    const matchesCat = cat === 'all' || c.cat === cat;
    const matchesQ = !q || c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.syntax.toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="editorial-card" style="text-align:center; padding:2rem; color:var(--ink-muted);">No commands found matching "${query}".</div>`;
    return;
  }

  container.innerHTML = filtered.map(c => `
    <div class="editorial-card" style="padding: 1.1rem; margin-bottom: 0.85rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
        <span style="font-family:var(--font-mono); font-weight:700; font-size:1.1rem; color:var(--ink-primary);">$ ${c.name}</span>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--ink-muted); text-transform:uppercase;">${c.cat}</span>
      </div>
      <p style="font-size:0.85rem; color:var(--ink-secondary); margin-bottom:0.5rem;">${c.desc}</p>
      <div style="background:var(--bg-glass-subtle); border:1px solid var(--border-subtle); border-radius:var(--radius-xs); padding:0.4rem 0.65rem; font-family:var(--font-mono); font-size:0.8rem; color:var(--ink-primary); margin-bottom:0.5rem;">
        ${c.syntax}
      </div>
      <div style="font-size:0.8rem; color:var(--ink-muted); margin-bottom:0.6rem;">
        <strong>Flags:</strong> ${c.options}
      </div>
      <div>
        <button class="editorial-btn editorial-btn-secondary editorial-btn-sm" onclick="runInTerminal('${c.example}')">
          Execute: <code>${c.example}</code>
        </button>
      </div>
    </div>
  `).join('');
}

function initTerminal() {
  const input = document.getElementById('terminal-cli-input');
  if (!input) return;

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const v = input.value.trim();
      if (v) {
        state.terminal.history.push(v);
        state.terminal.historyIndex = state.terminal.history.length;
        execCli(v);
        input.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      if (state.terminal.historyIndex > 0) {
        state.terminal.historyIndex--;
        input.value = state.terminal.history[state.terminal.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (state.terminal.historyIndex < state.terminal.history.length - 1) {
        state.terminal.historyIndex++;
        input.value = state.terminal.history[state.terminal.historyIndex];
      } else {
        state.terminal.historyIndex = state.terminal.history.length;
        input.value = '';
      }
    }
  });
}

function runInTerminal(cmd) {
  const input = document.getElementById('terminal-cli-input');
  if (input) {
    input.value = cmd;
    execCli(cmd);
    input.value = '';
    input.focus();
    document.querySelector('.technical-terminal-chassis')?.scrollIntoView({ behavior: 'smooth' });
  }
}
window.runInTerminal = runInTerminal;

function execCli(fullCmd) {
  const screen = document.getElementById('terminal-screen');
  if (!screen) return;

  const promptRow = document.createElement('div');
  promptRow.style.marginBottom = '0.25rem';
  promptRow.innerHTML = `<span style="color:#38bdf8; font-weight:700;">sysadmin@kernel-lab:${state.terminal.currentDir}$</span> <span>${escapeHtml(fullCmd)}</span>`;
  screen.appendChild(promptRow);

  const parts = fullCmd.split('|').map(p => p.trim());
  let output = '';

  if (parts.length > 1) {
    const firstOut = runInternalCli(parts[0]);
    if (parts[1].startsWith('grep')) {
      const pat = parts[1].replace('grep', '').replace(/['"-i]/g, '').trim();
      const lines = firstOut.split('\n').filter(l => l.toLowerCase().includes(pat.toLowerCase()));
      output = lines.join('\n') || `[grep: no lines matching '${pat}']`;
    } else if (parts[1].startsWith('wc')) {
      const cnt = firstOut.split('\n').filter(Boolean).length;
      output = `     ${cnt} lines`;
    } else {
      output = firstOut;
    }
  } else {
    output = runInternalCli(parts[0]);
  }

  if (output === '__CLEAR__') {
    screen.innerHTML = '';
    return;
  }

  const outRow = document.createElement('div');
  outRow.style.color = '#a8a8a2';
  outRow.style.marginBottom = '0.5rem';
  outRow.style.whiteSpace = 'pre-wrap';
  outRow.innerHTML = output;
  screen.appendChild(outRow);
  screen.scrollTop = screen.scrollHeight;
}

function resolvePath(dir, target) {
  if (!target || target === '~') return '/home/sysadmin';
  if (target === '/home/sysadmin') return '/home/sysadmin';
  if (target === '..') return '/home/sysadmin';
  if (target.startsWith('/')) return target;
  return `${dir}/${target}`.replace(/\/+/g, '/');
}

function pathExists(p) {
  return state.terminal.files[p] !== undefined || state.terminal.fileContents[p] !== undefined;
}

function runInternalCli(cmdStr) {
  const tokens = cmdStr.split(/\s+/);
  const cmd = tokens[0].toLowerCase();
  const args = tokens.slice(1);

  switch (cmd) {
    case 'clear': return '__CLEAR__';
    case 'help': return 'Commands: ls, pwd, cd, cat, touch, mkdir, rm, cp, mv, chmod, chown, grep, ps, top, kill, pkill, df, free, du, uname, uptime, whoami, id, wc, date, ping, find, head, tail, history, man, alias, unalias, echo, clear, apt, apt-get, systemctl, service, ifconfig, ip, netstat, ss, route, ssh, scp, rsync, tar, gzip, gunzip, zip, unzip, nano, vim, crontab, at, useradd, userdel, usermod, passwd, su, sudo, mount, umount, fdisk, lsblk, mkfs, fsck, dmesg, lspci, lsusb, lscpu, lshw, hostnamectl, timedatectl, iptables, ufw, diff, sed, awk, cut, tr, xargs, tee, nohup, jobs, bg, fg, less, more, sort, uniq\nPiping: ps aux | grep root, cat system.log | grep CPU, ls -lah | grep .sh';
    case 'pwd': return escapeHtml(state.terminal.currentDir);

    case 'ls': {
      const dir = state.terminal.currentDir;
      const files = state.terminal.files[dir] || [];
      if (args.includes('-l') || args.includes('-lah') || args.includes('-la')) {
        const lines = files.map(f => {
          const isDir = state.terminal.files[`${dir}/${f}`] !== undefined;
          const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
          return `${perms} 1 sysadmin sysadmin 4096 Oct 27 19:40 ${f}`;
        });
        return `total ${files.length * 4}K\n${lines.join('\n')}`;
      }
      return files.join('   ');
    }

    case 'cd': {
      const t = args[0] || '~';
      const target = resolvePath(state.terminal.currentDir, t);
      if (target === '/home/sysadmin' || t === '~' || t === '/home/sysadmin') {
        state.terminal.currentDir = '/home/sysadmin';
        return '';
      }
      if (t === '..') {
        state.terminal.currentDir = '/home/sysadmin';
        return '';
      }
      if (pathExists(target) && state.terminal.files[target] !== undefined) {
        state.terminal.currentDir = target;
        return '';
      }
      return `<span style="color:#f87171;">cd: no such file or directory: ${escapeHtml(t)}</span>`;
    }

    case 'cat': {
      const fn = args[0];
      if (!fn) return '<span style="color:#f87171;">cat: missing operand</span>';
      const p = resolvePath(state.terminal.currentDir, fn);
      if (state.terminal.fileContents[p]) return escapeHtml(state.terminal.fileContents[p]);
      return `<span style="color:#f87171;">cat: ${escapeHtml(fn)}: No such file</span>`;
    }

    case 'touch': {
      if (args.length === 0) return '<span style="color:#f87171;">touch: missing file operand</span>';
      const dir = state.terminal.currentDir;
      args.forEach(fn => {
        const p = resolvePath(dir, fn);
        if (!state.terminal.fileContents[p]) {
          state.terminal.fileContents[p] = '';
        }
        if (state.terminal.files[dir] && !state.terminal.files[dir].includes(fn)) {
          state.terminal.files[dir].push(fn);
        } else if (!state.terminal.files[dir]) {
          state.terminal.files[dir] = [fn];
        }
      });
      return '';
    }

    case 'mkdir': {
      if (args.length === 0) return '<span style="color:#f87171;">mkdir: missing operand</span>';
      const dir = state.terminal.currentDir;
      args.forEach(d => {
        const p = resolvePath(dir, d);
        if (!state.terminal.files[p]) {
          state.terminal.files[p] = [];
        }
        if (!state.terminal.files[dir].includes(d)) {
          state.terminal.files[dir].push(d);
        }
      });
      return '';
    }

    case 'rm': {
      if (args.length === 0) return '<span style="color:#f87171;">rm: missing operand</span>';
      const dir = state.terminal.currentDir;
      const recursive = args.includes('-r') || args.includes('-R');
      const force = args.includes('-f');
      const targets = args.filter(a => a !== '-r' && a !== '-R' && a !== '-f' && !a.startsWith('-'));
      targets.forEach(t => {
        const p = resolvePath(dir, t);
        if (state.terminal.files[p] !== undefined) {
          if (state.terminal.files[p].length > 0 && !recursive) {
            if (!force) return `<span style="color:#f87171;">rm: cannot remove '${t}': Is a directory</span>`;
          }
          delete state.terminal.files[p];
          delete state.terminal.fileContents[p];
          const parent = state.terminal.files[dir];
          if (parent) {
            const idx = parent.indexOf(t);
            if (idx > -1) parent.splice(idx, 1);
          }
        } else if (state.terminal.fileContents[p] !== undefined) {
          delete state.terminal.fileContents[p];
          const parent = state.terminal.files[dir];
          if (parent) {
            const idx = parent.indexOf(t);
            if (idx > -1) parent.splice(idx, 1);
          }
        } else if (!force) {
          return `<span style="color:#f87171;">rm: cannot remove '${t}': No such file or directory</span>`;
        }
      });
      return '';
    }

    case 'cp': {
      if (args.length < 2) return '<span style="color:#f87171;">cp: missing file operand</span>';
      const recursive = args.includes('-r') || args.includes('-R');
      const targets = args.filter(a => !a.startsWith('-'));
      if (targets.length < 2) return '<span style="color:#f87171;">cp: missing destination file operand</span>';
      const dir = state.terminal.currentDir;
      const src = resolvePath(dir, targets[0]);
      const dst = resolvePath(dir, targets[1]);
      if (state.terminal.fileContents[src] !== undefined) {
        state.terminal.fileContents[dst] = state.terminal.fileContents[src];
        const dstDir = dst.substring(0, dst.lastIndexOf('/'));
        const dstName = dst.substring(dst.lastIndexOf('/') + 1);
        if (!state.terminal.files[dstDir]) state.terminal.files[dstDir] = [];
        if (!state.terminal.files[dstDir].includes(dstName)) state.terminal.files[dstDir].push(dstName);
      } else if (state.terminal.files[src] !== undefined && recursive) {
        state.terminal.files[dst] = [...(state.terminal.files[src] || [])];
      } else {
        return `<span style="color:#f87171;">cp: cannot stat '${targets[0]}': No such file or directory</span>`;
      }
      return '';
    }

    case 'mv': {
      if (args.length < 2) return '<span style="color:#f87171;">mv: missing file operand</span>';
      const dir = state.terminal.currentDir;
      const src = resolvePath(dir, args[0]);
      const dst = resolvePath(dir, args[1]);
      if (state.terminal.fileContents[src] !== undefined) {
        state.terminal.fileContents[dst] = state.terminal.fileContents[src];
        delete state.terminal.fileContents[src];
      } else if (state.terminal.files[src] !== undefined) {
        state.terminal.files[dst] = state.terminal.files[src];
        delete state.terminal.files[src];
      } else {
        return `<span style="color:#f87171;">mv: cannot stat '${args[0]}': No such file or directory</span>`;
      }
      const srcDir = state.terminal.files[dir];
      if (srcDir) {
        const sIdx = srcDir.indexOf(args[0]);
        if (sIdx > -1) srcDir.splice(sIdx, 1);
      }
      const dstDirName = dst.substring(0, dst.lastIndexOf('/'));
      const dstName = dst.substring(dst.lastIndexOf('/') + 1);
      if (!state.terminal.files[dstDirName]) state.terminal.files[dstDirName] = [];
      if (!state.terminal.files[dstDirName].includes(dstName)) state.terminal.files[dstDirName].push(dstName);
      return '';
    }

    case 'chmod': {
      if (args.length < 2) return '<span style="color:#f87171;">chmod: missing operand</span>';
      const dir = state.terminal.currentDir;
      const p = resolvePath(dir, args[1]);
      if (state.terminal.fileContents[p] !== undefined || state.terminal.files[p] !== undefined) {
        return `<span style="color:#38bdf8;">chmod: mode ${args[0]} changed for '${escapeHtml(args[1])}'</span>`;
      }
      return `<span style="color:#f87171;">chmod: cannot access '${args[1]}': No such file or directory</span>`;
    }

    case 'chown': {
      if (args.length < 2) return '<span style="color:#f87171;">chown: missing operand</span>';
      const dir = state.terminal.currentDir;
      const p = resolvePath(dir, args[args.length - 1]);
      if (state.terminal.fileContents[p] !== undefined || state.terminal.files[p] !== undefined) {
        return `<span style="color:#38bdf8;">chown: owner changed for '${escapeHtml(args[args.length - 1])}'</span>`;
      }
      return `<span style="color:#f87171;">chown: cannot access '${args[args.length - 1]}': No such file or directory</span>`;
    }

    case 'whoami': return 'sysadmin';
    case 'id': return 'uid=1000(sysadmin) gid=1000(sysadmin) groups=1000(sysadmin),27(sudo),100(users)';
    case 'uname': return args.includes('-a') ? 'Linux kernel-lab 5.15.0-x86_64 #2026 SMP GNU/Linux' : 'Linux';
    case 'uptime': return ' 19:40:12 up 14 days,  4:20,  1 user,  load average: 0.08, 0.05, 0.02';
    case 'free': return `               total        used        free      shared  buff/cache   available\nMem:        16384210     4120340     9142850      245000     3121020    11842870\nSwap:        4194300           0     4194300`;
    case 'df': return `Filesystem     1K-blocks      Used Available Use% Mounted on\n/dev/sda1       51474044  14285920  34548324  30% /\n/dev/sda2       99932140  42104520  52707620  45% /home`;
    case 'du': {
      const dir = state.terminal.currentDir;
      const files = state.terminal.files[dir] || [];
      if (files.length === 0) return '0';
      return files.map(f => `4096\t${f}`).join('\n');
    }
    case 'ps': return `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1 169344 13240 ?        Ss   09:00   0:02 /sbin/init\nsysadmin  1402  0.5  0.8 712340 68420 pts/0    S+   18:25   0:01 node server.js\nsysadmin  1420  0.2  0.4 214500 32100 pts/0    R+   18:30   0:00 ps aux`;
    case 'top': return `top - 19:40:12 up 14 days, 4:20, 1 user, load average: 0.08, 0.05, 0.02\nTasks: 2 total, 1 running, 1 sleeping, 0 stopped, 0 zombie\n%Cpu(s):  2.5 us, 1.0 sy,  0.0 ni, 96.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st\nMiB Mem:  16384.0 total, 4120.3 used, 9142.8 free,  245.0 buff/cache\nMiB Swap:  4194.3 total,   0.0 used, 4194.3 free. 11842.8 avail Mem\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n  1402 sysadmin   20   0  712340  68420  32100 S   0.5   0.8   0:01.01 node server.js\n  1420 sysadmin   20   0  214500  32100  16000 R   0.2   0.4   0:00.02 ps aux`;
    case 'kill': {
      if (args.length === 0) return '<span style="color:#f87171;">kill: usage: kill [-s sigspec] pid...</span>';
      return `<span style="color:#38bdf8;">Terminated process ${escapeHtml(args[0])} (signal 15)</span>`;
    }
    case 'pkill': {
      if (args.length === 0) return '<span style="color:#f87171;">pkill: usage: pkill [pattern]</span>';
      return `<span style="color:#38bdf8;">Killed processes matching '${escapeHtml(args[0])}'</span>`;
    }
    case 'date': return new Date().toString();
    case 'ping': return `PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=12.1 ms\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=11.9 ms\n--- 8.8.8.8 ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss`;
    case 'find': {
      const dir = state.terminal.currentDir;
      const patternIdx = args.findIndex(a => a === '-name' || a === '-iname');
      const pattern = patternIdx > -1 ? args[patternIdx + 1] : '';
      const allFiles = [];
      const walk = (d) => {
        const entries = state.terminal.files[d] || [];
        entries.forEach(e => allFiles.push(`${d}/${e}`));
        entries.forEach(e => {
          const p = `${d}/${e}`;
          if (state.terminal.files[p] !== undefined) walk(p);
        });
      };
      walk(dir);
      if (pattern) {
        const re = new RegExp(pattern.replace(/\*/g, '.*').replace(/\?/g, '.'), 'i');
        return allFiles.filter(f => re.test(f.split('/').pop())).join('\n') || '<span style="color:#64748b;">No matches found.</span>';
      }
      return allFiles.join('\n') || '<span style="color:#64748b;">No files found.</span>';
    }
    case 'head': {
      const n = args.findIndex(a => a === '-n') > -1 ? parseInt(args[args.indexOf('-n') + 1], 10) || 10 : 10;
      const fn = args.find(a => !a.startsWith('-'));
      if (!fn) return '<span style="color:#f87171;">head: missing file operand</span>';
      const p = resolvePath(state.terminal.currentDir, fn);
      const content = state.terminal.fileContents[p];
      if (!content) return `<span style="color:#f87171;">head: cannot open '${fn}' for reading: No such file</span>`;
      return content.split('\n').slice(0, n).join('\n');
    }
    case 'tail': {
      const n = args.findIndex(a => a === '-n') > -1 ? parseInt(args[args.indexOf('-n') + 1], 10) || 10 : 10;
      const fn = args.find(a => !a.startsWith('-'));
      if (!fn) return '<span style="color:#f87171;">tail: missing file operand</span>';
      const p = resolvePath(state.terminal.currentDir, fn);
      const content = state.terminal.fileContents[p];
      if (!content) return `<span style="color:#f87171;">tail: cannot open '${fn}' for reading: No such file</span>`;
      return content.split('\n').slice(-n).join('\n');
    }
    case 'wc': {
      const fn = args.find(a => !a.startsWith('-'));
      const flag = args.find(a => a === '-l' || a === '-w' || a === '-c');
      if (!fn) return '<span style="color:#f87171;">wc: missing file operand</span>';
      const p = resolvePath(state.terminal.currentDir, fn);
      const content = state.terminal.fileContents[p];
      if (!content) return `<span style="color:#f87171;">wc: cannot open '${fn}': No such file</span>`;
      const lines = content.split('\n').length;
      const words = content.split(/\s+/).filter(Boolean).length;
      const bytes = content.length;
      if (flag === '-l') return `${lines} ${fn}`;
      if (flag === '-w') return `${words} ${fn}`;
      if (flag === '-c') return `${bytes} ${fn}`;
      return `${lines}  ${words}  ${bytes} ${fn}`;
    }
    case 'sort': {
      const fn = args.find(a => !a.startsWith('-'));
      if (!fn) return '<span style="color:#f87171;">sort: missing file operand</span>';
      const p = resolvePath(state.terminal.currentDir, fn);
      const content = state.terminal.fileContents[p];
      if (!content) return `<span style="color:#f87171;">sort: cannot open '${fn}': No such file</span>`;
      return content.split('\n').sort().join('\n');
    }
    case 'uniq': {
      const fn = args.find(a => !a.startsWith('-'));
      if (!fn) return '<span style="color:#f87171;">uniq: missing file operand</span>';
      const p = resolvePath(state.terminal.currentDir, fn);
      const content = state.terminal.fileContents[p];
      if (!content) return `<span style="color:#f87171;">uniq: cannot open '${fn}': No such file</span>`;
      const lines = content.split('\n');
      const result = [];
      lines.forEach((l, i) => { if (i === 0 || l !== lines[i - 1]) result.push(l); });
      return result.join('\n');
    }
    case 'history': {
      if (args.includes('-c')) {
        state.terminal.history = [];
        return '';
      }
      if (state.terminal.history.length === 0) return '<span style="color:#64748b;">No commands in history.</span>';
      return state.terminal.history.map((h, i) => `${i + 1}  ${h}`).join('\n');
    }
    case 'man': {
      const cmd = args[0];
      if (!cmd) return '<span style="color:#f87171;">man: what manual page do you want?</span>';
      const manuals = {
        ls: 'NAME\n       ls - list directory contents\nSYNOPSIS\n       ls [OPTION]... [FILE]...\nDESCRIPTION\n       List information about the FILEs.\n\n  -a         do not ignore entries starting with .\n  -l         use a long listing format\n  -h         print human readable sizes',
        ps: 'NAME\n       ps - report a snapshot of the current processes\nSYNOPSIS\n       ps [OPTIONS]\nDESCRIPTION\n       ps gives a snapshot of the current processes.\n\n  -ef      full-format listing\n  -aux     BSD format listing\n  -u user  show processes for a user',
        grep: 'NAME\n       grep - print lines matching a pattern\nSYNOPSIS\n       grep [OPTIONS] PATTERN [FILE...]\nDESCRIPTION\n       grep searches for PATTERN in each FILE.\n\n  -i       ignore case distinctions\n  -n       print line number with output lines',
        chmod: 'NAME\n       chmod - change file mode bits\nSYNOPSIS\n       chmod [OPTIONS] MODE FILE...\nDESCRIPTION\n       chmod changes the file mode bits.\n\n  755      rwxr-xr-x\n  644      rw-r--r--\n  +x       add execute permission',
        df: 'NAME\n       df - report file system disk space usage\nSYNOPSIS\n       df [OPTION]... [FILE]...\nDESCRIPTION\n       Display disk space available.\n\n  -h       print sizes in human readable format',
        kill: 'NAME\n       kill - terminate a process\nSYNOPSIS\n       kill [OPTIONS] PID...\nDESCRIPTION\n       The default signal for kill is TERM.\n\n  -9       SIGKILL - immediate termination\n  -15      SIGTERM - graceful termination',
        uname: 'NAME\n       uname - print system information\nSYNOPSIS\n       uname [OPTION]...\nDESCRIPTION\n       Print system information.\n\n  -a       print all information',
      };
      const entry = manuals[cmd];
      if (entry) return entry;
      return `<span style="color:#f87171;">man: no manual entry for ${escapeHtml(cmd)}</span>`;
    }
    case 'alias': {
      if (args.length === 0) return '<span style="color:#64748b;">No aliases defined.</span>';
      state.terminal.aliases = state.terminal.aliases || {};
      if (args.length === 1) {
        const val = state.terminal.aliases[args[0]];
        return val ? `${args[0]}='${val}'` : `<span style="color:#f87171;">alias: ${args[0]}: not found</span>`;
      }
      state.terminal.aliases[args[0]] = args.slice(1).join(' ');
      return `<span style="color:#38bdf8;">alias created: ${args[0]}</span>`;
    }
    case 'unalias': {
      if (args.length === 0) return '<span style="color:#f87171;">unalias: usage: unalias name</span>';
      state.terminal.aliases = state.terminal.aliases || {};
      if (state.terminal.aliases[args[0]]) {
        delete state.terminal.aliases[args[0]];
        return `<span style="color:#38bdf8;">unalias: ${args[0]} removed</span>`;
      }
      return `<span style="color:#f87171;">unalias: ${args[0]}: not found</span>`;
    }
    case 'echo': {
      return args.join(' ');
    }

    case 'apt': case 'apt-get': {
      if (args.length === 0) return '<span style="color:#f87171;">apt: usage: apt [install|remove|update|upgrade|search] [package]</span>';
      const sub = args[0];
      const pkg = args[1] || '';
      const msgs = {
        install: '<span style="color:#38bdf8;">Reading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  ' + pkg + '\n0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.\nNeed to get 124 kB of archives.\nAfter this operation, 512 kB of additional disk space will be used.\nGet:1 http://archive.ubuntu.com/ubuntu jammy/main amd64 ' + pkg + ' amd64 1.0-1 [124 kB]\nFetched 124 kB in 0s (1.2 MB/s)\nSelecting previously unselected package ' + pkg + '.\n(Reading database ... 156789 files and directories currently installed.)\nPreparing to unpack .../' + pkg + '_1.0-1_amd64.deb\nUnpacking ' + pkg + ' (1.0-1) ...\nSetting up ' + pkg + ' (1.0-1) ...</span>',
        remove: '<span style="color:#38bdf8;">Reading package lists... Done\nBuilding dependency tree... Done\nThe following packages will be REMOVED:\n  ' + pkg + '\n0 upgraded, 0 newly installed, 1 to remove and 0 not upgraded.\nAfter this operation, 512 kB of disk space will be freed.\n(Reading database ... 156789 files and directories currently installed.)\nRemoving ' + pkg + ' (1.0-1) ...\nProcessing triggers for man-db (2.10.2-1).</span>',
        update: '<span style="color:#38bdf8;">Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease\nHit:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease\nHit:3 http://archive.ubuntu.com/ubuntu jammy-backports InRelease\nReading package lists... Done</span>',
        upgrade: '<span style="color:#38bdf8;">Reading package lists... Done\nBuilding dependency tree... Done\nCalculating upgrade... Done\n0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.</span>',
        search: '<span style="color:#38bdf8;">Sorting... Done\nFull Text Search... Done\n' + pkg + '/jammy 1.0-1 amd64\n  Description of ' + pkg + '</span>',
      };
      return msgs[sub] || '<span style="color:#f87171;">apt: unknown sub-command ' + escapeHtml(sub) + '. Try install, remove, update, upgrade, search.</span>';
    }
    case 'systemctl': {
      if (args.length === 0) return '<span style="color:#f87171;">systemctl: usage: systemctl [start|stop|restart|status|enable|disable] [unit]</span>';
      const sub = args[0];
      const unit = args[1] || '';
      const msgs = {
        start: '<span style="color:#38bdf8;">Started ' + unit + '.</span>',
        stop: '<span style="color:#38bdf8;">Stopped ' + unit + '.</span>',
        restart: '<span style="color:#38bdf8;">Restarted ' + unit + '.</span>',
        status: '<span style="color:#38bdf8;">● ' + unit + ' - Unit description\n     Loaded: loaded (/lib/systemd/system/' + unit + '.service; enabled; preset: enabled)\n     Active: active (running) since Mon 2026-10-28 10:00:00 IST; 2h ago\n   Main PID: 1024 (' + unit + ')</span>',
        enable: '<span style="color:#38bdf8;">Created symlink /etc/systemd/system/multi-user.target.wants/' + unit + '. → /lib/systemd/system/' + unit + '.service.</span>',
        disable: '<span style="color:#38bdf8;">Removed symlink /etc/systemd/system/multi-user.target.wants/' + unit + '. → /lib/systemd/system/' + unit + '.service.</span>',
      };
      return msgs[sub] || '<span style="color:#f87171;">systemctl: unknown sub-command ' + escapeHtml(sub) + '.</span>';
    }
    case 'service': {
      if (args.length === 0) return '<span style="color:#f87171;">service: usage: service [start|stop|restart|status] [name]</span>';
      return '<span style="color:#38bdf8;">' + (args[0] || 'service') + ' ' + (args[1] || '') + ' operation completed.</span>';
    }
    case 'ifconfig': case 'ip': {
      if (cmd === 'ip' && args[0] === 'addr') {
        return '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000\n    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n    inet 127.0.0.1/8 scope host lo\n       valid_lft forever preferred_lft forever\n    inet6 ::1/128 scope host\n       valid_lft forever preferred_lft forever\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000\n    link/ether 08:00:27:ab:cd:ef brd ff:ff:ff:ff:ff:ff\n    inet 192.168.1.45/24 brd 192.168.1.255 scope global dynamic eth0\n       valid_lft 85992sec preferred_lft 85992sec\n    inet6 fe80::a00:27ff:feab:cdef/64 scope link\n       valid_lft forever preferred_lft forever';
      }
      return 'eth0      Link encap:Ethernet  HWaddr 08:00:27:AB:CD:EF\n          inet addr:192.168.1.45  Bcast:192.168.1.255  Mask:255.255.255.0\n          inet6 addr: fe80::a00:27ff:feab:cdef/64 Scope:Link\n          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1\n          RX packets:15234 errors:0 dropped:0 overruns:0 frame:0\n          TX packets:8921 errors:0 dropped:0 overruns:0 carrier:0\n          collisions:0 txqueuelen:1000\n          RX bytes:12345678 (12.3 MB)  TX bytes:8765432 (8.8 MB)\n\nlo        Link encap:Local Loopback\n          inet addr:127.0.0.1  Mask:255.0.0.0\n          inet6 addr: ::1/128 Scope:Host\n          UP LOOPBACK RUNNING  MTU:65536  Metric:1\n          RX packets:0 errors:0 dropped:0 overruns:0 frame:0\n          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0\n          collisions:0 txqueuelen:1000\n          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)';
    }
    case 'netstat': case 'ss': {
      return 'Active Internet connections (w/o servers)\nProto Recv-Q Send-Q Local Address           Foreign Address         State\ntcp        0      0 192.168.1.45:22       192.168.1.100:53421     ESTABLISHED\ntcp        0      0 0.0.0.0:80            0.0.0.0:*               LISTEN\ntcp        0      0 0.0.0.0:22            0.0.0.0:*               LISTEN\ntcp6       0      0 :::80                 :::*                    LISTEN\ntcp6       0      0 :::22                 :::*                    LISTEN\n\nActive UNIX domain sockets (w/o servers)\nProto RefCnt Flags       Type       State         I-Node Path\nunix  2      [ ACC ]     STREAM     LISTENING     1234   /var/run/dbus/system_bus_socket';
    }
    case 'route': {
      return 'Kernel IP routing table\nDestination     Gateway         Genmask         Flags Metric Ref    Use Iface\n0.0.0.0         192.168.1.1     0.0.0.0         UG    0      0        0 eth0\n192.168.1.0     0.0.0.0         255.255.255.0   U     0      0        0 eth0';
    }
    case 'ssh': {
      if (args.length === 0) return '<span style="color:#f87171;">ssh: usage: ssh [user@]hostname</span>';
      return '<span style="color:#38bdf8;">The authenticity of host ' + escapeHtml(args[0]) + ' (192.168.1.50) can\'t be established.\nRSA key fingerprint is SHA256:abc123def456.\nAre you sure you want to continue connecting (yes/no/[fingerprint])?</span>';
    }
    case 'scp': {
      if (args.length < 2) return '<span style="color:#f87171;">scp: usage: scp [source] [destination]</span>';
      return '<span style="color:#38bdf8;">' + escapeHtml(args[0]) + ' 100% 1024   1.2MB/s   00:00</span>';
    }
    case 'rsync': {
      if (args.length < 2) return '<span style="color:#f87171;">rsync: usage: rsync [options] [source] [destination]</span>';
      return '<span style="color:#38bdf8;">sent 1,024 bytes  received 42 bytes  2,132.00 bytes/sec\ntotal size is 512  speedup is 0.48</span>';
    }
    case 'tar': {
      if (args.length === 0) return '<span style="color:#f87171;">tar: usage: tar [options] [archive] [files...]</span>';
      const hasCreate = args.includes('-c') || args.includes('--create');
      const hasExtract = args.includes('-x') || args.includes('--extract');
      const hasList = args.includes('-t') || args.includes('--list');
      if (hasExtract) return '<span style="color:#38bdf8;">x archive.tar\n  file1.txt\n  file2.txt\n  directory/</span>';
      if (hasList) return '<span style="color:#38bdf8;">file1.txt\nfile2.txt\ndirectory/</span>';
      return '<span style="color:#38bdf8;">tar: Removing leading \'\'\' from member names</span>';
    }
    case 'gzip': case 'gunzip': {
      if (args.length === 0) return '<span style="color:#f87171;">' + cmd + ': usage: ' + cmd + ' [file...]</span>';
      return '<span style="color:#38bdf8;">' + cmd + ': compressed ' + args.join(', ') + '</span>';
    }
    case 'zip': case 'unzip': {
      if (args.length === 0) return '<span style="color:#f87171;">' + cmd + ': usage: ' + cmd + ' [archive] [files...]</span>';
      return '<span style="color:#38bdf8;">' + cmd + ': ' + args.join(' ') + ' processed successfully.</span>';
    }
    case 'nano': case 'vim': case 'emacs': {
      const fn = args[0] || 'file.txt';
      return '<span style="color:#38bdf8;">' + cmd + ': opening ' + escapeHtml(fn) + ' (editor simulation - use the file system to create files instead)</span>';
    }
    case 'crontab': {
      if (args.includes('-l')) return '# Edit this file to introduce tasks to be run by cron.\n# m h dom mon dow  command\n0 2 * * * /usr/bin/backup.sh\n30 3 * * 0 /usr/bin/cleanup.sh';
      if (args.includes('-e')) return '<span style="color:#38bdf8;">crontab: installing new crontab</span>';
      return '<span style="color:#f87171;">crontab: usage: crontab [-l|-e|-r]</span>';
    }
    case 'at': {
      if (args.length === 0) return '<span style="color:#f87171;">at: usage: at [time]</span>';
      return '<span style="color:#38bdf8;">warning: commands will be executed using /bin/sh\njob 1 at Mon Oct 28 14:00:00 2026</span>';
    }
    case 'useradd': case 'userdel': case 'usermod': {
      if (args.length === 0) return '<span style="color:#f87171;">' + cmd + ': missing operand</span>';
      return '<span style="color:#38bdf8;">' + cmd + ': user ' + escapeHtml(args[0]) + ' processed.</span>';
    }
    case 'passwd': {
      const user = args[0] || 'sysadmin';
      return '<span style="color:#38bdf8;">Changing password for user ' + escapeHtml(user) + '.\nNew password: \nRetype new password: \npasswd: password updated successfully</span>';
    }
    case 'su': {
      const user = args[0] || 'root';
      return '<span style="color:#38bdf8;">Password: </span><span style="color:#64748b;">(hidden input simulation)</span>';
    }
    case 'sudo': {
      if (args.length === 0) return '<span style="color:#f87171;">sudo: usage: sudo [command]</span>';
      return '<span style="color:#38bdf8;">[sudo] password for sysadmin: </span><span style="color:#64748b;">(hidden)</span>\n<span style="color:#38bdf8;">Executing: ' + args.join(' ') + '</span>';
    }
    case 'mount': case 'umount': {
      if (args.length === 0) return 'sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime)\nproc on /proc type proc (rw,nosuid,nodev,noexec,relatime)\nudev on /dev type devtmpfs (rw,nosuid,relatime,size=8192k,nr_inodes=2048,mode=755)\n/dev/sda1 on / type ext4 (rw,relatime,errors=remount-ro)\n/dev/sda2 on /home type ext4 (rw,relatime)';
      return '<span style="color:#38bdf8;">' + cmd + ': ' + args.join(' ') + ' processed.</span>';
    }
    case 'fdisk': case 'lsblk': {
      if (cmd === 'lsblk') return 'NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsda      8:0    0   50G  0 disk\n├─sda1   8:1    0   50G  0 part /\n└─sda2   8:2    0  100G  0 part /home\nsr0     11:0    1 1024M  0 rom';
      return '<span style="color:#f87171;">fdisk: cannot open /dev/sda: Permission denied</span>';
    }
    case 'mkfs': case 'fsck': {
      if (args.length === 0) return '<span style="color:#f87171;">' + cmd + ': missing operand</span>';
      return '<span style="color:#38bdf8;">' + cmd + ': checking ' + escapeHtml(args[0]) + ' - filesystem is clean.</span>';
    }
    case 'dmesg': {
      return '[    0.000000] Linux version 5.15.0-x86_64 (gcc version 11.2.0) #2026 SMP\n[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0\n[    0.000000] x86/fpu: Supporting XSAVE feature 0x001: \'x87 floating point registers\'\n[    0.000000] x86/fpu: Supporting XSAVE feature 0x002: \'SSE registers\'\n[    0.000000] BIOS-provided physical RAM map:\n[    0.000000]  BIOS-e820: [mem 0x0000000000000000-0x000000000009ffff] usable';
    }
    case 'lspci': case 'lsusb': case 'lscpu': case 'lshw': {
      if (cmd === 'lscpu') return 'Architecture:                    x86_64\nCPU op-mode(s):              32-bit, 64-bit\nByte Order:                  Little Endian\nCPU(s):                          4\nOn-line CPU(s) list:         0-3\nThread(s) per core:    2\nCore(s) per socket:    2\nSocket(s):                   1\nVendor ID:                   GenuineIntel\nCPU family:                  6\nModel:                         158\nModel name:              Intel(R) Core(TM) i7-10700 CPU @ 2.90GHz\nCPU max MHz:                4800.0000\nCPU min MHz:                 800.0000';
      if (cmd === 'lspci') return '00:00.0 Host bridge: Intel Corporation 440FX\n00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA\n00:02.0 VGA compatible controller: Red Hat, Inc. QXL paravirtual graphic card\n00:03.0 Ethernet controller: Red Hat, Inc. Virtio network device';
      if (cmd === 'lsusb') return 'Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub\nBus 002 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub';
      return '<span style="color:#38bdf8;">' + cmd + ': hardware information displayed above.</span>';
    }
    case 'hostnamectl': {
      return '   Static hostname: os-workstation\n         Icon name: computer\n           Chassis: vm\n    Machine ID: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6\n        Boot ID: f1e2d3c4b5a697887766554433221100\n    Virtualization: kvm\n  Operating System: Ubuntu 22.04 LTS\n          Kernel: Linux 5.15.0-x86_64\n    Architecture: x86-64';
    }
    case 'timedatectl': {
      return '               Local time: Wed 2026-10-28 10:00:00 IST\n           Universal time: Wed 2026-10-28 04:30:00 UTC\n                 RTC time: Wed 2026-10-28 04:30:00\n                Time zone: Asia/Kolkata (IST, +0530)\nSystem clock synchronized: yes\n              NTP service: active\n          RTC in local TZ: no';
    }
    case 'iptables': case 'ufw': {
      if (cmd === 'ufw' && args.includes('status')) return 'Status: active\n\nTo                         Action      From\n--                         ------      ----\n22/tcp                     ALLOW       Anywhere\n80/tcp                     ALLOW       Anywhere\n443/tcp                    ALLOW       Anywhere';
      return '<span style="color:#38bdf8;">' + cmd + ': firewall rules listed above.</span>';
    }
    case 'diff': {
      if (args.length < 2) return '<span style="color:#f87171;">diff: missing file operands</span>';
      return '<span style="color:#f87171;">1c1\n< Hello World\n---\n> Hello Universe</span>';
    }
    case 'sed': {
      if (args.length < 2) return '<span style="color:#f87171;">sed: missing script or file operand</span>';
      return '<span style="color:#38bdf8;">sed: stream editor simulation - processed file.</span>';
    }
    case 'awk': {
      if (args.length < 1) return '<span style="color:#f87171;">awk: usage: awk [script] [file]</span>';
      return '<span style="color:#38bdf8;">awk: pattern scanning and processing simulation.</span>';
    }
    case 'cut': {
      if (args.length < 1) return '<span style="color:#f87171;">cut: missing file operand</span>';
      return '<span style="color:#38bdf8;">cut: fields extracted from file.</span>';
    }
    case 'tr': {
      if (args.length < 2) return '<span style="color:#f87171;">tr: missing operand</span>';
      return '<span style="color:#38bdf8;">tr: characters translated.</span>';
    }
    case 'xargs': {
      if (args.length === 0) return '<span style="color:#f87171;">xargs: missing command</span>';
      return '<span style="color:#38bdf8;">xargs: command executed with arguments from stdin.</span>';
    }
    case 'tee': {
      if (args.length === 0) return '<span style="color:#f87171;">tee: missing file operand</span>';
      return '<span style="color:#38bdf8;">tee: output written to file and stdout.</span>';
    }
    case 'nohup': {
      if (args.length === 0) return '<span style="color:#f87171;">nohup: missing command</span>';
      return '<span style="color:#38bdf8;">nohup: ignoring input and appending output to nohup.out\nExecuting: ' + args.join(' ') + '</span>';
    }
    case 'jobs': case 'bg': case 'fg': {
      return '<span style="color:#38bdf8;">' + cmd + ': job control simulation - no background jobs.</span>';
    }
    case 'less': case 'more': {
      const fn = args[0] || '';
      if (!fn) return '<span style="color:#f87171;">' + cmd + ': missing file operand</span>';
      const p = resolvePath(state.terminal.currentDir, fn);
      const content = state.terminal.fileContents[p];
      if (!content) return '<span style="color:#f87171;">' + cmd + ': ' + escapeHtml(fn) + ': No such file</span>';
      return content;
    }
    case 'sort': {
      const fn = args.find(a => !a.startsWith('-'));
      if (!fn) return '<span style="color:#f87171;">sort: missing file operand</span>';
      const p = resolvePath(state.terminal.currentDir, fn);
      const content = state.terminal.fileContents[p];
      if (!content) return '<span style="color:#f87171;">sort: cannot open ' + fn + ': No such file</span>';
      return content.split('\n').sort().join('\n');
    }
    case 'uniq': {
      const fn = args.find(a => !a.startsWith('-'));
      if (!fn) return '<span style="color:#f87171;">uniq: missing file operand</span>';
      const p = resolvePath(state.terminal.currentDir, fn);
      const content = state.terminal.fileContents[p];
      if (!content) return '<span style="color:#f87171;">uniq: cannot open ' + fn + ': No such file</span>';
      const lines = content.split('\n');
      const result = [];
      lines.forEach((l, i) => { if (i === 0 || l !== lines[i - 1]) result.push(l); });
      return result.join('\n');
    }

    default: return `<span style="color:#f87171;">${escapeHtml(cmd)}: command not found. Type 'help'.</span>`;
  }
}



// ==============================================================================
// PRINT REPORT: PAGE REPLACEMENT & CPU SCHEDULING
// ==============================================================================

function showPrintReport(title, htmlContent) {
  const container = document.getElementById('print-container');
  if (!container) return;
  container.innerHTML = `<div class="print-report"><h1>${title}</h1>${htmlContent}</div>`;
  container.classList.add('print-active');
  window.print();
  container.classList.remove('print-active');
  container.innerHTML = '';
}

function printPrReport() {
  const res = state.pageReplacement.results;
  if (!res || !res.FIFO) {
    alert('Run a simulation first before printing.');
    return;
  }

  const refStr = state.pageReplacement.referenceString.join(', ');
  const frames = state.pageReplacement.frameCount;

  const printContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Page Replacement Benchmark Report</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #ffffff; color: #0f172a; line-height: 1.5; padding: 2rem; }
        h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.25rem; letter-spacing: -0.02em; }
        h2 { font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 0.75rem; border-bottom: 1px solid #e3e3de; padding-bottom: 0.4rem; }
        p { color: #334155; font-size: 0.9rem; margin-bottom: 0.75rem; }
        .meta { font-size: 0.85rem; color: #64748b; margin-bottom: 1.5rem; border: 1px solid #e3e3de; padding: 0.85rem 1.1rem; background: #f8fafc; border-radius: 6px; }
        table { border-collapse: collapse; width: 100%; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; margin: 1rem 0; }
        th, td { border: 1px solid #cbd5e1; padding: 0.5rem 0.7rem; text-align: left; }
        th { background: #0f172a; color: #ffffff; font-weight: 700; }
        tr:nth-child(even) td { background: #f8fafc; }
        .mono { font-family: 'JetBrains Mono', monospace; font-weight: 700; }
        .fault { color: #991b1b; }
        .hit { color: #166534; }
        .chart-box { margin: 1.5rem 0; border: 1px solid #e3e3de; padding: 1rem; background: #f8fafc; border-radius: 6px; }
        .statement { border-left: 3px solid #1d4ed8; padding-left: 1rem; background: #eff6ff; padding: 0.85rem 1.1rem; margin: 1rem 0; border-radius: 0 6px 6px 0; }
        .no-print { display: none; }
      </style>
    </head>
    <body>
      <h1>Page Replacement Benchmark Report</h1>
      <div class="meta">
        <strong>Reference String:</strong> ${refStr}<br>
        <strong>Physical Frames:</strong> ${frames}<br>
        <strong>Total References:</strong> ${state.pageReplacement.referenceString.length}
      </div>

      <h2>Comparative Performance Summary</h2>
      <table>
        <thead>
          <tr><th>Algorithm</th><th>References</th><th>Frames</th><th>Faults</th><th>Hits</th><th>Hit Ratio</th><th>Fault Ratio</th></tr>
        </thead>
        <tbody>
          ${['Optimal', 'LRU', 'FIFO', 'LFU'].map(k => {
            const r = res[k];
            return `<tr>
              <td>${r.name}</td>
              <td class="mono">${r.pages.length}</td>
              <td class="mono">${r.numFrames}</td>
              <td class="mono fault">${r.faults}</td>
              <td class="mono hit">${r.hits}</td>
              <td class="mono">${r.hitRatio}%</td>
              <td class="mono">${r.faultRatio}%</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>

      <div class="chart-box">
        <h2>Page Faults vs Hits Distribution</h2>
        <svg viewBox="0 0 700 260" style="width:100%; height:100%;">
          <line x1="50" y1="40" x2="660" y2="40" stroke="#e3e3de" stroke-dasharray="3" />
          <line x1="50" y1="120" x2="660" y2="120" stroke="#e3e3de" stroke-dasharray="3" />
          <line x1="50" y1="200" x2="660" y2="200" stroke="#141413" stroke-width="1.5" />
          <g transform="translate(480, 15)">
            <rect x="0" y="0" width="12" height="12" fill="#991b1b" />
            <text x="18" y="10" font-size="11" fill="#4a4a46" font-family="monospace">Faults</text>
            <rect x="80" y="0" width="12" height="12" fill="#166534" />
            <text x="98" y="10" font-size="11" fill="#4a4a46" font-family="monospace">Hits</text>
          </g>
          ${['Optimal', 'LRU', 'FIFO', 'LFU'].map((l, i) => {
            const f = res[l].faults;
            const h = res[l].hits;
            const maxVal = Math.max(
              res.Optimal.faults, res.LRU.faults, res.FIFO.faults, res.LFU.faults,
              res.Optimal.hits, res.LRU.hits, res.FIFO.hits, res.LFU.hits, 1
            ) * 1.25;
            const gx = 75 + i * 145;
            const fH = (f / maxVal) * 160;
            const hH = (h / maxVal) * 160;
            const fy = 200 - fH;
            const hy = 200 - hH;
            return `
              <rect x="${gx}" y="${fy}" width="34" height="${fH}" fill="#991b1b" />
              <text x="${gx + 17}" y="${fy - 5}" font-size="11" font-weight="700" fill="#991b1b" text-anchor="middle" font-family="monospace">${f}</text>
              <rect x="${gx + 38}" y="${hy}" width="34" height="${hH}" fill="#166534" />
              <text x="${gx + 55}" y="${hy - 5}" font-size="11" font-weight="700" fill="#166534" text-anchor="middle" font-family="monospace">${h}</text>
              <text x="${gx + 36}" y="224" font-size="11" font-weight="600" fill="#141413" text-anchor="middle">${l}</text>
            `;
          }).join('')}
        </svg>
      </div>

      <div class="statement">
        <h2 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.4rem; color:#1d4ed8;">Comparative Statement</h2>
        <div style="font-size: 0.9rem; color: #334155; line-height: 1.65;">
          ${document.getElementById('pr-statement-text').innerHTML}
        </div>
      </div>
    </body>
    </html>
  `;

  const temp = document.createElement('div');
  temp.innerHTML = printContent;
  const bodyContent = temp.querySelector('body')?.innerHTML || printContent;
  showPrintReport('Page Replacement Benchmark Report', bodyContent);
}

function printCpuReport() {
  const res = state.cpuScheduling.results;
  if (!res || !res.FCFS) {
    alert('Run a simulation first before printing.');
    return;
  }

  const procs = state.cpuScheduling.processes;
  const q = state.cpuScheduling.timeQuantum;
  const isLowerHigher = state.cpuScheduling.priorityRule === 'lower-is-higher';

  const printContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>CPU Scheduling Benchmark Report</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #ffffff; color: #0f172a; line-height: 1.5; padding: 2rem; }
        h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.25rem; letter-spacing: -0.02em; }
        h2 { font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 0.75rem; border-bottom: 1px solid #e3e3de; padding-bottom: 0.4rem; }
        p { color: #334155; font-size: 0.9rem; margin-bottom: 0.75rem; }
        .meta { font-size: 0.85rem; color: #64748b; margin-bottom: 1.5rem; border: 1px solid #e3e3de; padding: 0.85rem 1.1rem; background: #f8fafc; border-radius: 6px; }
        table { border-collapse: collapse; width: 100%; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; margin: 1rem 0; }
        th, td { border: 1px solid #cbd5e1; padding: 0.5rem 0.7rem; text-align: left; }
        th { background: #0f172a; color: #ffffff; font-weight: 700; }
        tr:nth-child(even) td { background: #f8fafc; }
        .mono { font-family: 'JetBrains Mono', monospace; font-weight: 700; }
        .chart-box { margin: 1.5rem 0; border: 1px solid #e3e3de; padding: 1rem; background: #f8fafc; border-radius: 6px; }
        .statement { border-left: 3px solid #1d4ed8; padding-left: 1rem; background: #eff6ff; padding: 0.85rem 1.1rem; margin: 1rem 0; border-radius: 0 6px 6px 0; }
        .gantt-wrap { margin: 1.5rem 0; border: 1px solid #e3e3de; padding: 1rem; background: #f8fafc; border-radius: 6px; overflow-x: auto; }
        .gantt-bar { display: flex; min-width: 600px; height: 40px; border: 1px solid #94a3b8; border-radius: 3px; overflow: hidden; }
        .gantt-block { display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: #ffffff; position: relative; min-width: 26px; border-right: 1px solid rgba(255,255,255,0.3); }
        .gantt-block.idle { background: repeating-linear-gradient(45deg, #e2e2dd, #e2e2dd 6px, #d4d4ce 6px, #d4d4ce 12px); color: #73736c; }
        .gantt-axis { display: flex; min-width: 600px; height: 20px; margin-top: 4px; position: relative; }
        .axis-tick { position: absolute; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #64748b; transform: translateX(-50%); }
        .no-print { display: none; }
      </style>
    </head>
    <body>
      <h1>CPU Scheduling Benchmark Report</h1>
      <div class="meta">
        <strong>Processes:</strong> ${procs.map(p => `${p.id}(AT=${p.at}, BT=${p.bt}, PR=${p.priority})`).join(', ')}<br>
        <strong>RR Quantum (q):</strong> ${q}<br>
        <strong>Priority Rule:</strong> ${isLowerHigher ? 'Lower Number = Higher Priority' : 'Higher Number = Higher Priority'}
      </div>

      <h2>Scheduling Metrics Summary</h2>
      <table>
        <thead>
          <tr><th>Algorithm</th><th>Total WT</th><th>Avg WT</th><th>Total TAT</th><th>Avg TAT</th><th>Avg RT</th><th>CPU Util</th></tr>
        </thead>
        <tbody>
          ${['SRTF', 'SJF', 'RoundRobin', 'PriorityP', 'PriorityNP', 'FCFS'].map(k => {
            const r = res[k];
            return `<tr>
              <td>${r.name}</td>
              <td class="mono">${r.totalWT}</td>
              <td class="mono">${r.avgWT} ms</td>
              <td class="mono">${r.totalTAT}</td>
              <td class="mono">${r.avgTAT} ms</td>
              <td class="mono">${r.avgRT} ms</td>
              <td class="mono">${r.cpuUtil}%</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>

      <h2>Per-Process Metrics (Active Algorithm: ${res[state.cpuScheduling.activeAlgoKey].name})</h2>
      <table>
        <thead>
          <tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Priority</th><th>Completion</th><th>Turnaround</th><th>Waiting</th><th>Response</th></tr>
        </thead>
        <tbody>
          ${res[state.cpuScheduling.activeAlgoKey].metrics.map(m => `
            <tr>
              <td><strong>${m.id}</strong></td>
              <td class="mono">${m.at}</td>
              <td class="mono">${m.bt}</td>
              <td class="mono">${m.priority}</td>
              <td class="mono">${m.ct}</td>
              <td class="mono">${m.tat}</td>
              <td class="mono">${m.wt}</td>
              <td class="mono">${m.rt}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="chart-box">
        <h2>Average Waiting & Turnaround Times (ms)</h2>
        <svg viewBox="0 0 700 260" style="width:100%; height:100%;">
          <line x1="50" y1="40" x2="660" y2="40" stroke="#e3e3de" stroke-dasharray="3" />
          <line x1="50" y1="120" x2="660" y2="120" stroke="#e3e3de" stroke-dasharray="3" />
          <line x1="50" y1="200" x2="660" y2="200" stroke="#141413" stroke-width="1.5" />
          <g transform="translate(480, 15)">
            <rect x="0" y="0" width="12" height="12" fill="#1d4ed8" />
            <text x="18" y="10" font-size="11" fill="#4a4a46" font-family="monospace">Avg WT</text>
            <rect x="80" y="0" width="12" height="12" fill="#166534" />
            <text x="98" y="10" font-size="11" fill="#4a4a46" font-family="monospace">Avg TAT</text>
          </g>
          ${['SRTF', 'SJF', 'RoundRobin', 'PriorityP', 'PriorityNP', 'FCFS'].map((k, i) => {
            const r = res[k];
            const wt = r.avgWT;
            const tat = r.avgTAT;
            const maxVal = Math.max(
              res.SRTF.avgWT, res.SJF.avgWT, res.RoundRobin.avgWT, res.PriorityP.avgWT, res.PriorityNP.avgWT, res.FCFS.avgWT,
              res.SRTF.avgTAT, res.SJF.avgTAT, res.RoundRobin.avgTAT, res.PriorityP.avgTAT, res.PriorityNP.avgTAT, res.FCFS.avgTAT, 1
            ) * 1.25;
            const gx = 70 + i * 100;
            const wtH = (wt / maxVal) * 160;
            const tatH = (tat / maxVal) * 160;
            const wty = 200 - wtH;
            const taty = 200 - tatH;
            const label = k === 'SRTF' ? 'SRTF' : k === 'SJF' ? 'SJF' : k === 'RoundRobin' ? 'RR' : k === 'PriorityP' ? 'P-Pre' : k === 'PriorityNP' ? 'P-NP' : 'FCFS';
            return `
              <rect x="${gx}" y="${wty}" width="26" height="${wtH}" fill="#1d4ed8" />
              <text x="${gx + 13}" y="${wty - 5}" font-size="10" font-weight="700" fill="#1d4ed8" text-anchor="middle" font-family="monospace">${wt}</text>
              <rect x="${gx + 30}" y="${taty}" width="26" height="${tatH}" fill="#166534" />
              <text x="${gx + 43}" y="${taty - 5}" font-size="10" font-weight="700" fill="#166534" text-anchor="middle" font-family="monospace">${tat}</text>
              <text x="${gx + 28}" y="222" font-size="11" font-weight="600" fill="#141413" text-anchor="middle">${label}</text>
            `;
          }).join('')}
        </svg>
      </div>

      <div class="gantt-wrap">
        <h2>Gantt Execution Timeline</h2>
        <div style="font-size:0.75rem; font-family:'JetBrains Mono', monospace; color:#64748b; margin-bottom:0.4rem;">
          Makespan: ${res[state.cpuScheduling.activeAlgoKey].totalTime} ms &bull; Active Policy: ${res[state.cpuScheduling.activeAlgoKey].name}
        </div>
        <div class="gantt-bar">
          ${res[state.cpuScheduling.activeAlgoKey].gantt.map(blk => {
            const dur = blk.end - blk.start;
            const total = res[state.cpuScheduling.activeAlgoKey].totalTime || 1;
            const pct = (dur / total) * 100;
            const isIdle = blk.id === 'IDLE';
            const bg = isIdle ? '#e2e2dd' : getProcessColor(blk.id, blk.id.charCodeAt(blk.id.length - 1) || 0);
            return `<div class="gantt-block ${isIdle ? 'idle' : ''}" style="width: ${pct}%; background-color: ${isIdle ? '' : bg};">${blk.id}<span style="font-size:0.68rem; opacity:0.85;">(${dur})</span></div>`;
          }).join('')}
        </div>
        <div class="gantt-axis">
          ${res[state.cpuScheduling.activeAlgoKey].gantt.map(blk => {
            const total = res[state.cpuScheduling.activeAlgoKey].totalTime || 1;
            return `<span class="axis-tick" style="left: ${(blk.end / total) * 100}%;">${blk.end}</span>`;
          }).join('')}
          <span class="axis-tick" style="left: 0%;">0</span>
        </div>
      </div>

      <div class="statement">
        <h2 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.4rem; color:#1d4ed8;">Scheduling Comparative Statement</h2>
        <div style="font-size: 0.9rem; color: #334155; line-height: 1.65;">
          ${document.getElementById('cpu-statement-text').innerHTML}
        </div>
      </div>
    </body>
    </html>
  `;

  const temp = document.createElement('div');
  temp.innerHTML = printContent;
  const bodyContent = temp.querySelector('body')?.innerHTML || printContent;
  showPrintReport('CPU Scheduling Benchmark Report', bodyContent);
}

// ==============================================================================
// UTILS
// ==============================================================================

function animateNumber(elementId, startVal, endVal, duration, decimals = 0, suffix = '') {
  const elem = document.getElementById(elementId);
  if (!elem) return;

  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = startVal + (endVal - startVal) * easeProgress;
    elem.textContent = currentVal.toFixed(decimals) + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(s) {
  if (!s) return '';
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
