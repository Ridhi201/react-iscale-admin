import { motion } from 'framer-motion'

const instructors = [
  { id: 1, name: 'Sarah Johnson', image: 'https://i.pravatar.cc/150?img=1', courses: 15, students: '12,450', rating: 4.9 },
  { id: 2, name: 'Cody Lee', image: 'https://i.pravatar.cc/150?img=11', courses: 12, students: '10,250', rating: 4.8 },
  { id: 3, name: 'Alex Shapon', image: 'https://i.pravatar.cc/150?img=3', courses: 10, students: '8,450', rating: 4.7 },
  { id: 4, name: 'Jonson Roy', image: 'https://i.pravatar.cc/150?img=4', courses: 8, students: '7,850', rating: 4.6 },
  { id: 5, name: 'Omar Sharif', image: 'https://i.pravatar.cc/150?img=5', courses: 7, students: '6,250', rating: 4.6 },
]

export default function TopInstructors() {
  return (
    <div className="bg-gradient-to-b from-white to-[#fcfcfd] rounded-2xl border border-white ring-1 ring-black/[0.02] shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-5 border-b border-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 text-[15px]">Top Instructors</h3>
        <button className="text-[#22c55e] hover:text-[#16a34a] text-xs font-bold transition-colors">View All</button>
      </div>
      
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gradient-to-b from-white to-[#fcfcfd] text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3 border-b border-slate-50">Instructor</th>
              <th className="px-5 py-3 border-b border-slate-50 text-center">Courses</th>
              <th className="px-5 py-3 border-b border-slate-50 text-center">Students</th>
              <th className="px-5 py-3 border-b border-slate-50 text-center">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {instructors.map((ins, index) => (
              <motion.tr 
                key={ins.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={ins.image} alt={ins.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="font-semibold text-slate-700 text-[13px]">{ins.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-center text-slate-600 font-medium text-[13px]">{ins.courses}</td>
                <td className="px-5 py-3 text-center text-slate-600 font-medium text-[13px]">{ins.students}</td>
                <td className="px-5 py-3 text-center">
                  <span className="inline-flex items-center gap-1 font-bold text-slate-700 text-[13px]">
                    <span className="text-yellow-400">★</span> {ins.rating}
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
