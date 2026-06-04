const fs = require('fs');
const path = require('path');

const pageDir = path.join(__dirname, 'src', 'pages');

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // Edit and Delete buttons
  content = content.replace(
    /<button className="bg-green-600 text-white p-1\.5 rounded-full hover:bg-green-700 transition-colors">\s*<Edit2 size=\{14\} \/>\s*<\/button>/g,
    '<IconButton icon={Edit2} variant="success" />'
  );
  
  content = content.replace(
    /<button className="bg-\[#e98036\] text-white p-1\.5 rounded-full hover:bg-\[#d87025\] transition-colors">\s*<Trash2 size=\{14\} \/>\s*<\/button>/g,
    '<IconButton icon={Trash2} variant="danger" />'
  );

  // General blue submit buttons
  content = content.replace(
    /<button[^>]*className="[^"]*bg-\[#428bca\] text-white[^"]*px-6 py-2[^"]*flex-1[^"]*"[^>]*>\s*Submit\s*<\/button>/g,
    '<Button fullWidth className="py-2">Submit</Button>'
  );

  content = content.replace(
    /<button[^>]*className="[^"]*bg-\[#1b365d\] text-white[^"]*px-6 py-2[^"]*flex-1[^"]*"[^>]*>\s*Cancel\s*<\/button>/g,
    '<Button variant="dark" fullWidth className="py-2">Cancel</Button>'
  );

  content = content.replace(
    /<button[^>]*className="[^"]*bg-\[#428bca\] text-white[^"]*px-4 py-1\.5[^"]*"[^>]*>\s*« Back\s*<\/button>/g,
    '<Button onClick={() => navigate(\'/home\')} className="px-4 py-1.5">« Back</Button>'
  );
  
  if (content !== origContent) {
    let imports = [];
    if (content.includes('<Button') && !content.includes('import Button')) {
      imports.push("import Button from '../components/common/Button'");
    }
    if (content.includes('<IconButton') && !content.includes('import IconButton')) {
      imports.push("import IconButton from '../components/common/IconButton'");
    }
    
    if (imports.length > 0) {
      const importIdx = content.indexOf('import ');
      if (importIdx !== -1) {
        content = content.slice(0, importIdx) + imports.join('\n') + '\n' + content.slice(importIdx);
      } else {
        content = imports.join('\n') + '\n\n' + content;
      }
    }
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Refactored ${path.basename(filepath)}`);
  }
}

fs.readdirSync(pageDir).forEach(file => {
  if (file.endsWith('.jsx')) {
    refactorFile(path.join(pageDir, file));
  }
});

console.log('Done');
