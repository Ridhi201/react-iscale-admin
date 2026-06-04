import { motion } from 'framer-motion'
import PageHeader from '../../components/ui/PageHeader'

export default function PlaceholderPage({ title, subtitle, icon = '🚧' }) {
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} breadcrumbs={[{ label: title }]} />
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="text-5xl mb-4">{icon}</div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">{title}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
          This page is under development. Content will appear here once the backend APIs are connected.
        </p>
        <button className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
          Coming Soon
        </button>
      </motion.div>
    </div>
  )
}
