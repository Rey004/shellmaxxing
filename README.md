<div align="center">
  <img src="public/banner.svg" alt="shellmaxxing banner" width="100%" />
  
  <p><strong>shellmaxxing</strong> is a terminal-focused, cross-platform command assistant that maps natural language queries to shell commands with built-in risk profiling and contextual explanations.</p>
  
  <br />
  
  <img src="public/cli_ui.png" alt="shellmaxxing TUI Screenshot" width="80%" />
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

| Input Query | Target OS | Output Command | Risk Level | Explanation |
| :--- | :--- | :--- | :--- | :--- |
| `"show my ip"` | Windows | `ipconfig` | 🟢 Safe | Displays network configuration information such as IP addresses and adapters. |
| `"rename file"` | macOS | `mv <source> <destination>` | 🟡 Medium | Moves or renames files and directories. |
| `"kill process"` | Linux | `kill -9 <pid>` | 🔴 High | Forcefully terminates a process. |
