const fs = require('fs');
const path = require('path');

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // 1. Filter Button
  content = content.replace(/className="[^"]*">Filter<\/button>/g, 'className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all">Filter</button>');
  
  // 2. Reset Button
  content = content.replace(/className="[^"]*">Reset<\/button>/g, 'className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Reset</button>');
  
  // 3. Export Button
  content = content.replace(/className="[^"]*">Export<\/button>/g, 'className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Export</button>');

  // 4. Excel/Copy/PDF block
  // The block is:
  /*
  <div className="flex border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
    <button className="px-3 py-1 text-sm text-slate-600 dark:text-slate-400 border-r border-slate-300 dark:border-slate-600 hover:bg-slate-50">Copy</button>
    <button className="px-3 py-1 text-sm text-slate-600 dark:text-slate-400 border-r border-slate-300 dark:border-slate-600 hover:bg-slate-50">Excel</button>
    <button className="px-3 py-1 text-sm text-slate-600 dark:text-slate-400 border-r border-slate-300 dark:border-slate-600 hover:bg-slate-50">PDF</button>
    <button className="px-3 py-1 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50">Print</button>
  </div>
  */
  const oldTableActionsRegex = /<div className="flex border border-slate-[^"]+ rounded overflow-hidden">[\s\S]*?Copy<\/button>[\s\S]*?Excel<\/button>[\s\S]*?PDF<\/button>[\s\S]*?Print<\/button>\s*<\/div>/g;
  
  const newTableActions = `<div className="flex gap-2">
              <button className="px-4 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 transition-all shadow-sm">Copy</button>
              <button className="px-4 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-all shadow-sm">Excel</button>
              <button className="px-4 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 transition-all shadow-sm">PDF</button>
              <button className="px-4 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all shadow-sm">Print</button>
            </div>`;

  content = content.replace(oldTableActionsRegex, newTableActions);

  // 5. Replace any #e98036 with primary indigo #6366f1
  content = content.replace(/#e98036/g, '#6366f1');
  
  // 6. Tighten Card padding a bit (p-6 mb-6 -> p-5 mb-5)
  // We'll just replace 'p-6 mb-6' with 'p-5 mb-5' in the card wrappers.
  content = content.replace(/p-6 mb-6/g, 'p-5 mb-5');
  
  // Also replace basic mb-6 with mb-5 for tighter spacing between cards
  // but only inside classNames
  content = content.replace(/className="([^"]*)mb-6([^"]*)"/g, 'className="$1mb-5$2"');

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Phase 4 Refactored ${path.basename(filepath)}`);
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

console.log('Done Phase 4 Refactor');
