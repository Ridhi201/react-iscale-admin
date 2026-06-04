const fs = require('fs');
const path = require('path');

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Change default dark backgrounds to the deep purple
  content = content.replace(/dark:bg-\[#0f172a\]/g, 'dark:bg-[#13111c]');
  content = content.replace(/dark:bg-slate-900/g, 'dark:bg-[#13111c]');
  
  // Fix background slates that were given 800/50 etc.
  content = content.replace(/dark:bg-slate-800\/50/g, 'dark:bg-[#1f1b2e]/50');
  content = content.replace(/dark:bg-slate-800/g, 'dark:bg-[#1f1b2e]');
  
  // Change default dark borders
  content = content.replace(/dark:border-slate-700(\/60|\/50)?/g, 'dark:border-[#1f1b2e]');
  content = content.replace(/dark:border-slate-800(\/50)?/g, 'dark:border-[#1f1b2e]');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated theme in ${path.basename(filepath)}`);
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

processDirectory(path.join(__dirname, 'src', 'pages'));
processDirectory(path.join(__dirname, 'src', 'components'));
processDirectory(path.join(__dirname, 'src', 'layouts'));
