const fs = require('fs');
const path = require('path');

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // The universal_refactor missed restoring text colors, leaving them as light text on white backgrounds.
  // We need to restore proper text contrast.
  
  // 1. text-slate-300 -> text-slate-800 dark:text-slate-300
  // Exclude cases where it's already part of dark:text-slate-300
  content = content.replace(/(?<!dark:)text-slate-300/g, 'text-slate-800 dark:text-slate-300');
  
  // 2. text-slate-400 -> text-slate-600 dark:text-slate-400
  content = content.replace(/(?<!dark:)text-slate-400/g, 'text-slate-600 dark:text-slate-400');

  // 3. text-white in headings -> text-slate-900 dark:text-white
  // In Dashboard and other headers, we had text-white
  content = content.replace(/<h2 className="([^"]*)text-white([^"]*)">/g, '<h2 className="$1text-slate-900 dark:text-white$2">');
  
  // 4. Form inputs that had text-slate-300
  // They were caught by the first regex, so they will be text-slate-800 dark:text-slate-300.
  // And placeholders: placeholder:text-slate-400 is fine.
  
  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Contrast Fixed ${path.basename(filepath)}`);
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

console.log('Done Contrast Fix');
