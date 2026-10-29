# OS Workstation: Systems Benchmark & Algorithmic Analysis Suite
**Operating Systems Subject Microproject (Academic Year 2026)**
**Developed by:** Sarthak Deodhar & Group Members

---

## Project Overview

OS Workstation is a technical Operating Systems simulation and benchmarking workbench designed for academic laboratory demonstration and formal project evaluation. The suite incorporates three core syllabus microproject domains:

1. **Virtual Memory Page Replacement Benchmark & Belady's Anomaly Verification**
   - Implements FIFO, LRU, Optimal (Belady Benchmark), and LFU algorithms.
   - Interactive Belady's Anomaly curve analyzer (testing frames 1 through 7 to plot the anomalous fault spike in FIFO).
   - Step-by-step physical RAM frame register states with cache hit and page fault tags.
   - Comprehensive comparative performance summary and 1-click CSV data export.
   - Print-ready benchmark report with charts and comparative statement.

2. **Multi-Algorithm CPU Scheduling Matrix**
   - Implements FCFS, SJF (Non-preemptive), SRTF (Preemptive SJF), Priority (Non-preemptive & Preemptive), and Round Robin.
   - Interactive multi-process Gantt execution timeline with millisecond tick scale and CPU idle detection.
   - Core metrics calculation (Completion Time, Turnaround Time, Waiting Time, Response Time, CPU Utilization).
   - Comparative bar chart and 1-click CSV data export.
   - Print-ready scheduling report with Gantt timeline and per-process metrics.

3. **Linux Systems Administration Command Hub & POSIX Shell**
   - In-Browser Terminal Simulator: Functional POSIX command shell with persistent virtual filesystem (touch, mkdir, rm, cp, mv, chmod, chown mutate state), permissions testing, system telemetry, and stream piping (`cat | grep`, `ps aux | grep`).
   - Native Shell Script (`linux_guide.sh`): Standalone Bash script with ANSI colored menus for Linux, WSL, or Git Bash.

---

## How to Run the Project

### Method 1: Web Workstation (Recommended for Presentation & Evaluation)
1. Navigate to the project directory:
   `c:\\Users\\sarth\\OneDrive\\Desktop\\OS_Microproject_SarthakDeodhar`
2. Open `index.html` in Google Chrome or Microsoft Edge.
3. The application is completely self-contained and runs 100% offline without requiring Node.js, Python, or external internet access.

### Method 2: Native Linux Shell Script
Run the companion technical reference script in any Linux terminal, WSL, or Git Bash:
```bash
chmod +x linux_guide.sh
./linux_guide.sh
```

---

## Repository Structure

```
OS_Microproject_SarthakDeodhar/
│
├── index.html            # Main Workstation UI with tabbed modules
├── app.js                # Core simulation algorithms, Belady analyzer & terminal engine
├── styles.css            # Swiss editorial light design & formal print stylesheet
├── linux_guide.sh        # Standalone POSIX Bash shell script
├── PROJECT_REPORT.md     # Formal academic microproject report (archived reference)
└── README.md             # Technical documentation
```

---

## Key Experimental Demonstrations for Examiners

1. **Belady's Anomaly Experimental Verification:**
   - On the Page Replacement tab, click **Run Belady Anomaly Test**.
   - Show how FIFO page faults increase from 9 (at 3 frames) to 10 (at 4 frames), whereas stack algorithms (LRU and Optimal) remain strictly non-increasing.

2. **Convoy Effect Demonstration:**
   - On the CPU Scheduling tab, click the **Convoy Effect Test** preset.
   - Highlight how a long initial burst time causes FCFS Average Waiting Time to spike, whereas SJF and SRTF prevent this blockage.

3. **Stream Piping Demonstration:**
   - On the Linux Commands tab, input `ps aux | grep root` or `cat system.log | grep CPU` into the terminal simulator to demonstrate POSIX stream filtering.

4. **Persistent Virtual Filesystem:**
   - On the Linux Commands tab, use `touch`, `mkdir`, `rm`, `cp`, `mv`, `chmod`, `chown` to mutate the virtual filesystem. Changes persist across commands within the session.

5. **Print Benchmark Reports:**
   - On the Page Replacement or CPU Scheduling tab, run a simulation then click **Print Report** to generate a formatted report with charts, metrics, and comparative statement for PDF export or hard copy.