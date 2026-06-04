import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

const activities = [
  { id: 1, type: 'user', title: 'New student registered', desc: 'James Smith joined your course', time: '2m ago', icon: 'User', color: 'text-[#22c55e] bg-green-50' },
  { id: 2, type: 'course', title: 'Course purchased', desc: 'React JS Bootcamp purchased', time: '15m ago', icon: 'ShoppingCart', color: 'text-blue-500 bg-blue-50' },
  { id: 3, type: 'quiz', title: 'Quiz completed', desc: 'Advanced JavaScript quiz completed', time: '45m ago', icon: 'FileText', color: 'text-orange-500 bg-orange-50' },
  { id: 4, type: 'review', title: 'New review received', desc: '5 star rating on Python Mastery', time: '1h ago', icon: 'Star', color: 'text-yellow-500 bg-yellow-50' },
  { id: 5, type: 'payout', title: 'Payout requested', desc: 'John Doe requested payout', time: '2h ago', icon: 'DollarSign', color: 'text-[#22c55e] bg-green-50' },
]

export default function ActivityFeed() {
  return (
    <div className="bg-gradient-to-b from-white to-[#fcfcfd] rounded-2xl border border-white ring-1 ring-black/[0.02] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] h-full flex flex-col hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="p-5 border-b border-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 text-[15px]">Recent Activities</h3>
        <button className="text-[#22c55e] hover:text-[#16a34a] text-xs font-bold transition-colors">View All</button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="flex flex-col gap-4">
          {activities.map((activity, i) => {
            const IconComp = Icons[activity.icon]
            return (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                key={activity.id} 
                className="flex items-start gap-4 cursor-pointer group"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${activity.color} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComp size={16} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0 border-b border-slate-50 pb-3 group-last:border-0 group-last:pb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="text-[13px] font-bold text-slate-800 truncate">{activity.title}</p>
                    <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap ml-2">{activity.time}</span>
                  </div>
                  <p className="text-[12px] text-slate-500 truncate">{activity.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
