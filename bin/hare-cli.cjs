#!/usr/bin/env node

const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const packageDir = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(packageDir, "..");
const sourceRoot = path.join(workspaceRoot, "hare-code");
const distEntry = path.join(packageDir, "dist", "cli.js");
const sourceEntry = path.join(sourceRoot, "src", "entrypoints", "cli.tsx");
const cliEntry = fs.existsSync(distEntry) ? distEntry : sourceEntry;
const bunBinary =
  process.env.BUN_BINARY || (process.platform === "win32" ? "bun.exe" : "bun");

const child = spawn(bunBinary, [cliEntry, ...process.argv.slice(2)], {
  stdio: "inherit",
  env: process.env,
});

child.on("error", (error) => {
  console.error("hare-cli 需要 Bun 运行时。请先安装 Bun: https://bun.sh/");
  console.error(error.message);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
