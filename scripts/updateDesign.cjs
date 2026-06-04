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

  // 1. Remove Orange Table Headers
  // Replace <thead className="bg-[#d15c25] text-white"> with a sleek premium look
  content = content.replace(/className=(["'])bg-\[\#d15c25\]\s+text-white\1/g, 'className="bg-slate-50 dark:bg-[#0f172a] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800"');
  
  // Also remove orange from buttons (e.g. action buttons)
  content = content.replace(/bg-\[\#d15c25\]/g, 'bg-stone-700');
  content = content.replace(/bg-\[\#c1501f\]/g, 'bg-stone-800');

  // 2. Unify "Copy", "Excel", "PDF", "Print", "CSV", "Export" buttons
  // Common pattern: className="px-4 py-2 bg-[something] hover:bg-[something] text-white rounded-full text-sm font-medium transition-colors shadow-sm">Copy</button>
  const buttonPattern = /(<button[^>]*class(?:Name)?=["'][^"']*)bg-(?:blue|green|pink|teal|emerald)-500\s+hover:bg-(?:blue|green|pink|teal|emerald)-600([^"']*["'][^>]*>(?:Copy|Excel|PDF|Print|CSV|Export)<\/button>)/gi;
  content = content.replace(buttonPattern, '$1bg-stone-700 hover:bg-stone-800 btn-premium$2');

  // Also replace any generic bg-blue-500/green-500 buttons that say Export/Copy etc that might have different classes
  content = content.replace(/className=(["'])[^"']*bg-(?:blue|green|pink|teal|emerald)-500[^"']*["']([^>]*>)(Copy|Excel|PDF|Print|CSV|Export)/gi, 'className="px-4 py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 btn-premium"$2$3');

  // 3. Add Framer Motion initial animations to main wrappers if they don't have them
  // We can add a generic fade-in class to the main container divs.
  // Find <div className="h-full"> or similar top-level divs and add our animation class
  content = content.replace(/<div className="h-full">/g, '<div className="h-full animate-fade-in-up">');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedFiles++;
  }
});

console.log(`Successfully updated design in ${modifiedFiles} files.`);
