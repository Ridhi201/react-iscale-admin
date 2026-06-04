const fs = require('fs');
const path = require('path');

function updateThemeAndLayout() {
  const layoutPath = path.join(__dirname, 'src', 'layouts', 'MainLayout.jsx');
  if (fs.existsSync(layoutPath)) {
    let content = fs.readFileSync(layoutPath, 'utf8');
    // Replace the beige background with the requested #f6f6ff
    content = content.replace(/bg-\[#fdf3d7\]/g, 'bg-[#f6f6ff]');
    fs.writeFileSync(layoutPath, content, 'utf8');
  }
}

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // Replace the beige color with the new #f6f6ff color
  content = content.replace(/bg-\[#fcefcb\]/g, 'bg-[#f6f6ff]');

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`V6 applied to ${path.basename(filepath)}`);
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

updateThemeAndLayout();
processDirectory(path.join(__dirname, 'src', 'pages'));
processDirectory(path.join(__dirname, 'src', 'components'));

console.log('Done V6');
