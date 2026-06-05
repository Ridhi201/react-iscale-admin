import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

export default function HeroBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#144f36] rounded-[24px] p-8 mb-6 relative overflow-visible flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 shadow-[0_10px_30px_rgba(20,79,54,0.15)]"
    >
      {/* Background pattern */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none rounded-r-[24px]"></div>
      
      {/* Subtle overlay icon */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <Icons.GraduationCap size={300} />
      </div>
      
      {/* Left side text */}
      <div className="relative z-10">
        <h2 className="text-white font-bold tracking-tight text-3xl mb-3 flex items-center gap-2">
          Welcome back! <span className="text-3xl">👋</span>
        </h2>
        <p className="text-white/80 font-medium text-[15px] mb-8">
          Here's what's happening with your LMS today.
        </p>
        
        <div className="flex gap-4">

          <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-2.5 px-6 rounded-full hover:bg-white/20 transition-all flex items-center gap-2 hover:-translate-y-0.5">
            <Icons.BarChart2 size={18} strokeWidth={2.5} /> View Analytics
          </button>
        </div>
      </div>
      
      {/* Right side floating mini cards */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full xl:w-auto xl:-mr-4">
        {/* Card 1 */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="flex-1 xl:w-48 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Icons.Banknote size={14} className="text-white" />
            </div>
            <span className="text-white/80 text-[11px] font-bold uppercase tracking-wider">Today's Revenue</span>
          </div>
          <h3 className="text-white text-2xl font-black tracking-tight">$1,240</h3>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="flex-1 xl:w-48 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] xl:-mt-6 xl:mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Icons.Users size={14} className="text-white" />
            </div>
            <span className="text-white/80 text-[11px] font-bold uppercase tracking-wider">Today's Reg.</span>
          </div>
          <h3 className="text-white text-2xl font-black tracking-tight">145</h3>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="flex-1 xl:w-48 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Icons.Video size={14} className="text-white" />
            </div>
            <span className="text-white/80 text-[11px] font-bold uppercase tracking-wider">Active Live</span>
          </div>
          <h3 className="text-white text-2xl font-black tracking-tight">12</h3>
        </motion.div>
      </div>
    </motion.div>
  )
}
