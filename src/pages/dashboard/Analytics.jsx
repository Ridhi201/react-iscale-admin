import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'
import { BarChart3 } from 'lucide-react'

export default function Analytics() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Data Analytics"
        subtitle="Deep insights into platform performance"
        breadcrumbs={[{ label: 'Analytics' }]}
      />

      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white/80 dark:bg-[#13111c]/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-12 max-w-lg w-full text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="mx-auto w-24 h-24 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping opacity-50"></div>
            <BarChart3 size={40} className="text-emerald-500 relative z-10" />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Coming Soon
          </h2>
          
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
            We are currently building advanced data analytics and reporting features to give you deeper insights into your platform's performance. Stay tuned!
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800/50 rounded-full text-sm font-bold text-slate-600 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            In active development
          </div>
        </motion.div>
      </div>
    </div>
  )
}
