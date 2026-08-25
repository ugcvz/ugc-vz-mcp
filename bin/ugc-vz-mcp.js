#!/usr/bin/env node
// stdio -> Streamable-HTTP-Bruecke zum UGC-VZ-MCP-Server.
// Delegiert an mcp-remote (via npx), damit die Bruecke immer die aktuelle,
// gepflegte Transport-Implementierung nutzt statt eine eigene zu duplizieren.
const { spawn } = require('node:child_process');

const ENDPOINT = 'https://ugc-vz.de/api/mcp';
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const child = spawn(npx, ['-y', 'mcp-remote@latest', ENDPOINT, ...process.argv.slice(2)], {
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
child.on('error', (error) => {
  console.error(`ugc-vz-mcp: konnte mcp-remote nicht starten (${error.message}). Ist npm/npx installiert?`);
  process.exit(1);
});
