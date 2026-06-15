<div align="center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 190" width="100%">
    <rect width="850" height="190" rx="8" fill="#0c0d12"/>
    <!-- Terminal controls -->
    <circle cx="20" cy="20" r="6" fill="#ff5f56"/>
    <circle cx="40" cy="20" r="6" fill="#ffbd2e"/>
    <circle cx="60" cy="20" r="6" fill="#27c93f"/>
    <text x="425" y="24" fill="#a0a5b5" font-family="'Courier New', Courier, monospace" font-size="12" text-anchor="middle" font-weight="bold">shellmaxxing @ tui</text>
    <line x1="10" y1="35" x2="840" y2="35" stroke="#232635" stroke-width="1.5"/>
    
    <g font-family="'Courier New', Courier, monospace" font-weight="bold" font-size="9.5" xml:space="preserve">
      <!-- Border line -->
      <text x="25" y="60" fill="#FFDD00">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</text>
      <!-- Line 1 -->
      <text x="25" y="75" fill="#FFDD00">  ████ ██ ██ ████ ██   ██   ██    ██  ████  ██    ██  ██    ██ ████ ███    ██ ██████</text>
      <!-- Line 2 -->
      <text x="25" y="90" fill="#FCD303">  ██   ██ ██ ██   ██   ██   ███  ███ ██  ██  ██  ██    ██  ██   ██  ████   ██ ██  </text>
      <!-- Line 3 -->
      <text x="25" y="105" fill="#FBB03B">  ████ █████ ████ ██   ██   ██ ██ ██ ██████   ████      ████    ██  ██ ███ ██ ██  ███</text>
      <!-- Line 4 -->
      <text x="25" y="120" fill="#FF8F00">    ██ ██ ██ ██   ██   ██   ██    ██ ██  ██  ██  ██    ██  ██   ██  ██   ████ ██   ██</text>
      <!-- Line 5 -->
      <text x="25" y="135" fill="#FF6F00">  ████ ██ ██ ████ ████ ████ ██    ██ ██  ██ ██    ██  ██    ██ ████ ██    ███  █████</text>
      <!-- Border line -->
      <text x="25" y="150" fill="#FF6F00">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</text>
    </g>
  </svg>
</div>

<br />

## ⚡ Functionalities

*   **Natural Language Intent Matching** — Parses free-text or colloquial queries to accurately map user intent.
*   **Cross-Platform Translation** — Translates intents instantly to target OS commands (Windows, Linux, macOS).
*   **Risk Analysis & Profiling** — Profiles command safety into five distinct risk categories (`safe`, `medium`, `high`, `critical`, `unknown`).
*   **Contextual Command Explanations** — Breaks down utility syntax into human-readable descriptions.

---

## 🛠️ Use Cases

*   **Natural Command Lookup** — Type what you want to achieve (e.g., *"display my ip"*) and let the TUI output the exact command.
*   **Pre-execution Validation** — Safety-check shell inputs programmatically to detect hazardous operations (e.g., matching wildcard deletions).
*   **Cross-OS Command Translation** — Quickly translate known commands from one operating system format to another.

---

## 💻 Examples of Input and Output

### 🛡️ Example 1: Safe Lookup (Windows)
*   **Input Query**: `"show my ip"`
*   **Output Command**: `ipconfig`
*   **Risk Level**: 🟢 `safe`
*   **Explanation**: `Displays network configuration information such as IP addresses and adapters.`

### ⚠️ Example 2: Medium Risk Translation (macOS)
*   **Input Query**: `"rename file"`
*   **Output Command**: `mv <source> <destination>`
*   **Risk Level**: 🟡 `medium`
*   **Explanation**: `Moves or renames files and directories.`

### 🚨 Example 3: High Risk Termination (Linux)
*   **Input Query**: `"kill process"`
*   **Output Command**: `kill -9 <pid>`
*   **Risk Level**: 🔴 `high`
*   **Explanation**: `Forcefully terminates a process.`
