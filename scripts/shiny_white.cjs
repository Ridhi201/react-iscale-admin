const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/padma/Downloads/iscale-admin-dashboard_1 (3)/iscale-admin-dashboard_1/iscale-admin/src/components';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Ultra-clear shiny white card styling
  // Remove old border classes
  content = content.replace(/border border-slate-200\/60/g, 'border border-white ring-1 ring-black/[0.02]');
  content = content.replace(/border border-slate-100/g, 'border border-white ring-1 ring-black/[0.02]');
  
  // Update backgrounds to a shiny micro-gradient
  content = content.replace(/className=\"bg-white /g, 'className=\"bg-gradient-to-b from-white to-[#fcfcfd] ');

  // Update shadows to be ultra-smooth and diffused
  content = content.replace(/shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\]/g, 'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)]');
  content = content.replace(/shadow-\[0_4px_20px_rgba\(34,197,94,0\.05\)\]/g, 'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)]');
  
  content = content.replace(/hover:shadow-\[0_8px_30px_rgba\(20,79,54,0\.08\)\]/g, 'hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.1)]');
  content = content.replace(/hover:shadow-\[0_4px_25px_rgba\(34,197,94,0\.15\)\]/g, 'hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.1)]');
  content = content.replace(/hover:shadow-\[0_14px_40px_rgba\(20,79,54,0\.08\)\]/g, 'hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.12)]');

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
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

walk(srcDir);
