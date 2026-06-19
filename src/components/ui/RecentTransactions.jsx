import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

export default function RecentTransactions() {
  const transactions = [
    { name: 'Sarah Johnson', course: 'React Masterclass', amount: '₹4,999', status: 'Success', date: '2 min ago', avatar: 'SJ' },
    { name: 'Mike Ross', course: 'AI Course', amount: '₹1,999', status: 'Pending', date: '15 min ago', avatar: 'MR' },
    { name: 'Harvey Specter', course: 'Python Bootcamp', amount: '₹999', status: 'Success', date: '1 hour ago', avatar: 'HS' },
    { name: 'Rachel Zane', course: 'UI/UX Design', amount: '₹2,499', status: 'Failed', date: '3 hours ago', avatar: 'RZ' }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Success': return 'bg-emerald-50 text-emerald-600'
      case 'Pending': return 'bg-amber-50 text-amber-600'
      case 'Failed': return 'bg-rose-50 text-rose-600'
      default: return 'bg-slate-50 text-slate-600'
    }
  }

  return (
    <div className="bg-gradient-to-b from-white to-[#fcfcfd] rounded-2xl border border-white ring-1 ring-black/[0.02] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 text-[15px]">Recent Payments</h3>
        <button className="text-[#22c55e] hover:text-[#16a34a] text-xs font-bold transition-colors">View All</button>
      </div>

      <div className="flex flex-col gap-4">
        {transactions.map((tx, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#144f36] text-white flex items-center justify-center font-bold text-[13px] shadow-inner group-hover:scale-105 transition-transform">
                {tx.avatar}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-[13px]">{tx.name}</h4>
                <p className="text-[11px] font-bold text-slate-400">{tx.course}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-black text-slate-800 text-[14px]">{tx.amount}</div>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-1 ${getStatusColor(tx.status)}`}>
                {tx.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
