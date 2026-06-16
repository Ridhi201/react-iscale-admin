import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'
import { monthlyRegistrations } from '../../utils/mockData'
import * as Icons from 'lucide-react'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gradient-to-b from-white to-[#fcfcfd] border border-white ring-1 ring-black/[0.02] rounded-lg p-3 shadow-lg text-sm">
        <p className="font-semibold text-slate-500 mb-1 text-[11px] uppercase tracking-wider">{label}</p>
        <p className="font-bold text-slate-800 text-base">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export default function RegistrationChart({ apiData }) {
  const [filter, setFilter] = useState('30D')
  
  // Fake data to match the screenshot's shape, varying by filter
  const getMockData = (currentFilter) => {
    if (currentFilter === '7D') {
      return [
        { name: 'Mon', value: 12000 },
        { name: 'Tue', value: 15000 },
        { name: 'Wed', value: 10000 },
        { name: 'Thu', value: 22000 },
        { name: 'Fri', value: 35000 },
        { name: 'Sat', value: 45000 },
        { name: 'Sun', value: 30000 },
      ];
    }
    if (currentFilter === '90D') {
      return [
        { name: 'Jan', value: 40000 },
        { name: 'Feb', value: 65000 },
        { name: 'Mar', value: 85000 },
        { name: 'Apr', value: 55000 },
        { name: 'May', value: 95000 },
        { name: 'Jun', value: 110000 },
      ];
    }
    if (currentFilter === '1Y') {
      return [
        { name: 'Q1', value: 120000 },
        { name: 'Q2', value: 250000 },
        { name: 'Q3', value: 180000 },
        { name: 'Q4', value: 350000 },
      ];
    }
    // Default 30D
    return [
      { name: '01 Apr', value: 20000 },
      { name: '05 Apr', value: 55000 },
      { name: '09 Apr', value: 35000 },
      { name: '13 Apr', value: 45000 },
      { name: '17 Apr', value: 64450 }, // Peak
      { name: '21 Apr', value: 40000 },
      { name: '25 Apr', value: 75000 },
      { name: '30 Apr', value: 45000 },
    ];
  };

  let data = getMockData(filter);
  if (apiData && Array.isArray(apiData) && apiData.length > 0) {
    const defaultData = getMockData('30D');
    data = apiData.map((item, i) => ({
      name: item.name || item.month || item.date || item.label || defaultData[i]?.name || 'Unknown',
      value: item.value || item.count || item.total || item.amount || defaultData[i]?.value || 0
    }));
  } else if (apiData && typeof apiData === 'object') {
    const keys = Object.keys(apiData);
    if (keys.length > 0) {
      data = keys.map(k => ({ name: k, value: apiData[k] }));
    }
  }

  const filters = ['7D', '30D', '90D', '1Y']

  return (
    <div className="bg-gradient-to-b from-white to-[#fcfcfd] rounded-2xl border border-white ring-1 ring-black/[0.02] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] p-6 h-full flex flex-col hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden">
      
      {/* Background glow behind the chart */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-green-500/5 to-transparent pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 relative z-10">
        <div>
          <h3 className="font-bold text-slate-800 text-[16px] mb-1">Revenue Analytics</h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-slate-900 tracking-tight">₹25.6M</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded flex items-center">
              <Icons.TrendingUp size={12} className="mr-1" />
              +18.6%
            </span>
          </div>
        </div>
        
        <div className="flex items-center bg-slate-50 p-1 rounded-lg border border-white ring-1 ring-black/[0.02]">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                filter === f 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 min-h-[300px] -ml-4 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value === 0 ? '0' : `${value / 1000}K`}
              domain={[0, 125000]}
              ticks={[0, 25000, 50000, 75000, 100000, 125000]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#22c55e', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#22c55e" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              activeDot={{ r: 6, fill: '#22c55e', stroke: '#fff', strokeWidth: 3 }}
              animationDuration={1500}
              style={{ filter: 'url(#glow)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
