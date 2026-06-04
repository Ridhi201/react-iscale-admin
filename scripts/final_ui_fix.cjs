const fs = require('fs');
const path = require('path');

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // 1. Table padding reduction and text shrinking
  // Headers
  content = content.replace(/className="px-4 py-4 font-bold/g, 'className="px-3 py-3 font-semibold text-xs');
  content = content.replace(/className="px-4 py-4 font-bold border-r/g, 'className="px-3 py-3 font-semibold text-xs border-r');
  
  // Rows
  content = content.replace(/className="px-4 py-6/g, 'className="px-3 py-3 text-xs');
  content = content.replace(/px-4 py-6 border-r/g, 'px-3 py-3 text-xs border-r');
  
  // 2. Remove the orange/pink highlight from selected rows
  // Typical match: ${row.highlight ? 'bg-[#ffebe6]' : 'bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-[#1f2937] transition-colors'}
  const highlightRegex = /\$\{row\.highlight \? '[^']+' : '([^']+)'\}/g;
  content = content.replace(highlightRegex, '$1');

  // Also catch variations where the color was different
  content = content.replace(/row\.highlight \? '[^']+' : '([^']+)'/g, "'$1'");

  // 3. Just in case there are remaining orange colors (#e98036 or #f97316 or #ea580c), replace them
  content = content.replace(/#e98036/g, '#1e40af'); // replace with deep blue
  content = content.replace(/text-orange-500/g, 'text-blue-600');
  content = content.replace(/bg-orange-500/g, 'bg-blue-600');

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`UI Fixed ${path.basename(filepath)}`);
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

console.log('Done Final UI Fix');
