import { motion } from 'framer-motion'
import { recentRegistrations } from '../../utils/mockData'

const statusColors = {
  active: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
  pending: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
  inactive: 'bg-slate-500/20 border-slate-500/30 text-slate-600 dark:text-slate-400',
}

const avatarColors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-teal-500']

export default function RecentRegistrations() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 tracking-tight">Recent Registrations</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Latest student sign-ups</p>
        </div>
        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-400 hover:text-white hover:bg-blue-500/20 transition-all border border-transparent hover:border-blue-500/30">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {['Student', 'Course', 'Date', 'Status'].map(h => (
                <th key={h} className="text-left text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-400 pb-4 pr-4 whitespace-nowrap uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {recentRegistrations.map((reg, i) => (
              <motion.tr
                key={reg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-[#f6f6ff]/5 transition-colors cursor-pointer group"
              >
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                      {reg.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm group-hover:text-slate-900 dark:text-white transition-colors">{reg.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{reg.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">{reg.course}</p>
                </td>
                <td className="py-4 pr-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">{reg.date}</p>
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${statusColors[reg.status]} shadow-sm`}>
                    {reg.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
