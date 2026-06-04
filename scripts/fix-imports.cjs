const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const subdirs = fs.readdirSync(pagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let totalChanged = 0;

for (const subdir of subdirs) {
  const dirPath = path.join(pagesDir, subdir);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.jsx'));
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // The top-level src directories we know exist
    const dirsToFix = ['components', 'store', 'config', 'utils', 'styles', 'layouts', 'hooks', 'services'];
    
    for (const dir of dirsToFix) {
      // Single quotes
      const regex1 = new RegExp(`from '\\.\\.\\/${dir}`, 'g');
      content = content.replace(regex1, `from '../../${dir}`);
      
      // Double quotes
      const regex2 = new RegExp(`from "\\.\\.\\/${dir}`, 'g');
      content = content.replace(regex2, `from "../../${dir}`);
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      totalChanged++;
    }
  }
}

console.log(`Fixed imports in ${totalChanged} files.`);
