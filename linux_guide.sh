#!/bin/bash
# ==============================================================================
# OS Workstation: Technical Reference Guide for POSIX Linux Commands
# Academic Microproject & Systems Administration Reference
# ==============================================================================

BOLD="\033[1m"
GREEN="\033[1;32m"
BLUE="\033[1;34m"
CYAN="\033[1;36m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
MAGENTA="\033[1;35m"
RESET="\033[0m"

print_header() {
    clear
    echo -e "${CYAN}======================================================================${RESET}"
    echo -e "${BOLD}${BLUE}   OPERATING SYSTEMS WORKSTATION: POSIX LINUX COMMANDS GUIDE${RESET}"
    echo -e "${CYAN}======================================================================${RESET}"
    echo -e "${YELLOW}  Technical Reference & Live Output Demonstration Tool${RESET}"
    echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
}

pause() {
    echo ""
    read -rp "Press [Enter] key to return to menu..."
}

# 1. File and Directory Management
file_mgmt() {
    while true; do
        print_header
        echo -e "${BOLD}${MAGENTA}[1] FILE & DIRECTORY MANAGEMENT COMMANDS${RESET}"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        echo " 1) ls      - List directory contents with permissions and sizes"
        echo " 2) cd & pwd- Navigate directories and print working directory"
        echo " 3) mkdir   - Create directories (including nested trees)"
        echo " 4) cp & mv - Copy and move/rename files and directories"
        echo " 5) rm      - Remove files and directories safely"
        echo " 6) touch   - Create empty files or update timestamps"
        echo " 7) find    - Search for files by name, type, size, or time"
        echo " 8) Back to Main Menu"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        read -rp "Enter choice [1-8]: " opt
        echo ""

        case $opt in
            1)
                echo -e "${GREEN}==> Command: ls (List Storage/Files)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} ls [OPTIONS] [FILE/DIR]"
                echo -e "${BOLD}Common Options:${RESET}"
                echo "  -l : Long listing format (permissions, owner, size, date)"
                echo "  -a : Include hidden files starting with '.'"
                echo "  -h : Human-readable file sizes (e.g. 1K, 234M, 2G)"
                echo "  -t : Sort by modification time, newest first"
                echo "  -R : Recursive listing of all subdirectories"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ ls -lah            # Detailed view of all files including hidden"
                echo "  $ ls -lt /var/log    # Sort logs by newest first"
                echo -e "${BOLD}Live Demo Output (ls -l in current folder):${RESET}"
                ls -l | head -n 8
                pause
                ;;
            2)
                echo -e "${GREEN}==> Commands: cd (Change Directory) & pwd (Print Working Directory)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} pwd | cd [DIRECTORY_PATH]"
                echo -e "${BOLD}Common Navigations:${RESET}"
                echo "  pwd         # Displays the absolute path of the current directory"
                echo "  cd ~        # Change to home directory ($HOME)"
                echo "  cd ..       # Move up one directory level (parent directory)"
                echo "  cd -        # Switch to previous working directory"
                echo "  cd /etc     # Change to absolute path /etc"
                echo -e "${BOLD}Live Demo Output:${RESET}"
                echo "  Current Directory: $(pwd)"
                pause
                ;;
            3)
                echo -e "${GREEN}==> Command: mkdir (Make Directory)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} mkdir [OPTIONS] DIRECTORY_NAME..."
                echo -e "${BOLD}Common Options:${RESET}"
                echo "  -p : Create parent directories as needed without error if existing"
                echo "  -v : Verbose mode; print a message for each created directory"
                echo "  -m : Set file mode (permissions) directly upon creation"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ mkdir projects"
                echo "  $ mkdir -p app/src/controllers/api   # Creates whole tree"
                echo "  $ mkdir -m 755 public_html"
                pause
                ;;
            4)
                echo -e "${GREEN}==> Commands: cp (Copy) & mv (Move/Rename)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} cp [OPTIONS] SOURCE DEST | mv [OPTIONS] SOURCE DEST"
                echo -e "${BOLD}Common Options for cp:${RESET}"
                echo "  -r, -R : Copy directories recursively"
                echo "  -i     : Prompt before overwrite (interactive)"
                echo "  -p     : Preserve file attributes (timestamp, mode, ownership)"
                echo -e "${BOLD}Common Options for mv:${RESET}"
                echo "  -i     : Prompt before overwrite"
                echo "  -u     : Move only when source is newer than destination"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ cp report.txt backup_report.txt"
                echo "  $ cp -r my_project /backup/my_project"
                echo "  $ mv old_name.txt new_name.txt       # Renames file"
                echo "  $ mv *.png /home/user/Pictures/     # Moves all PNGs"
                pause
                ;;
            5)
                echo -e "${GREEN}==> Command: rm (Remove Files & Directories)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} rm [OPTIONS] FILE..."
                echo -e "${BOLD}Common Options:${RESET}"
                echo "  -r, -R : Remove directories and their contents recursively"
                echo "  -f     : Force remove without confirmation or warning"
                echo "  -i     : Prompt before every removal (safer)"
                echo -e "${RED}${BOLD}Caution:${RESET} 'rm -rf' deletes permanently without Trash bin recovery!"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ rm notes.tmp"
                echo "  $ rm -i *.bak        # Interactive confirmation"
                echo "  $ rm -rf build/      # Recursively force delete directory"
                pause
                ;;
            6)
                echo -e "${GREEN}==> Command: touch (Create Empty File / Update Timestamp)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} touch [OPTIONS] FILE..."
                echo -e "${BOLD}Common Use Cases:${RESET}"
                echo "  1. Quickly creates a new, empty file if it does not exist."
                echo "  2. Updates modification and access timestamps if file exists."
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ touch script.sh index.html style.css"
                echo "  $ touch -t 202610271200 oldfile.txt # Sets custom timestamp"
                pause
                ;;
            7)
                echo -e "${GREEN}==> Command: find (Search Files and Directories)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} find [PATH] [CRITERIA] [ACTION]"
                echo -e "${BOLD}Common Criteria:${RESET}"
                echo "  -name 'pattern' : Search by filename (case sensitive)"
                echo "  -iname 'pattern': Case insensitive filename search"
                echo "  -type f / -type d: Search for files only (f) or directories (d)"
                echo "  -size +10M      : Files larger than 10 Megabytes"
                echo "  -mtime -7       : Modified in the last 7 days"
                echo "  -exec cmd {} \\; : Execute command on every match"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ find . -name '*.py'                 # Find all Python files"
                echo "  $ find /var/log -type f -size +50M    # Big log files"
                echo "  $ find . -name '*.tmp' -delete        # Find and delete tmp files"
                pause
                ;;
            8) return ;;
            *) echo -e "${RED}Invalid choice!${RESET}"; sleep 1 ;;
        esac
    done
}

