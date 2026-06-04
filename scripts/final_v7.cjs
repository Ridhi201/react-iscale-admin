const fs = require('fs');
const path = require('path');

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // Make "Go Back" buttons workable
  // Only replace if they don't already have an onClick
  content = content.replace(/<button([^>]*)>Go Back<\/button>/gi, (match, p1) => {
    if (p1.includes('onClick')) return match;
    return `<button${p1} onClick={() => window.history.back()}>Go Back</button>`;
  });

  // Make "Create..." and "Add..." buttons workable
  // We match <button ...>Create Something</button> or Add Something
  content = content.replace(/<button([^>]*)>(Create\s+[^<]+|Add\s+[^<]+)<\/button>/gi, (match, p1, p2) => {
    if (p1.includes('onClick')) return match; // Skip if already workable
    return `<button${p1} onClick={() => window.location.href = window.location.pathname.replace(/\\/$/, '') + '/add'}>${p2}</button>`;
  });

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Navigation applied to ${path.basename(filepath)}`);
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

console.log('Done V7 Navigation');
