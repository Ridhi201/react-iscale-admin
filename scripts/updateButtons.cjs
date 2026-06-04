const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (file.endsWith('.jsx')) {
      filelist.push(dirFile);
    }
  }
  return filelist;
};

const files = walkSync(directoryPath);

let modifiedFiles = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Remove Go Back button completely
  content = content.replace(/<button[^>]*>Go Back<\/button>/gi, '');

  // Replace Filter button color
  content = content.replace(/bg-indigo-600 hover:bg-indigo-700([^>]*>Filter<\/button>)/gi, 'bg-stone-700 hover:bg-stone-800$1');

  // Replace Reset button color
  content = content.replace(/bg-rose-500 hover:bg-rose-600([^>]*>Reset<\/button>)/gi, 'bg-stone-700 hover:bg-stone-800$1');

  // Add/Create buttons are usually something like bg-slate-50 dark:bg-[#0f172a] text-slate-700
  // Let's replace 'bg-slate-50 dark:bg-[#0f172a] text-slate-700' with 'bg-stone-700 hover:bg-stone-800 text-white' if it's an Add or Create button.
  // Actually, let's just find <button> that contains 'Create ' or 'Add ' and manually fix it in LiveClasses.jsx.
  content = content.replace(/(<button[^>]*class(?:Name)?=["'][^"']*)bg-slate-50 dark:bg-\[#0f172a\] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800([^"']*["'][^>]*>(?:Create|Add) [^<]+<\/button>)/gi, 
                            '$1bg-stone-700 text-white border-none hover:bg-stone-800$2');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedFiles++;
  }
});

console.log(`Successfully updated buttons in ${modifiedFiles} files.`);
