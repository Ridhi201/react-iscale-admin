import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StatCard from '../../components/ui/StatCard'
import RegistrationChart from '../../components/charts/RegistrationChart'
import TopCourses from '../../components/ui/TopCourses'

import HeroBanner from '../../components/ui/HeroBanner'
import ActivityFeed from '../../components/ui/ActivityFeed'
import QuickActions from '../../components/ui/QuickActions'
import { topStats } from '../../utils/mockData'
import { DashboardSkeleton } from '../../components/ui/Skeleton'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#f5f7fa] dark:bg-[#0b0914] p-4 md:p-6 overflow-hidden">
      <div className="relative z-10 max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              
              <HeroBanner />
              
              <QuickActions />

              {/* Top Stats Grid - 5 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {topStats.map((card, i) => (
                  <StatCard key={card.id} card={card} index={i} />
                ))}
              </div>

              {/* Charts and Activity Feed Row */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                {/* Chart Area */}
                <div className="xl:col-span-2 h-[400px]">
                  <RegistrationChart />
                </div>
                
                {/* Activity Feed */}
                <div className="xl:col-span-1 h-[400px]">
                  <ActivityFeed />
                </div>
              </div>

              {/* Bottom Widgets Row */}
              <div className="mb-8 h-full">
                <TopCourses />
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
