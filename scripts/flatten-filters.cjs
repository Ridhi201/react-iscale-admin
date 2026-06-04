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
  
  const filtersCardRegex = /(\{\/\* Filters Card \*\/\}\s*<div[^>]*>)([\s\S]*?)(\{\/\* Table Section \*\/\})/g;
  
  content = content.replace(filtersCardRegex, (match, startTag, innerContent, endTag) => {
    
    // We want to extract every top-level logical block inside innerContent
    // These blocks are the filters (From Date, To Date, etc.) and the Buttons.
    // They are usually separated by comments like {/* From Date */}
    // The previous script might have left a mess, so let's just find all comments and the div immediately following them.
    
    // It's safer to just extract all the blocks that have a label or buttons.
    // Let's use regex to find each block starting with a comment.
    // A block looks like:
    // {/* Something */}
    // <div ...> ... </div>
    
    const blocks = [];
    const blockRegex = /(\{\/\* [^\*]+ \*\/\})\s*(<div[\s\S]*?<\/div>)(?=\s*\{\/\*|$)/g;
    
    // Unfortunately, the buttons div doesn't end with </div> before the next comment if there are nested divs.
    // Let's write a simple bracket matcher to extract exactly the outer div for each comment.
    
    let result = innerContent;
    
    // Just remove ALL <div className="grid ...">, <div className="flex ..."> wrappers inside the card!
    // We only want the filter items themselves.
    // Actually, looking at Registrations.jsx:
    // It has:
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-5">
    //   {/* From Date */}
    //   <div className="flex-1 min-w-[200px]">...</div>
    // ...
    // </div>
    // <div className="grid ..."> ... </div>
    
    // If we just remove the wrapper grids and replace with one flex container:
    // 1. Remove `<div className="grid... ">` entirely.
    result = result.replace(/<div className="grid[^"]*">\s*/g, '');
    
    // 2. Remove `<div className="flex gap-4 items-end">` entirely.
    result = result.replace(/<div className="flex gap-4 items-end[^"]*">\s*/g, '');
    result = result.replace(/<div className="flex flex-wrap items-end gap-4 w-full">\s*/g, '');
    
    // 3. Remove the corresponding closing `</div>` for those wrappers.
    // Since we know the structure is:
    // {/* Filters Card */}
    // <div ...> (startTag)
    //   (we want our new flex wrapper here)
    //   {/* From Date */} <div>...</div>
    //   {/* To Date */} <div>...</div>
    //   (we want to close our flex wrapper here)
    // </div> (this belongs to startTag)
    // {/* Table Section */}
    
    // Let's extract all the inner HTML and strip out any </div> that closes a wrapper.
    // Wait, it's easier to just match each `{\/* Name *\/}` and its corresponding `div` tree.
    
    let extractedBlocks = '';
    let pos = 0;
    while (true) {
      const commentMatch = innerContent.indexOf('{/* ', pos);
      if (commentMatch === -1) break;
      const commentEnd = innerContent.indexOf(' */}', commentMatch);
      if (commentEnd === -1) break;
      
      const comment = innerContent.substring(commentMatch, commentEnd + 4);
      
      // Find the next <div
      const divStart = innerContent.indexOf('<div', commentEnd);
      if (divStart === -1) break;
      
      // We need to match the closing </div>
      let depth = 0;
      let divEnd = divStart;
      for (let i = divStart; i < innerContent.length; i++) {
        if (innerContent.substring(i, i + 4) === '<div') {
          depth++;
          i += 3;
        } else if (innerContent.substring(i, i + 6) === '</div') {
          depth--;
          i += 5;
          if (depth === 0) {
            divEnd = i + 1; // points to the >
            break;
          }
        }
      }
      
      let blockDiv = innerContent.substring(divStart, divEnd);
      
      // Modify the blockDiv classes
      // If it's a button group:
      if (blockDiv.includes('<button') && !blockDiv.includes('<label')) {
        blockDiv = blockDiv.replace(/<div className="[^"]*"/, '<div className="flex gap-2 h-[38px]"');
      } else {
        // If it's an input group:
        blockDiv = blockDiv.replace(/<div className="[^"]*"/, '<div className="flex-1 min-w-[200px]"');
        // Remove lg:col-span-2 and lg:w-1/2 which caused the empty space issue!
        blockDiv = blockDiv.replace(/lg:col-span-\d+/g, '');
        blockDiv = blockDiv.replace(/lg:w-\d+\/\d+/g, '');
      }
      
      extractedBlocks += `\n          ${comment}\n          ${blockDiv}`;
      pos = divEnd;
    }
    
    return `${startTag}\n        <div className="flex flex-wrap items-end gap-5 w-full">${extractedBlocks}\n        </div>\n      </div>\n      \n      ${endTag}`;
  });
  
  fs.writeFileSync(fp, content);
  console.log('Flattened', relPath);
});
