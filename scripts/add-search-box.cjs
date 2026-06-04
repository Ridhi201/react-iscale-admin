const fs = require('fs');
const path = require('path');

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

const searchBlock = `{/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 mb-2">Search</label>
            <input type="text" placeholder="Search..." className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
          </div>
          `;

filesToFix.forEach(relPath => {
  const fp = path.join(__dirname, relPath);
  if (!fs.existsSync(fp)) return;
  
  let content = fs.readFileSync(fp, 'utf8');
  
  // We need to check if `{/* Search */}` is in the Filters Card section.
  // A simple check: if it doesn't contain `{/* Search */}`, insert it before `{/* Buttons */}`.
  
  if (!content.includes('{/* Search */}')) {
    // Insert right before `{/* Buttons */}`
    content = content.replace('{/* Buttons */}', searchBlock + '{/* Buttons */}');
    fs.writeFileSync(fp, content);
    console.log('Added search box to', relPath);
  } else {
    console.log('Search box already exists in', relPath);
  }
});
