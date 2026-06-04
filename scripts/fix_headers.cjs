const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/padma/Downloads/iscale-admin-dashboard_1 (3)/iscale-admin-dashboard_1/iscale-admin/src/pages/courses';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Fix header bg that was missed because of class order
  content = content.replace(/className="p-4 border-b border-slate-200 dark:border-gray-800\/50 flex justify-between items-center bg-\[#f6f6ff\] dark:bg-\[#1f1b2e\]"/g, 'className="p-4 flex justify-between items-center flex-wrap gap-4 bg-[#144f36] text-white rounded-t-2xl"');
  
  // Another possible variation missed
  content = content.replace(/className="bg-\[#f6f6ff\] dark:bg-\[#1f1b2e\] border-b border-slate-200 dark:border-\[#1f1b2e\] p-4"/g, 'className="p-4 flex justify-between items-center flex-wrap gap-4 bg-[#144f36] text-white rounded-t-2xl"');

  // Also some headers don't have dark:bg
  content = content.replace(/className="p-4 border-b border-slate-200 flex justify-between items-center bg-\[#f6f6ff\]"/g, 'className="p-4 flex justify-between items-center flex-wrap gap-4 bg-[#144f36] text-white rounded-t-2xl"');

  // Some tables have a blue header: bg-[#2a4e70] or bg-[#1b365d]. Let's make them green too! bg-[#144f36]
  content = content.replace(/bg-\[#2a4e70\]/g, 'bg-[#144f36]');
  content = content.replace(/bg-\[#1b365d\]/g, 'bg-[#144f36]');

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
