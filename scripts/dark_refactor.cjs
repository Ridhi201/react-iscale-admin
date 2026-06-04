const fs = require('fs');
const path = require('path');

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // 1. Fix alignment (strip redundant padding and background from main wrappers)
  content = content.replace(/className="p-6 h-full bg-\[#f8fafc\]"/g, 'className="h-full"');
  content = content.replace(/className="p-6 h-full bg-slate-50"/g, 'className="h-full"');
  content = content.replace(/className="p-6 h-full"/g, 'className="h-full"');
  
  // 2. Add Dark Mode classes (only if not already there)
  
  const replacements = {
    'bg-white': 'bg-white dark:bg-slate-800',
    'bg-\\[#f8fafc\\]': 'bg-[#f8fafc] dark:bg-slate-900',
    'text-slate-800': 'text-slate-800 dark:text-slate-100',
    'text-slate-700': 'text-slate-700 dark:text-slate-300',
    'text-slate-600': 'text-slate-600 dark:text-slate-400',
    'text-slate-500': 'text-slate-500 dark:text-slate-400',
    'border-slate-200': 'border-slate-200 dark:border-slate-700',
    'border-slate-300': 'border-slate-300 dark:border-slate-600',
    'bg-slate-50': 'bg-slate-50 dark:bg-slate-800/50',
    'bg-slate-100': 'bg-slate-100 dark:bg-slate-700',
    'bg-\\[#1b365d\\]': 'bg-[#1b365d] dark:bg-slate-950'
  };

  for (const [find, replace] of Object.entries(replacements)) {
    // We use a regex that looks for the exact class, preceded by a space or quote, and followed by a space or quote
    // And ensure we don't accidentally double-add
    const regex = new RegExp(`(?<=["'\\s])${find}(?=["'\\s])`, 'g');
    
    // First, temporarily replace existing dark classes so we don't double up if run twice
    const existingDarkRegex = new RegExp(`${find} dark:[\\w\\-/]+`, 'g');
    content = content.replace(existingDarkRegex, find);
    
    // Now apply the dark replacement
    content = content.replace(regex, replace);
  }
  
  // Additional safety for tables: text-slate-700 text-xs -> text-slate-700 dark:text-slate-300
  // Handled by the generic loop above!

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Dark Refactored ${path.basename(filepath)}`);
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

// Process Pages
processDirectory(path.join(__dirname, 'src', 'pages'));
// Process Components
processDirectory(path.join(__dirname, 'src', 'components'));

console.log('Done Dark Refactor');
