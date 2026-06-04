import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

function AnimatedCounter({ value, duration = 1500 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, ''), 10) : value
    if (isNaN(numericValue) || numericValue === 0) {
      setCount(0)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * numericValue))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration])

  const prefix = typeof value === 'string' && value.startsWith('$') ? '$' : ''
  const suffix = typeof value === 'string' ? value.replace(/[0-9$,]/g, '').trim() : ''
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function StatCard({ card, index }) {
  const LucideIcon = Icons[card.icon] || Icons.Activity
  
  // Generating a simple random looking SVG line based on index
  const paths = [
    "M0,20 L10,15 L20,25 L30,5 L40,10 L50,0",
    "M0,10 L10,25 L20,15 L30,20 L40,0 L50,10",
    "M0,25 L10,5 L20,15 L30,10 L40,20 L50,0",
    "M0,15 L10,20 L20,5 L30,25 L40,10 L50,0",
    "M0,5 L10,10 L20,0 L30,20 L40,15 L50,5",
  ]
  const path = paths[index % 5]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, delay: index * 0.08, type: 'spring', stiffness: 300 }}
      className="bg-gradient-to-b from-white to-[#fcfcfd] rounded-2xl p-5 border-t-[6px] border-t-[#22c55e] border-x border-b border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center mb-3 shadow-inner">
            <LucideIcon size={20} className="text-[#144f36]" strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">{card.title}</span>
        </div>
        <h3 className="text-3xl font-black text-slate-800 tracking-tight mt-1">
          <AnimatedCounter value={card.value} />
        </h3>
      </div>

      <div className="flex items-end justify-between mt-2 relative z-10">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
          <span className="text-[#22c55e] flex items-center">
            <Icons.TrendingUp size={12} strokeWidth={3} className="mr-1" />
            {card.trend}
          </span>
          vs last month
        </div>
        
        {/* Mini Graph */}
        <div className="w-14 h-8 opacity-80">
          <svg viewBox="0 0 50 30" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(34,197,94,0.3)]">
            <path d={path} fill="none" stroke="url(#greenGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#144f36" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
