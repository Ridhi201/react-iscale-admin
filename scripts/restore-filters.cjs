const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, 'src', 'pages');

const filesToFix = [
  'src/pages/courses/CourseWishlist.jsx',
  'src/pages/dashboard/LeaderBoard.jsx',
  'src/pages/events-webinars/EventRegistrations.jsx',
  'src/pages/events-webinars/WebinarRegistrations.jsx',
  'src/pages/events-webinars/WebinarWishlist.jsx',
  'src/pages/jobs-careers/JobRegistrations.jsx',
  'src/pages/live-classes/BatchManagement.jsx',
  'src/pages/live-classes/LiveClasses.jsx',
  'src/pages/misc/CertificateRequests.jsx',
  'src/pages/misc/Registrations.jsx',
  'src/pages/notes/NotesRegistrations.jsx',
  'src/pages/notes/NotesWishlist.jsx',
  'src/pages/test-series/TestSeriesRegistrations.jsx',
  'src/pages/test-series/TestSeriesWishlist.jsx'
];

function getBlock(name) {
  if (name === 'Buttons') {
    return `<div className="flex-none flex gap-2 h-[38px] w-full md:w-auto mt-7">
            <button className="px-5 py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Filter</button>
            <button className="px-5 py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Reset</button>
            <button className="px-5 py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Export</button>
          </div>`;
  }
  
  if (name === 'Search') {
    return `<div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 mb-2">${name}</label>
            <input type="text" placeholder="Search..." className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
          </div>`;
  }

  if (name.includes('Date')) {
    return `<div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 mb-2">${name}</label>
            <input type="date" className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-500" />
          </div>`;
  }

  // Default to select dropdown for Status, Course, Package, Registration From, etc.
  let options = `<option>Select Value</option>`;
  if (name === 'Status') {
    options += `\n              <option>Active</option>\n              <option>Inactive</option>`;
  } else if (name === 'Registration From') {
    options += `\n              <option>App</option>\n              <option>Web</option>`;
  }

  return `<div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 mb-2">${name}</label>
            <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
              ${options}
            </select>
          </div>`;
}

filesToFix.forEach(relPath => {
  const fp = path.join(__dirname, relPath);
  if (!fs.existsSync(fp)) return;
  
  let content = fs.readFileSync(fp, 'utf8');
  
  // Replace each comment with the comment + the block
  content = content.replace(/\{\/\* ([a-zA-Z\s]+) \*\/\}\s*(?!<div)/g, (match, p1) => {
    return `{\/* ${p1} *\/}\n          ${getBlock(p1)}\n          `;
  });
  
  fs.writeFileSync(fp, content);
  console.log('Restored', relPath);
});
