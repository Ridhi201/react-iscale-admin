const fs = require('fs');
const path = require('path');

function updateStatCards() {
  const statCardPath = path.join(__dirname, 'src', 'components', 'ui', 'StatCard.jsx');
  if (fs.existsSync(statCardPath)) {
    // Colorful stat cards with the triangle separator again, using new vibrant (but not orange) colors
    let content = `import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

export default function StatCard({ card, index }) {
  const LucideIcon = Icons[card.icon]

  // Fresh, vibrant colors for cards
  const cardColors = [
    'bg-[#2563eb]', // Blue
    'bg-[#059669]', // Emerald
    'bg-[#db2777]', // Pink
    'bg-[#7c3aed]', // Violet
    'bg-[#0891b2]', // Cyan
  ]
  const colorStyle = cardColors[index % cardColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className={\`relative flex items-center h-28 \${colorStyle} rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden\`}
    >
      {/* Left side (Icon) */}
      <div className="w-[30%] h-full flex items-center justify-center relative bg-black/10">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white">
          {LucideIcon && <LucideIcon size={36} strokeWidth={1.5} />}
        </div>
      </div>
      
      {/* Separator line and triangle */}
      <div className="absolute left-[30%] top-0 bottom-0 flex flex-col justify-center items-center h-full z-10 w-[2px]">
        <div className="w-[2px] bg-white h-[40%]"></div>
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent -ml-[10px]"></div>
        <div className="w-[2px] bg-white flex-1"></div>
      </div>

      {/* Right side (Text) */}
      <div className="w-[70%] h-full flex flex-col justify-center items-center text-center pl-4 pr-2">
        <p className="text-[28px] font-semibold text-white tracking-wide leading-none mb-1 drop-shadow-sm">
          {card.value}
        </p>
        <p className="text-sm font-medium text-white/90 tracking-wider drop-shadow-sm uppercase">{card.title}</p>
      </div>
    </motion.div>
  )
}
`;
    fs.writeFileSync(statCardPath, content, 'utf8');
    console.log('StatCard updated to colorful variants');
  }
}

function refactorFile(filepath) {
  let origContent = fs.readFileSync(filepath, 'utf8');
  let content = origContent;
  
  // 1. Re-color Buttons individually
  // They are currently all 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:-translate-y-0.5'
  
  const indigoBtnRegex = /bg-indigo-600 hover:bg-indigo-700 hover:shadow-\[0_4px_15px_rgba\(99,102,241,0\.3\)\] hover:-translate-y-0\.5/g;
  
  // Reset Button -> Red
  content = content.replace(/<button([^>]*)>Reset<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(indigoBtnRegex, 'bg-rose-500 hover:bg-rose-600 hover:shadow-[0_4px_15px_rgba(244,63,94,0.3)] hover:-translate-y-0.5');
    return `<button${newP1}>Reset</button>`;
  });

  // Export Button -> Emerald
  content = content.replace(/<button([^>]*)>Export<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(indigoBtnRegex, 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:-translate-y-0.5');
    return `<button${newP1}>Export</button>`;
  });

  // Copy Button -> Blue
  content = content.replace(/<button([^>]*)>Copy<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(indigoBtnRegex, 'bg-blue-500 hover:bg-blue-600 hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5');
    return `<button${newP1}>Copy</button>`;
  });

  // Excel Button -> Green
  content = content.replace(/<button([^>]*)>Excel<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(indigoBtnRegex, 'bg-green-600 hover:bg-green-700 hover:shadow-[0_4px_15px_rgba(22,163,74,0.3)] hover:-translate-y-0.5');
    return `<button${newP1}>Excel</button>`;
  });

  // PDF Button -> Pink
  content = content.replace(/<button([^>]*)>PDF<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(indigoBtnRegex, 'bg-pink-600 hover:bg-pink-700 hover:shadow-[0_4px_15px_rgba(219,39,119,0.3)] hover:-translate-y-0.5');
    return `<button${newP1}>PDF</button>`;
  });

  // Print Button -> Teal
  content = content.replace(/<button([^>]*)>Print<\/button>/g, (match, p1) => {
    let newP1 = p1.replace(indigoBtnRegex, 'bg-teal-600 hover:bg-teal-700 hover:shadow-[0_4px_15px_rgba(13,148,136,0.3)] hover:-translate-y-0.5');
    return `<button${newP1}>Print</button>`;
  });
  
  // 2. Colorize Headings
  // I replaced them all with text-slate-900. Let's make headers a gorgeous blue/indigo text color
  // such as text-indigo-900 or a gradient.
  content = content.replace(/text-slate-900/g, 'text-indigo-900 font-bold tracking-tight');

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Colorful applied to ${path.basename(filepath)}`);
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

console.log('Done Colorful Fix');
