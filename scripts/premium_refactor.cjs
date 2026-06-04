const fs = require('fs');
const path = require('path');

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // 1. Table Headers
  content = content.replace(/bg-\[#1b365d\] dark:bg-slate-950 text-white/g, 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700/50');
  
  // 2. Remove table header border
  content = content.replace(/border-r border-white\/20/g, 'border-r border-slate-200 dark:border-slate-700/50');

  // 3. Floating Cards
  content = content.replace(/bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/g, 'bg-white dark:bg-slate-800 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800');
  content = content.replace(/bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/g, 'bg-white dark:bg-slate-800 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800');

  // 4. Old Buttons (Excel, Copy, etc.)
  content = content.replace(/border border-slate-300 dark:border-slate-600 rounded text-sm hover:bg-slate-50/g, 'border border-slate-200 dark:border-slate-700 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors');

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Premium Refactored ${path.basename(filepath)}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.jsx')) {
      refactorFile(fullPath);
    }
  }
}

processDirectory(path.join(__dirname, 'src', 'pages'));
processDirectory(path.join(__dirname, 'src', 'components'));

console.log('Done Premium Refactor');
