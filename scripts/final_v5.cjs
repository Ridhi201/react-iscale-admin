const fs = require('fs');
const path = require('path');

function updateThemeAndLayout() {
  const layoutPath = path.join(__dirname, 'src', 'layouts', 'MainLayout.jsx');
  if (fs.existsSync(layoutPath)) {
    let content = fs.readFileSync(layoutPath, 'utf8');
    // Replace the purple/pink background with the creamy beige color
    content = content.replace(/bg-\[#eed7ff\]/g, 'bg-[#fdf3d7]');
    fs.writeFileSync(layoutPath, content, 'utf8');
  }
}

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // Replace the purple/pink color with the new creamy beige color
  content = content.replace(/bg-\[#eabfff\]/g, 'bg-[#fcefcb]');

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`V5 applied to ${path.basename(filepath)}`);
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

console.log('Done V5');
