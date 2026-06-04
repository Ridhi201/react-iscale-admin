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
      if (content.includes('axios.')) {
        const lines = content.split('\n');
        lines.forEach((line, i) => {
          if (line.includes("axios.get('/") || line.includes("axios.post('/") || line.includes("axios.put('/") || line.includes("axios.delete('/") || line.includes('axios.get("/') || line.includes('axios.post("/')) {
            console.log(`[${fullPath.replace(__dirname, '')}:${i+1}] ${line.trim()}`);
          }
        });
      }
    }
  }
}

searchFiles(srcDir);
