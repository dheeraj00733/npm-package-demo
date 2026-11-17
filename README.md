# npm-package-demo

> Live demonstration project consuming the published [`devcheck-dj`](https://www.npmjs.com/package/devcheck-dj) npm package.

This repository demonstrates the real-world execution of **DevCheck CLI** (v1.1.0) on a consumer project containing intentional diagnostics:
- Missing optional documentation (missing `LICENSE`).
- Project configuration warning (default npm placeholder test script).
- JavaScript syntax error with line and column reporting (`src/broken-fixture.js:5:19`).
- Security scanner detection of an AWS access key pattern with credential masking (`src/config.js:3:21`).

---

## Installation & Dependency Verification

This demo consumes the official published package from the npm registry:

```json
{
  "dependencies": {
    "devcheck-dj": "^1.1.0"
  }
}
```

Installed directly via:
```bash
npm install devcheck-dj
```

---

## Demonstrated CLI Commands & Actual Outputs

### 1. Default Diagnostic Scan (`npx devcheck-dj .`)

Runs the full file-level diagnostic engine against the project:

```bash
npx devcheck-dj .
```

```text
============================================================
DEV CHECK
Node.js Project Diagnostic Engine

Scanning: /Users/dheerajjadhav/Desktop/npm-package-demo
============================================================

Project: npm-package-demo v1.0.0

[PASS] Target directory exists and is readable
[PASS] package.json is valid JSON
[PASS] Valid package name: "npm-package-demo"
[PASS] Valid semver version: "1.0.0"
[PASS] package.json "description" provided
[PASS] package.json "main" entry file exists: "src/index.js"
[PASS] .gitignore found
[PASS] Lock file found (package-lock.json)
[PASS] Test directory found (tests)

[WARNING] package.json
        package.json "license" is missing or empty
        Code: PKG_MISSING_LICENSE
        Fix: Add a valid SPDX license identifier (e.g., "MIT", "Apache-2.0") to package.json.

[WARNING] package.json:7:5
        package.json "test" script contains default npm placeholder ("no test specified")
        Code: PKG_PLACEHOLDER_TEST_SCRIPT
        Fix: Replace default npm test placeholder with an active test command (e.g., "node --test").

[WARNING] LICENSE
        LICENSE file is missing from project root
        Code: MISSING_LICENSE
        Fix: Include an open-source or proprietary LICENSE file in your repository.

[ERROR] src/broken-fixture.js:5:19
        JavaScript syntax error: Unexpected token ')'
        Code: JS_SYNTAX_ERROR
        Fix: Check the syntax near line 5.

[ERROR] src/config.js:3:21
        Potential AWS Access Key ID detected (heuristic)
        Code: SECRET_EXPOSURE
        Fix: Revoke this key and load credentials from environment variables or AWS IAM roles.

JavaScript Files:
  .js:    4
  .cjs:   0
  .mjs:   0
  .jsx:   0
  Total:  4

------------------------------------------------------------
PROJECT HEALTH: UNHEALTHY

Files scanned: 7
Files with issues: 4
Errors: 2
Warnings: 3
Info: 0
------------------------------------------------------------
```
*Exit Code:* `1`

---

### 2. Help Documentation (`npx devcheck-dj --help`)

```bash
npx devcheck-dj --help
```

```text
DevCheck CLI - Project Health Scanner

Usage:
  devcheck [target-directory] [options]

Arguments:
  target-directory        Directory to scan (default: current directory)

Options:
  --path <path>           Explicit target directory path to scan
  --format <json|text>    Output format (json or text)
  --json                  Output report in structured JSON format
  --summary               Output condensed project health summary
  --strict                Treat warnings as errors (exit code 1 on warnings)
  --verbose               Show informational messages and detailed scripts
  --self-test             Run internal verification suite
  --no-color              Disable ANSI color output
  -v, --version           Show version number
  -h, --help              Show this help message
  --                      End of options delimiter

Exit codes:
  0                       All required checks passed (warnings allowed)
  1                       Project has diagnostic errors (or warnings in strict mode)
  2                       Invalid target directory or command usage error
```
*Exit Code:* `0`

---

### 3. Version Check (`npx devcheck-dj --version`)

```bash
npx devcheck-dj --version
```

```text
1.1.0
```
*Exit Code:* `0`

---

### 4. Summary Mode (`npx devcheck-dj --summary`)

```bash
npx devcheck-dj --summary
```

```text
============================================================
DEV CHECK
Node.js Project Diagnostic Engine

Scanning: /Users/dheerajjadhav/Desktop/npm-package-demo
============================================================

------------------------------------------------------------
PROJECT HEALTH: UNHEALTHY

Files scanned: 7
Files with issues: 4
Errors: 2
Warnings: 3
Info: 0
------------------------------------------------------------
```
*Exit Code:* `1`

---

### 5. Verbose Diagnostic Output (`npx devcheck-dj --verbose`)

```bash
npx devcheck-dj --verbose
```
*Displays full script listings, project details, and informational diagnostics.*

---

### 6. Structured Machine-Readable JSON (`npx devcheck-dj --json`)

```bash
npx devcheck-dj --json
```

```json
{
  "tool": "DevCheck",
  "version": "1.1.0",
  "target": "/Users/dheerajjadhav/Desktop/npm-package-demo",
  "project": {
    "name": "npm-package-demo",
    "version": "1.0.0",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "devcheck": "devcheck ."
    }
  },
  "status": "UNHEALTHY",
  "summary": {
    "filesScanned": 7,
    "filesWithIssues": 4,
    "errors": 2,
    "warnings": 3,
    "info": 0,
    "passed": 9,
    "failed": 2
  },
  "diagnostics": [
    {
      "file": "package.json",
      "line": null,
      "column": null,
      "severity": "WARNING",
      "code": "PKG_MISSING_LICENSE",
      "message": "package.json \"license\" is missing or empty",
      "suggestion": "Add a valid SPDX license identifier (e.g., \"MIT\", \"Apache-2.0\") to package.json.",
      "scanner": "package"
    },
    {
      "file": "package.json",
      "line": 7,
      "column": 5,
      "severity": "WARNING",
      "code": "PKG_PLACEHOLDER_TEST_SCRIPT",
      "message": "package.json \"test\" script contains default npm placeholder (\"no test specified\")",
      "suggestion": "Replace default npm test placeholder with an active test command (e.g., \"node --test\").",
      "scanner": "package"
    },
    {
      "file": "LICENSE",
      "line": null,
      "column": null,
      "severity": "WARNING",
      "code": "MISSING_LICENSE",
      "message": "LICENSE file is missing from project root",
      "suggestion": "Include an open-source or proprietary LICENSE file in your repository.",
      "scanner": "structure"
    },
    {
      "file": "src/broken-fixture.js",
      "line": 5,
      "column": 19,
      "severity": "ERROR",
      "code": "JS_SYNTAX_ERROR",
      "message": "JavaScript syntax error: Unexpected token ')'",
      "suggestion": "Check the syntax near line 5.",
      "scanner": "syntax"
    },
    {
      "file": "src/config.js",
      "line": 3,
      "column": 21,
      "severity": "ERROR",
      "code": "SECRET_EXPOSURE",
      "message": "Potential AWS Access Key ID detected (heuristic)",
      "suggestion": "Revoke this key and load credentials from environment variables or AWS IAM roles.",
      "scanner": "security"
    }
  ],
  "checks": [
    { "type": "PASS", "message": "Target directory exists and is readable" },
    { "type": "PASS", "message": "package.json is valid JSON" },
    { "type": "PASS", "message": "Valid package name: \"npm-package-demo\"" },
    { "type": "PASS", "message": "Valid semver version: \"1.0.0\"" },
    { "type": "PASS", "message": "package.json \"description\" provided" },
    { "type": "WARN", "message": "package.json \"license\" is missing or empty" },
    { "type": "PASS", "message": "package.json \"main\" entry file exists: \"src/index.js\"" },
    { "type": "WARN", "message": "package.json \"test\" script contains default npm placeholder (\"no test specified\")" },
    { "type": "PASS", "message": "README.md found" },
    { "type": "PASS", "message": ".gitignore found" },
    { "type": "WARN", "message": "LICENSE file is missing" },
    { "type": "PASS", "message": "Lock file found (package-lock.json)" },
    { "type": "PASS", "message": "Test directory found (tests)" }
  ],
  "jsFiles": {
    "js": 4,
    "cjs": 0,
    "mjs": 0,
    "jsx": 0,
    "total": 4
  },
  "exitCode": 1
}
```

---

### 7. Strict CI/CD Mode (`npx devcheck-dj --strict`)

```bash
npx devcheck-dj --strict
```
*Treats any project warning or error as a critical failure (exits with code `1`).*

---

## Log Captures

Raw text captures of each command execution are archived in the [`screenshots/`](./screenshots/) directory:
- `01_scan_default.txt`
- `02_help.txt`
- `03_version.txt`
- `04_summary.txt`
- `05_verbose.txt`
- `06_json.txt`
- `07_strict.txt`

---

## Links

- **npm Package**: [https://www.npmjs.com/package/devcheck-dj](https://www.npmjs.com/package/devcheck-dj)
- **Source Code Repository**: [https://github.com/dheeraj00733/npm-package](https://github.com/dheeraj00733/npm-package)
