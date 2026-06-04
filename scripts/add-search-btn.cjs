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

filesToFix.forEach(relPath => {
  const fp = path.join(__dirname, relPath);
  if (!fs.existsSync(fp)) return;
  
  let content = fs.readFileSync(fp, 'utf8');
  
  // We want to add a Search button before the Filter button.
  // The Filter button looks like: <button className="px-5 py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Filter</button>
  
  // First, check if a Search button already exists so we don't add duplicates
  if (!content.includes('>Search</button>')) {
    const searchBtn = `<button className="px-5 py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Search</button>\n            `;
    content = content.replace(
      /<button className="px-5 py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-full text-sm font-medium transition-colors shadow-sm">Filter<\/button>/g,
      match => searchBtn + match
    );
    
    fs.writeFileSync(fp, content);
    console.log('Added Search button to', relPath);
  } else {
    console.log('Search button already exists in', relPath);
  }
});
