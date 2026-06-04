const fs = require('fs');
const path = require('path');

function updateThemeAndLayout() {
  const layoutPath = path.join(__dirname, 'src', 'layouts', 'MainLayout.jsx');
  if (fs.existsSync(layoutPath)) {
    let content = fs.readFileSync(layoutPath, 'utf8');
    // Replace main background with the specific purple color from the image
    // #ebd5ff or #e8baff (Lavender/light purple)
    content = content.replace(/bg-\[#f4f7fc\]/g, 'bg-[#eed7ff]');
    fs.writeFileSync(layoutPath, content, 'utf8');
  }
}

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // Replace the custom bluish-white tint with the image's purple color
  // #e3b5ff is a good match for the middle color block in the image
  content = content.replace(/bg-\[#f8faff\]/g, 'bg-[#eabfff]'); 
  
  // Replace any remaining bg-white with this purple color as requested ("white ki jagh ye colur add kro")
  content = content.replace(/bg-white/g, 'bg-[#eabfff]');

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`V4 applied to ${path.basename(filepath)}`);
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

console.log('Done V4');
