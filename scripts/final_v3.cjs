const fs = require('fs');
const path = require('path');

function updateThemeAndLayout() {
  const themePath = path.join(__dirname, 'src', 'store', 'ThemeContext.jsx');
  if (fs.existsSync(themePath)) {
    let content = fs.readFileSync(themePath, 'utf8');
    // Force dark mode OFF permanently
    content = content.replace(/localStorage\.getItem\('theme'\) !== 'light'/g, 'false');
    content = content.replace(/const \[dark, setDark\] = useState\(\(\) => \{[\s\S]*?\}\)/, 'const [dark, setDark] = useState(false)');
    fs.writeFileSync(themePath, content, 'utf8');
  }

  const layoutPath = path.join(__dirname, 'src', 'layouts', 'MainLayout.jsx');
  if (fs.existsSync(layoutPath)) {
    let content = fs.readFileSync(layoutPath, 'utf8');
    // Replace background with light bluish/purple
    content = content.replace(/bg-\[#f8fafc\]/g, 'bg-[#f4f7fc]');
    fs.writeFileSync(layoutPath, content, 'utf8');
  }
  
  const sidebarPath = path.join(__dirname, 'src', 'components', 'layout', 'Sidebar.jsx');
  if (fs.existsSync(sidebarPath)) {
    let content = fs.readFileSync(sidebarPath, 'utf8');
    // Ensure Sidebar is a nice blue/black as requested before, or if they meant remove black here too?
    // "black ko hatao" probably means dark mode, but I will make the sidebar a deep rich indigo/blue instead of pitch black
    content = content.replace(/bg-\[#0f172a\]/g, 'bg-[#1e1b4b]'); // deep indigo-950 instead of black
    fs.writeFileSync(sidebarPath, content, 'utf8');
  }
}

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // 1. Remove ANY row highlight logic entirely
  // e.g., className={`... ${row.highlight ? 'bg-[#ffebe6]' : 'bg-white'}`} -> className={`... bg-white`}
  content = content.replace(/\$\{row\.highlight\s*\?\s*'[^']+'\s*:\s*'([^']+)'\}/g, '$1');
  content = content.replace(/row\.highlight\s*\?\s*'[^']+'\s*:\s*'([^']+)'/g, "'$1'");
  
  // Hard replace of the color just in case it's hardcoded somewhere
  content = content.replace(/bg-\[#ffebe6\]/g, 'bg-white');

  // 2. "whitek jagh ligh pule pink bluish colur add kro sabhi kagh"
  // Let's replace the card/table backgrounds from pure white to a very subtle bluish-white tint
  content = content.replace(/bg-white/g, 'bg-[#f8faff]'); 
  // Restore text-white because it gets overwritten by above
  content = content.replace(/text-\[#f8faff\]/g, 'text-white');
  content = content.replace(/bg-\[#f8faff\]\/10/g, 'bg-white/10');
  content = content.replace(/bg-\[#f8faff\]\/20/g, 'bg-white/20');
  content = content.replace(/border-\[#f8faff\]\/20/g, 'border-white/20');

  // 3. Ensure buttons are rounded-full and colored exactly as the screenshot
  // They might be written as just <button> without my previous regex catching them if they were native buttons
  // The user says "sare same wse he krdo baki sare pages m" meaning make sure ALL pages have this.
  
  // Filter button is sometimes <button className="bg-indigo-600...">Filter</button>
  content = content.replace(/<button[^>]*>Filter<\/button>/gi, '<button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Filter</button>');
  
  // Reset
  content = content.replace(/<button[^>]*>Reset<\/button>/gi, '<button className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Reset</button>');
  
  // Export
  content = content.replace(/<button[^>]*>Export<\/button>/gi, '<button className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Export</button>');
  
  // Copy
  content = content.replace(/<button[^>]*>Copy<\/button>/gi, '<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Copy</button>');
  
  // Excel
  content = content.replace(/<button[^>]*>Excel<\/button>/gi, '<button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Excel</button>');
  
  // PDF
  content = content.replace(/<button[^>]*>PDF<\/button>/gi, '<button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm">PDF</button>');
  
  // Print
  content = content.replace(/<button[^>]*>Print<\/button>/gi, '<button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Print</button>');

  // 4. "black ko hatao" - remove dark classes to clean up if needed, though forcing ThemeContext is safer.
  // I will just let ThemeContext handle it.

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`V3 applied to ${path.basename(filepath)}`);
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

console.log('Done V3');
