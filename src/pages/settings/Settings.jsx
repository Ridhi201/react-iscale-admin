import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Bell, Globe, Palette, Shield, Mail } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import { useTheme } from '../../store/ThemeContext'

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 ${enabled ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
    style={{ height: 22, width: 40 }}
  >
    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[#f6f6ff] dark:bg-[#1f1b2e] shadow transition-transform duration-200 ${enabled ? 'translate-x-4.5' : ''}`}
      style={{ transform: enabled ? 'translateX(18px)' : 'translateX(0)' }} />
  </button>
)

export default function Settings() {
  const { dark, setDark } = useTheme()
  const [notifs, setNotifs] = useState({ email: true, push: false, sms: true })
  const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@iscale.in', org: 'The iScale' })

  return (
    <div>
      <PageHeader
        title="General Settings"
        subtitle="Manage your platform preferences"
        breadcrumbs={[{ label: 'Settings' }]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile settings */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="xl:col-span-2 space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-5">
              <Shield size={16} className="text-blue-600" />
              <h3 className="font-semibold text-white">Profile Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', key: 'name' },
                { label: 'Email Address', key: 'email' },
                { label: 'Organization', key: 'org' },
              ].map(field => (
                <div key={field.key} className={field.key === 'org' ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">{field.label}</label>
                  <input
                    value={profile[field.key]}
                    onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-[#1f1b2e]/50 border border-slate-200 dark:border-[#1f1b2e] rounded-xl outline-none focus:border-blue-400 text-slate-800 dark:text-slate-200 transition-colors"
                  />
                </div>
              ))}
            </div>
            <button className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
              <Save size={14} /> Save Changes
            </button>
          </div>

          {/* Notifications */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-5">
              <Bell size={16} className="text-violet-600" />
              <h3 className="font-semibold text-white">Notifications</h3>
            </div>
            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive important updates via email' },
                { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                { key: 'sms', label: 'SMS Alerts', desc: 'Critical alerts via SMS' },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-[#1f1b2e] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{n.label}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{n.desc}</p>
                  </div>
                  <Toggle enabled={notifs[n.key]} onChange={v => setNotifs(prev => ({ ...prev, [n.key]: v }))} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-5">
              <Palette size={16} className="text-emerald-600" />
              <h3 className="font-semibold text-white">Appearance</h3>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">Theme</p>
              <div className="grid grid-cols-2 gap-2">
                {['Light', 'Dark'].map(t => (
                  <button
                    key={t}
                    onClick={() => setDark(t === 'Dark')}
                    className={`p-3 rounded-xl border-2 text-xs font-semibold transition-all ${
                      (t === 'Dark') === dark
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-600'
                        : 'border-slate-200 dark:border-[#1f1b2e] text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:border-[#1f1b2e]'
                    }`}
                  >
                    {t === 'Light' ? '☀️' : '🌙'} {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={16} className="text-teal-600" />
              <h3 className="font-semibold text-white">Platform Info</h3>
            </div>
            <div className="space-y-3 text-xs">
              {[
                ['Platform', 'The iScale'],
                ['Version', 'v2.4.1'],
                ['Environment', 'Production'],
                ['Last Updated', '20 Dec 2024'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{k}</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-400">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
