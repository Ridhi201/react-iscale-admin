const fs = require('fs');
const path = require('path');

function updateNavbar() {
  const navbarPath = path.join(__dirname, 'src', 'components', 'layout', 'Navbar.jsx');
  if (fs.existsSync(navbarPath)) {
    let content = fs.readFileSync(navbarPath, 'utf8');
    
    // Change Navbar background to #0f172a
    content = content.replace(/bg-white\/80 dark:bg-slate-900\/80/g, 'bg-[#0f172a]');
    
    // Change text colors in Navbar to white
    content = content.replace(/text-slate-600 dark:text-slate-300/g, 'text-slate-300 hover:text-white');
    content = content.replace(/hover:bg-slate-100 dark:hover:bg-slate-800/g, 'hover:bg-slate-800');
    content = content.replace(/bg-slate-200 dark:bg-slate-700/g, 'bg-slate-700');
    
    fs.writeFileSync(navbarPath, content, 'utf8');
    console.log('Navbar updated to dark blue.');
  }
}

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // We want to colorize Reset, Export, Copy, Excel, PDF, Print buttons.
  // In the previous refactor, they became:
  // bg-white dark:bg-[#1f2937] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-gray-700
  // or bg-white dark:bg-[#1f2937] text-slate-600 dark:text-slate-300 ...

  // Find Reset button:
  // e.g. <button ...>Reset</button>
  // We will replace the entire long class string for these buttons.
  
  const oldClassRegex1 = /bg-white dark:bg-\[#1f2937\] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700/g;
  const oldClassRegex2 = /bg-white dark:bg-\[#1f2937\] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-slate-800/g;
  
  // Instead of matching exact classes, let's target by text.
  // <button className="some classes">Reset</button>
  content = content.replace(/<button([^>]*)>Reset<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(/className="[^"]*"/, 'className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm"');
    return `<button${newP1}>Reset</button>`;
  });

  content = content.replace(/<button([^>]*)>Export<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(/className="[^"]*"/, 'className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm"');
    return `<button${newP1}>Export</button>`;
  });

  content = content.replace(/<button([^>]*)>Copy<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(/className="[^"]*"/, 'className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm"');
    return `<button${newP1}>Copy</button>`;
  });

  content = content.replace(/<button([^>]*)>Excel<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(/className="[^"]*"/, 'className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm"');
    return `<button${newP1}>Excel</button>`;
  });

  content = content.replace(/<button([^>]*)>PDF<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(/className="[^"]*"/, 'className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm"');
    return `<button${newP1}>PDF</button>`;
  });

  content = content.replace(/<button([^>]*)>Print<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(/className="[^"]*"/, 'className="px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white rounded-full text-sm font-medium transition-colors shadow-sm"');
    return `<button${newP1}>Print</button>`;
  });

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated buttons in ${path.basename(filepath)}`);
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

updateNavbar();
processDirectory(path.join(__dirname, 'src', 'pages'));

console.log('Done coloring buttons and navbar');
