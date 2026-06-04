import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'
import { userGrowthData } from '../../utils/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gradient-to-b from-white to-[#fcfcfd] dark:bg-[#13111c]/70 backdrop-blur-md border border-indigo-100 rounded-xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-sm animate-fade-in">
        <p className="font-medium text-slate-500 uppercase tracking-widest text-xs mb-1">{label}</p>
        <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-lg">
          {payload[0].value.toLocaleString()} <span className="text-xs font-medium text-slate-400">Users</span>
        </p>
      </div>
    )
  }
  return null
}

export default function UserGrowthChart() {
  return (
    <div className="card p-5">
      <div className="mb-5">
        <h3 className="font-semibold text-white">User Growth</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Total registered users over time</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={userGrowthData}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            width={40}
            tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99, 102, 241, 0.2)', strokeWidth: 2 }} />
          <Line
            type="monotone"
            dataKey="users"
            stroke="url(#lineGrad)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, fill: '#3b82f6', strokeWidth: 0, shadow: '0 0 10px rgba(59,130,246,0.5)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
