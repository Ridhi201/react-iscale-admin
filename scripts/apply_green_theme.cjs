const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/padma/Downloads/iscale-admin-dashboard_1 (3)/iscale-admin-dashboard_1/iscale-admin/src/pages/courses';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Add Icons import if not present
  if (!content.includes('lucide-react') && !content.includes('Icons')) {
    content = "import * as Icons from 'lucide-react';\n" + content;
  } else if (!content.includes('import * as Icons from \'lucide-react\'') && content.includes('lucide-react')) {
    // If it imports specific icons from lucide-react, we might just append import * as Icons
    content = content.replace(/import \{.*?\} from 'lucide-react'/, "$&\nimport * as Icons from 'lucide-react'");
  }

  // 1. Replace the header container
  // Variations:
  // className="p-4 border-b border-slate-200 dark:border-gray-800/50 flex justify-between items-center bg-[#f6f6ff] dark:bg-[#1f1b2e]"
  // className="bg-[#f6f6ff] dark:bg-[#1f1b2e] border-b border-slate-200 dark:border-[#1f1b2e] p-4"
  content = content.replace(/className="[^"]*bg-\[#f6f6ff\][^"]*flex justify-between[^"]*"/g, 'className="p-4 flex justify-between items-center flex-wrap gap-4 bg-[#144f36] text-white rounded-t-2xl"');
  content = content.replace(/className="bg-\[#f6f6ff\][^"]*p-4"\s*>\s*<div className="flex justify-between items-center flex-wrap gap-4"/g, 'className="p-4 flex justify-between items-center flex-wrap gap-4 bg-[#144f36] text-white rounded-t-2xl"');
  content = content.replace(/<div className="bg-\[#f6f6ff\][^"]*p-4">/g, '<div className="p-4 flex justify-between items-center flex-wrap gap-4 bg-[#144f36] text-white rounded-t-2xl">');
  
  // 2. Replace the h2 text classes
  // className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight"
  content = content.replace(/className="text-xl[^"]*text-indigo-900[^"]*"/g, 'className="text-xl font-bold tracking-tight text-white flex items-center gap-2"');
  
  // 3. Replace the Header buttons (+ Back, + Add)
  // These are typically right after the h2 or inside a gap-2 div in the header
  // Let's replace ALL bg-[#428bca] first to be standard green buttons
  content = content.replace(/bg-\[#428bca\]/g, 'bg-[#144f36]');
  content = content.replace(/hover:bg-\[#3071a9\]/g, 'hover:bg-[#0f3d2a]');
  
  // Now, specifically for buttons inside the header (which is now green), we need them to be white
  // They are typically 'text-white'. Since the header is now green, a button with bg-[#144f36] on a bg-[#144f36] header will blend in.
  // Actually, we can just replace 'bg-[#144f36] text-white' with 'bg-white text-[#144f36]' if it's inside the header.
  // Or we can just use regex to target buttons that have "Back To", "Add New", "Courses" etc next to them.
  content = content.replace(/className="bg-\[#144f36\] text-white([^"]*)">(\s*)<span[^>]*>\+ Back/g, 'className="bg-white text-[#144f36] shadow-sm hover:shadow hover:bg-emerald-50$1">$2<span>+ Back');
  content = content.replace(/className="bg-\[#144f36\] text-white([^"]*)">(\s*)<span[^>]*>↩/g, 'className="bg-white text-[#144f36] shadow-sm hover:shadow hover:bg-emerald-50$1">$2<span>↩');
  content = content.replace(/className="bg-\[#144f36\] text-white([^"]*)">(\s*)<span[^>]*>\+ Add/g, 'className="bg-white text-[#144f36] shadow-sm hover:shadow hover:bg-emerald-50$1">$2<span>+ Add');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

walk(srcDir);
