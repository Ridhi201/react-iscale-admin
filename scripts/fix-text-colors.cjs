const fs = require('fs');
const path = require('path');

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Add dark text colors if missing
  content = content.replace(/\b(text-slate-900|text-gray-900)\b(?!\s*dark:text-[a-z]+-\d+)(?!\s*dark:text-white)/g, '$1 dark:text-white');
  content = content.replace(/\b(text-slate-800|text-gray-800)\b(?!\s*dark:text-[a-z]+-\d+)(?!\s*dark:text-slate-200)/g, '$1 dark:text-slate-200');
  content = content.replace(/\b(text-slate-700|text-gray-700)\b(?!\s*dark:text-[a-z]+-\d+)(?!\s*dark:text-slate-300)/g, '$1 dark:text-slate-300');
  content = content.replace(/\b(text-slate-600|text-gray-600)\b(?!\s*dark:text-[a-z]+-\d+)(?!\s*dark:text-slate-400)/g, '$1 dark:text-slate-400');
  
  // Also fix text-indigo-900/800
  content = content.replace(/\b(text-indigo-900|text-indigo-800)\b(?!\s*dark:text-[a-z]+-\d+)/g, '$1 dark:text-indigo-300');

  // Fix borders
  content = content.replace(/\b(border-slate-200|border-slate-300|border-gray-200|border-gray-300)\b(?!\s*dark:border-[a-z]+-\d+)/g, '$1 dark:border-slate-700');

  // Fix backgrounds
  content = content.replace(/\b(bg-white)\b(?!\s*dark:bg-[a-z#\-\[\]0-9]+)/g, '$1 dark:bg-[#0f172a]');
  content = content.replace(/\b(bg-slate-50|bg-slate-100|bg-gray-50)\b(?!\s*dark:bg-[a-z#\-\[\]0-9]+)/g, '$1 dark:bg-slate-800/50');
  
  // Edge case: Sometimes dark:text-slate-800 is mistakenly added in dark theme? We should ensure dark text is light
  content = content.replace(/\bdark:text-slate-800\b/g, 'dark:text-slate-200');
  content = content.replace(/\bdark:text-slate-900\b/g, 'dark:text-white');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated text contrast in ${path.basename(filepath)}`);
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

processDirectory(path.join(__dirname, 'src', 'pages'));
processDirectory(path.join(__dirname, 'src', 'components'));
