const fs = require('fs');
const path = require('path');

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // Replace title headers like in Registrations.jsx
  // from: <div className="bg-[#f6f6ff] rounded-2xl shadow-md ... mb-5">
  //         <h2 className="text-indigo-900 ...">...</h2>
  //       </div>
  content = content.replace(
    /<div className="bg-\[#f6f6ff\][^"]*mb-5[^"]*">\s*<h2 className="([^"]*)text-indigo-900([^"]*)">([^<]+)<\/h2>\s*<\/div>/g,
    `<div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)] border border-indigo-500/50 p-5 mb-5 overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <h2 className="$1text-white drop-shadow-md$2 relative z-10">$3</h2>
      </div>`
  );

  // Replace flex headers like in AllCourses.jsx
  // from: <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 flex justify-between items-center bg-[#f6f6ff] dark:bg-slate-800">
  //         <h2 className="text-xl font-medium text-indigo-900 font-bold tracking-tight">All Courses List</h2>
  content = content.replace(
    /<div className="([^"]*)bg-\[#f6f6ff\]([^"]*)">\s*<h2 className="([^"]*)text-indigo-900([^"]*)">([^<]+)<\/h2>/g,
    `<div className="$1bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden$2">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <h2 className="$3text-white drop-shadow-md$4 relative z-10">$5</h2>`
  );

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated headings in ${path.basename(filepath)}`);
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
console.log('Done coloring headings');
