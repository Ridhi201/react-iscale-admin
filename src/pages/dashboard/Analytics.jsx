import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import RegistrationChart from '../../components/charts/RegistrationChart'
import RevenueChart from '../../components/charts/RevenueChart'
import UserGrowthChart from '../../components/charts/UserGrowthChart'
import CourseDistChart from '../../components/charts/CourseDistChart'

const metrics = [
  { label: 'Avg. Session Duration', value: '24 min', change: '+8%', up: true },
  { label: 'Completion Rate', value: '68.4%', change: '+3.2%', up: true },
  { label: 'Dropout Rate', value: '12.1%', change: '-1.8%', up: false },
  { label: 'Avg. Quiz Score', value: '74.2', change: '+5.1%', up: true },
]

export default function Analytics() {
  return (
    <div>
      <PageHeader
        title="Data Analytics"
        subtitle="Deep insights into platform performance"
        breadcrumbs={[{ label: 'Analytics' }]}
      />

      {/* Key metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card p-4"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{m.label}</p>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{m.value}</p>
            <p className={`text-xs font-semibold mt-1 ${m.up ? 'text-emerald-500' : 'text-red-500'}`}>{m.change} vs last month</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <RegistrationChart />
        <RevenueChart />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2"><UserGrowthChart /></div>
        <CourseDistChart />
      </div>
    </div>
  )
}
