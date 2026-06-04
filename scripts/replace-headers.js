import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('C:/Users/padma/Downloads/iscale-admin-dashboard_1 (3)/iscale-admin-dashboard_1/iscale-admin/src/pages');

// The new stunning container classes
const newContainerClasses = "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 rounded-t-2xl p-5 flex justify-between items-center shadow-[0_8px_30px_rgba(217,70,239,0.3)] relative overflow-hidden group mb-5";
// Shiny glow elements to inject
const shinyElements = `{/* Shiny glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700 pointer-events-none"></div>`;

let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Pattern 1: Standard title card without button
    const regex1 = /<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200\/60 dark:border-slate-800 p-5 mb-6 flex items-center shadow-sm">([\s\S]*?)<div className="w-1\.5 h-6 bg-indigo-500 rounded-full mr-3"><\/div>\s*<h2 className="text-slate-800 dark:text-slate-100 font-bold tracking-tight text-xl([^"]*)">([^<]+)<\/h2>\s*<\/div>/g;
    
    content = content.replace(regex1, (match, beforeIcon, extraClasses, title) => {
        changed = true;
        return `<div className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 rounded-xl p-5 mb-6 flex items-center shadow-[0_8px_30px_rgba(217,70,239,0.3)] relative overflow-hidden group">
        ${shinyElements}
        <div className="w-1.5 h-7 bg-white/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] relative z-10"></div>
        <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] relative z-10">${title}</h2>
      </div>`;
    });

    // Pattern 2: Title card with button (like AddCourse, PopularCourses)
    const regex2 = /<div className="p-4 border-b border-slate-200 dark:border-gray-800\/50 .*?bg-white dark:bg-slate-900.*?">([\s\S]*?)<div className="w-1\.5 h-6 bg-indigo-500 rounded-full mr-3.*?"><\/div>\s*<h2 className=".*?text-slate-800 dark:text-slate-100.*?">([^<]+)<\/h2>\s*<\/div>([\s\S]*?)<button([^>]*)>([\s\S]*?)<\/button>\s*<\/div>/g;

    content = content.replace(regex2, (match, beforeIcon, title, beforeBtn, btnAttrs, btnContent) => {
        changed = true;
        
        // Update button attributes to be glassy and glowing
        let newBtnAttrs = btnAttrs.replace(/className="[^"]*"/, 'className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all flex items-center gap-2 relative z-10 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"');

        return `<div className="${newContainerClasses}">
          ${shinyElements}
          <div className="flex items-center relative z-10">
            <div className="w-1.5 h-7 bg-white/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
            <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">${title}</h2>
          </div>
          <button${newBtnAttrs}>
            ${btnContent}
          </button>
        </div>`;
    });

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
        console.log('Updated:', path.basename(file));
    }
});

console.log('Total files updated:', updatedCount);
