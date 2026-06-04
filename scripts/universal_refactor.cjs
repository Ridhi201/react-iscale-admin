const fs = require('fs');
const path = require('path');

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // 1. Convert Neon Dark Cards back to Dual Theme
  content = content.replace(/bg-\[#111827\]\/90 backdrop-blur-md rounded-2xl shadow-\[0_8px_30px_rgb\(0,0,0,0\.12\)\] border border-gray-800\/80 hover:border-gray-700 transition-colors/g, 'bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-slate-200 dark:border-gray-800 transition-colors');
  content = content.replace(/bg-\[#111827\]\/90 backdrop-blur-md border border-gray-800\/80 rounded-2xl overflow-hidden shadow-\[0_8px_30px_rgb\(0,0,0,0\.12\)\]/g, 'bg-white dark:bg-[#111827] border border-slate-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm');
  content = content.replace(/bg-\[#111827\]\/90 backdrop-blur-md border border-gray-800\/80 rounded-2xl p-4 shadow-\[0_8px_30px_rgb\(0,0,0,0\.12\)\]/g, 'bg-white dark:bg-[#111827] border border-slate-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm');

  // 2. Table Headers
  content = content.replace(/bg-\[#0f172a\] text-slate-200 border-b border-gray-800/g, 'bg-slate-50 dark:bg-[#0f172a] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800');
  content = content.replace(/border-r border-gray-800\/50/g, 'border-r border-slate-200 dark:border-gray-800/50');

  // 3. Table Rows & Cells
  content = content.replace(/'bg-\[#111827\] hover:bg-\[#1f2937\] transition-colors'/g, "'bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors'");
  content = content.replace(/border-b border-gray-800\/50/g, 'border-b border-slate-200 dark:border-gray-800/50');

  // 4. Buttons (Filter, Reset, Export)
  content = content.replace(/bg-gradient-to-r from-violet-500 to-pink-500/g, 'bg-indigo-600 hover:bg-indigo-700');
  content = content.replace(/shadow-violet-500\/40 hover:shadow-pink-500\/40/g, 'shadow-indigo-600/20 hover:shadow-indigo-600/30');
  
  // Secondary buttons (Reset, Export)
  // OLD: bg-[#1f2937] text-slate-200 border border-gray-700
  // NEW: bg-white dark:bg-[#1f2937] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-gray-700
  content = content.replace(/bg-\[#1f2937\] text-slate-200 border border-gray-700/g, 'bg-white dark:bg-[#1f2937] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-gray-700');
  
  // Table Action Buttons
  // OLD: bg-[#1f2937] text-slate-300 border border-gray-700
  // NEW: bg-white dark:bg-[#1f2937] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-gray-700
  content = content.replace(/bg-\[#1f2937\] text-slate-300 border border-gray-700/g, 'bg-white dark:bg-[#1f2937] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-gray-700');
  
  content = content.replace(/hover:bg-violet-900\/30 hover:text-violet-400 hover:border-violet-500\/50/g, 'hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600');
  content = content.replace(/hover:bg-emerald-900\/30 hover:text-emerald-400 hover:border-emerald-500\/50/g, 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600');
  content = content.replace(/hover:bg-rose-900\/30 hover:text-rose-400 hover:border-rose-500\/50/g, 'hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600');
  content = content.replace(/hover:bg-blue-900\/30 hover:text-blue-400 hover:border-blue-500\/50/g, 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600');

  // Form Inputs
  content = content.replace(/bg-\[#0f172a\] text-slate-300 border-gray-700/g, 'bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-gray-700');
  content = content.replace(/border border-gray-700 bg-\[#0f172a\] text-slate-300/g, 'border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-300');
  content = content.replace(/focus:border-violet-500 focus:ring-1 focus:ring-violet-500/g, 'focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600');

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Universal Refactored ${path.basename(filepath)}`);
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

console.log('Done Universal Refactor');
