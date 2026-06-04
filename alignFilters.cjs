const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/pages/misc/Registrations.jsx',
  'src/pages/misc/CertificateRequests.jsx',
  'src/pages/events-webinars/EventRegistrations.jsx',
  'src/pages/events-webinars/WebinarRegistrations.jsx',
  'src/pages/test-series/TestSeriesRegistrations.jsx',
  'src/pages/jobs-careers/JobRegistrations.jsx'
];

const basePath = 'c:/Users/padma/Downloads/iscale-admin-dashboard_1 (3)/iscale-admin-dashboard_1/iscale-admin';

filesToUpdate.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${file} - does not exist.`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace wrapper
  content = content.replace(/<div className="flex flex-wrap items-end gap-5 w-full">/g, '<div className="flex flex-wrap items-end gap-4 w-full">');

  // Replace input column
  content = content.replace(/<div className="flex-1 min-w-\[200px\]">/g, '<div className="w-full sm:flex-1 sm:min-w-[150px]">');
  
  // Replace button wrapper
  // Note: we remove mt-7 and explicit height h-[38px]
  content = content.replace(/<div className="flex-none flex gap-2 h-\[38px\] w-full md:w-auto mt-7">/g, '<div className="flex-none flex flex-wrap gap-2 w-full sm:w-auto">');
  content = content.replace(/<div className="flex-none flex gap-2 h-\[38px\] w-full md:w-auto">/g, '<div className="flex-none flex flex-wrap gap-2 w-full sm:w-auto">');

  fs.writeFileSync(fullPath, content);
  console.log(`Updated ${file}`);
});