# 2. Process Management
process_mgmt() {
    while true; do
        print_header
        echo -e "${BOLD}${MAGENTA}[2] PROCESS MANAGEMENT COMMANDS${RESET}"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        echo " 1) ps      - Report snapshot of current processes"
        echo " 2) top     - Display dynamic real-time view of running processes"
        echo " 3) kill    - Terminate processes by Process ID (PID)"
        echo " 4) pkill   - Kill processes by program name"
        echo " 5) nice & renice - Control CPU scheduling priorities"
        echo " 6) bg, fg & jobs - Job control for background/foreground tasks"
        echo " 7) Back to Main Menu"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        read -rp "Enter choice [1-7]: " opt
        echo ""

        case $opt in
            1)
                echo -e "${GREEN}==> Command: ps (Process Status)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} ps [OPTIONS]"
                echo -e "${BOLD}Common Options:${RESET}"
                echo "  ps -ef     : Standard full format listing of all system processes"
                echo "  ps aux     : BSD format listing (user, PID, %CPU, %MEM, status)"
                echo "  ps -u user : Processes running for specific username"
                echo -e "${BOLD}Useful Piping Examples:${RESET}"
                echo "  $ ps aux | grep python"
                echo "  $ ps aux --sort=-%mem | head -n 5  # Top memory consumers"
                echo -e "${BOLD}Live Demo Output (ps -ef | head -n 6):${RESET}"
                ps -ef 2>/dev/null | head -n 6 || ps aux 2>/dev/null | head -n 6
                pause
                ;;
            2)
                echo -e "${GREEN}==> Command: top (Dynamic Real-time Process Viewer)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} top [OPTIONS]"
                echo -e "${BOLD}Key Interactive Shortcuts inside top:${RESET}"
                echo "  'q' : Quit top"
                echo "  'k' : Kill process (prompts for PID and signal)"
                echo "  'M' : Sort processes by Memory usage (%MEM)"
                echo "  'P' : Sort processes by CPU usage (%CPU)"
                echo "  'u' : Filter processes by specific user"
                echo "  'h' : Display help menu"
                pause
                ;;
            3)
                echo -e "${GREEN}==> Command: kill (Send Signals to Processes)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} kill [-SIGNAL] PID"
                echo -e "${BOLD}Common Termination Signals:${RESET}"
                echo "  -15 (SIGTERM) : Graceful termination request (Default, allows cleanup)"
                echo "  -9  (SIGKILL) : Force kill immediately (Kernel forcibly kills process)"
                echo "  -1  (SIGHUP)  : Reload configuration without stopping daemon"
                echo "  -19 (SIGSTOP) : Pause / Suspend process execution"
                echo "  -18 (SIGCONT) : Resume paused process"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ kill 1420       # Sends default SIGTERM to PID 1420"
                echo "  $ kill -9 1420    # Forcefully terminates stubborn process"
                pause
                ;;
            4)
                echo -e "${GREEN}==> Command: pkill & killall (Kill by Process Name)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} pkill [OPTIONS] PATTERN | killall NAME"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ pkill -9 firefox        # Force kill all firefox instances"
                echo "  $ pkill -u guest          # Kill all processes owned by user 'guest'"
                echo "  $ killall apache2         # Terminate all apache2 daemons"
                pause
                ;;
            5)
                echo -e "${GREEN}==> Commands: nice & renice (Process Scheduling Priority)${RESET}"
                echo -e "${BOLD}Concept:${RESET}"
                echo "  Niceness ranges from -20 (highest priority) to +19 (lowest priority). Default is 0."
                echo -e "${BOLD}Syntax:${RESET}"
                echo "  nice -n [VALUE] COMMAND       # Start process with given priority"
                echo "  renice [VALUE] -p PID         # Alter priority of running process"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ nice -n 10 tar -czf backup.tar.gz /data"
                echo "  $ sudo renice -5 -p 3120"
                pause
                ;;
            6)
                echo -e "${GREEN}==> Job Control: bg, fg, jobs & '&' (Background Execution)${RESET}"
                echo -e "${BOLD}Commands & Shortcuts:${RESET}"
                echo "  command &     : Appending '&' launches process in background"
                echo "  jobs          : Lists all background jobs in current shell"
                echo "  Ctrl + Z      : Suspends currently running foreground process"
                echo "  bg %1         : Resumes suspended job 1 in background"
                echo "  fg %1         : Brings background job 1 into foreground"
                pause
                ;;
            7) return ;;
            *) echo -e "${RED}Invalid choice!${RESET}"; sleep 1 ;;
        esac
    done
}

