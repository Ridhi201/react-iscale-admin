import fs from 'fs';
import path from 'path';

// Paths
const backupPagesDir = 'C:/Users/padma/Downloads/iscale-backup/iscale-admin-dashboard_1 (2)/iscale-admin-dashboard_1/iscale-admin/src/pages';
const targetPagesDir = 'C:/Users/padma/Downloads/iscale-admin-dashboard_1 (3)/iscale-admin-dashboard_1/iscale-admin/src/pages';

// 1. Copy backup pages to target, overriding everything
function copyDirectorySync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectorySync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Restoring pages from pristine backup...');
copyDirectorySync(backupPagesDir, targetPagesDir);
console.log('Restore complete!');

// Custom recursive file finder
function findJSXFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      findJSXFiles(filePath, fileList);
    } else if (file.name.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// 2. Perform safe, non-destructive regex replacements
console.log('Applying safe Fuchsia headers...');
const files = findJSXFiles(targetPagesDir);

let modifiedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Upgrade the main page wrapper
  content = content.replace(
    /className="([^"]*)bg-white dark:bg-slate-900 rounded-2xl([^"]*)"/g,
    'className="$1bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors$2"'
  );

  // 2. Upgrade the actual Header wrapper
  const headerRegex = /<div className="bg-white dark:bg-slate-900 rounded-2xl p-4 ([^"]*) items-center([^"]*) mb-5">/g;
  content = content.replace(
    headerRegex,
    `<div className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 rounded-t-2xl p-5 $1 items-center shadow-[0_8px_30px_rgba(217,70,239,0.3)] relative overflow-hidden group mb-5">
          {/* Shiny glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700 pointer-events-none"></div>`
  );

  // 3. Upgrade the little indigo bar to a glowing white bar
  content = content.replace(
    /<div className="w-1 h-6 bg-indigo-500 rounded-full mr-3"><\/div>/g,
    '<div className="w-1.5 h-7 bg-white/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>'
  );

  // 4. Upgrade the Title (h2)
  content = content.replace(
    /<h2 className="text-slate-800 dark:text-white font-semibold text-lg drop-shadow-sm">/g,
    '<h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">'
  );
  
  // 5. Optionally fix the "relative z-10" wrapper for flex items-center next to the bar
  content = content.replace(
    /<div className="flex items-center">(\s*<div className="w-1\.5 h-7)/g,
    '<div className="flex items-center relative z-10">$1'
  );

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    modifiedCount++;
  }
}

console.log(`Successfully upgraded ${modifiedCount} files with safe Fuchsia headers! No tags were swallowed.`);
