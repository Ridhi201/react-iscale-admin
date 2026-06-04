const fs = require('fs');
const path = require('path');

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // Replace the vibrant headers (no flex) with clean professional ones
  content = content.replace(
    /<div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-\[0_10px_30px_-10px_rgba\(79,70,229,0\.5\)\] border border-indigo-500\/50 p-5 mb-5 overflow-hidden">\s*<div className="absolute right-0 top-0 w-64 h-64 bg-white\/10 rounded-full blur-3xl -translate-y-1\/2 translate-x-1\/3 pointer-events-none"><\/div>\s*<h2 className="([^"]*)text-white drop-shadow-md([^"]*) relative z-10">([^<]+)<\/h2>\s*<\/div>/g,
    `<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-5 mb-6 flex items-center shadow-sm">
        <div className="w-1.5 h-6 bg-indigo-500 rounded-full mr-3"></div>
        <h2 className="$1text-slate-800 dark:text-slate-100 font-bold tracking-tight text-xl$2">$3</h2>
      </div>`
  );

  // Replace the vibrant flex headers with clean professional ones
  content = content.replace(
    /<div className="([^"]*)bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden([^"]*)">\s*<div className="absolute right-0 top-0 w-64 h-64 bg-white\/10 rounded-full blur-3xl -translate-y-1\/2 translate-x-1\/3 pointer-events-none"><\/div>\s*<h2 className="([^"]*)text-white drop-shadow-md([^"]*) relative z-10">([^<]+)<\/h2>/g,
    `<div className="$1bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/50 flex justify-between items-center p-5$2">
          <div className="flex items-center">
            <div className="w-1.5 h-6 bg-indigo-500 rounded-full mr-3 hidden sm:block"></div>
            <h2 className="$3text-slate-800 dark:text-slate-100 font-bold tracking-tight text-xl$4">$5</h2>
          </div>`
  );

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated clean headings in ${path.basename(filepath)}`);
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
console.log('Done clean refactor');