# 3. Permissions and User Management
perm_user_mgmt() {
    while true; do
        print_header
        echo -e "${BOLD}${MAGENTA}[3] PERMISSIONS & USER MANAGEMENT COMMANDS${RESET}"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        echo " 1) chmod   - Change file access permissions (Numeric & Symbolic)"
        echo " 2) chown   - Change file owner and group ownership"
        echo " 3) useradd & usermod - Create and modify system user accounts"
        echo " 4) passwd  - Change user password"
        echo " 5) sudo & whoami    - Execute with superuser privileges & check user"
        echo " 6) Back to Main Menu"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        read -rp "Enter choice [1-6]: " opt
        echo ""

        case $opt in
            1)
                echo -e "${GREEN}==> Command: chmod (Change Mode / Permissions)${RESET}"
                echo -e "${BOLD}Permissions Triplet: [r=4, w=2, x=1]${RESET}"
                echo "  User (Owner)  |  Group  |  Others"
                echo "  rwx (4+2+1=7) | r-x (5) | r-- (4)  ==> chmod 754"
                echo -e "${BOLD}Octal Permission Table:${RESET}"
                echo "  755 = rwxr-xr-x (Owner rwx, Group rx, Others rx - Standard for scripts)"
                echo "  644 = rw-r--r-- (Owner rw, Others read-only - Standard files)"
                echo "  600 = rw------- (Owner rw only - Sensitive keys)"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ chmod +x script.sh"
                echo "  $ chmod -R 755 /var/www/html"
                pause
                ;;
            2)
                echo -e "${GREEN}==> Command: chown (Change Owner & Group)${RESET}"
                echo -e "${BOLD}Syntax:${RESET} chown [OPTIONS] USER[:GROUP] FILE..."
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ sudo chown sysadmin report.pdf"
                echo "  $ sudo chown sysadmin:developers project/"
                pause
                ;;
            3)
                echo -e "${GREEN}==> Commands: useradd, adduser & usermod${RESET}"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ sudo useradd -m -s /bin/bash student"
                echo "  $ sudo usermod -aG sudo student"
                pause
                ;;
            4)
                echo -e "${GREEN}==> Command: passwd (Set or Change User Password)${RESET}"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ passwd             # Change current logged-in user password"
                echo "  $ sudo passwd student # Set password for user student"
                pause
                ;;
            5)
                echo -e "${GREEN}==> Commands: sudo & whoami${RESET}"
                echo -e "${BOLD}Live Demo Output:${RESET}"
                echo "  Current User: $(whoami 2>/dev/null || echo 'User')"
                echo "  Identity: $(id 2>/dev/null || echo 'UID/GID')"
                pause
                ;;
            6) return ;;
            *) echo -e "${RED}Invalid choice!${RESET}"; sleep 1 ;;
        esac
    done
}

