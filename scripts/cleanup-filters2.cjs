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

filesToFix.forEach(relPath => {
  const fp = path.join(__dirname, relPath);
  if (!fs.existsSync(fp)) return;
  
  let content = fs.readFileSync(fp, 'utf8');
  
  const falseLabels = ['Top Filters Card', 'Right Form Panel', 'Export Button'];
  
  falseLabels.forEach(label => {
    // The structure added is:
    // {/* Label */}
    //           <div className="flex-1 min-w-[200px]">
    //             <label ...>Label</label>
    //             <select ...>
    //               <option>Select Value</option>
    //             </select>
    //           </div>
    
    // So we can use a regex to match the label text exactly
    const blockRegex = new RegExp(`\\{\\/\\* ${label} \\*\\/\\}\\s*<div className="flex-1 min-w-\\[200px\\]">\\s*<label[^>]*>${label}<\\/label>[\\s\\S]*?<\\/div>`, 'g');
    
    content = content.replace(blockRegex, `{/* ${label} */}`);
  });
  
  fs.writeFileSync(fp, content);
  console.log('Cleaned', relPath);
});
