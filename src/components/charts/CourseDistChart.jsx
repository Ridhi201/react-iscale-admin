import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { courseDistribution } from '../../utils/mockData'

export default function CourseDistChart() {
  return (
    <div className="card p-5">
      <div className="mb-4">
        <h3 className="font-semibold text-white">Course Distribution</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Enrollment by category</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={courseDistribution}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {courseDistribution.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'white',
              border: '1px solid #f1f5f9',
              borderRadius: '12px',
              fontSize: '12px',
            }}
            formatter={v => [`${v}%`, '']}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {courseDistribution.map(item => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
            <span className="text-xs text-slate-600 dark:text-slate-400 truncate">{item.name}</span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
