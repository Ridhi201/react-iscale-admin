export default function ApplicationSetting() {
  const tabs = [
    'General Settings',
    'Visual Settings',
    'Social Media Settings',
    'SEO Settings',
    'Email Settings',
    'SMS Settings',
    'Payment Settings',
    'Live Class'
  ]

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden mb-5 flex flex-col h-full max-w-[1200px]">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Application Setting</h2>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 h-full min-h-0">
          <div className="w-full md:w-64 flex-shrink-0 flex flex-col">
            <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-200 dark:border-[#1f1b2e] rounded shadow-sm overflow-hidden flex-1">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-slate-200 dark:border-gray-800/50 last:border-b-0 transition-colors ${
                    tab === 'General Settings' 
                      ? 'bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800' 
                      : 'bg-[#f8fafc] dark:bg-[#13111c] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:bg-[#1f1b2e]/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-200 dark:border-[#1f1b2e] rounded shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-6 py-4 border-b-2 border-cyan-400 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
              <h3 className="text-lg font-medium text-white">General Settings</h3>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="space-y-6 max-w-3xl ml-auto mr-auto lg:mr-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="w-full sm:w-48 text-sm font-bold text-slate-800 dark:text-slate-200 sm:text-right">Date Format</label>
                  <select className="flex-1 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] shadow-sm text-slate-800 dark:text-slate-200">
                    <option>DD-MM-YY</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="w-full sm:w-48 text-sm font-bold text-slate-800 dark:text-slate-200 sm:text-right">Time Format</label>
                  <select className="flex-1 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] shadow-sm text-slate-800 dark:text-slate-200">
                    <option>12 Hours</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="w-full sm:w-48 text-sm font-bold text-slate-800 dark:text-slate-200 sm:text-right">Time Zone</label>
                  <input 
                    type="text" 
                    defaultValue="Asia/Kolkata"
                    className="flex-1 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="w-full sm:w-48 text-sm font-bold text-slate-800 dark:text-slate-200 sm:text-right">Application Name</label>
                  <input 
                    type="text" 
                    defaultValue="The iScale"
                    className="flex-1 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="w-full sm:w-48 text-sm font-bold text-slate-800 dark:text-slate-200 sm:text-right">Address</label>
                  <input 
                    type="text" 
                    defaultValue="Bangalore || Chhattisgarh"
                    className="flex-1 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="w-full sm:w-48 text-sm font-bold text-slate-800 dark:text-slate-200 sm:text-right">Email</label>
                  <input 
                    type="text" 
                    defaultValue="contact@theiscale.com | info@theiscale.com"
                    className="flex-1 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="w-full sm:w-48 text-sm font-bold text-slate-800 dark:text-slate-200 sm:text-right">Mobile</label>
                  <input 
                    type="text" 
                    defaultValue="7880113112"
                    className="flex-1 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="w-full sm:w-48 text-sm font-bold text-slate-800 dark:text-slate-200 sm:text-right">Alternate Mobile</label>
                  <input 
                    type="text" 
                    defaultValue="7880113112"
                    className="flex-1 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-[#1f1b2e] bg-[#f6f6ff] dark:bg-[#1f1b2e] flex justify-end">
              <button className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#152a4a] transition-colors shadow-sm">
                Update Setting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
