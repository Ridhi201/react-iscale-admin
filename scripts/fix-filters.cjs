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
  
  // We want to find the section between {/* Filters Card */} and {/* Table Section */}
  const filtersCardRegex = /(\{\/\* Filters Card \*\/\}\s*<div[^>]*>)([\s\S]*?)(\{\/\* Table Section \*\/\})/g;
  
  content = content.replace(filtersCardRegex, (match, startTag, innerContent, endTag) => {
    
    // The inner content usually has:
    // <div className="grid ..."> ... </div>
    // <div className="flex ..."> ... </div>
    // or just one grid.
    
    // We want to extract all the direct children of these grids/flexes.
    // They usually start with <div> and contain a label and input/select, or buttons.
    
    // Let's remove the wrapper divs.
    // We know the wrappers are `<div className="grid...">` and `<div className="flex...">` that are direct children of the card.
    // But doing this with regex is messy.
    
    // Let's try a simpler approach. We just replace:
    // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5"
    // with:
    // className="flex flex-wrap items-end gap-4 w-full"
    
    // And for the second row:
    // className="flex gap-4 items-end" -> this can just be removed if we merge them, but it's easier to just make all children have flex-1.
    
    // Let's do a more surgical replacement.
    // Replace the inner structure with a flex-wrap container.
    // Since we know the exact files, we can just replace the specific classes.
    let modifiedInner = innerContent;
    
    // 1. Replace the first grid container with flex-wrap
    modifiedInner = modifiedInner.replace(/<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[^"]+">/, '<div className="flex flex-wrap items-end gap-4 w-full">');
    
    // 2. Some files might have lg:grid-cols-3
    modifiedInner = modifiedInner.replace(/<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[^"]+">/, '<div className="flex flex-wrap items-end gap-4 w-full">');
    
    // 3. For TestSeriesRegistrations and others, there's a closing div for the grid, and opening div for the flex.
    // `</div>\s*<div className="flex gap-4 items-end">` => ` `
    modifiedInner = modifiedInner.replace(/<\/div>\s*<div className="flex gap-4 items-end">/g, '');
    modifiedInner = modifiedInner.replace(/<\/div>\s*<div className="flex gap-[^"]+items-end[^"]*">/g, '');
    
    // 4. Now all items are inside the flex-wrap container.
    // We want to add `flex-1 min-w-[200px]` to all direct children (the filter items).
    // The items usually look like `<div>\n <label...` or `<div className="w-full max-w-[250px]">\n <label...`
    
    // Let's just make all `<div` that are immediately followed by `>` or `className=` and have a `<label` inside them get the flex-1 class.
    modifiedInner = modifiedInner.replace(/<div( className="[^"]*")?>\s*<label/g, (m, p1) => {
      if (p1) {
        // remove max-w constraints if any
        let newClasses = p1.replace(/max-w-\[[^\]]+\]/, '');
        newClasses = newClasses.replace('className="', 'className="flex-1 min-w-[200px] ');
        return `<div${newClasses}>\n            <label`;
      } else {
        return `<div className="flex-1 min-w-[200px]">\n            <label`;
      }
    });
    
    // For the buttons div: `<div className="flex gap-2 h-[38px]"`
    // We want it to stay flex-none so it doesn't stretch too much, but maybe just `flex-none`
    modifiedInner = modifiedInner.replace(/<div className="flex gap-2 h-\[38px\]/g, '<div className="flex-none flex gap-2 h-[38px]');
    
    return startTag + modifiedInner + endTag;
  });
  
  fs.writeFileSync(fp, content);
  console.log('Fixed', relPath);
});
