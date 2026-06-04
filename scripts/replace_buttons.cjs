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

  // Search Button
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>Search<\/button>)/gi, '$1btn-glossy-blue$3');
  // Handle case where label might have leading/trailing spaces
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>\s*Search\s*<\/button>)/gi, '$1btn-glossy-blue$3');

  // Filter Button
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>Filter<\/button>)/gi, '$1btn-glossy-teal$3');
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>\s*Filter\s*<\/button>)/gi, '$1btn-glossy-teal$3');

  // Reset Button
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>Reset<\/button>)/gi, '$1btn-glossy-purple$3');
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>\s*Reset\s*<\/button>)/gi, '$1btn-glossy-purple$3');

  // Export Button
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>Export<\/button>)/gi, '$1btn-glossy-royalblue$3');
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>\s*Export\s*<\/button>)/gi, '$1btn-glossy-royalblue$3');

  // Delete/Trash button - often has red/orange background and Trash icon
  // e.g. hover:bg-[#c9302c] or text-[#d9534f] or hover:bg-[#d45540]
  // Let's replace button class with btn-glossy-red icon-only if it contains Trash or red colors
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?(?:bg-\[#e96b56\]|bg-\[#d9534f\]|bg-red-600|text-red-500|hover:text-red-600)[^"']*?)(["'][^>]*>[\s\S]*?(?:Trash|Delete)[\s\S]*?<\/button>)/gi, 
                            (match, p1, p2, p3) => {
                               // Check if it's icon only or has text
                               const isIconOnly = !p3.match(/>[A-Za-z\s]+<\/button>/);
                               return `${p1}btn-glossy-red ${isIconOnly ? 'icon-only' : ''}${p3}`;
                            });
  
  // Try another approach for Delete text buttons
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>\s*(?:<[^>]+>\s*)?Delete(?:\s*<[^>]+>)?\s*<\/button>)/gi, '$1btn-glossy-red$3');

  // Catch generic red action buttons from previous passes (like text-[#d9534f])
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>.*?FiTrash2.*?<\/button>)/gi, '$1btn-glossy-red icon-only$3');
  content = content.replace(/(<button[^>]*class(?:Name)?=["'])([^"']*?)(["'][^>]*>.*?Trash2.*?<\/button>)/gi, '$1btn-glossy-red icon-only$3');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedFiles++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Successfully updated buttons in ${modifiedFiles} files.`);
