import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'
import { useTheme } from '../store/ThemeContext'

export default function MainLayout() {
  const { sidebarCollapsed } = useTheme()
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="h-screen bg-[#f1f5f9] dark:bg-[#0b0914] text-slate-800 dark:text-slate-200 relative overflow-hidden transition-colors duration-300 font-sans flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar />

        {/* Content area */}
        <motion.div
          className="flex flex-col flex-1 h-full w-full min-w-0 overflow-hidden"
        >
          {/* Page content with Page Transitions */}
          <main className="flex-1 p-4 md:p-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full absolute inset-0 p-4 md:p-6 overflow-y-auto custom-scrollbar"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </motion.div>
      </div>
    </div>
  )
}
