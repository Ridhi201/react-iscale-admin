import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useTheme } from '../../store/ThemeContext'
import { useAuth } from '../../store/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { sidebarCollapsed, setSidebarCollapsed, setMobileSidebarOpen, dark, setDark } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const profileRef = useRef()
  const notifRef = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotificationOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="relative w-full h-[70px] bg-white dark:bg-[#0b0914] text-slate-800 dark:text-slate-200 z-40 flex items-center px-4 md:px-6 shadow-sm border-b border-slate-100 dark:border-white/5 transition-all duration-300">
      {/* Mobile menu btn */}
      <button
        onClick={() => setMobileSidebarOpen(true)}
        className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-emerald-600 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors mr-3"
      >
        <Icons.Menu size={22} strokeWidth={2} />
      </button>

      {/* Desktop collapse toggle */}
      <button
        onClick={() => setSidebarCollapsed(c => !c)}
        className="hidden lg:flex w-10 h-10 items-center justify-center text-slate-600 dark:text-slate-400 hover:text-emerald-600 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors mr-4"
      >
        <Icons.Menu size={22} strokeWidth={2} />
      </button>

      {/* Spacer to push icons to the right */}
      <div className="flex-1"></div>

      {/* Action Icons */}
      <div className="flex items-center gap-1 md:gap-3 ml-4">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button 
            onClick={() => setNotificationOpen(o => !o)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 hover:text-emerald-600 transition-colors active:scale-95"
          >
            <Icons.Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#0b0914]"></span>
          </button>

          <AnimatePresence>
            {notificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-14 w-80 bg-white dark:bg-[#13111c] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white ring-1 ring-black/[0.02] dark:border-white/5 overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                  <p className="font-bold text-sm text-slate-800 dark:text-white">Notifications</p>
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">5 NEW</span>
                </div>
                <div className="p-3 text-center bg-slate-50 dark:bg-black/20">
                  <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">View All Notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Messages */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 hover:text-emerald-600 transition-colors">
          <Icons.Mail size={20} strokeWidth={1.5} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-[#0b0914]"></span>
        </button>

        <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1 hidden sm:block"></div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(o => !o)}
            className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors py-1.5 px-2 sm:px-3 rounded-full border border-transparent"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <Icons.User size={18} className="text-emerald-600" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight">Super Admin</p>
            </div>
            <Icons.ChevronDown size={14} className="text-slate-400 hidden sm:block ml-1" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-14 w-56 bg-white dark:bg-[#13111c] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white ring-1 ring-black/[0.02] dark:border-white/5 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50">
                  <p className="font-bold text-sm text-slate-800 dark:text-white">My Account</p>
                </div>
                <div className="p-2 flex flex-col gap-1">
                  <button onClick={() => { logout(); navigate('/login', { replace: true }) }} className="flex items-center gap-3 w-full px-3 py-2.5 text-[13px] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors font-bold">
                    <Icons.LogOut size={16} strokeWidth={2.5} />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