# 4. System and Storage Monitoring
system_mgmt() {
    while true; do
        print_header
        echo -e "${BOLD}${MAGENTA}[4] SYSTEM & STORAGE MONITORING COMMANDS${RESET}"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        echo " 1) df      - Report file system disk space usage"
        echo " 2) du      - Estimate file and directory space usage"
        echo " 3) free    - Display physical memory (RAM) and Swap usage"
        echo " 4) uname   - Print system architecture and kernel release"
        echo " 5) uptime  - System uptime and load averages"
        echo " 6) Back to Main Menu"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        read -rp "Enter choice [1-6]: " opt
        echo ""

        case $opt in
            1)
                echo -e "${GREEN}==> Command: df (Disk Free / Filesystems)${RESET}"
                echo -e "${BOLD}Live Demo Output (df -h):${RESET}"
                df -h 2>/dev/null | head -n 8 || df 2>/dev/null | head -n 8
                pause
                ;;
            2)
                echo -e "${GREEN}==> Command: du (Disk Usage of Folders & Files)${RESET}"
                echo -e "${BOLD}Examples:${RESET}"
                echo "  $ du -sh *                # Size of each item in directory"
                echo "  $ du -h --max-depth=1 /var"
                pause
                ;;
            3)
                echo -e "${GREEN}==> Command: free (Memory & Swap Utilization)${RESET}"
                echo -e "${BOLD}Live Demo Output (free -h):${RESET}"
                free -h 2>/dev/null || free -m 2>/dev/null || echo "Physical RAM and Virtual Swap metrics"
                pause
                ;;
            4)
                echo -e "${GREEN}==> Command: uname (System Architecture)${RESET}"
                echo -e "${BOLD}Live Demo Output (uname -a):${RESET}"
                uname -a 2>/dev/null || echo "Linux Kernel Architecture"
                pause
                ;;
            5)
                echo -e "${GREEN}==> Command: uptime (System Uptime & Load Averages)${RESET}"
                echo -e "${BOLD}Live Demo Output:${RESET}"
                uptime 2>/dev/null || echo "System operational"
                pause
                ;;
            6) return ;;
            *) echo -e "${RED}Invalid choice!${RESET}"; sleep 1 ;;
        esac
    done
}

