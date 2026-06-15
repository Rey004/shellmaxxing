```
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ▌████▌██▌██▌████▌██  ▌██  ▌██   ▌██ ▌████ ▌██   ▌██ ▌██   ▌██▌████▌███   ▌██▌██████
  ▌██  ▌██▌██▌██  ▌██  ▌██  ▌███ ▌███▌██ ▌██ ▌██ ▌██   ▌██ ▌██  ▌██ ▌████  ▌██▌██
  ▌████▌█████▌████▌██  ▌██  ▌██▌██▌██▌██████  ▌████     ▌████   ▌██ ▌██▌███▌██▌██ ▌███
    ▌██▌██▌██▌██  ▌██  ▌██  ▌██   ▌██▌██ ▌██ ▌██ ▌██   ▌██ ▌██  ▌██ ▌██  ▌████▌██  ▌██
  ▌████▌██▌██▌████▌████▌████▌██   ▌██▌██ ▌██▌██   ▌██ ▌██   ▌██▌████▌██   ▌███ ▌█████
  ▄▄▄▄ ▄▄ ▄▄ ▄▄▄▄ ▄▄▄▄ ▄▄▄▄ ▄▄    ▄▄ ▄▄  ▄▄ ▄▄    ▄▄  ▄▄    ▄▄ ▄▄▄▄ ▄▄    ▄▄▄  ▄▄▄▄▄
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Functionalities

*   **Natural Language Intent Matching**: Parses human-readable queries to detect user command intent.
*   **Cross-Platform Translation**: Translates matched intents into OS-specific shell commands for Windows, Linux, and macOS.
*   **Risk Analysis**: Analyzes commands to determine risk levels (`safe`, `medium`, `high`, `critical`, `unknown`).
*   **Command Explanation**: Provides clear explanations detailing what each generated command does.

## Use Cases

*   **Command Lookup & Discovery**: Users who do not remember syntax can type natural language statements to find matching terminal commands.
*   **Safety & Pre-Execution Checks**: Integrating risk analysis into shell pipelines to prevent executing harmful commands.
*   **Learning Terminal Utilities**: Assisting developers and system administrators in learning equivalent commands across different operating systems.

## Examples of Input and Output

### Example 1: Windows Environment
*   **Input**: `"show my ip"`
*   **Output Command**: `ipconfig`
*   **Risk Level**: `safe`
*   **Explanation**: `Displays network configuration information such as IP addresses and adapters.`

### Example 2: Linux Environment
*   **Input**: `"kill process"`
*   **Output Command**: `kill -9 <pid>`
*   **Risk Level**: `high`
*   **Explanation**: `Forcefully terminates a process.`

### Example 3: macOS Environment
*   **Input**: `"remove file"`
*   **Output Command**: `rm <file>`
*   **Risk Level**: `high`
*   **Explanation**: `Removes files or directories.`
