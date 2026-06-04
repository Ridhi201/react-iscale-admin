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

const found = new Set();
filesToFix.forEach(relPath => {
  const fp = path.join(__dirname, relPath);
  if (!fs.existsSync(fp)) return;
  const content = fs.readFileSync(fp, 'utf8');
  const matches = content.match(/<label[^>]*>([^<]+)<\/label>/g);
  if (matches) {
    matches.forEach(m => found.add(m));
  }
});
console.log(Array.from(found));
