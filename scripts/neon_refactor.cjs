const fs = require('fs');
const path = require('path');

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // 1. Convert White Cards to Glassmorphism Dark Cards
  content = content.replace(/bg-white dark:bg-slate-800 rounded-2xl shadow-\[0_4px_24px_rgba\(0,0,0,0\.03\)\] border border-slate-100 dark:border-slate-800/g, 'bg-[#111827]/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-800/80 hover:border-gray-700 transition-colors');
  content = content.replace(/bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm overflow-hidden/g, 'bg-[#111827]/90 backdrop-blur-md border border-gray-800/80 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]');
  content = content.replace(/bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm p-4/g, 'bg-[#111827]/90 backdrop-blur-md border border-gray-800/80 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]');

  // 2. Table Headers
  content = content.replace(/bg-slate-50 dark:bg-slate-800\/50 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700\/50/g, 'bg-[#0f172a] text-slate-200 border-b border-gray-800');
  content = content.replace(/border-r border-slate-200 dark:border-slate-700\/50/g, 'border-r border-gray-800/50');

  // 3. Table Rows & Cells
  content = content.replace(/'bg-white dark:bg-slate-800'/g, "'bg-[#111827] hover:bg-[#1f2937] transition-colors'");
  content = content.replace(/border-b border-slate-200 dark:border-slate-700/g, 'border-b border-gray-800/50');
  content = content.replace(/border-r border-slate-200 dark:border-slate-700/g, 'border-r border-gray-800/50');

  // 4. Buttons (Filter, Reset, Export)
  // Indigo to Violet/Pink
  content = content.replace(/from-indigo-500 to-violet-500/g, 'from-violet-500 to-pink-500');
  content = content.replace(/shadow-indigo-500\/30/g, 'shadow-violet-500/40 hover:shadow-pink-500/40');
  
  // Secondary buttons (Reset, Export)
  content = content.replace(/bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300/g, 'bg-[#1f2937] text-slate-200 border border-gray-700');
  content = content.replace(/hover:bg-slate-200 dark:hover:bg-slate-700/g, 'hover:bg-gray-700');

  // Table Action Buttons (Copy, Excel, PDF, Print)
  // Old: bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700
  // New: bg-[#1f2937] text-slate-300 border border-gray-700
  content = content.replace(/bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/g, 'bg-[#1f2937] text-slate-300 border border-gray-700');
  // Hover states for these:
  content = content.replace(/hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600/g, 'hover:bg-violet-900/30 hover:text-violet-400 hover:border-violet-500/50');
  content = content.replace(/hover:bg-emerald-50 dark:hover:bg-emerald-900\/20 hover:text-emerald-600/g, 'hover:bg-emerald-900/30 hover:text-emerald-400 hover:border-emerald-500/50');
  content = content.replace(/hover:bg-rose-50 dark:hover:bg-rose-900\/20 hover:text-rose-600/g, 'hover:bg-rose-900/30 hover:text-rose-400 hover:border-rose-500/50');
  content = content.replace(/hover:bg-blue-50 dark:hover:bg-blue-900\/20 hover:text-blue-600/g, 'hover:bg-blue-900/30 hover:text-blue-400 hover:border-blue-500/50');

  // Text colors
  content = content.replace(/text-slate-700 dark:text-slate-300/g, 'text-slate-300');
  content = content.replace(/text-slate-800 dark:text-slate-100/g, 'text-white');
  content = content.replace(/text-slate-600 dark:text-slate-400/g, 'text-slate-400');

  // Form Inputs
  content = content.replace(/bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400/g, 'bg-[#0f172a] text-slate-300 border-gray-700');
  content = content.replace(/border border-slate-300 dark:border-slate-600/g, 'border border-gray-700 bg-[#0f172a] text-slate-300');
  content = content.replace(/focus:border-blue-500/g, 'focus:border-violet-500 focus:ring-1 focus:ring-violet-500');

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Neon Refactored ${path.basename(filepath)}`);
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

console.log('Done Neon Refactor');
