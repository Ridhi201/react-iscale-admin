const fs = require('fs');
const path = require('path');

function updateStatCards() {
  const statCardPath = path.join(__dirname, 'src', 'components', 'ui', 'StatCard.jsx');
  if (fs.existsSync(statCardPath)) {
    // Revert StatCard to floating white with soft purple hover glow
    let content = `import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

export default function StatCard({ card, index }) {
  const LucideIcon = Icons[card.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="relative flex items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.2)] hover:-translate-y-1 transition-all duration-300 border border-slate-100"
    >
      {/* Icon Area */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-indigo-50 text-indigo-600">
        {LucideIcon && <LucideIcon size={26} strokeWidth={1.5} />}
      </div>
      
      {/* Text Area */}
      <div className="flex flex-col ml-5">
        <p className="text-3xl font-bold text-slate-800 tracking-tight leading-none mb-1.5">
          {card.value}
        </p>
        <p className="text-sm font-medium text-slate-500">{card.title}</p>
      </div>
    </motion.div>
  )
}
`;
    fs.writeFileSync(statCardPath, content, 'utf8');
    console.log('StatCard updated to Floating White');
  }
}

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // 1. All Table wrappers / Cards -> Floating White, Soft Purple Glow
  // Replace standard shadows with the new floating style
  // bg-white rounded-2xl shadow-sm border border-slate-200
  content = content.replace(/bg-white dark:bg-\[#111827\] rounded-2xl shadow-sm border border-slate-200 dark:border-gray-800/g, 'bg-white rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100');
  content = content.replace(/bg-white dark:bg-\[#111827\] border border-slate-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm/g, 'bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow');
  content = content.replace(/bg-white dark:bg-\[#111827\] border border-slate-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm/g, 'bg-white border border-slate-100 rounded-2xl p-4 shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow');

  // 2. Headings -> Dark Navy
  content = content.replace(/text-slate-900 dark:text-white/g, 'text-slate-900');
  content = content.replace(/text-slate-800 dark:text-slate-100/g, 'text-slate-900');
  content = content.replace(/text-slate-800 dark:text-slate-300/g, 'text-slate-800');
  
  // 3. Buttons -> Purple Indigo
  // I previously set them to rose, emerald, blue, green, red, slate-600.
  const buttonRegex = /bg-(rose|emerald|blue|green|red|slate)-500 hover:bg-(rose|emerald|blue|green|red|slate)-600/g;
  content = content.replace(buttonRegex, 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:-translate-y-0.5');
  content = content.replace(/bg-slate-600 hover:bg-slate-700/g, 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:-translate-y-0.5'); // Print button

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Final Look applied to ${path.basename(filepath)}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.jsx')) {
      refactorFile(fullPath);
    }
  }
}

updateStatCards();
processDirectory(path.join(__dirname, 'src', 'pages'));
processDirectory(path.join(__dirname, 'src', 'components'));

console.log('Done Final Look');
