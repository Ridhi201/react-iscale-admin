const fs = require('fs');
const path = require('path');

const directoriesToScan = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'layouts')
];

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx')) {
      filelist.push(dirFile);
    }
  }
  return filelist;
};

let files = [];
directoriesToScan.forEach(dir => {
  files = files.concat(walkSync(dir));
});

let modifiedFiles = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Find buttons that trigger handleDelete and replace their classes with btn-glossy-red icon-only
  // Specifically: <button onClick={() => handleDelete(row._id)} className="...">
  content = content.replace(/(<button[^>]*onClick=\{[^}]*handleDelete[^}]*\}[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>)/gi, '$1btn-glossy-red icon-only$3');
  
  // Find buttons that contain <FiTrash2 or <Trash
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>\s*<(?:FiTrash2|Trash2|Trash)[^>]*>.*<\/button>)/gi, '$1btn-glossy-red icon-only$3');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedFiles++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Successfully updated remaining buttons in ${modifiedFiles} files.`);
