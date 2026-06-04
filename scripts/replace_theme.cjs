const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/padma/Downloads/iscale-admin-dashboard_1 (3)/iscale-admin-dashboard_1/iscale-admin/src';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace gradient banner (rounded-t-2xl)
  content = content.replace(/bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 rounded-t-2xl p-5 flex justify-between items-center shadow-\[0_8px_30px_rgba\(217,70,239,0\.3\)\] relative overflow-hidden group/g, 'bg-[#144f36] rounded-t-2xl p-5 flex justify-between items-center shadow-md relative overflow-hidden group');
  
  // Replace gradient banner (rounded-2xl)
  content = content.replace(/bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 rounded-2xl shadow-\[0_8px_30px_rgba\(217,70,239,0\.3\)\] border border-white\/10 p-5 mb-5 flex justify-between items-center relative overflow-hidden group/g, 'bg-[#144f36] rounded-2xl shadow-md border border-white/10 p-5 mb-5 flex justify-between items-center relative overflow-hidden group');

  // Replace the button classes
  const buttonRegex = /className=\"bg-white dark:bg-\[\#13111c\]\/20 hover:bg-white dark:bg-\[\#13111c\]\/30 backdrop-blur-md text-white border border-white\/30 px-5 py-2\.5 rounded-full text-sm font-bold shadow-\[0_4px_15px_rgba\(0,0,0,0\.1\)\] transition-all flex items-center gap-2 relative z-10 hover:shadow-\[0_0_15px_rgba\(255,255,255,0\.4\)\] hover:-translate-y-0\.5\"/g;
  const newButtonClass = 'className=\"bg-white hover:bg-slate-50 text-[#144f36] px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2 relative z-10 hover:shadow hover:-translate-y-0.5\"';
  content = content.replace(buttonRegex, newButtonClass);

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

walk(srcDir);
