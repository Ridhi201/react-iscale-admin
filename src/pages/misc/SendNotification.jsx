import { Bell } from 'lucide-react'

export default function SendNotification() {
  return (
    <div className="h-full animate-fade-in-up flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center p-12 text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <Bell className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Push Notifications</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          We are currently working hard to bring you a powerful notification system. 
          You will soon be able to send real-time push alerts to your users directly from this dashboard.
        </p>
        <div className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-100 text-slate-600 rounded-full font-semibold text-sm border border-slate-200">
          🚀 Coming Soon
        </div>
      </div>
    </div>
  )
}