# 5. Text Processing & Filtering
text_mgmt() {
    while true; do
        print_header
        echo -e "${BOLD}${MAGENTA}[5] TEXT PROCESSING & FILTERING COMMANDS${RESET}"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        echo " 1) cat, head & tail - View and paginate file contents"
        echo " 2) grep             - Search text with Regular Expressions"
        echo " 3) awk              - Pattern scanning and column processing"
        echo " 4) sed              - Stream Editor for text transformation"
        echo " 5) wc, sort & uniq  - Word count, sorting and deduplication"
        echo " 6) Back to Main Menu"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        read -rp "Enter choice [1-6]: " opt
        echo ""

        case $opt in
            1)
                echo -e "${GREEN}==> Commands: cat, head, tail (File Viewing)${RESET}"
                echo "  cat file.txt       : Concatenate and print entire file contents"
                echo "  head -n 10 file    : Print first 10 lines of file"
                echo "  tail -n 10 file    : Print last 10 lines of file"
                echo "  tail -f /var/log/syslog : Live stream updates in real-time"
                pause
                ;;
            2)
                echo -e "${GREEN}==> Command: grep (Regular Expression Search)${RESET}"
                echo "  $ grep -i 'error' /var/log/syslog"
                echo "  $ grep -rn 'calculate' src/"
                echo "  $ grep -v '^#' /etc/ssh/sshd_config"
                pause
                ;;
            3)
                echo -e "${GREEN}==> Command: awk (Text Scanning & Column Extraction)${RESET}"
                echo "  $ awk '{print \$1, \$3}' data.txt"
                echo "  $ awk -F':' '{print \$1}' /etc/passwd"
                pause
                ;;
            4)
                echo -e "${GREEN}==> Command: sed (Stream Editor)${RESET}"
                echo "  $ sed 's/search/replace/g' filename"
                echo "  $ sed -i 's/localhost/127.0.0.1/g' config.env"
                pause
                ;;
            5)
                echo -e "${GREEN}==> Commands: wc, sort, uniq${RESET}"
                echo "  wc -l file.txt        # Count total lines in file"
                echo "  sort file.txt         # Sort lines alphabetically"
                echo "  sort file.txt | uniq  # Remove adjacent duplicate lines"
                pause
                ;;
            6) return ;;
            *) echo -e "${RED}Invalid choice!${RESET}"; sleep 1 ;;
        esac
    done
}

