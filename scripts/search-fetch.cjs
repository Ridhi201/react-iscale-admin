const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'src');

function searchFiles(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      searchFiles(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('fetch(')) {
        const lines = content.split('\n');
        lines.forEach((line, i) => {
          if (line.includes("fetch('/") || line.includes("fetch('http") || line.includes('fetch("/') || line.includes('fetch("http')) {
            console.log(`[${fullPath.replace(__dirname, '')}:${i+1}] ${line.trim()}`);
          }
        });
      }
    }
  }
}

searchFiles(srcDir);
