# MICROPROJECT REPORT: OPERATING SYSTEMS

## TITLE OF MICROPROJECT
**A Comprehensive Comparative Analysis of Page Replacement and CPU Scheduling Algorithms with an Interactive Linux Systems Command Guide**

---

### **ACADEMIC DETAILS**
- **Course Name:** Concepts of Operating Systems
- **Course Code:** CSE00150
- **Program:** Integrated B.tech Computer Science Engineering
- **Academic Year:** 2026
- **Student Name:** Sarthak Deodhar 
- **Roll No / PRN:** 27/ 1262240166


---

## 1. RATIONALE & SIGNIFICANCE
In modern computer architecture, the Operating System (OS) is responsible for multiplexing hardware resources across competing user programs. Two critical responsibilities of the operating system are:
1. **CPU Scheduling:** Deciding which ready process is allocated the central processing unit to optimize utilization, throughput, waiting time, and responsiveness.
2. **Virtual Memory Management & Page Replacement:** Managing physical memory frames when demand paging causes page faults, selecting appropriate victim pages to replace without excessive thrashing.
3. **Operating System Administration (Linux):** Operating systems are primarily managed through command-line interfaces (CLI) and shell scripting for process management, file systems, permissions, and network diagnostics.

This microproject synthesizes all three domains into an interactive simulation and comparative analysis suite.

---

## 2. AIMS & OBJECTIVES
1. **Memory Management:** To simulate and compare First-In First-Out (FIFO), Least Recently Used (LRU), Optimal (OPT / Belady's), and Least Frequently Used (LFU) page replacement algorithms under various page reference strings and frame capacities.
2. **CPU Scheduling:** To simulate and analyze First-Come First-Served (FCFS), Shortest Job First (SJF Non-preemptive), Shortest Remaining Time First (SRTF Preemptive), Priority Scheduling (Non-preemptive & Preemptive), and Round Robin (RR) with dynamic Gantt charts and timing calculations.
3. **Linux Shell Guide:** To develop an interactive shell script (`linux_guide.sh`) and web-based terminal simulator that explains and demonstrates fundamental Linux commands for file management, process handling, user permissions, storage, and networking.
4. **Comparative Statements:** To calculate mathematical metrics (Hit Ratio, Fault Ratio, Turnaround Time, Waiting Time, Response Time, CPU Utilization) and synthesize formal comparative statements.



## 4. THEORETICAL BACKGROUND & ALGORITHMS

### 4.1 Page Replacement Algorithms

#### A. First-In, First-Out (FIFO)
- **Concept:** The operating system maintains a queue of all pages currently in memory. When a page must be replaced, the page at the head of the queue (the oldest page in memory) is selected as the victim.
- **Disadvantage:** Fails to recognize that frequently referenced pages might also be old, causing high fault rates.
- **Belady's Anomaly:** Increasing the number of page frames can counter-intuitively result in *more* page faults (e.g., reference string `1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5`).

#### B. Least Recently Used (LRU)
- **Concept:** Associates with each page the timestamp of its last access. When replacement occurs, LRU chooses the page that has not been referenced for the longest period of time.
- **Principle:** Exploits the principle of *temporal locality*—programs tend to reuse memory locations recently accessed.
- **Advantage:** Belonging to the class of *stack algorithms*, LRU is provably immune to Belady's Anomaly.

#### C. Optimal Page Replacement (OPT / Belady's Algorithm)
- **Concept:** Replaces the page that will not be used for the longest duration in the future.
- **Significance:** Proven by L. A. Belady to produce the absolute lowest page fault rate for any fixed number of frames.
- **Limitation:** Requires clairvoyant knowledge of future memory references, which is impossible in general-purpose preemptive kernels. It serves as an upper-bound benchmark for performance evaluation.

#### D. Least Frequently Used (LFU)
- **Concept:** Maintains an access frequency counter for each resident page. The victim selected is the page with the lowest access count. A tie-breaker (such as FIFO) resolves pages with equal frequencies.

---

### 4.2 CPU Scheduling Algorithms

#### A. First-Come, First-Served (FCFS)
- Non-preemptive algorithm that allocates the CPU in the order of process arrival.
- **Convoy Effect:** If a CPU-intensive job with a large burst time arrives first, subsequent lightweight I/O-bound processes are blocked waiting in the ready queue, causing sharp spikes in average waiting times.

#### B. Shortest Job First (SJF - Non-Preemptive)
- Chooses the available process with the smallest CPU burst time.
- Provably minimizes the Average Waiting Time (AWT) among non-preemptive algorithms.
- **Limitation:** Starvation of longer jobs if short jobs continually enter the ready queue.

#### C. Shortest Remaining Time First (SRTF - Preemptive SJF)
- Preemptive variant of SJF. When a new process arrives with a remaining CPU burst shorter than the remaining burst of the currently executing process, the CPU is preempted and reassigned to the new process.
- Produces the lowest theoretical waiting time for a given set of processes.

#### D. Priority Scheduling (Non-Preemptive & Preemptive)
- Associates a priority integer with each process. The CPU is allocated to the process with the highest priority.
- Can be configured as "lower numerical value = higher priority" or vice-versa.
- **Mitigation for Starvation:** *Aging* (gradually incrementing priority of processes that wait in the ready queue).

#### E. Round Robin (RR)
- Designed specifically for time-shared systems. Each ready process is assigned a small unit of CPU time called a **Time Quantum** ($q$, typically 10 to 100 milliseconds).
- If the process does not complete within its quantum, it is preempted and appended to the tail of the ready queue.
- Excellent response time; avoids starvation.


## 9. CONCLUSION
The microproject successfully implemented, evaluated, and visually simulated the key algorithms governing Operating Systems:
1. Page replacement policies were evaluated against theoretical bounds, validating LRU's empirical superiority over FIFO.
2. CPU scheduling criteria demonstrated the trade-off between throughput optimization (SRTF) and interactive fairness (Round Robin).
3. The Linux interactive guide and script reinforced command-line systems administration skills.

---

## 10. REFERENCES
1. Silberschatz, A., Galvin, P. B., & Gagne, G. *Operating System Concepts* (10th ed.), John Wiley & Sons.
2. Tanenbaum, A. S., & Bos, H. *Modern Operating Systems* (4th ed.), Pearson Education.
3. Shotts, W. *The Linux Command Line: A Complete Introduction* (2nd ed.), No Starch Press.
4. MSBTE Curriculum Specification for Operating Systems (Course Code 22516 / 313303).