# 6. Networking & Remote Access
network_mgmt() {
    while true; do
        print_header
        echo -e "${BOLD}${MAGENTA}[6] NETWORKING & COMMUNICATION COMMANDS${RESET}"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        echo " 1) ping        - Send ICMP ECHO_REQUEST to network hosts"
        echo " 2) ip & ifconfig- Network interfaces and IP addresses"
        echo " 3) curl & wget - Web transfers and API testing"
        echo " 4) ss & netstat- Socket statistics and listening ports"
        echo " 5) ssh & scp   - Secure shell login and file copy"
        echo " 6) Back to Main Menu"
        echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
        read -rp "Enter choice [1-6]: " opt
        echo ""

        case $opt in
            1)
                echo -e "${GREEN}==> Command: ping (Network Connectivity Test)${RESET}"
                echo "  $ ping -c 4 8.8.8.8           # Ping Google Public DNS 4 times"
                echo "  $ ping -c 4 localhost         # Test local loopback stack"
                pause
                ;;
            2)
                echo -e "${GREEN}==> Commands: ip & ifconfig${RESET}"
                echo "  $ ip addr show"
                echo "  $ ip route show"
                pause
                ;;
            3)
                echo -e "${GREEN}==> Commands: curl & wget${RESET}"
                echo "  $ curl -I https://google.com"
                echo "  $ wget https://example.com/file.tar.gz"
                pause
                ;;
            4)
                echo -e "${GREEN}==> Commands: ss & netstat${RESET}"
                echo "  $ ss -tuln                  # Show TCP & UDP listening ports"
                echo "  $ ss -t -a                  # List all TCP sockets"
                pause
                ;;
            5)
                echo -e "${GREEN}==> Commands: ssh & scp${RESET}"
                echo "  $ ssh username@hostname"
                echo "  $ scp file.txt user@host:/tmp/"
                pause
                ;;
            6) return ;;
            *) echo -e "${RED}Invalid choice!${RESET}"; sleep 1 ;;
        esac
    done
}

# 7. Quick Search
search_command() {
    print_header
    echo -e "${BOLD}${MAGENTA}QUICK COMMAND SEARCH & LOOKUP${RESET}"
    echo -e "${CYAN}----------------------------------------------------------------------${RESET}"
    read -rp "Enter Linux command name or keyword to search: " q
    echo ""
    echo -e "${YELLOW}Searching system manual database for '$q'...${RESET}"
    echo ""
    man -k "$q" 2>/dev/null | head -n 12 || apropos "$q" 2>/dev/null || echo "Standard commands: ls, ps, kill, chmod, df, grep, ping, top"
    pause
}

# Main Loop
main() {
    while true; do
        print_header
        echo -e "${BOLD}Select a Command Category:${RESET}"
        echo ""
        echo -e "  ${GREEN}1)${RESET} File & Directory Management (ls, cd, mkdir, cp, mv, rm, find)"
        echo -e "  ${GREEN}2)${RESET} Process Management (ps, top, kill, pkill, nice, bg/fg)"
        echo -e "  ${GREEN}3)${RESET} Permissions & User Accounts (chmod, chown, useradd, sudo)"
        echo -e "  ${GREEN}4)${RESET} System & Storage Monitoring (df, du, free, uname, uptime)"
        echo -e "  ${GREEN}5)${RESET} Text Processing & Filtering (cat, grep, awk, sed, wc, sort)"
        echo -e "  ${GREEN}6)${RESET} Networking & Remote Access (ping, ip, curl, ss, ssh)"
        echo -e "  ${GREEN}7)${RESET} Quick Command Lookup / Search"
        echo -e "  ${RED}8)${RESET} Exit Guide"
        echo ""
        echo -e "${CYAN}======================================================================${RESET}"
        read -rp "Enter choice [1-8]: " choice

        case $choice in
            1) file_mgmt ;;
            2) process_mgmt ;;
            3) perm_user_mgmt ;;
            4) system_mgmt ;;
            5) text_mgmt ;;
            6) network_mgmt ;;
            7) search_command ;;
            8)
                echo ""
                echo -e "${GREEN}Exiting Linux Commands Guide.${RESET}"
                echo ""
                exit 0
                ;;
            *)
                echo -e "${RED}Invalid selection. Please enter 1-8.${RESET}"
                sleep 1
                ;;
        esac
    done
}

main
